# Taller de Repaso y Entrenamiento Autónomo — Hito 4: DEM, GNSS e Índices Sentinel-2

> **Curso:** Geomática, Ingeniería y SIG (`GEOMATICA-SIG-EAFIT`)  
> **Semestre:** 2027-1 · Universidad EAFIT  
> **Módulo:** Modelado del Terreno (DEM), Control de Calidad GNSS (HDOP) y Teledetección Óptica  
> **Presupuesto de Trabajo Autónomo:** $\le 4.5\text{ horas}$  
> **Insumos de Práctica:** `03_guias/02_talleres_repaso/insumos_q4/` e `insumos_p2/`  
> **Preparación Directa para:** **Hito 4 (Semana 14 · 20.0 % · Tier P)**

---

## 1. Propósito y Resultados de Aprendizaje

Este taller de repaso proporciona un simulacro riguroso para la **Evaluación Práctica Integradora 2 (Hito 4)**:
- **RAA3:** Modelar variables morfométricas del terreno (pendientes en grados y %, sombreado 3D y perfil longitudinal del cauce); auditar levantamientos satelitales GNSS depurando errores de multitrayectoria mediante el índice de dilución de precisión (**`HDOP <= 2.0`**) y calculando el error medio cuadrático horizontal (**`RMSE_H`**); e integrar bandas multiespectrales Sentinel-2 L2A calculando índices normalizados (**`NDVI`** y **`NDBI`**) parametrizados con la **semilla individual $D$** en la Calculadora Ráster de QGIS y en **Spatial Analyst** de ArcGIS Pro, finalizando con la vectorización limpia de la clase activa ($DN = 1$).

---

## 2. Insumos Disponibles

### Insumos GNSS (`03_guias/02_talleres_repaso/insumos_q4/`)
- `campo_smartphone_crudo.csv`: Registros de posicionamiento con campos `lat`, `lon`, `hdop`, `satelites`.
- `campo_garmin_crudo.gpx`: Trazas y waypoints de receptor de navegación de mano.
- `vertices_control_igac.gpkg`: Coordenadas oficiales de estaciones geodésicas de alta precisión en `EPSG:9377`.

### Insumos Sentinel-2 y Cuenca (`03_guias/02_talleres_repaso/insumos_p2/`)
- Bandas Sentinel-2 L2A en `EPSG:9377` (10 m):
  - `s2_b02_azul.tif`
  - `s2_b03_verde.tif`
  - `s2_b04_rojo.tif`
  - `s2_b08_nir.tif`
  - `s2_b11_swir1.tif`
- `limite_iguana.geojson`: Máscara poligonal de la cuenca.
- `drenajes_iguana_9377.gpkg`: Eje principal de drenaje para extracción de perfil.

---

## 3. Plan de Entrenamiento Cronometrado (4.5 Horas)

