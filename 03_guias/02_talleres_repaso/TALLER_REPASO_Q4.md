# Taller de Estudio y Repaso Integral: Posicionamiento Satelital GNSS, Control de Calidad y Procesamiento en Gabinete

> **Curso:** Geomática, Ingeniería y SIG  
> **Pregrados:** Ingeniería Civil y Diseño Urbano · Universidad EAFIT  
> **Propósito:** Guía de autoaprendizaje autónomo, fundamentación teórica completa, física de la propagación satelital y ejercitación práctica guiada para preparar con máximo rigor el **Quiz 4 (8%)**.  
> **Modalidad:** Trabajo individual en computador con QGIS (versión LTR).  
> **Territorio de aplicación:** Campus de la Universidad EAFIT (Medellín) y corredor urbano de La Iguaná.  
> **Insumos necesarios:** Carpeta `insumos_q4/` (`traza_cruda_eafit.gpx`, `campo_smartphone_crudo.csv`, `vertices_control_igac.gpkg`).

---

## Introducción y Hoja de Ruta

Este taller de repaso constituye una **unidad pedagógica autocontenida**. Ha sido diseñado para consolidar los conceptos abordados en la Clase `S11` y la Guía de Práctica `G11`, integrando la teoría física de los Sistemas Globales de Navegación por Satélite (**GNSS**), el modelamiento matemático del tiempo y las pseudodistancias, el diagnóstico de errores en entornos urbanos complejos y el flujo estandarizado de procesamiento en **QGIS LTR**.

El **Quiz 4 (8% — 45 minutos)** evalúa dos componentes integrados en igual proporción:
1. **Razonamiento y Diagnóstico Técnico (50% — 2.5 pts):** Casos de ingeniería donde deberás explicar las causas físicas y geométricas de errores posicionales, limitaciones de los métodos diferenciales y selección de tecnologías según tolerancias de obra.
2. **Procesamiento Práctico en QGIS (50% — 2.5 pts):** Carga, depuración por calidad geométrica (`HDOP`), estandarización al sistema oficial **MAGNA-SIRGAS / Origen Nacional (`EPSG:9377`)**, consolidación en **GeoPackage** y auditoría métrica frente a vértices geodésicos del IGAC.

Al completar este taller serás capaz de:
1. Comprender la arquitectura de los tres segmentos GNSS y las características de las constelaciones orbitales (**GPS, GLONASS, Galileo, BeiDou**).
2. Deducir matemáticamente por qué se requieren **mínimo 4 satélites** para resolver la posición tridimensional y por qué un desfase de reloj de apenas **1 µs de desfase genera $\approx 300\text{ m}$ de error**.
3. Diferenciar con total claridad física la **geometría de la constelación (`DOP`)** del fenómeno de **reflexión de ondas (*Multipath*)**, entendiendo por qué una estación base diferencial (RTK/DGPS) no puede corregir los rebotes locales.
4. Explicar por qué en cualquier levantamiento satelital la precisión vertical es siempre inferior a la horizontal (**`VDOP > HDOP`**).
5. Seleccionar con criterio técnico la tecnología GNSS adecuada (**Navegador autónomo, DGPS submétrico o RTK/PPK centimétrico**) según la tolerancia dimensional de proyectos civiles y urbanos.
6. Dominar en QGIS la ingesta de archivos `.gpx` y `.csv`, el filtrado por umbral `"hdop" <= 2.0`, la reproyección rigurosa a `EPSG:9377` y la cuantificación del error planimétrico euclidiano.

---

# PARTE 1: Teoría y Fundamentos Físicos del Posicionamiento GNSS

## 1.1 De GPS a GNSS: Arquitectura y Constelaciones Orbitales

En el lenguaje coloquial suele utilizarse la sigla "GPS" para referirse a cualquier sistema de localización satelital. Sin embargo, en la ingeniería moderna el término técnico normativo es **GNSS (*Global Navigation Satellite System*)**:

* **GPS (NAVSTAR):** Es exclusivamente la constelación desarrollada y operada por la Fuerza Espacial de los Estados Unidos.
* **GNSS:** Es el conjunto integral de todas las constelaciones globales y sistemas de aumentación que operan bajo estándares internacionales de radiofrecuencia.

Un receptor profesional moderno (e incluso los teléfonos inteligentes de gama media y alta) es **multiconstelación**, lo que significa que rastrea y combina simultáneamente señales provenientes de cuatro constelaciones principales en **Órbita Terrestre Media ($\text{MEO}$ — *Medium Earth Orbit*)**, a altitudes entre $19\,100\text{ km}$ y $23\,222\text{ km}$ sobre la superficie terrestre, con periodos orbitales cercanos a las **12 horas siderales**:

| Constelación | País / Agencia | Satélites Activos | Altitud Orbital | Frecuencias Civiles Principales (Banda L) | Características de Diseño |
|---|---|:---:|:---:|---|---|
| **GPS (NAVSTAR)** | Estados Unidos (USSF) | $\sim 31$ | $20\,200\text{ km}$ | $L1\ (1575.42\text{ MHz})$, $L2C\ (1227.60\text{ MHz})$, $L5\ (1176.45\text{ MHz})$ | Pionero histórico; 6 planos orbitales a $55^\circ$ de inclinación. |
| **GLONASS** | Rusia (Roscosmos) | $\sim 24$ | $19\,100\text{ km}$ | $G1\ (\sim 1602\text{ MHz})$, $G2\ (\sim 1246\text{ MHz})$, $G3$ | Órbitas con alta inclinación ($64.8^\circ$), óptima cobertura en latitudes polares y altas. |
| **Galileo** | Unión Europea (ESA / EUSPA) | $\sim 26$ | $23\,222\text{ km}$ | $E1\ (1575.42\text{ MHz})$, $E5a\ (1176.45\text{ MHz})$, $E5b\ (1207.14\text{ MHz})$ | Sistema 100% civil; mayor precisión métrica nativa y relojes de máser de hidrógeno pasivo. |
| **BeiDou (BDS-3)** | China (CNSA) | $\sim 35+$ | $21\,528\text{ km}$ (+ GEO/IGSO) | $B1I / B1C\ (1575.42\text{ MHz})$, $B2a\ (1176.45\text{ MHz})$, $B3I$ | Arquitectura híbrida con satélites MEO globales, geoestacionarios (GEO) e inclinados (IGSO). |

```
                       [SATÉLITE GNSS]
                     (Reloj Atómico Cesio/Rubidio)
                           /         \
                          /           \  Señal descendente (L-Band)
                         /             \ Efemérides + Tiempo t_transmision
                        /               \
                       v                 v
             [RECEPTOR ROVER]        [ESTACIÓN BASE CORS]
          (Reloj Cuarzo Económico)   (Vértice Geodésico Conocido)
```

Toda la infraestructura GNSS opera de manera coordinada a través de **tres segmentos funcionales**:

