# Hito 2: Evaluación Práctica Integradora 1 — Topología, Geoprocesamiento Vectorial y Salida A3

> **Curso:** Geomática, Ingeniería y SIG (`GEOMATICA-SIG-EAFIT`)  
> **Semestre:** 2027-1 · Universidad EAFIT  
> **Semana de Aplicación:** Semana 8 (`S08`) · Jueves 11 de marzo de 2027  
> **Horario:** 12:00 m. – 2:30 p.m. (150 minutos en sala de cómputo)  
> **Ponderación:** 20.0 % de la calificación definitiva del curso  
> **Modalidad:** Individual en PC (Sala de Cómputo EAFIT)  
> **Política de Inteligencia Artificial:** **`Tier P` (Prohibido / Supervisado en Sala)**  
> **Resultados de Aprendizaje Evaluados:** `RAA1` (Relacional), `RAA2` (Relacional)  
> **Contenidos Integrados:** Semanas `S05` a `S07` (Guías `G05`, `G06`, `G07`)

---

## 1. Propósito y Sentido Formativo (TILT - Purpose)

El análisis de riesgos por inundación, la delimitación de fajas de protección ambiental y la afectación predial por obras públicas exigen un modelado vectorial riguroso. Un modelo espacial con errores topológicos (solapes, huecos, polígonos astilla o líneas no ensambladas) conduce a sobrecostos catastrales, duplicidad de áreas o fallos jurídicos en expropiaciones y licencias ambientales.

Esta evaluación práctica integradora evalúa la capacidad del estudiante para:
1. Auditar y sanear inconsistencias topológicas mediante el **Comprobador de topología (*Topology Checker*)** en QGIS LTR y **Geodatabase Topology** en ArcGIS Pro.
2. Ejecutar cadenas de geoprocesamiento vectorial (*Buffer* disuelto, *Clip*, *Intersect*, *Dissolve*) parametrizadas con su **semilla individual $D$**.
3. Cuantificar métricas territoriales exactas en el sistema oficial **MAGNA-SIRGAS Origen Nacional CTM12 (`EPSG:9377`)**.
4. Diseñar y exportar una salida cartográfica ejecutiva en **formato A3 horizontal (PDF vectorial a 300 ppp)** que cumpla con los ocho estándares anatómicos de comunicación cartográfica.

---

## 2. Condiciones de Partida y Semilla Individual (TILT - Task)

