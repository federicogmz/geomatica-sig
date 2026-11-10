# Taller de Estudio y Repaso Integral: Módulo Ráster, Análisis del Relieve y Álgebra de Mapas

> **Curso:** Geomática, Ingeniería y SIG  
> **Pregrados:** Ingeniería Civil y Diseño Urbano · Universidad EAFIT  
> **Propósito:** Guía de autoaprendizaje autónomo, teoría completa y ejercitación guiada para suplir las sesiones de la semana de receso y preparar con máximo rigor el **Quiz 3 (8%)**.  
> **Modalidad:** Trabajo individual en computador con QGIS (versión LTR).  
> **Territorio de aplicación:** Cuenca de la Quebrada La Iguaná (Medellín, ~46.25 km²).  
> **Insumos necesarios:** Modelo Digital de Elevación (DEM) ALOS PALSAR 12.5 m o SRTM 30 m, y polígono perimetral de la cuenca en GeoPackage.

---

## Introducción y Hoja de Ruta

Debido al receso académico, este taller ha sido estructurado como una **unidad pedagógica autocontenida**. Contiene toda la fundamentación teórica, fórmulas matemáticas, criterios geomorfológicos y normativos, acompañados de cinco ejercicios prácticos guiados paso a paso y una batería de autoevaluación con respuestas explicadas.

Al completar este taller serás capaz de:
1. Comprender la naturaleza matricial del modelo ráster y las diferencias físicas entre un **MDT** (terreno desnudo) y un **MDS** (superficie con coberturas).
2. Entender por qué es **estrictamente obligatorio** reproyectar un DEM a un sistema de coordenadas proyectadas métricas (**EPSG:9377 - MAGNA-SIRGAS Origen Nacional**) antes de calcular pendientes o relieves.
3. Derivar mapas de **pendiente** (en grados y porcentaje), mapas de **orientación de laderas (*Aspect*)** y modelos de **sombreado plástico (*Hillshade*)** con iluminación a 315°/45°.
4. Dominar la sintaxis aritmética y la **lógica booleana condicional** en la **Calculadora Ráster de QGIS** para aislar laderas críticas ($>30^\circ$) y realizar zonificaciones multicriterio de susceptibilidad física.
5. Extraer **curvas de nivel vectoriales (isolíneas)**, estilizarlas bajo reglas (maestras e intermedias) y trazar el **perfil topográfico longitudinal** de un cauce.
6. **Poligonizar** máscaras ráster a entidades vectoriales cerradas y calcular áreas exactas en hectáreas en la tabla de atributos para la toma de decisiones territoriales.

---

# PARTE 1: Teoría y Fundamentos del Modelo Ráster y el Relieve

## 1.1 Del Modelo Vectorial al Modelo Ráster

Hasta la Semana 8 trabajamos con el **modelo vectorial**, el cual representa el territorio mediante geometrías discretas bien delimitadas: puntos (estaciones de bombeo, pozos), líneas (ejes de vías, redes de acueducto, cauces) y polígonos (manzanas, predios catastrales, límites de cuencas).

Sin embargo, en la física del territorio existen fenómenos que **no tienen bordes definidos ni saltos abruptos**, sino que varían de manera suave y continua a lo largo del espacio geográfico. Estos fenómenos se conocen como **campos continuos**:
- La elevación topográfica sobre el nivel del mar ($Z$).
- La pendiente y la orientación del terreno.
- La precipitación media anual y la temperatura ambiental.
- La radiación solar y la reflectancia espectral en fotos satelitales.

Para modelar campos continuos, el **modelo ráster** es la estructura ideal: divide el territorio en una **matriz regular de celdas cuadradas (píxeles)** dispuestas en filas y columnas. Cada celda almacena un único valor numérico que representa la magnitud de la variable en esa porción de superficie.

```
+---------+---------+---------+
| 2450.2  | 2452.8  | 2455.1  |  Matriz ráster:
+---------+---------+---------+  Cada celda (píxel) tiene un tamaño fijo (ΔX = ΔY)
| 2448.0  | 2451.3  | 2454.0  |  y un valor numérico representativo (ej. cota en msnm).
+---------+---------+---------+
| 2445.6  | 2449.1  | 2452.4  |
+---------+---------+---------+
```

---

## 1.2 Las 4 Resoluciones de un Sensor Ráster

