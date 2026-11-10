import proj4 from 'proj4';

// Definición oficial del Sistema de Coordenadas Oficial de Colombia:
// MAGNA-SIRGAS 2018 / Origen Nacional (CTM12) - EPSG:9377 (Resolución IGAC 471 de 2020)
export const EPSG_9377_DEF = '+proj=tmerc +lat_0=4 +lon_0=-73 +k=0.9992 +x_0=5000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';
export const EPSG_4326_DEF = '+proj=longlat +datum=WGS84 +no_defs';

proj4.defs('EPSG:9377', EPSG_9377_DEF);
proj4.defs('EPSG:4326', EPSG_4326_DEF);

/**
 * Convierte coordenadas geográficas WGS84 [longitud, latitud] a MAGNA-SIRGAS Origen Nacional CTM12 [Easting (X), Northing (Y)]
 * @param {number} lng - Longitud en grados decimales (ej. -75.58)
 * @param {number} lat - Latitud en grados decimales (ej. 6.27)
 * @returns {{ easting: number, northing: number }}
 */
export function wgs84ToCtm12(lng, lat) {
  const [easting, northing] = proj4('EPSG:4326', 'EPSG:9377', [lng, lat]);
  return { easting, northing };
}

/**
 * Convierte coordenadas proyectadas CTM12 [Easting (X), Northing (Y)] a geográficas WGS84 [longitud, latitud]
 * @param {number} easting - Coordenada Este en metros (aprox 4.700.000 a 5.300.000)
 * @param {number} northing - Coordenada Norte en metros (aprox 1.500.000 a 2.500.000)
 * @returns {{ lng: number, lat: number }}
 */
export function ctm12ToWgs84(easting, northing) {
  const [lng, lat] = proj4('EPSG:9377', 'EPSG:4326', [easting, northing]);
  return { lng, lat };
}

/**
 * Formatea coordenadas CTM12 con separador de miles y unidades
 */
export function formatCtm12(easting, northing, decimals = 1) {
  if (isNaN(easting) || isNaN(northing)) return 'E: --- m | N: --- m';
  const eStr = Number(easting).toLocaleString('es-CO', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const nStr = Number(northing).toLocaleString('es-CO', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return `E: ${eStr} m · N: ${nStr} m`;
}

/**
 * Formatea coordenadas WGS84 en grados decimales con indicación cardinal
 */
export function formatWgs84(lng, lat, decimals = 5) {
  if (isNaN(lng) || isNaN(lat)) return '---';
  const latCard = lat >= 0 ? 'N' : 'S';
  const lngCard = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(decimals)}° ${latCard}, ${Math.abs(lng).toFixed(decimals)}° ${lngCard}`;
}

/**
 * Convierte Grados, Minutos, Segundos (GMS) a Grados Decimales
 */
export function dmsToDecimal(degrees, minutes, seconds, hemisphere = 'N') {
  const hemi = hemisphere.toUpperCase();
  const sign = (hemi === 'S' || hemi === 'W' || hemi === 'O') ? -1 : 1;
  const dec = Math.abs(degrees) + (minutes / 60.0) + (seconds / 3600.0);
  return sign * dec;
}

/**
 * Convierte Grados Decimales a representación legible GMS
 */
export function decimalToDms(dec, isLat = true) {
  const cardinal = isLat ? (dec >= 0 ? 'N' : 'S') : (dec >= 0 ? 'E' : 'W');
  const abs = Math.abs(dec);
  const d = Math.floor(abs);
  const minFloat = (abs - d) * 60;
  const m = Math.floor(minFloat);
  const s = ((minFloat - m) * 60).toFixed(2);
  return `${d}° ${m}' ${s}" ${cardinal}`;
}
