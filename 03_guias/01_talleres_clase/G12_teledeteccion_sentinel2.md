# G12: Teledetección Satelital y Misión Sentinel-2 — Adquisición, Escena MGRS 18NVL y Preprocesamiento

**Semestre 2027-1 · Módulo 4: Teledetección Multiespectral y Sensores Remotos · Sesión S13 (Jueves 22 de abril de 2027)**  
*Horario:* 12:00 m. – 4:30 p.m. (`Sub-bloque 1: 12:00–1:50 p.m.` QGIS LTR · `Pausa Activa: 1:50–2:10 p.m.` · `Sub-bloque 2: 2:10–4:30 p.m.` ArcGIS Pro + Cierre `C:\Temp -> .zip`)  
*Presupuesto Académico:* 4.5 h presenciales + 4.5 h de trabajo autónomo semanal (3 Créditos Académicos · 5 UMEs · 144 h semestrales)  
*Modalidad:* **100 % Individual** · *Metodología:* **Worked-Example Fading** (Cuenca Escuela La Iguaná $\rightarrow$ Espejo en ArcGIS Pro $\rightarrow$ Transferencia autónoma a Unidad Territorial `U01–U30`).

---

## 1. Fundamentos Físicos de la Observación de la Tierra

La teledetección óptica pasiva mide la **radiancia solar reflejada** por la superficie terrestre en distintas porciones del espectro electromagnético. A diferencia de una fotografía convencional RGB (que se limita a los canales visibles Azul, Verde y Rojo), los sensores satelitales multiespectrales capturan bandas infrarrojas donde los materiales geológicos, el agua y la cobertura vegetal presentan contrastes diagnósticos inconfundibles.

### 1.1 Firmas Espectrales Clave y el «Salto del Rojo» (*Red Edge*)
- **Vegetación sana:** La clorofila absorbe intensamente la radiación en la banda **Roja (`B04` · $665\text{ nm}$)** para realizar la fotosíntesis. Simultáneamente, la estructura celular interna del mesófilo y el parénquima lagunar refleja hasta el $50\%$ de la radiación en el **Infrarrojo Cercano (`B08` · $842\text{ nm}$)**. Esta transición abrupta de baja reflectancia en el rojo a altísima reflectancia en el NIR se denomina **el salto del rojo (*Red Edge*)**.
- **Suelo seco y superficies urbanizadas (concreto, asfalto, tejados):** Presentan una curva de reflectancia monótona creciente hacia el **Infrarrojo de Onda Corta (`B11` · $1610\text{ nm}$)**, donde el concreto y el asfalto reflejan significativamente más que en el NIR.
- **Cuerpos de agua limpios:** Absorben casi la totalidad de la radiación infrarroja, mostrando reflectancias cercanas a cero en `B08` y `B11`.

| Banda Sentinel-2 MSI | Nombre / Región Espectral | Longitud de Onda Central ($\lambda$) | Resolución Espacial | Función Diagnóstica en el Valle de Aburrá |
|---|---|:---:|:---:|---|
| **B02** | Azul (*Blue*) | $490\text{ nm}$ | $10\text{ m}$ | Penetración en agua, dispersión atmosférica. |
| **B03** | Verde (*Green*) | $560\text{ nm}$ | $10\text{ m}$ | Vigor vegetal visible, discriminación de coberturas. |
| **B04** | Rojo (*Red*) | $665\text{ nm}$ | $10\text{ m}$ | **Absorción de clorofila:** contraste fundamental para NDVI. |
| **B08** | Infrarrojo Cercano (*NIR*) | $842\text{ nm}$ | $10\text{ m}$ | **Reflectancia de biomasa sana:** detector de cobertura vegetal. |
| **B11** | Infrarrojo Onda Corta (*SWIR-1*) | $1610\text{ nm}$ | $20\text{ m}$ | **Humedad del suelo y materiales urbanos:** detector de concreto y techos. |

---

## 2. La Misión Sentinel-2 y el Tile MGRS `18NVL`

La constelación **Sentinel-2** (satélites gemelos 2A y 2B de la Agencia Espacial Europea — Copernicus) opera en una órbita heliosincrónica a $786\text{ km}$ de altitud con un tiempo de retorno de **5 días** sobre Medellín.

- **Tesela MGRS oficial:** El Valle de Aburrá se encuentra ubicado dentro del **Tile MGRS `18NVL`** (que cubre desde los $5.34^\circ\text{N}$ hasta los $6.331^\circ\text{N}$, abarcando de forma continua desde Sabaneta y Envigado hasta Medellín y Bello en una sola escena sin costuras, complementada al norte por `18NVM`).
- **Nivel de procesamiento:** Usaremos productos **Level-2A (L2A)**, que corresponden a reflectancia de fondo de atmósfera (*Bottom-Of-Atmosphere* — BOA), con corrección atmosférica y radiométrica ya calibrada.

---

## 3. Sub-bloque 1: Flujo en QGIS LTR sobre la Cuenca Escuela La Iguaná