Todo dataset ráster se caracteriza por cuatro dimensiones de resolución:

1. **Resolución Espacial:** El tamaño del píxel en el terreno (tamaño de la celda).
   - Un DEM SRTM tiene píxeles de $30\times 30\text{ metros}$ ($900\text{ m}^2$ por celda).
   - Un DEM ALOS PALSAR RTC tiene píxeles de $12.5\times 12.5\text{ metros}$ ($156.25\text{ m}^2$ por celda).
   - Un levantamiento LiDAR de ingeniería civil puede alcanzar celdas de $0.5\times 0.5\text{ metros}$ ($0.25\text{ m}^2$).
   - *Regla de oro:* A menor tamaño de píxel, mayor nivel de detalle, pero mayor peso computacional del archivo.
2. **Resolución Espectral:** El número y ancho de las bandas electromagnéticas que captura el sensor (un DEM tiene 1 sola banda altimétrica; una imagen Sentinel-2 tiene 12 bandas espectrales).
3. **Resolución Radiométrica:** La profundidad de bits con la que se almacena el valor numérico de cada celda.
   - 8 bits ($2^8 = 256$ valores, enteros de 0 a 255): imágenes fotográficas comunes.
   - 16 o 32 bits punto flotante (*Float32*): permite guardar decimales con alta precisión métrica (ej. elevación $2451.384\text{ msnm}$).
4. **Resolución Temporal:** La frecuencia con la que el sensor vuelve a medir el mismo punto geográfico sobre la Tierra (revisita).

---

## 1.3 Anatomía del DEM: MDT vs. MDS

En la literatura técnica en español e inglés existe una confusión habitual entre DEM, DTM y DSM. Es fundamental dominar sus diferencias:

* **MDE / DEM (*Digital Elevation Model*):** Término genérico que describe cualquier modelo digital matricial que contenga valores de altitud $Z$.
* **MDT / DTM (*Digital Terrain Model* - Modelo Digital de Terreno):**
  - Representa exclusivamente la **superficie del suelo desnudo (*bare earth*)**.
  - Se han filtrado y eliminado digitalmente la vegetación, los árboles, los puentes y las edificaciones.
  - **Uso obligatorio en:** Hidrología, delimitación de cuencas, perfiles de flujo, estabilidad geotécnica de laderas y diseño de obras civiles subterráneas o de explanación.
* **MDS / DSM (*Digital Surface Model* - Modelo Digital de Superficie):**
  - Representa el **primer eco de retorno de la señal**: captura la parte superior de las copas de los árboles, techos de edificios y obras de infraestructura.
  - **Uso obligatorio en:** Planificación de telecomunicaciones (propagación de antenas celulares), catastro 3D, cálculos de volumen de biomasa forestal y análisis de sombras urbanas.

```
       ___               /\               ___
      /   \  [ÁRBOL]    /  \ [CASA]      /   \
-----/-----\-----------/----\-----------/-----\-----  <-- MDS (Superficie con copas y techos)
 \                                                 /
  \_______________________________________________/   <-- MDT (Terreno desnudo / Suelo)
```

---

## 1.4 Fuentes Satelitales de Elevación para Colombia

Para estudios territoriales en Colombia se destacan tres fuentes abiertas de elevación:

| Sensor / Misión | Tipo de Sensor | Resolución Espacial | Cobertura | Uso Recomendado en Ingeniería |
|---|---|---|---|---|
| **SRTM (NASA / NGA)** | Radar interferométrico (Banda C) | 30 metros (1 arco-segundo) | Global ($60^\circ\text{N} - 56^\circ\text{S}$) | Cuencas regionales grandes ($> 500\text{ km}^2$), estudios macro. |
| **ALOS PALSAR (JAXA / ASF)** | Radar de apertura sintética (Banda L) RTC | 12.5 metros | Global | **Estándar del curso**: Estudios de cuencas medianas, laderas y drenajes urbanos. |
| **LiDAR Aerotransportado** | Escáner láser aerotransportado | 0.5 a 1.0 metro | Local (vuelos contratados o AMVA) | Diseños de detalle a escala 1:1.000, estabilidad de taludes, trazado de tuberías. |

