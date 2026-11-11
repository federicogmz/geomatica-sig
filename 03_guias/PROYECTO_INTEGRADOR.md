# Proyecto Integrador Territorial Individual: Microcuencas del Valle de Aburrá (2027-1)

> **Curso:** Geomática, Ingeniería y SIG (`GEOMATICA-SIG-EAFIT`)  
> **Semestre:** 2027-1 · Universidad EAFIT  
> **Modalidad:** 100 % Individual bajo marco TILT (*Transparency in Learning and Teaching*)  
> **Sistema de Coordenadas Oficial:** MAGNA-SIRGAS 2018 / Origen Nacional CTM12 (`EPSG:9377`, Res. IGAC 471/2020)  
> **Escena Satelital Base:** Sentinel-2 L2A MGRS `18NVL` (complementada por `18NVM` al norte)

---

## 1. Propósito Formativo y Marco TILT

El **Proyecto Integrador Individual** constituye el eje articulador práctico del curso. A diferencia de asignaciones teóricas aisladas, este proyecto sitúa al estudiante en un rol de consultoría técnica territorial real, enfrentando la complejidad geomorfológica, hidroclimática y de ocupación antrópica propia del Valle de Aburrá.

### 1.1 Resultados de Aprendizaje Afectados (RAA)
El proyecto evalúa de forma acumulativa y progresiva los cuatro Resultados de Aprendizaje de la asignatura (Taxonomía SOLO de Biggs & Tang):
- **RAA1 (Relacional):** Diagnosticar y homologar bases espaciales multiescala al sistema oficial `EPSG:9377`, dominando la diferencia entre asignación de referencia espacial y reproyección geodésica.
- **RAA2 (Relacional):** Estructurar, auditar topológicamente y ejecutar geoprocesos vectoriales multicriterio sobre GeoPackages (`.gpkg`) y File Geodatabases (`.gdb` con Feature Datasets, Subtipos y Dominios), produciendo cartografía normativa A3.
- **RAA3 (Relacional):** Modelar variables morfométricas del terreno (DEM), validar levantamientos GNSS por dilución de precisión (`HDOP`/`RMSE`) e integrar índices espectrales Sentinel-2 (`NDVI` y `NDBI`) mediante álgebra de mapas en QGIS LTR y ArcGIS Pro.
- **RAA4 (Abstracto Extendido):** Automatizar flujos reproducibles de priorización territorial mediante ModelBuilder (`.atbx`) y el Diseñador Gráfico de Modelos (`.model3`), sustentando propuestas individuales de intervención en Ingeniería Civil o Diseño Urbano respaldadas por balance cuantitativo en hectáreas.

### 1.2 Cuenca Escuela vs. Unidades Territoriales Individuales
Para maximizar el aprendizaje sin sobrecargar al estudiante ni permitir atajos:
1. **La Cuenca de la Quebrada La Iguaná (Medellín, 46.25 km²):** Se designa como **Cuenca Escuela exclusiva del docente**. Es el territorio en el cual el profesor ejecuta las demostraciones en vivo de los sub-bloques 1 de cada clase y sobre la cual opera el visor GeoLab WebGIS. **Está expresamente prohibida como asignación de proyecto estudiantil**.
2. **Unidades Territoriales Únicas (U01 a U30):** Cada estudiante recibe en la Semana 1 una única unidad territorial individual, no transferible, dentro del Portafolio Metropolitano de 10 Quebradas del Valle de Aburrá.
3. **Semilla Individual de Calibración ($D$):** Cada estudiante opera sus geoprocesos condicionado por su dígito $D \in \{0, 1, \dots, 9\}$ (último dígito de su documento de identidad):
   - **Retiro hídrico normativo individualizado:** $R = 30 + D\text{ m}$ (rango: $30\text{ m}$ a $39\text{ m}$).
   - **Umbral de corte de cobertura vegetal densa (`NDVI`):** $U_{\text{NDVI}} = 0.20 + 0.01 \times D$ (rango: $0.20$ a $0.29$).

---

## 2. Portafolio Metropolitano de Microcuencas y Matriz de 30 Unidades

