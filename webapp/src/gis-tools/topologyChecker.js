import L from 'leaflet';
import * as turf from '@turf/turf';

/**
 * Motor de Auditoría y Comprobador de Topología (Topology Checker)
 */
export class TopologyChecker {
  constructor(map, layerManager) {
    this.map = map;
    this.layerManager = layerManager;
    this.errorMarkers = [];
  }

  clearErrors() {
    this.errorMarkers.forEach(m => this.map.removeLayer(m));
    this.errorMarkers = [];
  }

  auditUserFeatures() {
    this.clearErrors();
    const userLayer = this.layerManager.getLayer('user_drawn');
    const mainDrainage = this.layerManager.getLayer('drenajes');

    const report = {
      totalFeatures: 0,
      errorsCount: 0,
      rules: [
        { name: 'no_bowties', label: 'Sin geometrías no válidas ni auto-intersecciones', passed: true, errors: [] },
        { name: 'no_overlaps', label: 'Sin superposiciones de polígonos (Must Not Overlap)', passed: true, errors: [] },
        { name: 'no_dangles', label: 'Sin extremos sueltos en confluencias (Must Not Have Dangles)', passed: true, errors: [] }
      ]
    };

    if (!userLayer || !userLayer.geojson || !userLayer.geojson.features.length) {
      return { ...report, message: 'No hay geometrías digitalizadas por el alumno para auditar.' };
    }

    const features = userLayer.geojson.features;
    report.totalFeatures = features.length;

    // Regla 1: Autointersecciones (Kinks)
    features.forEach((feat, idx) => {
      const geomType = turf.getType(feat);
      if (geomType === 'Polygon' || geomType === 'MultiPolygon') {
        const kinks = turf.kinks(feat);
        if (kinks.features.length > 0) {
          report.rules[0].passed = false;
          kinks.features.forEach(k => {
            const coord = k.geometry.coordinates;
            report.rules[0].errors.push({
              featureIndex: idx,
              type: 'Auto-intersección (Bowtie)',
              lat: coord[1],
              lng: coord[0]
            });
            this.addErrorMarker(coord[1], coord[0], 'Auto-intersección detectada');
          });
        }
      }
    });

    // Regla 2: Solapes entre polígonos digitalizados
    const polygons = features.filter(f => turf.getType(f) === 'Polygon');
    for (let i = 0; i < polygons.length; i++) {
      for (let j = i + 1; j < polygons.length; j++) {
        try {
          const overlap = turf.intersect(turf.featureCollection([polygons[i], polygons[j]]));
          if (overlap && turf.area(overlap) > 1.0) {
            report.rules[1].passed = false;
            const centroid = turf.centroid(overlap).geometry.coordinates;
            report.rules[1].errors.push({
              features: [i, j],
              areaM2: turf.area(overlap).toFixed(1),
              lat: centroid[1],
              lng: centroid[0]
            });
            this.addErrorMarker(centroid[1], centroid[0], `Solape de ${turf.area(overlap).toFixed(1)} m²`);
          }
        } catch (e) {}
      }
    }

    // Regla 3: Dangles en líneas (confluencia con el drenaje principal)
    const lines = features.filter(f => turf.getType(f) === 'LineString');
    if (mainDrainage && mainDrainage.geojson) {
      lines.forEach((line, idx) => {
        const coords = line.geometry.coordinates;
        if (coords.length < 2) return;
        const endPt = turf.point(coords[coords.length - 1]);

        let minDistanceToDrainage = Infinity;
        turf.coordEach(mainDrainage.geojson, (dCoord) => {
          const dPt = turf.point(dCoord);
          const d = turf.distance(endPt, dPt, { units: 'meters' });
          if (d < minDistanceToDrainage) minDistanceToDrainage = d;
        });

        // Tolerancia de 10 metros para considerar enganche exitoso
        if (minDistanceToDrainage > 10.0) {
          report.rules[2].passed = false;
          report.rules[2].errors.push({
            lineIndex: idx,
            distanceToCauceM: minDistanceToDrainage.toFixed(1),
            lat: coords[coords.length - 1][1],
            lng: coords[coords.length - 1][0]
          });
          this.addErrorMarker(
            coords[coords.length - 1][1],
            coords[coords.length - 1][0],
            `Extremo suelto (Dangle) a ${minDistanceToDrainage.toFixed(1)} m del cauce`
          );
        }
      });
    }

    report.errorsCount = report.rules.reduce((acc, r) => acc + r.errors.length, 0);
    return report;
  }

  addErrorMarker(lat, lng, label) {
    const marker = L.circleMarker([lat, lng], {
      radius: 9,
      color: '#EF4444',
      weight: 3,
      fillColor: '#F87171',
      fillOpacity: 0.8,
      className: 'pulsing-error-marker'
    }).addTo(this.map);

    marker.bindPopup(`<div class="topology-error-popup"><strong>Alerta Topológica:</strong><br/>${label}</div>`);
    this.errorMarkers.push(marker);
  }
}
