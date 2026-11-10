# Geomática, Ingeniería y SIG: Programa del Curso
**Versión docente (uso interno)**

> **Semestre / Hito:** **2026-1 (Estado de cierre ejecutado)**  
> **Pregrados:** Ingeniería Civil · Diseño Urbano  
> **Créditos Académicos y UMEs:** **3 Créditos Académicos · 5 UMEs** (`144 h totales en el semestre`: $4.5\text{ h/semana}$ presenciales $[72\text{ h}]$ + $4.5\text{ h/semana}$ de trabajo independiente $[72\text{ h}]$)  
> **Duración:** 16 semanas · 4.5 horas/sesión · 72h presenciales totales (+ 72h de trabajo autónomo)  
> **Estructura de sesión:** dos bloques separados por un descanso:  
> **Bloque 1, 12:00–3:00 p.m.** (aula/laboratorio: teoría, discusión, conceptualización, evaluaciones) y **Bloque 2, 4:30–6:00 p.m.** (laboratorio con PC de la Universidad: práctica de software, geoservicios y evaluaciones aplicadas).  
> **Cupo:** máx. 20 estudiantes  
> **Stack tecnológico ejecutado y evaluado (`2026-1`):** **100 % en QGIS LTR** (`EPSG:9377`, contenedor `.gpkg`, Geoservicios OGC, Sentinel-2 en Calculadora Ráster y Modelador Gráfico `.model3`) · **ArcGIS Pro** (`G14`/`G15`) quedó únicamente como sesión demostrativa/conceptual en la Semana 15 sin evaluación práctica (insumo registrado en [`LECCIONES_APRENDIDAS_CURSO.md`](LECCIONES_APRENDIDAS_CURSO.md) para el rediseño `2027-1`).  

---

## 1. Concepto central del curso

El curso se articula de principio a fin alrededor de un **proyecto territorial continuo y compartido**: la **cuenca de la Quebrada La Iguaná** (Medellín, ~46.25 km²). Desde la **Semana 1**, todo el curso trabaja sobre este mismo territorio, caracterizado por un pronunciado gradiente urbano-rural (bosque y laderas de alta pendiente en San Cristóbal vs. ciudad densa e infraestructura hidráulica en Robledo, Laureles-Estadio y la desembocadura en el Río Medellín).

Trabajar toda la clase sobre la misma cuenca garantiza:
1. **Comparación y detección de errores entre pares:** Los estudiantes pueden contrastar áreas calculadas, órdenes de drenaje y fajas de retiro en tiempo real.
2. **Construcción acumulativa:** Lo que se mide a mano en el Módulo 0 se valida digitalmente en QGIS en el Módulo 1, se modela tridimensionalmente con el relieve en el Módulo 2, se complementa con fundamentos GNSS y teledetección multiespectral Sentinel-2 en QGIS en los Módulos 3 y 4, y se presenta/automatiza en entornos SIG profesionales (ArcGIS Pro / QGIS) en el Módulo 5.
3. **Articulación interdisciplinaria genuina:**
   - **Ingeniería Civil:** infraestructura hidráulica (azud Cra. 80, presa de laminación Cra. 70), estabilidad de laderas, perfiles de flujo, obras de drenaje y redes viales.
   - **Diseño Urbano:** morfología urbana, fajas de retiro ambiental, espacio público, conectividad barrial, amenazas por avenidas torrenciales y contención de la expansión informal.

```text
Semana 1: Contacto territorial con La Iguaná (Visores digitales)
   ↓
Módulo 0 (Fundamentos & Geodesia, Semanas 1–3) ──→ Q1 (30 jul) ──→ [Recuperación en S4 con QGIS]
   ↓
Módulo 1 (SIG Vectorial, Topología & Geoservicios, Semanas 4–10) ──→ Q2 (20 ago) ──→ [Recuperación en S7 con Topología/WFS]
   │                                                             └──→ I1: Informe 1 (17 sep)
   ↓
P1: Parcial 1 (Vectorial 100%, 24 sep) + Inicio Módulo 2 (Ráster DEM, Semana 11)
   ↓
Módulo 2 (Morfometría, Pendientes, Hillshade, Álgebra Ráster y Perfiles, Semanas 11–13)
   ↓
[Semana de Receso Estudiantil (08 oct)]
   ↓
Cierre Módulo 2 (G10: Álgebra Ráster y Perfiles, Semana 13) ──→ Q3: Quiz 3 (15 oct)
   ↓
Módulo 3 (Cápsula GNSS Gabinete, G11) + Módulo 4 (Teledetección Sentinel-2 e Índices en QGIS, G12+G13, Semana 14 — 22 oct)
   ↓
Módulo 5 (ArcGIS Pro: GDB, REST & ModelBuilder / Modelos QGIS, G14+G15, Semana 15 — 29 oct) ──→ Q4: Quiz 4 (29 oct) + Avance IF
   ↓
Módulo 6: Cierre (Semana 16 — 05 nov) ──→ P2: Parcial 2 (Bloque 1) + Entrega/Sustentación Informe Final (IF, Bloque 2)
```