El proyecto opera bajo un enfoque de **doble escala**:
- **Escala de Microcuenca Completa (Macro):** Delimitación morfométrica de cabecera a desembocadura para análisis de elevación (DEM), pendientes, hidrología superficial e índices multiespectrales Sentinel-2.
- **Escala de Polígono Focal (Micro, $15\text{ a }30\text{ ha}$):** Ventana de detalle funcional dentro del tramo asignado, sobre la cual se audita la topología catastral, se aplican los retiros hídricos ($R = 30 + D\text{ m}$), se cuantifican afectaciones prediales y se proyecta la intervención sectorial de cierre.

### Matriz Oficial de Asignación Territorial (U01 – U30)

| Código | Cuenca | Tramo Funcional | Municipio | Coordenadas Aprox. Centroide (`EPSG:9377`) | Escena Sentinel-2 | Características Territoriales y Desafíos |
|:---:|:---|:---:|:---:|:---:|:---:|:---|
| **U01** | Q01. La Ayurá | Alto-Ladera | Envigado | $N: 2\,236\,500,\; E: 4\,726\,000$ | `18NVL` | Cabecera rural, bosque de niebla, alta pendiente, nacimientos y captaciones de acueducto. |
| **U02** | Q01. La Ayurá | Medio-Transición | Envigado | $N: 2\,238\,200,\; E: 4\,723\,800$ | `18NVL` | Sector El Salado - La Mina. Borde periurbano, desarrollos residenciales en pendiente, tramo semi-natural. |
| **U03** | Q01. La Ayurá | Bajo-Confluencia | Envigado | $N: 2\,240\,100,\; E: 4\,721\,500$ | `18NVL` | Zona centro - Las Vegas. Cauce canalizado, cruces viales masivos, desembocadura al Río Medellín. |
| **U04** | Q02. La Presidenta | Alto-Ladera | Medellín | $N: 2\,240\,500,\; E: 4\,724\,800$ | `18NVL` | Vereda Santa Elena / Las Palmas. Pendientes escarpadas, movimientos en masa en depósitos de vertiente. |
| **U05** | Q02. La Presidenta | Medio-Transición | Medellín | $N: 2\,241\,800,\; E: 4\,722\,400$ | `18NVL` | El Poblado / Parque Lineal. Alta densidad constructiva, fajas de retiro absorbidas por espacio público y vías. |
| **U06** | Q02. La Presidenta | Bajo-Confluencia | Medellín | $N: 2\,242\,500,\; E: 4\,721\,200$ | `18NVL` | Sector Av. Regional / Confluencia Río Medellín. Intersecciones complejas, box-culverts y llanura de inundación. |
| **U07** | Q03. Santa Elena | Alto-Ladera | Medellín | $N: 2\,244\,200,\; E: 4\,729\,500$ | `18NVL` | Corregimiento Santa Elena (Mazo / El Rosario). Suelo rural de protección, parcelaciones y coberturas boscosas. |
| **U08** | Q03. Santa Elena | Medio-Transición | Medellín | $N: 2\,245\,000,\; E: 4\,724\,500$ | `18NVL` | Comuna 8 (Villa Hermosa / Caicedo). Asentamientos autoconstruidos en alta pendiente, amenaza por avenidas torrenciales. |
| **U09** | Q03. Santa Elena | Bajo-Confluencia | Medellín | $N: 2\,245\,600,\; E: 4\,722\,000$ | `18NVL` | Centro urbano (Av. La Playa / San Juan). Cauce subterráneo abovedado, cobertura 100 % impermeable, confluencia al Río. |
| **U10** | Q04. Altavista - Picacha | Alto-Ladera | Medellín | $N: 2\,241\,000,\; E: 4\,715\,000$ | `18NVL` | Corregimiento Altavista. Minería artesanal de ladrilleras, taludes inestables y quebradas tributarias torrenciales. |
| **U11** | Q04. Altavista - Picacha | Medio-Transición | Medellín | $N: 2\,243\,200,\; E: 4\,718\,500$ | `18NVL` | Comuna 16 (Belén Rincón / La Mota). Presión urbanística sobre el cauce, canalizaciones parciales y desbordamientos. |
| **U12** | Q04. Altavista - Picacha | Bajo-Confluencia | Medellín | $N: 2\,244\,600,\; E: 4\,721\,000$ | `18NVL` | Belén Rosales / Bulerías / Parques del Río. Sección de concreto rectilínea, alta impermeabilización y desembocadura. |
| **U13** | Q05. Doña María | Alto-Ladera | Itagüí / Medellín | $N: 2\,234\,000,\; E: 4\,714\,500$ | `18NVL` | Alto del Astillero / San Antonio de Prado. Microcuenca rural con acelerada fragmentación predial y erosión remontante. |
| **U14** | Q05. Doña María | Medio-Transición | Itagüí | $N: 2\,236\,800,\; E: 4\,718\,200$ | `18NVL` | Ditaires / El Rosario. Conurbación densa, obras de gaviones históricas y estrangulamiento de la planicie aluvial. |
| **U15** | Q05. Doña María | Bajo-Confluencia | Itagüí | $N: 2\,238\,500,\; E: 4\,720\,600$ | `18NVL` | Corredor Industrial de Itagüí / Autopista Sur. Descargas industriales, tramo meándrico residual y desembocadura. |
| **U16** | Q06. La Doctora | Alto-Ladera | Sabaneta | $N: 2\,233\,500,\; E: 4\,724\,000$ | `18NVL` | Reserva Ecológica La Romera. Relieve quebrado, vegetación nativa en galería y zonas de recarga hídrica. |
| **U17** | Q06. La Doctora | Medio-Transición | Sabaneta | $N: 2\,235\,100,\; E: 4\,722\,200$ | `18NVL` | Barrio San José / Restrepo Naranjo. Crecimiento vertical acelerado (edificios de gran altura) sobre conos de deyección. |
| **U18** | Q06. La Doctora | Bajo-Confluencia | Sabaneta | $N: 2\,236\,200,\; E: 4\,720\,800$ | `18NVL` | Sector Las Vegas Sabaneta. Tramo canalizado en gavión y concreto, cruce del Metro y desembocadura al Río Medellín. |
| **U19** | Q07. La Hueso - Ana Díaz | Alto-Ladera | Medellín | $N: 2\,247\,000,\; E: 4\,716\,200$ | `18NVL` | Nacimientos en San Cristóbal / Altos de la Comuna 13. Laderas abruptas, rellenos antrópicos y drenajes superficiales críticos. |
| **U20** | Q07. La Hueso - Ana Díaz | Medio-Transición | Medellín | $N: 2\,247\,500,\; E: 4\,718\,800$ | `18NVL` | La Floresta / Calasanz / Santa Lucía. Tramo con canal abierto y parques de bolsillo; confluencia de la Quebrada Ana Díaz. |
| **U21** | Q07. La Hueso - Ana Díaz | Bajo-Confluencia | Medellín | $N: 2\,248\,100,\; E: 4\,721\,100$ | `18NVL` | Estadio / Los Colores / Suramericana. Confluencia soterrada y canal abierto hacia el Río Medellín junto al puente de Colombia. |
| **U22** | Q08. La García | Alto-Ladera | Bello | $N: 2\,253\,500,\; E: 4\,714\,000$ | `18NVL` / `18NVM` | Serranía de Las Baldías / Charco Verde. Cuenca torrencial de alta montaña con antecedentes de grandes avenidas catastróficas. |
| **U23** | Q08. La García | Medio-Transición | Bello | $N: 2\,254\,800,\; E: 4\,720\,500$ | `18NVL` / `18NVM` | El Congolo / Santa Ana / Centro de Bello. Densidad extrema, invasión histórica de orillas, diques longitudinales. |
| **U24** | Q08. La García | Bajo-Confluencia | Bello | $N: 2\,255\,400,\; E: 4\,723\,200$ | `18NVL` / `18NVM` | Entorno de la Estación Bello del Metro. Cono aluvial extenso, sedimentación masiva y desembocadura en el Río Medellín. |
| **U25** | Q09. La Madera | Alto-Ladera | Medellín / Bello | $N: 2\,250\,500,\; E: 4\,717\,500$ | `18NVL` / `18NVM` | Cuchilla El Picacho. Pendientes superiores al 60 %, suelos derivados de cenizas volcánicas susceptibles a flujos. |
| **U26** | Q09. La Madera | Medio-Transición | Medellín / Bello | $N: 2\,251\,400,\; E: 4\,719\,800$ | `18NVL` / `18NVM` | Límite Barrial París - Doce de Octubre. Frontera intermunicipal compleja, drenajes no planificados y taludes confinados. |
| **U27** | Q09. La Madera | Bajo-Confluencia | Medellín / Bello | $N: 2\,252\,300,\; E: 4\,722\,400$ | `18NVL` / `18NVM` | Sector Autopista Norte / Acevedo. Cruces de infraestructura vial arterial, redes de acueducto y entrega al Río Medellín. |
| **U28** | Q10. La Aguacatala | Alto-Ladera | Medellín | $N: 2\,238\,800,\; E: 4\,725\,200$ | `18NVL` | Alto de Las Palmas / Cuchilla La Asomadera. Nacimientos de montaña, condominios campestres y relictos de bosque secundario. |
| **U29** | Q10. La Aguacatala | Medio-Transición | Medellín | $N: 2\,239\,800,\; E: 4\,723\,000$ | `18NVL` | Sector Los Balsos / El Diamante / Oviedo. Corredor comercial y financiero con fajas de retiro hídrico ajardinadas. |
| **U30** | Q10. La Aguacatala | Bajo-Confluencia | Medellín | $N: 2\,240\,600,\; E: 4\,721\,300$ | `18NVL` | Entorno Campus Universidad EAFIT / Av. Regional. Canal en sección de concreto, estación pluviométrica SIATA y confluencia al Río. |

