# Taller Integrador Individual de Recuperación (Reemplazo de Entrega del Informe Final `IF`)
## Diagnóstico Geodésico, Topológico, Morfométrico y Multiespectral de la Cuenca de la Quebrada La Ayurá (Envigado, Antioquia)

* **Curso:** Geomática, Ingeniería y SIG (Semestre 2026-1)
* **Pregrados:** Ingeniería Civil y Diseño Urbano · Universidad EAFIT
* **Modalidad y Software:** **100% Individual** en **QGIS LTR** (`EPSG:9377` — MAGNA-SIRGAS 2018 / Origen-Nacional)
* **Alcance en la Calificación:** Reemplaza la nota de la entrega del Informe Final (`IF`).
* **Fecha Límite Improrrogable de Entrega:** **Viernes 13 de noviembre de 2026 hasta las 11:59 a.m.**
* **Paquete de Insumos (`insumos_recuperacion_ayura.zip`):**
  * `limite_cuenca_ayura.shp` (`.shp`, `.shx`, `.dbf`, `.cpg` — divisoria hidrográfica de La Ayurá **sin archivo `.prj`**).
  * `estaciones_gnss_ayura.csv` (`20` estaciones de monitoreo GNSS capturadas en campo en coordenadas geográficas `EPSG:4326`).
  * `drenajes_ayura_9377.gpkg` (capa `drenajes_ayura` con `6` tramos hidrográficos conectados en `EPSG:9377`).
  * `predios_ribera_ayura.gpkg` (capa `predios_ribera_ayura` con `36` predios catastrales ribereños y defectos topológicos en `EPSG:9377`).
  * `dem_ayura_9377.tif` (Modelo Digital de Elevación regional en `EPSG:9377`, resolución espacial `10 m`, **sin recortar al polígono de la cuenca**).
  * `s2_ayura_b02_azul.tif`, `s2_ayura_b03_verde.tif`, `s2_ayura_b04_rojo.tif`, `s2_ayura_b08_nir.tif`, `s2_ayura_b11_swir1.tif` (5 bandas reales Sentinel-2 L2A en `EPSG:9377`, resolución `10 m`, **cubriendo el cuadrante regional completo más grande que la cuenca** para ser recortadas con `limite_cuenca_ayura`).

---

> [!CAUTION]
> **Trabajo Individual y Uso de Inteligencia Artificial:**  
> Esta entrega es estrictamente individual. No está permitido compartir archivos, plantillas ni textos entre compañeros, ni utilizar scripts automatizados o inteligencia artificial generativa para procesar las capas, diseñar el mapa o redactar el informe. Cualquier incumplimiento anulará la entrega con calificación de `0.0`, conforme al Reglamento Académico y Disciplinario de la Universidad EAFIT.

---

## 1. Requerimientos Técnicos por Etapa en QGIS (`EPSG:9377`)

Cree una carpeta de trabajo llamada `Apellido_Nombre_Recuperacion_IF`, configure el proyecto de QGIS en **`EPSG:9377` (MAGNA-SIRGAS / Origen-Nacional)** y active el guardado con **Rutas Relativas** (*Proyecto $\rightarrow$ Propiedades $\rightarrow$ General $\rightarrow$ Guardar rutas: Relativas*). Todas las capas vectoriales finales deben almacenarse dentro de un **único contenedor GeoPackage** llamado exactamente **`modelo_recuperacion_ayura.gpkg`**.

---

### Etapa 1: Geodesia, Homologación GNSS (`EPSG:4326` $\rightarrow$ `EPSG:9377`) y Topología Predial (1.25 Puntos)

1. **Asignación del CRS oficial al límite de la cuenca (`limite_cuenca_ayura.shp`):**
   * El shapefile `limite_cuenca_ayura.shp` fue entregado sin archivo `.prj`, pero sus coordenadas corresponden al sistema plano nacional ($X \approx 4.715.500\text{ m}$, $Y \approx 2.237.200\text{ m}$).
   * Asigne formalmente el sistema de referencia **`EPSG:9377`** (definir proyección intrínseca, **no reproyectar**) y expórtelo dentro de `modelo_recuperacion_ayura.gpkg` con el nombre de capa **`limite_cuenca_ayura`**.

