# Geomática, Ingeniería y SIG: Sílabo del Curso

> **Semestre / Hito:** **2026-1 (Estado de cierre ejecutado)**  
> **Pregrados:** Ingeniería Civil · Diseño Urbano  
> **Créditos Académicos y UMEs:** **3 Créditos Académicos · 5 UMEs** (`144 h totales en el semestre`: $4.5\text{ h/semana}$ de acompañamiento presencial directo $[72\text{ h}]$ + $4.5\text{ h/semana}$ de trabajo independiente $[72\text{ h}]$)  
> **Duración:** 16 semanas · sesión presencial de 4.5 h en dos bloques:  
> **Bloque 1, 12:00–3:00 p.m.** (aula, teoría / conceptualización / evaluaciones) y  
> **Bloque 2, 4:30–6:00 p.m.** (laboratorio, PC de la Universidad, práctica de software y geoservicios)  
> **Plataforma:** Teams (comunicación, materiales y entregas)  

---

## Descripción

Curso teórico-práctico que introduce los fundamentos de la geomática, la cartografía y los Sistemas de Información Geográfica (SIG) como herramientas para la toma de decisiones espaciales en proyectos de ingeniería civil y diseño urbano. El curso ejecuta el 100 % de su componente práctico y evaluativo en **QGIS LTR** (integrando geoservicios oficiales, procesamiento multiespectral Sentinel-2 y modelamiento gráfico `.model3`, con una sesión demostrativa/comparativa de **ArcGIS Pro** en la Semana 15) y se articula alrededor de un **proyecto territorial continuo y compartido** sobre la **cuenca de la Quebrada La Iguaná** (Medellín), desarrollado acumulativamente desde la primera hasta la última semana de clases.

---

## Competencias

Al finalizar el curso el estudiante será capaz de:

1. **Leer, interpretar y producir cartografía técnica** bajo los sistemas de referencia oficiales de Colombia (MAGNA-SIRGAS / Origen Nacional CTM12, Res. 471-2020 IGAC).
2. **Crear, editar, limpiar topológicamente y analizar datos espaciales vectoriales y ráster** en **QGIS LTR** utilizando el estándar abierto GeoPackage (`.gpkg`), reconociendo su equivalencia conceptual con File Geodatabases (`.gdb`) en ArcGIS Pro.
3. **Consumir e integrar geoservicios en tiempo real** (WMS, WMTS, WFS y servicios REST) provenientes de Infraestructuras de Datos Espaciales (GeoMedellín, AMVA, SIATA, Colombia en Mapas).
4. **Comprender los principios de posicionamiento satelital GNSS** (constelaciones, trilateración, DOP, efecto multitrayectoria y métodos diferenciales DGPS/RTK) e importar trazas de campo (GPX/CSV) en entornos SIG.
5. **Procesar imágenes satelitales multiespectrales (Sentinel-2 MSI) en QGIS** para combinar bandas ópticas/infrarrojas y derivar índices biofísicos normalizados (`NDVI`, `NDBI`) aplicados al diagnóstico ambiental y urbano.
6. **Automatizar flujos de trabajo de geoprocesamiento** mediante el **Diseñador Gráfico de Modelos de QGIS** (`.model3`, comprendiendo su equivalencia con *ModelBuilder* en ArcGIS Pro) y comunicar resultados mediante láminas cartográficas digitales de estándar profesional (A3 a 300 ppp).

---

## Stack Tecnológico Oficial (Estado de Cierre `2026-1`)

> **Balance de ejecución `2026-1`:** El 100 % del trabajo práctico, talleres evaluables, parciales (`P1`, `P2`), quices (`Q1`–`Q4`) y entregas del proyecto integrador (`I1`, `IF`) se ejecutó y evaluó en **QGIS LTR** (`EPSG:9377`, contenedor único `.gpkg`, procesamiento multiespectral Sentinel-2 y modelos `.model3`). **ArcGIS Pro** (`G14`/`G15`) se abordó únicamente como sesión demostrativa/conceptual en la Semana 15 sin evaluación práctica, insumo clave registrado en [`LECCIONES_APRENDIDAS_CURSO.md`](LECCIONES_APRENDIDAS_CURSO.md) para el rediseño `2027-1`.

