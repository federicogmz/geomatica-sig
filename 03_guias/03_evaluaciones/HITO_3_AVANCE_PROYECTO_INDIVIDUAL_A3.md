# Hito 3: Avance Individual del Proyecto — Línea Base Vectorial (.gpkg + .gdb), Lámina A3 y Auditoría de Estación en Vivo

> **Curso:** Geomática, Ingeniería y SIG (`GEOMATICA-SIG-EAFIT`)  
> **Semestre:** 2027-1 · Universidad EAFIT  
> **Semana de Aplicación:** Semana 9 (`S09`) · Jueves 18 de marzo de 2027  
> **Horario:** 12:00 m. – 4:30 p.m. (Sesión completa de 4.5 h en sala de cómputo)  
> **Ponderación:** 20.0 % de la calificación definitiva del curso  
> **Modalidad:** 100 % Individual sobre la Unidad Territorial Asignada ($U_{01}\text{ a }U_{30}$)  
> **Política de Inteligencia Artificial:** **`Tier D` (Permitido con Declaración Obligatoria / *Disclosure*)**  
> **Resultados de Aprendizaje Evaluados:** `RAA1` (Relacional), `RAA2` (Relacional), `RAA4` (Abstracto Extendido)  
> **Contenidos Integrados:** Semanas `S01` a `S08` (Geodesia, bases espaciales, topología, geoprocesamiento y cartografía A3)

---

## 1. Propósito y Sentido Formativo (TILT - Purpose)

El **Hito 3** representa la primera entrega formal e integradora del **Proyecto Territorial Individual**. Su propósito es consolidar y auditar la **Línea Base Vectorial** de la unidad territorial que cada estudiante tiene asignada en el Valle de Aburrá ($U_{01}\text{ a }U_{30}$), demostrando solvencia operativa y rigor geodésico en ambos ecosistemas de software (QGIS LTR y ArcGIS Pro).

En el ejercicio profesional, un consultor territorial no se limita a entregar planos impresos: debe sustentar en tiempo real la confiabilidad de sus bases de datos ante comités técnicos, clientes y autoridades ambientales. Por ello, este hito combina la entrega digital de contenedores espaciales normalizados y una **Lámina Cartográfica A3** con una **Auditoría de Estación SIG en Vivo**, donde cada estudiante opera y defiende directamente su proyecto ante el docente y sus pares.

---

## 2. Entregables Oficiales y Especificaciones Técnicas (TILT - Task)

Cada estudiante debe preparar y someter antes de las 11:59 a.m. del jueves 18 de marzo de 2027 un único archivo comprimido: `Hito3_Uxx_Apellido_Nombre.zip` (donde `Uxx` es el código de su unidad asignada: p. ej. `U05`).

### 2.1 Contenedor GeoPackage Abierto (`.gpkg`) en QGIS LTR
- Nombre de archivo: `linea_base_Uxx_9377.gpkg`.
- Sistema de Coordenadas: **MAGNA-SIRGAS 2018 / Origen-Nacional CTM12 (`EPSG:9377`)**.
- Capas vectoriales indispensables:
  1. `poligono_focal_Uxx`: Polígono delimitado del tramo asignado ($15\text{ a }30\text{ ha}$), con topología validada (0 huecos y 0 solapes internos).
  2. `red_hidrica_Uxx`: Ejes de cauces jerarquizados con longitud métrica oficial en el campo `longitud_m`.
  3. `faja_retiro_hidrico_d`: Polígono de retiro normativo continuo (*Buffer* disuelto) calculado con la semilla individual:
     $$R = 30 + D\text{ metros}$$
     *(donde $D$ es el último dígito del documento de identidad del estudiante).*
  4. `predios_afectados_retiro`: Polígonos de predios catastrales intersectados por la faja de retiro, con campos actualizados de `area_afect_m2`, `area_afect_ha` y `pct_afectacion`.
  5. `infraestructura_vial_Uxx`: Trazado vial de soporte clasificado por tipología.
