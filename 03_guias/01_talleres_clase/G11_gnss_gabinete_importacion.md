# G11: Posicionamiento Satelital GNSS en Gabinete — Fundamentos Físicos, Control de Calidad (`HDOP` / *Multipath*) y Auditoría en QGIS

**Semestre 2027-1 · Módulo 3: Sistemas Globales de Navegación por Satélite (GNSS) y Auditoría Posicional · Sesión S12 (Jueves 15 de abril de 2027)**  
*Horario:* 12:00 m. – 4:30 p.m. (`Sub-bloque 1: 12:00–1:50 p.m.` QGIS LTR · `Pausa Activa: 1:50–2:10 p.m.` · `Sub-bloque 2: 2:10–4:30 p.m.` ArcGIS Pro + Cierre `C:\Temp -> .zip`)  
*Presupuesto Académico:* 4.5 h presenciales + 4.5 h de trabajo autónomo semanal (3 Créditos Académicos · 5 UMEs · 144 h semestrales)  
*Modalidad:* **100 % Individual** · *Metodología:* **Worked-Example Fading** (Datos Campus EAFIT `insumos_g11_gnss/` $\rightarrow$ Espejo en ArcGIS Pro $\rightarrow$ Preparación para el Hito 4).

> [!IMPORTANT]
> **Alineación con el Hito 4 (Evaluación Práctica Integradora 2 · 20%, Semana 14 · 29 abr 2027):**  
> Este taller y sus procedimientos de auditoría de calidad posicional constituyen la base técnica para el componente GNSS evaluado en el **Hito 4** (Semana 14), donde cada estudiante procesará individualmente datos satelitales aplicando filtrado de dilución de precisión y cálculo de $RMSE$.

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

---

## 2. Práctica Guiada Completa en QGIS: Auditoría del Levantamiento en el Campus EAFIT

En la carpeta [`insumos_g11_gnss/`](insumos_g11_gnss/) cuentan con un levantamiento real sobre el campus de la Universidad EAFIT compuesto por:
1. **`traza_cruda_eafit.gpx`**: Archivo GPX capturado con navegador Garmin (subcapas `waypoints` y `track_points`).
2. **`campo_smartphone_crudo.csv`**: Tabla CSV capturada con un smartphone en las mismas 8 estaciones (`EST-01` a `EST-08`).
3. **`vertices_control_igac.gpkg`**: Coordenadas oficiales de referencia en **`EPSG:9377`**.

### Paso 1: Ingesta del Archivo `.gpx` y Filtrado por `HDOP`
1. Abrir un proyecto nuevo en QGIS en **`EPSG:9377`**.
2. Cargar `insumos_g11_gnss/vertices_control_igac.gpkg` y un mapa base de referencia.
3. Arrastrar `insumos_g11_gnss/traza_cruda_eafit.gpx` y marcar las subcapas `waypoints` (8 objetos) y `track_points` (180 objetos).
4. Clic derecho sobre `track_points` $\rightarrow$ **Filtrar...** e ingresar:
   ```sql
   "hdop" <= 2.0
   ```
5. Comprobar que de los 180 puntos crudos quedan **156 puntos limpios** y desaparecen los 24 saltos por multipath en techos de edificios.
6. Exportar `track_points` filtrada a `auditoria_eafit_9377.gpkg` con nombre `traza_depurada_9377` en **`EPSG:9377`**.

### Paso 2: Ingesta del CSV y Reproyección Segura
1. Ir a **Capa → Añadir capa → Añadir capa de texto delimitado...** y seleccionar `campo_smartphone_crudo.csv`.
2. Asignar **Campo X = lon**, **Campo Y = lat**, y **SRC = `EPSG:4326 - WGS 84`** (nunca asignar 9377 directamente a coordenadas en grados).
3. Exportar al GeoPackage como `puntos_smartphone_9377` en **`EPSG:9377`**.

### Paso 3: Cálculo Cuantitativo del Error Posicional y del RMSE
Para calcular el error horizontal en cada estación frente al vértice oficial:
$$\Delta X_i = X_{\text{GNSS}} - X_{\text{IGAC}}, \quad \Delta Y_i = Y_{\text{GNSS}} - Y_{\text{IGAC}}$$
$$e_i = \sqrt{\Delta X_i^2 + \Delta Y_i^2}$$

El **Error Cuadrático Medio (*Root Mean Square Error* — RMSE)** horizontal de la serie de $n$ mediciones es:
$$\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} e_i^2} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} \left[ (X_i - X_{\text{ref}})^2 + (Y_i - Y_{\text{ref}})^2 \right]}$$