> [!NOTE]
> El producto **ALOS PALSAR RTC (*Radiometrically Terrain Corrected*)** distribuido por el Alaska Satellite Facility (ASF) es un remuestreo de alta calidad geométrica y radiométrica de la misión japonesa ALOS, optimizado para análisis topográfico en zonas de montaña como la cordillera de los Andes.

---

## 1.5 La Condición Crítica: ¿Por qué NUNCA calcular pendientes en EPSG:4326?

> [!CAUTION]
> **¡Atención! Este es el error más grave y frecuente en geomática.**

Cuando descargas un DEM de un servidor internacional (como OpenTopography, Earthdata o USGS), el archivo viene comúnmente en coordenadas geográficas angulares: **WGS 84 (EPSG:4326)**. En este sistema:
- El eje $X$ (longitud) está medido en **grados decimales ($^\circ$)**.
- El eje $Y$ (latitud) está medido en **grados decimales ($^\circ$)**.
- El eje $Z$ (elevación de la celda) está medido en **metros ($m$)**.

La pendiente ($\tan \theta$) se calcula dividiendo la diferencia de elevación entre la distancia horizontal:
$$\text{Pendiente} = \frac{\Delta Z}{\sqrt{\Delta X^2 + \Delta Y^2}}$$

Si ejecutas el algoritmo de pendiente sobre un DEM en `EPSG:4326`, el software dividirá metros en el numerador entre grados en el denominador. En Colombia, $1^\circ$ de latitud equivale aproximadamente a $111.320\text{ metros}$. ¡Una celda de $0.0001^\circ$ equivale a unos 11 metros! Al dividir $\Delta Z$ en metros por una fracción diminuta en grados decimales, el cociente se dispara y el algoritmo calcula que **toda la cuenca tiene pendientes de $89.8^\circ$ a $89.9^\circ$**.

### La Regla de Oro:
**Antes de calcular pendientes, orientaciones, sombreados o perfiles, el DEM DEBE reproyectarse mediante GDAL Warp al sistema oficial de coordenadas proyectadas de Colombia: MAGNA-SIRGAS Origen Nacional CTM12 (EPSG:9377).**  
En CTM12, tanto $X$, como $Y$ y $Z$ se encuentran estrictamente en **metros**, permitiendo un cálculo con Factor de Escala Vertical $Z = 1.0$.

---

## 1.6 Derivados Geomorfológicos del DEM

Una vez reproyectado el DEM en CTM12, se derivan tres capas esenciales para el análisis territorial:

### A. Pendiente (*Slope*)
Representa la tasa máxima de cambio de elevación entre una celda y sus 8 vecinas (ventana móvil de Tomlin $3\times 3$). Se expresa en dos unidades:
1. **Grados sexagesimales ($^\circ$):** Varía de $0^\circ$ (terreno horizontal plano) a $90^\circ$ (pared vertical vertical). Es la unidad utilizada en geología, estudios de amenaza por movimientos en masa y en los Planes de Ordenamiento Territorial (POT).
   - Según los estudios de susceptibilidad de Corantioquia y el POT de Medellín:
     - **Baja pendiente:** $< 15^\circ$ (valles aluviales, terrazas, apto para urbanización).
     - **Media pendiente:** $15^\circ - 30^\circ$ (laderas de transición, desarrollo condicionado).
     - **Pendiente crítica:** $> 30^\circ$ (escarpes y laderas de alta inestabilidad geotécnica, suelo de protección).
2. **Porcentaje ($\%$):** Calculado como $(\Delta Z / \Delta \text{Distancia}) \times 100$.
   - $45^\circ$ equivale al $100\%$. Una ladera de $60^\circ$ equivale al $173\%$. Es la unidad reglamentaria para diseño de rasantes de carreteras (norma INVIAS) y tuberías de alcantarillado.

### B. Orientación de Laderas (*Aspect*)
Indica la dirección cardinal hacia la cual desciende la máxima pendiente de cada celda. Se mide en grados azimutales de $0^\circ$ a $360^\circ$ en sentido horario desde el Norte:
- Norte: $0^\circ - 22.5^\circ$ y $337.5^\circ - 360^\circ$
- Este: $67.5^\circ - 112.5^\circ$
- Sur: $157.5^\circ - 202.5^\circ$
- Oeste: $247.5^\circ - 292.5^\circ$
- Plano (sin orientación): $-9999$ o $-1$