1. **Segmento Espacial:** Constituido por la constelación de más de 120 satélites activos que orbitan la Tierra. Cada satélite transmite continuamente ondas electromagnéticas en la **Banda L** (microondas entre $1.1\text{ GHz}$ y $1.6\text{ GHz}$) que contienen su posición orbital exacta (**efemérides**) y la marca de tiempo precisa generada por **relojes atómicos de cesio, rubidio o máser de hidrógeno** instalados a bordo.
2. **Segmento de Control (Terrestre):** Red mundial de estaciones de seguimiento, antenas de comando y una estación de control maestro (Master Control Station). Mide continuamente las trayectorias de los satélites, calcula sus desviaciones orbitales, modela la deriva de sus relojes y envía actualizaciones periódicas mediante enlaces de subida (*uplink*).
3. **Segmento de Usuario:** Integrado por la totalidad de receptores terrestres, aéreos y marítimos (receptores geodésicos, navegadores de mano, drones, smartphones, sistemas de navegación de vehículos y maquinaria pesada).
   > [!IMPORTANT]
   > **El receptor del usuario es 100% PASIVO.**  
   > El receptor únicamente capta y procesa la señal de radio que desciende del espacio. **Nunca transmite ninguna señal de regreso a los satélites**. Su teléfono o navegador no "envía su ubicación al satélite"; calcula su propia posición localmente resolviendo ecuaciones a partir de las ondas recibidas.

---

## 1.2 La Ecuación de Pseudodistancia: ¿Por qué se requieren MÍNIMO 4 satélites?

El principio básico del posicionamiento satelital es la **trilateración tridimensional**: si conocemos las coordenadas espaciales de varios satélites $(X_i, Y_i, Z_i)$ y medimos la distancia $R_i$ que nos separa de cada uno, nuestra posición $(X, Y, Z)$ corresponde a la intersección de las esferas descritas por esas distancias.

La distancia se mide cronometrando el tiempo de viaje ($\Delta t$) que tarda la onda de radio en viajar desde la antena del satélite hasta la antena del receptor, sabiendo que la onda se propaga a la **velocidad de la luz en el vacío ($c \approx 300\,000\text{ km/s} = 3 \times 10^8\text{ m/s}$)**:

$$\text{Distancia} = c \cdot \Delta t = c \cdot (t_{\text{recepción}} - t_{\text{transmisión}})$$

### El Problema Físico del Reloj del Receptor y el Impacto del Microsegundo

Los satélites portan relojes atómicos con precisiones del orden de $10^{-13}\text{ segundos}$ (pierden o ganan apenas un segundo cada varios millones de años). Sin embargo, es inviable instalar un reloj atómico en un receptor de campo por razones de costo (cuestan más de 30.000 USD), peso y consumo eléctrico. Receptores topográficos, navegadores y celulares utilizan **osciladores de cuarzo económicos**, los cuales presentan una **deriva o sesgo de sincronización continuo ($\delta t$)** respecto al tiempo GNSS atómico.

¿Cuánto impacta un error microscópico en el reloj del receptor? Como la señal viaja a la velocidad de la luz:

$$\Delta D = c \cdot \delta t$$

* Si $\delta t = \mathbf{1\text{ nanosegundo } (10^{-9}\text{ s})} \implies \Delta D = 3 \times 10^8 \times 10^{-9} = \mathbf{0.30\text{ metros } (30\text{ cm})}$.
* Si $\delta t = \mathbf{1\text{ microsegundo } (1\ \mu\text{s} = 10^{-6}\text{ s})} \implies \Delta D = 3 \times 10^8 \times 10^{-6} = \mathbf{300\text{ metros}}$.
* Si $\delta t = \mathbf{2\text{ microsegundos } (2\ \mu\text{s} = 2 \times 10^{-6}\text{ s})} \implies \Delta D = 3 \times 10^8 \times (2 \times 10^{-6}) = \mathbf{600\text{ metros}}$.
* Si $\delta t = \mathbf{1\text{ milisegundo } (1\text{ ms} = 10^{-3}\text{ s})} \implies \Delta D = 3 \times 10^8 \times 10^{-3} = \mathbf{300\,000\text{ metros } (300\text{ km})}$.

Debido a que el reloj del receptor siempre tiene un adelanto o atraso desconocido $\delta t$, la distancia medida directamente está falseada y se denomina **Pseudodistancia ($\rho_i$)**. Por tanto, la posición no tiene 3 incógnitas, sino **4 incógnitas fundamentales**:

$$\text{Incógnitas a resolver: } (X, Y, Z, \delta t)$$

Donde $(X, Y, Z)$ son las coordenadas tridimensionales de la antena del receptor en el sistema geocéntrico terrestre (ECEF) y $\delta t$ es el sesgo del reloj del receptor respecto a la escala de tiempo satelital.

### La Ecuación Fundamental de la Pseudodistancia

Para cada satélite visible $i$ ($i = 1, 2, 3, \dots, n$), el receptor formula una ecuación no lineal:

$$\rho_i = \sqrt{(X_i - X)^2 + (Y_i - Y)^2 + (Z_i - Z)^2} + c \cdot \delta t + \epsilon_{\text{iono}} + \epsilon_{\text{tropo}} + \epsilon_{\text{multipath}}$$

Omitiendo temporalmente los términos de perturbación atmosférica y local, tenemos un sistema de ecuaciones con 4 incógnitas:

$$\rho_1 = \sqrt{(X_1 - X)^2 + (Y_1 - Y)^2 + (Z_1 - Z)^2} + c \cdot \delta t$$
$$\rho_2 = \sqrt{(X_2 - X)^2 + (Y_2 - Y)^2 + (Z_2 - Z)^2} + c \cdot \delta t$$
$$\rho_3 = \sqrt{(X_3 - X)^2 + (Y_3 - Y)^2 + (Z_3 - Z)^2} + c \cdot \delta t$$
$$\rho_4 = \sqrt{(X_4 - X)^2 + (Y_4 - Y)^2 + (Z_4 - Z)^2} + c \cdot \delta t$$

### Deducción Geométrica: ¿Por qué 1, 2 y 3 satélites son insuficientes?

| Satélites Disponibles | Figura Geométrica de Intersección 3D | ¿Se obtiene solución de posición? | Explicación Física y Geométrica |
|:---:|---|:---:|---|
| **1 Satélite** | **Superficie esférica tridimensional** de radio $\rho_1$ centrada en el satélite. | **NO** | Existen infinitos puntos sobre la superficie de una esfera en el espacio. |
| **2 Satélites** | **Circunferencia (anillo 3D)** resultante de intersectar dos esferas. | **NO** | La intersección de dos esferas es un anillo circular continuo con infinitas soluciones posibles. |
| **3 Satélites** | **Dos puntos discretos** en el espacio 3D. | **NO (en receptores reales)** | La tercera esfera corta el anillo circular en dos puntos únicos (uno en el espacio exterior y otro cerca de la superficie terrestre). **Solo serviría si el reloj del receptor fuera un reloj atómico perfecto ($\delta t = 0$)**. En la realidad, el sesgo $\delta t$ infla o contrae el radio de las esferas cientos de metros, haciendo que no intersecten en un punto común. |
| **4 Satélites (Mínimo estricto)** | Punto único **$(X, Y, Z)$** y valor exacto de **$\delta t$**. | **SÍ** | Cuatro ecuaciones independientes permiten resolver matemáticamente las 4 incógnitas **$(X, Y, Z, \delta t)$**. El cuarto satélite sincroniza matemáticamente el reloj económico de cuarzo con la hora atómica satelital. |

> [!TIP]
> **El "truco" de ingeniería del cuarto satélite:**  
> Gracias al cuarto satélite, un receptor GPS o smartphone no necesita portar un reloj atómico de 30.000 dólares. El algoritmo matemático despeja simultáneamente las tres coordenadas espaciales y el error del reloj, convirtiendo a cada receptor GNSS en un reloj de precisión atómica sincronizado globalmente.

---

## 1.3 Fuentes de Error en la Propagación de la Señal