| Herramienta | Uso en el Curso | Modalidad de Acceso |
|---|---|---|
| **QGIS (versión LTR)** | Motor práctico 100 % ejecutado y evaluado: cartografía, geoprocesamiento vectorial, topología, relieve ráster, teledetección Sentinel-2 y automatización (`.model3`) | Descarga libre y gratuita / Instalado en laboratorio |
| **Geoservicios (WMS / WFS / REST)** | Conexión en vivo a catastro, ortofotos e hidrología (GeoMedellín, AMVA, SIATA, IGAC) | Acceso web mediante URLs oficiales en QGIS |
| **STAC API Browser (QGIS) / Sentinel-2 MSI** | Búsqueda y descarga directa en QGIS por zona de interés (`limite_iguana.geojson`), recorte a `EPSG:9377` y evaluación local de índices (`NDVI` / `NDBI`) | Complemento `STAC API Browser` (`Earth Search`) + respaldo en `EPSG:9377` |
| **ArcGIS Pro** | Sesión demostrativa/conceptual en Semana 15: File Geodatabases (`.gdb`), servicios REST de ESRI y equivalencia conceptual con ModelBuilder (sin evaluación práctica) | Licencia institucional en los PC del laboratorio |

---

## Módulos de Aprendizaje

### M0: Fundamentos cartográficos, geodesia y territorio base *(Semanas 1–3)*
Lectura de mapas, escala numérica y gráfica, resolución espacial. Sistemas de coordenadas geográficas y proyectadas en Colombia: Datum Bogotá, MAGNA-SIRGAS, Origen Nacional CTM12 (`EPSG:9377`). Reconocimiento inicial de la cuenca de La Iguaná en visores digitales (`G01`, `G02`, `G03`). Evaluación: **Quiz 1 (`Q1`, 8%)**.

### M1: SIG Vectorial, topología y geoservicios con QGIS *(Semanas 4–11)*
Entorno QGIS, contenedor GeoPackage (`.gpkg`), rutas relativas. Conexión a servicios WMS/WMTS (ortofotos). Digitalización avanzada y auto-ensamblado (*snapping*). Modelo de atributos, calculadora de campos y simbología. Geoprocesamiento (Buffer, Clip, Dissolve, Intersect) y descarga vectorial vía WFS. Maquetación digital A3 y control de calidad con el *Plugin Comprobador de topología* de QGIS (reglas de solapes, huecos y *dangles*) (`G04`–`G07`). Evaluaciones: **Quiz 2 (`Q2`, 8%)**, **Informe 1 (`I1`, 12%)** y **Parcial 1 (`P1`, 15%)**.

### M2: SIG Ráster y análisis del relieve *(Semanas 11–13)*
Modelos Digitales de Elevación (DEM SRTM y ALOS PALSAR 12.5 m). Reproyección a CTM12 (`EPSG:9377`). Pendientes (grados y porcentaje), aspecto y sombreado 3D (*hillshade*). Álgebra de mapas (*Raster Calculator*) para zonificación de susceptibilidad y amenaza en laderas. Curvas de nivel y perfil longitudinal del cauce de La Iguaná (`G08`, `G09`, `G10`). Evaluación: **Quiz 3 (`Q3`, 8%)**.

