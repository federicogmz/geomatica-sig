# G09: Modelos Digitales de Elevación (DEM), pendientes, sombreado y laderas críticas

**Módulo 2 · Semana 9.** Análisis geomorfológico y del relieve en el modelo ráster. En esta sesión aprenderán a reproyectar rigurosamente el DEM a coordenadas planas CTM12 (**EPSG:9377**), calcular mapas de pendientes en grados y porcentaje para zonificación de riesgo, derivar la orientación de laderas (*Aspect*), generar mapas de sombras (*Hillshade*) con iluminación solar a 315°/45° y lograr un efecto plástico de relieve tridimensional mediante modos de fusión multiplicativos.

---

## 1. La Condición Crítica: Reproyección del DEM a EPSG:9377

> [!CAUTION]
> **¡Regla de oro de la geomática!**  
> Si calculan la pendiente sobre un DEM en coordenadas geográficas (grados decimales, EPSG:4326), el algoritmo interpretará que las distancias horizontales $\Delta X, \Delta Y$ están en grados mientras que la altura $Z$ está en metros. El resultado será un mapa de pendientes completamente absurdo con valores cercanos a $89.9^\circ$. **El ráster DEBE estar reproyectado a un sistema proyectado en metros (EPSG:9377)**.

### Paso 1.1: Reproyección con GDAL Warp
1. Carga tu DEM base (`dem_iguana_crudo.tif`).
2. Ve al menú superior: **Raster → Proyecciones → Combar (reproyectar)...**
3. Configura los parámetros:
   - **Capa de entrada:** Tu DEM descargado.
   - **SRC de origen:** Dejar en blanco o confirmar que sea `EPSG:4326`.
   - **SRC de destino:** `EPSG:9377 - MAGNA-SIRGAS / Origen-Nacional`.
   - **Método de remuestreo:** Selecciona **Bilineal** o **Cúbico** (conserva la continuidad suave del terreno natural).
   - **Valor sin datos adicional:** `-9999`.
4. En **Reproyectado**, guarda en disco como `dem_iguana_9377.tif`.
5. Haz clic en **Ejecutar**.

### Paso 1.2: Recorte por la Máscara de la Cuenca
1. Menú **Raster → Extracción → Cortar ráster por capa de máscara...**
2. **Capa de entrada:** `dem_iguana_9377.tif`.
3. **Capa de máscara:** Polígono perimetral de la Cuenca de La Iguaná (en EPSG:9377).
4. **SRC de destino:** `EPSG:9377`.
5. **Asignar un valor sin datos:** `-9999`.
6. Guarda como `dem_iguana_recorte_9377.tif` y haz clic en *Ejecutar*.

---

## 2. Generación del Mapa de Pendientes (Slope)

La pendiente condiciona la velocidad de escorrentía superficial, la estabilidad geotécnica de los taludes y la susceptibilidad a movimientos en masa:

1. Ve al menú **Raster → Análisis → Pendiente...**
2. Configura los parámetros:
   - **Capa de entrada:** `dem_iguana_recorte_9377.tif`.
   - **Factor Z:** `1.0` (como $X, Y$ y $Z$ están todos en metros, la escala vertical es $1:1$).
   - **Pendiente expresada en porcentaje:**
     - **Desmarcada:** Para obtener la pendiente en **grados** ($0^\circ$ a $90^\circ$), estándar para estudios geológicos y amenaza del POT.
     - **Marcada:** Para obtener la pendiente en **porcentaje** ($\%$), estándar para diseño geométrico de vías y drenaje urbano.
3. Guarda como `pendiente_grados_iguana.tif`.
4. Haz clic en **Ejecutar**.

### Simbología Técnica de Pendientes:
1. Clic derecho sobre la capa → *Propiedades → Simbología*.
2. Renderizador: **Monobanda pseudocolor**.
3. Rampa de color: Selecciona la rampa invertida *RdYlGn* (Rojo-Amarillo-Verde invertido):
   - Verde: Pendiente suave $< 15^\circ$ (colinas bajas, terrazas aluviales).
   - Amarillo: Pendiente media $15^\circ\text{ a }30^\circ$ (laderas de transición).
   - Rojo oscuro: Laderas críticas $> 30^\circ$ (escarpes y zonas de alto riesgo de deslizamiento).