### 2.1 Datos de Entrada
Se suministrará al inicio de la sesión el archivo `insumos_hito2.zip` para extracción en `C:\Temp\H2_Nombre_Apellido\`:
- `predios_catastrales_raw.gpkg`: Malla predial urbana con defectos topológicos inducidos (polígonos superpuestos, huecos entre manzanas y geometrías astilla).
- `eje_cauce_principal.gpkg`: Trazo lineal de la corriente principal en `EPSG:9377`.
- `zonas_amenaza_inundacion.gpkg`: Polígonos de amenaza por inundación clasificados por severidad (Alta, Media, Baja).
- `infraestructura_vial.gpkg`: Ejes viales con atributos de jerarquía.

### 2.2 Semilla Individual $D$
Cada estudiante debe parametrizar sus operaciones de geoprocesamiento utilizando el último dígito de su documento de identidad ($D \in \{0, 1, 2, \dots, 9\}$):
- **Radio de Retiro Hídrico Normativo ($R$):**
  $$R = 30 + D\text{ metros}$$
  *(Ejemplo: si el documento termina en 7, el retiro normativo es $R = 30 + 7 = 37\text{ m}$ a cada lado del eje del cauce).*
- **Tolerancia de Auto-ensamblado (*Snapping*):**
  $$\text{Tolerancia} = 1.0 + 0.1 \times D\text{ metros}$$
- El uso de un parámetro $D$ distinto al asignado invalida los cálculos cuantitativos de la prueba.

### 2.3 Política de IA Generativa: `Tier P` (Prohibido / Supervisado)
- Prohibido el uso de asistentes de IA generativa, comunicación externa o navegación web fuera de los geoservicios oficiales del Valle de Aburrá (GeoMedellín, AMVA, IDEAM).
- El examen evalúa la destreza diagnóstica, operativa y de control de calidad autónoma en el entorno de la sala de cómputo.

---

## 3. Especificaciones de la Tarea Técnica (150 minutos)

### Módulo 1: Auditoría y Saneamiento Topológico (40 min)
1. Cargar la capa `predios_catastrales_raw` en QGIS LTR y configurar el **Comprobador de topología** con las siguientes reglas obligatorias:
   - *No debe tener superposiciones (no solaparse)*.
   - *No debe tener huecos (dentro del perímetro de manzana)*.
   - *No debe tener geometrías duplicadas o nulas*.
2. Corregir manualmente mediante las herramientas de edición avanzada y vértices:
   - Eliminar solapes mediante corte de polígonos o unión de geometrías coincidentes.
   - Cerrar huecos entre linderos respetando la geometría catastral colindante.
   - Eliminar polígonos astilla (*slivers*) con área menor a $5\text{ m}^2$ fusionándolos con el predio vecino de mayor longitud compartida.
3. Exportar la capa resultante al archivo `hito2_vectorial.gpkg` con el nombre `predios_saneados_9377`. El reporte del Comprobador de topología debe registrar **0 errores**.

### Módulo 2: Geoprocesamiento Vectorial Parametrizado (50 min)
1. **Retiro Hídrico Individualizado:**
   - Aplicar la herramienta *Buffer* sobre `eje_cauce_principal` con distancia $R = 30 + D\text{ metros}$.
   - Activar la opción de **disolución de resultados (*Dissolve*)** para obtener un polígono continuo sin particiones internas.
   - Guardar como `faja_retiro_hidrico_d` en `hito2_vectorial.gpkg`.
2. **Intersección y Afectación Predial:**
   - Ejecutar la herramienta *Intersección (*Intersect*)* entre `predios_saneados_9377` y `faja_retiro_hidrico_d`.
   - Guardar la capa resultante como `afectacion_predial_faja`.
3. **Recálculo Métrico en CTM12:**
   - En la tabla de atributos de `afectacion_predial_faja`, crear los siguientes campos numéricos:
     - `area_afect_m2`: Real doble (`Double`), calculada con `$area` (en metros cuadrados con 2 decimales).
     - `area_afect_ha`: Real doble (`Double`), calculada con `$area / 10000` (en hectáreas con 4 decimales).
     - `pct_afectacion`: Real doble (`Double`), calculada como `(area_afect_m2 / area_original_m2) * 100`.
4. **Agregación Espacial con Dissolve:**
   - Disolver la capa `afectacion_predial_faja` por el campo `uso_del_suelo` (Residencial, Comercial, Institucional, Industrial, Protección) sumando las áreas afectadas por tipología.
   - Guardar como `resumen_afectacion_uso`.

### Módulo 3: Composición Cartográfica A3 Horizontal (60 min)
1. Abrir el Diseñador de Impresiones de QGIS (o Layout de ArcGIS Pro) y configurar una página **A3 Horizontal ($420 \times 297\text{ mm}$)**.
2. Incorporar de forma obligatoria los **8 elementos anatómicos indispensables**:
   - **Título Técnico Formal:** Indicando número de evaluación, temática (Afectación Predial por Retiro Hídrico), parámetro $D$ aplicado y sistema de referencia (`EPSG:9377`).
   - **Mapa Principal:** A escala fija redonda de ingeniería ($1:2\,000$, $1:2\,500$ o $1:5\,000$). Debe mostrar predios base, faja de retiro ($R$), polígonos de afectación destacados y red vial de contexto.
   - **Cuadrícula de Coordenadas Métricas:** Espaciado regular en metros (intervalo de 100 m o 200 m) con etiquetas numéricas en Este y Norte en el margen exterior.
   - **Escala Numérica y Gráfica:** Escala numérica estandarizada y barra gráfica con unidades en metros.
   - **Flecha de Norte:** Orientada al norte de cuadrícula, sin tapar elementos del mapa.
   - **Leyenda Temática Categorizada:** Símbolos diferenciados con jerarquía figura-fondo, sin nombres de capa crudos con guiones bajos (p. ej. usar *"Predios Afectados"* en vez de `pred_afect_final_clip`).
   - **Mapa de Localización General:** Ventana de contexto a escala reducida situando el área de estudio en el Valle de Aburrá.
   - **Cajetín de Metadatos y Tabla Cuantitativa:** Autor, programa académico, fecha, sistema `EPSG:9377`, fuentes de datos, y tabla resumen con el área total afectada en hectáreas desglosada por uso del suelo.
3. Exportar el producto a archivo **PDF vectorial único a 300 ppp**: `Lamina_Hito2_Apellido_Nombre.pdf`.

---

## 4. Estructura Obligatoria de Entrega

El archivo comprimido `Hito2_Apellido_Nombre.zip` debe contener:

```text
Hito2_Apellido_Nombre/
├── Lamina_Hito2_Apellido_Nombre.pdf   # Lámina cartográfica A3 vectorial a 300 ppp
├── hito2_qgis.qgz                     # Proyecto QGIS con rutas relativas
├── hito2_vectorial.gpkg               # GeoPackage con las capas saneadas y geoprocesadas
└── balance_afectacion.csv             # Exportación de la tabla de afectación por uso del suelo
```

---

## 5. Rúbrica Criterial Analítica de 4 Niveles (TILT - Criteria)

| Criterio y Ponderación | Nivel 1 — Inicial (0.0 – 2.9) | Nivel 2 — Básico (3.0 – 3.7) | Nivel 3 — Competente (3.8 – 4.4) | Nivel 4 — Avanzado (4.5 – 5.0) |
|:---|:---|:---|:---|:---|
| **C1. Saneamiento Topológico del Modelo Vectorial** *(30 %)* | La capa entregada conserva solapes, huecos o geometrías astilla que generan errores en el Comprobador de topología, o elimina predios legítimos durante la edición. | Corrige los solapes y huecos principales, pero persisten polígonos astilla residuales o nodos desconectados que alteran el perímetro de las manzanas. | Entrega la capa `predios_saneados_9377` con 0 errores reportados en el Comprobador de topología, linderos coincidentes con snapping y geometrías astilla fusionadas al predio correspondiente. | Cumple todos los indicadores del nivel Competente y además implementa la validación de reglas en Geodatabase Topology de ArcGIS Pro, documentando el registro de excepciones legítimas. |
| **C2. Geoprocesamiento y Parametrización con Semilla D** *(30 %)* | Aplica un radio de buffer diferente al determinado por la fórmula $R = 30 + D\text{ m}$, omite la disolución de anillos internos o ejecuta intersecciones que truncan las geometrías sin asociar atributos. | Ejecuta el buffer disuelto e intersecta con el parámetro $D$ correcto, pero conserva campos de área anteriores al recorte o presenta errores de sintaxis en la expresión del porcentaje de afectación. | Aplica con exactitud $R = 30 + D\text{ m}$ con buffer disuelto, ejecuta la intersección predial, disuelve por uso del suelo y recalcula `$area` en metros cuadrados y hectáreas con su precisión decimal respectiva. | Cumple todos los indicadores del nivel Competente y además estructura un análisis de sensibilidad comparando cuantitativamente la afectación predial entre el retiro normativo estándar (30 m) y el retiro parametrizado ($30 + D\text{ m}$). |
| **C3. Composición Cartográfica A3 y Jerarquía Visual** *(30 %)* | La lámina carece de cuadrícula métrica, escala o flecha de norte; emplea textos ilegibles o nombres crudos de archivo en la leyenda; o exporta en formato de imagen de baja resolución ($<150\text{ ppp}$). | Integra los 8 elementos cartográficos en formato A3, pero presenta superposición de textos con la información espacial, escala no redonda (p. ej. $1:3\,247$) o colores sin contraste entre figura y fondo. | Compone la lámina A3 a 300 ppp con los 8 elementos normalizados, escala fija redonda de ingeniería ($1:2\,000$ o $1:5\,000$), cuadrícula EPSG:9377 con coordenadas legibles, leyenda limpia y tabla resumen de áreas. | Cumple todos los indicadores del nivel Competente y además aplica las variables visuales de Bertin con paleta cromática perceptualmente uniforme accesible para daltonismo y jerarquía tipográfica rigurosa. |
| **C4. Integridad del Repositorio y Rutas Relativas** *(10 %)* | El archivo `.qgz` solicita capas faltantes al descomprimirse en otra máquina, o entrega archivos distribuidos en carpetas no referenciadas con rutas absolutas. | El proyecto abre en rutas externas pero incluye capas auxiliares de memoria temporal (*scratch layers*) no guardadas en el GeoPackage. | El proyecto abre limpio en cualquier unidad de almacenamiento mediante rutas relativas estrictas, y contiene el archivo `balance_afectacion.csv` correctamente exportado. | Cumple todos los indicadores del nivel Competente y entrega el repositorio organizado con metadatos descriptivos en cada capa del GeoPackage. |

---

## 6. Notas de Calibración para Casos Límite (*Borderline Decisions*)

- **Decisión entre Nivel 2 (Básico) y Nivel 3 (Competente):**
  - Si el estudiante ejecutó el geoprocesamiento con el parámetro $D$ correcto pero el Comprobador de topología detecta 3 o más solapes residuales entre predios, la calificación del criterio topológico se fija en **Nivel 2 (3.4)**.
  - Para situarse en **Nivel 3 (Competente)**, es mandatorio que el reporte del Comprobador de topología certifique **0 errores** y que los campos de área correspondan al polígono recortado y no a la geometría previa.
- **Decisión entre Nivel 3 (Competente) y Nivel 4 (Avanzado):**
  - Para obtener **Nivel 4 (Avanzado)** en cartografía, la lámina no solo debe tener los 8 elementos anatómicos, sino demostrar control estético y técnico: ausencia de cortes en etiquetas de cuadrícula, paleta de colores normalizada y análisis cuantitativo de sensibilidad territorial explícito.

---

## 7. Retroalimentación Inmediata y Articulación con Hito 3

- Al finalizar la sesión, el docente revisará en pantalla la lista de chequeo básica de cada estudiante.
- No se asignan tareas adicionales para el hogar en esta Semana 8 con el fin de proteger las **4.5 horas semanales de trabajo autónomo** que los estudiantes deben destinar a la consolidación de su **Hito 3 (Avance del Proyecto Individual en Lámina A3)** para la Semana 9.