2. **Importación, depuración por calidad (`HDOP`) y reproyección de estaciones GNSS (`estaciones_gnss_ayura.csv`):**
   * Importe la tabla `estaciones_gnss_ayura.csv` mediante *Añadir capa de texto delimitado*, declarando correctamente su sistema de coordenadas geográficas de origen **`EPSG:4326`** (`X = lon`, `Y = lat`).
   * Filtre las estaciones conservando **exclusivamente aquellas con calidad geométrica válida $\text{hdop} \le 2.0$** (descartando las estaciones degradadas con $\text{hdop} > 2.0$).
   * Exporte y reproyecte las estaciones válidas a **`EPSG:9377`** dentro de `modelo_recuperacion_ayura.gpkg` con el nombre de capa **`estaciones_gnss_validas`**.

3. **Migración de la red hidrográfica (`drenajes_ayura_9377.gpkg`):**
   * Importe los 6 tramos conectados de `drenajes_ayura_9377.gpkg` dentro de `modelo_recuperacion_ayura.gpkg` con el nombre de capa **`drenajes_ayura`**.

4. **Auditoría y saneamiento topológico predial (`predios_ribera_ayura.gpkg`):**
   * Cargue `predios_ribera_ayura.gpkg` (`36` predios catastrales en el corredor medio-bajo de La Ayurá) y audítelo con el complemento **Comprobador de Topología (*Topology Checker*)** configurando las dos reglas espaciales obligatorias:
     * `no debe superponerse` (*must not have overlaps*).
     * `no debe tener huecos` (*must not have gaps*).
   * Identifique los **3 errores topológicos** presentes en el insumo (2 solapes entre linderos y 1 hueco interior). Con el autoensamblado (*snapping*) activo, repare manualmente las geometrías mediante la **Herramienta de Vértices (*Vertex Tool*)** hasta que el comprobador reporte **0 errores**.
   * Guarde la capa corregida dentro de `modelo_recuperacion_ayura.gpkg` con el nombre exacto **`predios_topologia_valida`** y registre los 3 códigos prediales (`cod_predio`) corregidos para documentarlos en su informe.

---

### Etapa 2: Recorte por Máscara (`limite_cuenca_ayura`), Morfometría (`DEM`), Índices Sentinel-2 (`NDVI`, `NDBI`) y Depuración (`"DN" = 1`) (1.25 Puntos)

1. **Recorte de los insumos ráster al polígono de la cuenca (`limite_cuenca_ayura`) y mapa de pendientes (`pendientes_ayura_9377.tif`):**
   * Tanto el Modelo Digital de Elevación `dem_ayura_9377.tif` (`10 m`) como las 5 bandas satelitales Sentinel-2 L2A cubren un cuadrante regional completo más amplio que la cuenca (`1.160 × 720` píxeles sobre Envigado, Sabaneta, El Poblado sur y El Retiro). Por lo tanto, **todos los productos ráster finales deben quedar estrictamente recortados al polígono `limite_cuenca_ayura`** empleando *Ráster $\rightarrow$ Extracción $\rightarrow$ Cortar ráster por capa de máscara (Clip raster by mask layer)* y asignando **`-9999`** como valor `Sin datos (NoData)` fuera de la divisoria.
   * A partir de `dem_ayura_9377.tif`, calcule la **Pendiente (*Slope*)** en grados y recórtela con la capa de máscara `limite_cuenca_ayura` (o recorte primero el DEM y luego calcule la pendiente), exportando el resultado en la raíz de su carpeta como **`pendientes_ayura_9377.tif`**.

2. **Selección de bandas, recorte por máscara e índices espectrales (`ndvi_ayura_9377.tif` y `ndbi_ayura_9377.tif`):**
   * De las 5 bandas Sentinel-2 L2A suministradas, seleccione únicamente las bandas requeridas (`s2_ayura_b04_rojo.tif`, `s2_ayura_b08_nir.tif` y `s2_ayura_b11_swir1.tif`, descartando las bandas distractoras azul y verde), recórtelas con la máscara **`limite_cuenca_ayura`** (`NoData = -9999`) y calcule en la **Calculadora Ráster**:
     $$\text{NDVI} = \frac{\text{B08} - \text{B04}}{\text{B08} + \text{B04}} \qquad \qquad \text{NDBI} = \frac{\text{B11} - \text{B08}}{\text{B11} + \text{B08}}$$
   * Exporte los resultados recortados al polígono de la cuenca en `EPSG:9377` (`10 m`) en la raíz de su entrega como **`ndvi_ayura_9377.tif`** y **`ndbi_ayura_9377.tif`**, configurando su simbología en **Pseudocolor monobanda**.