*Aplicación:* En la cuenca de La Iguaná, las laderas que miran al Oriente reciben el sol de la mañana (mayor evaporación temprana), mientras que las laderas que miran al Occidente reciben la radiación vespertina intensa, lo que condiciona la humedad del suelo y la susceptibilidad de taludes.

### C. Modelo de Sombreado (*Hillshade*)
Simula la iluminación del sol sobre el terreno tridimensional considerando dos parámetros astronómicos:
1. **Azimut de la fuente de luz:** Dirección cardinal de los rayos solares. El estándar universal de la cartografía técnica es **$315^\circ$ (Noroeste)**.
   > **¿Por qué 315° si el sol en Colombia sale por el Este?**  
   > El cerebro humano percibe el relieve por sombras arrojadas asumiendo luz cenital-izquierda. Si iluminamos el mapa desde el Sur o el Este, ocurre una ilusión óptica llamada **inversión de relieve (pseudoscopía)**: las cimas de las montañas se perciben como valles y los cauces de los ríos parecen cordilleras elevadas.
2. **Altitud de la fuente de luz:** Ángulo sobre el horizonte. El estándar es **$45^\circ$**.

*Técnica de relieve plástico 3D:* Si superpones el mapa de pendientes (en color) sobre el Hillshade y en las propiedades del mapa de pendientes configuras el **Modo de mezcla (*Blending Mode*) en "Multiplicar"**, obtendrás un plano topográfico de estándar profesional con textura de relieve tridimensional viva.

---

# PARTE 2: Teoría y Fundamentos de Álgebra de Mapas y Zonificación

## 2.1 Los 4 Tipos de Operaciones en Álgebra de Mapas

En 1990, el geógrafo Dana Tomlin formalizó el **Álgebra de Mapas** como un lenguaje formal para procesar capas matriciales geográficas. Todo algoritmo ráster cae dentro de una de estas cuatro familias:

1. **Operaciones Locales (Celda a Celda):**
   El valor de la celda de salida depende exclusivamente del valor de esa misma celda en una o varias capas de entrada.
   *Ejemplo:* Restar dos DEMs para calcular erosión o subsidencia ($\Delta Z = Z_{2026} - Z_{2016}$), o aplicar una condición booleana (`"pendiente@1" > 30`).
2. **Operaciones Focales (Vecindad Móvil):**
   El valor de la celda de salida se calcula a partir de los valores de sus 8 celdas vecinas inmediatas (ventana móvil de $3\times 3$).
   *Ejemplo:* Cálculo de la pendiente, orientación, sombreado (*Hillshade*) o filtros de suavizado espacial (media focal).
3. **Operaciones Zonales:**
   Calculan estadísticas resumidas (media, máximo, desviación estándar, suma) de los píxeles ráster que quedan comprendidos dentro de zonas delimitadas por polígonos vectoriales.
   *Ejemplo:* Con la herramienta *Estadísticas de Zona*, calcular la cota media o la pendiente máxima dentro de cada vereda de San Cristóbal o predio urbano.
4. **Operaciones Globales:**
   El valor de cada celda depende de la totalidad de la matriz territorial.
   *Ejemplo:* Cálculo de distancia euclidiana ráster a un río o acumulación hidrológica de flujo en una cuenca.

---

## 2.2 Sintaxis y Lógica Booleana en la Calculadora Ráster de QGIS

La **Calculadora Ráster** de QGIS (menú *Ráster → Calculadora ráster...*) permite evaluar expresiones algebraicas y lógicas:

- Cada banda ráster se referencia entre comillas dobles con su nombre y el sufijo de banda `@1`: `"dem_ctm12@1"`.
- **Evaluación lógica:** En la aritmética de computadores, toda proposición verdadera se evalúa a `1` y toda proposición falsa se evalúa a `0`.
- **Operadores de comparación:** `>`, `<`, `>=`, `<=`, `=`, `!=`.
- **Operadores lógicos:** `AND` (ambas deben cumplirse), `OR` (al menos una debe cumplirse), `NOT`.

### Casos de Aplicación Típicos:

#### Caso A: Máscara Binaria de Laderas Críticas
Aislar en blanco (`1`) las celdas con pendiente mayor a $30^\circ$ y en negro (`0`) el resto del territorio:
```sql
("pendiente_grados@1" > 30) * 1
```
*(Al multiplicar por 1 aseguramos que el resultado sea numérico entero).*

