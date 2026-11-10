# G11: Posicionamiento Satelital GNSS en Gabinete — Fundamentos Físicos, Control de Calidad (`HDOP` / *Multipath*) y Auditoría en QGIS

**Sesión del Jueves 22 de octubre (Semana 14) · Parte A: Módulo 3 — Sistemas Globales de Navegación por Satélite (GNSS) y Auditoría Posicional en Gabinete.**  
En este taller teórico-práctico desarrollaremos a fondo los principios físicos, geométricos y diferenciales del posicionamiento satelital **GNSS**, aprenderemos a diagnosticar por qué fallan las mediciones en cañones urbanos o bajo cobertura arbórea y ejecutaremos en **QGIS** un protocolo completo de auditoría de calidad sobre datos reales capturados en el **Campus de la Universidad EAFIT** (`insumos_g11_gnss/`), contrastando un navegador **Garmin** y un **Smartphone** contra vértices oficiales de referencia en **MAGNA-SIRGAS / Origen Nacional (`EPSG:9377`)**.

> [!IMPORTANT]
> **Preparación directa para el Quiz 4 (`Q4` — 8%, Semana 15):**  
> Este taller y sus lecturas complementarias constituyen la base de estudio para el **Quiz 4 (teórico-práctico individual en QGIS)** de la próxima semana. En la clase de hoy trabajaremos con el levantamiento del **Campus EAFIT (`EST-01` a `EST-08`)**, mientras que en el Quiz 4 procesarán y analizarán un levantamiento distinto sobre el corredor de la **Quebrada La Iguaná**.

---

## 1. Marco Teórico Profundizado: ¿Cómo Funciona Realmente el Posicionamiento GNSS?

### 1.1 GNSS vs. GPS y los Tres Segmentos del Sistema
**GNSS (*Global Navigation Satellite System*)** es el término genérico que agrupa a todas las constelaciones orbitales de posicionamiento global. **GPS** es únicamente la constelación estadounidense. Un receptor moderno (incluso un teléfono inteligente actual o una antena topográfica) es **multiconstelación**, es decir, escucha simultáneamente satélites de cuatro grandes redes en **Órbita Terrestre Media ($\text{MEO} \approx 19\,100\text{ a }21\,500\text{ km}$ de altitud, con periodo orbital de $\approx 12\text{ horas}$)**:

| Constelación | País / Agencia | Satélites Operativos | Altitud Orbital | Frecuencias Civiles Principales (Banda L) |
|---|---|:---:|:---:|---|
| **GPS (NAVSTAR)** | Estados Unidos (USSF) | $\sim 31$ | $20\,200\text{ km}$ | $L1\ (1575.42\text{ MHz})$, $L2C\ (1227.60\text{ MHz})$, $L5\ (1176.45\text{ MHz})$ |
| **GLONASS** | Rusia (Roscosmos) | $\sim 24$ | $19\,100\text{ km}$ | $G1\ (\sim 1602\text{ MHz})$, $G2\ (\sim 1246\text{ MHz})$ — excelente en altas latitudes |
| **Galileo** | Unión Europea (ESA / EUSPA) | $\sim 26$ | $23\,222\text{ km}$ | $E1\ (1575.42\text{ MHz})$, $E5a\ (1176.45\text{ MHz})$, $E5b\ (1207.14\text{ MHz})$ |
| **BeiDou (BDS-3)** | China (CNSA) | $\sim 35+$ | $21\,528\text{ km}$ (+ GEO/IGSO) | $B1I / B1C$, $B2a$, $B3I$ |

Toda infraestructura GNSS opera mediante **tres segmentos acoplados**:
1. **Segmento Espacial:** Los satélites que transmiten continuamente señales de radiofrecuencia con su posición orbital (**efemérides**) y la hora exacta medida por **relojes atómicos de cesio o rubidio** a bordo.
2. **Segmento de Control (Tierra):** Red global de estaciones terrestres que rastrean los satélites, calculan las correcciones de sus órbitas y sincronizan sus relojes atómicos enviándoles actualizaciones (*enlace ascendente / uplink*).
3. **Segmento de Usuario:** Los receptores en tierra (smartphones, navegadores de mano, receptores geodésicos). **Importante:** el receptor del usuario es **100% pasivo** (solo *escucha* la señal descendente de los satélites; nunca transmite señal hacia los satélites).