---

## 2. Metodología: Secuencia Fluida y Ruta de Mejora Activa

### Fluidez acumulativa de clase a clase
El curso sigue una secuencia de aprendizaje estricta: **lo que se enseña en el Bloque 1 se practica en el Bloque 2, y lo que se produce en una sesión se convierte en el insumo directo de la siguiente**. No hay ejercicios desconectados de la cuenca de La Iguaná.

### Mecanismo de "Ruta de Mejora Activa" (Recuperación post-quiz)
Para transformar los quices individuales (`Q1`–`Q4`) en oportunidades reales de aprendizaje profundo en vez de instancias punitivas:
- En la clase inmediatamente posterior a cada quiz, se introduce una **herramienta o técnica nueva** en el laboratorio.
- Los estudiantes que hayan cometido errores en el quiz tienen la opción de **aplicar esa nueva herramienta para diagnosticar, corregir y sustentar la solución correcta** a sus fallos.
- La entrega de la corrección justificada en el plazo fijado permite recuperar **hasta el 50% de la nota perdida** en el quiz (p. ej., quien obtuvo 1.0 puede subir hasta 3.0; quien obtuvo 3.0 puede subir hasta 4.0).
- **Relación pedagógica por evaluación:**
  - **Q1 (Cálculo manual de escala/coordenadas en S3) → Recuperación en S4:** En S4 aprendieron a cargar coordenadas en QGIS y verificar con el CRS CTM12, contrastando su cálculo manual con la medición digital exacta.
  - **Q2 (Digitalización y atributos en S6) → Recuperación en S7:** En S7 aplicaron geoprocesamiento y validación de geometrías/atributos para limpiar cruces y errores de su entrega.
  - **Q3 (Terreno y Álgebra Ráster en S13 — 15 oct) → Recuperación en S14 (22 oct):** En S14 corrigen y validan su flujo ráster de pendientes y álgebra booleana integrándolo con las capas multiespectrales de La Iguaná en QGIS.
  - **Q4 (Posicionamiento GNSS en Gabinete y Control de Calidad por `HDOP` en S15 — 29 oct) → Recuperación en S16 (05 nov):** En S16 corrigen la depuración de la traza GPX (`"hdop" <= 2.0`), la importación CSV y la validación posicional contra los vértices IGAC en `EPSG:9377`.

---

## 3. Módulos y Contenidos (Secuencia Ejecutada y Cierre Semestral)

### Módulo 0: Fundamentos cartográficos, geodesia y territorio base (Semanas 1–3 · 16 al 30 jul)
*Territorio: Cuenca de La Iguaná desde el primer día.*  
*Bloque 1 (aula): teoría y conceptos. Bloque 2 (laboratorio): exploración digital.*

- **Semana 1 (16 jul):** Presentación del curso, pacto pedagógico y conformación de grupos (2–3 personas). ¿Qué es la geomática? Lectura de mapas y concepto de escala. Introducción física y social a la Cuenca de La Iguaná.
  - *Lab (Bloque 2):* Taller `G01` en visores digitales (Google Earth, OpenStreetMap, Colombia en Mapas del IGAC). Primer reconocimiento visual de La Iguaná.
- **Semana 2 (23 jul):** Escala numérica vs. gráfica. Cálculo de distancias y áreas reales. Concepto de píxel y resolución espacial en sensores remotos. Coordenadas geográficas (lat/lon, GMS ↔ decimales).
  - *Lab (Bloque 2):* Taller `G02` (Parte 1): Medición a escala calibrada en el visor PDF/digital de La Iguaná (longitud del cauce ~15 km, fajas de retiro hídrico, dimensiones de manzanas urbanas).