#### Caso B: Reclasificación Multicriterio de Susceptibilidad (POT de Medellín)
Construir un mapa de tres clases discretas sumando las evaluaciones booleanas multiplicadas por su código de categoría:
```sql
("pendiente_grados@1" < 15) * 1 + ("pendiente_grados@1" >= 15 AND "pendiente_grados@1" <= 30) * 2 + ("pendiente_grados@1" > 30) * 3
```
- Si la pendiente es de $8^\circ$: `(1)*1 + (0)*2 + (0)*3 = 1` (Baja).
- Si la pendiente es de $22^\circ$: `(0)*1 + (1)*2 + (0)*3 = 2` (Media).
- Si la pendiente es de $36^\circ$: `(0)*1 + (0)*2 + (1)*3 = 3` (Alta/Crítica).

---

## 2.3 Curvas de Nivel (Isolíneas)

Las **curvas de nivel** son líneas vectoriales continuas que unen puntos de idéntica cota altimétrica sobre el terreno. Permiten interpretar visualmente el relieve en planos 2D:
- **Equidistancia:** Diferencia constante de elevación vertical entre dos curvas consecutivas (ej. cada 25 m o cada 50 m).
- **Líneas densamente juntas:** Laderas empinadas, escarpes o cañones torrenciales.
- **Líneas ampliamente separadas:** Terrenos planos, llanuras de inundación o terrazas.
- **Forma en "V" que apunta aguas arriba:** Identifica el cauce de una quebrada o vaguada de drenaje.
- **Forma en "U" que apunta aguas abajo:** Identifica un filo o cuchilla divisoria de aguas.

### Jerarquía Cartográfica:
- **Curvas Intermedias:** Líneas finas de trazo suave (0.2 mm) que dibujan la equidistancia base (ej. cada 25 m).
- **Curvas Maestras o de Índice:** Líneas más gruesas (0.6 mm) y rotuladas con su número de cota cada 4 o 5 curvas intermedias (ej. cada 100 m). En QGIS se identifican mediante la función módulo matemático: `"ELEV" % 100 = 0`.

---

## 2.4 Perfiles Topográficos

Un **perfil topográfico** es una sección transversal o longitudinal que grafica en el eje vertical la cota altitudinal $Z$ (msnm) frente a la distancia horizontal acumulada $D$ (metros o kilómetros) a lo largo de un alineamiento.

En ingeniería civil e hidráulica, el **perfil longitudinal del cauce principal** de La Iguaná permite identificar:
- El quiebre de pendiente abrupto entre la zona de recarga torrencial (Boquerón, cota $> 2.600$) y el cono de deyección urbano (Cra 80 / Cra 70, cota $\sim 1.500$).
- Puntos de acumulación de energía donde se requieren azudes disipadores o muros de contención.

---

## 2.5 De Ráster a Vector: Poligonización y Cuantificación

El modelo ráster es computacionalmente eficiente para modelar la física continua del terreno, pero la gestión pública, la ingeniería de vías y el ordenamiento territorial requieren polígonos cerrados para:
- Conocer la cantidad exacta de **hectáreas ($ha$)** en condición de amenaza.
- Cruzar mediante geoprocesamiento vectorial (*Intersect*, *Clip*, *Spatial Join*) con predios catastrales, licencias de construcción y vías.

El algoritmo **Poligonizar (Ráster a Vectorial)** de GDAL agrupa todas las celdas contiguas que comparten el mismo valor entero y traza sus bordes como polígonos vectoriales. Posteriormente, en la tabla de atributos se calcula el área en hectáreas mediante la expresión de geometría:
```sql
$area / 10000
```
*(Dado que `$area` calcula metros cuadrados en CTM12, dividir entre $10.000\text{ m}^2/ha$ devuelve las hectáreas exactas).*

---

# PARTE 3: Ejercicios Prácticos Guiados (Paso a Paso en QGIS)

A continuación realizaremos el flujo completo de trabajo sobre la cuenca de La Iguaná utilizando QGIS LTR.

---

### Ejercicio Guiado 1: Inspección y Reproyección Estricta del DEM a CTM12

**Objetivo:** Convertir el DEM nativo en grados (`EPSG:4326`) a coordenadas métricas CTM12 (`EPSG:9377`) y recortarlo por el límite de la cuenca.