Durante los $\sim 20\,000\text{ km}$ de recorrido, la onda de radio atraviesa distintos medios físicos antes de alcanzar la antena receptora, experimentando retrasos y perturbaciones:

```
[Satélite GNSS]
       |
       |  Vacío espacial (velocidad c = 3x10^8 m/s)
       v
[IONOSFERA: 60 - 1.000 km]   --> Medio dispersivo (plasma de electrones). Retarda código y adelanta fase.
       |                          Se elimina (99.9%) con DOBLE FRECUENCIA (L1 + L2 / L1 + L5).
       v
[TROPOSFERA: 0 - 16 km]     --> Medio NO dispersivo (vapor de agua y aire seco). Retardo idéntico en L1/L2.
       |                          Se mitiga con modelos matemáticos y máscara de elevación (> 15°).
       v
[ENTORNO LOCAL: 0 - 50 m]   --> Reflexiones en fachadas y suelo (MULTIPATH).
       |                          NO se elimina con estaciones base; es estrictamente local.
       v
[Antena del Receptor]
```

1. **Retardo Ionosférico ($60\text{ a }1\,000\text{ km}$ de altitud):**
   - Capa de la atmósfera superior donde la radiación solar ioniza los gases, generando un plasma de electrones libres.
   - Es un **medio dispersivo para las ondas de radio**: la magnitud del retardo es inversamente proporcional al cuadrado de la frecuencia de la onda ($\Delta t_{\text{iono}} \propto \frac{1}{f^2}$).
   - **Solución tecnológica:** Los receptores geodésicos emiten/rastrean en **doble frecuencia** ($L1$ a 1575.42 MHz y $L2$ a 1227.60 MHz, o $L5$ a 1176.45 MHz). Al registrar simultáneamente en dos frecuencias distintas y comparar la diferencia de retardo entre ambas, se calcula de forma exacta el contenido total de electrones (TEC) y se elimina el **99.9%** del error ionosférico mediante la combinación lineal libre de ionosfera (*ionosphere-free*). Receptores monofrecuencia ($L1$ únicamente, como navegadores comunes o teléfonos antiguos) deben conformarse con modelos empíricos aproximados (modelo Klobuchar), que solo remueven un $\approx 50\%$ del error.
2. **Retardo Troposférico ($0\text{ a }16\text{ km}$ de altitud):**
   - Capa atmosférica inferior compuesta por gases neutros secos ($90\%$) y vapor de agua ($10\%$).
   - A diferencia de la ionosfera, la troposfera es un **medio no dispersivo** para frecuencias GNSS: retrasa con idéntica magnitud a la frecuencia $L1$, a la $L2$ y a la $L5$. Por ende, la doble frecuencia no sirve para eliminarlo.
   - Se modela matemáticamente a través de ecuaciones de refracción estándar (modelos de Saastamoinen o Hopfield) y aplicando una **máscara de elevación (*elevation mask*) de 10° a 15°** sobre el horizonte para descartar satélites bajos que atraviesen una masa de atmósfera excesivamente gruesa.
3. **Errores de Efemérides y Reloj del Satélite:**
   - Pequeñas perturbaciones orbitales (viento solar, atracción lunar/solar) y derivas mínimas de los relojes a bordo. Se corrigen casi en su totalidad con las efemérides precisas publicadas por el IGS (*International GNSS Service*) o mediante redes de aumentación diferencial en tiempo real.

---

## 1.4 Dilución de la Precisión (`DOP — Dilution of Precision`)

El **DOP** es un indicador numérico adimensional que mide la **calidad geométrica de la distribución espacial de los satélites visibles** respecto a la posición del observador.

No representa un error en metros por sí mismo, sino un **factor multiplicador geométrico**:

$$\sigma_{\text{posición final}} = \text{DOP} \times \sigma_{\text{medición base (UERE)}}$$

Donde $\sigma_{\text{rango}}$ (*User Equivalent Range Error*) es el error instrumental básico de la señal ($\sim 1\text{ a }3\text{ m}$ por código).

```
         BUENA GEOMETRÍA (DOP Bajo <= 1.5)               MALA GEOMETRÍA (DOP Alto > 4.0)
             Satélite 1 (Cenit)                                Satélite 1  Satélite 2
                    *                                               *          *
                 /  |  \                                             \        /
                /   |   \                                             \      /
     Satélite 2     |     Satélite 3                                   \    /
         *          |          *                                        \  /
          \         |         /                                          v
           \        v        /                                       [RECEPTOR]
            \   [RECEPTOR]  /                                (Satélites agrupados en una franja;
             ----------------                                 esferas se cortan en ángulo rasante:
     (Satélites ampliamente separados;                        elipse de incertidumbre muy alargada)
      intersección nítida en ángulos rectos)
```

### ¿Por qué tener muchos satélites NO garantiza un buen `HDOP`?

Un error recurrente en campo es asumir que "ver 8 o 9 satélites" garantiza una medición milimétrica. **Esto es falso.**
Para que el DOP sea óptimo ($\le 1.5$), los satélites deben formar un **poliedro de máximo volumen en el cielo**: uno cercano al cenit ($90^\circ$ sobre la cabeza) y varios distribuidos simétricamente en el horizonte (Norte, Sur, Este y Oeste).

En un **cañón urbano** (una calle flanqueada por edificios altos de concreto o vidrio) o en una **trinchera vial profunda**, los edificios bloquean todos los satélites bajos hacia los costados. El receptor puede captar **6 o 7 satélites**, pero todos estarán ubicados **exclusivamente en la estrecha franja de cielo abierto justo sobre la calle (enfilados verticalmente en el cenit)**. Al resolver las ecuaciones, las esferas de distancia inciden casi desde la misma dirección y se cortan con ángulos rasantes muy agudos. El volumen del poliedro colapsa y el **`HDOP` se dispara por encima de $3.5\text{ o }5.0$**, multiplicando cualquier pequeña incertidumbre y degradando la coordenada a errores de $10\text{ a }20\text{ metros}$.

### Familia de Factores DOP

* **`GDOP` (*Geometric DOP*):** Incertidumbre global 3D combinada con el sesgo temporal del reloj:
  $$\text{GDOP} = \sqrt{\text{PDOP}^2 + \text{TDOP}^2}$$
* **`PDOP` (*Position DOP*):** Dilución tridimensional de la posición en el espacio $(X, Y, Z)$:
  $$\text{PDOP} = \sqrt{\text{HDOP}^2 + \text{VDOP}^2}$$
  *(En topografía y fotocontrol con drones se exige $\text{PDOP} \le 2.0$).*
* **`HDOP` (*Horizontal DOP*):** Dilución en el plano horizontal bidimensional $(X, Y)$ o $(Este, Norte)$. **Es el parámetro reglamentario de control de calidad en SIG.** Umbral de depuración: **`HDOP` ≤ 2.0**.
* **`VDOP` (*Vertical DOP*):** Dilución en la componente vertical o cota altimétrica ($Z$).
* **`TDOP` (*Time DOP*):** Dilución en la estimación del sesgo del reloj del receptor ($\delta t$).

### ¿Por qué el `VDOP` es SIEMPRE mayor (peor) que el `HDOP`?

En cualquier levantamiento GNSS en el mundo, al revisar la tabla de atributos se observa sistemáticamente que:

$$\text{VDOP} > \text{HDOP} \quad (\text{comúnmente } \text{VDOP} \approx 1.5\text{ a }2.5 \times \text{HDOP})$$

