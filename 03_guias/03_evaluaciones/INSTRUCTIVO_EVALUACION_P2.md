# Parcial Práctico 2 (P2): Análisis Multiespectral Sentinel-2 y Geoprocesamiento en QGIS (15%)

* **Curso:** Geomática y Sistemas de Información Geográfica (2026-1)
* **Modalidad:** Individual, 100% práctico en **QGIS LTR**
* **Duración:** **90 minutos**
* **Insumos (`insumos_p2/`):**
  * **GeoTIFF (`.tif`):** `s2_b02_azul.tif`, `s2_b03_verde.tif`, `s2_b04_rojo.tif`, `s2_b08_nir.tif`, `s2_b11_swir1.tif` (bandas Sentinel-2 L2A).
  * **GeoJSON (`.geojson`):** `limite_iguana.geojson` (límite de la cuenca de la Quebrada La Iguaná).
  * **GeoPackage (`.gpkg`):** `drenajes_iguana_9377.gpkg` (capa `drenajes_iguana` con 4 tramos hidrográficos conectados).

---

## 1. Problema a Resolver

Delimitar en **QGIS** (bajo el sistema oficial **`EPSG:9377` — MAGNA-SIRGAS / Origen-Nacional**) las **Zonas Prioritarias de Intervención por Presión Urbana en Ronda Hídrica** en la cuenca de la **Quebrada La Iguaná**, integrando la información en un único GeoPackage (**`modelo_parcial2.gpkg`**), reportando las métricas directamente en las **tablas de atributos de las geometrías** y generando el plano **`mapa_sintesis_parcial2.pdf`**.

Cree una carpeta de trabajo llamada `apellido_nombre_P2`, configure el proyecto en **`EPSG:9377`** y active el guardado con **Rutas Relativas** (*Proyecto $\rightarrow$ Propiedades $\rightarrow$ General $\rightarrow$ Guardar rutas: Relativas*).

---

## 2. Requerimientos Técnicos por Etapa

### Etapa 1: Selección de Bandas, Índices Espectrales y Depuración Vectorial (2.5 Puntos)

1. **Inspección y selección de insumos (`.tif`, `.geojson`, `.gpkg`):**
   * Cargue los insumos en QGIS y verifique su sistema de referencia (`EPSG:9377`), su resolución espacial (`10 m`) y la presencia de valores `NoData` (`-9999`) fuera del polígono de la cuenca.
   * De las 5 bandas `.tif` disponibles, seleccione únicamente las necesarias para calcular el **`NDVI`** y el **`NDBI`**, descartando las bandas del espectro visible que no intervienen en estos índices.

2. **Cálculo y visualización de `NDVI` y `NDBI`:**
   * En la **Calculadora Ráster**, calcule el **Índice de Vegetación de Diferencia Normalizada (`NDVI`)** y el **Índice Diferencial de Zonas Construidas (`NDBI`)**:
     $$\text{NDVI} = \frac{\rho_{\text{NIR}} - \rho_{\text{Rojo}}}{\rho_{\text{NIR}} + \rho_{\text{Rojo}}} \qquad \qquad \text{NDBI} = \frac{\rho_{\text{SWIR-1}} - \rho_{\text{NIR}}}{\rho_{\text{SWIR-1}} + \rho_{\text{NIR}}}$$
   * Exporte los resultados en `EPSG:9377` (`10 m`) como **`ndvi_iguana_9377.tif`** y **`ndbi_iguana_9377.tif`**.
   * Simbolice ambos rásteres en QGIS con **Pseudocolor monobanda** y verifique que sus valores se encuentren dentro del dominio teórico $[-1.0, +1.0]$.

3. **Clasificación biespectral y descarte de polígonos de fondo (`DN = 0`):**
   * En la **Calculadora Ráster**, genere una máscara booleana que asigne `1` a los píxeles que cumplen **simultáneamente** $\text{NDBI} > 0.0$ (superficie impermeabilizada/construida) y $\text{NDVI} < 0.20$ (ausencia de cobertura vegetal), y `0` al resto.
   * Convierta la máscara a polígonos (**Poligonizar: Ráster a Vectorial**) conservando el campo `DN`.
   * **Depuración obligatoria:** Descarte todos los polígonos con **`"DN" = 0`** y conserve exclusivamente los polígonos válidos con **`"DN" = 1`**, guardándolos en **`modelo_parcial2.gpkg`** como capa **`presion_urbana_ndbi`**.

---

### Etapa 2: Consolidación en GeoPackage, Cruce Espacial y Reporte en Tablas de Atributos (1.5 Puntos)

Todas las capas vectoriales y sus métricas deben quedar almacenadas dentro de **`modelo_parcial2.gpkg`** (en **`EPSG:9377`**) con la siguiente estructura de capas y **tablas de atributos**:

1. **Capa `limite_cuenca_iguana`** (importada desde `limite_iguana.geojson`):
   * En su tabla de atributos, agregue o calcule (mediante *Estadísticas de zona* o *Calculadora de campos*) los siguientes campos decimales (redondeados a 2 decimales):
     * **`area_ha`**: área geométrica de la cuenca en hectáreas ($1\text{ ha} = 10,000\text{ m}^2$).
     * **`ndvi_min`**, **`ndvi_max`**, **`ndvi_prom`**: mínimo, máximo y promedio del `NDVI` en la cuenca.
     * **`ndbi_min`**, **`ndbi_max`**, **`ndbi_prom`**: mínimo, máximo y promedio del `NDBI` en la cuenca.

