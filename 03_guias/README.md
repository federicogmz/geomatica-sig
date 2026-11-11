# Directorio de Guías Prácticas, Talleres y Evaluaciones Oficiales (2027-1)

> **Curso:** Geomática, Ingeniería y SIG (`GEOMATICA-SIG-EAFIT`)  
> **Semestre Académico:** 2027-1 · Universidad EAFIT  
> **Horario Oficial:** Jueves 12:00 m. – 4:30 p.m. (4.5 h en Sala de Cómputo EAFIT)  
> **Sistema de Coordenadas Oficial:** MAGNA-SIRGAS 2018 / Origen Nacional CTM12 (`EPSG:9377`)

Bienvenido al repositorio central de guías, talleres de entrenamiento y evaluaciones del curso **Geomática, Ingeniería y SIG**. Este directorio organiza todo el material pedagógico e instrumental del semestre 2027-1, articulado mediante el marco metodológico **TILT (*Transparency in Learning and Teaching*)** y diseñado para garantizar resiliencia técnica e integridad académica.

---

## Estructura General del Directorio

```text
03_guias/
├── PROYECTO_INTEGRADOR.md      # Marco metodológico territorial, portafolio de 10 cuencas y 30 unidades
├── README.md                   # Este índice general de navegación y trazabilidad
├── 01_talleres_clase/          # 16 Guías paso a paso de laboratorio (G01 a G16) y sus insumos
├── 02_talleres_repaso/         # Talleres de entrenamiento autónomo (<= 4.5 h) e insumos de práctica
│   ├── REPASO_HITO_1.md        # Preparación para Hito 1: Geodesia, CTM12 y bases (.gpkg / .gdb)
│   ├── REPASO_HITO_2.md        # Preparación para Hito 2: Topología, geoprocesos (D) y Lámina A3
│   ├── REPASO_HITO_4.md        # Preparación para Hito 4: DEM, GNSS (HDOP) y Sentinel-2 (NDVI/NDBI)
│   ├── insumos_p1/             # Paquete de datos vectoriales para repaso (drenajes, predios, equipamientos)
│   ├── insumos_q4/             # Paquete de datos GNSS y vértices geodésicos IGAC
│   └── insumos_p2/             # Paquete de datos Sentinel-2 L2A (18NVL) y divisoria de cuenca
└── 03_evaluaciones/            # Instructivos oficiales de evaluación 2027-1 con rúbricas analíticas
    ├── HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md      # Hito 1 (S05 · 20% · Tier P)
    ├── HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md      # Hito 2 (S08 · 20% · Tier P)
    ├── HITO_3_AVANCE_PROYECTO_INDIVIDUAL_A3.md         # Hito 3 (S09 · 20% · Tier D)
    ├── HITO_4_EVALUACION_RASTER_GNSS_SENTINEL2.md      # Hito 4 (S14 · 20% · Tier P)
    ├── HITO_5_PROYECTO_FINAL_MODELBUILDER_PITCH.md     # Hito 5 (S16 · 20% · Tier O)
    └── INSTRUCTIVO_TALLER_RECUPERACION_IF.md           # Taller de recuperación IF (cierre 2026-1)
```

---

## 1. Marco del Proyecto Integrador Individual

- [**PROYECTO_INTEGRADOR.md**](PROYECTO_INTEGRADOR.md): Documento rector del proyecto territorial a lo largo de las 16 semanas:
  - **Modalidad 100 % Individual:** Portafolio Metropolitano de 10 Quebradas del Valle de Aburrá (`Q01` a `Q10`) y Matriz de 30 Unidades Territoriales Únicas (`U01` a `U30`: *Alto-Ladera*, *Medio-Transición*, *Bajo-Confluencia*).
  - **Cuenca Escuela La Iguaná (46.25 km²):** Territorio exclusivo para demostraciones del docente y operación de GeoLab WebGIS; prohibida como asignación estudiantil.
  - **Doble Escala de Análisis:** Microcuenca completa de aporte (DEM y Sentinel-2) + Polígono Focal de $15\text{ a }30\text{ ha}$ (topología y diseño de detalle).
  - **Semilla Individual $D$:** Retiro normativo $R = 30 + D\text{ m}$ y umbral biespectral $U_{\text{NDVI}} = 0.20 + 0.01 \times D$.
  - **Diferenciación Propositiva (20 %):** Ruta de Ingeniería Civil (obras de bioingeniería, disipación y drenaje) vs. Ruta de Diseño Urbano (parque lineal de ronda, arbolado y espacio público).
  - **Estándares Cartográficos:** Lámina A3 horizontal (Hito 3) y Dossier Infográfico A3 de 2 páginas (Hito 5); cero informes en Word.