**Explicación geométrica rigurosa:**
* En el **plano horizontal ($E, N$)**, el receptor recibe señales desde satélites situados a los $360^\circ$ del horizonte (satélites al Este compensan a los del Oeste; satélites al Norte compensan a los del Sur). La geometría es simétrica y bidireccional.
* En el **eje vertical ($Z$)**, la Tierra es un cuerpo sólido y opaco que bloquea la totalidad de las señales por debajo del horizonte del observador ($0^\circ$ a $-90^\circ$). **Todos los satélites visibles tiran exclusivamente desde arriba (desde el hemisferio superior)**; no existe ningún satélite debajo de nuestros pies para cerrar la geometría vertical.
* Esta asimetría geométrica inevitable debilita la resolución matemática de la cota, provocando que la precisión altimétrica de cualquier equipo GNSS sea siempre **entre 2 y 3 veces peor** que su precisión horizontal.

---

## 1.5 El Efecto Multicamino (*Multipath*)

El **Multipath (Multicamino)** es la principal causa de errores severos en levantamientos satelitales urbanos y de infraestructura:

* **Mecanismo físico:** La onda electromagnética emitida por el satélite no viaja únicamente por la línea de visión directa (*Line of Sight — LOS*), sino que choca y rebota contra **superficies reflectoras especulares cercanas** (muros lisos de concreto, fachadas acristaladas de edificios, estructuras metálicas, techos de hangares o láminas de agua) antes de entrar a la antena del receptor.
* **Consecuencia matemática:** La distancia recorrida por la onda reflejada ($D_{\text{rebotada}} = d_1 + d_2$) es **físicamente mayor** que la distancia en línea recta ($D_{\text{directa}}$). El receptor registra un tiempo de propagación inflado ($\Delta t_{\text{falso}} > \Delta t_{\text{real}}$), lo que se traduce en un cálculo de pseudodistancia artificialmente largo y desplaza la posición calculada entre **5 y 20 metros**. En un mapa SIG, la traza del recorrido parece "saltar" inexplicablemente hacia adentro de las estructuras o cruzar muros perimetrales.

```
                  [Satélite GNSS]
                     /       \
                    /         \  Señal Directa
                   /           \
                  v             \
          [Fachada de Vidrio]    v
                  \          [Antena Móvil Rover]
    Señal          \             ^
   Reflejada        \___________/  (La señal con rebote recorre mayor distancia,
                                    llegando con retraso y falseando la posición)
```

### ¿Por qué una Estación Base (RTK / DGPS / NTRIP) NO corrige el *Multipath*?

> [!CAUTION]
> **Pregunta clásica de diagnóstico en ingeniería:**  
> Si conecto mi receptor a la estación base de referencia continua del IGAC mediante RTK o NTRIP, ¿se eliminan los errores de rebote por *multipath* contra el edificio de al lado?  
> **RESPUESTA ROTUNDA: NO.**

**Justificación causal:**  
El posicionamiento diferencial opera bajo el principio de **errores comunes correlacionados espacialmente**: la Estación Base y el Rover se encuentran bajo la misma columna de atmósfera y observan los mismos satélites, por lo que experimentan retardos ionosféricos, troposféricos y de reloj satelital prácticamente idénticos:

$$\Delta \text{Atmosfera}_{\text{Base}} \approx \Delta \text{Atmosfera}_{\text{Rover}}$$

Al restar algebraicamente las observaciones de la Base a las del Rover, esos errores compartidos se cancelan.

Sin embargo, el *multipath* es un **error estrictamente local y de microentorno**, condicionado por los obstáculos situados a menos de 50 metros de la antena del receptor móvil (*Rover*). La estación base del IGAC está instalada en una azotea despejada a varios kilómetros de distancia, libre de reflexiones cercanas; la base no experimenta el rebote contra la fachada del edificio que tienes al lado y, en consecuencia, **no puede calcularlo, predecirlo ni cancelarlo**. El *multipath* debe mitigarse en campo (mediante selección de punto y antenas con plano de tierra) o depurarse en gabinete con filtros analíticos.

### Dosel Arbóreo (Follaje) vs. Cañón Urbano (Concreto/Vidrio)

* **Dosel Arbóreo (Árboles y Vegetación Densa):**  
  Las hojas, ramas y troncos húmedos actúan como cuerpos dieléctricos con alto contenido de agua. Su efecto físico predominante es la **atenuación de la potencia de la señal (baja relación señal/ruido $C/N_0$) y la dispersión difusa**. El `HDOP` se incrementa de forma moderada ($2.0\text{ a }2.8$) y el error planimétrico típico oscila entre **4 y 7 metros**. Rara vez genera saltos catastróficos.
* **Cañón Urbano (Edificios Altos de Concreto y Vidrio):**  
  Las superficies verticales rígidas producen **obstrucción física total del horizonte (bloquean hemisferios celestes enteros)** y generan **reflexiones especulares intensas (*multipath*)**. El `HDOP` colapsa ($> 3.5\text{ a }6.0$), la cantidad de satélites directos cae a 4 o 5 y el error salta bruscamente entre **9 y 17 metros**, proyectando puntos dentro de las edificaciones.

### ¿Por qué los Smartphones se degradan más que los Navegadores Dedicados (Garmin)?

Un navegador satelital dedicado (como un Garmin GPSMAP) incorpora una **antena helicoidal cuadrifilar o de parche cerámico con plano de tierra metálico (*ground plane*)** diseñado para recibir señales con polarización circular dextrógira (RHCP) y atenuar las señales que provienen desde abajo o rebotadas (polarización invertida LHCP).  
Un **smartphone** prioriza el espacio físico y el diseño estricto: su antena GNSS es una diminuta lámina de circuito impreso omnidireccional embebida en el marco del teléfono, sin plano de tierra y expuesta a la interferencia electromagnética de la batería, procesador, Bluetooth y modem celular, haciéndolo mucho más vulnerable al *multipath* y a pérdidas de señal.

---

## 1.6 Métodos de Posicionamiento y Tolerancias en Ingeniería Civil y Urbanismo

En los proyectos de infraestructura no existe "un solo método GNSS"; la tecnología se elige en función de la **tolerancia admisible del pliego de condiciones técnicas**:

| Método GNSS | Observable de la Onda Satelital | Infraestructura de Corrección | Precisión Horizontal Típica ($1\sigma$) | Aplicaciones Correctas en Ingeniería y Urbanismo | Aplicaciones Totalmente Prohibidas |
|---|---|:---:|:---:|---|---|
| **1. Autónomo / Absoluto (Garmin / Smartphone)** | **Código pseudoaleatorio C/A** (longitud de chip $\approx 300\text{ m}$). | Ninguna (opera como equipo individual aislado). | **3.0 m a 10.0 m** (hasta $>15\text{ m}$ en cañón urbano). | Reconocimiento preliminar de rutas, inventario de puntos críticos de desastre, georreferenciación de fotos de campo, senderismo. | Replanteo de ejes viales, linderos catastrales legales, verificación de pendientes hidráulicas en alcantarillado. |
| **2. Diferencial por Código (DGPS / SBAS)** | **Código C/A** corregido diferencialmente. | Estación Base cercana o satélites geoestacionarios de aumentación (SBAS). | **0.5 m a 1.5 m** (Submétrico). | Inventario de arbolado urbano, mobiliario público, catastro de redes de servicios en aceras, delimitación de predios agrícolas extensos. | Obras de concreto estructural, rasante de pavimentos, deformación de presas y puentes. |
| **3. Geodésico Diferencial por Fase Portadora (RTK / PPK)** | **Fase de la onda portadora $L1 / L2 / L5$** ($\lambda \approx 19\text{ cm}$). Resolución de ambigüedades enteras de ciclo. | **Estación Base fija sobre mojón geodésico IGAC** o red CORS nacional (vía Radio UHF o internet móvil **NTRIP**). | **0.01 m a 0.02 m** (**1 a 2 cm**). | Replanteo milimétrico de obras civiles, pilas de puentes, rasantes viales, tuberías por gravedad, puntos de fotocontrol (GCP) para drones y fotogrametría. | Ninguna (es el estándar de máxima precisión en ingeniería y geodesia). |