### M3 + M4: Cápsula GNSS en Gabinete y Teledetección Satelital en QGIS *(Semana 14 — 22 de octubre)*
- **Cápsula M3 (GNSS Esencial en Gabinete):** Segmentos espacial/control/usuario, constelaciones (GPS, GLONASS, Galileo, BeiDou), principio de trilateración con mínimo 4 satélites, dilución de precisión (PDOP/HDOP), error por multitrayectoria (*multipath*) en cañones urbanos, niveles de precisión (Navegador, DGPS, RTK) e importación demostrativa GPX/CSV en QGIS (`G11`). *Sin entrega evaluativa de GNSS en los informes.*
- **M4 (Teledetección Multiespectral, Descarga STAC por AOI y Evaluación de Índices en QGIS):** Espectro electromagnético (Visible, NIR, SWIR), firmas espectrales (agua, suelo/concreto, vegetación sana y *salto del rojo*), misión Sentinel-2 MSI L2A (bandas de 10 m y 20 m), **búsqueda y descarga directa dentro de QGIS para la zona de interés (`limite_iguana.geojson`) mediante `STAC API Browser` (`Earth Search`)**, recorte y reproyección por máscara a `EPSG:9377`, auditoría de reflectancias por píxel y **cálculo + evaluación integral de los índices `NDVI` y `NDBI` ahí mismo en QGIS** (simbología pseudocolor, histograma bimodal, `Estadísticas de capa ráster`, umbralización booleana biespectral, poligonización a hectáreas y fusión 3D con *Hillshade*) (`G12`, `G13`).

### M5: SIG Corporativo con ArcGIS Pro y Automatización Espacial *(Semana 15 — 29 de octubre)*
Presentación de ArcGIS Pro: entorno `.aprx`, estructura de File Geodatabase (`.gdb`), Feature Datasets en `EPSG:9377`, demostración de dominios y servicios ArcGIS REST (`G14`). Automatización de flujos de geoprocesamiento con **ModelBuilder** y su equivalencia directa en el **Diseñador Gráfico de Modelos de QGIS** (`G15`). Aplicación del **Quiz 4 (`Q4`, 8%, 45 min)** sobre **Posicionamiento GNSS en Gabinete y Control de Calidad por `HDOP` (`G11`)** y revisión de avance / taller asistido en QGIS para el **Informe Final (`IF`)**.

### M6: Cierre integrador y evaluación final *(Semana 16 — 05 de noviembre)*
- **Bloque 1 (12:00–3:00 p.m.):** **Parcial Práctico 2 (`P2`, 15%, 90 min / 1h30m)** individual en PC en **QGIS** (excluyente de evaluaciones anteriores: cálculo directo de `NDVI` y `NDBI` en Calculadora Ráster de QGIS, vectorización de presión urbana `DN = 1`, modelo automatizado `.model3` en el Diseñador Gráfico de Modelos de QGIS y mapa síntesis PDF) y protocolo QA/QC (`G16`).
- **Bloque 2 (4:30–6:00 p.m.):** **Entrega Única y Sustentación Oral (10 min por equipo: 7 min Pitch + 3 min Defensa Individual) del Informe Final (`IF`, 26% del curso)** en **QGIS** proyectando la Lámina A3 de síntesis territorial (`grupoXX_IF.zip`).

---

## Proyecto Territorial Continuo: Cuenca de La Iguaná

Todo el semestre se articula alrededor de un único territorio real: la **Cuenca de la Quebrada La Iguaná** (46.25 km²), que abarca desde los 2.950 msnm en el Alto de Boquerón (San Cristóbal) hasta los 1.450 msnm en el Río Medellín (Plaza Minorista).

Las entregas grupales se desarrollan de forma acumulativa en **equipos fijos de 2 a 3 estudiantes** trabajando en **QGIS**. El cierre del semestre se consolida en el **Informe Final (`IF`, 26% del curso: 20% Entrega Técnica y Análisis Territorial + 6% Sustentación Oral) el jueves 05 de noviembre**, enfocado en el **análisis territorial y propuesta de intervención** con solo 3 entregables dentro de `grupoXX_IF.zip`:

