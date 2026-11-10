# Proyecto Integrador: Cuenca de la Quebrada La Iguaná

## 1. Fundamento y Sentido del Proyecto

El Proyecto Integrador no es una tarea aislada que se formula a mitad de semestre: es la **columna vertebral del curso que inicia desde la Semana 1 y se construye sesión tras sesión**. 

Cada grupo (2 o 3 estudiantes de Ingeniería Civil y Diseño Urbano) trabaja sobre un mismo territorio real y desafiante: la **cuenca de la Quebrada La Iguaná**, en el occidente de Medellín. Toda la clase comparte esta misma cuenca para fomentar el aprendizaje colaborativo, la comparación crítica de resultados y la detección temprana de errores topológicos y geodésicos en el aula.

| Parámetro Territorial | Característica en La Iguaná |
|---|---|
| **Nacimiento** | Alto de Boquerón, Cerro de Las Repetidoras (corregimiento de San Cristóbal), ≈2 950 msnm |
| **Desembocadura** | Río Medellín, frente a la Quebrada Santa Elena y la Plaza Minorista, ≈1 450 msnm |
| **Longitud del cauce principal** | ≈15 km |
| **Área total de la cuenca** | ≈46.25 km² (38.73 km² rural/boscosa de alta pendiente + 7.52 km² urbana consolidada) |
| **Comunas y corregimientos** | San Cristóbal, Comuna 7 (Robledo), Comuna 13 (San Javier), Comuna 11 (Laureles-Estadio) |
| **Obras hidráulicas de control** | Azud de disipación de la Carrera 80 y Presa de laminación de crecientes de la Carrera 70 |

Es una cuenca con alta dinámica hidrológica, susceptibilidad a movimientos en masa y avenidas torrenciales históricas (como la creciente de 1880 que arrasó Robledo y eventos torrenciales recientes documentados por SIATA). El gradiente urbano-rural exige articular de manera continua la **Ingeniería Civil** (hidráulica, estabilidad de laderas, drenajes, redes) con el **Diseño Urbano** (usos del suelo, espacio público, rondas de protección ambiental, contención de la frontera informal).

---

## 2. Hoja de Ruta Acumulativa (Semana a Semana)

El proyecto se desarrolla a lo largo de 16 semanas mediante una secuencia fluida y acumulativa:

- **Semanas 1–3 (16 al 30 jul · Módulo 0 — Inicio Territorial y Geodesia):**
  - *Semana 1 (16 jul):* Primer contacto visual e histórico con La Iguaná en visores digitales (Google Earth, OpenStreetMap, Colombia en Mapas del IGAC) ([G01](01_talleres_clase/G01_exploracion_visores_digitales.md)).
  - *Semana 2 (23 jul):* Medición de distancias y áreas reales sobre la cuenca a escala calibrada (longitud del río, fajas de retiro, tamaño de manzanas) ([G02](01_talleres_clase/G02_taller_escalas_coordenadas.md)).
  - *Semana 3 (30 jul):* Georreferenciación y cálculo de coordenadas geográficas y proyectadas en Origen Nacional CTM12 (`EPSG:9377`) de hitos críticos de La Iguaná ([G03](01_talleres_clase/G03_datum_ctm12_georreferenciacion.md)) · **Quiz 1 (`Q1`, 8%)**.
- **Semanas 4–10 (06 ago al 17 sep · Módulo 1 — Estructura Vectorial, Topología y Geoservicios en QGIS):**
  - *Semana 4 (06 ago):* Creación del contenedor oficial `proyecto_iguana.gpkg`. Carga de cartografía base y conexión a geoservicios WMS/WMTS (ortofotos de Medellín) ([G04](01_talleres_clase/G04_interfaz_qgis.md)).
  - *Semanas 5–6 (13 y 20 ago):* Digitalización de la red hídrica y elementos urbanos con auto-ensamblado (*snapping*) ([G05](01_talleres_clase/G05_digitalizacion_topologia.md)). Cálculo de atributos geométricos (`area_km2`, `long_m`), simbología temática y diseño de impresión A3 ([G06](01_talleres_clase/G06_atributos_simbologia.md)) · **Quiz 2 (`Q2`, 8%)**.
  - *Semana 7 (27 ago):* Geoprocesamiento (*Buffer* de retiros de protección de 30 m según POT/Corantioquia, *Clip*, *Dissolve*, *Intersect*) y consulta vectorial en vivo vía WFS de GeoMedellín ([G07](01_talleres_clase/G07_geoprocesamiento_wfs.md)).
  - *Semanas 8–10 (03 al 17 sep):* Consolidación vectorial de la cuenca, validación con el **Plugin Comprobador de topología de QGIS (*Topology Checker*)** (0 errores de solapes, huecos o *dangles*) y **Sustentación Oral del Informe 1 (`I1`, 12%, 17 sep)**.
