# Taller de Repaso — Previo al Parcial 2 (P2): Índices Sentinel-2 (`NDVI` y `NDBI`) y Modelador Gráfico en QGIS

**Semana sugerida:** Semana 15 · **Tiempo estimado de trabajo autónomo:** 60–90 min  
**Modalidad:** Computador con **QGIS LTR** · **Insumos:** Carpeta `insumos_p2/` (`s2_b04_rojo.tif`, `s2_b08_nir.tif`, `s2_b11_swir1.tif`, `limite_iguana.geojson` y `drenajes_iguana_9377.gpkg`).

> [!NOTE]
> Este taller entrena exactamente la estructura del **Parcial Práctico 2 (`P2` — 15%, 90 minutos en QGIS)**. El `Parcial 2` es **100% excluyente** respecto a las evaluaciones anteriores (`P1`, `Q3` y `Q4`) y evalúa únicamente:
> 1. Álgebra espectral normalizada (**`NDVI`** y **`NDBI`**) en la Calculadora Ráster de QGIS, máscara booleana biespectral y vectorización selectiva (`"DN" = 1`).
> 2. Automatización visual de geoprocesos en el **Modelador Gráfico de QGIS (`.model3`)** y almacenamiento en GeoPackage (`.gpkg`).
> 3. Reporte de métricas en JSON (`metricas_parcial2.json`), mapa ejecutivo PDF a 300 dpi y proyecto en QGIS con rutas relativas.

---

## Parte 1: Bandas e Índices Espectrales de Sentinel-2 MSI (`G12 / G13`)

| Archivo en `insumos_p2/` | Banda Sentinel-2 | Región Espectral ($\lambda$) | Rol en el Parcial 2 |
| :--- | :---: | :---: | :--- |
| `s2_b04_rojo.tif` | `B04` | Rojo ($665\text{ nm}$) | Absorción por clorofila; usada en `NDVI` |
| `s2_b08_nir.tif` | `B08` | Infrarrojo Cercano NIR ($842\text{ nm}$) | Reflexión celular foliar; usada en `NDVI` y `NDBI` |
| `s2_b11_swir1.tif` | `B11` | Infrarrojo Onda Corta SWIR-1 ($1610\text{ nm}$) | Alta reflectancia en concreto, techos y suelo seco; usada en `NDBI` |

* **Índice de Vegetación (`NDVI`):**
  $$\text{NDVI} = \frac{B08 - B04}{B08 + B04}$$
  * Valores de referencia en La Iguaná: mínimo $\approx -0.39$, máximo $\approx +0.94$, promedio $\approx +0.45$.
* **Índice de Zonas Construidas (`NDBI`):**
  $$\text{NDBI} = \frac{B11 - B08}{B11 + B08}$$
  * Valores de referencia en La Iguaná: mínimo $\approx -0.58$, máximo $\approx +0.21$, promedio $\approx -0.16$. Materiales urbanos impermeables y suelo desnudo arrojan $\text{NDBI} > 0.0$.

---

## Parte 2: Simulacro Guiado en QGIS (90 Minutos)

### Etapa 1: Cálculo de `NDVI`, `NDBI` y Vectorización de Presión Urbana (`DN = 1`)
1. En la **Calculadora Ráster de QGIS**, genere **`ndvi_iguana_9377.tif`**:
   ```sql
   ("s2_b08_nir@1" - "s2_b04_rojo@1") / ("s2_b08_nir@1" + "s2_b04_rojo@1")
   ```
2. En la **Calculadora Ráster de QGIS**, genere **`ndbi_iguana_9377.tif`**:
   ```sql
   ("s2_b11_swir1@1" - "s2_b08_nir@1") / ("s2_b11_swir1@1" + "s2_b08_nir@1")
   ```
3. Genere la máscara booleana biespectral de presión urbana y suelo impermeabilizado:
   ```sql
   ("ndbi_iguana_9377@1" > 0.0) * ("ndvi_iguana_9377@1" < 0.20)
   ```
4. Ejecute **Ráster $\rightarrow$ Conversión $\rightarrow$ Poligonizar (Ráster a Vectorial)** sobre la máscara binaria.
5. **Filtre exclusivamente `"DN" = 1`** y exporte al GeoPackage **`modelo_parcial2.gpkg`** como capa **`presion_urbana_ndbi`** en `EPSG:9377`.
   * *Valor de control para su autoverificación:* **125 polígonos** que suman exactamente **`868.18 ha`**.

### Etapa 2: Diseño del Modelo Automatizado en QGIS (`modelo_automatizado_p2.model3`)
1. Abra **Procesos $\rightarrow$ Modelador Gráfico...** en QGIS.
2. Agregue **2 Parámetros de Entrada Vectorial**:
   * `Red Drenajes` (Líneas)
   * `Poligonos Presion Urbana` (Polígonos)
3. Encadene los **3 algoritmos**:
   * **Algoritmo 1 — `Buffer`:** Entrada = `Red Drenajes`, Distancia = `30 m`, **Disolver resultado = `Sí` (`True`)**.
   * **Algoritmo 2 — `Intersección`:** Entrada = `Poligonos Presion Urbana`, Superposición = salida del `Buffer`.
   * **Algoritmo 3 — `Calculadora de Campos`:** Entrada = salida de `Intersección`, campo nuevo `area_ha` (Decimal, precisión 4) con expresión `$area / 10000.0`, generando la salida final **`zonas_prioritarias_intervencion`**.
4. Guarde el modelo como **`modelo_automatizado_p2.model3`** y ejecútelo usando `insumos_p2/drenajes_iguana_9377.gpkg` y `presion_urbana_ndbi`, guardando la salida en `modelo_parcial2.gpkg`.
   * *Valores de control para su autoverificación:*
     * Área de `zonas_prioritarias_intervencion` (con `Dissolve = Sí`): **`8.44 ha`** (`8.4378 ha`).
     * *(Si olvida activar `Dissolve = Sí`, el área se sobreestima a `8.77 ha` por solapamiento en las confluencias de las quebradas).*

### Etapa 3: Reporte `metricas_parcial2.json`, Mapa PDF y Proyecto QGIS
1. Diligencie `metricas_parcial2.json` con las estadísticas de `NDVI`, `NDBI` y las áreas en hectáreas obtenidas.
2. Maquete `mapa_sintesis_parcial2.pdf` (300 dpi) con el índice espectral de fondo, los drenajes, la capa `zonas_prioritarias_intervencion`, grilla `EPSG:9377`, norte, escala y leyenda.
3. Guarde `proyecto_parcial2.qgz` verificando rutas relativas.