| Entrega | Semana (Fecha) | % | Foco del Proyecto Integrador | Formato Oficial |
|:---:|:---:|:---:|---|---|
| **I1: Diagnóstico Cartográfico y Propuesta** | 10 (17 sep) | **12%** | Capas base vectoriales en `.gpkg` + fajas de retiro hídrico (Buffer) + propuesta territorial interdisciplinar (Civil + Diseño Urbano). Limpieza con Comprobador de topología. | Lámina digital A3 horizontal exportada a PDF (300 ppp) + `.gpkg` + sustentación (**Realizada**) |
| **IF: Informe Final de Análisis Territorial y Propuesta de Intervención con Sustentación** | 16 (05 nov)<br>*(Avance: 29 oct)* | **26%**<br>*(20% + 6%)* | Diagnóstico territorial integrado en **QGIS (`EPSG:9377`)** combinando relieve (`pendiente`, `hillshade`), teledetección (`NDVI`, `NDBI`) y retiro hídrico (`30 m`) para priorizar sectores críticos y formular una propuesta de Ingeniería Civil y Diseño Urbano. | Paquete único simplificado `grupoXX_IF.zip` (`1_proyecto_qgis/`, `2_Lamina_Sintesis_A3_grupoXX.pdf`, `3_Informe_Territorial_grupoXX.pdf` de 4–5 págs.) + Sustentación Oral 10 min ([`INSTRUCTIVO_ENTREGA_IF.md`](../03_guias/03_evaluaciones/INSTRUCTIVO_ENTREGA_IF.md)) (**Realizada**) |

---

## Sistema de Evaluación y Ruta de Mejora Activa

> Cumple con el Reglamento Académico de Pregrado de EAFIT (porcentajes entre 5% y 20%).  
> Los parciales (`P1`, `P2`) y quices (`Q1`–`Q4`) son **individuales**. Los informes (`I1`, `IF`) son **grupales**.

| Código | Actividad Evaluativa | % | Modalidad | Semana (Fecha) | Taller de Repaso Previo | Instructivo Oficial de Evaluación | Estado / Ruta de Mejora Activa |
|:---:|---|:---:|---|:---:|---|---|---|
| **Q1** | Quiz 1: Fundamentos cartográficos y CTM12 | **8%** | Individual, presencial | 3 (30 jul) | [TALLER_REPASO_Q1.md](../03_guias/02_talleres_repaso/TALLER_REPASO_Q1.md) | [INSTRUCTIVO_EVALUACION_Q1.md](../03_guias/03_evaluaciones/INSTRUCTIVO_EVALUACION_Q1.md) | **Realizado** · Recuperado en S4 en QGIS |
| **Q2** | Quiz 2: SIG vectorial y atributos | **8%** | Individual, laboratorio | 6 (20 ago) | [TALLER_REPASO_Q2.md](../03_guias/02_talleres_repaso/TALLER_REPASO_Q2.md) | [INSTRUCTIVO_EVALUACION_Q2.md](../03_guias/03_evaluaciones/INSTRUCTIVO_EVALUACION_Q2.md) | **Realizado** · Recuperado en S7 con topología |
| **I1** | **Informe 1: Diagnóstico y Propuesta A3** | **12%** | Grupal (Lámina A3 + `.gpkg`) | 10 (17 sep) | [G06](../03_guias/01_talleres_clase/G06_atributos_simbologia.md) / [G07](../03_guias/01_talleres_clase/G07_geoprocesamiento_wfs.md) | [INSTRUCTIVO_ENTREGA_I1.md](../03_guias/03_evaluaciones/INSTRUCTIVO_ENTREGA_I1.md) | **Realizado** · Sustentación oral proyectada |
| **P1** | **Parcial 1: SIG Vectorial y Topología** | **15%** | Individual, práctico PC | 11 (24 sep) | [TALLER_REPASO_P1.md](../03_guias/02_talleres_repaso/TALLER_REPASO_P1.md) | [INSTRUCTIVO_EVALUACION_P1.md](../03_guias/03_evaluaciones/INSTRUCTIVO_EVALUACION_P1.md) | **Realizado** · Examen oficial parcial |
| **Q3** | Quiz 3: Terreno y Álgebra Ráster | **8%** | Individual, laboratorio | 13 (15 oct) | [TALLER_REPASO_Q3.md](../03_guias/02_talleres_repaso/TALLER_REPASO_Q3.md) | [INSTRUCTIVO_EVALUACION_Q3.md](../03_guias/03_evaluaciones/INSTRUCTIVO_EVALUACION_Q3.md) | **Realizado** · Recuperado en S14 (22 oct) |
| **Q4** | Quiz 4: Posicionamiento GNSS en Gabinete y Control de Calidad (`HDOP`) | **8%** | Individual, práctico PC en QGIS (45 min) | 15 (29 oct) | [TALLER_REPASO_Q4.md](../03_guias/02_talleres_repaso/TALLER_REPASO_Q4.md) | [INSTRUCTIVO_EVALUACION_Q4.md](../03_guias/03_evaluaciones/INSTRUCTIVO_EVALUACION_Q4.md) | **Realizado** · Exclusivo `S11/G11` en QGIS |
| **P2** | **Parcial 2: Índices Sentinel-2 (`NDVI`/`NDBI`), Modelo Automatizado `.model3` y Mapa en QGIS** | **15%** | Individual, práctico PC en QGIS (90 min / 1h30m) | 16 (05 nov) | [TALLER_REPASO_P2.md](../03_guias/02_talleres_repaso/TALLER_REPASO_P2.md) | [INSTRUCTIVO_EVALUACION_P2.md](../03_guias/03_evaluaciones/INSTRUCTIVO_EVALUACION_P2.md) | **Realizado** · Exclusivo `S12–S15` en QGIS |
| **IF** | **Informe Final (`IF`): Análisis Territorial, Propuesta de Intervención, Lámina A3 y Sustentación Oral en QGIS** | **26%**<br>*(20% + 6%)* | Grupal en QGIS (`grupoXX_IF.zip` + Defensa Oral 10 min) | 16 (05 nov) | [G08](../03_guias/01_talleres_clase/G08_descarga_dem_raster.md)–[G16](../03_guias/01_talleres_clase/G16_cierre_integracion_territorial.md) | [INSTRUCTIVO_ENTREGA_IF.md](../03_guias/03_evaluaciones/INSTRUCTIVO_ENTREGA_IF.md)<br>*(Opcional reemplazo 20% técnico: [INSTRUCTIVO_TALLER_RECUPERACION_IF.md](../03_guias/03_evaluaciones/INSTRUCTIVO_TALLER_RECUPERACION_IF.md))* | **Realizado** · Entrega Técnica (`20%`) + Sustentación Oral (`6%`) + Taller opcional de reemplazo en Cuenca La Ayurá |
| **Total** | | **100%** | | | | | **100% Ejecutado (`2026-1`)** |