- **Semanas 11–13 (24 sep al 15 oct · Parcial 1 + Módulo 2 — SIG Ráster y Análisis del Relieve):**
  - *Semana 11 (24 sep):* **Parcial 1 (`P1`, 15%)** individual en PC (100% Vectorial) + **Inicio Módulo 2 (Ráster):** Píxel, resolución, descarga de DEM ALOS PALSAR 12.5 m RTC, recorte a la cuenca y reproyección estricta a CTM12 (`EPSG:9377`) ([G08](01_talleres_clase/G08_descarga_dem_raster.md)).
  - *Semana 12 (01 oct):* Modelación de pendientes en grados sexagesimales y porcentaje (%), reclasificación normativa según el POT ($<15^\circ, 15^\circ\text{--}30^\circ, >30^\circ$), aspecto y sombreado 3D (*hillshade* 315°/45°) ([G09](01_talleres_clase/G09_dem_pendientes_hillshade.md)).
  - *Semana de Receso Estudiantil (08 oct):* Pausa académica universitaria y repaso autónomo ([TALLER_REPASO_Q3.md](02_talleres_repaso/TALLER_REPASO_Q3.md)).
  - *Semana 13 (15 oct):* Álgebra de mapas booleana (*Raster Calculator*), extracción de curvas de nivel y perfil topográfico longitudinal de La Iguaná ([G10](01_talleres_clase/G10_raster_calculator_perfiles.md)) · **Quiz 3 (`Q3`, 8% — Terreno y Álgebra Ráster)**.
- **Semana 14 (Jueves 22 de octubre · Módulo 3 + Módulo 4 Compactados en QGIS):**
  - **Bloque 1 (12:00–3:00 p.m.):**
    - **(a) Cápsula M3 (GNSS Esencial en Gabinete):** Conceptos clave de posicionamiento satelital (segmentos, constelaciones, trilateración con 4 satélites, DOP, *multipath*, niveles Navegador/DGPS/RTK) e importación demostrativa GPX/CSV en QGIS ([G11](01_talleres_clase/G11_gnss_gabinete_importacion.md)). **Sin entrega evaluativa de GNSS en los informes.**
    - **(b) M4: Teledetección Satelital e Índices Espectrales en QGIS:** Espectro electromagnético (Visible, NIR, SWIR), firmas espectrales (agua, suelo/concreto, vegetación y salto del rojo), misión Sentinel-2 MSI (bandas 10 m y 20 m), descarga de escenas satelitales (Copernicus Browser / recortes locales), combinación de bandas en QGIS (Color Verdadero RGB 4-3-2 y Falso Color Infrarrojo 8-4-3) y cálculo de índices biofísicos normalizados (`NDVI` y `NDBI`) en la Calculadora Ráster de QGIS en `EPSG:9377` ([G12](01_talleres_clase/G12_teledeteccion_sentinel2.md) y [G13](01_talleres_clase/G13_indices_espectrales_qgis.md)).
  - **Bloque 2 (4:30–6:00 p.m.):** Taller práctico en laboratorio PC con QGIS (`G11` demostrativo + `G12` y `G13` en QGIS): composición multibanda Sentinel-2, cálculo de `NDVI` y `NDBI` sobre La Iguaná e integración visual con el *Hillshade* y pendientes de la cuenca · Apertura de recuperación activa de `Q3`.
- **Semana 15 (Jueves 29 de octubre · Módulo 5 — Presentación de ArcGIS Pro y Automatización Espacial + Quiz 4):**
  - **Bloque 1 (12:00–3:00 p.m.):** **M5: Presentación de ArcGIS Pro y Automatización Espacial ([G14](01_talleres_clase/G14_arcgis_pro_gdb.md) + [G15](01_talleres_clase/G15_arcgis_modelbuilder.md)):** Entorno `.aprx`, estructura de File Geodatabase (`.gdb`), Feature Datasets en `EPSG:9377`, demostración de dominios y servicios ArcGIS REST, y automatización de flujos de geoprocesamiento con **ModelBuilder** y el **Diseñador Gráfico de Modelos de QGIS**. **Revisión de avance del Informe Final (`IF`)**.
  - **Bloque 2 (4:30–6:00 p.m.):** Aplicación del **Quiz 4 (`Q4`, 8%, 45 min)** individual en PC sobre **Posicionamiento GNSS en Gabinete y Control de Calidad por `HDOP` (`G11`)** + taller asistido en QGIS para el Informe Final (`IF`).
- **Semana 16 (Jueves 05 de noviembre · Módulo 6 — Cierre Integrador + P2 + Entrega/Sustentación `IF`):**
  - **Bloque 1 (12:00–3:00 p.m.):** **Parcial Práctico 2 (`P2`, 15%, 90 min en QGIS)** individual en PC (excluyente de evaluaciones previas: cálculo de `NDVI` y `NDBI` Sentinel-2, vectorización de presión urbana `DN = 1`, modelo automatizado en el Modelador Gráfico de QGIS `.model3` y mapa síntesis PDF) + verificación QA/QC ([G16](01_talleres_clase/G16_cierre_integracion_territorial.md)).
  - **Bloque 2 (4:30–6:00 p.m., 90 min):** **Entrega y Sustentación Oral (7 min Pitch + 3 min Preguntas Individuales por equipo) del Informe Final (`IF`, 26%)** proyectando la Lámina A3 y el análisis territorial en QGIS.

---