---

### 1.2 La Ecuación de Pseudodistancia: ¿Por qué se requieren MÍNIMO 4 satélites?
El receptor mide el tiempo aparente de viaje ($\Delta t_i$) que tarda la onda de radio desde el satélite $i$ hasta la antena y lo multiplica por la velocidad de la luz ($c \approx 300\,000\text{ km/s} = 3 \times 10^8\text{ m/s}$).

- **El problema físico del reloj:** Cada satélite lleva relojes atómicos de altísima estabilidad, pero el receptor del usuario (un celular o un Garmin) tiene un **reloj de cuarzo económico** que sufre un **sesgo o adelanto/atraso de sincronización ($\delta t$)** respecto al tiempo atómico.
- **¿Cuánto afecta un microsegundo de desfase?** Como la luz viaja a $300\,000\text{ km/s}$, un error de apenas **$1\text{ microsegundo } (10^{-6}\text{ s})$** en el reloj del receptor produce un error de distancia de:
  $$\Delta D = c \cdot \delta t = (3 \times 10^8\text{ m/s}) \times (10^{-6}\text{ s}) = \mathbf{300\text{ metros de error}}$$
- Por esta razón, las distancias medidas inicialmente se llaman **pseudodistancias ($\rho_i$)** y el sistema tiene **4 incógnitas**: las tres coordenadas geocéntricas del receptor **$(X, Y, Z)$** más el **sesgo del reloj del receptor ($\delta t$)**:
  $$\rho_i = \sqrt{(X_i - X)^2 + (Y_i - Y)^2 + (Z_i - Z)^2} + c \cdot \delta t$$

| Número de Satélites Visibles | Lugar Geométrico en el Espacio 3D | ¿Se puede obtener la posición 3D real? |
|:---:|---|---|
| **1 satélite** | Una **superficie esférica 3D** centrada en el satélite $S_1$. | **No.** Existen infinitos puntos sobre la esfera. |
| **2 satélites** | La intersección de dos esferas forma un **anillo o circunferencia 3D**. | **No.** Existen infinitos puntos sobre ese anillo circular. |
| **3 satélites** | La tercera esfera corta el anillo en **2 puntos discretos** (uno en el espacio exterior, que se descarta, y uno sobre la Tierra). | **Solo si el reloj del receptor fuera atómico y perfecto ($\delta t = 0$).** En un receptor real, el error $\delta t$ infla o encoge las 3 esferas cientos de metros. |
| **4 satélites (Mínimo obligatorio)** | Cuatro ecuaciones independientes para resolver las **4 incógnitas $(X, Y, Z, \delta t)$**. | **Sí.** El 4.° satélite permite despejar simultáneamente la posición 3D exacta y corregir el sesgo del reloj $\delta t$. |

---

### 1.3 Fuentes de Error y la Diferencia Crítica entre `DOP` y *Multipath*
Un error conceptual muy frecuente es confundir el **número de satélites**, la **geometría de la constelación (`DOP`)** y el **rebote de señal (*Multipath*)**. Aunque suelen ocurrir juntos en cañones urbanos, son fenómenos físicamente distintos:

1. **Dilución de la Precisión (`DOP — Dilution of Precision`):**
   - Es un factor puramente **geométrico** (adimensional) que multiplica el error base del receptor según cómo estén distribuidos los satélites en el cielo:
     $$\sigma_{\text{posición}} = \text{DOP} \times \sigma_{\text{rango (UERE)}}$$
   - **Caso A — Buen DOP ($\text{HDOP} \le 1.5$):** Los satélites están ampliamente repartidos por toda la bóveda celeste (norte, sur, este, oeste y cenit). Las esferas se cortan en ángulos cercanos a $90^\circ$ y la zona de intersección es muy pequeña.
   - **Caso B — Mal DOP ($\text{HDOP} > 3.0$):** Aunque el receptor vea **6 o 7 satélites**, si todos están **agrupados en una sola franja estrecha del cielo** (por ejemplo, alineados justo encima de una calle encañonada entre edificios o montañas), las esferas se cortan de forma casi rasante y la elipse de incertidumbre se alarga enormemente.
   - **Componentes del DOP:**
     - `HDOP` (*Horizontal DOP*): Califica la precisión en el plano horizontal $(E, N)$. **Es nuestro filtro principal en SIG ($\text{HDOP} \le 2.0$).**
     - `VDOP` (*Vertical DOP*): Califica la precisión en altitud ($Z$). Siempre es mayor que el `HDOP` ($\text{VDOP} > \text{HDOP}$) porque todos los satélites visibles están por encima del horizonte y ninguno tira desde abajo de nuestros pies.
     - `PDOP` (*Position 3D DOP*): Combina ambos en 3D: $\text{PDOP} = \sqrt{\text{HDOP}^2 + \text{VDOP}^2}$.