---

## 3. Mapa de Instrucción Explícita Semana a Semana (S01 a S16)

El desarrollo del proyecto está estrictamente integrado a las sesiones magistrales de 4.5 h en sala de cómputo:
- **Sub-bloque 1 (110 min):** Modelado conceptual y demostración en QGIS LTR sobre la **Cuenca Escuela La Iguaná**.
- **Pausa Activa (20 min):** Descanso pedagógico y almuerzo ligero.
- **Sub-bloque 2 (140 min):** Espejo corporativo en ArcGIS Pro y aplicación inmediata e individual sobre la **Unidad Territorial Asignada ($U_{xx}$)** con semilla $D$.

```text
S01–S04: Geodesia y Bases de Datos (.gpkg / .gdb)
  │
  ├─► [S05] HITO 1 (20% · Tier P): Geodesia EPSG:9377 y Bases Espaciales
  │
S06–S07: Topología, Snapping y Geoprocesamiento con Semilla D (30 + D m)
  │
  ├─► [S08] HITO 2 (20% · Tier P): Evaluación Práctica Vectorial y Salida A3
  ├─► [S09] HITO 3 (20% · Tier D): Avance Proyecto Individual A3 + Auditoría en Vivo
  │
S10–S13: DEM (Pendientes/Aspecto), GNSS (HDOP) y Sentinel-2 (NDVI / NDBI)
  │
  ├─► [S14] HITO 4 (20% · Tier P): Evaluación Práctica Ráster, GNSS e Índices
  │
S15–S16: Automatización ModelBuilder (.atbx / .model3) y Cierre
  │
  └─► [S16] HITO 5 (20% · Tier O): Proyecto Final Multicriterio, Dossier A3 y Pitch
```