---

## Cronograma Semanal

| S | Fecha | Mód. | Bloque 1 · 12:00–3:00 p.m. (Aula / PC) | Bloque 2 · 4:30–6:00 p.m. (Laboratorio PC) | Guía de Taller de Clase | Evaluación / Hito |
|:---:|:---:|:---:|---|---|:---:|:---:|
| **1** | 16 jul | M0 | Presentación · Pacto pedagógico · ¿Qué es geomática? · Escala y lectura de mapas · La Cuenca de La Iguaná | Reconocimiento en visores digitales (Google Earth, OSM, Colombia en Mapas) | [**G01**](../03_guias/01_talleres_clase/G01_exploracion_visores_digitales.md) | — |
| **2** | 23 jul | M0 | Escala numérica/gráfica · Distancias y áreas reales · Píxel y resolución · Coordenadas geográficas (GMS ↔ Decimal) | Medición en visor PDF a zoom calibrado de La Iguaná (longitud, lotes, retiros) | [**G02**](../03_guias/01_talleres_clase/G02_taller_escalas_coordenadas.md) | Repaso sugerido: [TALLER_REPASO_Q1.md](../03_guias/02_talleres_repaso/TALLER_REPASO_Q1.md) |
| **3** | 30 jul | M0 | Geodesia: Datum Bogotá → MAGNA-SIRGAS, CTM12 (`EPSG:9377`), Res. 471/2020 · **Quiz 1** | Georreferenciación de planos y cálculo manual de coordenadas CTM12 | [**G03**](../03_guias/01_talleres_clase/G03_datum_ctm12_georreferenciacion.md) | **Q1 (8%)** |
| **4** | 06 ago | M1 | Entorno QGIS: interfaz, CRS de proyecto, creación de `proyecto_iguana.gpkg` · **Geoservicios WMS/WMTS** | Conexión a ortofoto GeoMedellín / AMVA · Apertura Recuperación Q1 | [**G04**](../03_guias/01_talleres_clase/G04_interfaz_qgis.md) | *Recuperación Q1 en QGIS* |
| **5** | 13 ago | M1 | Geometrías vectoriales · Reglas topológicas · Auto-ensamblado (*snapping*) | Trazado guiado de la red hídrica y fajas de retiro de La Iguaná | [**G05**](../03_guias/01_talleres_clase/G05_digitalizacion_topologia.md) | Repaso sugerido: [TALLER_REPASO_Q2.md](../03_guias/02_talleres_repaso/TALLER_REPASO_Q2.md) |
| **6** | 20 ago | M1 | Atributos: tipos de campos, calculadora (`area_m2`, `long_m`), simbología temática, halo y Diseñador A3 | Clasificación urbana de La Iguaná · Maquetación A3 · **Quiz 2** | [**G06**](../03_guias/01_talleres_clase/G06_atributos_simbologia.md) | **Q2 (8%)** |
| **7** | 27 ago | M1 | Geoprocesamiento (Buffer 30 m, Clip, Dissolve, Intersect) · **Geoservicios WFS** en vivo | Retiros de protección hídrica y cruce predial · Recuperación Q2 | [**G07**](../03_guias/01_talleres_clase/G07_geoprocesamiento_wfs.md) | *Recuperación Q2* |
| **8** | 03 sep | M1 | Consolidación vectorial para `I1`: integración de capas en GeoPackage, cruces prediales y diseño de lámina A3 | Taller asistido de composición cartográfica A3 y empaquetado con rutas relativas | [**G06**](../03_guias/01_talleres_clase/G06_atributos_simbologia.md) / [**G07**](../03_guias/01_talleres_clase/G07_geoprocesamiento_wfs.md) | Preparación I1 |
| **9** | 10 sep | M1 | **Plugin Comprobador de topología de QGIS (*Topology Checker*):** reglas de no solapes, no huecos y no *dangles* | Auditoría topológica de `proyecto_iguana.gpkg`, reparación de vértices y cierre de lámina A3 | [**G05**](../03_guias/01_talleres_clase/G05_digitalizacion_topologia.md) / [**G07**](../03_guias/01_talleres_clase/G07_geoprocesamiento_wfs.md) | Anuncio Sustentación I1 |
| **10** | 17 sep | M1 | **Sustentación Oral de Informe 1 (`I1`, 12% — Parte 1)** y retroalimentación de consultoría sobre láminas A3 | **Sustentación Oral `I1` (Parte 2)** + Simulacro preparatorio para Parcial 1 | [TALLER_REPASO_P1.md](../03_guias/02_talleres_repaso/TALLER_REPASO_P1.md) | **I1 (12%)** |
| **11** | 24 sep | M1/M2 | **Primer Examen Parcial (`P1`, 15%):** Evaluación práctica individual en PC (100% Vectorial: Geodesia CTM12, Topology Checker, Geoprocesamiento y Layout A3) | **Inicio Módulo 2 (Ráster):** Píxel, resolución, fuentes DEM (SRTM vs. ALOS PALSAR 12.5 m), recorte y reproyección a CTM12 (`EPSG:9377`) | [**G08**](../03_guias/01_talleres_clase/G08_descarga_dem_raster.md) | **P1 (15%)** |
| **12** | 01 oct | M2 | **Módulo 2 (Morfometría del Relieve):** Derivación de pendientes (grados y %), orientación de laderas (aspecto) y sombreado 3D (*hillshade* 315°/45°) | Modelación de laderas en QGIS, reclasificación por rangos normativos del POT ($<15^\circ, 15^\circ\text{--}30^\circ, >30^\circ$) y visualización 3D | [**G09**](../03_guias/01_talleres_clase/G09_dem_pendientes_hillshade.md) | Avance Ráster |
| — | **08 oct** | — | **Semana de Receso Estudiantil (Sin actividades presenciales)** | Pausa académica universitaria · Estudio autónomo y preparación | [**TALLER_REPASO_Q3**](../03_guias/02_talleres_repaso/TALLER_REPASO_Q3.md) | *Receso académico* |
| **13** | 15 oct | M2 | **Módulo 2 (Álgebra Ráster y Perfiles):** Calculadora Ráster booleana de amenaza, extracción de curvas de nivel y perfil longitudinal del cauce | Práctica integradora de álgebra de mapas y perfiles topográficos · **Quiz 3 (`Q3`, 8% — Terreno y Álgebra Ráster)** | [**G10**](../03_guias/01_talleres_clase/G10_raster_calculator_perfiles.md) | **Q3 (8%)** |
| **14** | 22 oct | M3/M4 | **(a) Cápsula M3 (GNSS Esencial en Gabinete):** Segmentos, constelaciones, trilateración con 4 satélites, DOP, *multipath*, niveles Navegador/DGPS/RTK e importación GPX/CSV (`G11`). **(b) M4 (Teledetección Satelital y Evaluación de Índices en QGIS):** Espectro electromagnético (Visible, NIR, SWIR), firmas espectrales y salto del rojo, misión Sentinel-2 L2A (10 m y 20 m), **descarga directa en QGIS de la zona de interés (`limite_iguana.geojson`) vía `STAC API Browser`**, recorte a `EPSG:9377`, y **cálculo + evaluación de `NDVI` y `NDBI` en QGIS** (estadísticas, histograma, máscaras booleanas y hectáreas). | Taller práctico en QGIS (`G11` + `G12` + `G13`): descarga de bandas Sentinel-2 de La Iguaná en QGIS, recorte por máscara a `EPSG:9377`, auditoría espectral y evaluación de `NDVI` y `NDBI` (estadísticas, umbralización biespectral, poligonización y fusión con *Hillshade*) · Apertura de recuperación activa de `Q3`. | [**G11**](../03_guias/01_talleres_clase/G11_gnss_gabinete_importacion.md) / [**G12**](../03_guias/01_talleres_clase/G12_teledeteccion_sentinel2.md) / [**G13**](../03_guias/01_talleres_clase/G13_indices_espectrales_qgis.md) | *Recuperación Q3*<br>Repaso: [TALLER_REPASO_Q4.md](../03_guias/02_talleres_repaso/TALLER_REPASO_Q4.md) |
| **15** | 29 oct | M5 | **M5: Presentación de ArcGIS Pro y Automatización Espacial (`G14` + `G15`):** Entorno `.aprx`, estructura de File Geodatabase (`.gdb`), Feature Datasets en `EPSG:9377`, demostración de dominios y servicios ArcGIS REST, y automatización de flujos de geoprocesamiento con **ModelBuilder** y el **Diseñador Gráfico de Modelos de QGIS**. Revisión de avance del **Informe Final (`IF`)**. | **Quiz 4 (`Q4`, 8%, 45 min)** individual en PC en QGIS sobre **Posicionamiento GNSS en Gabinete y Control de Calidad por `HDOP` (`S11/G11`)** + taller asistido de cruce territorial en QGIS para el **Informe Final (`IF`)**. | [**G14**](../03_guias/01_talleres_clase/G14_arcgis_pro_gdb.md) / [**G15**](../03_guias/01_talleres_clase/G15_arcgis_modelbuilder.md) | **Q4 (8%)**<br>Avance `IF`<br>Repaso: [TALLER_REPASO_P2.md](../03_guias/02_talleres_repaso/TALLER_REPASO_P2.md) |
| **16** | 05 nov | M6 | **Parcial Práctico 2 (`P2`, 15%, 90 min / 1h30m)** individual en PC en **QGIS** (excluyente de evaluaciones anteriores: cálculo directo de `NDVI` y `NDBI`, vectorización `DN = 1`, modelo automatizado `.model3` en QGIS y mapa síntesis PDF) + verificación QA/QC (`G16`). | **Entrega Única y Sustentación Oral (7 min Pitch + 3 min Preguntas Individuales por equipo) del Informe Final (`IF` = 26%)** en QGIS proyectando la Lámina A3 de síntesis y propuesta territorial (`grupoXX_IF.zip`). | [**G16**](../03_guias/01_talleres_clase/G16_cierre_integracion_territorial.md) | **P2 (15%) + IF (26%)** |