## 3. Estructura de las Entregas Oficiales (`I1` + `IF`)

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ I1: Diagnóstico Cartográfico y Propuesta Territorial (12%)              │
│ Semana 10 (17 sep) · Lámina Digital A3 (PDF 300 ppp) + GPKG Limpio      │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Insumo vectorial validado
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ IF: Informe Final de Análisis Territorial con Sustentación (26% Total)  │
│ Avance: Semana 15 (29 oct) · Entrega y Sustentación: Semana 16 (05 nov) │
├─────────────────────────────────────────────────────────────────────────┤
│ • Proyecto QGIS en EPSG:9377 (proyecto_iguana.gpkg + .qgz) + 3 rásteres │
│   base (pendiente_iguana_9377.tif, ndvi_iguana_9377.tif, ndbi_iguana)   │
│ • Lámina Cartográfica A3 de Síntesis Territorial (PDF 300 dpi)          │
│ • Informe Ejecutivo de Análisis Territorial y Propuesta (4 a 5 págs.)   │
│ • Sustentación Oral en Clase (10 min: 7 min Pitch + 3 min Preguntas)    │
└─────────────────────────────────────────────────────────────────────────┘
```

### I1 — Diagnóstico Cartográfico y Propuesta Territorial (12%, Semana 10 — 17 de septiembre · *Realizada*)
- **Instructivo oficial:** [INSTRUCTIVO_ENTREGA_I1.md](03_evaluaciones/INSTRUCTIVO_ENTREGA_I1.md)
- **Objetivo:** Construir la base vectorial rigurosa de la cuenca, validada con el Comprobador de topología, y sustentar una propuesta territorial interdisciplinaria (Civil + Diseño Urbano) para La Iguaná.
- **Entregables cumplidos:**
  1. Base de datos espacial `datos_iguana_9377.gpkg` con capas de cuenca, red hídrica jerarquizada, franja urbana, fajas de retiro hídrico (*Buffer*) y polígonos/ejes de la propuesta de intervención, sin solapes ni inconsistencias.
  2. Archivo de proyecto QGIS (`.qgz`) configurado con **rutas relativas** y en `EPSG:9377`.
  3. **Lámina técnica A3 horizontal** ($420 \times 297\text{ mm}$) exportada a **PDF vectorial a 300 ppp**, con los 8 elementos anatómicos indispensables, escala redonda fija y cuadrícula CTM12 en metros.

---

### IF — Informe Final de Análisis Territorial con Sustentación Oral (26%, Semana 16 — 05 de noviembre · Avance: 29 de octubre)

- **Instructivo oficial:** [INSTRUCTIVO_ENTREGA_IF.md](03_evaluaciones/INSTRUCTIVO_ENTREGA_IF.md)
- **Enfoque:** El **Informe Final (`IF`, 26% del curso)** cierra el proyecto integrador en **QGIS (`EPSG:9377`)**, con entregables simplificados y enfocado en el **análisis territorial y la toma de decisiones de Ingeniería Civil y Diseño Urbano**:
  1. **Proyecto en QGIS (`proyecto_iguana.gpkg` + `proyecto_iguana.qgz`) y 3 rásteres base en `EPSG:9377`:** Integra el relieve (`pendiente_iguana_9377.tif`), la respuesta multiespectral Sentinel-2 (`ndvi_iguana_9377.tif` y `ndbi_iguana_9377.tif`) y la capa final de **Zonas Prioritarias de Intervención (`area_ha`)**.
  2. **Lámina Cartográfica A3 de Síntesis (`Lamina_Sintesis_A3_grupoXX.pdf`, 300 dpi).**
  3. **Informe Ejecutivo de Análisis Territorial (`Informe_Territorial_grupoXX.pdf`, 4 a 5 páginas):** Interpretación de indicadores espaciales y propuesta interdisciplinaria Civil + Diseño Urbano (sin recetarios paso a paso ni capturas de menús).
  4. **Sustentación Oral en Clase (10 min por equipo el 05 de noviembre, Bloque 2):** 7 minutos de Pitch de consultoría + 3 minutos de preguntas individuales del docente.

---

## 4. Reglas y Criterios de Calidad

1. **Rutas Relativas Obligatorias:** Todo proyecto QGIS (`.qgz`) debe abrir limpio en cualquier computador sin arrojar el error de *«Capas no disponibles»*. El uso de rutas absolutas o empaquetados rotos tiene penalización directa de **−0.5** en la nota.
2. **Prohibido el uso de Shapefiles sueltos:** Las entregas vectoriales deben almacenarse exclusivamente en **GeoPackage (`.gpkg`)**.
3. **Coherencia Geodésica (`EPSG:9377`) y Topológica:** Todas las capas vectoriales y ráster entregadas deben encontrarse en **MAGNA-SIRGAS / Origen Nacional CTM12 (`EPSG:9377`)**, sin superposiciones internas, polígonos residuales ni autointersecciones.
4. **Rúbricas previas:** Cada entrega (`I1`, `IF`) dispone de su instructivo y rúbrica analítica en `03_guias/03_evaluaciones/` para orientar la autoevaluación de los equipos antes de la entrega.