> [!NOTE]
> **RTK vs. PPK:**  
> * **RTK (*Real-Time Kinematic*):** La base transmite las correcciones al Rover instantáneamente mediante radioenlace o internet celular (**protocolo NTRIP**). El operador conoce su coordenada centimétrica en vivo en la libreta electrónica.
> * **PPK (*Post-Processed Kinematic*):** Si en la zona del proyecto no hay cobertura celular ni alcance de radio (por ejemplo, en quebradas encañonadas o selva), la Base y el Rover graban las señales brutas en archivos de formato **RINEX**. Al regresar a la oficina, el software de gabinete procesa simultáneamente ambos registros y alcanza la misma precisión de $1\text{ a }2\text{ cm}$.

---

# PARTE 2: Formatos de Datos, Geodesia y Estructura en QGIS

## 2.1 Formatos de Datos GNSS de Uso Frecuente

1. **GPX (*GPS Exchange Format*):**
   - Esquema XML estandarizado para intercambio de datos GPS entre navegadores, aplicaciones móviles y software SIG.
   - Contiene tres tipos de geometrías nativas:
     - `<wpt>` (**Waypoints**): Puntos aislados grabados intencionalmente por el usuario (estaciones de control, vértices, puntos de interés).
     - `<trk>` $\rightarrow$ `<trkseg>` $\rightarrow$ `<trkpt>` (**Track Points**): Registros cinemáticos continuos capturados automáticamente a intervalos fijos de tiempo (ej. cada 2 o 3 segundos) o distancia. Contiene atributos como `time`, `ele`, `hdop`, `vdop`, `sat`.
     - `<rte>` (**Routes**): Listas ordenadas de waypoints para navegación.
   - **Regla Geodésica GPX:** Por definición internacional estricta, las coordenadas dentro de un archivo `.gpx` **siempre están almacenadas en grados decimales referidas al elipsoide WGS 84 (`EPSG:4326`)**.
2. **Tablas de Coordenadas Delimitadas (`.csv` / `.txt`):**
   - Formato tabular donde cada fila representa una estación y las columnas definen atributos y coordenadas numéricas (p. ej., `lat`, `lon` o `este`, `norte`).
3. **RINEX (*Receiver Independent Exchange Format*):**
   - Formato de texto estandarizado a nivel mundial para almacenar mediciones crudas de fase portadora, pseudodistancia, Doppler y efemérides satelitales, permitiendo postprocesar datos de receptores de distintas marcas (Trimble, Leica, Topcon, South, Emlid).
4. **NMEA 0183:**
   - Protocolo de comunicación serial utilizado por receptores GNSS para transmitir datos en tiempo real a computadores de a bordo y libretas de campo. Sentencias clave: `$GPGGA` (hora, coordenadas 3D, calidad de fijación y número de satélites) y `$GPRMC` (posición mínima recomendada, rumbo y velocidad).

---

## 2.2 La Trampa Crítica de Proyección: ¿Por qué NUNCA declarar `EPSG:9377` al importar un CSV en grados?

> [!CAUTION]
> **El error más común y destructivo en la manipulación de datos GNSS:**  
> Abrir la ventana *"Añadir capa de texto delimitado..."* en QGIS, seleccionar las columnas `lon` y `lat`, y definir en el menú desplegable el sistema proyectado nacional **`EPSG:9377 - MAGNA-SIRGAS / Origen-Nacional`**.

### ¿Qué hace matemáticamente QGIS si cometes este error?

En el archivo CSV capturado en Medellín, las columnas contienen números angulares geodésicos:
* `lon` $\approx -75.578^\circ$
* `lat` $\approx +6.200^\circ$

Si le dices a QGIS que el SRC de la geometría es `EPSG:9377`, QGIS **no realiza ninguna conversión trigonométrica de coordenadas**. Asume literalmente que esos números son unidades métricas de la proyección cartográfica:
* Coordenada Este ($X$) = **-75.578 metros**
* Coordenada Norte ($Y$) = **+6.200 metros**

Como el sistema CTM12 (`EPSG:9377`) tiene su origen oficial de referencia fijado en $X = 5\,000\,000\text{ m}$ y $Y = 2\,000\,000\text{ m}$, ubicar un punto en $(-75.57, 6.20)$ significa colocarlo a **5.000 kilómetros al Oeste**, en medio del Océano Pacífico, a miles de kilómetros de Colombia.

### La Regla Metodológica Inviolable:
1. **Paso 1 (Ingesta / Declaración de Origen):** Se declara la verdad física de cómo fue capturado el archivo. Como el sensor midió en grados decimales geodésicos, el SRC de la geometría en la ventana de texto delimitado debe ser obligatoriamente **`EPSG:4326 - WGS 84`**.
2. **Paso 2 (Estandarización y Reproyección):** Una vez que la capa temporal aparece correctamente superpuesta sobre Colombia, se exporta (*clic derecho → Exportar → Guardar objetos como...*) hacia el **GeoPackage** asignando en la ventana de guardado el sistema proyectado oficial métrico: **`EPSG:9377`**.

---

## 2.3 Formulación Matemática del Error Planimétrico frente a Vértices Geodésicos

Para auditar la calidad posicional de un equipo satelital frente a un mojón o vértice de referencia geodésica del IGAC, ambas coordenadas deben encontrarse en el mismo sistema de proyección plana métrica (**`EPSG:9377`**).

El **Error Planimétrico Horizontal ($E_H$)** corresponde a la distancia euclidiana entre las coordenadas medidas en campo $(X_{\text{medido}}, Y_{\text{medido}})$ y las coordenadas oficiales del mojón IGAC $(X_{\text{IGAC}}, Y_{\text{IGAC}})$:

$$\Delta X = X_{\text{medido}} - X_{\text{IGAC}}$$
$$\Delta Y = Y_{\text{medido}} - Y_{\text{IGAC}}$$
$$E_H = \sqrt{\Delta X^2 + \Delta Y^2}$$

El **Error Altimétrico ($\Delta Z$)** mide la desviación vertical respecto a la cota oficial:

$$\Delta Z = Z_{\text{medido}} - Z_{\text{IGAC}}$$

---

# PARTE 3: Ejercicios Prácticos Guiados (Paso a Paso en QGIS)

A continuación ejecutaremos el protocolo completo de procesamiento y auditoría en gabinete utilizando el dataset de entrenamiento del **Campus EAFIT** (`insumos_q4/`).

---

### Ejercicio Guiado 1: Configuración del Proyecto y Carga de la Red Geodésica IGAC

**Objetivo:** Establecer el marco de referencia CTM12 y visualizar las placas de control oficiales.

