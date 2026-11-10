import L from 'leaflet';
import { wgs84ToCtm12, formatCtm12 } from './crsConverter.js';

/**
 * Gestor de Capas Vectoriales y Simbología
 */
export class LayerManager {
  constructor(map) {
    this.map = map;
    this.layers = {}; // id: { name, leafletLayer, geojson, visible, type, style }
    this.activeTableLayerId = null;
    this.listeners = [];
  }

  // Estilos temáticos por defecto
  getDefaultStyle(layerId) {
    const styles = {
      cuenca: {
        color: '#10B981',
        weight: 2.5,
        fillColor: '#10B981',
        fillOpacity: 0.08,
        dashArray: '4 4'
      },
      drenajes: {
        color: '#06B6D4',
        weight: 3.5,
        opacity: 0.9,
        lineCap: 'round'
      },
      equipamientos: {
        radius: 6,
        fillColor: '#3B82F6',
        color: '#FFFFFF',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      },
      predios: {
        color: '#F59E0B',
        weight: 1.2,
        fillColor: '#F59E0B',
        fillOpacity: 0.25
      },
      inundacion: {
        color: '#EF4444',
        weight: 1.5,
        fillColor: '#EF4444',
        fillOpacity: 0.35
      },
      vertices: {
        radius: 7,
        fillColor: '#8B5CF6',
        color: '#FFFFFF',
        weight: 2,
        opacity: 1,
        fillOpacity: 1
      },
      user_buffer: {
        color: '#6366F1',
        weight: 2,
        fillColor: '#6366F1',
        fillOpacity: 0.3,
        dashArray: '2 2'
      },
      user_intersect: {
        color: '#EC4899',
        weight: 2,
        fillColor: '#EC4899',
        fillOpacity: 0.5
      },
      user_drawn: {
        color: '#F97316',
        weight: 3,
        fillColor: '#F97316',
        fillOpacity: 0.4
      }
    };
    return styles[layerId] || { color: '#94A3B8', weight: 2, fillOpacity: 0.2 };
  }

  async loadInitialLayers() {
    const layerDefs = [
      { id: 'cuenca', name: 'Cuenca La Iguaná (46.25 km²)', path: 'data/cuenca_iguana.geojson', visible: true, type: 'polygon' },
      { id: 'drenajes', name: 'Red Hídrica Principal', path: 'data/drenajes_iguana.geojson', visible: true, type: 'line' },
      { id: 'equipamientos', name: 'Equipamientos Comunitarios', path: 'data/equipamientos_comunitarios.geojson', visible: true, type: 'point' },
      { id: 'predios', name: 'Predios Catastrales (Blanquizal)', path: 'data/predios_catastro.geojson', visible: false, type: 'polygon' },
      { id: 'inundacion', name: 'Manchas Inundación TR100', path: 'data/manchas_inundacion_tr100.geojson', visible: false, type: 'polygon' },
      { id: 'vertices', name: 'Vértices Geodésicos IGAC & GNSS', path: 'data/vertices_geodesicos_igac.geojson', visible: false, type: 'point' }
    ];

    for (const def of layerDefs) {
      try {
        const res = await fetch(def.path);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        this.addGeoJsonLayer(def.id, def.name, data, def.visible, def.type);
      } catch (err) {
        console.warn(`No se pudo cargar capa ${def.id}:`, err);
      }
    }
  }

  addGeoJsonLayer(id, name, geojson, visible = true, type = 'generic', customStyle = null) {
    // Si ya existe, removerla
    if (this.layers[id]) {
      this.map.removeLayer(this.layers[id].leafletLayer);
    }

    const baseStyle = customStyle || this.getDefaultStyle(id);

    const leafletLayer = L.geoJSON(geojson, {
      style: () => baseStyle,
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, baseStyle);
      },
      onEachFeature: (feature, layer) => {
        layer.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          this.showFeaturePopup(feature, e.latlng);
        });
      }
    });

    if (visible) {
      leafletLayer.addTo(this.map);
    }

    this.layers[id] = {
      id,
      name,
      geojson,
      leafletLayer,
      visible,
      type,
      style: baseStyle
    };

    this.notify();
    return this.layers[id];
  }

  toggleLayer(id) {
    const item = this.layers[id];
    if (!item) return;
    item.visible = !item.visible;
    if (item.visible) {
      item.leafletLayer.addTo(this.map);
    } else {
      this.map.removeLayer(item.leafletLayer);
    }
    this.notify();
  }

  showFeaturePopup(feature, latlng) {
    const props = feature.properties || {};
    const { easting, northing } = wgs84ToCtm12(latlng.lng, latlng.lat);

    let rowsHtml = '';
    for (const [k, v] of Object.entries(props)) {
      if (typeof v === 'object' && v !== null) continue;
      rowsHtml += `
        <div class="popup-row">
          <span class="popup-key">${k}:</span>
          <span class="popup-val">${v}</span>
        </div>`;
    }

    const content = `
      <div class="gis-popup">
        <div class="popup-header">
          <span class="popup-badge">Objeto Geográfico</span>
          <span class="popup-coords">${formatCtm12(easting, northing, 0)}</span>
        </div>
        <div class="popup-body">
          ${rowsHtml || '<em>Sin atributos registrados</em>'}
        </div>
      </div>
    `;

    L.popup({ className: 'custom-gis-popup' })
      .setLatLng(latlng)
      .setContent(content)
      .openOn(this.map);
  }

  getLayer(id) {
    return this.layers[id];
  }

  getAllLayers() {
    return Object.values(this.layers);
  }

  zoomToLayer(id) {
    const item = this.layers[id];
    if (item && item.leafletLayer) {
      const bounds = item.leafletLayer.getBounds();
      if (bounds.isValid()) {
        this.map.fitBounds(bounds, { padding: [40, 40] });
      }
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.layers));
  }
}
