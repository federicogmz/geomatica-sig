# Directorio de Guías Prácticas, Talleres y Evaluaciones

> **Semestre / Hito:** **2026-1 (Estado de cierre ejecutado)**

Bienvenido al repositorio de guías y talleres del curso **Geomática, Ingeniería y SIG**. Este directorio contiene todo el material práctico del semestre organizado en tres categorías estructuradas:

---

## Estructura del Directorio

```text
03_guias/
├── 01_talleres_clase/          # Guías paso a paso y sus paquetes de datos (mapas_ejercicio, insumos_g11_gnss, insumos_g12_g13_sentinel2)
├── 02_talleres_repaso/         # Simulacros preparatorios y sus insumos (insumos_p1, insumos_q4, insumos_p2)
├── 03_evaluaciones/            # Instructivos oficiales de evaluación y sus insumos (insumos_p1, insumos_q3, insumos_q4, insumos_p2)
├── PROYECTO_INTEGRADOR.md      # Marco metodológico del proyecto territorial en La Iguaná
└── README.md                   # Este índice general de navegación
```

---

## 1. Talleres Semanales de Clase (`01_talleres_clase/`)

Guías detalladas para el **Bloque 2 de laboratorio (4:30–6:00 p.m.)** con herramientas paso a paso y ejercicios de práctica autónoma para repasar durante la semana:

| Semana (Fecha) | Guía Oficial | Título y Contenido Práctico |
|:---:|---|---|
| **S01 (16 jul)** | [**G01_exploracion_visores_digitales.md**](01_talleres_clase/G01_exploracion_visores_digitales.md) | Reconocimiento territorial en visores digitales (Google Earth, OSM, Colombia en Mapas). |
| **S02 (23 jul)** | [**G02_taller_escalas_coordenadas.md**](01_talleres_clase/G02_taller_escalas_coordenadas.md) | Medición en visor PDF calibrado, escalas numérica/gráfica y conversión GMS ↔ Decimal. |
| **S03 (30 jul)** | [**G03_datum_ctm12_georreferenciacion.md**](01_talleres_clase/G03_datum_ctm12_georreferenciacion.md) | Geodesia, Datum Bogotá vs. MAGNA-SIRGAS, CTM12 (`EPSG:9377`) y Georreferenciador QGIS · **Quiz 1 (8%)**. |
| **Anexo** | [**G03_instalacion_qgis.md**](01_talleres_clase/G03_instalacion_qgis.md) | Guía técnica anexa: Instalación paso a paso de QGIS LTR en computadores personales. |
| **S04 (06 ago)** | [**G04_interfaz_qgis.md**](01_talleres_clase/G04_interfaz_qgis.md) | Entorno QGIS, CRS de proyecto, GeoPackage y Geoservicios WMS/WMTS de GeoMedellín. |
| **S05 (13 ago)** | [**G05_digitalizacion_topologia.md**](01_talleres_clase/G05_digitalizacion_topologia.md) | Geometrías vectoriales, auto-ensamblado (*snapping*) y validación con Comprobador de topología (S05 y S09). |
| **S06 (20 ago)** | [**G06_atributos_simbologia.md**](01_talleres_clase/G06_atributos_simbologia.md) | Calculadora de campos (`area_km2`, `long_m`), simbología temática, halo y Diseñador A3 · **Quiz 2 (8%)**. |
| **S07–S10 (27 ago–17 sep)** | [**G07_geoprocesamiento_wfs.md**](01_talleres_clase/G07_geoprocesamiento_wfs.md) | Geoprocesamiento (Buffer 30 m disuelto, Clip, Intersect), descarga WFS en vivo y cierre vectorial · **Sustentación I1 (17 sep, 12%)**. |
| **S11 (24 sep)** | [**G08_descarga_dem_raster.md**](01_talleres_clase/G08_descarga_dem_raster.md) | **Parcial 1 (15%, Bloque 1)** + **Módulo Ráster (Parte 1, Bloque 2):** Descarga de datos DEM (ALOS PALSAR 12.5 m), recorte y reproyección a CTM12 (`EPSG:9377`). |
| **S12 (01 oct)** | [**G09_dem_pendientes_hillshade.md**](01_talleres_clase/G09_dem_pendientes_hillshade.md) | **Módulo Ráster (Parte 2):** Modelación de pendientes (° y %), reclasificación normativa POT, aspecto y sombreado 3D (*hillshade* 315°/45°). |
| **Receso (08 oct)** | [**TALLER_REPASO_Q3.md**](02_talleres_repaso/TALLER_REPASO_Q3.md) | **Semana de Receso Estudiantil:** Estudio autónomo y preparación para el Quiz 3 (Terreno y Álgebra Ráster). |
| **S13 (15 oct)** | [**G10_raster_calculator_perfiles.md**](01_talleres_clase/G10_raster_calculator_perfiles.md) | **Módulo Ráster (Parte 3):** Álgebra de mapas condicional, curvas de nivel y perfil longitudinal del cauce · **Quiz 3 (8%)**. |
| **S14 (22 oct)** | [**G11_gnss_gabinete_importacion.md**](01_talleres_clase/G11_gnss_gabinete_importacion.md) | **M3 Posicionamiento GNSS en Gabinete:** Segmentos, constelaciones, trilateración con 4 satélites, `HDOP`, *multipath*, ingesta GPX/CSV en QGIS (`insumos_g11_gnss/`) y contraste contra vértices IGAC (`EPSG:9377`). |
| **S14 (22 oct)** | [**G12_teledeteccion_sentinel2.md**](01_talleres_clase/G12_teledeteccion_sentinel2.md) | **M4 Teledetección Satelital en QGIS (Parte 1):** Espectro óptico (Visible, NIR, SWIR), firmas espectrales, **descarga directa de bandas Sentinel-2 L2A en QGIS para la zona de interés (`limite_iguana.geojson`) vía `STAC API Browser`**, recorte por máscara a `EPSG:9377` (`10 m`) y auditoría de reflectancias (`insumos_g12_g13_sentinel2/`). |
| **S14 (22 oct)** | [**G13_indices_espectrales_qgis.md**](01_talleres_clase/G13_indices_espectrales_qgis.md) | **M4 Teledetección Satelital en QGIS (Parte 2):** Cálculo de `NDVI` y `NDBI` en Calculadora Ráster y **evaluación integral en QGIS** (simbología pseudocolor + `Identificar`, histograma bimodal, `Estadísticas de capa ráster`, máscara booleana biespectral, poligonización a hectáreas y fusión 3D con *Hillshade*). |
| **S15 (29 oct)** | [**G14_arcgis_pro_gdb.md**](01_talleres_clase/G14_arcgis_pro_gdb.md) | **M5 Presentación de ArcGIS Pro:** Entorno `.aprx`, File Geodatabase (`.gdb`), Feature Datasets en `EPSG:9377`, demostración de dominios y servicios ArcGIS REST · Revisión de avance `IF`. |
| **S15 (29 oct)** | [**G15_arcgis_modelbuilder.md**](01_talleres_clase/G15_arcgis_modelbuilder.md) | **M5 Automatización Espacial:** Flujos de geoprocesamiento en el **Modelador Gráfico de QGIS** (`.model3`) y equivalencia en ModelBuilder · **Quiz 4 (8%, 45 min — GNSS en Gabinete)**. |
| **S16 (05 nov)** | [**G16_cierre_integracion_territorial.md**](01_talleres_clase/G16_cierre_integracion_territorial.md) | **M6 Cierre Integrador:** **Parcial 2 (`P2`, 15%, 90 min en QGIS — Sentinel-2 `NDVI`/`NDBI` + Modelo `.model3` + Mapa)** + **Entrega y Sustentación Oral del Informe Final (`IF`, 26%, Bloque 2)**. |