1. Abre un proyecto nuevo en QGIS y establece el CRS del proyecto en **EPSG:9377 (MAGNA-SIRGAS / Origen Nacional)** en la esquina inferior derecha.
2. Añade tu DEM crudo (menú *Capa → Añadir capa → Añadir capa ráster...* y selecciona `dem_boqueron_crudo.tif`).
3. Ve a las propiedades de la capa y verifica en la pestaña *Información* que la extensión esté en grados decimales (ej. $-75.6^\circ, 6.2^\circ$) y el CRS sea `EPSG:4326`.
4. Ve al menú superior: **Ráster → Proyecciones → Combar (reproyectar)...**
   - **Capa de entrada:** `dem_boqueron_crudo.tif`.
   - **SRC de origen:** `EPSG:4326 - WGS 84`.
   - **SRC de destino:** `EPSG:9377 - MAGNA-SIRGAS / Origen-Nacional`.
   - **Método de remuestreo:** `Bilineal` (suaviza y preserva el terreno sin pixelación).
   - **Valor sin datos adicional:** `-9999`.
   - **Resolución del archivo de salida:** `12.5` (para forzar píxeles cuadrados de 12.5 m).
   - **Reproyectado:** Guarda en disco como `dem_ctm12.tif`.
   - Haz clic en **Ejecutar**.
5. Abre la ventana de propiedades de `dem_ctm12.tif`: comprueba que las coordenadas ahora están en el orden de los millones (ej. $X \approx 4.800.000$, $Y \approx 2.400.000$), confirmando que está en metros CTM12.
6. *(Opcional)* Recorta el DEM por la cuenca: menú **Ráster → Extracción → Cortar ráster por capa de máscara...**, usando como máscara el polígono perimetral de La Iguaná y guardando como `dem_iguana_recorte_9377.tif`.

---

### Ejercicio Guiado 2: Derivación de Pendiente, Aspect y Hillshade

**Objetivo:** Obtener las tres capas del relieve y crear un modelo plástico 3D.

#### Paso 2.1: Mapa de Pendientes en Grados
1. Menú **Ráster → Análisis → Pendiente...**
2. Parámetros:
   - **Capa de entrada:** `dem_ctm12.tif`.
   - **Pendiente expresada en porcentaje:** **Desmarcada** (para obtener grados sexagesimales de $0^\circ$ a $90^\circ$).
   - **Factor Z:** `1.0` (ambas dimensiones están en metros).
   - **Pendiente:** Guarda como `pendiente_grados.tif`.
   - Haz clic en **Ejecutar**.
3. **Simbología:**
   - Clic derecho en `pendiente_grados` → *Propiedades → Simbología*.
   - Tipo de renderizador: **Monobanda pseudocolor**.
   - Interpolación: *Lineal*.
   - Rampa de color: Rampa invertida *RdYlGn* (Verde suave para pendientes $<15^\circ$, Amarillo para $15^\circ-30^\circ$, Rojo para $>30^\circ$).

#### Paso 2.2: Mapa de Sombreado (Hillshade)
1. Menú **Ráster → Análisis → Mapa de sombras (Hillshade)...**
2. Parámetros:
   - **Capa de entrada:** `dem_ctm12.tif`.
   - **Azimut de la luz:** `315.0` (Noroeste estándar).
   - **Altitud de la luz:** `45.0`.
   - **Factor Z:** `1.0`.
   - **Sombreado:** Guarda como `hillshade_315.tif`.
   - Haz clic en **Ejecutar**.

#### Paso 2.3: Efecto Plástico 3D (Blending)
1. En el panel de capas, organiza el orden: coloca `pendiente_grados` **encima** de `hillshade_315`.
2. Entra a las propiedades de `pendiente_grados`, ve a la pestaña **Simbología** y baja hasta la sección **Renderizado de capas**.
3. En **Modo de mezcla (*Blending mode*)**, selecciona **Multiplicar (*Multiply*)**.
4. Clic en *Aceptar*: observa cómo el color de las pendientes se fusiona con las sombras y crestas del Hillshade, generando un relieve plástico 3D nítido.

---

### Ejercicio Guiado 3: Álgebra de Mapas y Máscara Booleana de Amenaza

**Objetivo:** Aislar en una matriz binaria las celdas con pendiente crítica ($>30^\circ$) según la normativa técnica.