```text
┌────────────────────────────────────────────────────────────────────────┐
│ FASE 1 (60 min): Control de Calidad GNSS (HDOP y RMSE Horizontal)      │
│ FASE 2 (70 min): Morfometría del Terreno (DEM, Pendientes y Perfil)    │
│ FASE 3 (80 min): Sentinel-2, NDVI/NDBI y Álgebra con Semilla D         │
│ FASE 4 (60 min): Vectorización Limpia (DN = 1) y Balance Territorial   │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Fase 1: Ingesta GNSS, Filtrado HDOP y Cálculo de RMSE (60 min)

1. En QGIS LTR, abre *Capa > Añadir capa > Añadir capa de texto delimitado...*:
   - Archivo: `campo_smartphone_crudo.csv`.
   - Definición de geometría: Coordenadas de punto ($X = \text{lon}$, $Y = \text{lat}$).
   - CRS de la geometría: **WGS 84 (`EPSG:4326`)**.
2. **Filtrado por Calidad de Dilución de Precisión:**
   - Abre la tabla de atributos o la herramienta de filtrado (*Filtro de capa*):
     $$\text{"hdop"} \le 2.0 \quad \text{AND} \quad \text{"satelites"} \ge 6$$
   - Exporta los puntos filtrados a GeoPackage: `gnss_depurado_9377.gpkg` en **`EPSG:9377`**.
3. **Cálculo del Error Medio Cuadrático Horizontal ($\text{RMSE}_H$):**
   - Carga la capa `vertices_control_igac.gpkg`.
   - Identifica el punto GNSS medido sobre el vértice de control.
   - Extrae las coordenadas planas en CTM12 de ambos puntos ($X, Y$).
   - Aplica la fórmula del error horizontal:
     $$\Delta X = X_{\text{GNSS}} - X_{\text{IGAC}}, \quad \Delta Y = Y_{\text{GNSS}} - Y_{\text{IGAC}}$$
     $$\text{RMSE}_H = \sqrt{\Delta X^2 + \Delta Y^2}$$
   - Verifica si el error horizontal es inferior a $3.0\text{ m}$ (aceptable para GNSS monfrecuencia en entorno urbano con arbolado).

---

### Fase 2: Morfometría del Terreno (DEM) y Perfiles de Relieve (70 min)

1. Carga el DEM local en QGIS (o utiliza el ráster de elevación disponible). Asegúrate de que sus coordenadas estén proyectadas en **`EPSG:9377`** para que las dimensiones horizontales ($X, Y$) y verticales ($Z$) estén en metros.
2. **Cálculo de Pendiente:**
   - Abre *Ráster > Análisis > Pendiente...*.
   - Genera la capa de pendiente en grados sexagesimales: `pendiente_grados.tif`.
   - Genera la capa en porcentaje (%) marcando la casilla correspondiente: `pendiente_pct.tif`.
3. **Reclasificación según POT:**
   - Abre *Ráster > Análisis > Reclasificar por tabla*:
     - Rango $0^\circ \text{ a } 15^\circ \rightarrow$ Valor `1` (Baja pendiente)
     - Rango $15^\circ \text{ a } 30^\circ \rightarrow$ Valor `2` (Media pendiente)
     - Rango $>30^\circ \rightarrow$ Valor `3` (Alta pendiente / Amenaza)
4. **Sombreado 3D (*Hillshade*):**
   - Ejecuta *Ráster > Análisis > Mapa de sombras...* con acimut $= 315^\circ$ y elevación solar $= 45^\circ$.
5. **Perfil Longitudinal del Cauce:**
   - Con el complemento *Profile Tool*, selecciona la capa `drenajes_iguana_9377` sobre el DEM.
   - Registra la cota de inicio, cota final y longitud total en metros.

---

### Fase 3: Teledetección Sentinel-2 y Álgebra Ráster con Semilla $D$ (80 min)

Carga las bandas multiespectrales de `insumos_p2/`:
- `s2_b04_rojo.tif` (Banda 4)
- `s2_b08_nir.tif` (Banda 8)
- `s2_b11_swir1.tif` (Banda 11)

#### Paso 3.1: Composición de Falso Color Urbano e Infrarrojo
1. En QGIS, ve a *Ráster > Miscelánea > Construir ráster virtual (*Build Virtual Raster*)*.
2. Selecciona en orden: Banda 8 (NIR), Banda 4 (Rojo) y Banda 3 (Verde).
3. En la simbología, asigna RGB = 1-2-3 (Infrarrojo color estándar): la vegetación sana resalta en tonos rojo intenso y el suelo urbano en tonos gris-azulado.

#### Paso 3.2: Cálculo de Índices Normalizados
Abre la **Calculadora Ráster** (*Ráster > Calculadora ráster...*):
1. **Índice de Vegetación (NDVI):**
   ```text
   ("s2_b08_nir@1" - "s2_b04_rojo@1") / ("s2_b08_nir@1" + "s2_b04_rojo@1")
   ```
   - Guarda como `ndvi_sentinel_9377.tif`.
2. **Índice de Construcción / Suelo Expuesto (NDBI):**
   ```text
   ("s2_b11_swir1@1" - "s2_b08_nir@1") / ("s2_b11_swir1@1" + "s2_b08_nir@1")
   ```
   - Guarda como `ndbi_sentinel_9377.tif`.

#### Paso 3.3: Expresión Booleana Multicriterio con Semilla $D$
Asume tu parámetro individual $D \in \{0..9\}$:
$$U_{\text{NDVI}} = 0.20 + 0.01 \times D$$
Formula en la Calculadora Ráster (o en Spatial Analyst *Raster Calculator* de ArcGIS Pro):
```text
( "ndvi_sentinel_9377@1" < (0.20 + 0.01 * D) ) AND ( "ndbi_sentinel_9377@1" > 0.0 ) AND ( "pendiente_grados@1" > 20.0 )
```
El resultado debe ser una matriz binaria con valor `1` en las celdas críticas y `0` en el resto.

---

### Fase 4: Vectorización Limpia ($DN = 1$) y Balance Territorial (60 min)

1. **Poligonización:** Abre *Ráster > Conversión > Poligonizar (ráster a vectorial)...*:
   - Capa de entrada: Ráster booleano.
   - Campo de salida: `DN`.
2. **Filtrado Estricto de la Clase Activa:**
   - Abre la tabla de atributos y selecciona únicamente los polígonos donde `"DN" = 1`.
   - Exporta los objetos seleccionados a `zonas_criticas_d.gpkg`.
3. **Depuración de Ruido de Píxel:**
   - Crea el campo `area_m2` con `$area`.
   - Elimina los polígonos con `area_m2 < 100` (menos de un píxel de Sentinel-2).
   - Crea el campo `area_ha` con `$area / 10000`.
4. **Cálculo del Balance Territorial:**
   - Abre el panel de *Estadísticas de campo* para sumar el área total en hectáreas de zonas críticas en la cuenca bajo tu semilla individual $D$.

---

## 4. Lista de Autoevaluación previa al Hito 4

- [ ] Importé el archivo de puntos GNSS en `EPSG:4326` y apliqué el filtro de calidad `"hdop" <= 2.0`.
- [ ] Calculé numéricamente el residual horizontal $\text{RMSE}_H$ frente al vértice oficial del IGAC.
- [ ] Mi DEM está en `EPSG:9377` con `NoData = -9999` y la pendiente está calculada en grados y %.
- [ ] Calculé NDVI y NDBI asegurando que los valores oscilen entre $-1.0$ y $+1.0$.
- [ ] Apliqué mi semilla $D$ en el umbral de corte del álgebra ráster booleana.
- [ ] Vectoricé únicamente los polígonos con $DN = 1$, eliminé el ruido de píxel ($<100\text{ m}^2$) y calculé el área total en hectáreas.