| Semana | Fecha | Actividad en Cuenca Escuela (Docente) | Aplicación en Unidad Asignada (Estudiante) | Entregable / Hito Vinculado |
|:---:|:---:|:---|:---|:---|
| **S01** | 21 ene | Visores territoriales y reconocimiento en La Iguaná. | Localización de la unidad ($U_{xx}$) y delimitación inicial. | Bitácora de localización. |
| **S02** | 28 ene | Escalas gráficas, medición métrica y tolerancias en visor. | Medición de longitudes de cauce y anchos de faja en $U_{xx}$. | Ejercicio de escalas. |
| **S03** | 04 feb | Datum Bogotá vs MAGNA-SIRGAS, CTM12 (`EPSG:9377`). | Homologación de coordenadas de vértices de $U_{xx}$ a `9377`. | Asignación vs Reproyección. |
| **S04** | 11 feb | Creación de `.gpkg` en QGIS y `.gdb` en ArcGIS Pro. | Estructuración de contenedores con Feature Datasets y Dominios. | Contenedores limpios listos. |
| **S05** | 18 feb | **Hito 1 en Sala (12:00–1:50 p.m.):** Examen práctico individual. | Geodesia, CTM12 y bases espaciales (.gpkg / .gdb). | **Hito 1 (20 % · Tier P)** |
| **S06** | 25 feb | Digitalización, auto-ensamblado (*snapping*) y topología. | Vectorización del polígono focal ($15\text{ a }30\text{ ha}$) en $U_{xx}$. | Mejora continua H1 (recupera hasta 40%). |
| **S07** | 04 mar | Geoprocesamiento: Buffer disuelto, Intersect y Dissolve. | Cálculo de afectación de faja $R = 30 + D\text{ m}$ sobre predios. | Capa `afectacion_retiro_d`. |
| **S08** | 11 mar | **Hito 2 en Sala (12:00–2:30 p.m.):** Evaluación práctica. | Topología, geoprocesos vectoriales y salida A3 en PC. | **Hito 2 (20 % · Tier P)** |
| **S09** | 18 mar | **Hito 3: Auditoría de Estación en Vivo (Ronda A y B).** | Presentación de Línea Base Vectorial y Lámina A3. | **Hito 3 (20 % · Tier D)** |
| **S10** | 01 abr | Descarga de DEM, recorte por máscara y reproyección CTM12. | Recorte del DEM a la microcuenca completa de $U_{xx}$. | `dem_recorte_9377.tif` |
| **S11** | 08 abr | Pendientes en grados y %, reclasificación POT y sombras 3D. | Mapa morfométrico de pendientes y perfil longitudinal del cauce. | Perfil topográfico y pendientes. |
| **S12** | 15 abr | Ingesta GNSS (`EPSG:4326`), depuración HDOP y RMSE métrico. | Validación posicional de puntos de control en la microcuenca. | `gnss_filtrado_9377.gpkg` |
| **S13** | 22 abr | Sentinel-2 L2A (`18NVL`), reflectancias y cálculo NDVI/NDBI. | Extracción de huella urbana y vegetación densa con umbral $D$. | Máscara biofísica y `DN = 1`. |
| **S14** | 29 abr | **Hito 4 en Sala (12:00–2:30 p.m.):** Evaluación práctica. | Terreno (DEM), GNSS (HDOP) e Índices Sentinel-2. | **Hito 4 (20 % · Tier P)** |
| **S15** | 06 may | Automatización ModelBuilder (`.atbx`) y `.model3` en QGIS. | Integración del flujo completo y **Pre-chequeo técnico en sala**. | Mejora continua H4 / Pre-chequeo. |
| **S16** | 13 may | **Hito 5: Sustentación Final y Pitch Ejecutivo Relámpago.** | Defensa individual oral en vivo (4 min + 3 min) en 2 rondas. | **Hito 5 (20 % · Tier O)** |

