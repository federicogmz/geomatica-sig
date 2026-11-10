import * as turf from '@turf/turf';

/**
 * Motor de Geoprocesamiento Vectorial (Buffer, Clip, Intersect, Dissolve)
 */
export class GeoprocessingTool {
  constructor(layerManager) {
    this.layerManager = layerManager;
  }

  /**
   * Genera Zona de Amortiguamiento (Buffer) en metros
   */
  runBuffer(sourceLayerId, distanceMeters = 30, dissolve = true) {
    const layer = this.layerManager.getLayer(sourceLayerId);
    if (!layer || !layer.geojson) {
      throw new Error(`La capa de entrada '${sourceLayerId}' no está disponible.`);
    }

    // turf.buffer toma distancia en kilómetros si units: 'kilometers' o meters si units: 'meters'
    const buffered = turf.buffer(layer.geojson, distanceMeters, { units: 'meters' });

    let finalGeoJson = buffered;
    if (dissolve && buffered.features && buffered.features.length > 1) {
      try {
        let dissolved = buffered.features[0];
        for (let i = 1; i < buffered.features.length; i++) {
          dissolved = turf.union(turf.featureCollection([dissolved, buffered.features[i]]));
        }
        finalGeoJson = turf.featureCollection([dissolved]);
      } catch (e) {
        console.warn('Error al disolver buffer:', e);
      }
    }

    // Calcular área total
    let totalAreaM2 = 0;
    finalGeoJson.features.forEach((f, idx) => {
      const a = turf.area(f);
      totalAreaM2 += a;
      f.properties = {
        ...f.properties,
        fid: idx + 1,
        operacion: 'Buffer',
        distancia_m: distanceMeters,
        area_m2: Math.round(a * 100) / 100,
        area_ha: Math.round((a / 10000) * 100) / 100
      };
    });

    const layerName = `Faja Retiro (${distanceMeters}m ${dissolve ? 'Disuelta' : ''})`;
    this.layerManager.addGeoJsonLayer('user_buffer', layerName, finalGeoJson, true, 'polygon');

    return {
      success: true,
      featureCount: finalGeoJson.features.length,
      totalAreaM2: Math.round(totalAreaM2),
      totalAreaHa: (totalAreaM2 / 10000).toFixed(2),
      geojson: finalGeoJson
    };
  }

  /**
   * Intersección Espacial entre dos capas poligonales
   */
  runIntersection(sourceLayerId, overlayLayerId) {
    const source = this.layerManager.getLayer(sourceLayerId);
    const overlay = this.layerManager.getLayer(overlayLayerId);

    if (!source || !source.geojson) throw new Error(`Capa '${sourceLayerId}' no encontrada.`);
    if (!overlay || !overlay.geojson) throw new Error(`Capa de superposición '${overlayLayerId}' no encontrada.`);

    const intersectedFeatures = [];
    let totalAreaM2 = 0;

    source.geojson.features.forEach((sFeat) => {
      overlay.geojson.features.forEach((oFeat) => {
        try {
          const intersection = turf.intersect(turf.featureCollection([sFeat, oFeat]));
          if (intersection && turf.area(intersection) > 0.1) {
            const area = turf.area(intersection);
            totalAreaM2 += area;
            intersection.properties = {
              ...sFeat.properties,
              ...oFeat.properties,
              area_interseccion_m2: Math.round(area * 100) / 100,
              area_interseccion_ha: Math.round((area / 10000) * 100) / 100,
              amenaza_retiro: 'Alta - Dentro de faja obligatoria'
            };
            intersectedFeatures.push(intersection);
          }
        } catch (e) {}
      });
    });

    const resultGeoJson = turf.featureCollection(intersectedFeatures);
    const layerName = `Intersección (${intersectedFeatures.length} predios en riesgo)`;
    this.layerManager.addGeoJsonLayer('user_intersect', layerName, resultGeoJson, true, 'polygon');

    return {
      success: true,
      intersectedCount: intersectedFeatures.length,
      totalAreaM2: Math.round(totalAreaM2),
      totalAreaHa: (totalAreaM2 / 10000).toFixed(2),
      geojson: resultGeoJson
    };
  }

  /**
   * Recorte (Clip) de objetos espaciales a una máscara delimitadora
   */
  runClip(sourceLayerId, maskLayerId) {
    const source = this.layerManager.getLayer(sourceLayerId);
    const mask = this.layerManager.getLayer(maskLayerId);

    if (!source || !source.geojson) throw new Error(`Capa de entrada '${sourceLayerId}' no disponible.`);
    if (!mask || !mask.geojson) throw new Error(`Capa máscara '${maskLayerId}' no disponible.`);

    const maskPolygon = mask.geojson.features[0];
    const clippedFeatures = [];

    source.geojson.features.forEach(feat => {
      try {
        const clipped = turf.intersect(turf.featureCollection([feat, maskPolygon]));
        if (clipped) {
          clipped.properties = { ...feat.properties, clipped: true };
          clippedFeatures.push(clipped);
        }
      } catch (e) {}
    });

    const fc = turf.featureCollection(clippedFeatures);
    this.layerManager.addGeoJsonLayer('user_clip', `Recorte Clip (${clippedFeatures.length})`, fc, true, 'polygon');

    return {
      success: true,
      featureCount: clippedFeatures.length,
      geojson: fc
    };
  }
}
