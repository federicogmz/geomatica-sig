# G03: Geodesia práctica, cálculo de coordenadas CTM12 y georreferenciación de planos

> **Módulo 0 · Semana 3 · Bloque de laboratorio (4:30–6:00 p.m., 90 min)**  
> **Modalidad:** Taller práctico guiado en laboratorio y trabajo autónomo de repaso  
> **Insumos requeridos:** Calculadora científica, regla milimetrada, visor de PDF y QGIS (herramienta Georreferenciador).  
> **Estudio de caso:** Cuenca de la Quebrada La Iguaná (Sector Boquerón – Presa de Laminación Cra. 70).  

---

## 1. Propósito y Conexión con la Clase

En la sesión teórica de hoy aprendimos la transición geodésica del país: por qué el antiguo **Datum Bogotá** (origen central) generaba desplazamientos de más de 500 metros frente a receptores GPS modernos, y cómo la Resolución IGAC 471 de 2020 adoptó el sistema oficial **MAGNA-SIRGAS Origen Nacional CTM12 (EPSG:9377)**.

Este taller tiene dos objetivos fundamentales que practicarán hoy en el laboratorio y repasarán durante la semana:
1. **Cálculo analítico y manual:** Determinar las coordenadas métricas Este ($X$) y Norte ($Y$) en CTM12 para puntos clave de La Iguaná a partir de coordenadas geográficas.
2. **Georreferenciación en QGIS:** Tomar un plano catastral antiguo escaneado (sin coordenadas digitales) y anclarlo al territorio real asignándole puntos de control de terreno (GCP).

---

## 2. Paso a Paso en el Laboratorio

### Parte 1: Cálculo Analítico en CTM12 con la Fórmula Simplificada (30 min)

Para el territorio continental colombiano, la transformación de coordenadas geográficas (Latitud $\varphi$, Longitud $\lambda$ en grados decimales) al Origen Nacional CTM12 puede aproximarse con la siguiente formulación métrica:

$$\text{Norte } (Y) \approx 2\,000\,000 + (\text{lat} - 4.0) \times 111\,320 \times 0.9992$$

$$\text{Este } (X) \approx 5\,000\,000 + (\text{lon} - (-73.0)) \times 111\,320 \times \cos(\text{lat}) \times 0.9992$$

#### Ejercicio de aplicación:
Tomen el punto de aforo y estación meteorológica en el nacimiento de La Iguaná (Alto de Boquerón):
- **Latitud ($\varphi$):** $6^\circ\ 17'\ 24''\text{ N}$
- **Longitud ($\lambda$):** $75^\circ\ 36'\ 00''\text{ O}$

1. **Paso 1:** Conviertan ambas coordenadas a grados decimales con mínimo 6 cifras decimales:
   $$\text{lat} = 6 + \frac{17}{60} + \frac{24}{3600} = 6.290000^\circ\text{ N}$$
   $$\text{lon} = -(75 + \frac{36}{60} + \frac{0}{3600}) = -75.600000^\circ\text{ O}$$

2. **Paso 2:** Calculen la coordenada Norte CTM12:
   $$\Delta \text{lat} = 6.290000 - 4.0 = 2.290000^\circ$$
   $$\text{Norte} \approx 2\,000\,000 + (2.290000 \times 111\,320 \times 0.9992) = 2\,254\,719.4\text{ m}$$

3. **Paso 3:** Calculen la coordenada Este CTM12 (recuerden calcular el coseno en modo Grados / *DEG*):
   $$\Delta \text{lon} = -75.600000 - (-73.0) = -2.600000^\circ$$
   $$\cos(6.29^\circ) \approx 0.99398$$
   $$\text{Este} \approx 5\,000\,000 + (-2.600000 \times 111\,320 \times 0.99398 \times 0.9992) = 4\,712\,541.6\text{ m}$$

*(Verifiquen que el Este ronde los 4.7 millones y el Norte los 2.2 millones: este es el rango característico de Medellín y el Valle de Aburrá en CTM12).*

---

### Parte 2: Georreferenciación de Planos Escaneados en QGIS (40 min)

