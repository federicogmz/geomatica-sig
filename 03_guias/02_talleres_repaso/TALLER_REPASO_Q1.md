# Taller de Repaso — Previo al Quiz 1: Fundamentos Cartográficos y CTM12

**Semana sugerida:** Semana 2 a inicios de Semana 3 · **Tiempo estimado de trabajo autónomo:** 60–90 min  
**Modalidad:** Individual o en parejas de estudio · **Materiales:** Calculadora científica, regla graduada en milímetros y lápiz.

> [!NOTE]
> Este taller está diseñado específicamente para que repases y consolides los conceptos evaluados en el **Quiz 1 (8%)**. Si dominas cada uno de los 5 escenarios planteados aquí, llegarás con total seguridad a la evaluación presencial.

---

## Escenario 1: Escalas, Fotocopiadoras y Distorsión de Planos

### Concepto Clave
- **Escala numérica ($1:E$):** Relación matemática fija entre la distancia en el papel ($d$) y la distancia real en el terreno ($D$):
  $$D = d \times E$$
- **Escala gráfica:** Barra segmentada dibujada sobre el mapa.
- **La trampa de la fotocopiadora:** Cuando un plano original se fotocopia, escanea o imprime con la opción *"Ajustar al área de impresión"*, el documento se encoge o se agranda (por ejemplo, al 95% o al 104%).
  - La **escala numérica queda obsoleta** y genera errores sistemáticos de medición.
  - La **escala gráfica se distorsiona en la misma proporción** que el resto del plano, por lo que **sigue siendo matemáticamente válida**.

---

### Ejercicio Resuelto 1.1
Un plano catastral de la cuenca media de La Iguaná indica una escala numérica de $1:5\,000$. En el papel original, una barra de escala gráfica de $200\text{ m}$ medía exactamente $4.0\text{ cm}$.  
Al recibir una copia digital escaneada, imprimes la lámina y mides la barra gráfica con tu regla: ahora mide **$3.8\text{ cm}$**.
1. ¿A qué porcentaje se redujo la copia?
2. Si mides en la copia un tramo de la quebrada que da $6.5\text{ cm}$, ¿cuál es su longitud real en el terreno si utilizas la escala gráfica distorsionada?
3. ¿Qué error en metros cometerías si hubieras usado ciegamente la escala numérica $1:5\,000$?

#### Solución:
1. **Factor de reproducción:**
   $$\text{Factor} = \frac{3.8\text{ cm}}{4.0\text{ cm}} = 0.95 = 95\% \quad (\text{se redujo un } 5\%)$$
2. **Medición con la escala gráfica calibrada:**
   Si $3.8\text{ cm}$ en la copia representan $200\text{ m}$ reales:
   $$\text{Factor de escala real de la copia} = \frac{200\text{ m}}{3.8\text{ cm}} = 52.6316\text{ m/cm}$$
   $$\text{Distancia real} = 6.5\text{ cm} \times 52.6316\text{ m/cm} = \mathbf{342.1\text{ m}}$$
3. **Error al usar la escala numérica $1:5\,000$:**
   $$\text{Distancia errónea} = 6.5\text{ cm} \times 50\text{ m/cm} = 325.0\text{ m}$$
   $$\text{Error cometido} = |342.1\text{ m} - 325.0\text{ m}| = \mathbf{17.1\text{ m}}$$
   *(Un error de 17 metros en una quebrada urbana puede significar ubicar una vivienda dentro o fuera de la faja de retiro legal).*

---

### Ejercicio de Práctica 1.2 (Para resolver tú mismo)
Tienes una copia de un plano vial de San Cristóbal con escala nominal $1:2\,000$. La escala gráfica indica $100\text{ m}$ en el terreno, pero al medirla con tu regla mide **$5.2\text{ cm}$** (en lugar de los $5.0\text{ cm}$ que debería medir a $1:2\,000$).
- [ ] Calcula la distancia real de un retiro que en la lámina mide $2.6\text{ cm}$.
- [ ] Determina si la copia fue ampliada o reducida, y en qué porcentaje.
*(Respuesta: Distancia real $= 50.0\text{ m}$; la copia fue ampliada al $104\%$).*

---

## Escenario 2: Resolución Espacial de Píxel y Detección de Amenazas

### Concepto Clave: El Criterio de Muestreo de Nyquist
Para detectar con certeza un objeto o rasgo morfológico en una imagen ráster o satelital (sin confundirlo con ruido o artefactos de compresión), la dimensión del píxel ($R$) debe ser **como máximo la mitad del tamaño característico del objeto ($W$)**:
$$R \le \frac{W}{2}$$
- Para una grieta de $2.0\text{ m}$ de ancho: se requiere un píxel $R \le 1.0\text{ m}$.
- Una imagen de **Sentinel-2** ($10\text{ m/píxel}$) **NO sirve** para cartografiar grietas de $2\text{ m}$ ni fallas menores, pues una celda de $100\text{ m}^2$ promedia la reflectancia de la grieta con el pasto, el suelo y las copas de los árboles adyacentes.
- Se requeriría ortofoto de dron ($< 0.1\text{ m}$) o satélite de muy alta resolución (Pleiades Neo, WorldView-3 con $0.3$ a $0.5\text{ m}$).

