# G08: Adquisición de Modelos Digitales de Elevación (DEM), propiedades ráster y visualización inicial

**Módulo 2 · Semana 8.** Inicio formal del modelo de datos matricial (Ráster): en esta sesión aprenderán cómo buscar y descargar modelos de elevación del terreno (**ALOS PALSAR 12.5 m RTC** y **SRTM 30 m**) directamente desde QGIS (vía OpenTopography / ASF Vertex), inspeccionar las propiedades matemáticas del píxel, interpretar el histograma de elevaciones y aplicar simbología de rampa pseudocolor profesional sobre la Cuenca de La Iguaná.

---

## 1. El Modelo de Datos Ráster: La Matriz Regular de Celdas

A diferencia del modelo vectorial (que guarda vértices $X, Y$ discretos), un **ráster** es una cuadrícula continua organizada en filas y columnas donde cada celda (píxel) almacena un valor numérico:

- **En un Modelo Digital de Elevación (DEM / MDE):** El valor del píxel representa la **cota topográfica sobre el nivel del mar en metros (msnm)**.
- **Resolución espacial:** La longitud del lado del píxel proyectado en el terreno (p. ej., $12.5\text{ m} \times 12.5\text{ m} = 156.25\text{ m}^2$ por celda).
- **Resolución radiométrica (profundidad de bits):** Número de bits por píxel (típicamente `Float32` para elevación continua con decimales, o `Int16` para enteros).
- **Valor NoData:** Valor reservado para celdas sin medición o fuera del área de interés (ej. `-9999`).

---

## 2. Descarga de DEMs Globales desde QGIS

Existen dos fuentes maestras de acceso abierto para la Cuenca de La Iguaná:
1. **SRTM (Shuttle Radar Topography Mission - NASA):** Resolución de $30\text{ m}$.
2. **ALOS PALSAR RTC (JAXA / Alaska Satellite Facility):** Resolución de $12.5\text{ m}$ corregida radiométricamente por terreno (High-Res Terrain Corrected).

### Método A: Descarga mediante el Complemento OpenTopography en QGIS
1. Vayan a **Complementos → Administrar e instalar complementos...**
2. Busquen e instalen el plugin **OpenTopography DEM Downloader**.
3. En la barra de herramientas, hagan clic en el ícono de OpenTopography.
4. Parámetros:
   - **DEM type:** *ALOS World 3D (30m)* o *SRTM GL1 (30m)* (o ALOS PALSAR si disponen de API Key).
   - **Extent:** Seleccionen *Usar la extensión del lienzo* (hagan zoom previo sobre la Cuenca de La Iguaná) o elijan la capa del polígono de la cuenca.
   - Hagan clic en **Run**. QGIS descargará la escena y la añadirá al lienzo como un archivo GeoTIFF.

