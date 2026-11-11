# Hito 5: Proyecto Final Individual Multicriterio — Automatización ModelBuilder (.atbx), Dossier A3 y Pitch Ejecutivo

> **Curso:** Geomática, Ingeniería y SIG (`GEOMATICA-SIG-EAFIT`)  
> **Semestre:** 2027-1 · Universidad EAFIT  
> **Semana de Cierre:** Semana 16 (`S16`) · Jueves 13 de mayo de 2027  
> **Pre-chequeo Técnico en Sala:** Semana 15 (`S15`) · Jueves 06 de mayo de 2027 (Obligatorio)  
> **Horario de Sustentación:** 12:00 m. – 4:30 p.m. (Organizado en dos rondas rotativas)  
> **Ponderación:** 20.0 % de la calificación definitiva del curso  
> **Modalidad:** 100 % Individual sobre la Unidad Territorial Asignada ($U_{01}\text{ a }U_{30}$)  
> **Política de Inteligencia Artificial:** **`Tier O` (Abierto / Auditoría Crítica de IA Obligatoria)**  
> **Resultados de Aprendizaje Evaluados:** `RAA1`, `RAA2`, `RAA3`, `RAA4` (Abstracto Extendido)  
> **Contenidos Integrados:** Semanas `S01` a `S15` (Flujo territorial completo multicriterio)

---

## 1. Propósito y Sentido Formativo (TILT - Purpose)

El **Hito 5** es la culminación profesional del curso. El estudiante integra la totalidad de las competencias adquiridas en geodesia, modelado vectorial, análisis morfométrico de terreno (DEM), teledetección multiespectral (Sentinel-2) y automatización espacial, aplicadas a su **Unidad Territorial Asignada ($U_{01}\text{ a }U_{30}$)** en el Valle de Aburrá.

En el mercado laboral actual, la ingeniería y el urbanismo exigen dos capacidades diferenciadoras:
1. **Reproducibilidad y Automatización:** Capacidad para encapsular rutinas complejas en herramientas reutilizables (**ModelBuilder `.atbx`** en ArcGIS Pro y el **Diseñador Gráfico de Modelos `.model3`** en QGIS LTR), permitiendo que otros profesionales auditen o ejecuten el análisis con nuevos datos sin intervención manual.
2. **Comunicación Ejecutiva de Alto Impacto:** Capacidad para sintetizar problemas territoriales complejos en un **Dossier Infográfico A3 de 2 páginas** y defender una propuesta técnica en un **Pitch Ejecutivo Relámpago de 4 minutos**, respondiendo con solvencia preguntas técnicas directas frente a sus proyectos espaciales.

---

## 2. Pre-chequeo Técnico en Sala (Semana 15 — Obligatorio)