---

## Lecturas y Recursos de Consulta

### Cartografía, Geodesia y Geoservicios (Semanas 1–10)
- **IGAC — DANE.** *Adopción del Marco Geocéntrico Nacional de Referencia MAGNA-SIRGAS como Datum Oficial de Colombia.* Laura Sánchez Rodríguez, División de Geodesia. [redgeodesica.igac.gov.co](https://redgeodesica.igac.gov.co/).
- **IGAC.** *Resolución 471 de 2020: Adopción del Sistema de Proyección Cartográfica Oficial para Colombia (Origen Nacional CTM12).* [igac.gov.co](https://www.igac.gov.co/).
- **Infraestructura de Datos Espaciales para el Distrito de Medellín (GeoMedellín):** Catálogo de Geoservicios WMS/WFS/REST. [geomedellin.medellin.gov.co](https://geomedellin.medellin.gov.co/).
- **Área Metropolitana del Valle de Aburrá (AMVA):** Geocatálogo metropolitano y servicios WMS de coberturas e hidrología. [metropol.gov.co](https://www.metropol.gov.co/).
- **Documentación Oficial de QGIS (v. 3.x LTR):** Guía de usuario, digitalización avanzada, auto-ensamblado y comprobador de topología. [docs.qgis.org](https://docs.qgis.org/latest/en/docs/user_manual/).

### Relieve, Laderas y Riesgo en La Iguaná (Semanas 11–13)
- **Aristizábal, E. et al.** *A landslide susceptibility assessment in urban areas based on existing data: An example from the Iguaná Valley, Medellín City, Colombia.* Natural Hazards and Earth System Sciences.

### GNSS y Teledetección Multiespectral en QGIS (Semana 14)
- **Mendoza Dueñas, J.** *Topografía y Geodesia* (capítulo sobre posicionamiento satelital GNSS y corrección diferencial).
- **ESA — European Space Agency.** *Sentinel-2 User Handbook & MSI Spectral Bands.* Copernicus Data Space Ecosystem: [browser.dataspace.copernicus.eu](https://browser.dataspace.copernicus.eu/).
- **Chuvieco, E.** *Teledetección Ambiental: La observación de la Tierra desde el espacio.* Fundamentos físicos, firmas espectrales e índices de vegetación y urbanización (`NDVI`, `NDBI`).

### ArcGIS Pro y Automatización Espacial (Semanas 15–16)
- **ESRI.** *ArcGIS Pro Documentation: An overview of ModelBuilder.* [pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/modelbuilder/what-is-modelbuilder.htm](https://pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/modelbuilder/what-is-modelbuilder.htm).
- **QGIS Documentation.** *Graphical Modeler (Diseñador Gráfico de Modelos).* [docs.qgis.org/latest/en/docs/user_manual/processing/modeler.html](https://docs.qgis.org/latest/en/docs/user_manual/processing/modeler.html).
- **Gorr, W. & Kurland, K.** *GIS Tutorial for ArcGIS Pro.* Capítulos sobre geodatabases, simbología y flujos automatizados.

### Diseño Urbano y Territorio
- **Fang, Y., Shandas, V. & Arriaga, E.** *Spatial Thinking in Planning Practice: An Introduction to GIS.* Acceso abierto: [open.umn.edu/opentextbooks/textbooks/234](https://open.umn.edu/opentextbooks/textbooks/234).