1. Ve al menú superior: **Ráster → Calculadora ráster...**
2. En la lista de bandas ráster haz doble clic sobre `"pendiente_grados@1"`.
3. Completa la expresión booleana estricta:
   ```sql
   ("pendiente_grados@1" > 30) * 1
   ```
4. Configura la salida:
   - **Capa de salida:** `mascara_critica_30.tif`.
   - **Formato de salida:** `GeoTIFF`.
   - **SRC de salida:** Confirmar `EPSG:9377`.
5. Haz clic en **Aceptar**.
6. Simboliza la capa `mascara_critica_30.tif`:
   - Renderizador: **Paleta / Valores únicos**.
   - Clic en *Clasificar*:
     - Valor `0`: Sin color (100% transparente) — Zonas no críticas.
     - Valor `1`: Rojo intenso semitransparente — Zonas de pendiente crítica $>30^\circ$.

---

### Ejercicio Guiado 4: Extracción y Estilización de Curvas de Nivel

**Objetivo:** Generar isolíneas cada 25 m con diferenciación de curvas maestras cada 100 m.

1. Menú **Ráster → Extracción → Curvas de nivel...**
2. Parámetros:
   - **Capa de entrada:** `dem_ctm12.tif`.
   - **Intervalo entre curvas de nivel:** `25.0` metros.
   - **Nombre del campo de elevación:** `ELEV`.
   - **Curvas de nivel:** Guarda en el GeoPackage del curso `proyecto_iguana.gpkg` con nombre de capa `curvas_nivel_25m`.
   - Clic en **Ejecutar**.
3. **Estilización por Reglas:**
   - Clic derecho en `curvas_nivel_25m` → *Propiedades → Simbología*.
   - Tipo de renderizador: **Basado en reglas (*Rule-based*)**.
   - Crea dos reglas:
     1. **Curvas Maestras (Índice):**
        - Filtro: `"ELEV" % 100 = 0`
        - Trazo: Marrón oscuro (`#784421`), anchura `0.55 mm`.
     2. **Curvas Secundarias (Intermedias):**
        - Filtro: `ELSE`
        - Trazo: Marrón claro (`#BA8C63`), anchura `0.20 mm`.
4. **Etiquetado de Curvas Maestras:**
   - Ve a la pestaña **Etiquetas**, selecciona *Etiquetado basado en reglas*.
   - Añade regla con filtro `"ELEV" % 100 = 0`, campo `ELEV`, tamaño `8 pt`, y en la pestaña *Buffer* activa un halo blanco protector de `1.0 mm` para evitar que la línea tape el texto de la cota.

---

### Ejercicio Guiado 5: Poligonización y Cuantificación en Hectáreas

**Objetivo:** Convertir la máscara de laderas críticas a polígonos vectoriales y calcular cuántas hectáreas ocupan.

1. Menú **Ráster → Conversión → Poligonizar (ráster a vectorial)...**
2. Parámetros:
   - **Capa de entrada:** `mascara_critica_30.tif`.
   - **Nombre del campo a crear:** `amenaza` (guardará el 0 o 1 de cada píxel).
   - **Vectorizado:** Guarda como capa vectorial en tu GeoPackage: `laderas_poligonizadas`.
   - Clic en **Ejecutar**.
3. **Filtrar solo la amenaza:**
   - Clic derecho sobre `laderas_poligonizadas` → *Filtro...*
   - Escribe: `"amenaza" = 1` y haz clic en *Aceptar*.
4. **Calcular área en Hectáreas:**
   - Abre la tabla de atributos (`F6`) y abre la **Calculadora de campos**.
   - Crear un campo nuevo:
     - Nombre: `area_ha`
     - Tipo: *Número decimal (real)*, precisión `2`.
     - Expresión:
       ```sql
       $area / 10000
       ```
     - Clic en *Aceptar* y guarda los cambios con el botón del lápiz.
5. **Estadística total:**
   - Ve al menú *Vectorial → Herramientas de análisis → Estadísticas básicas para campos...*
   - Selecciona la capa `laderas_poligonizadas` y el campo `area_ha`: obtendrás la **suma total en hectáreas** de laderas críticas en la cuenca.

---

# PARTE 4: Autoevaluación para el Quiz 3

Responde estas preguntas sin mirar las soluciones. Luego compara tus respuestas con la explicación técnica.

### Preguntas Teóricas