1. Abre una sesión limpia de QGIS LTR.
2. Configura el SRC del proyecto: haz clic en el botón de proyección de la esquina inferior derecha (o pulsa `Ctrl + Shift + P`), escribe `9377` en el buscador y selecciona **`MAGNA-SIRGAS / Origen-Nacional` (EPSG:9377)**. Haz clic en *Aceptar*.
3. En el panel de capas, añade un mapa base de contexto para verificar la posición geográfica: desde el panel *Navegador*, expande *XYZ Tiles* y arrastra **OpenStreetMap** (o la ortofoto de alta resolución de Google Satellite / GeoMedellín).
4. Carga la capa de control oficial: arrastra al lienzo el archivo `insumos_q4/vertices_control_igac.gpkg`. Verás los 8 mojones geodésicos del campus (`EST-01` a `EST-08`).
5. Abre la tabla de atributos de `vertices_control_igac` (`F6`): observa que las coordenadas planas oficiales (`este_ctm12`, `norte_ctm12`) están en metros, en el rango de $X \approx 4\,878\,000\text{ m}$ y $Y \approx 2\,457\,000\text{ m}$.

---

### Ejercicio Guiado 2: Ingesta de Traza GPX, Diagnóstico de Multipath y Filtrado por HDOP

**Objetivo:** Identificar los saltos de degradación en cañón urbano y depurar analíticamente la traza continua.

1. Arrastra al lienzo de QGIS el archivo `insumos_q4/traza_cruda_eafit.gpx`.
2. En la ventana emergente que pregunta qué capas vectoriales añadir, selecciona exclusivamente:
   - **`track_points`** (registros cinemáticos continuos a lo largo del sendero).
   - **`waypoints`** (las 8 estaciones de control capturadas con el Garmin).
   - Pulsa **Añadir capas**.
3. **Inspección visual del fenómeno de *Multipath*:**
   - Haz zoom sobre la zona comprendida entre el **Bloque 19 (Ingenierías)**, el **Bloque Argos** y la **Biblioteca (Bloque 32)**.
   - Observa con atención los puntos de la capa `track_points`: la traza caminada por el sendero peatonal exterior sufre de repente **saltos abruptos y desviaciones violentas que caen encima del techo de los edificios**.
4. **Auditoría de atributos de los puntos degradados:**
   - Activa la herramienta *Identificar objetos espaciales* (`Ctrl + Shift + I`) y haz clic sobre uno de los puntos que saltó sobre el Bloque 19.
   - Revisa sus atributos: notarás que el número de satélites usados (`sat`) cae a valores de `4–6` y el **`hdop` se dispara entre `3.1` y `6.2`**.
5. **Aplicación del filtro de control de calidad geométrica:**
   - Haz clic derecho sobre la capa `track_points` en el panel de capas $\rightarrow$ selecciona **Filtrar...** (*Constructor de consultas de subconjuntos*).
   - En el cuadro de expresión escribe:
     ```sql
     "hdop" <= 2.0
     ```
   - Haz clic en **Aceptar**.
6. **Comprobación de registros:**
   - Abre la tabla de atributos de `track_points`: verifica en la barra superior de la ventana que el conteo de entidades pasó de **180 puntos originales** a exactamente **156 puntos filtrados** (se descartaron **24 puntos aberrantes** por geometría degradada y rebote).
   - Comprueba visualmente en el mapa que todos los saltos sobre los edificios desaparecieron y la traza ahora discurre limpiamente sobre los senderos peatonales.

---

### Ejercicio Guiado 3: Consolidación del GPX en GeoPackage Único en `EPSG:9377`

**Objetivo:** Almacenar la traza depurada y los waypoints en un único contenedor geodésico proyectado.

1. **Exportación de la traza depurada:**
   - Clic derecho sobre `track_points` (filtrada) $\rightarrow$ **Exportar → Guardar objetos como...**
   - Configura los parámetros:
     - **Formato:** `GeoPackage`
     - **Nombre de archivo:** Haz clic en los tres puntos `...` y guarda como `auditoria_eafit_9377.gpkg` dentro de tu carpeta de trabajo.
     - **Nombre de la capa:** `traza_depurada_9377`
     - **SRC:** Selecciona **`EPSG:9377 - MAGNA-SIRGAS / Origen-Nacional`**.
     - Haz clic en **Aceptar**.
2. **Exportación de los waypoints Garmin:**
   - Clic derecho sobre `waypoints` (sin filtrar, manteniendo las 8 estaciones) $\rightarrow$ **Exportar → Guardar objetos como...**
   - Parámetros:
     - **Formato:** `GeoPackage`
     - **Nombre de archivo:** Selecciona el **mismo** archivo `auditoria_eafit_9377.gpkg` creado en el paso anterior.
     - **Nombre de la capa:** `waypoints_garmin_9377`
     - **SRC:** **`EPSG:9377 - MAGNA-SIRGAS / Origen-Nacional`**.
     - Haz clic en **Aceptar**.

---

### Ejercicio Guiado 4: Ingesta del CSV del Smartphone y Adición al GeoPackage

**Objetivo:** Importar correctamente la tabla de celular en grados decimales y reproyectarla a CTM12.

1. Ve al menú superior: **Capa → Añadir capa → Añadir capa de texto delimitado...**
2. Haz clic en los tres puntos `...` del campo *Nombre de archivo* y selecciona `insumos_q4/campo_smartphone_crudo.csv`.
3. En la sección **Formato de archivo**, selecciona **CSV (valores separados por coma)**.
4. En la sección **Definición de geometría**:
   - Marca la opción **Coordenadas de punto**.
   - **Campo X:** selecciona `lon` (Longitud, valores negativos $\approx -75.578$).
   - **Campo Y:** selecciona `lat` (Latitud, valores positivos $\approx +6.200$).
   - **SRC de la geometría:** selecciona estrictamente **`EPSG:4326 - WGS 84`**.
5. Haz clic en **Añadir** y cierra el diálogo. Verifica que los 8 puntos del smartphone se superponen en el campus.
6. **Exportación al GeoPackage consolidado:**
   - Clic derecho sobre la capa temporal `campo_smartphone_crudo` $\rightarrow$ **Exportar → Guardar objetos como...**
   - Parámetros:
     - **Formato:** `GeoPackage`
     - **Nombre de archivo:** Selecciona `auditoria_eafit_9377.gpkg`.
     - **Nombre de la capa:** `puntos_smartphone_9377`
     - **SRC:** **`EPSG:9377 - MAGNA-SIRGAS / Origen-Nacional`**.
     - Haz clic en **Aceptar**.
7. En este momento, tu archivo `auditoria_eafit_9377.gpkg` contiene las 3 capas requeridas por la norma técnica del curso, todas estandarizadas en unidades métricas oficiales CTM12.

---

### Ejercicio Guiado 5: Medición Interactiva del Error Planimétrico frente al IGAC

**Objetivo:** Medir distancias euclidianas en metros y diagnosticar el comportamiento por entorno físico.

1. Activa la herramienta **Medir línea** (icono de la regla en la barra de herramientas o atajo `Ctrl + Shift + M`).
2. En la ventana emergente de medición:
   - Configura las unidades en **Metros ($m$)**.
   - En la sección inferior, asegúrate de que el modo de cálculo esté en **Cartesiano** (medición euclidiana plana directa sobre el plano `EPSG:9377`).
3. Activa la herramienta de autoensamblado (*Snapping* / Imán, `s`) para engancharte exactamente a los vértices de cada punto.
4. Mide la distancia horizontal desde la placa oficial de `vertices_control_igac` hasta el punto homólogo en `waypoints_garmin_9377` y en `puntos_smartphone_9377` en los tres entornos característicos del campus:

#### Matriz de Comprobación y Auditoría del Campus EAFIT:

| Estación | Nombre / Ubicación en EAFIT | Entorno Físico Evaluado | Satélites Garmin | HDOP Garmin | VDOP Garmin | Error Garmin vs. IGAC ($m$) | Satélites Smart. | HDOP Smart. | Error Smart. vs. IGAC ($m$) | Diagnóstico Técnico de Ingeniería |
|:---:|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **`EST-01`** | Portería Las Vegas | Cielo abierto | 13 | 1.2 | 1.7 | **2.19 m** | 12 | 1.5 | **3.22 m** | Desempeño normal de código C/A sin obstáculos. |
| **`EST-02`** | Cancha Sintética (Esquina NE) | **Cielo abierto despejado** | **15** | **0.9** | **1.3** | **1.64 m** | 14 | 1.1 | **2.43 m** | **Punto óptimo:** Máxima apertura angular y mínimo DOP. |
| **`EST-03`** | Esquina NE Bloque 19 (Ingenierías) | **Cañón urbano severo** | 5 | **4.2** | 5.4 | **11.36 m** | 5 | **4.9** | **15.27 m** | **Punto crítico:** Bloqueo de 8 pisos + fuerte rebote *multipath*. |
| **`EST-04`** | Esquina SE Bloque Argos | **Cañón urbano** | 6 | 3.6 | 4.5 | **9.42 m** | 5 | 4.3 | **13.02 m** | Desviación sistemática hacia las fachadas de concreto. |
| **`EST-05`** | Puente Quebrada La Volcana | **Dosel arbóreo denso** | 8 | 2.2 | 2.9 | **4.28 m** | 8 | 2.5 | **6.00 m** | Atenuación y dispersión foliar moderada por follaje. |
| **`EST-06`** | Plazoleta del Estudiante | Cielo abierto | 14 | 1.0 | 1.4 | **1.73 m** | 13 | 1.3 | **2.59 m** | Excelente visibilidad y geometría estable. |
| **`EST-07`** | Pasillo Bloques 28–29 | **Cañón urbano estrecho** | 5 | 3.8 | 4.8 | **8.77 m** | 5 | 4.5 | **11.83 m** | Rebotes especulares múltiples entre edificios paralelos. |
| **`EST-08`** | Esquina SO Biblioteca (Bloque 32) | **Cañón urbano** | 6 | 3.3 | 4.2 | **8.52 m** | 6 | 3.9 | **11.84 m** | Degradación por proximidad a volumen ciego de concreto. |

---

# PARTE 4: Banco de Casos de Razonamiento Técnico para el Quiz 4

En el Quiz 4 las preguntas teóricas evalúan **capacidad de diagnóstico y argumentación técnica causal**, no memorización de glosario. Estudia en profundidad estos escenarios resueltos:

---

### CASO 1: Cantidad de Satélites Visibles vs. Geometría Real (`DOP`)

**Planteamiento del Caso:**  
*Un auxiliar de topografía afirma en obra: «Como mi receptor está captando 7 satélites (más que el mínimo reglamentario de 4), la posición calculada tiene que ser excelente y con un HDOP menor a 1.5». No obstante, al auditar el levantamiento en el fondo de un callejón urbano estrecho, observas que el receptor reporta efectivamente 7 satélites en uso pero con un `HDOP = 4.9`, provocando un error horizontal superior a los $11\text{ metros}$.*  
*Explica físicamente cómo es posible tener más satélites que el mínimo necesario y al mismo tiempo tener un HDOP tan degradado. Describe con precisión en qué zona del cielo están ubicados esos satélites.*

**Explicación Técnica Modelo (Criterio 100% de Calificación):**  
> El `HDOP` no mide la cantidad bruta de satélites visibles, sino la **calidad geométrica de su distribución angular (el volumen del poliedro que forman en la bóveda celeste)**. En un cañón urbano estrecho, las fachadas de los edificios bloquean todos los satélites de baja y media elevación hacia los costados (Este y Oeste). Los 7 satélites visibles se encuentran **alineados y confinados en una estrecha franja vertical sobre el cenit**. Al resolver el sistema de trilateración, las esferas de distancia inciden casi desde la misma dirección y se cortan con ángulos rasantes muy agudos. El volumen del poliedro colapsa y la elipse de incertidumbre horizontal se alarga enormemente, disparando el `HDOP` a $4.9$ y multiplicando los errores de medición a pesar de tener 7 satélites.

---

### CASO 2: ¿Por qué una Estación Base Diferencial (RTK/DGPS) NO elimina el *Multipath*?

**Planteamiento del Caso:**  
*En una estación de control ubicada junto a una fachada acristalada de 10 pisos (`EST-03`), el levantamiento autónomo presenta un desplazamiento de $15.27\text{ m}$ respecto a la placa del IGAC. El contratista propone conectar el equipo mediante el protocolo NTRIP a la estación de referencia continua (CORS) del IGAC ubicada en la azotea despejada de la Universidad Nacional (a 3.5 km de distancia), afirmando que «al aplicar corrección diferencial en tiempo real (RTK), el error de rebote contra el edificio desaparecerá automáticamente porque la base corrige todas las perturbaciones de la señal».*  
*Explica por qué la afirmación del contratista es físicamente falsa: qué errores sí elimina la estación base y por qué es físicamente incapaz de corregir el salto en la fachada de `EST-03`.*

**Explicación Técnica Modelo (Criterio 100% de Calificación):**  
> La corrección diferencial (RTK/DGPS) se fundamenta en la **correlación espacial de errores comunes** entre la Base y el Rover: cancela los retardos ionosféricos, troposféricos, las imprecisiones de las efemérides y el sesgo de los relojes atómicos de los satélites porque ambos equipos comparten la misma columna de atmósfera y satélites en común. Sin embargo, el **multipath es un fenómeno estrictamente local** ocasionado por la reflexión de ondas en la fachada contigua a la antena del Rover ($< 20\text{ m}$). La estación base del IGAC, ubicada a $3.5\text{ km}$ en una azotea despejada, no experimenta dicho rebote contra el edificio vecino; por tanto, **es físicamente imposible que la base calcule, modele o descuente una reflexión que solo existe en el microentorno del Rover**.

---

### CASO 3: Comparación Física de Entornos: Viaducto de Concreto vs. Dosel Arbóreo

**Planteamiento del Caso:**  
*Al analizar la tabla de atributos de las estaciones de control, se comparan dos entornos complejos: `EST-04` (esquina de un edificio masivo de concreto) frente a `EST-05` (pasarela peatonal bajo la densa cobertura arbórea de la quebrada). En `EST-04` el error del smartphone alcanza $13.02\text{ m}$ con `HDOP = 4.3`, mientras que en `EST-05` el error es de $6.00\text{ m}$ con `HDOP = 2.5`.*  
*Explica qué fenómeno físico electromagnético domina en la superficie rígida de concreto frente a las hojas y ramas vegetales, y por qué el smartphone experimenta una degradación mucho más severa que el Garmin en ambos casos.*

