# Instructivo de Evaluación: Quiz 4 (Q4) — Evaluación Teórico-Práctica de Posicionamiento GNSS y Procesamiento en Gabinete
## Curso: Geomática y Sistemas de Información Geográfica (2026-1)

* **Ponderación:** 8% de la nota final del curso.
* **Modalidad:** Individual, **Teórico-Práctico** en sala de cómputo (50% Razonamiento aplicado sobre casos GNSS + 50% Procesamiento práctico en QGIS).
* **Duración:** 45 minutos.
* **Alcance temático:** Evalúa los fundamentos físicos y geométricos del posicionamiento satelital GNSS (trilateración y sesgo de reloj $\delta t$, diferencia entre geometría `DOP` y rebote local *multipath*, alcances del posicionamiento diferencial frente a distintos tipos de error, selección de método autónomo/DGPS/RTK según tolerancia de ingeniería) junto con el procesamiento práctico en QGIS de datos crudos capturados en campo (`.gpx` y `.csv` en `EPSG:4326`), su depuración por calidad (`HDOP`), estandarización a **MAGNA-SIRGAS / Origen Nacional (`EPSG:9377`)** y auditoría frente a vértices oficiales IGAC.
* **Insumos de Datos (Caso Nuevo — Corredor Hidráulico Quebrada La Iguaná):** Carpeta `insumos_q4/` de la evaluación:
  * `traza_cruda_iguana.gpx`: Captura de navegador Garmin a lo largo del corredor de la Quebrada La Iguaná (Sector Facultad de Minas – San Germán – Calle 65). Incluye las subcapas **`waypoints`** (6 estaciones de control `IGU-01` a `IGU-06`) y **`track_points`** (120 puntos cinemáticos crudos cada 3 s).
  * `smartphone_iguana_crudo.csv`: Tabla de coordenadas en grados decimales (`EPSG:4326`) tomada simultáneamente con un Smartphone en las mismas 6 estaciones (`IGU-01` a `IGU-06`).
  * `vertices_igac_iguana.gpkg`: Capa `vertices_igac_iguana` en **`EPSG:9377`** con las placas oficiales de control del IGAC para las 6 estaciones del corredor.

---

## 1. Contexto Técnico del Caso Evaluado

Una firma de ingeniería hidráulica realizó el reconocimiento de **6 estaciones de control (`IGU-01` a `IGU-06`)** a lo largo del corredor de la **Quebrada La Iguaná** (entre la Facultad de Minas, el viaducto del Metro en Blanquizal, el callejón de las Torres de San Germán y el puente de la Calle 65), registrando simultáneamente con un receptor **Garmin** y un **Smartphone**.

Durante el recorrido en distintos tramos del corredor se presentaron variaciones en las condiciones de visibilidad y recepción satelital. Su misión es **procesar, depurar y estandarizar en QGIS los datos capturados** (Parte Práctica — 2.5 pts) y **resolver 5 casos de diagnóstico técnico razonado** (Parte Teórica Aplicada — 2.5 pts).

---

## 2. Parte Práctica: Resultados Requeridos en QGIS (2.5 Puntos — 22 min)

A partir de los insumos de la carpeta `insumos_q4/`, realice el procesamiento necesario en QGIS para entregar los siguientes productos y mediciones estandarizados en **`EPSG:9377` (MAGNA-SIRGAS / Origen-Nacional)**:

### Producto 1: GeoPackage consolidado (`quiz4_iguana_9377.gpkg`)
Debe contener exactamente las siguientes **3 capas vectoriales**, todas proyectadas correctamente en **`EPSG:9377`**:
1. **`traza_depurada_9377`:** Puntos de la traza cinemática del Garmin (`track_points`) que cumplan estrictamente con el criterio de calidad geométrica $\text{HDOP} \le 2.0$ (descartando los registros degradados con $\text{HDOP} > 2.0$).
2. **`waypoints_garmin_9377`:** Las 6 estaciones de control (`IGU-01` a `IGU-06`) capturadas con el navegador Garmin (sin descartar ninguna estación).
3. **`puntos_smartphone_9377`:** Las 6 estaciones de control (`IGU-01` a `IGU-06`) importadas a partir de `smartphone_iguana_crudo.csv`.