**P1.** ¿Cuál es la diferencia conceptual entre un MDT y un MDS, y cuál de los dos es el exigido para estudios de inundación y delimitación de cuencas hidrográficas?  
**P2.** Un estudiante calculó la pendiente de un DEM sin reproyectar en `EPSG:4326`. El resultado arrojó un valor promedio de $89.85^\circ$ en toda la cuenca. Explica matemáticamente la causa del error.  
**P3.** De acuerdo con la clasificación de Dana Tomlin (1990), ¿qué tipo de operación es el cálculo de pendientes mediante ventana móvil $3\times 3$?  
**P4.** ¿Por qué se utiliza un azimut de iluminación solar de $315^\circ$ (Noroeste) en la generación de sombreados (*Hillshade*) en lugar de la trayectoria solar real de Colombia?  
**P5.** ¿Qué valor devuelve en la Calculadora Ráster la expresión `("dem@1" > 2000)` para un píxel cuya elevación es $2.450\text{ msnm}$, y qué valor para un píxel de $1.820\text{ msnm}$?  
**P6.** En la extracción de curvas de nivel, ¿qué función matemática permite filtrar únicamente las curvas maestras que sean múltiplos de 100 metros en la tabla de atributos?

---

### Solucionario y Explicaciones Técnicas

* **R1:** El **MDT** modela la superficie del suelo desnudo (*bare earth*), habiendo eliminado vegetación y edificaciones; el **MDS** captura la primera superficie reflectora (copas de árboles y techos). Para hidrología y cuencas es indispensable el **MDT**, pues el agua fluye por el suelo natural y no sobre las copas de los árboles.
* **R2:** En `EPSG:4326`, las coordenadas horizontales $X, Y$ están en grados decimales mientras que la cota $Z$ está en metros. Dado que $1^\circ \approx 111\text{ km}$, el denominador en $\Delta Z / \Delta X$ es un decimal extremadamente pequeño ($\approx 0.0001$), lo que genera cocientes artificialmente gigantescos cuya arcotangente se aproxima a $90^\circ$.
* **R3:** Es una **Operación Focal**, porque el valor de la celda central se calcula a partir de la matriz de vecindad de $3\times 3$ celdas contiguas.
* **R4:** Para evitar la **inversión de relieve (pseudoscopía)**. El cerebro humano interpreta sombras asumiendo iluminación superior-izquierda (Noroeste, $315^\circ$). Iluminar desde el Este o Sur hace que las montañas se perciban visualmente como depresiones o cañones.
* **R5:** Devuelve **`1`** (Verdadero) para el píxel de $2.450\text{ msnm}$ y **`0`** (Falso) para el píxel de $1.820\text{ msnm}$.
* **R6:** El operador **Módulo (`%`)**: `"ELEV" % 100 = 0`, el cual devuelve `0` solo cuando el número es divisible exactamente entre 100.

---

# PARTE 5: Lista de Chequeo Previa al Quiz 3

Antes de presentar el Quiz 3, verifica que dominas cada una de estas habilidades técnicas en QGIS:

- [ ] Sé comprobar el SRC nativo de un archivo ráster y sé que si está en `EPSG:4326` no puedo calcular pendientes.
- [ ] Domino el uso de **GDAL Warp (Combar)** para reproyectar rásteres a `EPSG:9377` con remuestreo *Bilineal*.
- [ ] Conozco los parámetros de la herramienta **Pendiente** y sé que el Factor Z debe ser `1.0` si el ráster está en metros.
- [ ] Sé generar un **Hillshade** con azimut $315^\circ$ y altitud $45^\circ$, y aplicarle modo de fusión *Multiplicar*.
- [ ] Escribo con soltura expresiones booleanas condicionales en la **Calculadora Ráster**: `("capa@1" > 30) * 1`.
- [ ] Sé ejecutar **Poligonizar (Ráster a Vectorial)** para transformar máscaras binarias a polígonos vectoriales.
- [ ] Sé crear el campo `area_ha` con la fórmula `$area / 10000` en la calculadora de campos vectorial.
- [ ] Extraigo curvas de nivel con **GDAL Contour** y las filtro con la regla `"ELEV" % 100 = 0`.
- [ ] Sé guardar capas vectoriales directamente dentro de un archivo **GeoPackage (`.gpkg`)** en `EPSG:9377`.