- **Semana 3 (30 jul):** Geodesia en Colombia: forma de la Tierra, geoide, elipsoide. Del Datum Bogotá a MAGNA-SIRGAS. El sistema oficial actual: Origen Nacional CTM12 (`EPSG:9377`) y Resolución 471 de 2020 del IGAC. Distorsiones y proyecciones.
  - *Aula (Bloque 1):* **Quiz 1 (`Q1`, 8% — Fundamentos cartográficos y geodesia)**.
  - *Lab (Bloque 2):* Taller `G03`: Georreferenciación y verificación de coordenadas CTM12 en puntos clave de La Iguaná (nacimiento en Boquerón, obras hidráulicas de Cra. 80/70, desembocadura).

---

### Módulo 1: SIG Vectorial, Topología y Geoservicios con QGIS (Semanas 4–11 · 06 ago al 24 sep)
*Herramienta: QGIS (LTR) + Contenedor GeoPackage (`.gpkg`). Se abandona el formato Shapefile para evitar pérdida de `.prj` y nombres truncados.*

- **Semana 4 (06 ago):** Entorno QGIS: interfaz, paneles, barra de estado, configuración de CRS de proyecto (`EPSG:9377`). Manejo de datos: creación de `proyecto_iguana.gpkg`. Carga de capas vectoriales locales y CSV de coordenadas. Guardado con **rutas relativas** (`G04`).
  - *Geoservicios:* Conexión y consulta de servicios **WMS y WMTS** (Ortofoto de alta resolución de Medellín, cartografía base IGAC, mapas base de ESRI/OSM).
  - *Lab (Bloque 2):* Montaje del proyecto base y aplicación de la herramienta de verificación de coordenadas para la **Recuperación Activa de Q1**.
- **Semana 5 (13 ago):** Geometrías vectoriales (puntos, líneas, polígonos). Digitalización avanzada: barra de auto-ensamblado (*snapping*), tolerancia, trazado automático, evitar auto-intersecciones y llenado de anillos (*fill ring*) (`G05`).
  - *Lab (Bloque 2):* Digitalización rigurosa de elementos de la cuenca (cauce principal jerarquizado, afluentes, manzanas de la franja baja).
- **Semana 6 (20 ago):** Tablas de atributos: tipos de datos (enteros, reales, texto), normalización de campos (`snake_case`). Calculadora de campos: expresiones, cálculo de geometría (`$area / 1000000` para km², `$length` para m). Simbología temática (categorizada y graduada) y etiquetado con halo protector (`G06`).
  - *Lab (Bloque 2):* Clasificación temático-urbana de La Iguaná y **Quiz 2 (`Q2`, 8% — QGIS Vectorial y atributos)**.
- **Semana 7 (27 ago):** Geoprocesamiento vectorial avanzado: *Buffer* (fajas de retiro legal de 30 m según POT/Corantioquia), *Clip* (recorte con polígono de cuenca), *Dissolve*, *Intersect* y *Spatial Join* (`G07`).
  - *Geoservicios avanzados:* Conexión a servicios **WFS (Web Feature Service)** de GeoMedellín e Infraestructuras de Datos Espaciales para descargar capas vectoriales oficiales en tiempo real.
  - *Lab (Bloque 2):* Generación de zonas de afectación hidráulica sobre La Iguaná y aplicación de la **Recuperación Activa de Q2**.
- **Semana 8 (03 sep):** Consolidación vectorial de la cuenca para `I1`: depuración de capas, cruce de información predial y maquetación de lámina técnica A3 horizontal en el Diseñador de Impresión de QGIS.
- **Semana 9 (10 sep):** Control de calidad vectorial con el **Plugin Comprobador de topología de QGIS (*Topology Checker*)**: configuración de reglas espaciales (*no superposiciones*, *no huecos*, *no dangles*), inspección de la tabla de errores y reparación con la Herramienta de Vértices. Cierre de maqueta A3 y anuncio de sustentación de `I1`.
- **Semana 10 (17 sep):** **Sustentaciones Orales y Entrega del Informe 1 (`I1`, 12%)** con proyección digital de láminas A3 ante el grupo, retroalimentación técnica de consultoría y simulacro preparatorio para el Parcial 1 (`TALLER_REPASO_P1.md`).
- **Semana 11 (24 sep — Bloque 1):** **Primer Examen Parcial (`P1`, 15%)**: Evaluación práctica individual en PC (100% Vectorial: Geodesia CTM12, Topology Checker, Geoprocesamiento y Layout A3).