3. **Clasificación biespectral de presión urbana y filtrado `"DN" = 1`:**
   * En la **Calculadora Ráster**, construya una máscara booleana que asigne `1` a los píxeles con presencia de suelo construido/expuesto ($\text{NDBI} > 0.0$) y baja cobertura vegetal ($\text{NDVI} < 0.20 + 0.01 \cdot D$, donde **$D$ es el último dígito de su documento de identidad**; por ejemplo, si su cédula termina en `7`, utilice $\text{NDVI} < 0.27$), y `0` al resto:
     $$\left(\text{"ndbi\_ayura\_9377@1"} > 0.0\right) \ * \ \left(\text{"ndvi\_ayura\_9377@1"} < (0.20 + 0.01 \cdot D)\right)$$
   * Poligonice la máscara (**Poligonizar: Ráster a Vectorial**), **descarte obligatoriamente todos los polígonos de fondo con `"DN" = 0`** y guarde únicamente los polígonos válidos con **`"DN" = 1`** dentro de `modelo_recuperacion_ayura.gpkg` con el nombre de capa **`presion_urbana_ayura`**.
   * En la tabla de atributos de `presion_urbana_ayura`, calcule el campo decimal **`area_ha`** con el área en hectáreas de cada polígono ($1\text{ ha} = 10.000\text{ m}^2$).

---

### Etapa 3: Geoprocesamiento Hidrológico-Catastral y Tablas de Atributos (1.25 Puntos)

Todas las capas vectoriales del modelo deben residir en **`modelo_recuperacion_ayura.gpkg`** (`EPSG:9377`) con los siguientes cálculos en sus **tablas de atributos** (redondeados a 2 decimales):

1. **Estadísticas morfométricas y espectrales en `limite_cuenca_ayura`:**
   * Mediante *Estadísticas de zona* y *Calculadora de campos*, asegúrese de que la tabla de atributos de `limite_cuenca_ayura` contenga los siguientes **8 campos numéricos decimales**:
     * **`area_ha`**: área total de la cuenca en hectáreas.
     * **`pend_prom`**: pendiente promedio de la cuenca en grados (calculada sobre `pendientes_ayura_9377.tif`).
     * **`ndvi_min`**, **`ndvi_max`**, **`ndvi_prom`**: mínimo, máximo y promedio del `NDVI` en la cuenca.
     * **`ndbi_min`**, **`ndbi_max`**, **`ndbi_prom`**: mínimo, máximo y promedio del `NDBI` en la cuenca.

2. **Retiro hídrico (`ronda_hidrica_ayura`):**
   * Ejecute un **Buffer** sobre `drenajes_ayura` con una distancia de **$30 + D$ metros**, donde **$D$ es el último dígito de su documento de identidad** (por ejemplo, si su cédula termina en `7`, utilice un retiro de $37\text{ metros}$), activando obligatoriamente la opción **Disolver el resultado (`Dissolve`)** para unificar el corredor sin solapes internos en las confluencias.
   * Guarde la capa en `modelo_recuperacion_ayura.gpkg` como **`ronda_hidrica_ayura`** y calcule en su tabla de atributos el campo decimal **`area_ha`**.

3. **Afectación catastral en ronda hídrica (`predios_en_ronda`):**
   * Ejecute la **Intersección** entre su capa saneada **`predios_topologia_valida`** y **`ronda_hidrica_ayura`**.
   * Guarde el resultado en `modelo_recuperacion_ayura.gpkg` como **`predios_en_ronda`** y calcule en su tabla de atributos el campo decimal **`area_afectada_ha`** con la porción restringida de cada predio en hectáreas.

4. **Zonas prioritarias de intervención (`zonas_prioritarias_ayura`):**
   * Ejecute la **Intersección** entre **`presion_urbana_ayura`** (únicamente polígonos `"DN" = 1`) y **`ronda_hidrica_ayura`**.
   * Guarde el resultado en `modelo_recuperacion_ayura.gpkg` como **`zonas_prioritarias_ayura`** y calcule en su tabla de atributos el campo decimal **`area_ha`**.

---

### Etapa 4: Plancha Cartográfica (`mapa_recuperacion_ayura.pdf`), Proyecto (`.qgz`) e Informe Técnico (`informe_recuperacion_if.pdf`) (1.25 Puntos)