- Proyecto de visualización: `proyecto_Uxx_qgis.qgz` configurado con **rutas relativas estrictas**.

### 2.2 Contenedor File Geodatabase Corporativo (`.gdb`) en ArcGIS Pro
- Nombre de carpeta: `Geodatabase_Uxx_Corporativa.gdb`.
- **Feature Dataset:** denominado `Línea_Base_Territorial` configurado en `EPSG:9377`.
- Contiene réplica exacta de las capas del GeoPackage pero incorporando:
  - **Dominio Codificado de Valores (*Coded Value Domain*):** denominado `Dom_AfectacionPredial` aplicado al campo `estado_predio` (Valores: `1 = Afectación Leve <20%`, `2 = Afectación Moderada 20-50%`, `3 = Afectación Crítica >50%`).
  - **Subtipos (opcional recomendado):** para categorización de predios rurales vs urbanos.
- Proyecto de visualización: `Proyecto_Uxx_ArcGIS.aprx` configurado con **rutas relativas**.

### 2.3 Lámina Cartográfica A3 Horizontal (PDF Vectorial a 300 ppp)
- Nombre de archivo: `Lamina_A3_Uxx_Apellido_Nombre.pdf`.
- Dimensiones: Formato **A3 Horizontal ($420 \times 297\text{ mm}$)**.
- Resolución de exportación: **300 ppp (vectorial)**.
- Contenido cartográfico y los **8 elementos anatómicos indispensables**:
  1. Título formal con número de hito, nombre de la cuenca, tramo funcional y código de unidad territorial.
  2. Mapa principal a escala fija redonda ($1:2\,000$, $1:2\,500$ o $1:5\,000$) destacando el polígono focal, fajas de retiro $30+D$, predios afectados y red vial.
  3. Cuadrícula métrica proyectada en `EPSG:9377` con etiquetas en Este y Norte en el margen exterior.
  4. Escala numérica oficial y escala gráfica en metros.
  5. Flecha de norte orientada a la cuadrícula.
  6. Leyenda temática ordenada con jerarquía visual figura-fondo (sin códigos ni nombres crudos de archivo).
  7. Recuadro de localización regional en el Valle de Aburrá.
  8. Bloque técnico de metadatos, tabla de balance territorial (área del polígono focal en ha, área de retiro en ha, predios intervenidos) y **Declaración de Integridad de IA (Tier D)**.

---

## 3. Logística de la Auditoría de Estación SIG en Vivo (Sesión S09)

La sesión del 18 de marzo de 2027 se organiza en dos rondas rotativas en la sala de cómputo para garantizar evaluación individual rigurosa y retroalimentación formativa entre pares:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ 12:00 m. – 1:50 p.m. (110 min): RONDA A DE AUDITORÍA                  │
│ • Estudiantes U01 a U15: Abren proyecto en pantalla y defienden       │
│   individualmente ante el docente (interrogatorio técnico de 3 a 4 min)│
│ • Estudiantes U16 a U30: Aplican Ficha de Revisión por Pares en sitio  │
├────────────────────────────────────────────────────────────────────────┤
│ 1:50 p.m. – 2:10 p.m. (20 min): Pausa Activa y Almuerzo Ligero         │
├────────────────────────────────────────────────────────────────────────┤
│ 2:10 p.m. – 4:00 p.m. (110 min): RONDA B DE AUDITORÍA                  │
│ • Estudiantes U16 a U30: Abren proyecto en pantalla y defienden       │
│   individualmente ante el docente (interrogatorio técnico de 3 a 4 min)│
│ • Estudiantes U01 a U15: Aplican Ficha de Revisión por Pares en sitio  │
├────────────────────────────────────────────────────────────────────────┤
│ 4:00 p.m. – 4:30 p.m. (30 min): Síntesis Docente y Entrega de Fichas   │
└────────────────────────────────────────────────────────────────────────┘
```

### Protocolo de Interrogatorio Individual del Docente (3 a 4 min por estudiante)
El docente se acercará a la estación del estudiante y formulará 2 preguntas técnicas directas que deben responderse **operando el software en pantalla**:
1. *"Muéstrame las propiedades del CRS de esta capa y demuéstrame que no está simplemente reetiquetada sino proyectada en CTM12."*
2. *"Abre la tabla de atributos de los predios afectados, selecciona los predios con afectación mayor al 30 % mediante una consulta SQL o por expresión y enséñame cómo se refleja en el mapa."*
3. *"Si cambiamos la semilla $D$ de tu documento a $D+3$, ¿cuál herramienta ejecutarías para rehacer la faja disuelta sin generar polígonos astilla?"*
4. *"Ejecuta en vivo el Comprobador de topología para verificar que tu polígono focal tiene cero huecos."*

---

## 4. Ficha de Revisión Estructurada entre Pares (*Peer Review Sheet*)

Cada estudiante evaluará a un compañero asignado diligenciando la siguiente matriz técnica impresa o digital entregada en sala:

```text
EVALUADOR: ___________________________ | EVALUADO (Unidad): ____________________
1. Rigor Geodésico: ¿El proyecto abre en EPSG:9377 sin advertencias de transformación al vuelo?
   [ ] SÍ (Verificado en Propiedades de Capa)     [ ] NO (Presenta capas en EPSG:4326 o Bogotá)