---

### Ejercicio de Práctica 2.1
En la ladera de Blanquizal se identifican grietas de tracción de $1.5\text{ m}$ de apertura previa a un deslizamiento rotacional.
1. ¿Cuál es el tamaño máximo de píxel admisible para poder delimitar estas grietas?
2. Si un colega propone usar imágenes gratuitas Landsat 8/9 ($30\text{ m}$) o Sentinel-2 ($10\text{ m}$), ¿cuál es tu respuesta técnica como ingeniero?
*(Respuesta: Máximo píxel admisible $\le 0.75\text{ m}$. Las imágenes Landsat y Sentinel promedian completamente el rasgo; son útiles para coberturas vegetales y humedad regional, pero totalmente inadecuadas para micro-geotecnia).*

---

## Escenario 3: Conversión de Coordenadas Sexagesimales (GMS) a Decimales

### Fórmulas Oficiales
$$\text{Grados Decimales} = \text{Grados} + \frac{\text{Minutos}}{60} + \frac{\text{Segundos}}{3600}$$

> [!IMPORTANT]
> - Latitud Norte ($\text{N}$) es **positiva (+)**.
> - Latitud Sur ($\text{S}$) es **negativa (-)**.
> - Longitud Este ($\text{E}$) es **positiva (+)**.
> - Longitud Oeste ($\text{O / W}$) es **negativa (-)**. ¡En Colombia la longitud siempre es negativa!

---

### Ejercicio Resuelto 3.1
Convierte a Grados Decimales la coordenada del Centro de Medellín:
$$\text{Latitud: } 6^\circ 15' 08.4''\text{ N}, \quad \text{Longitud: } 75^\circ 34' 22.8''\text{ O}$$

#### Solución:
$$\text{Latitud} = 6 + \frac{15}{60} + \frac{8.4}{3600} = 6 + 0.25 + 0.002333 = \mathbf{+6.252333^\circ}$$
$$\text{Longitud} = -\left(75 + \frac{34}{60} + \frac{22.8}{3600}\right) = -(75 + 0.566667 + 0.006333) = \mathbf{-75.573000^\circ}$$

---

### Ejercicio Resuelto 3.2 (Decimal a GMS)
Convierte a Grados, Minutos y Segundos la longitud **$-75.6540^\circ$** (Alto de Boquerón):
1. Grados enteros: $75^\circ$ Oeste.
2. Parte decimal: $0.6540 \times 60 = 39.24'$ $\rightarrow$ Minutos enteros: $39'$.
3. Parte decimal restante: $0.24 \times 60 = \mathbf{14.4''}$.
4. Resultado: $\mathbf{75^\circ 39' 14.4''\text{ O}}$ (o $-75^\circ 39' 14.4''$).

---

### Ejercicios de Práctica 3.3
- [ ] Convierte a decimal: $6^\circ 20' 00''\text{ N}, \quad 75^\circ 40' 30''\text{ O}$  
  *(Respuesta: $+6.333333^\circ\text{ N}, -75.675000^\circ\text{ O}$)*
- [ ] Convierte a GMS: Latitud $+6.2836^\circ$, Longitud $-75.5824^\circ$  
  *(Respuesta: $6^\circ 17' 00.96''\text{ N}, \quad 75^\circ 34' 56.64''\text{ O}$)*

---

## Escenario 4: El Desplazamiento por Cambio de Datum (Bogotá 1975 vs. MAGNA-SIRGAS)

### Concepto Clave
- **Datum:** Define la posición del elipsoide de referencia respecto al centro de masa de la Tierra.
- **Datum Bogotá (Observatorio Astronómico de Bogotá - Hayford 1924):** No es geocéntrico; su origen físico se fijó en Bogotá en el siglo XX.
- **MAGNA-SIRGAS (GRS80 / WGS84):** Geocéntrico, compatible con satélites GPS/GNSS modernos.
- **Consecuencia de omitir la transformación:** Si cargas un plano levantado en Datum Bogotá asumiendo que está en MAGNA-SIRGAS (o viceversa), los puntos aparecerán **desplazados aproximadamente 500 metros en dirección horizontal** en el territorio colombiano.

---

### Ejercicio de Práctica 4.1
Un perito topógrafo entrega un plano de un lote en San Javier con coordenadas:
$$N = 1\,180\,500\text{ m}, \quad E = 832\,100\text{ m}$$
Al cargarlo en QGIS sobre la ortofoto de GeoMedellín (que está en MAGNA-SIRGAS), el lote aparece en medio del cauce del Río Medellín, a $520\text{ m}$ al oriente de su posición real.
1. ¿Cuál es la causa técnica de este error?
2. ¿Se soluciona simplemente cambiando el CRS del proyecto en las propiedades de QGIS? Justifica.
*(Respuesta: 1. La capa fue levantada en el Datum Bogotá antiguo (Origen West / Medellín) y fue interpretada sin realizar la transformación geodésica de datum. 2. NO. Cambiar el CRS del proyecto solo cambia cómo se dibuja el lienzo, pero no recalcula las coordenadas intrínsecas de los vértices. Debe aplicarse una reproyección de capa con transformación geodésica oficial del IGAC).*