### Producto 2: Mediciones de auditoría frente al IGAC (a reportar en `respuestas_q4.pdf`)
Contrastando las capas generadas contra los vértices oficiales de `vertices_igac_iguana.gpkg`, obtenga y reporte en su documento de respuestas:
1. **Balance de depuración de la traza:** Número total de puntos originales en `track_points`, número de puntos limpios conservados ($\text{HDOP} \le 2.0$) y número de puntos descartados ($\text{HDOP} > 2.0$).
2. **Error horizontal en metros frente al vértice oficial IGAC:**
   * En la estación **`IGU-02` (Mojón Explanada Facultad de Minas):** distancia de error horizontal (m) del punto **Garmin** y del punto **Smartphone** respecto a la placa IGAC.
   * En la estación **`IGU-05` (Callejón Torres de San Germán):** distancia de error horizontal (m) del punto **Garmin** y del punto **Smartphone** respecto a la placa IGAC.
3. **Atributos de recepción en `IGU-03` (Viaducto del Metro) e `IGU-04` (Dosel arbóreo):** valores de `sat` y `hdop` registrados en ambas estaciones.

---

## 3. Parte Teórica Aplicada: Diagnóstico y Razonamiento GNSS (2.5 Puntos — 23 min)

En el documento **`respuestas_q4.pdf`**, responda con sus propias palabras (2 a 4 líneas por caso, argumentando a partir de los principios físicos y geométricos vistos en clase y de la evidencia de las capas cargadas) los siguientes **5 escenarios de ingeniería**:

* **CASO 1 — Cantidad de satélites vs. Geometría real (`DOP`):**  
  Un auxiliar de campo afirma: *"Mientras mi receptor vea al menos 6 o 7 satélites, la precisión horizontal siempre será buena ($\text{HDOP} < 1.5$)"*. Sin embargo, al revisar en un callejón profundo un punto con 6 satélites visibles, el receptor reporta un `HDOP = 4.9`. Determine **si el auxiliar está en lo correcto o no** y explique físicamente **cómo es posible tener suficientes satélites (más del mínimo de 4) y aun así obtener un `HDOP` tan alto**.

* **CASO 2 — Evaluación de propuesta de corrección diferencial (`NTRIP`) en `IGU-05`:**  
  Al ver que en la estación `IGU-05` (Callejón Torres de San Germán) el error supera los $12\text{ m}$, el residente de obra propone activar por internet la corrección diferencial en tiempo real (`NTRIP`) conectándose a la estación base continua del IGAC ubicada en la azotea despejada de una universidad a $3\text{ km}$ de distancia, asegurando que *"como la base elimina los errores GNSS, el error observado en San Germán desaparecerá"*. Determine **si el residente de obra está en lo correcto o no** y justifique físicamente su respuesta.

* **CASO 3 — Diagnóstico comparativo entre estaciones (`IGU-03` vs. `IGU-04`) y receptores:**  
  Inspeccione en QGIS los atributos y la posición de `waypoints_garmin_9377` y `puntos_smartphone_9377` frente al IGAC en las estaciones **`IGU-03`** (bajo el viaducto de concreto del Metro) e **`IGU-04`** (bajo el dosel de árboles de la pasarela peatonal). A partir de los datos observados (`sat`, `hdop` y error horizontal), identifique **cuál de los equipos y cuál de las estaciones presenta mayor degradación, y explique físicamente por qué ocurre en cada caso**.

* **CASO 4 — El 4.° satélite, el reloj de cuarzo y la componente vertical (`VDOP` vs. `HDOP`):**  
  a) Si el reloj de cuarzo de un receptor tuviera una deriva no corregida de apenas **dos microsegundos ($2\ \mu\text{s}$)** respecto a los relojes atómicos de los satélites, ¿de cuántos metros sería aproximadamente el error inducido en la pseudodistancia y por qué el **4.° satélite** permite resolver este problema sin comprar un reloj atómico?  
  b) Incluso en la estación más despejada del corredor (`IGU-02`, Explanada Facultad de Minas), el equipo podría usarse para medir coordenadas $(E, N)$ de un sendero, pero **no** para chequear la pendiente longitudinal de una tubería de alcantarillado por gravedad. Más allá del método autónomo, explique geométricamente **cómo se compara en cualquier levantamiento GNSS la precisión vertical (`VDOP`) frente a la horizontal (`HDOP`), por qué ocurre esto** y qué método GNSS requeriría si necesitara levantar cotas de alcantarillado a cielo abierto.

