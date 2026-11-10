# G12: Teledetección Satelital en QGIS I — ¿Qué es una Imagen Multiespectral y Cómo Descargarla en QGIS?

**Sesión del Jueves 22 de octubre (Semana 14) · Parte B: Bandas Multiespectrales y Descarga en QGIS.**  
En este taller aprenderemos de forma sencilla **qué es una imagen satelital multiespectral**, por qué ve cosas que el ojo humano no puede ver y cómo **descargar y recortar las bandas de nuestra zona de interés (`limite_iguana.geojson`) directamente dentro de QGIS**, dejándolas listas para calcular los índices **`NDVI`** y **`NDBI`** en la Parte C ([G13](G13_indices_espectrales_qgis.md)).

---

## Paso 1: ¿Qué es una Imagen Multiespectral y Qué Significa cada Banda?

Cuando tomas una foto con el celular o miras una ortofoto, solo ves **3 colores visibles**: **Azul**, **Verde** y **Rojo**.  
Un satélite **multiespectral** como **Sentinel-2** (de la Agencia Espacial Europea, gratuito y que pasa por Medellín cada **5 días**) toma fotos en esos colores visibles **y además en bandas infrarrojas** que el ojo humano no ve. Cada banda se guarda como un archivo ráster (`.tif`) donde cada píxel de **$10 \times 10\text{ m}$** guarda cuánta luz reflejó el suelo (de `0.0` a `1.0`).

### Las 3 bandas que necesitamos para evaluar la Cuenca de La Iguaná:

| Banda en Sentinel-2 | Archivo en nuestro proyecto | ¿Qué mide en el terreno? |
|---|---|---|
| **Rojo (`B04` · $10\text{ m}$)** | `s2_b04_rojo.tif` | **Las plantas sanas absorben el Rojo** para hacer fotosíntesis (se ven oscuras, valor bajo $\approx 0.03$). El cemento y el suelo seco reflejan bastante rojo ($\approx 0.20$). |
| **Infrarrojo Cercano — NIR (`B08` · $10\text{ m}$)** | `s2_b08_nir.tif` | **¡El detector de vegetación!** Las hojas vivas rebotan muchísimo infrarrojo cercano (brillan en blanco, valor alto $\approx 0.42$). |
| **Infrarrojo de Onda Corta — SWIR (`B11` · $20\text{ m}$)** | `s2_b11_swir1.tif` | **¡El detector de ciudad y suelo seco!** El concreto, los techos y las vías reflejan mucho `SWIR` ($\approx 0.32$), mientras que los bosques húmedos y el agua lo absorben. |

> [!TIP]
> **Resumen fácil para recordar:**
> - **Bosque sano:** Refleja **mucho `B08 (NIR)`** y **muy poco `B04 (Rojo)`**.
> - **Ciudad / Concreto:** Refleja **más en `B11 (SWIR)`** que en `B08 (NIR)`.

---

## Paso 2: Descargar la Imagen Satelital de la Zona de Interés en QGIS

No hace falta salir a páginas web externas ni descargar toda Antioquia. Podemos buscar y bajar la imagen directamente dentro de QGIS usando el complemento gratuito **`STAC API Browser`**:

1. **Cargar la Zona de Interés:**
   - Abran QGIS en **`EPSG:9377`** y arrastren la capa **`limite_iguana.geojson`** (desde la carpeta `insumos_g12_g13_sentinel2/`). Háganle *Zoom a la capa*.
2. **Abrir el Buscador Satelital en QGIS:**
   - Vayan a **Complementos → Administrar e instalar complementos...**, busquen **`STAC API Browser`** e instálenlo.
   - Ábranlo, elijan en **Connections** el catálogo **`Earth Search`** (es libre y no pide cuenta), pulsen **Fetch Collections** y marquen **`Sentinel-2 Level-2A`**.
3. **Filtrar por nuestra Cuenca y Descargar:**
   - Marquen **`[x] Filter by Extent`** y hagan clic en **Use Map Canvas Extent** (toma automáticamente el recuadro de La Iguaná).
   - Marquen **`[x] Filter by Date`** (ej. enero–marzo de 2024) y pulsen **Search**.
   - Elijan una imagen sin nubes sobre la cuenca, pulsen **View Assets** y carguen a QGIS las bandas **`red` (`B04`)**, **`nir` (`B08`)** y **`swir16` (`B11`)**.

---

## Paso 3: Recortar la Imagen a la Cuenca (`EPSG:9377`) y Explorar los Píxeles

Para dejar cada banda recortada exactamente con la forma de la Cuenca de La Iguaná y en nuestro sistema de coordenadas **`EPSG:9377`**:

1. Vayan al menú **Ráster → Extracción → Cortar ráster por capa de máscara...**
   - **Capa de entrada:** La banda descargada (`B04`, `B08` o `B11`).
   - **Capa de máscara:** `limite_iguana`.
   - **SRC de destino:** `EPSG:9377 - MAGNA-SIRGAS / Origen-Nacional`.
   - **Resolución de salida:** Marquen la casilla y escriban **`10`** en X y **`10`** en Y (para que todos los píxeles midan $10 \times 10\text{ m}$).

> [!NOTE]
> **Respaldo listo en tu carpeta:** En **`insumos_g12_g13_sentinel2/`** ya tienes las bandas recortadas de La Iguaná en `EPSG:9377` (`s2_b02_azul.tif`, `s2_b03_verde.tif`, `s2_b04_rojo.tif`, `s2_b08_nir.tif` y `s2_b11_swir1.tif`) listas para usar.

2. **Comprobar qué significa cada banda con un clic (`Identificar`):**
   - Carguen `s2_b04_rojo.tif`, `s2_b08_nir.tif` y `s2_b11_swir1.tif` en QGIS.
   - Activen la herramienta **Identificar objetos espaciales (`Ctrl + Shift + I`)** y hagan clic en:
     - **Un bosque en la parte alta (Boquerón):** Verán que `B08` es alto ($\approx 0.42$) y `B04` es muy bajo ($\approx 0.03$).
     - **Un barrio denso en la parte baja (Robledo):** Verán que `B11` sube ($\approx 0.31$) y `B08` baja ($\approx 0.20$).

---

## Checklist Rápido (G12)

- [ ] Entiendo qué es una imagen multiespectral y para qué sirven las bandas **Rojo (`B04`)**, **NIR (`B08`)** y **SWIR (`B11`)**.
- [ ] Sé cómo buscar una escena de Sentinel-2 en QGIS filtrando por el polígono de mi zona de interés (`limite_iguana.geojson`) y recortarla con *Cortar ráster por capa de máscara*.
- [ ] Tengo las bandas cargadas en QGIS listas para calcular **NDVI** y **NDBI** en **[G13](G13_indices_espectrales_qgis.md)**.