---

## 2. Guías Semanales de Clase (`01_talleres_clase/`)

Guías detalladas para el trabajo práctico en la Sala de Cómputo EAFIT, articulando el **Sub-bloque 1 (QGIS LTR / Cuenca Escuela)** con el **Sub-bloque 2 (ArcGIS Pro / Unidad Asignada $U_{xx}$)**:

| Semana (Fecha) | Guía Oficial | Eje Temático y Contenido Técnico |
|:---:|---|---|
| **S01 (21 ene)** | [**G01_exploracion_visores_digitales.md**](01_talleres_clase/G01_exploracion_visores_digitales.md) | Reconocimiento en visores espaciales (Google Earth, OpenStreetMap, Colombia en Mapas). |
| **S02 (28 ene)** | [**G02_taller_escalas_coordenadas.md**](01_talleres_clase/G02_taller_escalas_coordenadas.md) | Medición métrica en visor PDF calibrado, escalas numérica/gráfica y conversión GMS ↔ Decimal. |
| **S03 (04 feb)** | [**G03_datum_ctm12_georreferenciacion.md**](01_talleres_clase/G03_datum_ctm12_georreferenciacion.md) | Geodesia, Datum Bogotá vs. MAGNA-SIRGAS, CTM12 (`EPSG:9377`) y Georreferenciador QGIS. |
| **Anexo S03** | [**G03_instalacion_qgis.md**](01_talleres_clase/G03_instalacion_qgis.md) | Guía de instalación y configuración técnica de QGIS LTR en computadores personales. |
| **S04 (11 feb)** | [**G04_interfaz_qgis.md**](01_talleres_clase/G04_interfaz_qgis.md) | Entorno QGIS, GeoPackage (`.gpkg`), File Geodatabase (`.gdb`) y Geoservicios WMS/WMTS. |
| **S05 (18 feb)** | [**G05_digitalizacion_topologia.md**](01_talleres_clase/G05_digitalizacion_topologia.md) / [**H1**](03_evaluaciones/HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md) | Sub-bloque 1: Digitalización, *snapping* y topología · Sub-bloque 2: **Hito 1 en Sala (20 % · Tier P)**. |
| **S06 (25 feb)** | [**G06_atributos_simbologia.md**](01_talleres_clase/G06_atributos_simbologia.md) | Calculadora de campos (`$length`, `$area`), simbología temática A3 y **Ventana de Mejora Continua H1**. |
| **S07 (04 mar)** | [**G07_geoprocesamiento_wfs.md**](01_talleres_clase/G07_geoprocesamiento_wfs.md) | Geoservicios WFS, geoprocesamiento vectorial (*Buffer* disuelto $30+D\text{ m}$, *Clip*, *Intersect*) y saneamiento topológico. |
| **S08 (11 mar)** | [**HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md**](03_evaluaciones/HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md) | **Hito 2 en Sala (20 % · Tier P):** Topología, geoprocesamiento parametrizado con semilla $D$ y Salida A3. |
| **S09 (18 mar)** | [**HITO_3_AVANCE_PROYECTO_INDIVIDUAL_A3.md**](03_evaluaciones/HITO_3_AVANCE_PROYECTO_INDIVIDUAL_A3.md) | **Hito 3 (20 % · Tier D):** Avance Proyecto Individual, Lámina A3 y Auditoría de Estación en Vivo (2 rondas). |
| **Receso (25 mar)**| — | **Semana Santa:** Pausa académica universitaria y preparación para el ciclo ráster. |
| **S10 (01 abr)** | [**G08_descarga_dem_raster.md**](01_talleres_clase/G08_descarga_dem_raster.md) | Módulo Ráster (Parte 1): Descarga de DEM, remuestreo bilineal, control `NoData = -9999` y reproyección a `EPSG:9377`. |
| **S11 (08 abr)** | [**G09_dem_pendientes_hillshade.md**](01_talleres_clase/G09_dem_pendientes_hillshade.md) / [**G10**](01_talleres_clase/G10_raster_calculator_perfiles.md) | Módulo Ráster (Parte 2): Pendientes POT, sombreado 3D, álgebra ráster condicional, vectorización `DN = 1` y perfil longitudinal. |
| **S12 (15 abr)** | [**G11_gnss_gabinete_importacion.md**](01_talleres_clase/G11_gnss_gabinete_importacion.md) | Posicionamiento satelital GNSS, dilución `HDOP <= 2.0`, importación en QGIS/ArcGIS Pro y auditoría `RMSE` contra IGAC. |
| **S13 (22 abr)** | [**G12_teledeteccion_sentinel2.md**](01_talleres_clase/G12_teledeteccion_sentinel2.md) / [**G13**](01_talleres_clase/G13_indices_espectrales_qgis.md) | Teledetección Sentinel-2 (MGRS `18NVL`), reflectancias y cálculo de índices biofísicos `NDVI` y `NDBI` con umbral $D$. |
| **S14 (29 abr)** | [**G14_arcgis_pro_gdb.md**](01_talleres_clase/G14_arcgis_pro_gdb.md) / [**H4**](03_evaluaciones/HITO_4_EVALUACION_RASTER_GNSS_SENTINEL2.md) | Sub-bloque 1: Consolidación FileGDB (`.gdb`) · Sub-bloque 2: **Hito 4 en Sala (20 % · Tier P)** Terreno, GNSS y Sentinel-2. |
| **S15 (06 may)** | [**G15_arcgis_modelbuilder.md**](01_talleres_clase/G15_arcgis_modelbuilder.md) | Automatización visual con ModelBuilder (`.atbx`) y Diseñador Gráfico (`.model3`) · **Mejora Continua H4** y Pre-chequeo H5. |
| **S16 (13 may)** | [**G16_cierre_integracion_territorial.md**](01_talleres_clase/G16_cierre_integracion_territorial.md) / [**H5**](03_evaluaciones/HITO_5_PROYECTO_FINAL_MODELBUILDER_PITCH.md) | **Hito 5 en Sala (20 % · Tier O):** Proyecto Final Multicriterio, Dossier A3 (2 págs.) y Pitch Relámpago (4+3 min). |

