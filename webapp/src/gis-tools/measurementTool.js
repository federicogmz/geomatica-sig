import L from 'leaflet';
import * as turf from '@turf/turf';

/**
 * Herramienta de Medición de Distancias y Simulador de Distorsión de Escala
 */
export class MeasurementTool {
  constructor(map) {
    this.map = map;
    this.active = false;
    this.points = [];
    this.markers = [];
    this.polyline = null;
    this.onMeasureCallback = null;
  }

  start() {
    this.active = true;
    this.points = [];
    this.clearGraphics();
    this.map.getContainer().style.cursor = 'crosshair';

    this.clickHandler = (e) => {
      if (!this.active) return;
      const pt = [e.latlng.lat, e.latlng.lng];
      this.points.push(pt);

      // Crear marcador visual
      const marker = L.circleMarker(e.latlng, {
        radius: 5,
        fillColor: '#F59E0B',
        color: '#FFFFFF',
        weight: 2,
        fillOpacity: 1
      }).addTo(this.map);
      this.markers.push(marker);

      if (this.points.length > 1) {
        if (this.polyline) {
          this.polyline.setLatLngs(this.points);
        } else {
          this.polyline = L.polyline(this.points, {
            color: '#F59E0B',
            weight: 3,
            dashArray: '6 6'
          }).addTo(this.map);
        }

        const totalDistMeters = this.calculateTotalDistance();
        if (this.onMeasureCallback) {
          this.onMeasureCallback({
            points: this.points,
            distanceMeters: totalDistMeters,
            distanceKm: totalDistMeters / 1000
          });
        }
      }
    };

    this.map.on('click', this.clickHandler);
  }

  stop() {
    this.active = false;
    this.map.getContainer().style.cursor = '';
    if (this.clickHandler) {
      this.map.off('click', this.clickHandler);
    }
  }

  clear() {
    this.stop();
    this.clearGraphics();
    this.points = [];
  }

  clearGraphics() {
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];
    if (this.polyline) {
      this.map.removeLayer(this.polyline);
      this.polyline = null;
    }
  }

  calculateTotalDistance() {
    if (this.points.length < 2) return 0;
    let dist = 0;
    for (let i = 0; i < this.points.length - 1; i++) {
      const p1 = turf.point([this.points[i][1], this.points[i][0]]);
      const p2 = turf.point([this.points[i+1][1], this.points[i+1][0]]);
      dist += turf.distance(p1, p2, { units: 'meters' });
    }
    return dist;
  }

  onMeasure(callback) {
    this.onMeasureCallback = callback;
  }
}