### Método B: Descarga desde el Geoportal ASF Vertex (Alaska Satellite Facility)
1. Ingresen a [vertex.daac.asf.alaska.edu](https://vertex.daac.asf.alaska.edu/).
2. Tracen un recuadro sobre Medellín y La Iguaná.
3. Filtren por **Dataset: ALOS PALSAR**, tipo de producto: **Hi-Res Terrain Corrected (RTC)**.
4. Descarguen el archivo ZIP y descompriman el ráster terminado en `_dem.tif` (resolución $12.5\text{ m}$).
5. Cárguenlo en QGIS arrastrándolo al panel de capas.

---

## 3. Inspección Rigurosa de Propiedades del Ráster

1. Clic derecho sobre el DEM → **Propiedades... → pestaña Información**.
2. Verifiquen y anoten en su libreta técnica:
   - **Ancho y Alto:** Número de columnas y filas de la matriz (ej. $1240 \times 980$ celdas).
   - **Tamaño de píxel:** Si está en grados (ej. `0.000111, -0.000111`) significa que está en coordenadas geográficas WGS84. Si está en metros (ej. `12.5, -12.5`), ya está proyectado.
   - **Tipo de dato:** `Float32 - Real de 32 bits`.
   - **Sistema de Referencia de Coordenadas (SRC):** Identifiquen si es `EPSG:4326` o `EPSG:9377`.

---

## 4. Consulta Puntual de Píxeles (Herramienta Identificar Objetos)

1. Seleccionen la herramienta **Identificar objetos** (ícono del cursor azul con la letra `i`, `Ctrl + Shift + I`).
2. Hagan clic sobre distintos sectores de la cuenca:
   - En la desembocadura en el Río Medellín: observen cotas entre **$1\,450$ y $1\,500\text{ msnm}$**.
   - En el centro urbano de San Cristóbal: cotas entre **$1\,700$ y $1\,900\text{ msnm}$**.
   - En la divisoria de aguas en el Alto de Boquerón: cotas superiores a los **$2\,600\text{ a }2\,800\text{ msnm}$**.
3. El panel de resultados mostrará el valor numérico exacto de altitud del píxel pinchado.

---

## 5. Simbología Profesional de Elevación (Monobanda Pseudocolor)

Por defecto, QGIS carga el DEM en una escala monobanda gris poco expresiva (negro = bajo, blanco = alto). Vamos a convertirlo en una visualización topográfica comprensible:

1. Clic derecho sobre el DEM → **Propiedades → Simbología**.
2. Cambien el renderizador a: **Monobanda pseudocolor (*Singleband pseudocolor*)**.
3. **Rampa de color:** Hagan clic en la flecha desplegable y elijan:
   - *Create New Color Ramp... → cpt-city → Topography → elevation* o *wiki-2.0*.
   - Alternativamente, usen la rampa estándar *Terrain* o *Viridis*.
4. **Modo de clasificación:** Elijan **Continuo** o **Intervalo igual** con 6 a 8 clases.
5. Clic en **Clasificar** y luego en **Aceptar**.
6. Observen cómo el gradiente altitudinal revela de inmediato el cañón encañonado de La Iguaná y las divisorias de aguas.

---

## 6. Análisis del Histograma Altimétrico

1. En las propiedades de la capa, vayan a la pestaña **Histograma**.
2. Hagan clic en **Calcular histograma**.
3. La gráfica muestra la distribución de frecuencias de las alturas en la cuenca:
   - Identifiquen la altitud mínima, la altitud máxima y la cota modal (la elevación que ocupa la mayor superficie en la cuenca).

---

## 7. Práctica Autónoma para Repasar Durante la Semana

Para afianzar el manejo de datos matriciales antes de la clase de pendientes (G09):

1. **Recorte inicial preliminar:**
   - Menú *Raster → Extracción → Cortar ráster por extensión...*
   - Define un recuadro cerrado que cubra solo el área de estudio para reducir el peso del archivo en disco.
2. **Comparación de resoluciones:**
   - Si descargaste tanto SRTM (30 m) como ALOS PALSAR (12.5 m), superponlos y haz zoom máximo sobre el cauce de la quebrada. Compara cómo el tamaño del píxel suaviza o define los quiebres topográficos.
3. **Guardado en GeoTIFF:**
   - Asegúrate de guardar tu DEM base descargado con el nombre `dem_iguana_crudo.tif` en tu carpeta del proyecto.

---

## Checklist de Finalización de Clase

- [ ] Se adquirió un DEM de alta calidad (ALOS PALSAR o SRTM) para la Cuenca de La Iguaná.
- [ ] Se revisaron en *Propiedades* la resolución de celda, dimensiones y tipo de dato.
- [ ] Se consultaron elevaciones con la herramienta *Identificar objetos* en puntos clave.
- [ ] Se aplicó simbología monobanda pseudocolor topográfica con rampa armónica.
- [ ] Se calculó y comprendió el histograma de frecuencias altimétricas.