2. **Efecto Multicamino (*Multipath*):**
   - Es un fenómeno físico de **reflexión de ondas**: la señal del satélite choca y rebota contra fachadas de vidrio, muros de concreto, techos metálicos o espejos de agua antes de entrar a la antena.
   - Como el **camino quebrado (con rebote) es siempre más largo que la línea recta directa**, el receptor mide un tiempo de vuelo mayor ($\Delta t_{\text{rebote}} > \Delta t_{\text{directo}}$) y desplaza falsamente el punto entre **$5\text{ m y }20\text{ m}$** (haciendo que en el mapa la traza parezca saltar hacia adentro de los edificios).
   - **¡Atención para análisis crítico!:** El *multipath* es un error **estrictamente local** del entorno de la antena móvil; **no se corrige** ni siquiera con una estación base diferencial (DGPS/RTK), porque la estación base ubicada a kilómetros en una azotea despejada no sufre los mismos rebotes contra el edificio que tienes al lado.

3. **Retardos Atmosféricos (Ionosfera y Troposfera):**
   - **Ionosfera ($60\text{–}1\,000\text{ km}$):** Capa de electrones libres cargados por radiación solar. Es un medio **dispersivo** (el retardo depende de la frecuencia de la onda, $\propto 1/f^2$). Por eso los receptores geodésicos usan **doble frecuencia ($L1 + L2$ o $L1 + L5$)**: al comparar cuánto se retrasó $L1$ frente a $L2$, eliminan el $99.9\%$ del retardo ionosférico.
   - **Troposfera ($0\text{–}16\text{ km}$):** Gases secos y vapor de agua. Es un medio **no dispersivo** (afecta igual a $L1$ y $L2$) y se mitiga con modelos meteorológicos y aplicando una **máscara de elevación $> 15^\circ$** sobre el horizonte.

---

### 1.4 Tecnologías de Posicionamiento: ¿Por qué el RTK alcanza $1\text{–}2\text{ cm}$ y el Navegador $3\text{–}10\text{ m}$?

| Método | ¿Qué mide de la onda satelital? | ¿Usa Estación Base de corrección? | Precisión Horizontal ($RMS$) | Uso Correcto e Incorrecto en Ingeniería |
|---|---|---|:---:|---|
| **1. Navegador Autónomo (Garmin / Smartphone)** | **Código binario ($C/A$)** (longitud de chip $\approx 300\text{ m}$). | **No** (opera solo). | **$3.0\text{ m a }10.0\text{ m}$** (hasta $>15\text{ m}$ en cañón urbano). | **Sí:** Reconocimiento preliminar, rutas, inventarios rápidos.<br>**No:** Linderos prediales, replanteo de vías ni cotas de alcantarillado. |
| **2. Diferencial por Código (DGPS / SBAS)** | **Código binario ($C/A$)** corregido diferencialmente. | **Sí** (corrección de pseudodistancias desde base conocida). | **$0.5\text{ m a }1.5\text{ m}$** (submétrico). | **Sí:** Inventario de arbolado urbano, postes, mobiliario y SIG municipal. |
| **3. Geodésico Diferencial por Fase (RTK / PPK)** | **Fase de la onda portadora ($L1/L2$)** (longitud de onda $\lambda \approx 19\text{ cm}$). | **Sí** (Estación Base fija en vértice IGAC / Red CORS vía Radio o NTRIP). | **$0.01\text{ m a }0.02\text{ m}$** ($1\text{ a }2\text{ cm}$). | **Sí:** Topografía de obra civil, puentes, linderos legales, puntos de fotocontrol (GCP) para drones. |