#### Tabla de Verificación de Precisión (Campus EAFIT):
| Estación | Entorno Físico | Satélites | `HDOP` | Error Garmin ($\text{m}$) | Error Smartphone ($\text{m}$) | Diagnóstico |
|:---:|---|:---:|:---:|:---:|:---:|---|
| `EST-01` | Cielo abierto | 13 | 1.2 | **2.19 m** | **3.19 m** | Precisión estándar código autónomo. |
| `EST-02` | Cielo abierto | 15 | 0.9 | **1.63 m** | **2.48 m** | **Mejor punto:** horizonte despejado. |
| `EST-03` | Cañón urbano (Bloque 19) | 5 | 4.2 | **11.33 m** | **15.29 m** | **Peor punto:** rebote *multipath* severo. |
| `EST-04` | Cañón urbano (Argos) | 6 | 3.6 | **9.44 m** | **12.97 m** | Fuerte desviación por obstrucción. |
| `EST-05` | Dosel arbóreo | 8 | 2.2 | **4.24 m** | **6.01 m** | Atenuación moderada por follaje. |
| `EST-06` | Plazoleta Estudiante | 14 | 1.0 | **1.77 m** | **2.62 m** | Geometría óptima ($\text{HDOP} \le 1.0$). |
| `EST-07` | Pasillo Bloques 28–29 | 5 | 3.8 | **8.71 m** | **11.83 m** | Rebote especular entre muros. |
| `EST-08` | Biblioteca (Bloque 32) | 6 | 3.3 | **8.56 m** | **11.78 m** | Degradación severa por azotea alta. |

*Resultados globales de RMSE:*
- **Garmin GPSMAP 66sr:** $\text{RMSE}_{\text{Garmin}} \approx \mathbf{7.28\text{ m}}$ (en cielo abierto baja a $\mathbf{1.88\text{ m}}$).
- **Smartphone:** $\text{RMSE}_{\text{Smart}} \approx \mathbf{10.15\text{ m}}$ (en cielo abierto baja a $\mathbf{2.78\text{ m}}$).

---

## 3. Sub-bloque 2: Espejo Corporativo en ArcGIS Pro

1. **Importación de GPX en ArcGIS Pro:**
   - Panel *Geoprocessing* $\rightarrow$ buscar herramienta **`GPX To Features`** (*Conversion Tools → GPS*).
   - **Input GPX File:** `traza_cruda_eafit.gpx`.
   - **Output Feature Class:** `GPX_EAFIT_Raw` en la `.gdb`.
   - **Output Type:** `Points`.
2. **Reproyección y Filtrado:**
   - Usar herramienta **`Project`** (*Data Management Tools → Projections and Transformations*) hacia `EPSG:9377`.
   - Abrir **Select Layer By Attribute**:
     - Expresión: `HDOP <= 2.0`
     - Exportar a `Traza_Depurada_9377`.
3. **Cálculo de Distancias al Vértice Oficial:**
   - Usar herramienta **`Near`** (*Analysis Tools → Proximity*) o **`Point Distance`** para medir automáticamente la distancia euclidiana entre cada estación levantada y los vértices de control IGAC en metros.
   - En la tabla resultante, calcular el promedio y el RMSE con la función estadística de campo.

---

## 4. Preguntas de Razonamiento Aplicado (Entrenamiento Hito 4)

1. **Escenario A (Muchos satélites pero mal `HDOP`):**  
   *Un receptor capta 7 satélites pero el `HDOP` marca 5.8 en un cañón urbano. ¿Por qué ocurre esto?*  
   $\rightarrow$ **Explicación:** Los satélites visibles están alineados en una sola franja estrecha del cenit; la falta de apertura angular degrada la geometría espacial.
2. **Escenario B (¿La base corrige el *multipath*?):**  
   *¿Por qué una estación base RTK no elimina el error de multipath en la fachada de un edificio?*  
   $\rightarrow$ **Explicación:** Porque el rebote de la onda electromagnética es un fenómeno estrictamente local que ocurre exclusivamente en el entorno inmediato de la antena móvil; la base fija no lo experimenta.
3. **Escenario C (Por qué VDOP > HDOP):**  
   *¿Por qué la incertidumbre vertical siempre es mayor que la horizontal?*  
   $\rightarrow$ **Explicación:** Porque la masa de la Tierra impide recibir señales satelitales desde abajo del horizonte, debilitando geométricamente la intersección en el eje vertical $Z$.

---

## 5. Checklist de Finalización de Clase y Preparación Hito 4

- [ ] Comprendo la formulación física de la pseudodistancia y la necesidad de 4 satélites ($X, Y, Z, \delta t$).
- [ ] Distingo entre geometría de constelación (`HDOP`) y rebote local (*Multipath*).
- [ ] Domino en QGIS y ArcGIS Pro el filtrado estricto `"hdop" <= 2.0`.
- [ ] Calculo e interpreto el error horizontal individual y el $\text{RMSE}$ en metros bajo `EPSG:9377`.
- [ ] Verifico la correcta lectura de coordenadas iniciales en `EPSG:4326` antes de reproyectar a `EPSG:9377`.
