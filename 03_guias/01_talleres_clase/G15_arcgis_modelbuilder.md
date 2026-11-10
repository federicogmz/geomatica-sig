# G15: Automatización Visual de Geoprocesos — ModelBuilder en ArcGIS Pro y Diseñador Gráfico de Modelos en QGIS

**Sesión del Jueves 29 de octubre (Semana 15) · Parte B: Automatización de Flujos Espaciales y Aplicación del Quiz 4 (8% — GNSS en Gabinete).**  
En la segunda parte de esta sesión aprenderemos a automatizar cadenas de geoprocesamiento mediante grafos acíclicos dirigidos (DAG) que encadenan `Buffer (30 m)` $\rightarrow$ `Intersect` $\rightarrow$ `Calculate Field` con parámetros dinámicos (`P`). Revisaremos tanto **ModelBuilder en ArcGIS Pro (`.atbx`)** como su **equivalencia directa en el Diseñador Gráfico de Modelos de QGIS (`.model3`)**, competencia clave que será evaluada en el **Parcial Práctico 2 (`P2` — 15%, 90 min en QGIS)** y aplicable en el **Informe Final (`IF`)**. En el Bloque 2 de la sesión se aplicará el **Quiz 4 (8%, 45 min)** sobre posicionamiento GNSS en gabinete y control de calidad por `HDOP` (`S11/G11`).

---

## 1. ¿Por Qué Automatizar un Flujo de Geoprocesamiento?

En un proyecto real de ingeniería civil, hidrología o urbanismo sobre la Cuenca de La Iguaná, las preguntas territoriales se repiten ante distintos escenarios: *¿Qué pasa si el retiro normativo pasa de $30\text{ m}$ a $50\text{ m}$ en los tramos torrenciales? ¿Cómo cambia el área predial afectada si se actualiza el catastro o se aplica el modelo a la quebrada vecina?*

Ejecutar cada paso a mano es lento, no deja trazabilidad y multiplica el riesgo de olvidar el sistema de coordenadas (`EPSG:9377`). Un **modelo gráfico automatizado** permite:
1. Encadenar herramientas donde la salida de un nodo alimenta automáticamente la entrada del siguiente.
2. Exponer **parámetros dinámicos (`P`)** para que cualquier usuario cambie las capas o distancias y reejecute todo el flujo en un clic.
3. Entregar un flujo auditable y reproducible dentro del paquete técnico de consultoría (`IF`).

| Elemento del Grafo | En **ArcGIS Pro — ModelBuilder** | En **QGIS — Diseñador Gráfico de Modelos** |
|---|---|---|
| **Archivo del modelo** | Guardado dentro de una caja `.atbx` (exportable a `.py` ArcPy) | Archivo independiente **`.model3`** (exportable a `.py` PyQGIS) |
| **Entradas / Parámetros (`P`)** | Óvalos **Azules** con bandera **`P`** (*Model Parameter*) | Cajas de **Entrada** (*Inputs*: Capa vectorial, Número/Distancia) |
| **Herramientas / Algoritmos** | Rectángulos **Amarillos** (*Tools*) | Cajas **Blancas/Grises** con ícono de engranaje (*Algorithms*) |
| **Salidas generadas** | Óvalos **Verdes** (*Derived / Output Data*) | Cajas de **Resultado final** asociadas al último algoritmo |

---

## 2. Ruta A: Construcción del Modelo en ArcGIS Pro (ModelBuilder)

Diseñaremos un flujo automatizado que genera la faja de retiro hídrico ($30\text{ m}$ por defecto), la intersecta con las manzanas/predios de La Iguaná y calcula automáticamente el área afectada en hectáreas (`area_afectada_ha`).

### Paso 2.1: Inicializar el Lienzo de ModelBuilder
1. En su proyecto `proyecto_iguana_arcgis.aprx`, vayan a la pestaña **Analysis** y hagan clic en **ModelBuilder**.
2. En **Model Properties**, asignen:
   - **Name:** `ModeloRetiroIguana`
   - **Label:** `Modelo Automatizado de Afectación por Retiro Hídrico (EPSG:9377)`
   - Hagan clic en **OK**.