1. **Mapa síntesis (`mapa_recuperacion_ayura.pdf`):**
   * Diseñe en el Compositor de Impresión de QGIS una plancha técnica en formato **A3 u horizontal** exportada en PDF a **300 dpi** que represente en jerarquía visual clara: uno de los rásteres generados (`NDVI`, `NDBI` o `Pendientes`) en pseudocolor de fondo, `limite_cuenca_ayura`, `drenajes_ayura`, `estaciones_gnss_validas`, `ronda_hidrica_ayura`, `predios_en_ronda` y las **`zonas_prioritarias_ayura`** destacadas.
   * Debe incluir obligatoriamente: **cuadrícula métrica en `EPSG:9377`** con coordenadas visibles en los bordes, flecha de norte, barra de escala gráfica y escala numérica, leyenda limpia en español (sin nombres crudos de tablas) y **membrete técnico** con su nombre completo, documento de identidad, parámetros aplicados y áreas calculadas (`ha`).

2. **Proyecto de QGIS (`proyecto_recuperacion.qgz`):**
   * Guarde el proyecto en la raíz del paquete con **rutas relativas** apuntando exclusivamente a los archivos incluidos en su carpeta.

---

## 2. Estructura y Contenido Detallado del Informe Técnico Individual (`informe_recuperacion_if.pdf` — 3 a 4 páginas)

Además del paquete geoespacial y la plancha cartográfica, debe entregar el documento **`informe_recuperacion_if.pdf`**. No incluya capturas de pantalla de menús o botones de QGIS; el informe debe ser un documento técnico de ingeniería y diseño urbano que consolide las tablas de resultados, sustente las decisiones metodológicas y formule la propuesta de intervención siguiendo esta estructura página por página:

### Sección 1. Control de Calidad Geodésico, GNSS y Topológico (Página 1)
1. **Ficha de Identificación y Parámetros de Trabajo:**
   * Tabla inicial con su nombre completo, número de documento de identidad, último dígito ($D$), distancia de retiro hídrico aplicada ($30 + D\text{ m}$), umbral de $\text{NDVI}$ utilizado ($0.20 + 0.01 \cdot D$) y sistema de referencia oficial (`EPSG:9377`).
2. **Diagnóstico Geodésico y Depuración GNSS (`estaciones_gnss_ayura.csv`):**
   * **Sustentación geodésica:** Explique conceptualmente por qué al archivo `limite_cuenca_ayura.shp` se le debía aplicar **Asignar proyección** (`EPSG:9377`), mientras que al archivo `estaciones_gnss_ayura.csv` se le debía aplicar **Reproyección** de `EPSG:4326` a `EPSG:9377`, y qué error espacial ocurriría si se invirtieran ambas operaciones.
   * **Tabla y análisis de calidad GNSS (`HDOP`):** Indique cuántas estaciones tenía el levantamiento original (`20`), cuántas cumplieron el criterio de precisión geométrica ($\text{hdop} \le 2.0$) y presente una tabla con las **estaciones descartadas ($\text{hdop} > 2.0$)** indicando su código (`id_est`), nombre, valor de `hdop`, número de satélites y la explicación física de por qué se degradó la señal en esos sitios específicos de la cuenca (efecto *multipath* por rebote en viaductos/estructuras de concreto, encañonamiento urbano o topográfico en gargantas rocosas y atenuación bajo dosel arbóreo cerrado).
3. **Auditoría y Saneamiento Topológico Catastral (`predios_ribera_ayura`):**
   * Presente una **tabla de auditoría topológica** donde identifique exactamente los **3 predios que presentaban errores topológicos** en el insumo original: su código predial (`cod_predio`), barrio, tipo de inconsistencia detectada por el *Topology Checker* (`no debe superponerse` o `no debe tener huecos`), magnitud del defecto y cómo fue corregido mediante edición de vértices (*Vertex Tool* + *Snapping*).
   * Reporte el número total de predios validados y el **área total saneada de la manzana catastral (`ha` y `m²`)** una vez alcanzados los `0` errores topológicos.

### Sección 2. Diagnóstico Morfométrico (`DEM`) y Multiespectral (`Sentinel-2`) de la Cuenca La Ayurá (Página 2)
1. **Tabla Consolidada de Indicadores de la Cuenca (`limite_cuenca_ayura`):**
   * Presente una tabla técnica bien formateada con los **8 indicadores cuantitativos** calculados sobre el polígono de la cuenca: área total (`area_ha`), pendiente media (`pend_prom` en grados), mínimo, máximo y promedio de `NDVI` (`ndvi_min`, `ndvi_max`, `ndvi_prom`), y mínimo, máximo y promedio de `NDBI` (`ndbi_min`, `ndbi_max`, `ndbi_prom`).