**Explicación Técnica Modelo (Criterio 100% de Calificación):**  
> 1. **Diferencia física del entorno:** El concreto rígido actúa como un **reflector especular eficiente** que genera ondas rebotadas coherentes de alta energía (*multipath* severo) y bloqueo total de horizonte. La vegetación del dosel arbóreo contiene agua en hojas y ramas que actúan como dieléctricos dispersores, produciendo principalmente **atenuación de la potencia de la señal ($C/N_0$) y refracción difusa**, lo que degrada la geometría de forma moderada pero no genera los saltos geométricos violentos del concreto.  
> 2. **Diferencia de hardware:** El navegador Garmin posee una antena helicoidal/parche con **plano de tierra metálico** que atenúa las ondas rebotadas desde ángulos inferiores e invierte la polarización. El smartphone cuenta con una antena cerámica omnidireccional en miniatura sin blindaje ni plano de tierra, haciéndolo altamente vulnerable a reflexiones y ruidos parásitos.

---

### CASO 4: Deriva de Reloj de $2\ \mu\text{s}$, el 4.° Satélite y la Debilidad Vertical (`VDOP > HDOP`)

**Planteamiento del Caso:**  
*a) Si el oscilador de cuarzo de un receptor de campo tuviera un desfase acumulado de apenas **dos microsegundos ($2\ \mu\text{s}$)** respecto al tiempo atómico GNSS y no se aplicara ninguna corrección, ¿de cuántos metros sería el error inducido en el cálculo de la pseudodistancia? ¿Cómo resuelve este problema el 4.° satélite?*  
*b) En una explanada despejada a cielo abierto (`EST-02`), el receptor ofrece precisión suficiente para levantar el eje de una vía en planta $(X, Y)$, pero un ingeniero advierte que no puede utilizarse para verificar la pendiente longitudinal del $0.5\%$ en una red de alcantarillado por gravedad. Explica geométricamente por qué en cualquier tecnología GNSS el `VDOP` es siempre peor que el `HDOP` y qué tecnología GNSS se requeriría para replantear tuberías.*

**Explicación Técnica Modelo (Criterio 100% de Calificación):**  
> a) Como la onda viaja a la velocidad de la luz ($c = 3 \times 10^8\text{ m/s}$), el error inducido es:  
> $$\Delta D = c \cdot \delta t = (3 \times 10^8\text{ m/s}) \times (2 \times 10^{-6}\text{ s}) = \mathbf{600\text{ metros}}$$  
> El **cuarto satélite** aporta la cuarta ecuación independiente necesaria para resolver de manera simultánea las 4 incógnitas del sistema $(X, Y, Z, \delta t)$, despejando el valor exacto de $\delta t$ y sincronizando matemáticamente el reloj del receptor sin requerir un costoso reloj atómico a bordo.  
> b) El **`VDOP` es siempre mayor (peor) que el `HDOP`** porque los satélites se distribuyen en los $360^\circ$ alrededor del observador en el plano horizontal (compensándose mutuamente), mientras que en el eje vertical la masa sólida de la Tierra bloquea todas las señales del hemisferio inferior (todos los satélites tiran exclusivamente desde arriba), debilitando la resolución geométrica de la cota altimétrica. Para alcantarillado por gravedad (tolerancia $\pm 1\text{ a }2\text{ cm}$) se requiere obligatoriamente **GNSS Geodésico diferencial por fase portadora (RTK/PPK de doble frecuencia)** o nivelación geométrica de precisión con nivel óptico.

---

### CASO 5: Diagnóstico del Error de Asignación de CRS al Importar CSV

**Planteamiento del Caso:**  
*Al realizar la ingesta de un archivo `.csv` con coordenadas capturadas por celular en Medellín, un analista junior selecciona directamente el sistema proyectado nacional **`EPSG:9377 - MAGNA-SIRGAS / Origen-Nacional`** dentro de la ventana de texto delimitado en QGIS, creyendo que así ahorra tiempo. Al dar zoom a la capa, los puntos aparecen en medio del Océano Pacífico, a miles de kilómetros de Colombia.*  
*Explica matemáticamente qué interpretó QGIS con los números de las columnas `lon` ($-75.57^\circ$) y `lat` ($+6.20^\circ$) al forzarles `EPSG:9377` en la lectura, y cuál es la diferencia conceptual entre «declarar el SRC del insumo» y «reproyectar al exportar».*

**Explicación Técnica Modelo (Criterio 100% de Calificación):**  
> Al seleccionar `EPSG:9377` en la ventana de importación, QGIS no ejecuta transformaciones cartográficas; asume que los valores numéricos ya representan **coordenadas métricas planas de la proyección**. Interpreta que el punto se localiza en $X = -75.57\text{ metros}$ y $Y = +6.20\text{ metros}$. Dado que el falso origen de coordenadas de Colombia (CTM12) está localizado en $(5\,000\,000\text{ m E}, 2\,000\,000\text{ m N})$, ubicar un objeto en $(-75.57, 6.20)$ desplaza el punto $5\,000\text{ km}$ hacia el Oeste, arrojándolo al océano.  
> **Diferencia conceptual:**  
> * **Declarar el SRC de origen:** Es indicarle al software en qué sistema y unidades físicas fue medido realmente el archivo original (grados decimales geodésicos en el elipsoide WGS 84, `EPSG:4326`).  
> * **Reproyectar al exportar:** Es aplicar las fórmulas matemáticas de proyección cartográfica para convertir rigurosamente esos ángulos geodésicos a metros proyectados planos en el sistema oficial de destino (`EPSG:9377`).

---

# PARTE 5: Lista de Chequeo Previa al Quiz 4

Antes de ingresar a presentar el Quiz 4, verifica que dominas con soltura cada una de estas competencias técnicas y operativas:

- [ ] Sé explicar conceptualmente la arquitectura de los tres segmentos GNSS (Espacial, Control, Usuario pasivo).
- [ ] Domino la deducción matemática de la pseudodistancia y sé calcular que $1\ \mu\text{s} \approx 300\text{ m}$, $2\ \mu\text{s} \approx 600\text{ m}$ y $1\text{ ms} \approx 300\text{ km}$.
- [ ] Conozco las 4 incógnitas del sistema $(X, Y, Z, \delta t)$ y sé por qué el 4.° satélite es el mínimo matemático indispensable.
- [ ] Distingo con claridad física entre la geometría de la constelación (`DOP`) y el rebote local (*Multipath*), y sé por qué una estación base RTK no elimina los rebotes en fachadas cercanas.
- [ ] Entiendo por qué `VDOP > HDOP` en cualquier lugar del planeta debido a la asimetría del horizonte terrestre.
- [ ] Sé elegir justificadamente entre receptor autónomo ($3\text{–}10\text{ m}$), DGPS submétrico ($0.5\text{–}1.5\text{ m}$) y RTK/PPK centimétrico ($1\text{–}2\text{ cm}$) según las tolerancias del pliego técnico de un proyecto civil o urbanístico.
- [ ] Sé importar archivos `.gpx` cargando selectivamente las subcapas `track_points` y `waypoints`.
- [ ] Aplico en QGIS el filtro de calidad geométrica `"hdop" <= 2.0` mediante el constructor de consultas (*Query Builder*).
- [ ] Conozco la regla de oro al importar tablas `.csv` en grados: definir siempre `EPSG:4326` en la ingesta y reproyectar a `EPSG:9377` al consolidar en el GeoPackage.
- [ ] Sé consolidar múltiples capas vectoriales en un único archivo **GeoPackage (`.gpkg`)** en coordenadas oficiales `EPSG:9377`.
- [ ] Utilizo la herramienta **Medir línea** en modo Cartesiano (metros) para cuantificar la distancia euclidiana frente a placas del IGAC.
- [ ] Sé comprimir en formato `.zip` plano exclusivamente el GeoPackage (`.gpkg`) y el reporte de texto (`.txt`) solicitados en la evaluación.
