# G02: Taller de escalas, coordenadas y lectura cartográfica

**Módulo 0 · Semanas 2–3 · Bloque de laboratorio (4:30–6:00 p.m.)** · Trabajo en equipo (el mismo grupo del Proyecto Integrador) · Con el mapa digital en el PC del laboratorio · Calculadora, libreta y visor de PDF calibrado.

> **Importante para la Ruta de Mejora Activa:** Guarden cuidadosamente todos sus cálculos manuales de escala y coordenadas de este taller. En la **Semana 4**, al cargar capas y CSV en QGIS, contrastarán estos valores a mano contra las mediciones digitales geodésicas de QGIS, mecanismo con el cual podrán recuperar nota del **Quiz 1**.

---

## Materiales y Protocolo de Medición Digital

Para evitar distorsiones derivadas del tamaño del monitor o el escalado de pantalla:
1. **Visor de PDF con zoom calibrado:** Abran el archivo de mapa asignado en el visor de PDF (Adobe Acrobat o navegador web). Configuren la visualización obligatoriamente al **100% ("Tamaño real")** o utilicen la **herramienta de medición digital** integrada en Adobe Acrobat (*Herramientas → Medir*), configurada en milímetros.
2. **Uso preferente de la Escala Gráfica:** Si el mapa contiene una barra de escala gráfica, midan la longitud de la barra en pantalla y compárenla con la magnitud que representa en el terreno. De esta forma, la escala calculada será exacta sin importar el nivel de ampliación de la pantalla.

---

## Parte 1: Escala y Dimensiones Reales (Semana 2)

### Ejemplo resuelto
Un mapa no incluye escala numérica visible, pero en el visor a escala real una cancha de fútbol reglamentaria (105 m de largo en el terreno) mide 2.1 cm en el documento digital:

$$\text{Escala} = \frac{\text{Distancia en el mapa}}{\text{Distancia real}} = \frac{2.1\text{ cm}}{10\,500\text{ cm}} = \frac{1}{5\,000}$$

El mapa se encuentra a escala **1:5.000**.

### Referencias de dimensiones reales típicas en el Valle de Aburrá
| Elemento Urbano / Territorial | Dimensión Real Promedio |
|---|---|
| Cancha de fútbol reglamentaria | 105 × 68 m |
| Piscina olímpica | 50 × 25 m |
| Vía principal (ancho por carril) | ≈3.5 m |
| Manzana urbana típica consolidada | ≈80 – 100 m de lado |
| Faja de retiro hídrico legal (POT Medellín) | 30 m a cada lado del cauce |

### Ejercicio 1.1: Determinación de escala del mapa
Ubiquen en el mapa digital asignado un elemento de dimensión conocida (una cancha, un tramo de vía principal o una manzana regular). Midan el elemento a escala 100% y calculen la escala numérica:

- Elemento de referencia usado: ______________________
- Dimensión real conocida ($D$): ______________________
- Dimensión medida en el mapa ($d$): ______________________
- **Escala numérica calculada ($1 : N$):** 1 : ______________________

### Ejercicio 1.2: Distancia real en la Cuenca de La Iguaná
Con la escala calculada, midan la distancia en línea recta entre dos hitos visibles de la cuenca (por ejemplo: cruce de la quebrada con la Carrera 80 y la desembocadura en el Río Medellín):

- Hitos seleccionados: ______________________
- Distancia medida en el mapa ($d$): ______________________
- **Distancia real calculada ($D = d \times N$, en metros y km):** ______________________

### Ejercicio 1.3: Estimación de área real
Seleccionen un polígono definido (un lote, un parque o un sector de ladera). Aproxímenlo a una figura geométrica regular (rectángulo o trapecio), calculen su área en el mapa y transfórmenla a área real en hectáreas ($1\text{ ha} = 10\,000\text{ m}^2$):

> *Regla mnemotécnica:* Si la escala lineal es $1:N$, la escala de área es $1:N^2$.

- Sector o polígono seleccionado: ______________________
- Área medida en el mapa ($cm^2$): ______________________
- **Área real calculada ($m^2$ y hectáreas):** ______________________

---

## Parte 2: Coordenadas Geográficas (Semana 2)

### Ejemplo resuelto: Conversión GMS a Decimal
Para la longitud de Medellín: $75^\circ\,34'\,10''\text{ W}$:
$$\text{Longitud decimal} = -\left(75 + \frac{34}{60} + \frac{10}{3600}\right) = -75.569444^\circ$$

### Ejercicio 2.1: Conversión a Grados Decimales (4 decimales)
| Hito Territorial | Coordenada GMS | Coordenada en Grados Decimales |
|---|---|---|
| **Punto A (Nacimiento Boquerón)** | $6^\circ\,20'\,01''\text{ N}, 75^\circ\,39'\,14''\text{ W}$ | |
| **Punto B (Desembocadura Río Medellín)** | $6^\circ\,15'\,25''\text{ N}, 75^\circ\,34'\,16''\text{ W}$ | |