---

### Módulo 2: SIG Ráster y Análisis del Relieve (Semanas 11–13 · 24 sep al 15 oct)
*Herramienta: QGIS Raster Tools (GDAL).*

- **Semana 11 (24 sep — Bloque 2):** Introducción al modelo ráster matricial y fuentes de elevación en QGIS:
  - *Estructura matricial:* Píxel, resolución espacial y espectral, MDT vs. MDS. Fuentes de elevación: DEM SRTM (30 m) y ALOS PALSAR (12.5 m RTC). Descarga, recorte y reproyección estricta con GDAL Warp a **MAGNA-SIRGAS CTM12 (`EPSG:9377`)** con remuestreo bilineal (`G08`).
- **Semana 12 (01 oct):** Análisis morfométrico del relieve:
  - *Cálculo de pendientes y sombreado:* Derivación de pendientes (en grados sexagesimales y porcentaje), orientación de laderas (aspecto), reclasificación por rangos normativos del POT de Medellín ($<15^\circ, 15^\circ\text{--}30^\circ, >30^\circ$) y modelo de sombras 3D (*hillshade* azimut 315°, altitud 45°) (`G09`).
- **Semana de Receso Estudiantil (08 oct):** Pausa académica universitaria · Estudio autónomo con `TALLER_REPASO_Q3.md`.
- **Semana 13 (15 oct):** Modelación ráster avanzada, curvas de nivel y perfiles + Quiz 3:
  - *Álgebra de mapas (Raster Calculator):* Formulación booleana condicional para zonificación de amenaza por pendiente crítica ($>30^\circ$). Extracción de curvas de nivel y generación del perfil longitudinal del cauce principal de La Iguaná (`G10`).
  - *Evaluación (Bloque 2):* **Quiz 3 (`Q3`, 8% — Terreno y Álgebra Ráster)** en computador.

---

### Módulo 3 + Módulo 4 Compactados: Cápsula GNSS en Gabinete y Teledetección Satelital en QGIS (Semana 14 · Jueves 22 de octubre)
*Herramientas: QGIS (LTR), trazas GPX/CSV suministradas, `STAC API Browser` (`Earth Search`) / Copernicus Browser y bandas multiespectrales Sentinel-2 MSI en `EPSG:9377`.*

- **Bloque 1 (12:00–3:00 p.m.):**
  - **(a) Cápsula M3 (GNSS Esencial en Gabinete):** Conceptos clave de posicionamiento satelital: segmentos (espacial, control y usuario), constelaciones (GPS, GLONASS, Galileo, BeiDou), principio geométrico de trilateración 3D con mínimo 4 satélites ($X, Y, Z, \Delta t$), dilución de precisión (DOP: PDOP/HDOP), errores atmosféricos y de multitrayectoria (*multipath*) en cañones urbanos y forestales, niveles de posicionamiento (Navegador autónomo, DGPS, RTK/PPK) e importación demostrativa de archivos GPX y CSV en QGIS (`G11`). **Nota pedagógica:** *Se elimina la entrega evaluativa de GNSS/RMSE en los informes grupales para concentrar el esfuerzo analítico en relieve, teledetección y modelamiento espacial.*
  - **(b) M4: Teledetección Satelital e Índices Espectrales en QGIS:** Fundamentos físicos del espectro electromagnético (Visible, NIR, SWIR), firmas espectrales típicas (agua clara/turbia, suelo desnudo/concreto, vegetación sana y el *salto del rojo*), arquitectura de la misión **Sentinel-2 MSI** (bandas de 10 m: `B02`, `B03`, `B04`, `B08`; y de 20 m: `B11`, `B12`), búsqueda y descarga de escenas satelitales en **Copernicus Browser** (y uso de recortes locales listos para clase), combinación de bandas en QGIS (Color Verdadero RGB `4-3-2` y Falso Color Infrarrojo `8-4-3`) y formulación de índices biofísicos normalizados (`NDVI` para vigor vegetal y `NDBI` para huella urbana/impermeabilización) directamente en la **Calculadora Ráster de QGIS** en `EPSG:9377`.
