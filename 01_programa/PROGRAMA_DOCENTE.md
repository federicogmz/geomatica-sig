# Geomática, Ingeniería y SIG: Programa Docente Oficial
**Versión Docente y Arquitectura Curricular (Uso Interno y Acreditación)**

> **Semestre Académico:** **2027-1** (16 semanas lectivas efectivas: del `21 de enero` al `13 de mayo de 2027`; receso institucional de Semana Santa el `25 de marzo de 2027`; jueves `6 de mayo de 2027` hábil normal por aplicación de la Ley Emiliani)  
> **Pregrados:** Ingeniería Civil · Diseño Urbano y Gestión del Hábitat  
> **Ficha Técnica y Presupuesto Académico EAFIT:** **3 Créditos Académicos · 5 UMEs** (`144 h` totales de dedicación en el semestre: `4.5 h` semanales de acompañamiento presencial directo en sala [`72 h` semestrales] + `4.5 h` semanales de trabajo independiente del estudiante [`72 h` semestrales] = `144 h` totales)  
> **Horario y Espacio de Aprendizaje:** Jueves `12:00 m. – 4:30 p.m.` (`4.5 h` académicas continuas 100 % presenciales en Sala de Cómputo EAFIT):  
> - **Sub-bloque 1 (`12:00 m. – 1:50 p.m.` · 110 min):** Fundamento conceptual + modelado en vivo en **QGIS LTR** sobre la **Cuenca Escuela (Quebrada La Iguaná)**.  
> - **Pausa Activa Pedagógica / Almuerzo Ligero (`1:50 p.m. – 2:10 p.m.` · 20 min):** Integrada dentro de las `4.5 h` académicas nominales (equivalente a los 5 min/hora reglamentarios de descanso y cambio de actividad).  
> - **Sub-bloque 2 (`2:10 p.m. – 4:30 p.m.` · 140 min):** Transferencia en espejo a **ArcGIS Pro** (`.aprx`, `.gdb`, `Domains`, `Geodatabase Topology`, `Spatial Analyst`, `ModelBuilder .atbx`), aplicación individual sobre la unidad territorial asignada y **Protocolo de Cierre Seguro en Sala (`4:20–4:30 p.m.`: trabajar en `C:\Temp\SIG_Usuario\`, cerrar ArcGIS Pro para liberar `.lock`, comprimir `.zip` y respaldar en OneDrive EAFIT)**.  
> **Cupo Docente:** 22 a 25 estudiantes en estaciones de trabajo individuales.  
> **Stack Oficial:** QGIS LTR + ArcGIS Pro (Advanced institucional en sala) + GeoLab Iguaná (WebGIS autónomo) + Sentinel-2 L2A (MGRS 18NVL/18NVM) + DEM Copernicus en `EPSG:9377`.

---

## 1. Fundamentación Curricular y Enfoque Metodológico

El curso responde a la necesidad de formar profesionales de **Ingeniería Civil** y **Diseño Urbano y Gestión del Hábitat** capaces de capturar, procesar, auditar y transformar información geográfica multiescala en decisiones territoriales cuantitativamente justificadas. 

### 1.1. Arquitectura en Espejo (Dual-Stack QGIS LTR + ArcGIS Pro)
La asignatura no asume una postura dogmática sobre el software, sino que entrena al estudiante en el dominio conceptual de las estructuras espaciales subyacentes:
1. **Sub-bloque 1 (Conceptual y Abierto en QGIS LTR):** El docente modela los geoprocesos, las operaciones topológicas, el álgebra de mapas y la formulación matemática de índices en **QGIS LTR**, demostrando la transparencia algorítmica y el estándar abierto GeoPackage (`.gpkg`).
2. **Sub-bloque 2 (Corporativo y Aplicado en ArcGIS Pro):** Inmediatamente después de la pausa activa, el estudiante implementa los mismos principios en el entorno corporativo de **ArcGIS Pro**, dominando las herramientas estándar de la industria: proyectos `.aprx`, File Geodatabases (`.gdb`), Feature Datasets, Subtipos, Dominios Codificados, reglas de Geodatabase Topology, Spatial Analyst y automatización visual con ModelBuilder (`.atbx`).

### 1.2. Diseño Territorial 100 % Individual y Cuenca Escuela
Para erradicar la asimetría de participación en trabajos en grupo y blindar la integridad del aprendizaje:
- **La Quebrada La Iguaná es la Cuenca Escuela Exclusiva del Profesor:** Toda la instrucción guiada, los ejemplos de clase y los ejercicios interactivos de `GeoLab Iguaná` se realizan sobre la cuenca de La Iguaná (46.25 km²). Ningún estudiante tiene asignada esta cuenca.
- **Portafolio de 10 Quebradas Metropolitanas (`Q01` a `Q10`):** Se dispone de 10 cuencas reales del Valle de Aburrá cubiertas por la escena Sentinel-2 MGRS `18NVL` (complementada por `18NVM`), DEM Copernicus y geoservicios oficiales del AMVA, GeoMedellín, SIATA e IGAC en `EPSG:9377`:
  - `Q01`: Quebrada La Ayurá (Envigado)
  - `Q02`: Quebrada La Presidenta (Medellín - El Poblado)
  - `Q03`: Quebrada Santa Elena (Medellín - Centro Oriente)
  - `Q04`: Quebrada Altavista - La Picacha (Medellín - Belén)
  - `Q05`: Quebrada Doña María (Itagüí / San Antonio de Prado)
  - `Q06`: Quebrada La Doctora (Sabaneta)
  - `Q07`: Quebrada La Hueso - Ana Díaz (Medellín - La América / San Javier)
  - `Q08`: Quebrada La García (Bello)
  - `Q09`: Quebrada La Madera (Medellín Noroccidente / Bello)
  - `Q10`: Quebrada La Aguacatala (Medellín - Suroriente)
- **Matriz de 30 Unidades Territoriales (`U01` a `U30`):** Cada quebrada se zonifica en 3 tramos funcionales:
  - *Tramo Alto-Ladera:* Cabecera, fuertes pendientes, bosque/rural y susceptibilidad a movimientos en masa.
  - *Tramo Medio-Transición:* Piedemonte, borde urbano-rural, ocupación mixta y cañones urbanos.
  - *Tramo Bajo-Confluencia:* Valle plano, alta densidad constructiva, infraestructura hidráulica mayor y desembocadura en el Río Medellín.
- **Doble escala analítica:** La microcuenca completa se usa para análisis ráster (DEM, pendientes, aspecto, índices espectrales Sentinel-2) y un **Polígono Focal de 15 a 30 ha** delimitado dentro del tramo se utiliza para edición vectorial fina, auditoría topológica y cruces catastrales.
- **Parametrización por Cédula ($D \in \{0..9\}$):** El último dígito del documento de identidad individualiza los parámetros de geoprocesamiento:
  $$\text{Retiro Hídrico } R = 30 + D \text{ metros (rango: 30 a 39 m)}$$
  $$\text{Umbral Espectral } U_{\text{NDVI}} = 0.20 + (0.01 \times D) \text{ (rango: 0.20 a 0.29)}$$
  Esto imposibilita la copia de archivos o resultados numéricos entre compañeros.
- **Diferenciación Propositiva por Pregrado (80 % común + 20 % disciplinar):**
  - *Ingeniería Civil:* Estabilidad de laderas, obras de drenaje y laminación hidráulica, capacidad de cauces y puentes, mitigación geotécnica.
  - *Diseño Urbano:* Espacio público de ribera, corredores verdes ecológicos, franjas de retiro ambiental, mejoramiento integral del hábitat y contención de borde.

---

## 2. Alineamiento Constructivo (RAA <-> Hitos Evaluativos)

El curso vincula los 4 Resultados de Aprendizaje de la Asignatura (RAA) formulados con verbos observables de la Taxonomía SOLO con los 5 Hitos Evaluativos del semestre:

```text
[RAA1: Geodesia & EPSG:9377] ──┬──→ Hito 1 (S05, 20%, Tier P)
                               ├──→ Hito 2 (S08, 20%, Tier P)
[RAA2: Topología & Vectorial] ─┼──→ Hito 3 (S09, 20%, Tier D) ──┐
                               │                                 ├──→ Hito 5 (S16, 20%, Tier O)
[RAA3: DEM, GNSS & Sentinel-2] ┴──→ Hito 4 (S14, 20%, Tier P) ──┘
                               │
[RAA4: ModelBuilder & Síntesis] ┴──→ Hito 3 (S09) & Hito 5 (S16)
```

- **RAA1 (Relacional):** Diagnosticar y homologar bases espaciales multiescala al sistema oficial MAGNA-SIRGAS Origen Nacional CTM12 (`EPSG:9377`), diferenciando operaciones de asignación de referencia frente a reproyección de coordenadas tanto en QGIS LTR como en ArcGIS Pro.
- **RAA2 (Relacional):** Estructurar, auditar topológicamente y ejecutar geoprocesos vectoriales multicriterio sobre bases de datos espaciales abiertas (GeoPackage `.gpkg`) y corporativas (File Geodatabase `.gdb` con Feature Datasets, Subtipos y Dominios Codificados), produciendo cartografía normativa A3.
- **RAA3 (Relacional):** Modelar variables morfométricas del terreno (DEM), validar levantamientos satelitales GNSS por dilución de precisión (HDOP/RMSE) e integrar índices espectrales Sentinel-2 (NDVI y NDBI) mediante álgebra de mapas en QGIS LTR y Spatial Analyst de ArcGIS Pro.
- **RAA4 (Abstracto Extendido):** Automatizar flujos reproducibles de priorización territorial mediante ModelBuilder (`.atbx`) y el Diseñador Gráfico de Modelos (`.model3`), sustentando propuestas individuales de intervención en Ingeniería Civil o Diseño Urbano respaldadas por evidencia cuantitativa.

---

## 3. Estructura del Sistema de Evaluación (5 Hitos × 20 % = 100 %)

En estricto cumplimiento del Reglamento Académico de Pregrado de la Universidad EAFIT, el 100 % de la calificación se distribuye en 5 hitos individuales de 20 % cada uno:

| Hito | Nombre Oficial | % | Sem. | Fecha | Tier IA | RAA | Modalidad y Entregables | Ventana de Mejora Continua | Documento Guía | Taller de Repaso |
|:---:|---|:---:|:---:|:---:|:---:|:---:|---|---|---|---|
| **H1** | Taller Evaluativo 1 en Sala — Geodesia EPSG:9377 y Bases Espaciales (.gpkg / .gdb) | **20%** | S05 | 18 feb | **Tier P** | RAA1, RAA2 | Individual en sala (PC). Homologación geodésica, estructura de `.gpkg` y `.gdb`, Feature Datasets y dominios codificados sobre su unidad territorial. | Ventana en S06 (25 feb): corrección en sala sobre su unidad territorial recupera hasta el 40% de puntos deducidos. | [HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md](../03_guias/03_evaluaciones/HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md) | [REPASO_HITO_1.md](../03_guias/02_talleres_repaso/REPASO_HITO_1.md) |
| **H2** | Evaluación Práctica Integradora 1 — Topología, Geoprocesamiento Vectorial y Salida A3 | **20%** | S08 | 11 mar | **Tier P** | RAA1, RAA2 | Individual en sala (PC). Geodatabase Topology (cero solapes ni huecos), buffer disuelto ($30+D\text{ m}$), intersección catastral y lámina A3 en PDF. | Retroalimentación inmediata en sala antes de H3; sin tareas adicionales en S08 para proteger el presupuesto de 4.5 h autónomas hacia S09. | [HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md](../03_guias/03_evaluaciones/HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md) | [REPASO_HITO_2.md](../03_guias/02_talleres_repaso/REPASO_HITO_2.md) |
| **H3** | Avance 1 Individual del Proyecto — Línea Base Vectorial (.gpkg + .gdb), Lámina A3 y Estación en Vivo | **20%** | S09 | 18 mar | **Tier D** | RAA1, RAA2, RAA4 | Individual en sala (PC). Paquete `.zip` (`.aprx` + `.gdb` + Lámina A3 PDF). Sustentación en **2 Rondas** (Estación en Vivo 4 min + Revisión por Pares estructurada). | Entrega de matriz de observaciones y mejora cartográfica/espacial directamente subsanable en el Hito 5. | [HITO_3_AVANCE_PROYECTO_INDIVIDUAL_A3.md](../03_guias/03_evaluaciones/HITO_3_AVANCE_PROYECTO_INDIVIDUAL_A3.md) | Prácticas S06–S08 |
| **H4** | Evaluación Práctica Integradora 2 — Terreno (DEM), GNSS (HDOP) e Índices Sentinel-2 | **20%** | S14 | 29 abr | **Tier P** | RAA3 | Individual en sala (PC). Recorte DEM con NoData = -9999, pendientes normativas POT, filtrado GNSS HDOP $\le 2.0$, NDVI/NDBI con umbral individual y vectorización $DN = 1$. | Ventana en S15 (06 may): depuración en ModelBuilder (.atbx) recupera hasta el 40% de puntos deducidos. | [HITO_4_EVALUACION_RASTER_GNSS_SENTINEL2.md](../03_guias/03_evaluaciones/HITO_4_EVALUACION_RASTER_GNSS_SENTINEL2.md) | [REPASO_HITO_4.md](../03_guias/02_talleres_repaso/REPASO_HITO_4.md) |
| **H5** | Proyecto Final Individual Multicriterio — Automatización ModelBuilder (.atbx), Dossier A3 y Pitch Ejecutivo | **20%** | S16 | 13 may | **Tier O** | RAA1, RAA2, RAA3, RAA4 | Individual en sala (PC). Modelo visual automatizado (.atbx), Dossier A3 con perfil longitudinal y propuesta Civil/Urbano + **Pitch Relámpago (4 min exposición + 3 min defensa en PC)** en 2 rondas. | Pre-chequeo técnico en sala en S15 (06 may) garantizando 0 rutas rotas y 0 archivos bloqueados `.lock` antes del Pitch. | [HITO_5_PROYECTO_FINAL_MODELBUILDER_PITCH.md](../03_guias/03_evaluaciones/HITO_5_PROYECTO_FINAL_MODELBUILDER_PITCH.md) | Pre-chequeo técnico S15 |
| **Total** | | **100%** | | | | | | | | |

---

## 4. Protocolo de Sala y Gestión de Integridad Técnica

### 4.1. Protocolo de Cierre Seguro en Sala (`4:20–4:30 p.m.`)
Para erradicar la corrupción de geodatabases y la rotura de rutas relativas:
1. **Espacio de trabajo local:** El estudiante trabaja exclusivamente en el disco local rápido de la máquina: `C:\Temp\SIG_Usuario\`. Está estrictamente prohibido operar ArcGIS Pro o QGIS directamente sobre carpetas sincronizadas en la nube (OneDrive, Google Drive o Dropbox), ya que los micro-bloqueos de red corrompen el esquema SQLite/GDB.
2. **Cierre ordenado y liberación de `.lock`:** A las `4:20 p.m.`, todo estudiante debe guardar su proyecto, cerrar ArcGIS Pro y QGIS para forzar al sistema operativo a liberar los archivos de bloqueo temporal (`*.lock`).
3. **Empaquetado y respaldo:** Comprimir la carpeta completa en un archivo `Apellido_Nombre_SesionXX.zip` y cargar este paquete comprimido al OneDrive institucional de EAFIT o memoria USB personal.

### 4.2. Niveles de Inteligencia Artificial (`Tier P / D / O`) y Auditoría Forense
- **Tier P (H1, H2, H4):** Ambiente de sala cerrada sin IA generativa. Se audita la destreza operativa directa en software.
- **Tier D (H3):** Uso guiado y declarado de IA generativa. El estudiante debe incluir en su entrega el anexo de prompts utilizados y es penalizado ante cualquier alucinación conceptual o geométrica no detectada.
- **Tier O (H5):** Evaluación abierta con defensa oral individual obligatoria en vivo. La calificación técnica está supeditada a que el estudiante ejecute su modelo de ModelBuilder y justifique sus decisiones sobre el software abierto ante el docente.
- **Auditoría de originalidad:** Inspección forense de metadatos en tablas de File Geodatabase (`GDB_Items`, marcas temporales de creación de geometrías) y verificación estricta de la huella paramétrica individual basada en el dígito $D$.

---

## 5. Cronograma Detallado Sesión por Sesión (16 Semanas)

### S01 · Jueves 21 de enero de 2027
**Eje Temático:** Presentación del Curso, Geodesia Fundamental y Territorio Base
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Presentación del sílabo, programa y firma del pacto pedagógico.
  - ¿Qué es la geomática? Escala numérica vs. gráfica, resolución espacial y distancias reales en el terreno.
  - Modelado en QGIS LTR: Exploración de visores geográficos (Google Earth, OSM, Colombia en Mapas) sobre la **Cuenca Escuela de La Iguaná** (`G01`).
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - Introducción a ArcGIS Pro: arquitectura de proyectos `.aprx`, paneles de Catálogo, Mapa y Geoprocesamiento.
  - Asignación oficial de las **30 Unidades Territoriales (`U01`–`U30`)** sobre las 10 quebradas metropolitanas y registro del parámetro $D$.
  - Montaje del proyecto base en `C:\Temp\SIG_Usuario\` y ejecución del Protocolo de Cierre Seguro (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Lectura Res. 471/2020 IGAC y exploración preliminar de su cuenca asignada).

### S02 · Jueves 28 de enero de 2027
**Eje Temático:** Geodesia Colombiana y Sistema Oficial MAGNA-SIRGAS CTM12 (`EPSG:9377`)
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Forma de la Tierra, geoide, elipsoide (GRS80), Datum Bogotá vs. MAGNA-SIRGAS.
  - Resolución 471 de 2020: Proyección Transversa de Mercator con Origen Nacional (CTM12, `EPSG:9377`).
  - Demostración en QGIS LTR: Distinción crítica entre *Asignar proyección* vs. *Reproyectar coordenadas* sobre capas de La Iguaná (`G02`–`G03`).
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - Transferencia a ArcGIS Pro: Uso de las herramientas *Define Projection* frente a *Project* en Data Management Tools.
  - Homologación de coordenadas de estaciones y cartografía base de su unidad territorial a `EPSG:9377`.
  - Protocolo de Cierre Seguro en `C:\Temp\SIG_Usuario\` (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Taller de repaso de coordenadas y verificación de órdenes de magnitud métricas: [REPASO_HITO_1.md](../03_guias/02_talleres_repaso/REPASO_HITO_1.md)).

### S03 · Jueves 04 de febrero de 2027
**Eje Temático:** Bases de Datos Espaciales: GeoPackage Abierto vs. File Geodatabase Corporativa
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Limitaciones del Shapefile histórico (`.shp` truncado a 10 caracteres, sin topología, sin nulos reales).
  - Estándar OGC GeoPackage (`.gpkg` SQLite): tablas espaciales, índices R-Tree y rutas relativas en QGIS LTR (`G04`).
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - Ecosistema File Geodatabase (`.gdb`) en ArcGIS Pro: creación de Feature Datasets con referencia espacial fija `EPSG:9377`.
  - Configuración de **Subtipos** y **Dominios Codificados** de atributos (tipología de drenaje, uso de suelo, estado constructivo).
  - Protocolo de Cierre Seguro en `C:\Temp\SIG_Usuario\` (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Configuración de dominios en la File Geodatabase de su unidad territorial).

### S04 · Jueves 11 de febrero de 2027
**Eje Temático:** Digitalización Guiada, Auto-ensamblado (*Snapping*) y Geoservicios OGC / REST
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Geometrías vectoriales (punto, línea, polígono). Barra de auto-ensamblado (*snapping*) a 15 px, evitar intersecciones y trazado guiado.
  - Conexión a geoservicios WMS/WMTS (ortofotos de alta resolución GeoMedellín / AMVA) en QGIS LTR (`G05`).
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - Edición vectorial precisa en ArcGIS Pro: herramientas *Create Features*, *Snapping*, *Split* y *Merge*.
  - Consumo de geoservicios REST / FeatureServers metropolitanos y exportación a la File Geodatabase individual.
  - Simulacro guiado para el Hito 1 y Protocolo de Cierre Seguro (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Consolidación de capas base de su polígono focal y preparación para Hito 1).

### S05 · Jueves 18 de febrero de 2027
**Eje Temático:** Geoprocesamiento Vectorial Inicial y Taller Evaluativo 1 en Sala (**Hito 1**)
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Principios geométricos de geoprocesamiento: *Buffer* disuelto vs. no disuelto, *Clip* y *Dissolve*.
  - Demostración de delimitación de retiros hídricos en QGIS LTR sobre La Iguaná (`G06`).
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - **Aplicación del Hito 1 (20 %, Tier P, RAA1, RAA2):** Taller Evaluativo individual en sala en ArcGIS Pro y QGIS sobre su unidad territorial asignada (homologación `EPSG:9377`, estructura `.gdb`, dominios codificados y buffer paramétrico $30+D\text{ m}$).
  - Cierre y entrega digital del paquete `Apellido_Nombre_H1.zip` (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Lectura sobre relaciones topológicas y teoría de conjuntos espaciales).

### S06 · Jueves 25 de febrero de 2027
**Eje Temático:** Cruces Espaciales Multicriterio y Ventana de Mejora Continua H1
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Geoprocesamiento avanzado: *Intersect*, *Erase / Difference*, *Spatial Join* (unión espacial uno a uno y uno a muchos).
  - Cálculo de áreas afectadas y recalculo métrico en QGIS LTR (`G07`).
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - Geoprocesamiento en ArcGIS Pro: cruce predial y de rondas hídricas en su unidad territorial.
  - **Ventana de Mejora Continua del Hito 1:** El estudiante que identifique fallas en su H1 ejecuta la corrección asistida en sala recuperando hasta el 40 % de los puntos deducidos.
  - Protocolo de Cierre Seguro (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Depuración del cruce predial y cálculo de porcentajes de afectación en su polígono focal).

### S07 · Jueves 04 de marzo de 2027
**Eje Temático:** Saneamiento Topológico de Geodatabases
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Fundamentos de topología planar: relaciones de adyacencia, conectividad y contención.
  - Auditoría topológica con el plugin *Topology Checker* en QGIS LTR (reglas de no solape, no huecos y no dangles) y reparación con la herramienta de vértices.
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - **Geodatabase Topology en ArcGIS Pro:** Creación de topología dentro del Feature Dataset, definición de reglas (*Must Not Overlap*, *Must Not Have Gaps*, *Must Be Inside*), validación y corrección de errores con *Error Inspector*.
  - Aplicación al polígono focal de su unidad territorial y Protocolo de Cierre Seguro (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Saneamiento a 0 errores topológicos en la Geodatabase y repaso con [REPASO_HITO_2.md](../03_guias/02_talleres_repaso/REPASO_HITO_2.md)).

### S08 · Jueves 11 de marzo de 2027
**Eje Temático:** Cartografía Normativa A3 y Evaluación Práctica Integradora 1 (**Hito 2**)
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Principios de semiótica gráfica (Bertin), jerarquía visual figura-fondo, diseño de layouts cartográficos.
  - Elementos normativos obligatorios: cuadrícula métrica `EPSG:9377`, escalas gráfica y numérica, norte, leyenda cuantitativa y membrete oficial en QGIS LTR.
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - **Aplicación del Hito 2 (20 %, Tier P, RAA1, RAA2):** Evaluación práctica individual en sala (ArcGIS Pro / QGIS) sobre topología, geoprocesamiento multicriterio y exportación de Lámina A3 en PDF de alta resolución.
  - Retroalimentación inmediata en sala; entrega del paquete `Apellido_Nombre_H2.zip` (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Consolidación de la línea base vectorial completa y memoria técnica hacia Hito 3).

### S09 · Jueves 18 de marzo de 2027
**Eje Temático:** Avance 1 Individual del Proyecto, Estación en Vivo y Co-evaluación (**Hito 3**)
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Discusión metodológica de casos: cómo comunicar hallazgos espaciales a tomadores de decisiones de Ingeniería y Urbanismo.
  - Montaje de las estaciones de trabajo en sala, apertura simultánea de ArcGIS Pro y verificación de láminas A3.
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - **Ejecución del Hito 3 en 2 Rondas (20 %, Tier D, RAA1, RAA2, RAA4):**
    - *Ronda A (65 min):* Grupo 1 (estudiantes U01–U15) defiende en su estación de trabajo ante el profesor (auditoría relámpago de 4 min por PC) mientras el Grupo 2 co-evalúa con rúbrica estructurada.
    - *Ronda B (65 min):* Grupo 2 (estudiantes U16–U30) defiende en su estación de trabajo ante el profesor mientras el Grupo 1 co-evalúa.
  - Consolidación de la matriz de mejora y entrega del paquete `Apellido_Nombre_H3.zip` (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Sistematización de observaciones recibidas y preparación hacia el módulo ráster).

---
*(Semana del Jueves 25 de marzo de 2027: Receso Institucional de Semana Santa — Sin actividad académica)*
---

### S10 · Jueves 01 de abril de 2027
**Eje Temático:** Modelos Digitales de Elevación (DEM) y Estructura Ráster Matricial
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Naturaleza de los datos matriciales: tamaño de píxel, resolución espacial, radiométrica y espectral. MDT vs. MDS.
  - Fuentes de elevación: DEM ALOS PALSAR (12.5 m) y Copernicus GLO-30.
  - Manejo en QGIS LTR: Recorte por máscara hidrográfica con asignación de `NoData = -9999` y reproyección bilineal a `EPSG:9377` (`G08`).
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - Spatial Analyst en ArcGIS Pro: herramientas *Extract by Mask*, *Project Raster*, simbología por estiramiento e intervalos clasificados.
  - Procesamiento del DEM sobre la microcuenca completa de su unidad territorial individual.
  - Protocolo de Cierre Seguro (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Auditoría de estadísticas univariadas del DEM: elevación mínima, media, máxima y verificación de NoData).

### S11 · Jueves 08 de abril de 2027
**Eje Temático:** Morfometría del Terreno, Pendientes POT y Perfiles Longitudinales
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Derivación morfométrica: algoritmo de Zevenbergen & Thorne vs. Horn. Cálculo de pendientes (grados y porcentaje), aspecto y sombreado 3D (*hillshade* 315°/45°).
  - Reclasificación de pendientes según la normativa del POT de Medellín ($<15^\circ, 15^\circ\text{--}30^\circ, >30^\circ$) en QGIS LTR (`G09`–`G10`).
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - Spatial Analyst en ArcGIS Pro: *Slope*, *Aspect*, *Hillshade* y *Reclassify*.
  - Generación del **perfil longitudinal del cauce principal** mediante interpolación de líneas sobre el DEM en ArcGIS Pro.
  - Protocolo de Cierre Seguro (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Extracción del perfil topográfico de la quebrada asignada y exportación gráfica hacia el dossier final).

### S12 · Jueves 15 de abril de 2027
**Eje Temático:** Posicionamiento Satelital GNSS y Control de Calidad por HDOP
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Segmentos GNSS (espacial, control, usuario), constelaciones (GPS, GLONASS, Galileo, BeiDou). Principio de trilateración con $\ge 4$ satélites.
  - Dilución geométrica de precisión (DOP / HDOP / PDOP), multitrayectoria (*multipath*) en laderas y cañones urbanos.
  - Demostración de importación GPX/CSV, filtrado por `"hdop" <= 2.0` y cálculo de RMSE frente a puntos geodésicos del IGAC en QGIS LTR (`G11`).
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - Manejo de datos de campo GNSS en ArcGIS Pro: *XY Table to Point*, configuración de CRS de captura (`EPSG:4326`) y reproyección a `EPSG:9377`.
  - Depuración analítica de puntos por HDOP, cálculo del error medio cuadrático posicional (RMSE) e incorporación en la File Geodatabase.
  - Protocolo de Cierre Seguro (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Procesamiento de la malla de control GNSS de su cuenca y preparación de capas ráster).

### S13 · Jueves 22 de abril de 2027
**Eje Temático:** Teledetección Multiespectral Sentinel-2 e Índices Espectrales (`NDVI`/`NDBI`)
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Fundamentos físicos de la teledetección: espectro electromagnético, ventanas atmosféricas, reflectancia superficial.
  - Firmas espectrales de vegetación (salto del rojo), agua y concreto/suelo. Misión Sentinel-2 MSI L2A (escena MGRS `18NVL`).
  - Combinación de bandas RGB (Color Verdadero 4-3-2) y Falso Color Infrarrojo (8-4-3). Formulación matemática de `NDVI` y `NDBI` en QGIS LTR (`G12`–`G13`).
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - Álgebra de mapas en ArcGIS Pro con *Raster Calculator* de Spatial Analyst.
  - Aplicación del umbral individual $U_{\text{NDVI}} = 0.20 + (0.01 \times D)$ para aislar presión urbana/impermeabilización.
  - Conversión Ráster $\rightarrow$ Vector (*Raster to Polygon*), filtrado estricto de la clase activa `"gridcode" = 1` y cálculo de hectáreas.
  - Protocolo de Cierre Seguro (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Taller de repaso de terreno, GNSS y teledetección: [REPASO_HITO_4.md](../03_guias/02_talleres_repaso/REPASO_HITO_4.md)).

### S14 · Jueves 29 de abril de 2027
**Eje Temático:** Evaluación Práctica Integradora 2 (**Hito 4**)
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Sesión de calibración técnica: resolución de dudas críticas en álgebra de mapas, máscaras booleanas y conversión ráster-vector.
  - Verificación de integridad de insumos ráster en sala.
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - **Aplicación del Hito 4 (20 %, Tier P, RAA3):** Evaluación práctica individual en sala (Spatial Analyst en ArcGIS Pro / QGIS) cubriendo recorte de DEM con NoData = -9999, reclasificación de pendientes, depuración GNSS por HDOP, cálculo de índices espectrales con umbral individual $D$ y vectorización de presión urbana.
  - Entrega digital del paquete `Apellido_Nombre_H4.zip` (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Diseño de la lógica del flujo de automatización territorial para el proyecto final).

### S15 · Jueves 06 de mayo de 2027
*(Nota de calendario: Jornada hábil normal por traslado del festivo de Ascensión al lunes siguiente mediante Ley Emiliani)*  
**Eje Temático:** Automatización Espacial Visual (ModelBuilder), Mejora Continua H4 y Pre-chequeo Técnico
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - Fundamentos de automatización visual: grafos dirigidos acíclicos (DAGs), variables, parámetros de modelo y precondiciones.
  - Modelado en el Diseñador Gráfico de Modelos de QGIS (`.model3`) sobre La Iguaná (`G15`).
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - **ModelBuilder en ArcGIS Pro:** Construcción de una caja de herramientas (`.atbx`) que automatiza el flujo completo: Buffer disuelto $\rightarrow$ Intersección $\rightarrow$ Cruce con máscara de presión urbana $\rightarrow$ Estadísticas de resumen.
  - **Ventana de Mejora Continua del Hito 4:** Corrección y encapsulamiento en ModelBuilder recupera hasta el 40 % de puntos deducidos en H4.
  - **Pre-chequeo técnico obligatorio en sala:** Verificación individual con el profesor de cero rutas rotas, ausencia de archivos bloqueados `.lock` y funcionalidad del modelo antes de la sustentación final.
  - Protocolo de Cierre Seguro (4:20–4:30 p.m.).
- **Trabajo Independiente Estimado:** 4.5 h (Diagramación del Dossier Infográfico A3 final y ensayo de la exposición oral de 4 minutos).

### S16 · Jueves 13 de mayo de 2027
**Eje Temático:** Proyecto Final Multicriterio, Pitch Ejecutivo Relámpago y Cierre Semestral (**Hito 5**)
- **Sub-bloque 1 (12:00 m. – 1:50 p.m. · 110 min):**
  - **Sustentación Oral del Hito 5 — Ronda A (20 %, Tier O, RAA1–RAA4):**
    - Exposición individual relámpago de los primeros 11–13 estudiantes (U01–U13).
    - Modalidad: **4 minutos de Pitch continuo** proyectando el Dossier A3 + **3 minutos de defensa en vivo operando el ModelBuilder (.atbx) en ArcGIS Pro** respondiendo preguntas técnicas del jurado docente.
- **Pausa Activa Pedagógica / Almuerzo Ligero (1:50 p.m. – 2:10 p.m. · 20 min).**
- **Sub-bloque 2 (2:10 p.m. – 4:30 p.m. · 140 min):**
  - **Sustentación Oral del Hito 5 — Ronda B (20 %, Tier O, RAA1–RAA4):**
    - Exposición individual relámpago de los siguientes 11–13 estudiantes (U14–U26+).
    - Misma modalidad rigurosa de 4 + 3 min por estudiante.
  - Consolidación del acta final de notas, cierre pedagógico del curso y retroalimentación institucional (4:10–4:30 p.m.).
- **Trabajo Independiente Estimado:** 0 h (Cierre formal del semestre lectivo).

---

## 6. Lista de Verificación Docente para el Semestre 2027-1

- [ ] **Infraestructura de Sala de Cómputo EAFIT:**
  - Verificación de licencias de ArcGIS Pro Advanced con extensión Spatial Analyst habilitada para cada estación.
  - Instalación de QGIS LTR oficial con complementos *Topology Checker* y *QuickMapServices*.
  - Configuración del directorio local de trabajo rápido `C:\Temp\SIG_Usuario\` con permisos totales de lectura y escritura.
- [ ] **Paquete de Datos Maestros en `EPSG:9377`:**
  - Capas oficiales de la Cuenca Escuela de La Iguaná (demostraciones del profesor).
  - Paquete de las 10 microcuencas metropolitanas (`Q01` a `Q10`) y sus 30 polígonos focales (`U01` a `U30`).
  - Escena Sentinel-2 L2A MGRS `18NVL` (con `18NVM`) y DEM Copernicus GLO-30 pre-descargados para contingencias de conectividad.
- [ ] **Material Didáctico y Rúbricas:**
  - Rúbricas analíticas oficiales (C1 a C4) configuradas en Microsoft Teams antes del inicio de clases.
  - Publicación y acceso operativo a la plataforma interactiva **GeoLab Iguaná**.
