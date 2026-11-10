# G13: Teledetección Satelital en QGIS II — Cálculo y Evaluación de Índices (`NDVI` y `NDBI`) en QGIS

**Sesión del Jueves 22 de octubre (Semana 14) · Parte C: Calcular y Evaluar `NDVI` y `NDBI` en QGIS.**  
Con las bandas satelitales de la Cuenca de La Iguaná ya cargadas en QGIS ([G12](G12_teledeteccion_sentinel2.md)), ahora vamos a **calcular los índices `NDVI` y `NDBI` en la Calculadora Ráster** y a **evaluarlos ahí mismo en QGIS** (colores, valores por píxel y áreas en hectáreas) para usarlos en el **Parcial 2 (`P2`)** y en el **Informe Final (`IF`)**.

---

## Paso 1: ¿Qué son los Índices `NDVI` y `NDBI`?

Un **índice espectral** combina dos bandas mediante la fórmula **(Banda A − Banda B) / (Banda A + Banda B)**. El resultado siempre da un número entre **`-1.0` y `+1.0`**, muy fácil de interpretar:

### 1. `NDVI` (Índice de Vegetación) — ¿Dónde hay bosque sano?
Compara el **Infrarrojo Cercano (`B08`)** contra el **Rojo (`B04`)**:
$$\text{NDVI} = \frac{\text{B08} - \text{B04}}{\text{B08} + \text{B04}}$$
- **Mayor a `0.45`:** Bosque denso y árboles sanos (San Cristóbal / Boquerón).
- **Entre `0.20` y `0.45`:** Pastos, rastrojos o zonas verdes dispersas.
- **Menor a `0.20`:** Ciudad (cemento, techos, vías) o suelo desnudo sin vegetación.

### 2. `NDBI` (Índice de Área Construida) — ¿Dónde hay ciudad y suelo impermeable?
Compara el **Infrarrojo de Onda Corta (`B11`)** contra el **Infrarrojo Cercano (`B08`)**:
$$\text{NDBI} = \frac{\text{B11} - \text{B08}}{\text{B11} + \text{B08}}$$
- **Mayor a `0.00` (positivo):** Zonas construidas (techos, concreto, asfalto) o suelo seco expuesto.
- **Menor a `0.00` (negativo):** Zonas con vegetación y humedad.

---

## Paso 2: Calcular `NDVI` y `NDBI` en la Calculadora Ráster de QGIS

Con las capas `s2_b04_rojo.tif`, `s2_b08_nir.tif` y `s2_b11_swir1.tif` cargadas en QGIS:

### 2.1 Calcular el `NDVI` (`ndvi_iguana_9377.tif`)
1. Abran **Ráster → Calculadora Ráster...**
2. Hagan clic sobre `s2_b08_nir@1` en la lista y pulsen el botón **Extensión actual de la capa** (así la salida queda en `EPSG:9377` a $10\text{ m}$).
3. En **Capa de salida**, guarden como **`ndvi_iguana_9377.tif`**.
4. Escriban la fórmula **(con paréntesis obligatorios)**:
   ```text
   ( "s2_b08_nir@1" - "s2_b04_rojo@1" ) / ( "s2_b08_nir@1" + "s2_b04_rojo@1" )
   ```
5. Hagan clic en **Aceptar**.

### 2.2 Calcular el `NDBI` (`ndbi_iguana_9377.tif`)
1. Abran de nuevo **Ráster → Calculadora Ráster...**, elijan la extensión de `s2_b08_nir@1` y guarden como **`ndbi_iguana_9377.tif`**.
2. Escriban la fórmula:
   ```text
   ( "s2_b11_swir1@1" - "s2_b08_nir@1" ) / ( "s2_b11_swir1@1" + "s2_b08_nir@1" )
   ```
3. Hagan clic en **Aceptar**.

---

## Paso 3: Evaluar los Índices ahí mismo en QGIS

### 3.1 Pintar los mapas con colores claros (Simbología)
- **Para `ndvi_iguana_9377`:** En **Propiedades → Simbología**, elijan **`Pseudocolor monobanda`**, rampa **`RdYlGn`** (Rojo a Verde), **Mín = `0.05`** y **Máx = `0.65`**. *(Si tienen `hillshade_iguana.tif` debajo, activen Modo de mezcla = **Multiplicar** para ver el relieve 3D).*
- **Para `ndbi_iguana_9377`:** En **Propiedades → Simbología**, elijan **`Pseudocolor monobanda`**, rampa **`RdYlBu` Invertida** (Azul a Rojo), **Mín = `-0.30`** y **Máx = `+0.18`**.

### 3.2 Ver las estadísticas de toda la cuenca (`Estadísticas de capa ráster`)
1. En la **Caja de herramientas (`Ctrl + Alt + T`)**, busquen **Estadísticas de capa ráster** y ejecútenla sobre ambos índices:
   - **`ndvi_iguana_9377.tif`:** Mínimo = **`0.06`**, Máximo = **`0.63`**, Promedio (`MEAN`) = **`0.31`**.
   - **`ndbi_iguana_9377.tif`:** Mínimo = **`-0.32`**, Máximo = **`+0.18`**, Promedio (`MEAN`) = **`-0.09`**.

### 3.3 Extraer las zonas críticas y medir sus hectáreas (`Poligonizar`)
Para saber exactamente **cuántas hectáreas de presión urbana e impermeabilización** hay en la cuenca:
1. Abran **Ráster → Calculadora Ráster...**, guarden como **`presion_urbana_9377.tif`** y escriban:
   ```text
   ( "ndbi_iguana_9377@1" > 0.0 ) AND ( "ndvi_iguana_9377@1" < 0.25 )
   ```
   *(Esto marca con **`1`** donde hay concreto/suelo impermeable sin árboles, y con **`0`** el resto).*
2. Conviertan ese resultado a polígonos en **Ráster → Conversión → Poligonizar (ráster a vectorial)...**
3. Filtren los polígonos con **`"DN" = 1`** y calculen el área en hectáreas en la Calculadora de Campos con `round($area / 10000, 2)`: encontrarán **`828.25 ha`** de presión urbana en la cuenca (y **`65.07 ha`** metidas dentro del retiro de $30\text{ m}$ de la quebrada).

---

## Checklist Rápido (G13)

- [ ] Calculé `ndvi_iguana_9377.tif` y `ndbi_iguana_9377.tif` en la Calculadora Ráster de QGIS.
- [ ] Les apliqué simbología de colores y revisé su promedio con *Estadísticas de capa ráster* (`NDVI = 0.31`, `NDBI = -0.09`).
- [ ] Creé la máscara de presión urbana (`NDBI > 0.0 AND NDVI < 0.25`), la poligonicé (`DN = 1`) y calculé su área en hectáreas.