---

## 4. Diferenciación del 20 % Propositivo según Programa Profesional

El diagnóstico territorial inicial es común a todos los estudiantes (geodesia, topología, terreno y teledetección). Sin embargo, en el **Hito 3** y de forma definitiva en el **Hito 5**, cada estudiante debe formular una propuesta sectorial de intervención georreferenciada sobre su polígono focal ($15\text{ a }30\text{ ha}$), adaptada a su disciplina:

```text
┌────────────────────────────────────────────────────────────────────────┐
│     Línea Base Territorial Compartida (80 % de la estructura)          │
│ • Geodesia EPSG:9377 y Bases de Datos Espaciales (.gpkg / .gdb)        │
│ • Retiro Hídrico Individualizado (R = 30 + D m) y Saneamiento          │
│ • Diagnóstico DEM (Pendientes/Relieve) y Sentinel-2 (NDVI / NDBI)      │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼                                ▼
┌──────────────────────────────────────┐ ┌──────────────────────────────────────┐
│  Ruta de Ingeniería Civil (20 %)     │ │ Ruta de Diseño Urbano (20 %)         │
│ • Obras de bioingeniería en taludes  │ │ • Parque lineal de ronda hídrica     │
│ • Estructuras disipadoras de energía │ │ • Red de espacio público y movilidad │
│ • Capacidad hidráulica y descoles    │ │ • Mitigación de islas de calor (NDBI)│
│ • Estabilización y drenaje pluvial   │ │ • Relocalización y borde de contención│
│ • Balance cuantitativo de obras (m/m³)│ │ • Balance de espacio público (ha/m²) │
└──────────────────────────────────────┘ └──────────────────────────────────────┘
```

