# Hito 4: Evaluación Práctica Integradora 2 — Terreno (DEM), GNSS (HDOP) e Índices Sentinel-2

> **Curso:** Geomática, Ingeniería y SIG (`GEOMATICA-SIG-EAFIT`)  
> **Semestre:** 2027-1 · Universidad EAFIT  
> **Semana de Aplicación:** Semana 14 (`S14`) · Jueves 29 de abril de 2027  
> **Horario:** 12:00 m. – 2:30 p.m. (150 minutos en sala de cómputo)  
> **Ponderación:** 20.0 % de la calificación definitiva del curso  
> **Modalidad:** Individual en PC (Sala de Cómputo EAFIT)  
> **Política de Inteligencia Artificial:** **`Tier P` (Prohibido / Supervisado en Sala)**  
> **Resultados de Aprendizaje Evaluados:** `RAA3` (Relacional)  
> **Contenidos Integrados:** Semanas `S10` a `S13` (Guías `G08`, `G09`, `G10`, `G11`, `G12`, `G13`)

---

## 1. Propósito y Sentido Formativo (TILT - Purpose)

El modelado biofísico del territorio requiere integrar el relieve topográfico continuo con mediciones de campo satelitales (GNSS) y reflectancias multiespectrales provenientes de sensores remotos ópticos (Sentinel-2 MSI). La caracterización de laderas inestables y la detección de asentamientos informales o coberturas expuestas a riesgo hidro-geomorfológico no pueden sustentarse en interpretaciones subjetivas: exigen un procesamiento numérico riguroso de matrices ráster y control de calidad métrico.

Esta evaluación práctica integradora evalúa la capacidad del estudiante para:
1. Modelar variables morfométricas del terreno (pendientes en grados y porcentaje, sombreado 3D y perfil longitudinal de cauces) a partir de Modelos Digitales de Elevación (DEM) reproyectados a **`EPSG:9377`**.
2. Auditar datos de posicionamiento satelital GNSS mediante filtros de dilución de precisión (**`HDOP <= 2.0`**) y calcular el error medio cuadrático (**`RMSE`**) frente a vértices geodésicos oficiales.
3. Procesar bandas ópticas de Sentinel-2 L2A en la escena metropolitana MGRS **`18NVL`**, calculando índices de vegetación (**`NDVI`**) y huella urbana (**`NDBI`**).
4. Ejecutar álgebra de mapas booleana en la Calculadora Ráster de QGIS y en la extensión **Spatial Analyst** de ArcGIS Pro, parametrizada con la **semilla individual $D$**, vectorizando con limpieza la clase activa ($DN = 1$).

---

## 2. Condiciones de Partida y Semilla Individual (TILT - Task)

