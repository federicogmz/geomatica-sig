# G10: Calculadora ráster, reclasificación de amenaza, isolíneas y perfiles topográficos

**Módulo 2 · Semana 10.** Álgebra de mapas, modelación espacial continua y relieve avanzado. En esta sesión dominarán la calculadora ráster para reclasificar variables territoriales mediante operadores booleanos, generar curvas de nivel vectoriales a partir del DEM y trazar el perfil topográfico longitudinal del cauce principal de La Iguaná.

---

## 1. Fundamentos del Álgebra de Mapas (Raster Calculator)

El álgebra de mapas permite aplicar operadores matemáticos y lógicos (+, −, $\times$, $/$, $>$, $<$, $\text{AND}$, $\text{OR}$) celda a celda entre una o múltiples capas ráster que compartan extensión y tamaño de celda:

- En QGIS se accede desde el menú superior: **Raster → Calculadora ráster...**
- Las capas se referencian con su nombre y el número de banda entre comillas dobles, por ejemplo: `"pendiente_grados_iguana@1"`.
- Una expresión lógica evalúa a `1` si es verdadera y a `0` si es falsa.

---

## 2. Reclasificación de Pendientes en Categorías de Amenaza Geotécnica

Siguiendo la metodología de zonificación de laderas del Valle de Aburrá (Aristizábal et al., Corantioquia), clasificaremos el terreno en tres niveles de susceptibilidad física:
- **Clase 1 (Amenaza Baja):** Pendientes $< 15^\circ$ (terrenos planos, fondos de valle y terrazas).
- **Clase 2 (Amenaza Media):** Pendientes entre $15^\circ$ y $30^\circ$ (laderas onduladas de pendiente moderada).
- **Clase 3 (Amenaza Alta):** Pendientes $> 30^\circ$ (laderas empinadas y escarpes no aptos para urbanización).

### Expresión en la Calculadora Ráster:
1. Abre **Raster → Calculadora ráster...**
2. Escribe con precisión la siguiente fórmula aritmética-booleana:
   ```sql
   ("pendiente_grados_iguana@1" < 15) * 1 + 
   ("pendiente_grados_iguana@1" >= 15 AND "pendiente_grados_iguana@1" <= 30) * 2 + 
   ("pendiente_grados_iguana@1" > 30) * 3
   ```
3. **Capa de salida:** `amenaza_pendiente_iguana.tif`.
4. **Formato:** `GeoTIFF`.
5. Haz clic en **Aceptar**.

### Simbología Categórica de la Amenaza:
1. Clic derecho sobre la nueva capa → *Propiedades → Simbología*.
2. Tipo de renderizador: **Paleta / Valores únicos**.
3. Clic en **Clasificar**.
4. Asigna colores normativos:
   - Valor `1`: Verde suave (Etiqueta: *Baja amenaza (< 15°)*).
   - Valor `2`: Amarillo / Naranja (Etiqueta: *Media amenaza (15° - 30°)*).
   - Valor `3`: Rojo oscuro (Etiqueta: *Alta amenaza (> 30°)*).

---

## 3. Extracción de Curvas de Nivel Vectoriales (Isolíneas)

Las curvas de nivel representan líneas de igual altitud topográfica y son un insumo indispensable para planos de ingeniería y arquitectura:

1. Ve a **Raster → Extracción → Curvas de nivel...**
2. Configura los parámetros:
   - **Capa de entrada:** Tu DEM reproyectado en EPSG:9377 (`dem_iguana_recorte_9377.tif`).
   - **Intervalo entre curvas de nivel:** `25` **metros** (o `50` m para escala general).
   - **Nombre del campo:** `elev` (guardará la altitud de la curva como número entero).
3. En **Curvas de nivel**, guarda en tu GeoPackage `proyecto_iguana.gpkg` con nombre de tabla `curvas_nivel_25m`.
4. Haz clic en **Ejecutar**.

### Estilizado de Curvas Maestras e Intermedias:
1. En las propiedades de la capa de curvas de nivel, abre la pestaña **Simbología** y selecciona **Basado en reglas**.
2. **Regla 1 (Curvas Maestras cada 100 m):**
   - Filtro: `"elev" % 100 = 0` (el operador `%` calcula el módulo o residuo).
   - Estilo: Línea café oscuro (`#8c510a`), grosor `0.4 mm`. Etiqueta visible con la cota.
3. **Regla 2 (Curvas Intermedias cada 25 m):**
   - Filtro: `"elev" % 100 != 0`
   - Estilo: Línea café claro (`#dfc27d`), grosor `0.15 mm`, sin etiqueta.

---

## 4. Perfil Topográfico Longitudinal del Cauce

El perfil longitudinal muestra la pendiente hidráulica y los saltos de cota a lo largo del recorrido de la quebrada desde su nacimiento hasta su desembocadura:

1. Instala el complemento **Profile Tool** desde *Complementos → Administrar e instalar complementos...*
2. Abre la herramienta desde el menú *Plugins → Profile Tool → Terrain profile*.
3. En el panel inferior del plugin:
   - Selecciona tu DEM en el panel de capas de QGIS y haz clic en **Add Layer** en el Profile Tool.
4. En **Selection**, elige **Selected polyline**.
5. Selecciona en el mapa el eje principal de la Quebrada La Iguaná (capa `red_hidrica`).
6. Observa la gráfica generada:
   - Cota máxima en el Alto de Boquerón ($\approx 2\,800\text{ msnm}$).
   - Descenso abrupto en el sector rural de San Cristóbal.
   - Zona de pendiente suave en la desembocadura al Río Medellín ($\approx 1\,460\text{ msnm}$).
7. Puedes exportar la curva como imagen PNG o los pares de datos $(X, Z)$ como archivo CSV.

---

## 5. Práctica Autónoma para Repasar Durante la Semana

Para afianzar el análisis ráster de terreno:

1. **Máscara booleana simple:**
   - En la calculadora ráster, genera un mapa de laderas críticas extremas con la expresión:
     ```sql
     ("pendiente_grados_iguana@1" > 45) * 1
     ```
2. **Cálculo de Áreas por Categoría de Amenaza:**
   - Busca en la caja de herramientas la función **Informe de valores únicos de capa ráster**.
   - Ejecútala sobre `amenaza_pendiente_iguana.tif`: obtendrás la cantidad exacta de píxeles y la superficie en $m^2$ y hectáreas de cada clase de amenaza.

---

## Checklist de Finalización de Clase y Repaso Semanal

- [ ] Se domina la sintaxis y operadores booleanos en la Calculadora Ráster.
- [ ] Se reclasificó la pendiente en tres categorías cuantitativas de amenaza.
- [ ] Se extrajeron curvas de nivel a intervalos métricos regulares y se guardaron en el GeoPackage.
- [ ] Se diferenció la simbología entre curvas maestras e intermedias con expresiones de módulo.
- [ ] Se generó y comprendió el perfil longitudinal de elevación del cauce principal.
