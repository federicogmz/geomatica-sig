import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { wgs84ToCtm12, formatCtm12, formatWgs84 } from './crsConverter.js';

/**
 * Motor del Mapa Leaflet y Gestión de Coordenadas en Vivo
 * 100% libre de API Keys comerciales (Sin dependencias de Carto que exijan token)
 */
export class MapEngine {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.baseLayers = {};
    this.activeBaseLayer = null;
    this.coordDisplayElem = null;
    this.clickCallbacks = [];
  }

  init() {
    // Centro geográfico de la cuenca de La Iguaná (San Cristóbal / Robledo / Medellín)
    const initialCenter = [6.288, -75.610];
    const initialZoom = 13;

    this.map = L.map(this.containerId, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: false
    });

    // Control de escala métrica en esquina inferior izquierda
    L.control.scale({
      position: 'bottomleft',
      metric: true,
      imperial: false,
      maxWidth: 160
    }).addTo(this.map);

    // Controles de zoom reposicionados
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    // Configurar mapas base 100% libres de API Keys
    this.setupBaseLayers();

    // Rastrear posición del cursor para coordenadas en vivo
    this.setupCoordinateTracker();

    // Eventos de clic
    this.map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      const { easting, northing } = wgs84ToCtm12(lng, lat);
      this.clickCallbacks.forEach(cb => cb({ lat, lng, easting, northing, originalEvent: e }));
    });

    return this.map;
  }

  setupBaseLayers() {
    // 1. Esri World Dark Gray Canvas (Tema oscuro SIG profesional sin tokens)
    const darkEsri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
      attribution: 'Esri, HERE, Garmin, © OpenStreetMap'
    });

    // 2. Esri World Imagery (Satélite óptico de alta resolución)
    const satelliteEsri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Esri, Maxar, Earthstar Geographics'
    });

    // 3. Esri World Topo Map (Relieve topográfico y curvas de nivel)
    const topoEsri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: 'Esri, USGS, NOAA'
    });

    // 4. OpenStreetMap Estándar (Cartografía abierta colaborativa)
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    });

    // 5. Esri Light Gray Canvas (Tema claro para impresión de planos)
    const lightEsri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
      attribution: 'Esri, HERE, Garmin'
    });

    this.baseLayers = {
      dark: darkEsri,
      satellite: satelliteEsri,
      topo: topoEsri,
      osm: osm,
      light: lightEsri
    };

    // Capa base inicial: Esri Dark Canvas
    darkEsri.addTo(this.map);
    this.activeBaseLayer = 'dark';
  }

  setBaseLayer(name) {
    if (!this.baseLayers[name] || this.activeBaseLayer === name) return;
    if (this.activeBaseLayer && this.baseLayers[this.activeBaseLayer]) {
      this.map.removeLayer(this.baseLayers[this.activeBaseLayer]);
    }
    this.baseLayers[name].addTo(this.map);
    this.activeBaseLayer = name;
  }

  setupCoordinateTracker() {
    const coordsBar = document.getElementById('coords-bar');
    if (!coordsBar) return;

    this.map.on('mousemove', (e) => {
      const { lat, lng } = e.latlng;
      const { easting, northing } = wgs84ToCtm12(lng, lat);

      const ctm12Str = formatCtm12(easting, northing, 1);
      const wgs84Str = formatWgs84(lng, lat, 4);

      coordsBar.innerHTML = `
        <div class="coord-item">
          <span class="coord-label">CTM12 (EPSG:9377):</span>
          <span class="coord-value">${ctm12Str}</span>
        </div>
        <div class="coord-divider">|</div>
        <div class="coord-item">
          <span class="coord-label">WGS84:</span>
          <span class="coord-value">${wgs84Str}</span>
        </div>
      `;
    });

    this.map.on('mouseout', () => {
      coordsBar.innerHTML = `
        <div class="coord-item">
          <span class="coord-label">CTM12 (EPSG:9377):</span>
          <span class="coord-value">Mueve el cursor sobre el mapa</span>
        </div>
      `;
    });
  }

  onMapClick(callback) {
    this.clickCallbacks.push(callback);
    return () => {
      this.clickCallbacks = this.clickCallbacks.filter(cb => cb !== callback);
    };
  }

  flyToIguana() {
    this.map.flyTo([6.288, -75.610], 13, { duration: 1.2 });
  }
}