### 2.1 Datos de Entrada
Se suministrará al inicio de la sesión el archivo comprimido `insumos_hito4.zip` para extracción en `C:\Temp\H4_Nombre_Apellido\`:
- `dem_alos_12m_raw.tif`: Modelo Digital de Elevación ALOS PALSAR (12.5 m) en coordenadas geográficas.
- `mascara_cuenca_estudio.gpkg`: Polígono de la cuenca hidrográfica en `EPSG:9377`.
- `levantamiento_gnss_crudo.csv`: Registro de campo con columnas `id`, `lat`, `lon`, `elevacion`, `hdop`, `satelites`.
- `vertice_control_igac.gpkg`: Punto geodésico de referencia con coordenadas oficiales de alta precisión en `EPSG:9377`.
- Bandas Sentinel-2 L2A (10 m y 20 m): `B03_Green.jp2`, `B04_Red.jp2`, `B08_NIR.jp2`, `B11_SWIR.jp2`.

### 2.2 Semilla Individual $D$
Cada estudiante debe parametrizar sus operaciones de álgebra ráster utilizando el último dígito de su documento de identidad ($D \in \{0, 1, 2, \dots, 9\}$):
- **Umbral de Corte de Vegetación Densa ($U_{\text{NDVI}}$):**
  $$U_{\text{NDVI}} = 0.20 + 0.01 \times D$$
  *(Ejemplo: si el documento termina en 6, $U_{\text{NDVI}} = 0.20 + 0.06 = 0.26$).*
- **Pendiente Crítica de Evaluación ($P_{\text{critica}}$):**
  $$P_{\text{critica}} = 25.0 + 0.5 \times D\text{ grados}$$
- El empleo de parámetros $D$ distintos a los correspondientes al documento del estudiante invalida las matrices numéricas resultantes.

### 2.3 Política de IA Generativa: `Tier P` (Prohibido / Supervisado)
- Prohibido el uso de asistentes de IA generativa, comunicación externa o transferencia de archivos entre computadores.
- La evaluación mide la competencia técnica directa e individual frente a las matrices de datos ráster y el rigor de geoprocesamiento.

---

## 3. Especificaciones de la Tarea Técnica (150 minutos)

### Módulo 1: Procesamiento del Relieve y Morfometría en EPSG:9377 (40 min)
1. **Reproyección y Recorte del DEM:**
   - Reproyectar `dem_alos_12m_raw.tif` al sistema **CTM12 (`EPSG:9377`)** mediante remuestreo bilineal con resolución de celda exacta de $12.5 \times 12.5\text{ m}$.
   - Recortar el ráster por la máscara poligonal de la cuenca configurando el valor nulo estricto: `NoData = -9999`.
   - Guardar como `dem_cuenca_9377.tif`.
2. **Modelación de Pendientes y Sombreado 3D:**
   - Generar el ráster de pendientes en grados sexagesimales (`pendiente_grados.tif`) y en porcentaje (`pendiente_pct.tif`).
   - Reclasificar las pendientes según la zonificación normativa del POT del Valle de Aburrá:
     - Clase 1: $<15^\circ$ (Baja pendiente / Valle aluvial)
     - Clase 2: $15^\circ \text{ a } 30^\circ$ (Pendiente media / Vertientes moderadas)
     - Clase 3: $>30^\circ$ (Alta pendiente / Laderas escarpadas de amenaza geotécnica)
   - Generar el mapa de sombras 3D (*Hillshade*) con acimut de $315^\circ$ y ángulo solar de $45^\circ$.
3. **Perfil Topográfico del Cauce:**
   - Extraer el perfil longitudinal del cauce principal registrando la cota máxima en el nacimiento, la cota en la desembocadura, el desnivel total en metros ($\Delta Z$) y la pendiente media del cauce ($S = \Delta Z / L$).

### Módulo 2: Ingesta GNSS, Filtrado HDOP y Cálculo de RMSE (30 min)
1. Cargar la tabla `levantamiento_gnss_crudo.csv` en QGIS LTR configurando $X = \text{lon}$, $Y = \text{lat}$ en datum geográfico WGS84 (`EPSG:4326`).
2. **Filtro de Calidad por Dilución de Precisión:**
   - Aplicar filtro de consulta para eliminar puntos con dispersión por multitrayectoria (*multipath*):
     $$\text{"hdop"} \le 2.0 \quad \land \quad \text{"satelites"} \ge 6$$
   - Exportar los puntos válidos a `puntos_gnss_validos_9377.gpkg` en `EPSG:9377`.
3. **Cálculo de Error Medio Cuadrático (RMSE):**
   - Comparar las coordenadas Este ($X$) y Norte ($Y$) del punto de amarre GNSS depurado frente a las coordenadas oficiales del `vertice_control_igac`.
   - Calcular los residuales $\Delta X = X_{\text{GNSS}} - X_{\text{IGAC}}$ y $\Delta Y = Y_{\text{GNSS}} - Y_{\text{IGAC}}$, y el error posicional horizontal:
     $$\text{RMSE}_H = \sqrt{\Delta X^2 + \Delta Y^2}$$
   - Reportar si el levantamiento cumple la tolerancia técnica submétrica ($<1.0\text{ m}$) o de navegador ($<5.0\text{ m}$).

### Módulo 3: Teledetección Sentinel-2 y Álgebra Ráster Biespectral (50 min)
1. **Auditoría Radiométrica y Recorte:**
   - Verificar si las bandas vienen en enteros de reflectancia de superficie ($0\text{ a }10\,000$). De ser necesario, dividir entre $10\,000$ para escalar de $0.0\text{ a }1.0$.
   - Recortar las bandas B04 (Rojo), B08 (NIR) y B11 (SWIR) a la cuenca de estudio en `EPSG:9377` con alineación de celda de $10\text{ m}$.
2. **Cálculo de Índices Normalizados:**
   - En la Calculadora Ráster (o Spatial Analyst en ArcGIS Pro), calcular el Índice de Vegetación de Diferencia Normalizada:
     $$\text{NDVI} = \frac{\text{B08} - \text{B04}}{\text{B08} + \text{B04}}$$
   - Calcular el Índice de Construcción y Suelo Expuesto:
     $$\text{NDBI} = \frac{\text{B11} - \text{B08}}{\text{B11} + \text{B08}}$$
3. **Condición Booleana Multicriterio Parametrizada con Semilla $D$:**
   - Formular la expresión condicional para aislar zonas críticas de laderas escarpadas con cobertura expuesta o presión urbana:
     $$\text{Mascara\_Critica} = (\text{NDVI} < U_{\text{NDVI}}) \land (\text{NDBI} > 0.0) \land (\text{pendiente\_grados} > P_{\text{critica}})$$
   - El ráster booleano resultante debe tener valor `1` en las celdas que cumplen la condición simultánea y valor `0` (o `NoData`) en las restantes.

### Módulo 4: Vectorización Limpia y Balance Territorial (30 min)
1. Poligonizar el ráster booleano filtrando estrictamente las celdas activas con valor **`DN = 1`**.
2. **Saneamiento del Vector Resultante:**
   - Eliminar celdas aisladas y polígonos con área menor a $100\text{ m}^2$ (efecto de ruido de píxel).
   - Aplicar suavizado de bordes o disolución de geometrías adyacentes.
3. **Cálculo de Área Afectada:**
   - Calcular en la tabla de atributos los campos `area_m2` y `area_ha` con `$area`.
   - Obtener el área total en hectáreas de zonas críticas identificadas bajo la semilla $D$.
   - Exportar como `zonas_criticas_ladera_9377.gpkg`.

---

## 4. Estructura Obligatoria de Entrega

El archivo comprimido `Hito4_Apellido_Nombre.zip` debe contener:

```text
Hito4_Apellido_Nombre/
├── hito4_analisis.qgz                 # Proyecto QGIS con capas relativas
├── Hito4_ArcGIS/
│   └── Hito4_SpatialAnalyst.aprx      # Proyecto ArcGIS Pro con mapas ráster
├── raster_procesados/
│   ├── dem_cuenca_9377.tif            # DEM recortado y reproyectado (12.5 m)
│   ├── pendiente_grados.tif           # Pendiente en grados sexagesimales
│   ├── ndvi_sentinel_9377.tif         # NDVI escalado -1.0 a +1.0
│   └── mascara_critica_booleana.tif   # Ráster booleano (0 y 1)
├── vectorial_salida/
│   ├── puntos_gnss_validos_9377.gpkg  # Puntos GNSS con HDOP <= 2.0
│   └── zonas_criticas_ladera_9377.gpkg# Vectorización limpia de DN = 1
└── reporte_metrico_hito4.txt          # RMSE GNSS, parámetros D y área total en hectáreas
```

---

## 5. Rúbrica Criterial Analítica de 4 Niveles (TILT - Criteria)

| Criterio y Ponderación | Nivel 1 — Inicial (0.0 – 2.9) | Nivel 2 — Básico (3.0 – 3.7) | Nivel 3 — Competente (3.8 – 4.4) | Nivel 4 — Avanzado (4.5 – 5.0) |
|:---|:---|:---|:---|:---|
| **C1. Morfometría del Terreno (DEM) en EPSG:9377** *(25 %)* | Conserva el DEM en coordenadas geográficas produciendo pendientes erróneas en grados/radianes, no asigna valor NoData produciendo bordes negros rectangulares, o no calcula el perfil del cauce. | Reproyecta el DEM a `EPSG:9377` con NoData configurado y calcula la pendiente, pero omite la reclasificación normativa POT o reporta cotas del cauce sin calcular el desnivel $\Delta Z$. | Reproyecta y recorta el DEM a $12.5\text{ m}$ en CTM12 con `NoData = -9999`, modela pendientes en grados y %, reclasifica en las 3 zonas POT, genera sombreado 3D y extrae el perfil longitudinal con desnivel y pendiente media. | Cumple todos los indicadores del nivel Competente y además genera la curva hipsométrica de la cuenca e interpreta el estado de madurez morfométrica de la vertiente. |
| **C2. Control de Calidad GNSS y Dilución de Precisión** *(25 %)* | Importa la tabla CSV sin definir campos de latitud y longitud, mantiene puntos espurios con $\text{HDOP} > 5.0$, o confunde el error lineal con el error cuadrático medio ($\text{RMSE}$). | Aplica el filtro $\text{HDOP} \le 2.0$ y exporta a `EPSG:9377`, pero comete errores en la fórmula matemática del $\text{RMSE}_H$ o no contrasta el resultado frente a las coordenadas del vértice IGAC. | Aplica el filtro condicional ($\text{HDOP} \le 2.0 \land \text{satelites} \ge 6$), reproyecta a `EPSG:9377`, calcula $\Delta X, \Delta Y$ y $\text{RMSE}_H$ numérico exacto frente al vértice IGAC y diagnostica el nivel de precisión del receptor. | Cumple todos los indicadores del nivel Competente y documenta la elipse de error posicional horizontal y el efecto de la obstrucción por relieve (*multipath*) sobre el levantamiento. |
| **C3. Álgebra Ráster Biespectral y Semilla D** *(25 %)* | Invierte las bandas en el cálculo de NDVI o NDBI, no parametriza el corte con la fórmula $U_{\text{NDVI}} = 0.20 + 0.01 \times D$, o genera salidas ráster con valores continuos sin aislamiento booleano. | Calcula NDVI y NDBI con valores en rango $[-1.0, +1.0]$ y aplica la semilla $D$, pero comete fallos sintácticos en la conjunción booleana multicriterio (omite la condición de pendiente o suelo expuesto). | Formula con exactitud la expresión booleana en Calculadora Ráster y Spatial Analyst incorporando $U_{\text{NDVI}}$, NDBI y $P_{\text{critica}}$ con su semilla $D$, produciendo una máscara limpia con valores binarios ($0$ y $1$). | Cumple todos los indicadores del nivel Competente y contrasta las estadísticas zonales del ráster resultante frente a ortofotos de alta resolución, cuantificando la confusión espectral entre sombra y agua. |
| **C4. Vectorización Limpia y Balance Territorial** *(25 %)* | Vectoriza la totalidad del ráster incluyendo la clase $DN = 0$, mantiene millones de píxeles inconexos sin depurar, o no calcula los campos de área en hectáreas. | Poligoniza la clase activa $DN = 1$, pero conserva polígonos menores a $100\text{ m}^2$ o deja campos de área sin actualizar tras el proceso de conversión ráster-a-vector. | Vectoriza exclusivamente la clase activa $DN = 1$, elimina fragmentos espurios $<100\text{ m}^2$, disuelve geometrías contiguas, calcula `area_ha` con precisión decimal y reporta el balance total en el archivo de texto. | Cumple todos los indicadores del nivel Competente y desglosa el área crítica afectada cruzándola espacialmente con la zonificación geológica o de riesgo de la cuenca. |

---

## 6. Notas de Calibración para Casos Límite (*Borderline Decisions*)

- **Decisión entre Nivel 2 (Básico) y Nivel 3 (Competente):**
  - Si el estudiante calculó el NDVI y NDBI pero en la vectorización final incluyó todos los polígonos con $DN = 0$ (generando un archivo gigantesco que bloquea el visor), el criterio C4 se califica en **Nivel 2 (3.2)**.
  - Para alcanzar el **Nivel 3 (Competente)**, es indispensable que la capa vectorial contenga exclusivamente las geometrías de la clase activa $DN = 1$ saneadas y con el área en hectáreas calculada.
- **Decisión entre Nivel 3 (Competente) y Nivel 4 (Avanzado):**
  - Para obtener **Nivel 4 (Avanzado)**, el estudiante debe reportar el análisis de sensibilidad demostrando cómo cambia el área crítica (en hectáreas) si el umbral $U_{\text{NDVI}}$ varía en $\pm 0.05$, evidenciando dominio físico de la teledetección.

---

## 7. Protocolo de Mejora Continua (Semana 15)

- Los estudiantes con calificación inferior a **3.8 / 5.0** tendrán una ventana de mejora técnica en la sesión de la **Semana 15 (`S15`, 06 de mayo de 2027)**.
- La corrección del flujo de álgebra ráster o del filtrado GNSS, encapsulada y verificada en un modelo reproducible de **ModelBuilder (`.atbx`)** en sala, permitirá recuperar hasta el **40 % de los puntos deducidos** en este Hito 4.