### 4.1 Ruta A: Estudiantes de Ingeniería Civil
La propuesta debe concentrarse en la mitigación de amenazas hidrológicas y geotécnicas mediante intervenciones de infraestructura y bioingeniería:
1. **Obras de Bioingeniería y Estabilización:** Identificación de sectores de ladera inestable ($>30^\circ$) para fajinas vivas, trinchos de guadua, revegetalización con especies nativas o muros de contención en gavión/concreto.
2. **Hidráulica y Disipación Fluvial:** Zonificación de tramos de cauce con alta velocidad o socavación lateral para diques de retención de sedimentos, azudes de disipación o ampliación de sección transversal.
3. **Infraestructura de Drenaje Pluvial y Descoles:** Localización georreferenciada de alcantarillas, disipadores de energía en entregas de aguas lluvias y obras de alivio de escorrentía superficial.
4. **Métricas Obligatorias en el Dossier:** Longitud lineal de obras de estabilización (m), volumen estimado de retención o gaviones (m³) y área de taludes intervenidos (ha).

### 4.2 Ruta B: Estudiantes de Diseño Urbano y Gestión del Hábitat
La propuesta debe concentrarse en la recomposición del paisaje fluvial, la resiliencia climática y la integración comunitaria:
1. **Parque Lineal y Espacio Público de Ronda:** Diseño del corredor ecológico en la faja de retiro ($R = 30 + D\text{ m}$), integrando senderos peatonales permeables, ciclorrutas y zonas de contemplación.
2. **Mitigación de Isla de Calor e Infraestructura Verde:** Priorización de polígonos con alto `NDBI` y bajo `NDVI` para arbolado urbano, jardines de lluvia (*rain gardens*) y superficies de bioinfiltración.
3. **Gestión del Riesgo y Hábitat:** Identificación de edificaciones consolidadas en zonas de retiro no mitigable para relocalización preventiva, proponiendo frentes verdes de contención a la expansión informal.
4. **Métricas Obligatorias en el Dossier:** Área neta de nuevo espacio público efectivo por habitante (m² y ha), incremento porcentual de cobertura vegetal proyectada y número de predios bajo manejo especial de ronda.

---

## 5. Estructura y Estándares de Entrega Cartográfica

> [!IMPORTANT]
> **Prohibición de Informes en Word o PDF Multipágina:**  
> En este curso queda terminantemente proscrito el informe redactado tradicional de 20 páginas con texto genérico y capturas de pantalla de botones del software. Los ingenieros y diseñadores urbanos comunican sus decisiones mediante **Bases de Datos Espaciales Normalizadas** y **Láminas Cartográficas Ejecutivas**.

### 5.1 Lámina Cartográfica A3 Individual (Hito 3 — Avance)
- **Formato:** Archivo PDF vectorial único, orientación horizontal ($420 \times 297\text{ mm}$), resolución exacta de exportación a **300 ppp**.
- **Contenido Central:** Cartografía base y diagnóstica de la unidad asignada a escala redonda de ingeniería ($1:2\,000$, $1:5\,000$ o $1:10\,000$).
- **Los 8 Elementos Anatómicos Obligatorios:**
  1. Título formal normalizado indicando número de hito, nombre de la quebrada, tramo funcional y código de unidad.
  2. Cuadrícula métrica proyectada en `EPSG:9377` con coordenadas en Este y Norte en el margen exterior.
  3. Escala numérica oficial y escala gráfica con subdivisión clara en metros.
  4. Flecha de norte normalizada orientada al norte de cuadrícula.
  5. Leyenda temática categorizada con jerarquía figura-fondo.
  6. Recuadro de localización general en el Valle de Aburrá (mapa de contexto).
  7. Bloque de metadatos técnicos (autor, programa, código, fecha, elipsoide GRS80, CRS EPSG:9377, fuentes de datos).
  8. Tabla de balance métrico (área del polígono focal en hectáreas, longitud del cauce en metros, área de afectación de faja de retiro en hectáreas).

