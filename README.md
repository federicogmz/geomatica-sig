# Geomática, Ingeniería y SIG (Universidad EAFIT) 🌍

> **Semestre Académico:** **2027-1** (16 semanas lectivas efectivas: del `21 de enero` al `13 de mayo de 2027`; receso institucional de Semana Santa el `25 de marzo de 2027`; jueves `6 de mayo de 2027` hábil normal por Ley Emiliani)  
> **Pregrados:** Ingeniería Civil · Diseño Urbano y Gestión del Hábitat  
> **Presupuesto Académico Oficial EAFIT:** **3 Créditos Académicos · 5 UMEs** (`144 h` totales de dedicación en el semestre: `4.5 h` semanales de acompañamiento presencial directo en sala [`72 h` semestrales] + `4.5 h` semanales de trabajo independiente del estudiante [`72 h` semestrales] = `144 h` totales)  
> **Horario y Espacio de Aprendizaje:** Jueves `12:00 m. – 4:30 p.m.` (`4.5 h` continuas 100 % presenciales en Sala de Cómputo EAFIT):  
> - **Sub-bloque 1 (`12:00 m. – 1:50 p.m.` · 110 min):** Fundamento conceptual + práctica guiada en **QGIS LTR** sobre la **Cuenca Escuela (Quebrada La Iguaná)**.  
> - **Pausa Activa Pedagógica / Almuerzo Ligero (`1:50 p.m. – 2:10 p.m.` · 20 min):** Integrada dentro de las `4.5 h` académicas nominales (equivalente a los 5 min/hora reglamentarios de descanso).  
> - **Sub-bloque 2 (`2:10 p.m. – 4:30 p.m.` · 140 min):** Transferencia en espejo a **ArcGIS Pro** (`.aprx`, `.gdb`, `Domains`, `Geodatabase Topology`, `Spatial Analyst`, `ModelBuilder .atbx`), aplicación individual sobre su unidad territorial asignada y **Protocolo de Cierre Seguro en Sala (`4:20–4:30 p.m.`: trabajar en `C:\Temp\SIG_Usuario\`, cerrar ArcGIS Pro para liberar `.lock`, comprimir `.zip` y respaldar en OneDrive EAFIT)**.  
> **Marco de Referencia Oficial:** MAGNA-SIRGAS Origen Nacional CTM12 (`EPSG:9377`, Res. 471 de 2020 IGAC).  
> **Plataforma WebGIS de Aprendizaje Autónomo:** [**Abrir GeoLab Iguaná en Vivo (`federicogmz.github.io/geomatica-sig`)**](https://federicogmz.github.io/geomatica-sig/)  
> **Memoria Histórica:** La versión anterior del curso se encuentra archivada en la [Release / Tag Histórico 2026-1](https://github.com/federicogmz/geomatica-sig/releases/tag/2026-1).

---

## 🗺️ Arquitectura Pedagógica y Diseño Territorial 2027-1

El curso adopta un modelo formativo de vanguardia basado en **evidencia de aprendizaje, instrucción explícita y evaluación auténtica individual**:

1. **Arquitectura en Espejo (Dual-Stack SIG):**
   - **QGIS LTR (Abierto y Algorítmico):** El docente modela los geoprocesos, la topología, el álgebra ráster y la automatización (`.model3`) sobre la **Cuenca Escuela de la Quebrada La Iguaná (Medellín, 46.25 km²)**, articulada con la plataforma didáctica web **GeoLab Iguaná**. La Cuenca Escuela es exclusiva para demostraciones docentes; ningún estudiante la tiene asignada.
   - **ArcGIS Pro (Corporativo y Aplicado):** En el segundo sub-bloque, cada estudiante transfiere de inmediato los principios al entorno de ESRI (`.aprx`, File Geodatabase `.gdb`, Feature Datasets, Subtipos, Dominios Codificados, Geodatabase Topology, Spatial Analyst y ModelBuilder `.atbx`).
2. **Modalidad 100 % Individual:**
   - Asignación territorial sobre un portafolio de **10 Quebradas Metropolitanas del Valle de Aburrá (`Q01` a `Q10`)** cubiertas por la escena **Sentinel-2 MGRS `18NVL`** (con soporte norte `18NVM`), Modelos Digitales de Elevación Copernicus y geoservicios oficiales del AMVA, GeoMedellín, SIATA e IGAC en `EPSG:9377`.
   - **30 Unidades Territoriales Únicas (`U01` a `U30`):** Cada quebrada se divide en tres tramos funcionales (*Alto-Ladera*, *Medio-Transición* y *Bajo-Confluencia*).
   - **Doble Escala:** Microcuenca completa para modelación ráster + **Polígono Focal de 15 a 30 ha** para saneamiento topológico y cruce predial.
   - **Parametrización por Cédula ($D \in \{0..9\}$):** Retiro hídrico individual $R = 30 + D\text{ m}$ y umbral espectral de presión urbana $U_{\text{NDVI}} = 0.20 + (0.01 \times D)$, asegurando unicidad en las respuestas del aula.
   - **Diferenciación Propositiva:** 80 % técnico común y 20 % disciplinar según pregrado (**Ruta Ingeniería Civil** vs. **Ruta Diseño Urbano y Gestión del Hábitat**).
3. **Sistema de Evaluación (5 Hitos × 20 % = 100 %):**
   - **H1 (S05 · 18 feb · 20 % · Tier P):** Taller Evaluativo 1 en Sala — Geodesia EPSG:9377 y Bases Espaciales (.gpkg / .gdb) ([Guía H1](03_guias/03_evaluaciones/HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md) · [Repaso H1](03_guias/02_talleres_repaso/REPASO_HITO_1.md)). Ventana de mejora continua en S06 (+40 %).
   - **H2 (S08 · 11 mar · 20 % · Tier P):** Evaluación Práctica Integradora 1 — Topología, Geoprocesamiento Vectorial y Salida A3 ([Guía H2](03_guias/03_evaluaciones/HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md) · [Repaso H2](03_guias/02_talleres_repaso/REPASO_HITO_2.md)). Retroalimentación inmediata en sala.
   - **H3 (S09 · 18 mar · 20 % · Tier D):** Avance 1 Individual del Proyecto — Línea Base Vectorial (.gpkg + .gdb), Lámina A3 y Estación en Vivo ([Guía H3](03_guias/03_evaluaciones/HITO_3_AVANCE_PROYECTO_INDIVIDUAL_A3.md)). Sustentación en 2 rondas (Estación en Vivo + Co-evaluación).
   - **H4 (S14 · 29 abr · 20 % · Tier P):** Evaluación Práctica Integradora 2 — Terreno (DEM), GNSS (HDOP) e Índices Sentinel-2 ([Guía H4](03_guias/03_evaluaciones/HITO_4_EVALUACION_RASTER_GNSS_SENTINEL2.md) · [Repaso H4](03_guias/02_talleres_repaso/REPASO_HITO_4.md)). Ventana de mejora continua en S15 (+40 %).
   - **H5 (S16 · 13 may · 20 % · Tier O):** Proyecto Final Individual Multicriterio — Automatización ModelBuilder (.atbx), Dossier A3 y Pitch Ejecutivo ([Guía H5](03_guias/03_evaluaciones/HITO_5_PROYECTO_FINAL_MODELBUILDER_PITCH.md)). Pre-chequeo en S15 y Pitch Relámpago (4 + 3 min en PC) en 2 rondas.

---

## 🌟 GeoLab Iguaná: Plataforma WebGIS Didáctica y Autónoma

Dentro de este repositorio se aloja **GeoLab Iguaná**, una aplicación web interactiva concebida como un laboratorio didáctico autónomo y un entorno SIG ligero en el navegador para que los estudiantes refuercen los conceptos del curso sin fricción de instalación.

### 🚀 Características Principales:
1. **Desbloqueo Progresivo de Herramientas (*Progressive Disclosure*):**
   - La interfaz inicia limpia y minimalista (Nivel 1: navegación cartográfica, medición métrica y lectura de coordenadas CTM12).
   - A medida que el estudiante avanza y resuelve los retos formativos, se desbloquean herramientas avanzadas: *Árbol de Capas y Simbología*, *Digitalización con Snapping a 15 px*, *Comprobador de Topología*, *Caja de Geoprocesamiento (Buffer 30 m, Intersect, Clip)*, *Perfil de Relieve (2.950 a 1.450 msnm)*, *Auditoría GNSS con cálculo de RMSE* y *Compositor de Láminas A3*.
2. **Autocalificación en Tiempo Real (0.0 a 5.0):**
   - Los ejercicios geométricos y espaciales son evaluados en el navegador por los motores espaciales (`Turf.js` y `Proj4js`) con retroalimentación inmediata, micro-sonidos táctiles y animación visual.
3. **Acta Oficial de Calificación y Entrega Digital:**
   - Emite un acta formal con código criptográfico **SHA-256**, marca temporal y desglose analítico de notas, exportable en **PDF institucional** o en **JSON** para respaldo en Microsoft Teams.
4. **Arquitectura 100 % en Cliente:**
   - No requiere servidores backend ni almacenamiento externo. Opera como una Single Page Application estática lista para desplegarse mediante GitHub Pages.

---

## 🛠️ Cómo Ejecutar GeoLab Iguaná Localmente

### Requisitos:
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- `npm`

### Pasos de Ejecución:
```bash
# 1. Ingresar a la carpeta de la webapp
cd webapp

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abre en tu navegador la dirección indicada en la terminal (por defecto `http://localhost:5173/`).

Para compilar la versión optimizada de producción:
```bash
npm run build
```
Los artefactos estáticos quedarán generados en `webapp/dist/`.

---

## 🚀 Despliegue en GitHub Pages

El repositorio incluye el flujo de automatización [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), el cual compila automáticamente la aplicación web y la publica en GitHub Pages tras cada actualización en la rama principal `main`.

La plataforma interactiva se encuentra disponible en vivo en:
**`https://federicogmz.github.io/geomatica-sig/`**

---

## 📁 Estructura del Repositorio

- `01_programa/`:
  - [`SILABO.md`](01_programa/SILABO.md): Sílabo oficial del curso (3 Créditos · 5 UMEs · 16 semanas · RAA · Rúbricas C1–C4).
  - [`PROGRAMA_DOCENTE.md`](01_programa/PROGRAMA_DOCENTE.md): Programa curricular detallado sesión por sesión, arquitectura en espejo y protocolo de sala.
  - [`PACTO_PEDAGOGICO.md`](01_programa/PACTO_PEDAGOGICO.md): Pacto pedagógico, sistema de 5 hitos evaluativos, protocolo de cierre seguro y normas de entrega.
  - [`course_spec_2027_1.json`](01_programa/course_spec_2027_1.json): Fuente única de verdad curricular en formato estructurado JSON.
- `02_clases/`: Presentaciones interactivas en HTML y diapositivas teóricas de cada semana (`S01`–`S16`).
- `03_guias/`:
  - `01_talleres_clase/`: Guías de talleres prácticos semanales (`G01`–`G16`).
  - `02_talleres_repaso/`: Talleres de preparación previa hacia los hitos evaluativos.
  - `03_evaluaciones/`: Instructivos de evaluación de los 5 Hitos del semestre (`HITO_1` a `HITO_5`).
- `webapp/`: Código fuente de la plataforma WebGIS didáctica GeoLab Iguaná (Vite, Leaflet, Turf.js, Proj4js, jsPDF).

---

## 👨‍🏫 Autor y Créditos Institucionales
- **Profesor:** Federico Gómez Carvajal  
- **Institución:** Universidad EAFIT · Escuela de Ciencias Aplicadas e Ingeniería  
- **Departamento:** Departamento de Ingeniería Civil / Escuela de Ciencias Aplicadas e Ingeniería  
- **Medellín, Colombia · 2027**
