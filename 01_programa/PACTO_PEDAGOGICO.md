# Pacto Pedagógico: Geomática, Ingeniería y SIG

> **Semestre Académico:** **2027-1** (16 semanas lectivas efectivas: del `21 de enero` al `13 de mayo de 2027`; receso institucional de Semana Santa el `25 de marzo de 2027`; jueves `6 de mayo de 2027` hábil normal por aplicación de la Ley Emiliani)  
> Este documento se presenta, discute y acuerda con el grupo en la **Semana 1 (21 de enero de 2027)**, en cumplimiento del Reglamento Académico de Pregrado de la Universidad EAFIT (Art. 63, literal l), el cual estipula que todo estudiante tiene derecho a conocer desde el inicio del período académico el programa oficial, los criterios formativos y la ponderación de las actividades de evaluación. Complementa el [Sílabo del curso](SILABO.md) y el [Programa Docente](PROGRAMA_DOCENTE.md).  
>  
> **Ficha Técnica y Presupuesto Académico EAFIT:** **3 Créditos Académicos · 5 UMEs** (`144 h` totales de dedicación en el semestre: `4.5 h` semanales de acompañamiento presencial directo en sala [`72 h` semestrales] + `4.5 h` semanales de trabajo independiente del estudiante [`72 h` semestrales] = `144 h` totales).  
> **Horario y Espacio de Clase:** Jueves `12:00 m. – 4:30 p.m.` (`4.5 h` continuas 100 % presenciales en Sala de Cómputo EAFIT):  
> - **Sub-bloque 1 (`12:00 m. – 1:50 p.m.` · 110 min):** Fundamento conceptual + práctica guiada en **QGIS LTR** sobre la **Cuenca Escuela (Quebrada La Iguaná)**.  
> - **Pausa Activa Pedagógica / Almuerzo Ligero (`1:50 p.m. – 2:10 p.m.` · 20 min):** Integrada dentro de las `4.5 h` nominales (equivalente a los 5 min/hora reglamentarios de descanso).  
> - **Sub-bloque 2 (`2:10 p.m. – 4:30 p.m.` · 140 min):** Transferencia en espejo a **ArcGIS Pro** (`.aprx`, `.gdb`, `Domains`, `Geodatabase Topology`, `Spatial Analyst`, `ModelBuilder .atbx`), aplicación individual sobre su unidad territorial asignada y **Protocolo de Cierre Seguro en Sala (`4:20–4:30 p.m.`: trabajar en `C:\Temp\SIG_Usuario\`, cerrar ArcGIS Pro para liberar `.lock`, comprimir `.zip` y respaldar en OneDrive EAFIT)**.  

---

## 1. Requisitos Técnicos y Logística en Sala de Cómputo

1. **Software Oficial en Sala:**
   - Cada estación de cómputo de la Universidad cuenta con **ArcGIS Pro Advanced** (licenciamiento institucional gestionado con TI) y **QGIS LTR oficial**.
   - Para el trabajo autónomo fuera de sala (`4.5 h/semana`), se recomienda instalar QGIS LTR en su computador personal.
2. **Protocolo Estricto de Cierre Seguro en Sala (`4:20–4:30 p.m.`):**
   - **Directorio Local de Trabajo:** El estudiante debe trabajar obligatoriamente en el disco local rápido del computador: `C:\Temp\SIG_Usuario\`.
   - **Prohibición de Trabajo en la Nube:** **Queda terminantemente prohibido abrir o editar proyectos de ArcGIS Pro o QGIS directamente desde carpetas sincronizadas en la nube (OneDrive institucional, Google Drive o Dropbox).** Esta práctica bloquea archivos de esquema SQLite, corrompe File Geodatabases y genera pérdidas irreparables de datos.
   - **Liberación de Bloqueos `.lock`:** A las `4:20 p.m.`, el estudiante debe guardar su trabajo, cerrar completamente ArcGIS Pro y QGIS para que el sistema operativo elimine los archivos temporales `*.lock`.
   - **Compresión y Respaldo:** Comprimir la carpeta completa en un archivo `Apellido_Nombre_SesionXX.zip` y cargar este paquete comprimido al OneDrive institucional o a su memoria USB personal.

---

## 2. Metodología de Aprendizaje y Diseño Territorial 100 % Individual

1. **Curva de Aprendizaje y Nivel de Partida:**
   - La asignatura inicia desde los fundamentos matemáticos y geodésicos del territorio. No se asume conocimiento previo en software SIG.
2. **Modalidad 100 % Individual:**
   - Para asegurar la trazabilidad del aprendizaje, evitar asimetrías de carga y certificar la competencia técnica individual, todas las evaluaciones, talleres y proyectos del semestre son **estrictamente individuales**.
3. **Cuenca Escuela vs. Unidades Territoriales de los Estudiantes:**
   - La **Quebrada La Iguaná** (46.25 km²) es la **Cuenca Escuela Exclusiva del Profesor** (y de la plataforma interactiva didáctica **GeoLab Iguaná**). En ella se demuestran los conceptos y geoprocesos en clase. Ningún estudiante puede tener asignada esta cuenca.
   - Cada estudiante recibe en la Semana 1 una **Unidad Territorial Única (`U01` a `U30`)** seleccionada del portafolio de **10 Quebradas Metropolitanas del Valle de Aburrá (`Q01` a `Q10`)**:
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
4. **Doble Escala y Parametrización por Cédula ($D \in \{0..9\}$):**
   - Cada unidad territorial articula la **microcuenca completa** para modelación ráster y un **Polígono Focal de 15 a 30 ha** para saneamiento topológico fino y cruces catastrales.
   - El último dígito del documento de identidad $D$ personaliza las variables de diseño:
     $$\text{Retiro Hídrico Normativo } R = 30 + D \text{ metros}$$
     $$\text{Umbral Espectral de Presión Urbana } U_{\text{NDVI}} = 0.20 + (0.01 \times D)$$
5. **Diferenciación Propositiva por Pregrado (80 % común + 20 % disciplinar):**
   - **Ingeniería Civil:** Obras de estabilidad en laderas, retención hidráulica y drenaje de infraestructura.
   - **Diseño Urbano y Gestión del Hábitat:** Espacio público ribereño, corredores ecológicos y mejoramiento de asentamientos informales.

---

## 3. Estructura Evaluativa Oficial (5 Hitos × 20 % = 100 %)

En concordancia con el Reglamento Académico de Pregrado de EAFIT (ninguna actividad supera el 20 % de la calificación definitiva):

| Código | Nombre Oficial de la Evaluación | % | Semana | Fecha Oficial | Tier IA | Mecanismo de Mejora Continua | Documento Guía Oficial | Taller de Repaso Previo |
|:---:|---|:---:|:---:|:---:|:---:|---|---|---|
| **H1** | Taller Evaluativo 1 en Sala — Geodesia EPSG:9377 y Bases Espaciales (.gpkg / .gdb) | **20%** | S05 | 18 feb | **Tier P** | Ventana en S06 (25 feb): corrección en sala sobre su unidad territorial recupera hasta el 40% de puntos deducidos. | [HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md](../03_guias/03_evaluaciones/HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md) | [REPASO_HITO_1.md](../03_guias/02_talleres_repaso/REPASO_HITO_1.md) |
| **H2** | Evaluación Práctica Integradora 1 — Topología, Geoprocesamiento Vectorial y Salida A3 | **20%** | S08 | 11 mar | **Tier P** | Retroalimentación inmediata en sala antes de H3; sin tareas en S08 para proteger el presupuesto de 4.5 h autónomas hacia S09. | [HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md](../03_guias/03_evaluaciones/HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md) | [REPASO_HITO_2.md](../03_guias/02_talleres_repaso/REPASO_HITO_2.md) |
| **H3** | Avance 1 Individual del Proyecto — Línea Base Vectorial (.gpkg + .gdb), Lámina A3 y Estación en Vivo | **20%** | S09 | 18 mar | **Tier D** | Auditoría en 2 rondas (Estación en Vivo + Revisión por Pares); matriz de mejora cartográfica subsanable en el Hito 5. | [HITO_3_AVANCE_PROYECTO_INDIVIDUAL_A3.md](../03_guias/03_evaluaciones/HITO_3_AVANCE_PROYECTO_INDIVIDUAL_A3.md) | Prácticas S06–S08 |
| **H4** | Evaluación Práctica Integradora 2 — Terreno (DEM), GNSS (HDOP) e Índices Sentinel-2 | **20%** | S14 | 29 abr | **Tier P** | Ventana en S15 (06 may): depuración en ModelBuilder (.atbx) recupera hasta el 40% de puntos deducidos. | [HITO_4_EVALUACION_RASTER_GNSS_SENTINEL2.md](../03_guias/03_evaluaciones/HITO_4_EVALUACION_RASTER_GNSS_SENTINEL2.md) | [REPASO_HITO_4.md](../03_guias/02_talleres_repaso/REPASO_HITO_4.md) |
| **H5** | Proyecto Final Individual Multicriterio — Automatización ModelBuilder (.atbx), Dossier A3 y Pitch Ejecutivo | **20%** | S16 | 13 may | **Tier O** | Pre-chequeo técnico en sala en S15 (06 may) garantizando 0 rutas rotas y 0 archivos bloqueados `.lock` antes del Pitch (4 + 3 min). | [HITO_5_PROYECTO_FINAL_MODELBUILDER_PITCH.md](../03_guias/03_evaluaciones/HITO_5_PROYECTO_FINAL_MODELBUILDER_PITCH.md) | Pre-chequeo técnico S15 |
| **Total** | | **100%** | | | | | **5 Hitos Individuales × 20% = 100%** | |

---

## 4. Mecanismo de Mejora Continua y Acompañamiento Formativo

Para transformar la evaluación en una instancia de aprendizaje reflexivo y premiar el trabajo deliberado:
1. **Ventana de Mejora del Hito 1 (Semana 6 · 25 de febrero):** El estudiante que haya presentado inconsistencias en geodesia o estructura de geodatabase puede corregir su entrega en sala y sustentar la solución con las herramientas de la Semana 6, recuperando hasta el **40 % de los puntos deducidos**.
2. **Retroalimentación Formativa Inmediata del Hito 2 (Semana 8 · 11 de marzo):** Calificación y diagnóstico técnico en la misma sesión para que el estudiante cuente con insumos claros antes del Avance del Proyecto (Hito 3), protegiendo la carga autónoma de 4.5 h.
3. **Auditoría de Estación en Vivo y Revisión de Pares (Hito 3 · Semana 9 · 18 de marzo):** En 2 rondas de 65 minutos en sala, cada estudiante expone su estación de trabajo durante 4 minutos ante el docente y recibe retroalimentación estructurada de un par evaluador, consolidando una matriz de ajustes para el cierre semestral.
4. **Ventana de Mejora del Hito 4 (Semana 15 · 06 de mayo):** Depuración y encapsulamiento del análisis ráster dentro de ModelBuilder (`.atbx`), recuperando hasta el **40 % de los puntos deducidos** en H4.
5. **Pre-chequeo Técnico en Sala (Semana 15 · 06 de mayo):** Verificación obligatoria con el profesor de cero rutas rotas y correcta apertura de la File Geodatabase antes de la sustentación del Hito 5.

---

## 5. Rúbricas Analíticas Oficiales y Segundo Evaluador

- Las evaluaciones se califican mediante las **Rúbricas Analíticas Oficiales (Criterios C1, C2, C3 y C4)** detalladas en el [Sílabo](SILABO.md) y configuradas en Microsoft Teams.
- **Derecho a Segundo Evaluador:** Conforme al Reglamento Académico de Pregrado de la Universidad EAFIT, en caso de inconformidad justificada con una calificación, el estudiante tiene derecho a solicitar un **segundo evaluador dentro de los 3 días hábiles posteriores a la publicación oficial de la nota**. Vencido dicho plazo reglamentario, la calificación adquiere firmeza institucional.

---

## 6. Plazos de Calificación y Retroalimentación

- Las calificaciones y observaciones técnicas se publicarán formalmente en Microsoft Teams en un plazo máximo de **15 días hábiles** tras la entrega.
- Si este plazo reglamentario no se cumple, el estudiante tiene el derecho de negarse a presentar la evaluación subsiguiente hasta recibir la retroalimentación pendiente.

---

## 7. Normas Técnicas y Reglas de Entrega

1. **Contenedores Espaciales Oficiales:**
   - Se trabaja exclusivamente con **File Geodatabase (`.gdb`)** en ArcGIS Pro y **GeoPackage (`.gpkg`)** en QGIS LTR.
   - **Queda prohibido el uso de Shapefiles sueltos (`.shp`)** debido a la pérdida de precisión métrica, la limitación de nombres a 10 caracteres y la ausencia de dominios codificados.
2. **Nomenclatura Oficial de Archivos:**
   - Todo paquete entregable debe nombrarse estrictamente: `Apellido_Nombre_HitoX.zip` (p. ej. `Gomez_Federico_H1.zip`).
3. **Penalidad por Rutas Rotas o Archivos Bloqueados (`.lock`):**
   - **−0.5 directo sobre la nota final de la entrega** si el proyecto de ArcGIS Pro (`.aprx`) o QGIS (`.qgz`) abre con advertencias de capas no disponibles (*rutas rotas*), si contiene archivos residuales de bloqueo `.lock` o si se dejaron capas temporales no persistidas.
4. **Modalidad de Láminas Cartográficas (100 % Digital):**
   - Las láminas de los Hitos 2, 3 y 5 se maquetan en estándar **A3 horizontal ($420 \times 297\text{ mm}$)** y se exportan en **PDF vectorial de alta resolución (300 ppp)** dentro del archivo `.zip`. **No se requiere impresión física en papel.**
5. **Política de Entregas Tardías:**
   - Entregas extemporáneas tendrán una penalización de **−5 % sobre la nota definitiva por cada día calendario de retraso**, hasta un tope máximo de **5 días calendario**. Vencido este plazo, la calificación será de 0.0, salvo soporte formal de fuerza mayor avalado por la Dirección de Programa.

---

## 8. Integridad Académica y Política de Inteligencia Artificial

- La honestidad intelectual es un principio formativo irrenunciable (Reglamento Académico, Art. 62).
- **Marco de Niveles de IA:**
  - **Tier P (H1, H2, H4):** Prohibido el uso de IA generativa de código o agentes durante la prueba en sala.
  - **Tier D (H3):** Permitido el uso asistido de IA con declaración obligatoria del registro de prompts (*Prompt Log*). El estudiante es responsable de verificar la veracidad técnica de cada capa.
  - **Tier O (H5):** Uso libre con defensa oral en vivo. Si el estudiante no logra operar su modelo de ModelBuilder o desconoce la lógica de sus capas en la estación de trabajo, la calificación del componente práctico será de 0.0.
- **Fraude Técnico:** La clonación de geodatabases entre compañeros, el uso de scripts no autorizados para generar datos sintéticos o la alteración de metadatos se sanciona conforme al régimen disciplinario institucional de EAFIT.

---

## 9. Canales de Comunicación y Asesorías

- **Plataforma Oficial:** **Microsoft Teams**. Es el canal exclusivo para publicación de guías, resolución de dudas técnicas, entrega de tareas y recepción de calificaciones.
- **Horario de Asesorías Docentes:** Martes de 10:00 a.m. a 12:00 m. a través de Microsoft Teams o presencial previa solicitud concertada.