> [!TIP]
> **¿Cómo funciona la corrección diferencial (Base + Rover en RTK/PPK)?**  
> Se instala una **Estación Base fija** sobre un mojón con coordenadas exactas ya conocidas (p. ej., un vértice de la red **MAGNA-ECO del IGAC**). Como la Base sabe exactamente dónde está, calcula en cada segundo el error común (relojes satelitales, efemérides, ionosfera y troposfera) y le transmite esa corrección al receptor **Móvil (*Rover*)** por radio o internet móvil (**NTRIP**). Si en campo no hay señal de celular ni radio para transmitir en tiempo real (**RTK**), ambos equipos guardan los datos crudos (formato **RINEX**) y se corrigen al regresar a la oficina (**PPK — Post-Processed Kinematics**), logrando la misma precisión centimétrica.

---

## 2. Práctica Guiada Completa en QGIS: Auditoría del Levantamiento en el Campus EAFIT

En la carpeta adjunta [`insumos_g11_gnss/`](insumos_g11_gnss/) cuentan con un levantamiento real sobre el campus de la Universidad EAFIT compuesto por:
1. **`traza_cruda_eafit.gpx`** (y su copia `campo_garmin_crudo.gpx`): Archivo GPX capturado con navegador **Garmin GPSMAP 66sr**. Contiene:
   - Subcapa **`waypoints`**: **8 estaciones de control (`EST-01` a `EST-08`)** medidas en entornos contrastantes (cielo abierto, dosel arbóreo y cañones urbanos junto a edificios altos).
   - Subcapa **`track_points`**: **180 puntos continuos** grabados cada 2 segundos a lo largo de los senderos peatonales del campus.
2. **`campo_smartphone_crudo.csv`**: Tabla CSV capturada simultáneamente en las mismas 8 estaciones (`EST-01` a `EST-08`) con un **Smartphone (receptor L1 C/A)**.
3. **`vertices_control_igac.gpkg`** (y `vertices_control_igac.csv`): Coordenadas oficiales de referencia de las 8 estaciones en **`EPSG:9377` (MAGNA-SIRGAS / Origen-Nacional)**.

---

### Paso 1: Ingesta del Archivo `.gpx` y Auditoría de la Traza Continua (`track_points`)

1. Abran un proyecto nuevo en QGIS y verifiquen en la esquina inferior derecha que el SRC del proyecto sea **`EPSG:9377`**.
2. Carguen primero la capa de referencia **`insumos_g11_gnss/vertices_control_igac.gpkg`** y activen de fondo el mapa base **OpenStreetMap** o la **Ortofoto de GeoMedellín / Google Satellite**.
3. Arrastren al lienzo el archivo **`insumos_g11_gnss/traza_cruda_eafit.gpx`**. En la ventana emergente marquen las subcapas **`waypoints`** (8 objetos) y **`track_points`** (180 objetos) y pulsen **Añadir capas**.
   - *Observación crítica:* El estándar internacional `.gpx` almacena coordenadas **siempre en grados decimales sobre el elipsoide WGS 84 (`EPSG:4326`)**.
4. **Inspección visual de los saltos por *Multipath*:**
   - Acérquense al pasillo entre el **Bloque 19 (Ingenierías)**, el **Bloque Argos** y la **Biblioteca (Bloque 32)**.
   - Verán que varios puntos de `track_points` se salen bruscamente del sendero peatonal y **caen encima de los techos de los edificios**.
5. **Auditoría de la tabla de atributos y filtrado por `HDOP`:**
   - Abran la tabla de atributos (`F6`) de `track_points`: notarán las columnas `ele` (altura elipsoidal), `time` (hora UTC cada 2 s), `sat` (satélites usados), `hdop`, `vdop` y `pdop`.
   - En los puntos que saltaron dentro de los edificios, el número de satélites cae a `4–6` y el **`hdop` se dispara entre `3.1` y `6.2`**.
   - Hagan clic derecho sobre `track_points` $\rightarrow$ **Filtrar...** (*Query Builder*) e ingresen la regla de control de calidad geométrica:
     ```sql
     "hdop" <= 2.0
     ```
   - Hagan clic en **Aceptar**: comprobarán que de los **180 puntos crudos**, quedan exactamente **156 puntos limpios** sobre los senderos peatonales y **desaparecen los 24 saltos aberrantes** dentro de los edificios.