2. **Capa `drenajes_iguana`** (importada desde `drenajes_iguana_9377.gpkg`):
   * Conserva sus 4 tramos hidrográficos y atributos originales en `EPSG:9377`.

3. **Capa `presion_urbana_ndbi`** (polígonos validados exclusivamente con `"DN" = 1`):
   * En su tabla de atributos, calcule el campo decimal **`area_ha`** con el área en hectáreas de cada polígono.

4. **Capa `ronda_hidrica_30m`** (retiro hídrico de la red de drenajes):
   * Genere un **Buffer de `30.0` metros** sobre `drenajes_iguana` activando obligatoriamente la opción **Disolver el resultado (`Dissolve`)** para evitar solapes y duplicación de área en las confluencias.
   * En su tabla de atributos, calcule el campo decimal **`area_ha`** con el área total de la ronda hídrica en hectáreas.

5. **Capa `zonas_prioritarias_intervencion`** (cruce de presión urbana en ronda hídrica):
   * Ejecute la **Intersección** entre `presion_urbana_ndbi` (`"DN" = 1`) y `ronda_hidrica_30m`.
   * En su tabla de atributos, calcule el campo decimal **`area_ha`** con el área invadida en hectáreas.

---

### Etapa 3: Salida Cartográfica PDF y Proyecto QGIS (1.0 Punto)

1. **Mapa síntesis (`mapa_sintesis_parcial2.pdf`):**
   * Exporte un plano en PDF a **300 dpi** que muestre `ndvi_iguana_9377.tif` o `ndbi_iguana_9377.tif` en pseudocolor de fondo, `limite_cuenca_iguana`, `drenajes_iguana`, `presion_urbana_ndbi` y **`zonas_prioritarias_intervencion`** resaltadas, con cuadrícula métrica **`EPSG:9377`**, norte, escala gráfica, leyenda y una etiqueta o recuadro con el área total de `zonas_prioritarias_intervencion` (`ha`).
2. **Proyecto QGIS (`proyecto_parcial2.qgz`):**
   * Guarde el proyecto con **rutas relativas** apuntando a los archivos de su entrega.

---

## 3. Estructura Única de Entrega

Empaquete su carpeta en un único archivo **`apellido_nombre_P2.zip`** con estos **5 archivos** en la raíz:

```text
apellido_nombre_P2.zip
 ├── ndvi_iguana_9377.tif                  (Índice NDVI en EPSG:9377)
 ├── ndbi_iguana_9377.tif                  (Índice NDBI en EPSG:9377)
 ├── modelo_parcial2.gpkg                  (Contiene: limite_cuenca_iguana, drenajes_iguana, presion_urbana_ndbi, ronda_hidrica_30m y zonas_prioritarias_intervencion con sus campos calculados)
 ├── mapa_sintesis_parcial2.pdf            (Mapa a 300 dpi en EPSG:9377)
 └── proyecto_parcial2.qgz                 (Proyecto QGIS con rutas relativas)
```

---

## 4. Criterios de Calificación (Total: 5.0 Puntos)

| Etapa | Peso | Condición de Éxito (100% del ítem) | Penalización por Falla Típica |
| :--- | :---: | :--- | :--- |
| **1. Selección Espectral, Índices (`NDVI`, `NDBI`) y Depuración (`DN = 1`)** | **2.5 pts** | Selección correcta de bandas (`NDVI` y `NDBI` en `EPSG:9377` con valores en $[-1, +1]$), visualización en pseudocolor y capa `presion_urbana_ndbi` depurada exclusivamente con los polígonos `"DN" = 1` (sin `"DN" = 0`). | `-0.8 pts` por elegir o invertir bandas en `NDVI`/`NDBI`; `-0.8 pts` por no descartar `"DN" = 0` en `presion_urbana_ndbi`; `-0.4 pts` por errores en la máscara booleana. |
| **2. Consolidación en `.gpkg`, Geoprocesamiento y Tablas de Atributos** | **1.5 pts** | `modelo_parcial2.gpkg` contiene las 5 capas en `EPSG:9377`, `ronda_hidrica_30m` disuelta, `zonas_prioritarias_intervencion` correcta y las tablas de atributos incluyen `area_ha` y las estadísticas espectrales en `limite_cuenca_iguana` ($\pm 2\%$). | `-0.4 pts` por omitir `Dissolve` en el buffer de 30 m; `-0.4 pts` por campos `area_ha` o estadísticas faltantes/erróneas en las tablas de atributos; `-0.3 pts` por capas no migradas al `.gpkg`. |
| **3. Mapa Síntesis PDF y Proyecto QGIS** | **1.0 pt** | `mapa_sintesis_parcial2.pdf` a 300 dpi con grilla métrica `EPSG:9377`, norte, escala, leyenda, dato de área prioritaria (`ha`) y `proyecto_parcial2.qgz` con rutas relativas funcionales. | `-0.5 pts` por mapa incompleto o sin grilla `EPSG:9377`; `-0.5 pts` por rutas absolutas o capas rotas en `.qgz`. |
| **TOTAL PARCIAL 2** | **5.0 pts** | | |