---

## 2. Talleres de Repaso Previos a Evaluaciones (`02_talleres_repaso/`)

Simulacros prácticos cronometrados para estudiar y prepararse antes de presentar los quices y parciales, incluyendo ejercicios resueltos, casos reales y protocolos de autoverificación técnica y control de calidad:

| Evaluación | Taller de Repaso | Semana Recomendada | Temas Evaluados |
|:---:|---|:---:|---|
| **Quiz 1 (8%)** | [**TALLER_REPASO_Q1.md**](02_talleres_repaso/TALLER_REPASO_Q1.md) | Semana 2 a 3 (30 jul) | Escala por fotocopia, resolución de píxel (Nyquist), GMS ↔ Dec, Datum Bogotá vs. MAGNA-SIRGAS, CTM12. |
| **Quiz 2 (8%)** | [**TALLER_REPASO_Q2.md**](02_talleres_repaso/TALLER_REPASO_Q2.md) | Semana 5 a 6 (20 ago) | Capas sin `.prj`, MultiPolígonos, calculadora de campos (`area_m2`, `es_grande`), importación de puntos. |
| **Parcial 1 (15%)** | [**TALLER_REPASO_P1.md**](02_talleres_repaso/TALLER_REPASO_P1.md) / [**INSTRUCTIVO_EVALUACION_P1.md**](03_evaluaciones/INSTRUCTIVO_EVALUACION_P1.md) | Semana 10 a 11 (24 sep) | **Simulacro:** Retiro hídrico 30 m La Iguaná · **Examen:** Amenaza por inundación Santa Elena (DAGRD). Geodesia CTM12, Topology Checker, Disolver, Intersección, JSON y PDF A3. |
| **Quiz 3 (8%)** | [**TALLER_REPASO_Q3.md**](02_talleres_repaso/TALLER_REPASO_Q3.md) | Semana 12 a 13 (15 oct) | Módulo Ráster: MDT vs. MDS, reproyección CTM12 con GDAL Warp, pendientes, sombreado 3D, calculadora ráster booleana y poligonización a GeoPackage. |
| **Quiz 4 (8%)** | [**TALLER_REPASO_Q4.md**](02_talleres_repaso/TALLER_REPASO_Q4.md) | Semana 14 a 15 (29 oct) | **Exclusivo G11 (GNSS en Gabinete):** Ingesta `.gpx` y `.csv` (`EPSG:4326`), filtrado de saltos por *multipath* con `"hdop" <= 2.0`, exportación a GeoPackage (`EPSG:9377`) y contraste métrico contra vértices IGAC. |
| **Parcial 2 (15%)** | [**TALLER_REPASO_P2.md**](02_talleres_repaso/TALLER_REPASO_P2.md) | Semana 15 a 16 (05 nov) | **Exclusivo G12–G15 en QGIS (90 min, sin traslape con P1, Q3 ni Q4):** Cálculo de `NDVI` y `NDBI` en Calculadora Ráster, vectorización (`DN = 1`), modelo automatizado en QGIS (`.model3`) y mapa síntesis PDF. |