Durante la sesión del **jueves 06 de mayo de 2027 (`S15`)**, cada estudiante deberá someter su repositorio digital a una auditoría preliminar en sala de cómputo:
- Verificación de **cero rutas rotas** al descomprimir la estructura en una ruta externa (`C:\Temp\Precheck_Uxx\`).
- Verificación de **cero corrupción en la File Geodatabase** (`.gdb`) y compatibilidad del GeoPackage (`.gpkg`).
- Validación de que el modelo de **ModelBuilder (`.atbx`)** ejecute de principio a fin sin arrojar errores de licencia o parámetros no asignados.
- Todo estudiante que apruebe el pre-chequeo recibirá el aval de habilitación para el Pitch de la Semana 16. Los ajustes técnicos señalados deberán corregirse antes del cierre definitivo.

---

## 3. Especificaciones de los Entregables Oficiales (TILT - Task)

Antes de las **11:59 a.m. del jueves 13 de mayo de 2027**, cada estudiante debe cargar en la plataforma institucional su paquete final comprimido: `Proyecto_Final_Uxx_Apellido_Nombre.zip`.

### 3.1 Repositorio de Datos Espaciales Dual en EPSG:9377
1. **Contenedor Abierto QGIS (`linea_base_final_Uxx.gpkg` + `proyecto_final_qgis.qgz`):**
   - Todas las capas vectoriales en **CTM12 (`EPSG:9377`)**: polígono focal ($15\text{ a }30\text{ ha}$), microcuenca completa, red de drenajes, faja de retiro ($R = 30 + D\text{ m}$), zonificación de pendientes POT, huella urbana y coberturas críticas, y capas de la propuesta sectorial georreferenciada.
   - Rutas relativas estrictas; sin capas temporales en memoria.
2. **Contenedor Corporativo ArcGIS Pro (`Corporativo_Final_Uxx.gdb` + `Proyecto_Final_ArcGIS.aprx`):**
   - Feature Dataset estructurado en `EPSG:9377` con réplica de las capas vectoriales.
   - Dominios Codificados aplicados a estados de conservación, prioridades de intervención o tipologías de obra.

### 3.2 Modelos de Automatización Reproducibles (`.atbx` y `.model3`)
El núcleo del Hito 5 es la automatización del flujo de priorización espacial:
1. **ArcGIS Pro ModelBuilder (`Modelo_Priorizacion_Uxx.atbx`):**
   - Debe integrar de forma encadenada al menos 4 geoprocesos: (a) *Buffer* disuelto parametrizado ($30 + D\text{ m}$), (b) *Intersect* o *Clip* con predios o pendientes, (c) Reclasificación o álgebra ráster, y (d) Cálculo de campo automatizado de áreas en hectáreas.
   - Parámetros de entrada configurados como variables de usuario (cajas azules con letra $P$).
   - Nombres claros y documentados en cada elemento del flujo; sin rutas estáticas a carpetas privadas.
2. **QGIS Modelador Gráfico (`modelo_priorizacion_Uxx.model3`):**
   - Flujo equivalente en la interfaz de modelado visual de QGIS LTR, exportable y ejecutable sobre cualquier otra unidad territorial.

### 3.3 Dossier Infográfico A3 de 2 Páginas (PDF 300 ppp)
Archivo único: `Dossier_Final_Uxx_Apellido_Nombre.pdf` de **exactamente dos páginas A3 horizontales ($420 \times 297\text{ mm}$)**. Queda prohibido el uso de informes en Microsoft Word o documentos multipágina tradicionales:

- **Página 1: Diagnóstico Territorial Multicriterio:**
  - *Mapa Principal (Macro/Micro):* Modelo Digital de Elevación sombreado (*Hillshade*), red hídrica, polígono focal y faja de retiro ($30 + D\text{ m}$) a escala fija redonda en `EPSG:9377`.
  - *Matriz Gráfica de Variables:* Mapa de pendientes clasificado por POT ($<15^\circ$, $15\text{--}30^\circ$, $>30^\circ$), mapa de anomalías espectrales Sentinel-2 (`NDVI` y `NDBI` con umbral $D$), y perfil longitudinal del cauce con cotas de cabecera y desembocadura.
  - *Tabla de Balance Diagnóstico:* Área total de microcuenca, área del polígono focal (ha), longitud del cauce (m), porcentaje de faja de retiro ocupada y área de coberturas críticas expuestas.
- **Página 2: Propuesta Sectorial de Intervención + Automatización:**
  - *Mapa Ejecutivo de Propuesta:* Cartografía de detalle ($1:1\,000$ o $1:2\,000$) con las intervenciones georreferenciadas según la disciplina del estudiante:
    - **Ruta Ingeniería Civil:** Obras de bioingeniería (fajinas, trinchos, gaviones), disipadores de energía, ampliación de sección hidráulica, drenajes pluviales y taludes estabilizados.
    - **Ruta Diseño Urbano:** Parque lineal de ronda, senderos permeables, corredores verdes de mitigación de calor, espacio público efectivo y borde de contención informal.
  - *Diagrama de Flujo del Modelo:* Captura legible del modelo automatizado en ModelBuilder (`.atbx`), indicando entradas, procesos y capas de salida generadas.
  - *Tabla Cuantitativa de Balance de Propuesta:* Longitud lineal de obras (m), volumen estimado (m³), hectáreas de espacio público o vegetación recuperada, y porcentaje de mitigación del riesgo en el polígono.
  - *Recuadro de Metadatos y Auditoría Crítica de IA (Tier O):* Fuentes oficiales, elipsoide GRS80, CRS EPSG:9377 y declaración de auditoría de herramientas de IA.

---

## 4. Logística del Pitch Ejecutivo Relámpago (Semana 16)

La sesión del **jueves 13 de mayo de 2027** se desarrollará en dos rondas rotativas en la sala de cómputo:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ 12:00 m. – 2:00 p.m. (120 min): RONDA 1 DE PITCH INDIVIDUAL           │
│ • Estudiantes U01 a U15: Sustentan individualmente ante el docente     │
│   (4 minutos de Pitch continuo + 3 minutos de interrogatorio técnico)  │
│ • Estudiantes U16 a U30: Asisten en sala como tribunal técnico         │
├────────────────────────────────────────────────────────────────────────┤
│ 2:00 p.m. – 2:20 p.m. (20 min): Pausa Activa y Almuerzo Ligero         │
├────────────────────────────────────────────────────────────────────────┤
│ 2:20 p.m. – 4:20 p.m. (120 min): RONDA 2 DE PITCH INDIVIDUAL           │
│ • Estudiantes U16 a U30: Sustentan individualmente ante el docente     │
│   (4 minutos de Pitch continuo + 3 minutos de interrogatorio técnico)  │
│ • Estudiantes U01 a U15: Asisten en sala como tribunal técnico         │
├────────────────────────────────────────────────────────────────────────┤
│ 4:20 p.m. – 4:30 p.m. (10 min): Conclusiones y Cierre Oficial 2027-1   │
└────────────────────────────────────────────────────────────────────────┘
```

### Protocolo Cronometrado de Sustentación Individual (7 minutos en total)
1. **Pitch Ejecutivo Continuo (4 minutos sin interrupciones):**
   - Proyección en pantalla del **Dossier Infográfico A3** (Páginas 1 y 2).
   - Prohibido el uso de diapositivas en PowerPoint o Canva; la exposición se realiza directamente sobre el PDF A3 y las capas activas del SIG.
   - Estructura recomendada: (a) Diagnóstico biofísico de la unidad y hallazgo crítico (1 min), (b) Funcionamiento del modelo automatizado en ModelBuilder (1 min), (c) Propuesta sectorial georreferenciada Civil o Urbana con balance en hectáreas (1.5 min), (d) Cierre y lección de auditoría territorial (0.5 min).
2. **Interrogatorio Técnico en Vivo del Docente (3 minutos):**
   - El estudiante pasa al entorno de software (QGIS o ArcGIS Pro) y responde dos preguntas operativas:
     - *"Abre tu modelo en ModelBuilder, cambia el parámetro de entrada de la faja de retiro a otro valor y ejecútalo para verificar si la salida se actualiza dinámicamente."*
     - *"Explica por qué seleccionaste esta técnica de bioingeniería o este diseño de parque lineal en este sector específico de pendiente mayor al 30 %."*

---

## 5. Auditoría Crítica de IA Generativa (`Tier O` — Abierto y Auditado)

En concordancia con el estándar de evaluación auténtica del curso:
- El uso de asistentes de IA generativa (ChatGPT, Claude, Gemini, Copilot) está **abierto y permitido** para apoyar la estructuración de scripts, consultas SQL, expresiones de álgebra ráster o ideas de intervención.
- **Criterio de Evaluación de Integridad:** La calificación no premia la mera generación de texto o código por IA, sino la **capacidad del estudiante para auditar críticamente sus resultados**.
- El Dossier A3 debe incluir en la Página 2 el recuadro de **Auditoría de IA**, respondiendo obligatoriamente:
  1. ¿Qué supuestos territoriales erróneos o alucinaciones espaciales produjo la IA al consultar sobre la quebrada asignada?
  2. ¿Qué parámetro o fórmula técnica tuvo que corregir el estudiante manualmente para que fuera consistente con el sistema `EPSG:9377` o con la normativa local del POT?

---

## 6. Rúbrica Criterial Analítica de 4 Niveles (TILT - Criteria)

| Criterio y Ponderación | Nivel 1 — Inicial (0.0 – 2.9) | Nivel 2 — Básico (3.0 – 3.7) | Nivel 3 — Competente (3.8 – 4.4) | Nivel 4 — Avanzado (4.5 – 5.0) |
|:---|:---|:---|:---|:---|
| **C1. Automatización Espacial (ModelBuilder / .model3)** *(25 %)* | No entrega modelos ejecutables, el archivo `.atbx` arroja errores fatales por rutas fijadas a discos personales, o el flujo carece de parámetros de usuario funcionales. | Entrega el modelo en ModelBuilder pero presenta procesos no conectados, carece de variables de usuario parametrizadas, o no entrega la versión equivalente en el Modelador de QGIS. | Construye y documenta un flujo de geoprocesamiento automatizado funcional en ModelBuilder (`.atbx`) y `.model3`, parametrizado con variables de usuario, ejecutable de extremo a extremo sin errores de rutas. | Cumple todos los indicadores del nivel Competente y además implementa iteradores (*Iterators*), precondiciones lógicas o validaciones de esquema que robustecen la ejecución ante cambios de datos. |
| **C2. Rigor Territorial Multicriterio (DEM + Sentinel-2)** *(25 %)* | Diagnóstico incompleto, índices espectrales invertidos, pendientes no reclasificadas según POT, o ausencia del perfil longitudinal del cauce principal. | Integra el DEM y las bandas Sentinel-2 con la semilla $D$, pero las estadísticas zonales no coinciden con la cartografía o el perfil de cauce carece de unidades métricas claras. | Modela de forma rigurosa en `EPSG:9377` el relieve sombreado, pendientes POT, índices NDVI y NDBI con umbral individual, perfil longitudinal con cotas y balance territorial coherente en hectáreas. | Cumple todos los indicadores del nivel Competente y formula una interpretación geomorfológica articulada, correlacionando la densidad de drenajes con la susceptibilidad a movimientos en masa. |
| **C3. Propuesta Sectorial (Civil o Urbana) y Dossier A3** *(25 %)* | Propuesta sin georreferenciación espacial (croquis conceptuales flotantes sin escala ni coordenadas), entrega informe en Word contra la norma, o dossier ilegible a baja resolución. | Diseña el Dossier A3 de 2 páginas y localiza intervenciones espaciales, pero omite el balance cuantitativo de obras o utiliza simbología sin jerarquía contrastada figura-fondo. | Compone el Dossier Infográfico A3 de 2 páginas a 300 ppp con los 8 elementos normalizados, localiza intervenciones georreferenciadas a escala de detalle con su balance métrico (m, m³, ha) y recuadro de auditoría de IA. | Cumple todos los indicadores del nivel Competente y formula una propuesta interdisciplinaria de estándar profesional con detalle constructivo y justificación física de cada estructura planteada. |
| **C4. Pitch Ejecutivo Relámpago y Auditoría en Vivo** *(25 %)* | Excede el tiempo límite de 4 minutos, utiliza diapositivas de texto en vez del dossier y del SIG, no responde a las preguntas operativas del software o desconoce el funcionamiento de su modelo. | Expone la propuesta leyendo textos del dossier, opera con lentitud en el SIG durante las preguntas o no logra explicar la auditoría crítica realizada sobre las sugerencias de la IA. | Defiende su consultoría con solvencia técnica en 4 minutos exactos directamente sobre el Dossier A3, opera en vivo QGIS y ArcGIS Pro para responder preguntas y demuestra auditoría crítica de IA. | Cumple todos los indicadores del nivel Competente y además responde con solvencia técnica cuantitativa imprevistos de cambio de parámetros formulados por el docente en tiempo real. |

---

## 7. Notas de Calibración para Casos Límite (*Borderline Decisions*)

- **Decisión entre Nivel 2 (Básico) y Nivel 3 (Competente):**
  - Si el estudiante construyó un modelo visualmente amplio en ModelBuilder pero al presionar *"Run"* en la sustentación este falla por una ruta estática rota a su computador personal, la calificación del criterio C1 se fija en **Nivel 2 (3.3)**.
  - Para situarse en **Nivel 3 (Competente)**, es mandatorio que el modelo ejecute limpio en la estación de la sala y que el Dossier A3 esté exportado exactamente en dos páginas a 300 ppp.
- **Decisión entre Nivel 3 (Competente) y Nivel 4 (Avanzado):**
  - Para obtener **Nivel 4 (Avanzado)**, la propuesta de intervención no puede ser un ejercicio genérico: cada obra de ingeniería (gavión, azud, canal) o elemento urbano (parque lineal, bioinfiltración) debe tener cotas, dimensiones métricas justificadas en el perfil topográfico y costos o volúmenes aproximados verificables.