### 5.2 Dossier Infográfico A3 de 2 Páginas (Hito 5 — Final)
Un único archivo PDF de **exactamente dos páginas A3 horizontales ($420 \times 297\text{ mm}$)** a 300 ppp:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ PÁGINA 1: DIAGNÓSTICO TERRITORIAL MULTICRITERIO                        │
│ ┌───────────────────────────────────┐ ┌──────────────────────────────┐ │
│ │ Mapa Principal Diagnóstico        │ │ Matriz de Variables Ráster   │ │
│ │ • Relieve sombreado (Hillshade)   │ │ • Mapa de Pendientes POT (%) │ │
│ │ • Polígono Focal (15 a 30 ha)     │ │ • Clasificación NDVI / NDBI  │ │
│ │ • Faja de Retiro (30 + D m)       │ │ • Perfil Longitudinal Cauce  │ │
│ │ • Red hídrica y vial en EPSG:9377 │ │ • Gráfico Hipsométrico       │ │
│ └───────────────────────────────────┘ └──────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Tabla de Diagnóstico Cuantitativo (Áreas, %, Índices y Semilla D)  │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│ PÁGINA 2: PROPUESTA SECTORIAL (CIVIL O DISEÑO URBANO) + MODELO         │
│ ┌───────────────────────────────────┐ ┌──────────────────────────────┐ │
│ │ Mapa Ejecutivo de Intervención    │ │ Diagrama del Modelo (.atbx)  │ │
│ │ • Capas de diseño georreferenciadas│ │ • Flujo de geoprocesos      │ │
│ │ • Detalle a escala 1:1.000 / 2.000 │ │ • Entradas, herramientas,   │ │
│ │ • Cuadrícula EPSG:9377 y leyenda  │ │   parámetros y salidas       │ │
│ └───────────────────────────────────┘ └──────────────────────────────┘ │
│ ┌───────────────────────────────────┐ ┌──────────────────────────────┐ │
│ │ Balance Cuantitativo de Propuesta │ │ Metadatos y Auditoría de IA  │ │
│ │ (m de obras, ha recuperadas, etc.)│ │ (Tier O: prompts, sesgos)    │ │
│ └───────────────────────────────────┘ └──────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Criterios de Éxito, QA/QC y Resiliencia Técnica

1. **Cero Rutas Rotas (*Zero Broken Paths*):**  
   Todo proyecto entregado (`.qgz` o `.aprx`) debe abrir de forma inmediata y sin ventanas de advertencia al ser descomprimido en cualquier unidad o ruta externa (como `C:\Temp` o el equipo del evaluador). El almacenamiento debe basarse en rutas relativas estrictas hacia las carpetas locales del contenedor.
2. **Prohibición Terminante de Shapefiles Sueltos:**  
   No se admitirán archivos `.shp`. La información vectorial debe residir exclusivamente en **GeoPackage (`.gpkg`)** en QGIS y en **File Geodatabase (`.gdb`)** en ArcGIS Pro, aprovechando Feature Datasets y Dominios.
3. **Topología Limpia Verificada:**  
   El polígono focal y las coberturas no pueden contener geometrías duplicadas, autointersecciones, polígonos astilla (*slivers*) ni solapes indebidos. Se exigirá reporte de cero errores en el Comprobador de Topología de QGIS y en Geodatabase Topology de ArcGIS Pro.
4. **Resiliencia ante Inteligencia Artificial:**  
   El uso de IA generativa está regido por los tres niveles de política del curso:
   - **Tier P (Hito 1, Hito 2, Hito 4):** Evaluaciones en sala de cómputo bajo supervisión directa; el estudiante demuestra su dominio técnico y operativo en el software.
   - **Tier D (Hito 3):** Avance autónomo individual; se permite apoyo de IA con declaración explícita de herramientas y bitácora de prompts en los metadatos de la lámina.
   - **Tier O (Hito 5):** Proyecto final integrador; la sustentación oral individual en vivo (Pitch de 4 min + 3 min de preguntas) y la auditoría del modelo `.atbx` verifican el dominio real del estudiante sobre cada parámetro y decisión territorial.