2. Integridad de Rutas: ¿El proyecto abrió inmediatamente sin ventana de «Capas no disponibles»?
   [ ] SÍ (Rutas relativas verificadas)           [ ] NO (Rutas absolutas rotas)
3. Parámetro D: ¿La faja de retiro mide exactamente 30 + D metros según el documento del autor?
   [ ] SÍ (Medido con regla digital: ______ m)    [ ] NO (Medida incorrecta o no disuelta)
4. Saneamiento Topológico: ¿El polígono focal presenta solapes visibles o errores de snapping?
   [ ] SÍ (Presenta defectos visibles)            [ ] NO (Linderos limpios y ensamblados)
5. Lámina A3: ¿La lámina PDF cuenta con los 8 elementos anatómicos y escala redonda legible?
   [ ] SÍ (Completa y nítida a 300 ppp)           [ ] NO (Incompleta o con textos ilegibles)
OBSERVACIÓN TÉCNICA PRINCIPAL PARA MEJORAR HACIA EL HITO 5:
__________________________________________________________________________________________
```

---

## 5. Declaración de Uso de Inteligencia Artificial (`Tier D`)

El estudiante debe incluir en el cajetín de la lámina A3 y en el archivo `declaracion_ia.txt` el siguiente formulario diligenciado:

```text
DECLARACIÓN DE INTEGRIDAD EN EL USO DE IA (TIER D)
1. Herramienta(s) de IA utilizada(s): [Ninguna / ChatGPT / Claude / Gemini / Copilot / Otra: ________]
2. Tarea específica en la que apoyó: [Sintaxis de expresiones SQL / Redacción de metadatos / Estructuración de tablas / Otra: ________]
3. Error, alucinación o inconsistencia detectada en la respuesta de la IA:
   [Describir puntualmente qué sugirió la IA que era geodésica o espacialmente incorrecto y cómo lo corrigió manualmente el estudiante].