- **Bloque 2 (4:30–6:00 p.m.):**
  - *Taller práctico en laboratorio PC con QGIS (`G11` demostrativo + `G12` y `G13` en QGIS):* Carga del stack multibanda Sentinel-2 de La Iguaná, composición visual RGB y Falso Color Infrarrojo, cálculo de `NDVI` y `NDBI` con la Calculadora Ráster de QGIS, umbralización de cobertura crítica e integración visual con el *Hillshade* y el mapa de pendientes de la cuenca.
  - *Ruta de mejora activa:* Apertura de la **Recuperación Activa de Q3**.

---

### Módulo 5: Presentación de ArcGIS Pro, Automatización Espacial y Quiz 4 (Semana 15 · Jueves 29 de octubre)
*Herramientas: ArcGIS Pro y QGIS en los PC del laboratorio universitario.*

- **Bloque 1 (12:00–3:00 p.m.):**
  - **M5: Presentación de ArcGIS Pro y Automatización Espacial (`G14` + `G15`):**
    - Comparativa arquitectónica entre QGIS y ArcGIS Pro: proyectos `.aprx`, estructura corporativa de **File Geodatabase (`.gdb`)**, creación de *Feature Datasets* en `EPSG:9377`, demostración de dominios de atributos y conexión en vivo a servicios **ArcGIS REST / FeatureServers** (GeoMedellín, AMVA, SIATA) (`G14`).
    - Automatización visual de flujos de geoprocesamiento encadenados (DAGs: *Buffer* → *Clip* / *Intersect* → *Zonal/Summary Statistics*) mediante **ModelBuilder** en ArcGIS Pro y su equivalencia directa en el **Diseñador Gráfico de Modelos de QGIS** (`G15`).
    - **Revisión de avance del Informe Final (`IF`):** Verificación en QGIS de las capas de diagnóstico (relieve, cobertura vegetal/urbana y retiro hídrico) y orientación sobre la priorización territorial.
- **Bloque 2 (4:30–6:00 p.m.):**
  - **Quiz 4 (`Q4`, 8%, 45 min):** Evaluación práctica individual en PC en **QGIS** sobre **Posicionamiento GNSS en Gabinete y Control de Calidad por `HDOP` (`S11/G11`)**.
  - **Taller asistido de análisis territorial en QGIS:** Acompañamiento a los equipos en el cruce espacial y formulación de su propuesta de intervención para el **Informe Final (`IF`)** en **QGIS** (`proyecto_iguana.gpkg` + `proyecto_iguana.qgz`).

---

### Módulo 6: Cierre Integrador, Parcial 2 y Sustentación Ejecutiva (Semana 16 · Jueves 05 de noviembre)
- **Bloque 1 (12:00–3:00 p.m.):**
  - **Parcial Práctico 2 (`P2`, Individual, 15%, 90 min / 1h30m):** Examen práctico individual en PC en **QGIS** (excluyente de evaluaciones previas, sin cubo virtual `.vrt`): cálculo directo de índices `NDVI` y `NDBI` en la Calculadora Ráster de QGIS, máscara booleana y vectorización de presión urbana (`DN = 1`), modelo automatizado (`.model3`) en el Diseñador Gráfico de Modelos de QGIS con `Buffer (30 m, Dissolve)` $\rightarrow$ `Intersección` $\rightarrow$ `Calculadora de Campos (area_ha)`, métricas JSON y mapa síntesis PDF (`G16`).
- **Bloque 2 (4:30–6:00 p.m., 90 min):**
  - **Entrega Única y Sustentación Oral (7 min Pitch + 3 min Preguntas Individuales por equipo) del Informe Final (`IF` = 26%):** Defensa presencial en **QGIS** proyectando la **Lámina A3 de Síntesis Territorial (300 dpi)** y sustentando el diagnóstico integrado y la propuesta de Ingeniería Civil y Diseño Urbano (`grupoXX_IF.zip`).

---

## 4. Estructura del Sistema de Evaluación e Informe Final (`IF`) Simplificado con Sustentación

> Conforme al Reglamento Académico de Pregrado de EAFIT: ponderaciones entre **5% y 20%** por actividad evaluativa.  
> Los parciales (`P1`, `P2`) y quices (`Q1`–`Q4`) son **estrictamente individuales**. Los informes (`I1`, `IF`) se realizan en **grupos fijos de 2 a 3 estudiantes** en **QGIS**.