6. **Exportación al GeoPackage oficial en `EPSG:9377`:**
   - Clic derecho sobre `track_points` (ya filtrada) $\rightarrow$ **Exportar → Guardar objetos como...**:
     - **Formato:** `GeoPackage`
     - **Nombre de archivo:** `auditoria_eafit_9377.gpkg`
     - **Nombre de la capa:** `traza_depurada_9377`
     - **SRC:** **`EPSG:9377 - MAGNA-SIRGAS / Origen-Nacional`**
   - Clic derecho sobre `waypoints` (sin filtrar, conservando las 8 estaciones) $\rightarrow$ **Exportar → Guardar objetos como...** al mismo `auditoria_eafit_9377.gpkg` con nombre de capa **`waypoints_garmin_9377`** y SRC **`EPSG:9377`**.

---

### Paso 2: Ingesta de la Tabla `.csv` del Smartphone y Trampa de Proyección

1. Vayan a **Capa → Añadir capa → Añadir capa de texto delimitado...** y seleccionen **`insumos_g11_gnss/campo_smartphone_crudo.csv`**.
2. En **Definición de geometría**, seleccionen **Coordenadas de punto**:
   - **Campo X:** `lon` (Longitud $\approx -75.578^\circ$)
   - **Campo Y:** `lat` (Latitud $\approx +6.200^\circ$)
   - **SRC de la geometría:** **`EPSG:4326 - WGS 84`**
   > [!CAUTION]
   > **¿Por qué NUNCA debemos poner `EPSG:9377` al abrir un CSV que viene en grados decimales?**  
   > Porque los números del CSV son `-75.57` y `6.20` (grados). Si le dicen a QGIS que esos números son metros de Origen Nacional (`EPSG:9377`), QGIS ubicará los puntos a $75\text{ metros}$ del origen falso $(0, 0)$ en el océano Pacífico, a miles de kilómetros de Medellín. **Regla de oro:** Primero se lee en su sistema nativo (`EPSG:4326`) y luego se exporta/reproyecta a `EPSG:9377`.
3. Una vez cargada la capa en el lienzo, hagan clic derecho $\rightarrow$ **Exportar → Guardar objetos como...** dentro del mismo GeoPackage `auditoria_eafit_9377.gpkg`, con nombre de capa **`puntos_smartphone_9377`** y SRC **`EPSG:9377`**.

---

### Paso 3: Cálculo Automático y Medición del Error Horizontal frente a los Vértices IGAC

Ahora tenemos en `EPSG:9377` (unidades en metros) las tres fuentes: la referencia oficial (`vertices_control_igac`), el navegador Garmin (`waypoints_garmin_9377`) y el teléfono inteligente (`puntos_smartphone_9377`).

1. **Medición interactiva con `Medir línea` (`Ctrl + Shift + M`):**
   - Seleccionen modo **Cartesiano** (metros) y midan la distancia desde el vértice oficial IGAC hasta el punto Garmin y hasta el punto Smartphone en cada estación.
2. **Tabla completa de resultados del Campus EAFIT para verificar en clase:**

