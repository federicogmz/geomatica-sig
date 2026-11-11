# G15: Automatización Visual de Geoprocesos (ModelBuilder y Diseñador Gráfico) y Mejora Continua del Hito 4

**Semestre 2027-1 · Módulo 5: Automatización Espacial y Modelación Reproducible · Sesión S15 (Jueves 06 de mayo de 2027)**  
*Horario:* 12:00 m. – 4:30 p.m. (Jornada continua en Sala de Cómputo EAFIT: Sub-bloque 1 ModelBuilder + Sub-bloque 2 Mejora Continua)  
*Presupuesto Académico:* 4.5 h presenciales + 4.5 h de trabajo autónomo semanal (3 Créditos Académicos · 5 UMEs · 144 h semestrales)  
*Modalidad:* **100 % Individual** · *Metodología:* **Worked-Example Fading** (ModelBuilder `.atbx` $\leftrightarrow$ Diseñador `.model3` $\rightarrow$ Mejora Continua H4 $\rightarrow$ Preparación Hito 5).

---

## 1. Estructura de la Sesión y Arquitectura de la Jornada S15

La sesión 15 constituye el eje central de automatización espacial y aseguramiento técnico antes del cierre definitivo del semestre:

| Bloque | Horario | Duración | Contenido y Enfoque Pedagógico |
|:---:|:---:|:---:|---|
| **Sub-bloque 1** | 12:00 m. – 1:50 p.m. | 110 min | **Automatización Visual Avanzada en ArcGIS Pro y QGIS LTR:** Modelación mediante Grafos Acíclicos Dirigidos (DAG). Construcción encadenada de `Buffer (R = 30 + D m)` $\rightarrow$ `Intersect` $\rightarrow$ `Calculate Field (area_ha)` en **ModelBuilder (`.atbx`)** y en el **Diseñador Gráfico de Modelos (`.model3`)**. Parametrización dinámica (`P`), validación de flujos y exportación a scripts Python (ArcPy / PyQGIS). |
| **Pausa Activa** | 1:50 p.m. – 2:10 p.m. | 20 min | **Pausa activa pedagógica:** Desconexión visual y descanso. |
| **Sub-bloque 2** | 2:10 p.m. – 4:30 p.m. | 140 min | **Ventana de Mejora Continua del Hito 4 + Pre-chequeo Técnico Hito 5:** Depuración verificada en sala de inconsistencias del Hito 4 (recuperación de hasta el 40% de puntos deducidos mediante modelo ejecutable). Auditoría técnica de portabilidad (cero rutas rotas en `.gpkg` y `.gdb`) y ensayo de maquetación del Dossier A3 para el Pitch Ejecutivo. |

---

## 2. Principios de Automatización: ¿Por Qué Modelar Visualmente?

En la práctica profesional de la consultoría territorial, las preguntas analíticas se repiten ante cambios de diseño o nuevas regulaciones normativas:
*¿Qué ocurre con el área predial afectada si el retiro hídrico normativo pasa de $30\text{ m}$ a $37\text{ m}$? ¿Cómo responde el indicador si se actualiza la cartografía catastral o se traslada el modelo a otra microcuenca del portafolio?*

Ejecutar manualmente decenas de geoprocesos genera errores de digitación, imposibilita la auditoría entre pares y multiplica el riesgo de omitir el CRS `EPSG:9377`. Un **flujo visual automatizado** garantiza:
1. **Encadenamiento estricto:** La salida de un algoritmo alimenta de forma determinística la entrada del siguiente.
2. **Parametrización dinámica:** Permite exponer variables de entrada (bandera **`P`** en ArcGIS Pro o cajas de **Entrada** en QGIS) para que cualquier consultor ejecute el análisis con nuevos insumos en un solo clic.
3. **Reproducibilidad y Trazabilidad:** El archivo (`.atbx` o `.model3`) documenta formalmente la metodología cuantitativa del proyecto.