### Regla Institucional sobre el Informe Final (`IF` — 26% del curso)
El cierre del proyecto integrador se evalúa mediante el **Informe Final (`IF`) con Sustentación Oral** ([`INSTRUCTIVO_ENTREGA_IF.md`](../03_guias/03_evaluaciones/INSTRUCTIVO_ENTREGA_IF.md)), enfocado en el **análisis territorial y propuesta de intervención en QGIS** con solo 3 entregables dentro de `grupoXX_IF.zip` (`1_proyecto_qgis/`, `2_Lamina_Sintesis_A3_grupoXX.pdf`, `3_Informe_Territorial_grupoXX.pdf` de 4–5 págs.):
1. **Entrega Técnica y Análisis Territorial en QGIS (`20%` del curso / 4.0 pts sobre 5.0):** Rigor espacial en QGIS (1.5 pts), análisis territorial y propuesta Civil + Diseño Urbano (1.5 pts) y Lámina A3 a 300 dpi (1.0 pt).
2. **Sustentación Oral y Defensa Individual (`6%` del curso / 1.0 pt sobre 5.0):** Pitch ejecutivo de 7 min + 3 min de defensa individual sobre el proyecto en QGIS.

| Código | Actividad Evaluativa | % | Modalidad | Semana (Fecha) | Estado / Ruta de Mejora Activa |
|:---:|---|:---:|---|:---:|---|
| **Q1** | Quiz 1: Fundamentos cartográficos y CTM12 | **8%** | Individual, presencial | 3 (30 jul) | **Realizado** · Recuperado en S4 en QGIS (hasta +50% nota perdida) |
| **Q2** | Quiz 2: QGIS vectorial y atributos | **8%** | Individual, en laboratorio | 6 (20 ago) | **Realizado** · Recuperado en S7 con validación topológica |
| **I1** | **Informe 1: Diagnóstico Vectorial y Propuesta A3** | **12%** | Grupal (Lámina digital A3 + `.gpkg`) | 10 (17 sep) | **Realizado** · Sustentación oral proyectada en clase |
| **P1** | **Parcial 1: SIG Vectorial y Topología** | **15%** | Individual, práctico en PC | 11 (24 sep) | **Realizado** · Examen oficial parcial |
| **Q3** | Quiz 3: Terreno y Álgebra Ráster | **8%** | Individual, en laboratorio | 13 (15 oct) | **Realizado** · Recuperado en S14 (22 oct) en QGIS |
| **Q4** | Quiz 4: Posicionamiento GNSS en Gabinete y Control de Calidad (`HDOP`) | **8%** | Individual, práctico en PC en QGIS (45 min) | 15 (29 oct) | **Realizado** · Exclusivo `S11/G11` en QGIS |
| **P2** | **Parcial 2: Índices Sentinel-2 (`NDVI`/`NDBI`), Modelo `.model3` y Mapa en QGIS** | **15%** | Individual, práctico en PC en QGIS (90 min / 1h30m) | 16 (05 nov) | **Realizado** · Exclusivo `S12–S15` en QGIS |
| **IF** | **Informe Final (`IF`): Análisis Territorial, Propuesta, Lámina A3 y Sustentación en QGIS** | **26%**<br>*(20% + 6%)* | Grupal en QGIS (`grupoXX_IF.zip` + Defensa Oral 10 min) | 16 (05 nov) | **Realizado** · Sustentación Oral en S16 + Taller opcional de reemplazo (`20%` técnico) en Cuenca La Ayurá ([`INSTRUCTIVO_TALLER_RECUPERACION_IF.md`](../03_guias/03_evaluaciones/INSTRUCTIVO_TALLER_RECUPERACION_IF.md)) |
| **Total** | | **100%** | | | **100% Ejecutado (`2026-1`)** |

---

## 5. Cronograma Detallado Sesión por Sesión (16 Semanas)