---

## 3. Talleres de Repaso y Entrenamiento Autónomo (`02_talleres_repaso/`)

Simulacros de práctica autónoma cronometrados ($\le 4.5\text{ h}$ de dedicación presupuestada), reutilizando los paquetes de datos de prueba del repositorio:

| Taller de Repaso | Insumos Reutilizados | Tiempo Estimado | Enfoque y Preparación Evaluativa |
|:---|:---|:---:|:---|
| [**REPASO_HITO_1.md**](02_talleres_repaso/REPASO_HITO_1.md) | `insumos_p1/` (`drenajes_iguana.shp`, `predios_catastro.gpkg`, `equipamientos_comunitarios.gpkg`) | $\le 4.5\text{ h}$ | Diagnóstico de capas sin `.prj`, asignación vs reproyección a `EPSG:9377`, estructura `.gpkg` + `.gdb` con Feature Dataset y dominios, y auditoría de rutas relativas. |
| [**REPASO_HITO_2.md**](02_talleres_repaso/REPASO_HITO_2.md) | `insumos_p1/` (`predios_catastro.gpkg`, `drenajes_iguana.shp`) | $\le 4.5\text{ h}$ | Saneamiento con Comprobador de topología (0 solapes, 0 huecos), geoprocesamiento con semilla $D$ ($R = 30 + D\text{ m}$), *Intersect*, *Dissolve* y salida A3 a 300 ppp. |
| [**REPASO_HITO_4.md**](02_talleres_repaso/REPASO_HITO_4.md) | `insumos_q4/` (GNSS e IGAC) + `insumos_p2/` (Sentinel-2 L2A y cuenca) | $\le 4.5\text{ h}$ | DEM y pendientes POT, filtrado GNSS por $\text{HDOP} \le 2.0$ y cálculo de $\text{RMSE}_H$, cálculo de NDVI y NDBI con umbral $D$, álgebra ráster y vectorización limpia de $DN = 1$. |