| Componente en el Grafo (DAG) | En **ArcGIS Pro — ModelBuilder** | En **QGIS — Diseñador Gráfico de Modelos** |
|---|---|---|
| **Archivo del modelo** | Guardado dentro de una caja de herramientas **`.atbx`** | Archivo modular independiente **`.model3`** |
| **Parámetros de Entrada (`P`)** | Óvalos **Azules** con distintivo **`P`** (*Model Parameter*) | Cajas de **Entrada** (*Inputs*: Vector, Ráster, Número) |
| **Algoritmos / Herramientas** | Rectángulos **Amarillos** (*Tools*) | Cajas **Blancas** con ícono de engranaje (*Algorithms*) |
| **Salidas Intermedias y Finales** | Óvalos **Verdes** (*Derived Data* con opción *Parameter*) | Cajas de **Resultado final** (*Output*) |

---

## 3. Sub-bloque 1: Construcción Paso a Paso del Flujo Automatizado

Construiremos un flujo que recibe la red hídrica, traza la faja de retiro disuelta con el parámetro individual $R = 30 + D\text{ m}$, intersecta las unidades territoriales y calcula automáticamente las hectáreas afectadas (`area_afectada_ha`).

### 3.1 Ruta A: ModelBuilder en ArcGIS Pro (`.atbx`)
1. Abrir el proyecto corporativo `UXX_proyecto_corporativo.aprx`.
2. En la cinta **Analysis**, hacer clic en el botón **ModelBuilder**.
3. En las propiedades del modelo (*Model Properties*):
   - **Name:** `Modelo_Retiro_Multicriterio_UXX`
   - **Label:** `Modelo Automatizado de Afectación por Retiro Hídrico (EPSG:9377)`
4. **Encadenamiento de Herramientas:**
   - Arrastrar la herramienta **Buffer** (*Analysis Tools → Proximity*):
     - Conectar `red_hidrica` como *Input Features*.
     - Abrir la herramienta: fijar distancia como parámetro dinámico (clic derecho $\rightarrow$ *Create Variable From Parameter → Distance*).
     - **Dissolve Type:** Seleccionar `Dissolve all output features into a single feature` (evita superposición de áreas en confluencias).
   - Arrastrar la herramienta **Intersect** (*Analysis Tools → Overlay*):
     - Conectar como entradas tanto el óvalo verde resultante del Buffer como la capa de polígonos/manzanas.
     - Salida: `zonas_afectadas_retiro`.
   - Arrastrar la herramienta **Calculate Field** (*Data Management Tools → Fields*):
     - Conectar a la salida de Intersect.
     - **Field Name:** `area_afectada_ha` | **Field Type:** `Double`.
     - **Expression (Python 3):**
       ```python
       !shape.area! / 10000.0
       ```
5. **Parametrización y Validación:**
   - Hacer clic derecho sobre la capa de entrada, la variable de distancia, la capa de polígonos y la salida final $\rightarrow$ marcar **Parameter** (aparecerá la letra **`P`**).
   - En la cinta superior, hacer clic en **Validate** (revisa consistencia del grafo) y luego en **Auto Layout**.
   - Hacer clic en **Save** y ejecutar con **Run**.
6. *(Opcional)* En **ModelBuilder → Export → Export to Python File...**, guardar `modelo_retiro_arcpy.py` para verificar su implementación en código.

---

### 3.2 Ruta B: Diseñador Gráfico de Modelos en QGIS LTR (`.model3`)
1. En QGIS, abrir el menú superior: **Procesos → Diseñador Gráfico de Modelos...**
2. En las propiedades del modelo (panel izquierdo):
   - **Nombre:** `modelo_retiro_multicriterio_UXX`
   - **Grupo:** `Consultoria_Geomatica_2027`
3. **Definición de Entradas (*Inputs*):**
   - *Entrada 1:* Doble clic en **Capa vectorial** $\rightarrow$ Nombre: `Red Hidrica (EPSG:9377)` | Tipo: `Línea` | Obligatorio: `Sí`.
   - *Entrada 2:* Doble clic en **Capa vectorial** $\rightarrow$ Nombre: `Poligono Focal o Manzanas (EPSG:9377)` | Tipo: `Polígono` | Obligatorio: `Sí`.
   - *Entrada 3:* Doble clic en **Número** $\rightarrow$ Nombre: `Distancia de Retiro R (m)` | Tipo: `Flotante` | Valor predeterminado: `34.0` (según su dígito $D$).