---

## Escenario 5: Cálculo Manual de Coordenadas Planas CTM12 (EPSG:9377)

### Concepto y Parámetros del Origen Nacional CTM12 (Res. 471/2020 IGAC)
- **Latitud de referencia ($\phi_0$):** $4^\circ 00' 00''\text{ N} = 4.0^\circ\text{ N}$
- **Longitud central ($\lambda_0$):** $73^\circ 00' 00''\text{ O} = -73.0^\circ$
- **Falso Norte ($N_0$):** $2\,000\,000.0\text{ m}$
- **Falso Este ($E_0$):** $5\,000\,000.0\text{ m}$

### Fórmula de Aproximación Manual (Válida para cálculo rápido en aula):
$$\Delta \phi = \phi - \phi_0 \quad (\text{en grados decimales})$$
$$\Delta \lambda = \lambda - \lambda_0 \quad (\text{en grados decimales})$$
$$N \approx N_0 + (\Delta \phi \times 111\,139\text{ m/}^\circ)$$
$$E \approx E_0 + (\Delta \lambda \times 111\,139\text{ m/}^\circ \times \cos(\phi_{\text{prom}}))$$

*Donde:*
- $1^\circ$ de meridiano $\approx 111\,139\text{ m}$.
- $\cos(\phi_{\text{prom}})$ ajusta la convergencia de meridianos según la latitud media. Para Medellín ($\approx 6.25^\circ$), $\cos(6.25^\circ) \approx 0.99405$.

---

### Ejercicio Resuelto 5.1
Calcula a mano las coordenadas CTM12 aproximadas para la desembocadura de La Iguaná en el Río Medellín:
$$\text{Latitud } \phi = 6.2650^\circ\text{ N}, \quad \text{Longitud } \lambda = -75.5780^\circ$$

#### Solución:
1. **Diferenciales angulares:**
   $$\Delta \phi = 6.2650^\circ - 4.0000^\circ = +2.2650^\circ$$
   $$\Delta \lambda = -75.5780^\circ - (-73.0000^\circ) = -2.5780^\circ$$
2. **Cálculo de Norte CTM12:**
   $$N \approx 2\,000\,000 + (2.2650 \times 111\,139) = 2\,000\,000 + 251\,730 = \mathbf{2\,251\,730\text{ m}}$$
3. **Cálculo de Este CTM12:**
   $$\text{Factor zonal de longitud} = 111\,139 \times \cos(5.13^\circ) \approx 111\,139 \times 0.9960 \approx 110\,694\text{ m/}^\circ$$
   $$E \approx 5\,000\,000 + (-2.5780 \times 110\,694) = 5\,000\,000 - 285\,369 = \mathbf{4\,714\,631\text{ m}}$$
*(Nota: En la proyección Transversa de Mercator estricta de QGIS da $N \approx 2\,251\,480\text{ m}, E \approx 4\,715\,120\text{ m}$; la aproximación manual tiene un error de unos cientos de metros que es perfectamente normal y esperado para un cálculo en calculadora).*

---

### Ejercicio de Práctica 5.2
Calcula a mano las coordenadas CTM12 aproximadas del nacimiento de La Iguaná en el Alto de Boquerón:
$$\phi = 6.3335^\circ\text{ N}, \quad \lambda = -75.6540^\circ$$
- [ ] Calcula $\Delta \phi$ y $\Delta \lambda$.
- [ ] Determina el Norte aproximado.
- [ ] Determina el Este aproximado.
*(Respuesta: $\Delta \phi = +2.3335^\circ$, $\Delta \lambda = -2.6540^\circ$; $N \approx 2\,259\,353\text{ m}$, $E \approx 4\,706\,218\text{ m}$).*

---

## Lista de Chequeo para Llegar Preparado al Quiz 1

Antes de entrar a la clase de la Semana 3, verifica que puedes responder afirmativamente a cada punto:

- [ ] Sé cómo calcular la escala real de un plano fotocopiado a partir de su escala gráfica distorsionada.
- [ ] Puedo explicar por qué un píxel de $10\text{ m}$ de Sentinel-2 no sirve para identificar grietas de $2\text{ m}$.
- [ ] Convierto cualquier coordenada GMS a Grados Decimales en menos de 2 minutos con mi calculadora.
- [ ] Convierto Grados Decimales a GMS descomponiendo la parte entera y multiplicando por 60.
- [ ] Sé de memoria los parámetros de CTM12: Latitud $4^\circ\text{ N}$, Longitud $73^\circ\text{ O}$, Falso Norte $2\,000\,000\text{ m}$, Falso Este $5\,000\,000\text{ m}$, código EPSG:9377.
- [ ] Sé explicar la diferencia conceptual entre Datum Bogotá y MAGNA-SIRGAS y sé por qué se desplazan $\approx 500\text{ m}$ si no se transforman.