### 3.1 Búsqueda y Descarga en QGIS (o uso de Insumos Preconfigurados)
En la carpeta [`insumos_g12_g13_sentinel2/`](insumos_g12_g13_sentinel2/) disponen de las bandas recortadas para la Cuenca Escuela La Iguaná. Para descargar escenas adicionales o la escena completa `18NVL`:
1. Instalar y abrir el complemento **`STAC API Browser`**.
2. Conexión: **Earth Search** (catálogo libre en la nube).
3. Colección: **`sentinel-2-l2a`**.
4. Filtro espacial: **Use Map Canvas Extent** sobre el polígono perimetral `limite_iguana.geojson`.
5. Filtro temporal: Seleccionar escena con nubosidad $< 10\%$ sobre el área urbana.
6. Descargar o añadir al lienzo los recursos (*Assets*): `red` (B04), `nir` (B08) y `swir16` (B11).

### 3.2 Recorte por Máscara, Remuestreo a 10 m y Reproyección a EPSG:9377
Para que las operaciones de álgebra ráster sean matemáticamente rigurosas, todas las bandas deben compartir exactamente el mismo tamaño de celda ($10\text{ m}$), el mismo sistema proyectado (**`EPSG:9377`**) y el valor nulo estandarizado:

1. Ir a **Raster → Extracción → Cortar ráster por capa de máscara...**
2. Configurar:
   - **Capa de entrada:** Banda cruda (ej. `B11`).
   - **Capa de máscara:** `limite_iguana.geojson` (o `limite_cuenca_UXX`).
   - **SRC de destino:** `EPSG:9377 - MAGNA-SIRGAS / Origen-Nacional`.
   - **Asignar un valor sin datos:** `-9999`.
   - En **Parámetros avanzados**, activar **Resolución de la capa de destino** y fijar en **X = `10.0`** e **Y = `10.0`** (remuestrea la banda B11 de 20 m a 10 m mediante interpolación bilineal).
3. Guardar como:
   - `s2_b04_rojo_9377.tif`
   - `s2_b08_nir_9377.tif`
   - `s2_b11_swir1_9377.tif`
4. Clic en **Ejecutar**.

### 3.3 Composición Falso Color Urbano y Vegetal (RGB 8-4-3)
1. Ir a **Raster → Miscelánea → Construir ráster virtual (VRT)...** o **Combinar...**
2. Añadir en orden estricto:
   - Banda 1: `s2_b08_nir_9377.tif` (asignada al canal Rojo de la pantalla).
   - Banda 2: `s2_b04_rojo_9377.tif` (asignada al canal Verde).
   - Banda 3: `s2_b03_verde_9377.tif` (asignada al canal Azul).
3. En el lienzo resultante:
   - **La vegetación densa** (bosques del Alto de Boquerón) se dibuja en **rojo brillante**.
   - **El concreto y las edificaciones** (Robledo, Laureles) se muestran en **tonos cian o plateados**.
   - **El agua y suelos húmedos** se representan en **tonos oscuros o negros**.

---

## 4. Sub-bloque 2: Espejo Corporativo en ArcGIS Pro

### 4.1 Ingesta y Composite Bands en ArcGIS Pro
1. En ArcGIS Pro, abrir el proyecto individual en `EPSG:9377`.
2. En el panel **Geoprocessing**, buscar la herramienta **`Composite Bands`** (*Data Management Tools → Raster → Raster Processing*).
3. En **Input Rasters**, agregar las bandas `B08`, `B04` y `B03`.
4. En **Output Raster**, guardar como `Comp_FalsoColor_843` en la `.gdb` o formato TIFF.
5. Inspeccionar la combinación de bandas en la pestaña **Appearance → Symbology → RGB**.

### 4.2 Raster Functions: Clip y Resample
ArcGIS Pro permite procesar imágenes al vuelo mediante **Raster Functions** sin generar archivos intermedios pesados en disco:
1. En la cinta superior, ir a la pestaña **Imagery → Raster Functions**.
2. Buscar la función **`Clip`**:
   - **Raster:** Escena Sentinel-2 descargada.
   - **Clipping Geometry:** Capa perimetral de su microcuenca.
   - **Use Input Features for Clipping Geometry:** Marcado.
3. Buscar la función **`Resample`**:
   - Ajustar el tamaño de celda de la banda SWIR a $10\text{ m}$ con técnica *Bilinear*.

---

## 5. Transferencia Autónoma a su Unidad Territorial (`U01–U30`)

Cada estudiante procede individualmente sobre su quebrada asignada:
1. Identificar la escena `18NVL` y recortar las bandas `B04`, `B08` y `B11` utilizando la máscara perimetral de su microcuenca asignada.
2. Garantizar que todos los GeoTIFF queden en **`EPSG:9377`**, resolución de celda $10 \times 10\text{ m}$ y `NoData = -9999`.
3. Validar con la herramienta de identificación que los valores de reflectancia de la vegetación muestren $B08 > B04$, y que las superficies consolidadas muestren $B11 > B08$.
4. Dejar el paquete de bandas listo en la subcarpeta `raster/sentinel2/` para el cálculo de índices en **[G13](G13_indices_espectrales_qgis.md)**.

---

## 6. Checklist de Finalización de Clase (G12)

- [ ] Comprendo la física del espectro óptico (Visible, NIR, SWIR) y el mecanismo biofísico del salto del rojo.
- [ ] Ubico la escena Sentinel-2 correspondiente al Valle de Aburrá (Tile MGRS `18NVL`).
- [ ] Recorté las bandas `B04`, `B08` y `B11` a la máscara de cuenca con resolución forzada a $10\text{ m}$ en `EPSG:9377`.
- [ ] Fijé el valor sin datos en `-9999` para evitar distorsiones en los bordes.
- [ ] Construí la composición falso color infrarrojo (8-4-3) en QGIS y ArcGIS Pro.
