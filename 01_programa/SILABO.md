# Geomática, Ingeniería y SIG: Sílabo del Curso

> **Semestre Académico:** **2027-1** (16 semanas lectivas efectivas: del `21 de enero` al `13 de mayo de 2027`; receso institucional de Semana Santa el `25 de marzo de 2027`; jueves `6 de mayo de 2027` hábil normal por aplicación de la Ley Emiliani)  
> **Pregrados:** Ingeniería Civil · Diseño Urbano y Gestión del Hábitat  
> **Créditos Académicos y UMEs:** **3 Créditos Académicos · 5 UMEs** (`144 h` totales en el semestre: `4.5 h` semanales de acompañamiento presencial directo [`72 h` semestrales] + `4.5 h` semanales de trabajo independiente [`72 h` semestrales] = `144 h` totales de dedicación estudiantil)  
> **Horario y Espacio de Aprendizaje:** Jueves `12:00 m. – 4:30 p.m.` (`4.5 h` académicas continuas 100 % en Sala de Cómputo EAFIT):  
> - **Sub-bloque 1 (`12:00 m. – 1:50 p.m.` · 110 min):** Fundamento conceptual + práctica guiada en **QGIS LTR** sobre la **Cuenca Escuela (Quebrada La Iguaná)**.  
> - **Pausa Activa Pedagógica / Almuerzo Ligero (`1:50 p.m. – 2:10 p.m.` · 20 min):** Integrada dentro de las `4.5 h` académicas nominales (equivalente a los 5 min/hora reglamentarios de cambio/descanso).  
> - **Sub-bloque 2 (`2:10 p.m. – 4:30 p.m.` · 140 min):** Transferencia en espejo a **ArcGIS Pro** (`.aprx`, `.gdb`, `Domains`, `Geodatabase Topology`, `Spatial Analyst`, `ModelBuilder .atbx`), aplicación individual sobre su unidad territorial asignada y **Protocolo de Cierre Seguro en Sala (`4:20–4:30 p.m.`: trabajar en `C:\Temp\SIG_Usuario\`, cerrar ArcGIS Pro para liberar `.lock`, comprimir `.zip` y respaldar en OneDrive EAFIT)**.  
> **Plataforma Oficial:** Microsoft Teams (canales temáticos, entrega digital de paquetes `.zip`, actas criptográficas y retroalimentación)  

---

## 1. Descripción del Curso

Curso teórico-práctico de fundamentación y aplicación espacial avanzada que articula los métodos de la geomática, la geodesia satelital y los Sistemas de Información Geográfica (SIG) con la toma de decisiones basada en evidencia en proyectos de **Ingeniería Civil** y **Diseño Urbano y Gestión del Hábitat**. 

El curso implementa una arquitectura pedagógica en espejo (**Dual-Stack SIG**):
1. **Modelado conceptual y abierto en QGIS LTR:** El profesor modela en vivo algoritmos espaciales, geoprocesos vectoriales, análisis morfométrico del terreno, teledetección multiespectral y modelado gráfico (`.model3`) sobre una cuenca de referencia común: la **Cuenca Escuela de la Quebrada La Iguaná (Medellín, 46.25 km²)**, articulada con la plataforma didáctica web **GeoLab Iguaná**. La Cuenca Escuela es de uso demostrativo docente exclusivo y ningún estudiante la tiene asignada.
2. **Transferencia corporativa en ArcGIS Pro:** En el segundo sub-bloque de cada sesión, el estudiante transfiere de forma inmediata los principios aprendidos al ecosistema corporativo de ESRI en la sala de cómputo (`.aprx`, File Geodatabase `.gdb`, Feature Datasets, Subtipos, Dominios Codificados, Geodatabase Topology, Spatial Analyst y ModelBuilder `.atbx`), aplicándolos sobre su **Unidad Territorial Individual asignada**.

El proceso formativo es **100 % individual** y se desarrolla de forma incremental sobre una matriz de **30 Unidades Territoriales Únicas (`U01` a `U30`)**, distribuidas a lo largo de un portafolio de **10 Quebradas Metropolitanas del Valle de Aburrá (`Q01` a `Q10`)** cubiertas por la escena **Sentinel-2 MGRS `18NVL`** (complementada al norte por `18NVM`), Modelos Digitales de Elevación Copernicus y geoservicios oficiales del IGAC, AMVA, GeoMedellín y SIATA bajo el marco **MAGNA-SIRGAS Origen Nacional CTM12 (`EPSG:9377`)**. La asignación se personaliza además mediante el último dígito del documento de identidad $D \in \{0..9\}$, parametrizando retiros hídricos ($R = 30 + D\text{ m}$) y umbrales espectrales ($U_{\text{NDVI}} = 0.20 + 0.01 \times D$), garantizando que no existan soluciones numéricas idénticas en el aula.

---

## 2. Resultados de Aprendizaje de la Asignatura (RAA)

En concordancia con el modelo pedagógico de la Universidad EAFIT, el Decreto 1330 de 2019 y la Taxonomía SOLO (*Structure of Observed Learning Outcomes*, Biggs & Collis), la asignatura tributa a cuatro Resultados de Aprendizaje evaluables mediante evidencias objetivas de desempeño:

- **RAA1 (Nivel SOLO: Relacional):**  
  Diagnosticar y homologar bases espaciales multiescala al sistema oficial MAGNA-SIRGAS Origen Nacional CTM12 (`EPSG:9377`), diferenciando operaciones de asignación de referencia frente a reproyección de coordenadas tanto en QGIS LTR como en ArcGIS Pro.
- **RAA2 (Nivel SOLO: Relacional):**  
  Estructurar, auditar topológicamente y ejecutar geoprocesos vectoriales multicriterio sobre bases de datos espaciales abiertas (GeoPackage `.gpkg`) y corporativas (File Geodatabase `.gdb` con Feature Datasets, Subtipos y Dominios Codificados), produciendo cartografía normativa A3.
- **RAA3 (Nivel SOLO: Relacional):**  
  Modelar variables morfométricas del terreno (DEM), validar levantamientos satelitales GNSS por dilución de precisión (HDOP/RMSE) e integrar índices espectrales Sentinel-2 (NDVI y NDBI) mediante álgebra de mapas en QGIS LTR y Spatial Analyst de ArcGIS Pro.
- **RAA4 (Nivel SOLO: Abstracto Extendido):**  
  Automatizar flujos reproducibles de priorización territorial mediante ModelBuilder (`.atbx`) y el Diseñador Gráfico de Modelos (`.model3`), sustentando propuestas individuales de intervención en Ingeniería Civil o Diseño Urbano respaldadas por evidencia cuantitativa.

---

## 3. Stack Tecnológico Oficial y Recursos de Sala

| Componente | Herramienta | Rol Pedagógico en el Curso | Modalidad de Acceso |
|---|---|---|---|
| **SIG Abierto / Conceptual** | **QGIS (versión LTR oficial)** | Demostración en vivo por el profesor sobre la Cuenca Escuela La Iguaná, soporte para álgebra ráster, Comprobador de topología y modelador gráfico `.model3`. | Software libre instalado en Sala EAFIT y laptop personal |
| **SIG Corporativo / Aplicado** | **ArcGIS Pro (Advanced)** | Entorno de trabajo individual del estudiante: File Geodatabase (`.gdb`), Feature Datasets, Dominios Codificados, Geodatabase Topology, Spatial Analyst y ModelBuilder (`.atbx`). | Licencia institucional en Sala de Cómputo EAFIT |
| **Plataforma WebGIS Didáctica** | **GeoLab Iguaná** | Explorador interactivo ligero con autoevaluación geométrica, cálculo de distancias, áreas, perfiles y emisiones criptográficas SHA-256. | Despliegue web en GitHub Pages (cliente 100 % estático) |
| **Teledetección Satelital** | **Sentinel-2 MSI (L2A)** | Escena regional MGRS `18NVL` (con soporte norte `18NVM`), bandas de 10 m y 20 m para formulación de índices espectrales `NDVI` y `NDBI`. | Copernicus Data Space Ecosystem / Geoservicios de clase |
| **Morfometría del Relieve** | **DEM Copernicus (GLO-30) / ALOS PALSAR (12.5 m)** | Modelación de pendientes normativas del POT, orientación de laderas (aspecto), curvas de nivel y perfiles longitudinales de cauce. | Descarga oficial reproyectada a `EPSG:9377` |
| **Geoservicios OGC / REST** | **WMS / WMTS / WFS / FeatureServer** | Conexión a Infraestructuras de Datos Espaciales oficiales: GeoMedellín, AMVA, SIATA y Colombia en Mapas (IGAC). | Conexión en vivo en QGIS LTR y ArcGIS Pro |

---

## 4. Diseño Territorial y Modalidad 100 % Individual

### 4.1. Cuenca Escuela vs. Unidades Territoriales Individuales
- **Cuenca Escuela del Profesor:** La **Quebrada La Iguaná** (46.25 km²) se reserva exclusivamente para las sesiones guiadas del profesor y los retos interactivos de `GeoLab Iguaná`. Ningún estudiante puede desarrollar sus evaluaciones o proyectos sobre esta cuenca.
- **Portafolio de 10 Quebradas Metropolitanas:** Las unidades territoriales de los estudiantes se distribuyen en 10 cuencas representativas del Valle de Aburrá:
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

### 4.2. Matriz de 30 Unidades Territoriales (`U01` a `U30`) y Parámetro Individual $D$
Cada una de las 10 quebradas metropolitanas se divide en 3 tramos funcionales:
1. **Tramo Alto-Ladera:** Cabecera, alta pendiente, dinámicas rurales/forestales y susceptibilidad a movimientos en masa.
2. **Tramo Medio-Transición:** Zona de piedemonte, borde urbano-rural, densificación intermedia y quebradas encañonadas.
3. **Tramo Bajo-Confluencia:** Zona de valle denso, infraestructura vial/hidráulica masiva, llanuras aluviales y desembocadura en el Río Medellín.

Cada estudiante recibe en la Semana 1 una **Unidad Territorial Única (`U01`–`U30`)** que combina:
- **Doble escala analítica:** La microcuenca hidrográfica completa para geoprocesos ráster (DEM, pendientes, índices espectrales) y un **Polígono Focal de 15 a 30 ha** dentro de su tramo asignado para digitalización detallada, auditoría topológica y cruces catastrales.
- **Parámetro del documento de identidad $D \in \{0..9\}$:**
  $$\text{Retiro Hídrico Normativo } R = 30 + D \text{ metros}$$
  $$\text{Umbral Espectral de Presión Urbana } U_{\text{NDVI}} = 0.20 + (0.01 \times D)$$

### 4.3. Énfasis Disciplinar Diferenciado (80 % común + 20 % propositivo)
- **Ruta Ingeniería Civil:** Enfoque en amenazas geotécnicas en laderas, estabilidad de taludes, capacidad hidráulica de drenajes, dimensionamiento de obras de laminación/retención y obras de paso vial.
- **Ruta Diseño Urbano y Gestión del Hábitat:** Enfoque en espacio público ribereño, corredores biológicos urbanos, fajas de amortiguamiento ambiental, reasentamiento en zonas de alto riesgo no mitigable y mejoramiento integral de barrios.

---

## 5. Sistema de Evaluación (5 Hitos × 20 % = 100 %) y Niveles de IA

El sistema evaluativo se estructura en cinco hitos integradores individuales de igual ponderación (**$5 \times 20\,\% = 100\,\%$**), cumpliendo rigurosamente con el Reglamento Académico de Pregrado de la Universidad EAFIT (máximo 20 % por actividad). Cada hito declara su política de Integridad Académica e Inteligencia Artificial bajo el marco institucional (`Tier P / D / O`):

- **Tier P (Práctica Supervisada en Sala — Sin IA generativa):** Se evalúa la ejecución autónoma en sala de cómputo operando QGIS y ArcGIS Pro en tiempo real. Prohibido el uso de asistentes generativos de código o soluciones automatizadas externas.
- **Tier D (Desarrollo Asistido con Declaración y Auditoría Crítica):** Se autoriza el uso de IA como asistente de consulta y documentación sintáctica, exigiendo declaración explícita de prompts y auditoría técnica de los outputs. Las alucinaciones espaciales son penalizadas directamente.
- **Tier O (Evaluación Abierta / Defensa Oral y Auditoría en Vivo):** Se permite el uso amplio de tecnologías para el diseño de flujos, pero la validez de la calificación depende de la sustentación oral individual y la operación en vivo del proyecto SIG ante el profesor.

| Hito | Nombre Oficial de la Actividad | % | Sem. | Fecha | Tier IA | RAA Asociados | Mecanismo de Mejora Continua | Documento Guía Oficial | Taller de Repaso Previo |
|:---:|---|:---:|:---:|:---:|:---:|:---:|---|---|---|
| **H1** | Taller Evaluativo 1 en Sala — Geodesia EPSG:9377 y Bases Espaciales (.gpkg / .gdb) | **20%** | S05 | 18 feb | **Tier P** | RAA1, RAA2 | Ventana de mejora continua en S06 (25 feb): corrección en sala sobre su unidad territorial recupera hasta el 40% de puntos deducidos. | [HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md](../03_guias/03_evaluaciones/HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md) | [REPASO_HITO_1.md](../03_guias/02_talleres_repaso/REPASO_HITO_1.md) |
| **H2** | Evaluación Práctica Integradora 1 — Topología, Geoprocesamiento Vectorial y Salida A3 | **20%** | S08 | 11 mar | **Tier P** | RAA1, RAA2 | Retroalimentación inmediata antes del H3; sin tareas adicionales en S08 para proteger el presupuesto de 4.5 h autónomas hacia S09. | [HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md](../03_guias/03_evaluaciones/HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md) | [REPASO_HITO_2.md](../03_guias/02_talleres_repaso/REPASO_HITO_2.md) |
| **H3** | Avance 1 Individual del Proyecto — Línea Base Vectorial (.gpkg + .gdb), Lámina A3 y Estación en Vivo | **20%** | S09 | 18 mar | **Tier D** | RAA1, RAA2, RAA4 | Auditoría en 2 rondas en sala (Estación en Vivo + Revisión por Pares estructurada); entrega matriz de mejora cartográfica subsanable en H5. | [HITO_3_AVANCE_PROYECTO_INDIVIDUAL_A3.md](../03_guias/03_evaluaciones/HITO_3_AVANCE_PROYECTO_INDIVIDUAL_A3.md) | Sesiones prácticas S06–S08 |
| **H4** | Evaluación Práctica Integradora 2 — Terreno (DEM), GNSS (HDOP) e Índices Sentinel-2 | **20%** | S14 | 29 abr | **Tier P** | RAA3 | Ventana de mejora continua en S15 (06 may): depuración en ModelBuilder (.atbx) recupera hasta el 40% de puntos deducidos. | [HITO_4_EVALUACION_RASTER_GNSS_SENTINEL2.md](../03_guias/03_evaluaciones/HITO_4_EVALUACION_RASTER_GNSS_SENTINEL2.md) | [REPASO_HITO_4.md](../03_guias/02_talleres_repaso/REPASO_HITO_4.md) |
| **H5** | Proyecto Final Individual Multicriterio — Automatización ModelBuilder (.atbx), Dossier A3 y Pitch Ejecutivo | **20%** | S16 | 13 may | **Tier O** | RAA1, RAA2, RAA3, RAA4 | Pre-chequeo técnico en sala en S15 (06 may) garantizando 0 rutas rotas y 0 archivos bloqueados `.lock` antes del Pitch (4 + 3 min). | [HITO_5_PROYECTO_FINAL_MODELBUILDER_PITCH.md](../03_guias/03_evaluaciones/HITO_5_PROYECTO_FINAL_MODELBUILDER_PITCH.md) | Pre-chequeo técnico S15 |
| **Total** | | **100%** | | | | | **5 Hitos Individuales × 20% = 100%** | | |

---

## 6. Rúbricas Analíticas Oficiales de Evaluación

Las evaluaciones se valoran mediante descriptores criteriales cuantitativos y cualitativos observables, estructurados en 4 niveles de desempeño (Incompleto $\rightarrow$ Presente $\rightarrow$ Funcional $\rightarrow$ Estratégico), libres de adjetivos evaluativos vagos según el estándar EAFIT / Brookhart & Sadler:

### C1. Rigor Geodésico e Integridad de Contenedores Espaciales (.gpkg y .gdb)
- **Nivel 1 - Inicial (0.0–2.9):** Las capas carecen de referencia espacial válida, mezclan coordenadas geográficas en grados con etiquetas proyectadas sin transformación real, o el proyecto presenta rutas rotas y capas temporales en memoria.
- **Nivel 2 - Básico (3.0–3.7):** Homologa las capas al sistema EPSG:9377 y almacena las geometrías en GeoPackage y File Geodatabase con rutas relativas funcionales, pero omite la configuración de Feature Datasets o dominios codificados de atributos.
- **Nivel 3 - Competente (3.8–4.4):** Ejecuta sin distorsión métrica la asignación y reproyección de capas hacia EPSG:9377 en QGIS LTR y ArcGIS Pro, estructura Feature Datasets con dominios codificados activos y verifica cero rutas rotas tras descomprimir en directorio externo.
- **Nivel 4 - Avanzado (4.5–5.0):** Cumple todos los indicadores del nivel Competente y además documenta cuantitativamente las discrepancias planas frente a elipsoidales e implementa reglas de validación de dominios y subtipos que previenen inconsistencias de captura.

### C2. Saneamiento Topológico y Geoprocesamiento Vectorial Multicriterio
- **Nivel 1 - Inicial (0.0–2.9):** Persisten solapes, huecos o geometrías inválidas en el polígono focal, aplica buffers sobre capas erróneas o sin disolución geométrica, o no parametriza el retiro hídrico con su dígito individual D.
- **Nivel 2 - Básico (3.0–3.7):** Corrige los defectos topológicos primarios y ejecuta la cadena de buffer disuelto e intersección con su parámetro D, aunque conserva polígonos astilla residuales o campos de área sin actualizar tras el recorte.
- **Nivel 3 - Competente (3.8–4.4):** Entrega el polígono focal con cero errores verificados en Comprobador de Topología y Geodatabase Topology, ejecuta retiros disueltos ($30 + D\text{ m}$) e intersecciones exactas y recalcula áreas y longitudes en unidades métricas oficiales.
- **Nivel 4 - Avanzado (4.5–5.0):** Cumple todos los indicadores del nivel Competente y contrasta la sensibilidad espacial de la afectación predial frente a variaciones del retiro normativo, desagregando métricas verificables por tipología catastral o funcional.

### C3. Modelación Ráster del Relieve, Control GNSS e Índices Espectrales Sentinel-2
- **Nivel 1 - Inicial (0.0–2.9):** Procesa escenas sin recortar a la divisoria de su microcuenca, conserva estaciones GNSS con HDOP superior al umbral técnico, invierte bandas en el cálculo de NDVI o NDBI o vectoriza sin filtrar la clase activa DN = 1.
- **Nivel 2 - Básico (3.0–3.7):** Recorta el DEM y las bandas Sentinel-2 a la máscara de su cuenca (NoData = -9999), filtra estaciones GNSS por HDOP y calcula NDVI y NDBI, pero omite el perfil longitudinal del cauce o presenta imprecisiones en las estadísticas zonales.
- **Nivel 3 - Competente (3.8–4.4):** Integra en QGIS LTR y Spatial Analyst el recorte por máscara, pendientes reclasificadas, perfil longitudinal del cauce, depuración GNSS con cálculo de RMSE, índices NDVI y NDBI con umbral individual ($0.20 + 0.01 \times D$) y vectorización limpia de DN = 1.
- **Nivel 4 - Avanzado (4.5–5.0):** Cumple todos los indicadores del nivel Competente y valida físicamente las anomalías espectrales y morfométricas contra ortofotografía de alta resolución, cuantificando la incertidumbre posicional y de resolución de píxel (10 m vs 20 m).

### C4. Automatización Visual (ModelBuilder / .model3), Comunicación Cartográfica A3 y Defensa Oral
- **Nivel 1 - Inicial (0.0–2.9):** No entrega flujo automatizado ejecutable, la lámina carece de cuadrícula métrica EPSG:9377, escala o leyendas cuantitativas, o durante la defensa en vivo no logra operar ni explicar las capas de su propio proyecto.
- **Nivel 2 - Básico (3.0–3.7):** Construye un flujo parcial en ModelBuilder o Diseñador de Modelos y compone la lámina A3 con los elementos normativos base, pero emplea simbología sin jerarquía figura-fondo o depende de notas escritas durante su exposición.
- **Nivel 3 - Competente (3.8–4.4):** Entrega un modelo parametrizado funcional (.atbx y .model3), diseña un Dossier Infográfico A3 legible con cuadrícula EPSG:9377, perfil y gráficas cuantitativas, y responde con solvencia técnica operando QGIS y ArcGIS Pro en vivo.
- **Nivel 4 - Avanzado (4.5–5.0):** Cumple todos los indicadores del nivel Competente y articula una propuesta rigurosa en su ruta disciplinar (Ingeniería Civil o Diseño Urbano) donde cada intervención está georreferenciada, dimensionada y auditada frente a sesgos de herramientas o IA.

---

## 7. Cronograma Sintético de 16 Semanas (Semestre 2027-1)

| Sem. | Fecha (Jueves) | Eje Temático y Competencia Desarrollada | Sub-bloque 1 (12:00 m. – 1:50 p.m.) · QGIS LTR | Sub-bloque 2 (2:10 p.m. – 4:30 p.m.) · ArcGIS Pro | Hito Evaluativo / Logística |
|:---:|:---:|---|---|---|:---:|
| **S01** | 21 ene | Presentación, Pacto Pedagógico y Geodesia Base | Escala, lectura cartográfica y visores en La Iguaná | Entorno ArcGIS Pro, creación de proyecto y asignación de Unidad Territorial (`U01`–`U30`) | Diagnóstico inicial |
| **S02** | 28 ene | Sistema Oficial MAGNA-SIRGAS CTM12 (`EPSG:9377`) | Asignar proyección vs Reproyectar en QGIS | Herramientas Define Projection y Project en ArcGIS Pro | Repaso hacia H1 |
| **S03** | 04 feb | Contenedores Espaciales: GeoPackage vs File GDB | Manejo de capas vectoriales en `.gpkg` único | Estructura corporativa File Geodatabase (`.gdb`), Feature Datasets y Dominios | Repaso hacia H1 |
| **S04** | 11 feb | Digitalización Avanzada y Geoservicios OGC / REST | Snapping y digitalización sobre ortofoto WMS | Edición vectorial en ArcGIS Pro, Subtipos y consumo de FeatureServers oficiales | Simulacro H1 |
| **S05** | 18 feb | Geoprocesamiento Vectorial 1 y Taller Evaluativo | Fundamentos de Buffer disuelto y Clip en QGIS | **Hito 1 en Sala (H1, 20%, Tier P — S01–S04)** en ArcGIS Pro / QGIS | **H1 (20%)** |
| **S06** | 25 feb | Geoprocesamiento Vectorial 2 y Cruces Multicriterio | Intersect, Erase y Spatial Join sobre La Iguaná | Cruce predial en ArcGIS Pro sobre polígono focal + **Ventana de Mejora Continua H1** | *Mejora H1 (+40%)* |
| **S07** | 04 mar | Topología Vectorial y Saneamiento de Geometrías | Comprobador de topología en QGIS LTR | Geodatabase Topology (reglas de no solape ni huecos) en ArcGIS Pro | Repaso hacia H2 |
| **S08** | 11 mar | Composición Cartográfica A3 y Evaluación Práctica | Reglas de maquetación, cuadrícula métrica y escalas | **Hito 2 en Sala (H2, 20%, Tier P — S05–S07)** en ArcGIS Pro / Layout A3 | **H2 (20%)** |
| **S09** | 18 mar | Avance 1 de Proyecto y Estación en Vivo | Preparación de estaciones y verificación de capas | **Hito 3 (H3, 20%, Tier D — S01–S08)**: 2 rondas de Estación en Vivo + Revisión de Pares | **H3 (20%)** |
| — | **25 mar** | **Receso Institucional de Semana Santa** | *Pausa académica universitaria* | *Estudio autónomo y descanso* | *Sin actividad* |
| **S10** | 01 abr | Modelos Digitales de Elevación (DEM) y Relieve | Estructura matricial, NoData y reproyección ráster | Spatial Analyst en ArcGIS Pro: pendientes normativas POT y sombreado 3D | Retorno lectivo |
| **S11** | 08 abr | Morfometría Avanzada y Álgebra Ráster | Calculadora Ráster, curvas de nivel y perfiles | Álgebra de mapas condicional y perfil longitudinal en ArcGIS Pro | Avance H4 |
| **S12** | 15 abr | Posicionamiento Satelital GNSS y Dilución HDOP | Segmentos, constelaciones y filtrado `HDOP <= 2.0` | Importación espacial GPX/CSV y validación de RMSE en ArcGIS Pro | Avance H4 |
| **S13** | 22 abr | Teledetección Multiespectral Sentinel-2 MSI | Bandas ópticas/infrarrojas y firmas espectrales | Composición multibanda, cálculo de NDVI/NDBI y vectorización de clase $DN = 1$ | Simulacro H4 |
| **S14** | 29 abr | Evaluación Práctica 2 (Ráster, GNSS e Índices) | Verificación de entorno ráster en QGIS LTR | **Hito 4 en Sala (H4, 20%, Tier P — S10–S13)** en Spatial Analyst / ArcGIS Pro | **H4 (20%)** |
| **S15** | 06 may | Automatización ModelBuilder y Pre-chequeo Técnico | Diseñador Gráfico de Modelos (`.model3`) en QGIS | ModelBuilder (`.atbx`) en ArcGIS Pro + **Mejora Continua H4** + Pre-chequeo 0 errores H5 | *Mejora H4 (+40%)* |
| **S16** | 13 may | Pitch Ejecutivo Final y Cierre del Semestre | Ronda A: Pitch Relámpago (4+3 min) y defensa en PC | Ronda B: Pitch Relámpago (4+3 min) y defensa en PC (**H5, 20%, Tier O**) | **H5 (20%)** |

---

## 8. Lecturas y Recursos de Consulta

### Cartografía, Geodesia y Bases Espaciales
- **IGAC.** *Resolución 471 de 2020: Por la cual se adopta el sistema de proyección cartográfica oficial para Colombia (Origen Nacional CTM12).* Instituto Geográfico Agustín Codazzi, Bogotá D.C.
- **Sánchez, L. & Martínez, W.** *Adopción del Marco Geocéntrico Nacional de Referencia MAGNA-SIRGAS como datum oficial de Colombia.* Instituto Geográfico Agustín Codazzi (IGAC).
- **QGIS Development Team.** *QGIS Documentation: Vector Data, Topology Checker and Print Layout.* [docs.qgis.org](https://docs.qgis.org/).
- **ESRI.** *ArcGIS Pro Help: An overview of the Geodatabase, Subtypes, Attribute Domains, and Geodatabase Topology.* [pro.arcgis.com](https://pro.arcgis.com/).

### Morfometría del Relieve, GNSS y Teledetección
- **Chuvieco, E.** *Teledetección Ambiental: La observación de la Tierra desde el espacio.* Ediciones Rialp, Madrid.
- **European Space Agency (ESA).** *Sentinel-2 User Handbook.* European Space Agency / Copernicus Data Space Ecosystem [dataspace.copernicus.eu](https://dataspace.copernicus.eu/).
- **Hofmann-Wellenhof, B., Lichtenegger, H. & Wasle, E.** *GNSS – Global Navigation Satellite Systems: GPS, GLONASS, Galileo, and more.* Springer, Wien.
- **Aristizábal, E. et al.** *A landslide susceptibility assessment in urban areas based on existing data: An example from the Iguaná Valley, Medellín City, Colombia.* Natural Hazards and Earth System Sciences.

### Automatización Espacial y Diseño Territorial
- **ESRI.** *Automating your analysis with ModelBuilder in ArcGIS Pro.* Esri Training & Documentation.
- **Fang, Y., Shandas, V. & Arriaga, E.** *Spatial Thinking in Planning Practice: An Introduction to GIS.* Open Textbook Library, University of Minnesota.