| S | Fecha | Mód. | Bloque 1 · 12:00–3:00 p.m. | Bloque 2 · Laboratorio PC (4:30–6:00 p.m.) | Hito Evaluativo / Recuperación |
|:---:|:---:|:---:|---|---|:---:|
| **1** | 16 jul | M0 | **Pacto pedagógico** · Campo de la geomática · Lectura de mapas y escala · Presentación biofísica de la Cuenca de La Iguaná | **Taller G01**: Visores digitales (Google Earth, OSM, Colombia en Mapas) · Reconocimiento inicial de La Iguaná · Verificación Teams | — |
| **2** | 23 jul | M0 | Escala numérica/gráfica · Cálculo de distancias y áreas reales · Píxel y resolución · Coordenadas geográficas (GMS ↔ Decimal) | **Taller G02**: Medición en mapa digital a zoom calibrado de La Iguaná (longitud del río, retiros, lotes) | — |
| **3** | 30 jul | M0 | Geodesia: MAGNA-SIRGAS, CTM12 (`EPSG:9377`), Res. 471/2020 · Deformaciones proyectivas · **Quiz 1** | **Taller G03**: Georreferenciación y cálculo manual de coordenadas CTM12 de hitos de La Iguaná | **Q1 (8%)** |
| **4** | 06 ago | M1 | Entorno QGIS: interfaz, CRS de proyecto, formatos espaciales (GeoPackage) · Conexión a **Geoservicios WMS/WMTS** | **Práctica QGIS (G04)**: Creación de `proyecto_iguana.gpkg` · Carga de ortofoto GeoMedellín · **Recuperación activa de Q1 en QGIS** | *Apertura Recuperación Q1* |
| **5** | 13 ago | M1 | Geometrías vectoriales · Reglas de digitalización · Barra de auto-ensamblado (*snapping*) | **Práctica digitalización (G05)**: Trazado guiado de la red hídrica y fajas de retiro de La Iguaná | — |
| **6** | 20 ago | M1 | Modelo de atributos, tipos de campos, calculadora de campos (`area_km2`, `long_m`), simbología y rotulado con halo | **Práctica de atributos (G06)**: Clasificación temática de vías y predios urbanos · **Quiz 2 (QGIS Vectorial)** | **Q2 (8%)** |
| **7** | 27 ago | M1 | Geoprocesamiento (Buffer de retiros, Clip, Dissolve, Intersect) · **Geoservicios WFS** (descarga vectorial en vivo) | **Práctica geoprocesamiento (G07)**: Retiros de protección hídrica en La Iguaná · **Recuperación activa de Q2** | *Apertura Recuperación Q2* |
| **8** | 03 sep | M1 | Consolidación vectorial para `I1`: integración de capas en GeoPackage, cruces prediales y maquetación A3 | **Práctica de ensamble**: Diseño de impresión A3 horizontal y configuración de rutas relativas | Preparación I1 |
| **9** | 10 sep | M1 | **Plugin Comprobador de topología de QGIS (*Topology Checker*)**: reglas de no solapes, no huecos y no *dangles* | **Práctica de auditoría topológica**: Limpieza de geometrías en `proyecto_iguana.gpkg` y cierre de lámina A3 | Anuncio Sustentación I1 |
| **10** | 17 sep | M1 | **Sustentación Oral `I1` (Parte 1)**: Presentación proyectada de láminas A3 y retroalimentación de consultoría | **Sustentación Oral `I1` (Parte 2)** + Simulacro preparatorio para Parcial 1 (`TALLER_REPASO_P1.md`) | **I1 (12%)** |
| **11** | 24 sep | M1/M2 | **Primer Examen Parcial (`P1`, Individual - 15%)**: Evaluación en PC 100% Vectorial (Geodesia CTM12, Topology Checker, Geoprocesamiento y Layout A3) | **Inicio Módulo 2 (Ráster — G08)**: Píxel, resolución, fuentes de elevación (SRTM vs. ALOS PALSAR 12.5 m), recorte y reproyección CTM12 (`EPSG:9377`) | **P1 (15%)** |
| **12** | 01 oct | M2 | **Módulo 2 (Morfometría del Relieve)**: Derivación de pendientes (grados y %), aspecto, sombreado 3D (*hillshade* 315°/45°) y análisis de laderas | **Práctica de morfometría (G09)**: Reclasificación por rangos normativos del POT ($<15^\circ, 15^\circ\text{--}30^\circ, >30^\circ$) y visualización 3D | Avance Ráster |
| — | **08 oct** | — | **Semana de Receso Estudiantil (Sin actividades presenciales)** | Pausa académica universitaria · Estudio autónomo con `TALLER_REPASO_Q3.md` | *Receso académico* |
| **13** | 15 oct | M2 | **Módulo 2 (Álgebra Ráster y Perfiles)**: Calculadora Ráster booleana de amenaza, curvas de nivel y perfil longitudinal del cauce | **Práctica Calculadora Ráster y Perfiles (G10)** + **Quiz 3 (`Q3`, 8% — Terreno y Álgebra Ráster)** | **Q3 (8%)** |
| **14** | 22 oct | M3/M4 | **(a) Cápsula M3 (GNSS Esencial en Gabinete):** Segmentos, constelaciones, trilateración con 4 satélites, DOP, *multipath*, niveles Navegador/DGPS/RTK e importación demostrativa GPX/CSV en QGIS (`G11`, sin entrega evaluativa en informes). **(b) M4: Teledetección Satelital e Índices Espectrales en QGIS:** Espectro electromagnético (Visible, NIR, SWIR), firmas espectrales y salto del rojo, misión Sentinel-2 MSI (10 m y 20 m), descarga de escenas (Copernicus Browser / recortes locales), combinación de bandas en QGIS (RGB 4-3-2 y Falso Color 8-4-3) y cálculo de `NDVI` y `NDBI` en Calculadora Ráster (`EPSG:9377`). | **Taller práctico en QGIS (`G11` demostrativo + `G12` y `G13` en QGIS):** Composición multibanda Sentinel-2, cálculo de `NDVI` y `NDBI` sobre La Iguaná e integración visual con *Hillshade* y pendientes de la cuenca · **Apertura de recuperación activa de Q3**. | *Apertura Recuperación Q3* |
| **15** | 29 oct | M5 | **M5: Presentación de ArcGIS Pro y Automatización Espacial (`G14` + `G15`):** Entorno `.aprx`, estructura de File Geodatabase (`.gdb`), Feature Datasets en `EPSG:9377`, demostración de dominios y servicios ArcGIS REST, y automatización de flujos de geoprocesamiento con **ModelBuilder** y el **Diseñador Gráfico de Modelos de QGIS**. **Revisión de avance del Informe Final (`IF`)**. | **Aplicación del Quiz 4 (`Q4`, 8%, 45 min)** individual en PC en **QGIS** sobre **Posicionamiento GNSS en Gabinete y Control de Calidad por `HDOP` (`S11/G11`)** + **Taller asistido de análisis territorial en QGIS** para el Informe Final (`IF`). | **Q4 (8%)**<br>*Revisión avance `IF`* |
| **16** | 05 nov | M6 | **Parcial Práctico 2 (`P2`, Individual - 15%, 90 min / 1h30m)** en PC en **QGIS** (excluyente de evaluaciones previas, sin `.vrt`: cálculo directo de `NDVI`/`NDBI`, vectorización `DN = 1`, modelo automatizado `.model3` en QGIS y mapa síntesis PDF) + verificación QA/QC (`G16`). | **Entrega Única y Sustentación Oral (7 min Pitch + 3 min Preguntas Individuales por equipo) del Informe Final (`IF` = 26%)** en **QGIS** proyectando la Lámina A3 y la propuesta territorial (`grupoXX_IF.zip`). | **P2 (15%) + IF (26%)** |
| *(17)* | — | — | *Semana colchón / Contingencias y registro final de calificaciones en sistema institucional* | | — |