2. **Análisis Espacial Morfométrico (`pendientes_ayura_9377.tif`):**
   * Analice la distribución espacial del relieve y las pendientes a lo largo de la cuenca: contraste las zonas de fuerte pendiente del escarpe oriental y las cabeceras montañosas (Vereda El Vallano, Reserva El Salado y divisoria alta, donde nacen la Quebrada La Ayurá y la Quebrada La Mina) frente al piedemonte de transición y la llanura aluvial suave del tramo bajo urbano hacia la desembocadura en el Río Medellín. Explique cómo esta transición morfológica condiciona la velocidad de escorrentía y la susceptibilidad a avenidas torrenciales.
3. **Interpretación Multiespectral (`NDVI` y `NDBI`) y Presión Urbana (`presion_urbana_ayura`):**
   * Justifique físicamente por qué se seleccionaron las bandas Rojo (`B04`), Infrarrojo Cercano (`B08`) e Infrarrojo de Onda Corta (`B11`) —descartando las bandas Azul y Verde— a partir de la firma espectral de la vegetación fotosintéticamente activa y de las superficies minerales/urbanas impermeables.
   * Analice la distribución espacial del `NDVI` y del `NDBI` en La Ayurá, reportando el número de polígonos válidos (`"DN" = 1`) y el **área total en hectáreas de `presion_urbana_ayura`**, explicando por qué fue indispensable descartar los polígonos `"DN" = 0` tras la poligonización.

### Sección 3. Cruce Espacial en Ronda Hídrica y Propuesta Articulada de Intervención (Páginas 3 a 4)
1. **Tabla Síntesis del Geoprocesamiento en el Corredor Fluvial:**
   * Presente una tabla comparativa con los resultados espaciales obtenidos en el corredor hidrográfico:
     * Longitud total de la red hídrica (`drenajes_ayura`, en `m`) y área total del corredor de retiro disuelto (`ronda_hidrica_ayura`, en `ha`). Explique brevemente por qué fue necesario activar el parámetro `Dissolve` al generar el buffer sobre los 6 tramos conectados.
     * Número total de lotes catastrales intersectados en **`predios_en_ronda`** y suma total del área predial invadida dentro del retiro hídrico (**`area_afectada_ha`**).
     * Área crítica total resultante en **`zonas_prioritarias_ayura`** (`area_ha`), donde convergen simultáneamente la ronda hídrica y la presión urbana desprovista de vegetación protectora.
2. **Propuesta de Intervención Territorial Articulada (Ingeniería Civil + Diseño Urbano):**
   * A partir de la localización exacta de las `zonas_prioritarias_ayura` y de los `predios_en_ronda`, formule una estrategia integral de mitigación y ordenamiento dividida en dos componentes complementarios:
     * **Componente de Ingeniería Civil (Hidráulica, Geotecnia y Drenaje Sostenible):** Proponga medidas estructurales y no estructurales específicas para el corredor de La Ayurá y sus afluentes (Quebrada La Mina y Quebrada La Sebastiana), tales como obras de protección de márgenes contra socavación lateral, estabilización geotécnica o bioingeniería en taludes ribereños, regulación de caudales pico e implementación de Sistemas Urbanos de Drenaje Sostenible (SUDS: bio-retenedores, cunetas verdes, pavimentos permeables) en los polígonos de `presion_urbana_ayura`.
     * **Componente de Diseño Urbano y Gestión Predial:** Proponga lineamientos de intervención urbanística y paisajística para recuperar la función amortiguadora de la `ronda_hidrica_ayura`, integrando la consolidación del parque lineal y corredor ecológico de La Ayurá, la renaturalización de áreas impermeabilizadas con bajo `NDVI`, el diseño de bordes urbanos permeables y los instrumentos de gestión del suelo o reubicación/compensación aplicables sobre la porción afectada (`area_afectada_ha`) de los predios identificados en `predios_en_ronda`.

---

## 3. Estructura Única del Archivo `.zip` a Entregar y Rúbrica Oficial (5.00 Puntos)