---

## 3. Instructivos Oficiales de Evaluación (`03_evaluaciones/`)

Documentos formales con el encargo técnico, especificaciones de entrega, tolerancias y criterios de calificación:

### Quices Individuales (32%)
- [**INSTRUCTIVO_EVALUACION_Q1.md**](03_evaluaciones/INSTRUCTIVO_EVALUACION_Q1.md) · Quiz 1: Fundamentos cartográficos y CTM12 (Semana 3, 30 jul · 8% — **Realizado**)
- [**INSTRUCTIVO_EVALUACION_Q2.md**](03_evaluaciones/INSTRUCTIVO_EVALUACION_Q2.md) · Quiz 2: SIG vectorial, atributos y GeoPackage en QGIS (Semana 6, 20 ago · 8% — **Realizado**)
- [**INSTRUCTIVO_EVALUACION_Q3.md**](03_evaluaciones/INSTRUCTIVO_EVALUACION_Q3.md) · Quiz 3: Terreno y Álgebra Ráster (Semana 13, 15 oct · 8% — **Realizado**)
- [**INSTRUCTIVO_EVALUACION_Q4.md**](03_evaluaciones/INSTRUCTIVO_EVALUACION_Q4.md) · Quiz 4: Posicionamiento GNSS en Gabinete y Control de Calidad por `HDOP` (Semana 15, 29 oct · 8%, 45 min en QGIS — **Realizado**)

### Parciales Prácticos Individuales (30%)
- [**INSTRUCTIVO_EVALUACION_P1.md**](03_evaluaciones/INSTRUCTIVO_EVALUACION_P1.md) · Parcial 1: SIG vectorial, geodesia CTM12 y validación topológica en QGIS (Semana 11, 24 sep · 15% — **Realizado**)
- [**INSTRUCTIVO_EVALUACION_P2.md**](03_evaluaciones/INSTRUCTIVO_EVALUACION_P2.md) · Parcial 2: Teledetección Sentinel-2 (`NDVI`, `NDBI`), Modelador Gráfico en QGIS (`.model3`) y Síntesis Cartográfica (Semana 16, 05 nov · 15%, 90 min en QGIS — **Realizado**)

### Informes Grupales del Proyecto Territorial (38%) y Taller Opcional de Reemplazo
- [**INSTRUCTIVO_ENTREGA_I1.md**](03_evaluaciones/INSTRUCTIVO_ENTREGA_I1.md) · Informe 1: Diagnóstico vectorial y propuesta cartográfica A3 (Semana 10, 17 sep · 12% — **Realizado**)
- [**INSTRUCTIVO_ENTREGA_IF.md**](03_evaluaciones/INSTRUCTIVO_ENTREGA_IF.md) · **Informe Final (`IF` con Sustentación Oral — 26% en QGIS):** Análisis territorial multicriterio integrando relieve (`DEM`), índices satelitales (`NDVI`/`NDBI`) y priorización espacial en QGIS (`grupoXX_IF.zip`: proyecto QGIS + Lámina A3 + Informe Territorial de 4–5 págs. + Sustentación Oral el 05 nov — **Realizado**).
- [**INSTRUCTIVO_TALLER_RECUPERACION_IF.md**](03_evaluaciones/INSTRUCTIVO_TALLER_RECUPERACION_IF.md) · **Taller Individual Opcional de Reemplazo del Componente Técnico del `IF` (`20%` del curso):** Diagnóstico hidro-morfológico, espectral y de presión urbana en la **Cuenca de la Quebrada La Ayurá (Envigado, `EPSG:9377`)**, parametrizado individualmente con el último dígito del documento de identidad ($D \in \{0..9\}$) (**Realizado**).

---

## 4. Marco del Proyecto Integrador
- [**PROYECTO_INTEGRADOR.md**](PROYECTO_INTEGRADOR.md): Documento marco que define el contexto territorial, antecedentes históricos, problemáticas biofísicas, hoja de ruta real y estructura de las entregas acumulativas en la Cuenca de la Quebrada La Iguaná.