### Ejercicio 2.2: Conversión de Decimales a GMS
| Hito Territorial | Grados Decimales | Grados, Minutos y Segundos (GMS) |
|---|---|---|
| **Punto C (Campus EAFIT)** | $6.2006^\circ\text{ N}, -75.5779^\circ\text{ W}$ | |
| **Punto D (Presa Cra. 70)** | $6.2625^\circ\text{ N}, -75.5890^\circ\text{ W}$ | |

---

## Parte 3: Coordenadas Planas — MAGNA-SIRGAS Origen Nacional CTM12 (Semana 3)

Colombia unificó sus sistemas cartográficos oficiales mediante la **Resolución 471 de 2020 del IGAC**, adoptando la proyección **Transversa de Mercator con Origen Nacional único (CTM12 / EPSG:9377)**.

| Parámetro Geodésico | Valor Oficial CTM12 |
|---|---|
| **Código EPSG** | **9377** |
| **Latitud de origen ($\varphi_0$)** | $4^\circ\,00'\,00''\text{ N}$ |
| **Meridiano central ($\lambda_0$)** | $73^\circ\,00'\,00''\text{ W}$ |
| **Factor de escala central ($k_0$)** | $0.9992$ |
| **Falso Este ($X_0$)** | $5\,000\,000\text{ m}$ |
| **Falso Norte ($Y_0$)** | $2\,000\,000\text{ m}$ |

### Fórmula de aproximación esférica manual
Para comprender el funcionamiento de la cuadrícula proyectada sin recurrir al elipsoide completo:

$$\text{Norte} \approx Y_0 + (\text{lat} - \varphi_0) \times 111\,320 \times k_0$$
$$\text{Este} \approx X_0 + (\text{lon} - \lambda_0) \times 111\,320 \times \cos(\text{lat}) \times k_0$$

*(Donde $111\,320\text{ m}$ es la longitud aproximada de un grado de meridiano terrestre).*

### Ejercicio 3.1: Coordenadas CTM12 de los extremos de La Iguaná
Calculen a mano las coordenadas CTM12 proyectadas para el nacimiento y la desembocadura de la cuenca utilizando sus coordenadas decimales del Ejercicio 2.1:

1. **Nacimiento (Alto de Boquerón: $\approx 6.3335^\circ\text{ N}, -75.6540^\circ\text{ W}$):**
   - $\text{Norte manual} \approx$ ______________________ m
   - $\text{Este manual} \approx$ ______________________ m
2. **Desembocadura en el Río Medellín ($\approx 6.2570^\circ\text{ N}, -75.5710^\circ\text{ W}$):**
   - $\text{Norte manual} \approx$ ______________________ m
   - $\text{Este manual} \approx$ ______________________ m

> **Aviso para la Semana 4:** Anoten estos cuatro valores en sus libretas. En la Semana 4 los cargarán en QGIS vía CSV y compararán la coordenada manual contra el algoritmo geodésico exacto.

---

## Parte 4: Datum y Geodesia Aplicada

Respondan en equipo de manera concisa:

1. ¿Cuál es la diferencia física entre el **Datum Bogotá** (referenciado al elipsoide internacional de Hayford con punto astronómico en el Observatorio de Bogotá) y el sistema **MAGNA-SIRGAS** (geocéntrico y satelital)?
2. Si un ingeniero civil proyecta una tubería en QGIS superponiendo una capa histórica en Datum Bogotá con una capa catastral reciente en MAGNA-SIRGAS sin reproyectar, ¿qué magnitud de desplazamiento espacial aproximado se observará en el terreno en Medellín?
3. ¿Qué ventajas operativas representa el **Origen Nacional CTM12** frente al esquema anterior de los cinco orígenes Gauss-Krüger (Bogotá, Este Central, Este Este, Oeste, Oeste Oeste) para obras de infraestructura que cruzan varios departamentos?

---

## Cierre: Validación Territorial de La Iguaná

Abran el geoportal [Colombia en Mapas](https://www.colombiaenmapas.gov.co/) o [GeoMedellín](https://geomedellin.medellin.gov.co/):
- Verifiquen que las coordenadas Este calculadas oscilen entre $4\,700\,000$ y $4\,720\,000\text{ m}$, y las coordenadas Norte entre $2\,215\,000$ y $2\,230\,000\text{ m}$. Si obtienen valores fuera de este rango, revisen los signos de la longitud occidental ($\lambda < 0$).
- Guarden sus hojas de cálculo para la práctica de QGIS de la Semana 4.
