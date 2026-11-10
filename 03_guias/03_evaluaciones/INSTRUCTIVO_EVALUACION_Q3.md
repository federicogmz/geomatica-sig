# Quiz 3: Terreno y Álgebra Ráster (8%)
*Modelación del Relieve, DEM y Álgebra de Mapas en QGIS*

> **Curso:** Geomática, Ingeniería y SIG  
> **Pregrados:** Ingeniería Civil y Diseño Urbano · Universidad EAFIT  
> **Ponderación:** 8% de la nota definitiva del curso  
> **Semana:** 13 · Bloque 2 (Laboratorio de Cómputo)  
> **Modalidad:** Individual, presencial en el laboratorio con QGIS  
> **Duración:** 45 minutos estrictos — lo que no esté entregado al finalizar el tiempo no se califica  
> **Materiales permitidos:** Su computador con QGIS LTR, calculadora y los insumos entregados en `insumos_q3/`.  

---

## 1. El encargo territorial

La Secretaría de Planeación y Gestión del Riesgo del Municipio de Sabaneta requiere delimitar las **zonas de ladera con pendiente crítica ($>25^\circ$)** en la vertiente oriental del municipio (microcuenca de la Quebrada La Doctora – sector Cerro La Romera). Este producto servirá como insumo oficial para la actualización del mapa de amenaza por movimientos en masa del PBOT y la delimitación de suelos de protección frente a la presión de expansión urbana en media y alta ladera.

### Insumos suministrados (en `insumos_q3/`):
1. `dem_sabaneta_crudo.tif`: Modelo Digital de Elevación ALOS (JAXA ALOS World 3D, resolución nativa 30 m) en coordenadas geográficas angulares WGS 84 (`EPSG:4326`).
2. `sabaneta_ctm12.gpkg`: Polígono vectorial oficial del perímetro municipal de Sabaneta en coordenadas proyectadas CTM12 (`EPSG:9377`).

---

## 2. Entregables requeridos (`apellido_nombre_Q3.zip`)

Entreguen un único archivo comprimido `apellido_nombre_Q3.zip` que contenga directamente en la raíz los siguientes cinco productos:

1. **`dem_ctm12.tif`**  
   DEM en coordenadas oficiales **MAGNA-SIRGAS Origen Nacional CTM12 (`EPSG:9377`)**, resolución métrica de **`30.0` m** (remuestreo bilineal), recortado al perímetro municipal de Sabaneta.

2. **`pendiente_grados.tif`**  
   Ráster de pendientes del terreno en **grados sexagesimales** ($0^\circ$ a $90^\circ$, Factor Z = 1.0) con bordes calculados.

3. **`mascara_critica_25.tif`**  
   Ráster binario booleano en `EPSG:9377`: valor `1` para laderas críticas ($>25^\circ$) y valor `0` para pendientes no críticas.

4. **`quiz3_9377.gpkg`**  
   Base de datos GeoPackage con la capa vectorial **`laderas_criticas_sabaneta`**, conservando únicamente las geometrías críticas (`amenaza = 1`) y el campo calculado **`area_ha`** (área de cada polígono en hectáreas).

5. **`respuestas_teoricas.txt`**  
   Archivo de texto plano con las respuestas al diagnóstico conceptual.

> [!WARNING]
> La plataforma de calificación valida automáticamente los nombres exactos de los 5 archivos y las capas del GeoPackage. Cualquier archivo faltante o con nombre distinto no será calificado.

---

## 3. Diagnóstico conceptual (`respuestas_teoricas.txt`)

En el archivo `respuestas_teoricas.txt`, respondan las siguientes cuatro preguntas usando el formato estricto `CLAVE=VALOR` (en mayúsculas, una por línea, sin espacios):

1. **¿Cuál modelo representa la primera superficie de retorno, incluyendo copas de árboles y edificaciones?**  
   Clave: `PREGUNTA_1_MDS_VS_MDT` *(responda MDS o MDT)*

2. **¿Qué consecuencia geométrica ocurre al calcular pendientes sobre un DEM en coordenadas geográficas angulares (`EPSG:4326`)?**  
   Clave: `PREGUNTA_2_CONSECUENCIA_EPSG4326` *(responda SOBREESTIMACION o SUBESTIMACION)*

3. **Según la clasificación de Dana Tomlin, ¿a qué categoría corresponde la evaluación booleana condicional celda a celda?**  
   Clave: `PREGUNTA_3_TIPO_OPERACION_MASCARA` *(responda LOCAL, FOCAL, ZONAL o GLOBAL)*

4. **¿Cuál es el valor numérico en grados de la elevación solar estándar sobre el horizonte para sombreado plástico (*Hillshade*)?**  
   Clave: `PREGUNTA_4_ALTITUD_SOLAR_HILLSHADE` *(escriba el número en grados, ej. 45)*

*Estructura del archivo:*
```
PREGUNTA_1_MDS_VS_MDT=VALOR
PREGUNTA_2_CONSECUENCIA_EPSG4326=VALOR
PREGUNTA_3_TIPO_OPERACION_MASCARA=VALOR
PREGUNTA_4_ALTITUD_SOLAR_HILLSHADE=VALOR
```

---

## 4. Rúbrica de evaluación docente (5.0 pts / 8%)

| Entregable | Pts | Especificación Técnica Evaluada |
| :--- | :---: | :--- |
| **1. `dem_ctm12.tif`** | **1.0** | `dem_ctm12.tif` en `EPSG:9377`, recortado a Sabaneta con resolución de 30.0 m y cotas continuas sin distorsión angular. |
| **2. `pendiente_grados.tif`** | **1.0** | `pendiente_grados.tif` en grados sexagesimales ($0^\circ-90^\circ$, Factor Z = 1.0) con bordes calculados. |
| **3. `mascara_critica_25.tif`** | **1.0** | `mascara_critica_25.tif` con evaluación condicional exacta, aislando las celdas $>25^\circ$ ($1$/$0$). |
| **4. `quiz3_9377.gpkg`** | **1.0** | Capa `laderas_criticas_sabaneta` en `quiz3_9377.gpkg` solo con geometrías críticas (`amenaza = 1`) y campo `area_ha` calculado (referencia: $425 \pm 25\text{ ha}$). |
| **5. `respuestas_teoricas.txt`** | **1.0** | Nomenclatura estricta de los 5 archivos y archivo `respuestas_teoricas.txt` con las 4 respuestas correctas. |
| **Total Quiz 3** | **5.0** | **8% de la calificación definitiva del curso.** |