```

---

## 6. Rúbrica Criterial Analítica de 4 Niveles (TILT - Criteria)

| Criterio y Ponderación | Nivel 1 — Inicial (0.0 – 2.9) | Nivel 2 — Básico (3.0 – 3.7) | Nivel 3 — Competente (3.8 – 4.4) | Nivel 4 — Avanzado (4.5 – 5.0) |
|:---|:---|:---|:---|:---|
| **C1. Rigor Geodésico y Estructuración Dual (.gpkg / .gdb)** *(25 %)* | Mezcla capas en grados decimales con capas planas, carece de Feature Dataset en ArcGIS Pro o entrega proyectos con rutas absolutas rotas que no cargan los datos. | Homologa a `EPSG:9377` y entrega `.gpkg` y `.gdb` funcionales con rutas relativas, pero omite la configuración del dominio codificado de afectación predial o conserva nombres de capas desorganizados. | Entrega ambos contenedores (`.gpkg` y `.gdb`) rigurosamente estructurados en `EPSG:9377`, con Feature Dataset, dominio de afectación activo y operativo, y cero rutas rotas al descomprimir en máquina externa. | Cumple todos los indicadores del nivel Competente y además implementa subtipos de uso predial y documenta metadatos ISO 19115 completos dentro de los ítems de la Geodatabase. |
| **C2. Topología y Geoprocesamiento del Polígono Focal** *(25 %)* | El polígono focal de $15\text{ a }30\text{ ha}$ contiene huecos o solapes catastrales, la faja no aplica la semilla $D$, o no calcula las áreas de afectación predial. | Sanea los defectos topológicos gruesos y aplica el buffer con el parámetro $D$, pero conserva polígonos astilla residuales o campos de área en metros cuadrados sin conversión a hectáreas. | Polígono focal con 0 errores en Comprobador de topología, faja continua disuelta ($30 + D\text{ m}$), e intersección predial con atributos de área en m², hectáreas y porcentaje calculados con precisión decimal. | Cumple todos los indicadores del nivel Competente y formula un análisis comparativo de la distribución espacial de la afectación diferenciando tipologías catastrales en la unidad. |
| **C3. Calidad Cartográfica de la Lámina A3** *(25 %)* | La lámina carece de cuadrícula métrica, omite la leyenda o escala, emplea tipografías no legibles sobre ortofoto, o se exporta en resolución inadecuada ($<300\text{ ppp}$). | Incluye los elementos cartográficos básicos en formato A3, pero presenta superposición de etiquetas sobre cauces, escala no estandarizada o leyenda con nombres crudos de software. | Compone una lámina A3 horizontal a 300 ppp con los 8 elementos anatómicos, escala fija redonda de ingeniería, cuadrícula métrica EPSG:9377, jerarquía visual contrastada y tabla de balance territorial. | Cumple todos los indicadores del nivel Competente y además incluye un perfil transversal esquemático del cauce con la faja de retiro y una composición gráfica de estándar editorial para consultoría. |
| **C4. Auditoría de Estación en Vivo y Coevaluación** *(25 %)* | Durante el interrogatorio en vivo no logra operar las capas en pantalla, desconoce los geoprocesos ejecutados en su proyecto o no participa en la revisión por pares. | Responde parcialmente las preguntas operando con dificultad en el software, o diligencia la ficha de revisión entre pares sin justificación técnica de las observaciones. | Opera con fluidez su estación en vivo, ejecuta en tiempo real consultas espaciales sobre sus datos, justifica sus parámetros ante el docente y completa con rigor la revisión por pares. | Cumple todos los indicadores del nivel Competente y además explica las implicaciones de ingeniería o diseño urbano de los resultados observados, proponiendo alternativas ante eventuales cambios normativos. |

---

## 7. Notas de Calibración para Casos Límite (*Borderline Decisions*)

- **Decisión entre Nivel 2 (Básico) y Nivel 3 (Competente):**
  - Si el estudiante entregó una lámina A3 visualmente atractiva pero durante la auditoría en vivo se evidencia que el proyecto tiene rutas absolutas rotas o el estudiante no sabe ejecutar la consulta de selección por expresión requerida, la calificación se limita al **Nivel 2 (3.6)**.
  - Para situarse en **Nivel 3 (Competente)**, es mandatorio que el estudiante opere con autonomía técnica directa su propio proyecto en la sala.
- **Decisión entre Nivel 3 (Competente) y Nivel 4 (Avanzado):**
  - Para alcanzar el **Nivel 4 (Avanzado)**, la entrega debe articular la dimensión espacial con el criterio territorial: el estudiante debe demostrar no solo que el geoproceso funcionó, sino cuál es la repercusión geotécnica, hidráulica o urbanística de la faja de afectación calculada.