Comprima su trabajo en un único archivo llamado **`Apellido_Nombre_Recuperacion_IF.zip`** con los siguientes **7 archivos directamente en la raíz del `.zip`** (y las **8 capas vectoriales** dentro de `modelo_recuperacion_ayura.gpkg`: `limite_cuenca_ayura`, `estaciones_gnss_validas`, `drenajes_ayura`, `predios_topologia_valida`, `presion_urbana_ayura`, `ronda_hidrica_ayura`, `predios_en_ronda` y `zonas_prioritarias_ayura`):

```text
Apellido_Nombre_Recuperacion_IF.zip
 ├── pendientes_ayura_9377.tif             (Mapa de pendientes en grados en EPSG:9377)
 ├── ndvi_ayura_9377.tif                   (Índice NDVI en EPSG:9377)
 ├── ndbi_ayura_9377.tif                   (Índice NDBI en EPSG:9377)
 ├── modelo_recuperacion_ayura.gpkg        (GeoPackage único en EPSG:9377 con las 8 capas vectoriales)
 ├── proyecto_recuperacion.qgz             (Proyecto QGIS con rutas relativas funcionales)
 ├── mapa_recuperacion_ayura.pdf           (Plancha cartográfica a 300 dpi en EPSG:9377)
 └── informe_recuperacion_if.pdf           (Informe técnico individual de 3 a 4 páginas)
```

| Etapa | Peso | Condición de Éxito (100% del Criterio) | Penalizaciones por Fallas Técnicas |
| :--- | :---: | :--- | :--- |
| **Etapa 1. Geodesia, Depuración GNSS y Saneamiento Topológico Predial** | **1.25 pts** | `limite_cuenca_ayura` con `EPSG:9377` asignado correctamente; `estaciones_gnss_validas` filtrada estrictamente con `hdop <= 2.0` y reproyectada a `EPSG:9377`; y `predios_topologia_valida` con `0` solapes y `0` huecos verificados. | `-0.4 pts` por no filtrar `hdop <= 2.0` o confundir asignar CRS con reproyectar; `-0.6 pts` si persisten solapes o huecos en `predios_topologia_valida`; `-0.25 pts` por omitir `drenajes_ayura`. |
| **Etapa 2. Recorte por Máscara, Morfometría (`DEM`), Índices (`NDVI`, `NDBI`) y Depuración (`DN = 1`)** | **1.25 pts** | `pendientes_ayura_9377.tif`, `ndvi_ayura_9377.tif` y `ndbi_ayura_9377.tif` recortados al polígono `limite_cuenca_ayura` (`NoData = -9999`) en `EPSG:9377` (`10 m`), y capa `presion_urbana_ayura` generada con umbral `0.20 + 0.01*D`, sin polígonos `"DN" = 0` y con campo `area_ha`. | `-0.4 pts` por no recortar los rásteres al polígono de la cuenca, error en pendientes o elección de bandas; `-0.5 pts` por no descartar `"DN" = 0` en `presion_urbana_ayura`; `-0.35 pts` por error en el umbral o no calcular `area_ha`. |
| **Etapa 3. Geoprocesamiento Hidrológico-Catastral y Tablas de Atributos** | **1.25 pts** | `ronda_hidrica_ayura` disuelta con distancia `30 + D` m; intersecciones `predios_en_ronda` (`area_afectada_ha`) y `zonas_prioritarias_ayura` (`area_ha`) exactas; y los 8 campos estadísticos calculados en `limite_cuenca_ayura`. | `-0.4 pts` por omitir `Dissolve` en el buffer; `-0.4 pts` por error en `predios_en_ronda` o `zonas_prioritarias_ayura`; `-0.45 pts` por omitir las estadísticas en `limite_cuenca_ayura`. |
| **Etapa 4. Mapa A3 (`300 dpi`), Proyecto `.qgz` e Informe Técnico Individual** | **1.25 pts** | `mapa_recuperacion_ayura.pdf` con grilla `EPSG:9377`, leyenda limpia, norte, escala y cajetín completo; `proyecto_recuperacion.qgz` con rutas relativas; e `informe_recuperacion_if.pdf` completo con las 3 secciones, tablas y análisis coherentes con su `.gpkg`. | `-0.4 pts` por mapa sin grilla `EPSG:9377`, leyenda truncada o sin métricas; `-0.4 pts` por rutas rotas en `.qgz`; `-0.45 pts` por omitir tablas/análisis o presentar inconsistencias en `informe_recuperacion_if.pdf`. |
| **CALIFICACIÓN TOTAL DEL TALLER DE RECUPERACIÓN** | **5.00 pts** | **Reemplaza la nota de la entrega del Informe Final (`IF`).** | |
