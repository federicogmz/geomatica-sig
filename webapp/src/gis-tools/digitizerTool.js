import L from 'leaflet';
import * as turf from '@turf/turf';

/**
 * Motor de Digitalización y Auto-ensamblado (Snapping) Magnético
 */
export class DigitizerTool {
  constructor(map, layerManager) {
    this.map = map;
    this.layerManager = layerManager;
    this.mode = null; // 'line' | 'polygon' | 'point'
    this.currentPoints = [];
    this.currentMarkers = [];
    this.previewLayer = null;
    this.snappingTolerancePx = 15;
    this.snappingEnabled = true;
    this.snapIndicator = null;
    this.snappedCoord = null;
    this.onFeatureCreatedCallback = null;
  }

  start(mode = 'line') {
    this.stop();
    this.mode = mode;
    this.currentPoints = [];
    this.map.getContainer().style.cursor = 'crosshair';

    // Crear indicador visual de imán (anillo de snapping)
    this.snapIndicator = L.circleMarker([0, 0], {
      radius: 8,
      color: '#10B981',
      weight: 2,
      fillColor: '#34D399',
      fillOpacity: 0.5
    });

    this.mouseMoveHandler = (e) => this.handleMouseMove(e);
    this.clickHandler = (e) => this.handleClick(e);
    this.contextMenuHandler = (e) => this.finishCurrentDrawing(e);

    this.map.on('mousemove', this.mouseMoveHandler);
    this.map.on('click', this.clickHandler);
    this.map.on('contextmenu', this.contextMenuHandler);
  }

  stop() {
    this.mode = null;
    this.map.getContainer().style.cursor = '';
    if (this.mouseMoveHandler) this.map.off('mousemove', this.mouseMoveHandler);
    if (this.clickHandler) this.map.off('click', this.clickHandler);
    if (this.contextMenuHandler) this.map.off('contextmenu', this.contextMenuHandler);
    if (this.snapIndicator && this.map.hasLayer(this.snapIndicator)) {
      this.map.removeLayer(this.snapIndicator);
    }
    this.clearCurrentDrawGraphics();
  }

  handleMouseMove(e) {
    let targetLatLng = e.latlng;
    this.snappedCoord = null;

    if (this.snappingEnabled) {
      const snap = this.findNearestSnapVertex(e.latlng);
      if (snap) {
        targetLatLng = L.latLng(snap.lat, snap.lng);
        this.snappedCoord = snap;
        if (!this.map.hasLayer(this.snapIndicator)) {
          this.snapIndicator.addTo(this.map);
        }
        this.snapIndicator.setLatLng(targetLatLng);
      } else {
        if (this.map.hasLayer(this.snapIndicator)) {
          this.map.removeLayer(this.snapIndicator);
        }
      }
    }

    // Actualizar previsualización
    if (this.currentPoints.length > 0 && this.previewLayer) {
      const pts = [...this.currentPoints, [targetLatLng.lat, targetLatLng.lng]];
      if (this.mode === 'polygon' && pts.length >= 3) {
        this.previewLayer.setLatLngs([pts]);
      } else {
        this.previewLayer.setLatLngs(pts);
      }
    }
  }

  handleClick(e) {
    let pt = [e.latlng.lat, e.latlng.lng];
    if (this.snappedCoord) {
      pt = [this.snappedCoord.lat, this.snappedCoord.lng];
    }

    this.currentPoints.push(pt);

    // Marcador de vértice
    const marker = L.circleMarker(pt, {
      radius: 4,
      fillColor: '#F97316',
      color: '#FFFFFF',
      weight: 1.5,
      fillOpacity: 1
    }).addTo(this.map);
    this.currentMarkers.push(marker);

    if (this.mode === 'point') {
      this.finishCurrentDrawing();
      return;
    }

    if (!this.previewLayer) {
      if (this.mode === 'polygon') {
        this.previewLayer = L.polygon([this.currentPoints], {
          color: '#F97316',
          weight: 2,
          fillColor: '#F97316',
          fillOpacity: 0.2
        }).addTo(this.map);
      } else {
        this.previewLayer = L.polyline(this.currentPoints, {
          color: '#F97316',
          weight: 3,
          dashArray: '4 4'
        }).addTo(this.map);
      }
    }
  }

  finishCurrentDrawing(e) {
    if (e && e.originalEvent) {
      e.originalEvent.preventDefault();
    }

    if (this.mode === 'line' && this.currentPoints.length < 2) return;
    if (this.mode === 'polygon' && this.currentPoints.length < 3) return;

    let feature = null;
    if (this.mode === 'point') {
      const p = this.currentPoints[0];
      feature = turf.point([p[1], p[0]], { id: Date.now(), tipo: 'punto_digitalizado' });
    } else if (this.mode === 'line') {
      const coords = this.currentPoints.map(p => [p[1], p[0]]);
      feature = turf.lineString(coords, { id: Date.now(), tipo: 'afluente_digitalizado' });
    } else if (this.mode === 'polygon') {
      const coords = this.currentPoints.map(p => [p[1], p[0]]);
      coords.push(coords[0]); // cerrar anillo
      feature = turf.polygon([coords], { id: Date.now(), tipo: 'poligono_digitalizado' });
    }

    if (feature) {
      // Registrar en capa de usuario
      const existing = this.layerManager.getLayer('user_drawn');
      let fc;
      if (existing && existing.geojson) {
        fc = existing.geojson;
        fc.features.push(feature);
      } else {
        fc = turf.featureCollection([feature]);
      }
      this.layerManager.addGeoJsonLayer('user_drawn', 'Digitalización de Alumno', fc, true, 'custom');

      if (this.onFeatureCreatedCallback) {
        this.onFeatureCreatedCallback(feature, this.currentPoints);
      }
    }

    this.clearCurrentDrawGraphics();
    this.currentPoints = [];
  }

  clearCurrentDrawGraphics() {
    this.currentMarkers.forEach(m => this.map.removeLayer(m));
    this.currentMarkers = [];
    if (this.previewLayer) {
      this.map.removeLayer(this.previewLayer);
      this.previewLayer = null;
    }
  }

  findNearestSnapVertex(latlng) {
    const mousePt = this.map.latLngToLayerPoint(latlng);
    const candidateLayers = ['drenajes', 'cuenca', 'user_drawn'];

    let closest = null;
    let minDist = this.snappingTolerancePx;

    candidateLayers.forEach(id => {
      const item = this.layerManager.getLayer(id);
      if (!item || !item.visible || !item.geojson) return;

      turf.coordEach(item.geojson, (coord) => {
        const ptLatLng = L.latLng(coord[1], coord[0]);
        const layerPt = this.map.latLngToLayerPoint(ptLatLng);
        const dist = mousePt.distanceTo(layerPt);
        if (dist < minDist) {
          minDist = dist;
          closest = { lat: coord[1], lng: coord[0], distancePx: dist };
        }
      });
    });

    return closest;
  }

  onFeatureCreated(cb) {
    this.onFeatureCreatedCallback = cb;
  }
}