---

## 6. Lista de Verificación Docente (Materiales Dispuestos y Ejecutados en `2026-1`)

- [x] **Insumos oficiales de La Iguaná (Semanas 1–13):**
  - Delimitación oficial de la cuenca en GeoPackage (`EPSG:9377`).
  - DEM ALOS PALSAR (12.5 m) / SRTM (30 m) recortado y reproyectado a `EPSG:9377`.
  - Conexiones XML / URLs de servicios WMS, WMTS y WFS de GeoMedellín, AMVA e IGAC.
- [x] **Insumos para la Semana 14 (22 de octubre — Cápsula GNSS + Teledetección en QGIS):**
  - Archivos demostrativos de navegación satelital `campo_garmin_crudo.gpx` y `campo_smartphone_crudo.csv` para `G11`.
  - Bandas recortadas y preprocesadas de **Sentinel-2 MSI Level-2A** sobre La Iguaná en `EPSG:9377` (`B02`, `B03`, `B04`, `B08` a 10 m y `B11`, `B12` remuestreadas) listas para carga directa en QGIS (`G12` y `G13`).
- [x] **Insumos de evaluación para las Semanas 15 y 16 (29 de octubre y 05 de noviembre):**
  - Paquete de datos para el **Quiz 4 (`Q4`, 29 oct)**, el **Parcial Final Integrador (`P2`, 05 nov)** y el **Taller Opcional de Reemplazo Técnico del `IF` en la Cuenca La Ayurá** (`insumos_recuperacion_ayura.zip`), ejecutados **100 % en QGIS LTR**.