| Estación | Ubicación en el Campus EAFIT | Entorno Físico | Satélites (Garmin / Smart.) | `HDOP` (Garmin / Smart.) | Error Garmin vs. IGAC ($\text{m}$) | Error Smartphone vs. IGAC ($\text{m}$) | Diagnóstico Técnico |
|:---:|---|---|:---:|:---:|:---:|:---:|---|
| **`EST-01`** | Placa Portería Las Vegas | Cielo abierto | $13\ /\ 12$ | $1.2\ /\ 1.5$ | **$2.19\text{ m}$** | **$3.19\text{ m}$** | Precisión normal de código autónomo. |
| **`EST-02`** | Placa Cancha Sintética (NE) | Cielo abierto | $15\ /\ 14$ | $0.9\ /\ 1.1$ | **$1.63\text{ m}$** | **$2.48\text{ m}$** | **Mejor punto del campus** (horizonte despejado). |
| **`EST-03`** | Esquina NE Bloque 19 (Ingenierías) | **Cañón urbano** | $5\ /\ 5$ | $4.2\ /\ 4.9$ | **$11.33\text{ m}$** | **$15.29\text{ m}$** | **Peor punto:** rebote *multipath* en fachada de 8 pisos + alto `HDOP`. |
| **`EST-04`** | Esquina SE Bloque Argos | **Cañón urbano** | $6\ /\ 5$ | $3.6\ /\ 4.3$ | **$9.44\text{ m}$** | **$12.97\text{ m}$** | Fuerte desviación por obstrucción de horizonte. |
| **`EST-05`** | Puente Quebrada La Volcana | Dosel arbóreo | $8\ /\ 8$ | $2.2\ /\ 2.5$ | **$4.24\text{ m}$** | **$6.01\text{ m}$** | Atenuación y dispersión moderada por follaje. |
| **`EST-06`** | Plazoleta del Estudiante | Cielo abierto | $14\ /\ 13$ | $1.0\ /\ 1.3$ | **$1.77\text{ m}$** | **$2.62\text{ m}$** | Geometría óptima ($\text{HDOP} \le 1.3$). |
| **`EST-07`** | Pasillo Bloques 28–29 | **Cañón urbano** | $5\ /\ 5$ | $3.8\ /\ 4.5$ | **$8.71\text{ m}$** | **$11.83\text{ m}$** | Rebote especular entre edificios contiguos. |
| **`EST-08`** | Esquina SO Biblioteca (Bloque 32) | **Cañón urbano** | $6\ /\ 6$ | $3.3\ /\ 3.9$ | **$8.56\text{ m}$** | **$11.78\text{ m}$** | Degradación severa junto al bloque de Biblioteca. |

---

## 3. Preguntas de Razonamiento Aplicado (Entrenamiento para la Parte Teórica del Quiz 4)

En el **Quiz 4** no se harán preguntas de memorización literal, sino de **diagnóstico e interpretación de casos**. Analicen y discutan estos 4 escenarios reales:

1. **Escenario A (Muchos satélites pero mal `HDOP`):**  
   *Un topógrafo está en el fondo de una calle estrecha flanqueada por edificios de 15 pisos. Su receptor indica que capta **7 satélites**, pero el `HDOP` marca **`5.8`**. ¿Por qué el `HDOP` es tan malo si tiene más de los 4 satélites mínimos?*  
   $\rightarrow$ **Razonamiento:** Porque los 7 satélites están **alineados en una franja estrecha del cenit** (el callejón bloquea todos los satélites bajos del este y del oeste). Al no haber apertura angular entre los satélites, las esferas de distancia se cortan de forma casi paralela y multiplican cualquier pequeño error por $5.8$.

2. **Escenario B (¿La estación base corrige el *multipath*?):**  
   *Un ingeniero cree que conectando su receptor a la estación base del IGAC (modo DGPS/RTK) eliminará automáticamente el error de rebote (*multipath*) contra la fachada de vidrio del Bloque 19. ¿Tiene razón?*  
   $\rightarrow$ **Razonamiento:** **No.** La corrección diferencial (DGPS/RTK) solo elimina los **errores comunes** entre la Base y el Rover (atmósfera, relojes de los satélites y órbitas). El rebote en la fachada del Bloque 19 ocurre únicamente en los últimos metros junto a la antena del Rover; la estación base no sufre ese rebote y por tanto no puede adivinarlo ni restarlo.

3. **Escenario C (Por qué la altura GNSS siempre es más imprecisa que la posición horizontal):**  
   *En la tabla de `waypoints`, notarán que en todas las estaciones del campus se cumple que `vdop > hdop` (por ejemplo, en `EST-02`, `hdop = 0.9` y `vdop = 1.3`). ¿Cuál es la razón física y geométrica?*  
   $\rightarrow$ **Razonamiento:** Horizontalmente recibimos señales de satélites ubicados en los $360^\circ$ alrededor nuestro (norte, sur, este y oeste se compensan entre sí). Verticalmente, la Tierra bloquea toda señal por debajo del horizonte: **todos los satélites tiran únicamente desde arriba**, haciendo que la intersección vertical ($Z$) sea geométricamente más débil ($\approx 1.5\text{ a }2\text{ veces}$ menos precisa que la horizontal).