---

## 4. Instructivos Oficiales de Evaluación (`03_evaluaciones/`)

Los cinco hitos evaluativos suman el 100 % de la calificación definitiva del curso. Todos cuentan con **Rúbricas Criteriales de 4 Niveles** (*Inicial*, *Básico*, *Competente*, *Avanzado*), libres de adjetivos vagos y con **Notas de Calibración para Casos Límite**:

1. [**HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md**](03_evaluaciones/HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md)  
   *Semana 5 (18 feb 2027) · 20.0 % · Tier P (Prohibido/Supervisado).* Geodesia CTM12 (`EPSG:9377`), GeoPackage en QGIS y File Geodatabase con dominios codificados en ArcGIS Pro. Ventana de mejora continua en S06.
2. [**HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md**](03_evaluaciones/HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md)  
   *Semana 8 (11 mar 2027) · 20.0 % · Tier P (Prohibido/Supervisado).* Topología limpia (0 errores), geoprocesamiento vectorial con semilla individual $D$ ($30 + D\text{ m}$) y composición cartográfica A3 horizontal en PDF a 300 ppp.
3. [**HITO_3_AVANCE_PROYECTO_INDIVIDUAL_A3.md**](03_evaluaciones/HITO_3_AVANCE_PROYECTO_INDIVIDUAL_A3.md)  
   *Semana 9 (18 mar 2027) · 20.0 % · Tier D (Permitido con Declaración).* Línea Base Vectorial (.gpkg + .gdb) de la unidad asignada ($U_{xx}$), Lámina A3 completa y Auditoría de Estación SIG en Vivo en 2 rondas con revisión entre pares.
4. [**HITO_4_EVALUACION_RASTER_GNSS_SENTINEL2.md**](03_evaluaciones/HITO_4_EVALUACION_RASTER_GNSS_SENTINEL2.md)  
   *Semana 14 (29 abr 2027) · 20.0 % · Tier P (Prohibido/Supervisado).* Recorte DEM por máscara a divisoria, pendientes en grados y %, control de calidad GNSS por $\text{HDOP} \le 2.0$, índices Sentinel-2 (`NDVI`/`NDBI`), álgebra booleana y vectorización de $DN = 1$. Ventana de mejora continua en S15.
5. [**HITO_5_PROYECTO_FINAL_MODELBUILDER_PITCH.md**](03_evaluaciones/HITO_5_PROYECTO_FINAL_MODELBUILDER_PITCH.md)  
   *Semana 16 (13 may 2027) · 20.0 % · Tier O (Abierto / Auditoría Crítica de IA).* Pre-chequeo técnico obligatorio en S15. Flujo automatizado en ModelBuilder (`.atbx`) y `.model3`, Dossier Infográfico A3 de 2 páginas con propuesta sectorial (Civil o Urbana) y Pitch Ejecutivo Relámpago (4 min + 3 min de preguntas).

---

## 5. Histórico y Evaluaciones Cerradas (2026-1)

- **Cierre de evaluación 2026-1:** Se preserva en `03_evaluaciones/` el [**INSTRUCTIVO_TALLER_RECUPERACION_IF.md**](03_evaluaciones/INSTRUCTIVO_TALLER_RECUPERACION_IF.md) junto con sus insumos oficiales sobre la Quebrada La Ayurá.
- **Trazabilidad Histórica 2026-1:** Los instructivos y materiales cerrados del semestre anterior quedan congelados en la [Release / Tag Histórico `2026-1`](https://github.com/federicogmz/geomatica-sig/releases/tag/2026-1).