### Paso 2.2: Encadenar `Buffer (30 m)` $\rightarrow$ `Intersect` $\rightarrow$ `Calculate Field`
1. **Datos de Entrada (Óvalos Azules):** Arrastren desde el *Catalog Pane* las capas `red_hidrica` y `manzanas_iguana` al lienzo.
2. **Nodo 1 — Buffer (`30 m`):**
   - Arrastren la herramienta **Buffer (Analysis Tools)** al lienzo y conéctenla desde `red_hidrica` (*Input Features*).
   - Doble clic en **Buffer**:
     - **Distance:** `30` `Meters`.
     - **Dissolve Type:** `Dissolve all output features into a single feature` (evita duplicar áreas donde se cruzan tributarios).
3. **Nodo 2 — Intersect (Intersección espacial):**
   - Arrastren **Intersect (Analysis Tools)** y conecten como entradas tanto el óvalo verde `red_hidrica_Buffer` como el óvalo azul `manzanas_iguana`.
   - Nombren la salida como `manzanas_afectadas_retiro`.
4. **Nodo 3 — Calculate Field (Cálculo de área en hectáreas):**
   - Arrastren **Calculate Field (Data Management Tools)** y conéctenlo a la salida de *Intersect*.
   - Configuren:
     - **Field Name:** `area_afectada_ha` | **Field Type:** `Double`
     - **Expression (Python 3):** `!shape.area! / 10000`

### Paso 2.3: Parametrizar con Bandera `P`, Validar y Exportar
1. Hagan clic derecho sobre `red_hidrica`, `manzanas_iguana`, el valor de distancia del `Buffer` y la salida final `manzanas_afectadas_retiro`, activando en cada uno la opción **Parameter** (aparecerá la letra **`P`**).
2. En la cinta de ModelBuilder pulsen **Validate**, luego **Auto Layout**, **Save** y **Run**.
3. *(Opcional)* En **Export → Export to Python File...**, guarden el script `modelo_amenaza_iguana.py` para inspeccionar su traducción a `arcpy`.

---

## 3. Ruta B (Equivalencia Directa): Diseñador Gráfico de Modelos en QGIS (`Procesos -> Diseñador Gráfico de Modelos`)

Para el **Parcial 2 (`P2`)** y el **Informe Final (`IF`) en QGIS**, construiremos este flujo reproducible utilizando el **Diseñador Gráfico de Modelos** nativo de QGIS y guardándolo como archivo **`.model3`**:

### Paso 3.1: Abrir el Diseñador y Definir los Parámetros de Entrada (`Inputs`)
1. En QGIS, vayan al menú superior: **Procesos → Diseñador Gráfico de Modelos...** (*Graphical Modeler*).
2. En la barra de propiedades del modelo (panel izquierdo):
   - **Nombre:** `modelo_retiro_iguana_9377`
   - **Grupo:** `Consultoria_La_Iguana`
3. En la pestaña inferior izquierda **Entradas** (*Inputs*), agreguen los tres parámetros dinámicos equivalentes a las banderas `P` de ArcGIS:
   - **Entrada 1 (Red hídrica):** Doble clic en **Capa vectorial** $\rightarrow$ Descripción: `Red Hidrica (EPSG:9377)` | Tipo de geometría: `Línea` | Obligatorio: `Sí`.
   - **Entrada 2 (Manzanas / Predios):** Doble clic en **Capa vectorial** $\rightarrow$ Descripción: `Manzanas o Predios (EPSG:9377)` | Tipo de geometría: `Polígono` | Obligatorio: `Sí`.
   - **Entrada 3 (Distancia de retiro):** Doble clic en **Número** $\rightarrow$ Descripción: `Distancia de Retiro (m)` | Tipo: `Flotante` | Valor predeterminado: `30.0`.

### Paso 3.2: Encadenar los Algoritmos (`Buffer` $\rightarrow$ `Intersección` $\rightarrow$ `Calculadora de campos`)
Cambien a la pestaña **Algoritmos** en el panel izquierdo del Diseñador:

1. **Algoritmo 1 — `Buffer` (Zona de amortiguamiento disuelta):**
   - Busquen **Buffer** (bajo *Geometría vectorial*) y arrástrenlo al lienzo:
     - **Capa de entrada:** Cambien el botón a **Entrada del modelo** (*Model Input*) y elijan `Red Hidrica (EPSG:9377)`.
     - **Distancia:** Cambien el botón a **Entrada del modelo** y elijan `Distancia de Retiro (m)`.
     - **Disolver resultado:** Marquen **`Sí` (`True`)**.
     - Clic en **Aceptar**.
2. **Algoritmo 2 — `Intersección` (*Intersection*):**
   - Busquen **Intersección** y arrástrenlo al lienzo:
     - **Capa de entrada:** **Entrada del modelo** $\rightarrow$ `Manzanas o Predios (EPSG:9377)`.
     - **Capa de superposición:** **Salida del algoritmo** (*Algorithm Output*) $\rightarrow$ `"Hecho buffer" del algoritmo "Buffer"`.
     - Clic en **Aceptar**.
3. **Algoritmo 3 — `Calculadora de campos` (*Field calculator*):**
   - Busquen **Calculadora de campos** y arrástrenla al lienzo:
     - **Capa de entrada:** **Salida del algoritmo** $\rightarrow$ `"Intersección" del algoritmo "Intersección"`.
     - **Nombre del campo:** `area_afectada_ha`
     - **Tipo de campo de resultado:** `Decimal (doble)` | **Longitud:** `12` | **Precisión:** `4`.
     - **Fórmula:**
       ```text
       $area / 10000
       ```
     - En la sección inferior **Calculado** (*Calculated*), escriban el nombre del resultado final: `Manzanas_Afectadas_Retiro_9377` (esto crea automáticamente la caja verde de salida del modelo).
     - Clic en **Aceptar**.

### Paso 3.3: Validar, Guardar como `.model3` y Ejecutar
1. En la barra superior del Diseñador de QGIS, hagan clic en el ícono de verificación (**Validar modelo**) para comprobar que todos los nodos estén bien conectados.
2. Hagan clic en **Guardar modelo como...** (`Ctrl + Shift + S`) y guárdenlo en la carpeta `04_modelos_scripts/` de su proyecto con el nombre **`modelo_amenaza_iguana.model3`**.
3. Pulsen el botón verde **Ejecutar modelo (`F5`)**: se abrirá una ventana de diálogo limpia pidiendo únicamente la capa de drenajes, la capa de manzanas y la distancia ($30\text{ m}$), generando la capa resultante con `area_afectada_ha` calculada en un solo paso.
4. *(Opcional)* Hagan clic en el botón **Exportar como script de Python...** para ver cómo QGIS traduce el modelo visual a código `processing.run(...)` de PyQGIS.

---

## 4. Bloque 2 de la Sesión (29 de Octubre): Aplicación del Quiz 4 (8% — 45 min en QGIS)

Al finalizar la práctica de automatización se realizará de forma individual en los equipos del laboratorio el **Quiz 4 (8% de la nota definitiva del curso)**:

- **Temática evaluada:** **Posicionamiento GNSS en Gabinete y Control de Calidad por `HDOP`** en **QGIS** (contenidos desarrollados en la guía [G11](G11_gnss_gabinete_importacion.md)).
- **Modalidad y duración:** Evaluación práctica individual en QGIS (45 minutos): ingesta de traza `.gpx` y levantamiento `.csv` (`EPSG:4326`), depuración por `"hdop" <= 2.0`, reproyección a `EPSG:9377` y contraste posicional frente a vértices IGAC.

---

## Checklist de Cierre de la Sesión del 29 de Octubre (G15)

- [ ] Se comprendió la lógica de grafos acíclicos dirigidos (`Buffer 30 m` $\rightarrow$ `Intersect` $\rightarrow$ `Calculate Field`) y el uso de parámetros dinámicos (`P`).
- [ ] Se construyó y ejecutó el modelo `.model3` en el **Diseñador Gráfico de Modelos de QGIS** como preparación directa para el **Parcial 2 (`P2`)** y el **Informe Final (`IF`)**.
- [ ] Se presentó individualmente el **Quiz 4 (8%, 45 min)** sobre posicionamiento GNSS en gabinete en QGIS.