* **CASO 5 — Diagnóstico de falla de georreferenciación al importar el CSV:**  
  Al importar `smartphone_iguana_crudo.csv`, un compañero seleccionó directamente **`EPSG:9377`** dentro de la ventana *"Añadir capa de texto delimitado"* porque pensó que así ahorraba el paso de exportar. Cuando hizo clic en *"Zoom a la capa"*, sus 6 puntos aparecieron a miles de kilómetros de Medellín. Explique matemáticamente **qué interpretó QGIS con los números `-75.59...` y `6.27...` al asignarle `EPSG:9377` en la lectura** y cuál es la diferencia conceptual entre **declarar el CRS de origen** y **reproyectar al exportar**.

---

## 4. Entregables (`apellido_nombre_Q4.zip`)

Entregue un único archivo comprimido llamado **`apellido_nombre_Q4.zip`** que contenga:

1. **`quiz4_iguana_9377.gpkg`:** GeoPackage con las 3 capas solicitadas (`traza_depurada_9377`, `waypoints_garmin_9377` y `puntos_smartphone_9377`) en `EPSG:9377`.
2. **`respuestas_q4.pdf`:** Documento corto en formato **PDF** (con su nombre completo) que incluya:
   * **Parte Práctica:** Conteo de puntos de la traza (originales, limpios y descartados), errores horizontales en metros medidos frente al IGAC en `IGU-02` e `IGU-05` (Garmin y Smartphone), y valores de `sat` y `hdop` en `IGU-03` e `IGU-04`.
   * **Parte Teórica Aplicada:** Sus respuestas argumentadas a los **Casos 1 a 5**.

---

## 5. Rúbrica de Calificación (Total: 5.0 Puntos)

| Componente | Criterio Evaluado | Peso | Condición de Éxito (100% del ítem) | Penalización por Falla Típica |
| :--- | :--- | :---: | :--- | :--- |
| **Práctico (2.5 pts)** | **P1. GeoPackage `quiz4_iguana_9377.gpkg` (GPX depurado + Waypoints + CSV en `EPSG:9377`)** | **1.5 pts** | Contiene las 3 capas solicitadas (`traza_depurada_9377` depurada por calidad, `waypoints_garmin_9377` y `puntos_smartphone_9377`) reproyectadas correctamente a **`EPSG:9377`** sobre el corredor de La Iguaná. | `-0.5 pts` por capa omitida, sin depurar o con sistema de referencia incorrecto. |
| **Práctico (2.5 pts)** | **P2. Medición de Errores Horizontales y Atributos (`IGU-02`, `IGU-03`, `IGU-04`, `IGU-05`)** | **1.0 pt** | Reporta en `respuestas_q4.pdf` el conteo exacto de puntos (originales, limpios y descartados), las 4 distancias horizontales en metros respecto al IGAC ($\pm 0.3\text{ m}$) y los atributos de `IGU-03` e `IGU-04`. | `-0.2 pts` por cada medición omitida o incorrecta (hasta el tope de `1.0 pt`). |
| **Teórico-Aplicado (2.5 pts)** | **T1–T5. Cinco Casos de Razonamiento y Diagnóstico GNSS (`0.5 pts` c/u)** | **2.5 pts** | Explica con rigor causal en `respuestas_q4.pdf` cada escenario a partir de los principios físicos/geométricos y la evidencia de las capas del corredor. | `-0.25 a -0.5 pts` por caso si responde con definiciones genéricas sin explicar el porqué físico/matemático o sin vincularlo con los datos del corredor. |
| **TOTAL** | **QUIZ 4 (TEÓRICO-PRÁCTICO)** | **5.0 pts** | | |