4. **Encadenamiento de Algoritmos:**
   - **Algoritmo 1 — Buffer:**
     - Buscar **Buffer** en la pestaña *Algoritmos*.
     - Capa de entrada: Cambiar a **Entrada del modelo** $\rightarrow$ `Red Hidrica (EPSG:9377)`.
     - Distancia: Cambiar a **Entrada del modelo** $\rightarrow$ `Distancia de Retiro R (m)`.
     - Disolver resultado: **`Sí` (`True`)**.
   - **Algoritmo 2 — Intersección:**
     - Buscar **Intersección**.
     - Capa de entrada: **Entrada del modelo** $\rightarrow$ `Poligono Focal o Manzanas (EPSG:9377)`.
     - Capa de superposición: **Salida del algoritmo** $\rightarrow$ `"Hecho buffer" del algoritmo "Buffer"`.
   - **Algoritmo 3 — Calculadora de campos:**
     - Buscar **Calculadora de campos**.
     - Capa de entrada: **Salida del algoritmo** $\rightarrow$ `"Intersección" del algoritmo "Intersección"`.
     - Nombre del campo: `area_afectada_ha` | Tipo: `Decimal (doble)`.
     - Expresión:
       ```sql
       $area / 10000.0
       ```
     - En **Calculado**, asignar el nombre del resultado final: `Sectores_Criticos_Retiro_9377`.
5. **Guardado:** Hacer clic en el ícono de disco y guardar como `modelo_retiro_UXX.model3` en la carpeta de su proyecto.

---

## 4. Sub-bloque 2: Ventana de Mejora Continua del Hito 4 y Pre-chequeo del Hito 5

A las 2:10 p.m., tras la pausa activa, se abre formalmente la sesión asistida en sala de cómputo:

### 4.1 Ventana de Mejora Continua del Hito 4
- Cada estudiante revisa su retroalimentación del Hito 4 (S14).
- Inconsistencias típicas a depurar:
  - Corrección de remuestreo o asignación errónea de NoData en el DEM.
  - Ajuste de expresiones en Calculadora Ráster (paréntesis en NDVI/NDBI).
  - Eliminación de polígonos de fondo en la vectorización (`DN = 1`).
  - Depuración de trazas GNSS con `"hdop" <= 2.0` y recalculo del RMSE.
- **Mecanismo de recuperación:** La entrega de la solución corregida y encapsulada dentro de un modelo funcional (`.atbx` o `.model3`) en la carpeta del proyecto recupera **hasta el 40% de los puntos deducidos** en la calificación del Hito 4.

### 4.2 Protocolo de Pre-chequeo Técnico para el Hito 5
Para garantizar que la entrega final individual de la Semana 16 transcurra sin incidentes técnicos:
1. **Auditoría de Enlaces (Cero Rutas Rotas):**
   - Comprobar que todos los insumos apunten a rutas relativas dentro de la carpeta del proyecto.
   - Probar abrir el proyecto `.qgz` y el archivo `.aprx` tras mover la carpeta a otra ruta de prueba.
2. **Integridad de Bases Espaciales:**
   - Verificar que el GeoPackage `UXX_proyecto.gpkg` y la File Geodatabase `UXX_proyecto.gdb` contengan todas las capas del semestre en **`EPSG:9377`**.
3. **Estructura del Dossier A3:**
   - Configurar la plantilla del **Dossier Infográfico A3 de 2 páginas** en el Diseñador de Impresión / Layout de ArcGIS Pro.

---

## 5. Checklist de Finalización de Clase (S15)

- [ ] Construí y validé el modelo automatizado en ArcGIS Pro (`.atbx`) con parámetros `P`.
- [ ] Construí y validé el modelo equivalente en el Diseñador Gráfico de QGIS (`.model3`).
- [ ] Parametricé el retiro con mi valor individual $R = 30 + D\text{ m}$.
- [ ] Apliqué las correcciones del Hito 4 dentro de la Ventana de Mejora Continua.
- [ ] Verifiqué cero rutas rotas en mis proyectos cartográficos y respaldé mi trabajo en `.zip`.