La Alcaldía de Medellín les suministra el archivo raster escaneado `plano_historico_cra70.png` correspondiente a una faja de terreno cercana a la presa de laminación de La Iguaná.

```
+-------------------------------------------------------------+
|  QGIS: Capa → Georreferenciador (Georeferencer)             |
|                                                             |
|   1. Cargar Ráster: plano_historico_cra70.png               |
|   2. Añadir Punto (GCP): Clic en esquina conocida           |
|   3. Ingresar Coordenadas X/Y o "Desde el lienzo del mapa"  |
|   4. Configuración de transformación: Polinomial 1 o Helmert|
|   5. CRS de destino: EPSG:9377 (MAGNA CTM12)                |
+-------------------------------------------------------------+
```

1. **Abrir la herramienta:** En QGIS, vayan al menú superior **Capa → Georreferenciador...** (o *Ráster → Georreferenciador* según su versión).
2. **Cargar la imagen escaneada:** Hagan clic en el ícono **Abrir ráster** y seleccionen `plano_historico_cra70.png`.
3. **Identificar puntos de control de terreno (GCP):**
   - Busquen mínimo 4 puntos geométricos inconfundibles: intersecciones viales consolidadas (ej. Cra 70 con Calle 53) o esquinas de edificaciones históricas.
4. **Asignar coordenadas:**
   - Hagan clic en la herramienta **Añadir punto** ($+$).
   - Hagan clic exacto sobre la intersección en el plano escaneado.
   - En la ventana emergente, elijan la opción **Desde el lienzo del mapa (*From Map Canvas*)**.
   - QGIS los llevará al mapa base de OpenStreetMap o GeoMedellín: hagan clic sobre el mismo cruce vial real.
   - Repitan el procedimiento para 4 esquinas bien distribuidas.
5. **Configuración de transformación:**
   - Hagan clic en el ícono de engranaje (*Configuración de la transformación*).
   - Tipo de transformación: **Polinomial 1** o **Helmert** (ideal para planos con ligera rotación y escala).
   - Método de remuestreo: **Bilineal** o **Vecino más próximo**.
   - **SRC de destino:** `EPSG:9377` (MAGNA-SIRGAS / Origen Nacional CTM12).
   - Ráster de salida: `plano_cra70_georreferenciado_9377.tif`.
   - Marquen la casilla: **Cargar en QGIS al terminar**.
6. **Ejecutar georreferenciación:** Clic en el botón verde de reproducción (*Comenzar georreferenciación*).
7. **Verificación visual en el lienzo:** Ajusten la transparencia del ráster georreferenciado al 60% y comprueben que la Carrera 70 del plano coincida con la calzada real del mapa base.

---

## 3. Ejercicios para Repaso Autónomo durante la Semana

1. **Cálculo de coordenadas del Puente de Colombia:**
   - Coordenadas geográficas: $6^\circ\ 15'\ 32.4''\text{ N}, 75^\circ\ 35'\ 18.2''\text{ O}$.
   - Calculen a mano su Este y Norte en CTM12.
2. **Simulación de desplazamiento por Datum:**
   - Si un topógrafo reportó ese mismo puente en el antiguo Datum Bogotá (origen Magna Medellín EPSG:3116), consulten en QGIS cuánto se desplaza la geometría frente a CTM12 (EPSG:9377) si no se aplica la transformación oficial de la Resolución 471/2020.
3. **Inspección de residuo en GCPs:**
   - En la tabla de puntos de control del Georreferenciador, observen la columna *Error (píxeles)*: ¿por qué un error residual mayor a 5 píxeles exige revisar o reubicar el punto de control?

---

## 4. Checklist de Auto-Verificación

- [ ] ¿Entiendo por qué CTM12 tiene un factor de escala $k_0 = 0.9992$ para minimizar la deformación lineal en Colombia?
- [ ] ¿Puedo calcular a mano el Este y Norte en CTM12 sin titubear con el signo de la longitud Oeste?
- [ ] ¿Logré georreferenciar una imagen escaneada en QGIS usando al menos 4 puntos de control?
- [ ] ¿Verifiqué que el ráster resultante esté proyectado en `EPSG:9377`?