---

## 3. Mapa de Sombreado del Relieve (Hillshade)

El sombreado reproduce la iluminación solar hipotética sobre el terreno, generando una percepción visual inmediata de profundidad:

1. Ve a **Raster → Análisis → Mapa de sombras (Hillshade)...**
2. Parámetros:
   - **Capa de entrada:** `dem_iguana_recorte_9377.tif`.
   - **Azimut de la luz (dirección del sol):** `315.0` grados (iluminación clásica desde el noroccidente; evita la inversión óptica donde los cañones parecen crestas).
   - **Ángulo de altitud solar:** `45.0` grados (elevación solar equilibrada que produce sombras proporcionadas).
   - **Factor Z:** `1.0` (o `1.2` si se desea exagerar ligeramente el relieve).
3. Guarda como `hillshade_iguana.tif`.
4. Haz clic en **Ejecutar**.

---

## 4. El Efecto Profesional de Fusión Tridimensional (Multiply Blend)

Para que el mapa combine la precisión cromática de las pendientes con el realismo plástico del relieve:

1. En el panel de capas, arrastra la capa de **pendientes coloreadas** de modo que quede **inmediatamente encima** de la capa de **sombras (Hillshade)**.
2. Abre las propiedades de la capa de pendientes: clic derecho → *Propiedades → pestaña Simbología* (o pestaña *Transparencia*).
3. En la sección inferior **Representación de capas**:
   - Cambia el **Modo de mezcla (*Blending Mode*)** de *Normal* a **Multiplicar (*Multiply*)**.
4. Haz clic en *Aceptar*.
5. ¡Observa el lienzo! Las pendientes se dibujan sobre el relieve con texturas de luces y sombras fotorrealistas sin perder la escala de colores cuantitativa.

---

## 5. Orientación de Laderas (Aspect)

El aspecto indica hacia qué punto cardinal mira la pendiente (en azimut de $0^\circ$ a $360^\circ$):

1. Menú **Raster → Análisis → Aspecto (orientación)...**
2. Guarda como `aspect_iguana.tif`.
3. Haz clic en *Ejecutar*.
4. **Relevancia para ingeniería y urbanismo:** Laderas orientadas al este reciben insolación matutina y vientos dominantes del Valle de Aburrá, influyendo en la evaporación y humedad antecedente del suelo.

---

## 6. Práctica Autónoma para Repasar Durante la Semana

Para llegar con destreza total al Parcial 1:

1. **Pendiente en Porcentaje:**
   - Vuelve a ejecutar la herramienta de pendiente marcando *Pendiente expresada en porcentaje*.
   - Identifica sectores con pendiente $> 100\%$ (equivalente a $45^\circ$) y compáralos con el mapa en grados.
2. **Sombreado Multidireccional:**
   - En la herramienta de sombreado, marca la casilla **Sombreado multidireccional (*Multidirectional hillshade*)**. Compara el resultado con el sombreado simple a 315°.
3. **Guardado en GeoTIFF:**
   - Asegúrate de que todos los rásteres derivados queden guardados en tu carpeta de trabajo en formato GeoTIFF con proyección EPSG:9377.

---

## Checklist de Finalización de Clase y Repaso Semanal

- [ ] Se reproyectó el DEM a EPSG:9377 utilizando el método de remuestreo Bilineal.
- [ ] Se recortó el ráster con la máscara vectorial de la Cuenca de La Iguaná asignando NoData `-9999`.
- [ ] Se calculó el mapa de pendientes en grados ($0^\circ$ a $90^\circ$).
- [ ] Se generó el Hillshade con acimut 315° y altitud 45°.
- [ ] Se implementó la técnica de fusión *Multiplicar* entre pendientes y sombreado.
- [ ] Se derivó el mapa de orientación (*Aspect*).