4. **Escenario D (Criterio de selección de equipo según tolerancia de proyecto):**  
   *Deben levantar: (a) la ubicación general de 200 árboles en un parque metropolitano (tolerancia $\pm 1.5\text{ m}$), y (b) las cotas de batea de las cámaras de alcantarillado de una avenida (tolerancia $\pm 0.02\text{ m}$). ¿Qué tecnología GNSS eligen para cada caso?*  
   $\rightarrow$ **Razonamiento:** Para (a) basta un receptor **DGPS submétrico**, pero para (b) una pendiente hidráulica no admite errores de metros ni decímetros: exige obligatoriamente **GNSS Geodésico RTK/PPK de doble frecuencia** (o nivelación topográfica convencional).

---

## 4. Lecturas Adicionales y Recursos de Estudio Recomendados

Para profundizar los conceptos evaluados en el **Quiz 4**, revisen las siguientes lecturas técnicas abiertas y oficiales:

1. **IGAC — Instituto Geográfico Agustín Codazzi (Colombia):**
   - *Guía Metodológica para la Obtención de Coordenadas mediante Posicionamiento Satelital GNSS y Red Geodésica Nacional MAGNA-ECO.* Portal Geocientífico IGAC: [redgeodesica.igac.gov.co](https://redgeodesica.igac.gov.co/)  
   *(Explica cómo operan las estaciones continuas CORS en Colombia, los métodos estático, RTK y NTRIP, y la vinculación oficial a `EPSG:9377`).*
2. **ESA — Agencia Espacial Europea (*Navipedia — GNSS Knowledge Base*):**
   - *GNSS Basic Concepts: Pseudorange, Trilateration, Clock Bias, Multipath and Dilution of Precision (DOP).* Disponible en: [gssc.esa.int/navipedia](https://gssc.esa.int/navipedia/index.php/Main_Page)  
   *(Referencia académica estándar con diagramas claros sobre el 4.° satélite, la ecuación de pseudodistancia y las fuentes de error atmosférico y local).*
3. **Mendoza Dueñas, J. (2019). *Topografía y Geodesia Moderna*.**
   - Capítulo: *Sistema Global de Navegación por Satélite (GNSS): Fundamentos, Segmentos, DOP y Posicionamiento Diferencial (DGPS / RTK / PPK).*  
   *(Lectura base de ingeniería civil sobre la diferencia entre medición por código C/A y medición por fase portadora L1/L2).*
4. **Documentación Oficial de QGIS LTR:**
   - *Working with GPS Data (GPX format) and Delimited Text Layers (CSV).* Disponible en: [docs.qgis.org/latest/en/docs/user_manual/working_with_gps/](https://docs.qgis.org/latest/en/docs/user_manual/working_with_gps/index.html)

---

## Checklist de Estudio para el Quiz 4 (Q4)

- [ ] Comprendo físicamente por qué se necesitan **4 satélites** ($X, Y, Z, \delta t$) y por qué $1\ \mu\text{s}$ de error en el reloj equivale a $\sim 300\text{ m}$.
- [ ] Distingo con claridad entre un problema de **geometría de constelación (`HDOP` / `VDOP` / `PDOP`)** y un problema de **rebote local (*Multipath*)**, y sé por qué el *multipath* no se elimina con una estación base.
- [ ] Sé elegir justificadamente entre **Navegador autónomo**, **DGPS submétrico** y **RTK/PPK centimétrico** según la tolerancia de un proyecto de ingeniería o diseño urbano.
- [ ] Domino en QGIS la importación de archivos `.gpx` y `.csv` (leyéndolos en `EPSG:4326`), el filtrado de calidad `"hdop" <= 2.0`, la consolidación en GeoPackage en **`EPSG:9377`** y la medición de errores horizontales frente a vértices del IGAC.
- [ ] Queda claro que esta guía de clase y estudio autónomo prepara integralmente para el **Quiz 4 (Q4)** y **no requiere entregable en los informes del curso**.
