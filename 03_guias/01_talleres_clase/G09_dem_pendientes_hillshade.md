# G09: Modelos Digitales de Elevación (DEM), Pendientes, Sombreado (Hillshade) y Laderas Críticas

**Semestre 2027-1 · Módulo 2: SIG Ráster y Análisis del Relieve · Sesión S11 (Jueves 08 de abril de 2027)**  
*Horario:* 12:00 m. – 4:30 p.m. (Jornada continua de 4.5 h presenciales en Sala de Cómputo EAFIT)  
*Presupuesto Académico:* 4.5 h presenciales + 4.5 h de trabajo autónomo semanal (3 Créditos Académicos · 5 UMEs · 144 h semestrales)  
*Modalidad:* **100 % Individual** · *Metodología:* **Worked-Example Fading** (Cuenca Escuela La Iguaná $\rightarrow$ Espejo en ArcGIS Pro $\rightarrow$ Transferencia autónoma a Unidad Territorial `U01–U30`).

---

## 1. Estructura de la Sesión y Arquitectura Pedagógica

La jornada de modelación del relieve opera bajo el estándar metodológico del curso:

| Bloque | Horario | Duración | Contenido y Enfoque Pedagógico |
|:---:|:---:|:---:|---|
| **Sub-bloque 1** | 12:00 m. – 1:50 p.m. | 110 min | **Fundamento Conceptual y Modelado Guiado en QGIS LTR (Cuenca Escuela La Iguaná, 46.25 km²):** Reproyección rigurosa a `EPSG:9377`, máscara de cuenca, derivación de pendientes (° y %), sombreado plástico (*Hillshade* 315°/45°), fusión multiplicativa (*Multiply*), reclasificación según rangos del POT y perfil longitudinal con *Profile Tool*. |
| **Pausa Activa** | 1:50 p.m. – 2:10 p.m. | 20 min | **Pausa activa pedagógica y desconexión visual:** Almuerzo ligero e hidratación. |
| **Sub-bloque 2** | 2:10 p.m. – 4:30 p.m. | 140 min | **Espejo Corporativo en ArcGIS Pro + Transferencia Autónoma Individual (`U01–U30`):** Replicación con herramientas de *Spatial Analyst* (`Slope`, `Hillshade`, `Reclassify`, `Profile Graph`), aplicación sobre su microcuenca y tramo asignado (`U01` a `U30`), empaquetado seguro desde `C:\Temp` a archivo comprimido individual. |

---

## 2. Sub-bloque 1: Flujo en QGIS LTR sobre la Cuenca Escuela La Iguaná

### 2.1 La Condición Crítica: Reproyección del DEM a EPSG:9377

> [!CAUTION]
> **¡Regla de oro de la geomática!**  
> Si calculan la pendiente sobre un DEM en coordenadas geográficas (grados decimales, `EPSG:4326`), el algoritmo interpretará que las distancias horizontales $\Delta X, \Delta Y$ están en grados mientras que la altura $Z$ está en metros. El resultado será un mapa de pendientes completamente absurdo con valores cercanos a $89.9^\circ$. **El ráster DEBE estar reproyectado al sistema oficial proyectado en metros: MAGNA-SIRGAS / Origen-Nacional (`EPSG:9377`)**.

1. Cargar el DEM crudo (`dem_iguana_crudo.tif`, resolución $12.5\text{ m}$ ALOS PALSAR RTC).
2. Ir al menú superior: **Raster → Proyecciones → Combar (reproyectar)...**
3. Configurar los parámetros:
   - **Capa de entrada:** `dem_iguana_crudo.tif`.
   - **SRC de destino:** `EPSG:9377 - MAGNA-SIRGAS / Origen-Nacional`.
   - **Método de remuestreo:** **Bilineal** o **Cúbico** (conserva la curvatura natural del relieve continuo).
   - **Valor sin datos adicional:** `-9999` (evita valores nulos erróneos en los bordes).
4. Guardar como `dem_iguana_9377.tif` y hacer clic en **Ejecutar**.

### 2.2 Recorte por la Máscara de la Cuenca
1. Ir a **Raster → Extracción → Cortar ráster por capa de máscara...**
2. Configurar:
   - **Capa de entrada:** `dem_iguana_9377.tif`.
   - **Capa de máscara:** Polígono perimetral de La Iguaná (`limite_iguana.geojson` en `EPSG:9377`).
   - **SRC de destino:** `EPSG:9377`.
   - **Asignar un valor sin datos:** `-9999`.
3. Guardar como `dem_iguana_recorte_9377.tif` y ejecutar.

### 2.3 Generación del Mapa de Pendientes (Slope)
1. Ir a **Raster → Análisis → Pendiente...**
2. Parámetros:
   - **Capa de entrada:** `dem_iguana_recorte_9377.tif`.
   - **Factor Z:** `1.0` (las distancias horizontales y la elevación están ambas en metros).
   - **Pendiente en porcentaje:** Desmarcada para obtener grados ($^\circ$); marcada para porcentaje ($\%$).
3. Guardar como `pendiente_grados_iguana.tif` y ejecutar.

#### Simbología Técnica Coherente (Sin Invertir la Rampa):
1. Clic derecho sobre la capa → **Propiedades → Simbología**.
2. Renderizador: **Monobanda pseudocolor**.
3. Rampa de color: Seleccionar la rampa **RdYlGn invertida** (o aplicar gradiente directo de Verde a Rojo):
   - **Verde ($< 15^\circ$):** Pendientes suaves, fondos de valle y terrazas aluviales aptas.
   - **Amarillo ($15^\circ\text{ a }30^\circ$):** Laderas de transición con restricciones morfológicas.
   - **Rojo ($> 30^\circ$):** Laderas críticas y escarpes no aptos para urbanización.
4. Ajustar el modo a **Intervalo igual** con cortes en $15^\circ$ y $30^\circ$.

### 2.4 Mapa de Sombras (Hillshade) y Fusión Plástica 3D
1. Ir a **Raster → Análisis → Mapa de sombras (Hillshade)...**
2. Parámetros:
   - **Capa de entrada:** `dem_iguana_recorte_9377.tif`.
   - **Azimut de la luz:** `315.0^\circ` (iluminación solar convencional del noroccidente; evita la inversión óptica).
   - **Ángulo de altitud solar:** `45.0^\circ`.
   - **Factor Z:** `1.0`.
3. Guardar como `hillshade_iguana.tif` y ejecutar.
4. **Fusión Tridimensional (*Multiply Blend*):**
   - En el panel de capas, colocar `pendiente_grados_iguana.tif` **inmediatamente encima** de `hillshade_iguana.tif`.
   - Clic derecho en `pendiente_grados_iguana.tif` → **Propiedades → Simbología** (o Transparencia).
   - En **Representación de capas → Modo de mezcla (*Blending mode*)**, seleccionar **Multiplicar (*Multiply*)**.
   - Clic en **Aceptar**. La textura sombreada del relieve se integra directamente con el mapa de pendientes cuantitativo.

### 2.5 Reclasificación Normativa de Laderas (Criterio POT de Medellín)
Según el Plan de Ordenamiento Territorial (Acuerdo 48 de 2014):
- **Clase 1 ($< 15^\circ$):** Baja restricción geotécnica.
- **Clase 2 ($15^\circ\text{ a }30^\circ$):** Media restricción; requiere obras de retención y drenaje.
- **Clase 3 ($> 30^\circ$):** Alta amenaza / Suelo de protección de laderas.

En la **Caja de Herramientas de Procesos**, buscar **Reclasificar por tabla**:
- **Capa ráster:** `pendiente_grados_iguana.tif`.
- **Tabla de reclasificación:**
  - `0` a `15` $\rightarrow$ `1`
  - `15` a `30` $\rightarrow$ `2`
  - `30` a `90` $\rightarrow$ `3`
- Salida: `amenaza_pendiente_pot_iguana.tif`.

### 2.6 Perfil Topográfico Longitudinal del Cauce (Profile Tool)
1. Instalar el complemento **Profile Tool** (*Complementos → Administrar e instalar complementos...*).
2. Abrir **Plugins → Profile Tool → Terrain profile**.
3. Añadir el DEM (`dem_iguana_recorte_9377.tif`) mediante **Add Layer**.
4. En **Selection**, seleccionar **Selected polyline** y pinchar el cauce de la quebrada en la capa `red_hidrica`.
5. Inspeccionar el perfil hidráulico: cota de cabecera en Boquerón ($\approx 2\,800\text{ msnm}$) hasta la desembocadura en el Río Medellín ($\approx 1\,460\text{ msnm}$).

---

## 3. Sub-bloque 2: Espejo Corporativo en ArcGIS Pro

En la segunda mitad de la sesión, los estudiantes abren **ArcGIS Pro** para dominar la equivalencia directa de cada operación de análisis del relieve en el ecosistema corporativo de ESRI.

### 3.1 Entorno de Trabajo en ArcGIS Pro
1. Iniciar **ArcGIS Pro** y abrir su proyecto individual `unidad_territorial.aprx`.
2. Confirmar que el mapa esté configurado en **MAGNA-SIRGAS / Origen-Nacional (`EPSG:9377`)**.
3. Importar el DEM mediante el panel de **Geoprocesamiento (*Tools*)**.

### 3.2 Caja de Herramientas Spatial Analyst
Asegurarse de que la licencia de **Spatial Analyst** esté habilitada:

1. **Herramienta `Slope` (Análisis de Pendientes):**
   - Ruta: *Spatial Analyst Tools → Surface → Slope*.
   - **Input raster:** DEM en `EPSG:9377`.
   - **Output raster:** `Slope_UXX_deg`.
   - **Output measurement:** `DEGREE` (o `PERCENT_RISE` para vías).
   - **Method:** `PLANAR` (al estar en coordenadas proyectadas en metros).
   - **Z factor:** `1.0`.
   - Clic en **Run**.

2. **Herramienta `Hillshade` (Mapa de Sombras):**
   - Ruta: *Spatial Analyst Tools → Surface → Hillshade*.
   - **Input raster:** DEM en `EPSG:9377`.
   - **Output raster:** `Hillshade_UXX`.
   - **Azimuth:** `315` | **Altitude:** `45` | **Z factor:** `1.0`.
   - Clic en **Run**.

3. **Efecto de Fusión Plástica (*Layer Blend: Multiply*):**
   - Seleccionar la capa `Slope_UXX_deg` en el panel *Contents*.
   - Ir a la pestaña contextual superior **Appearance**.
   - En el grupo *Effects*, desplegar **Layer Blend** y seleccionar **Multiply**.
   - Asignar una rampa de color continua Verde-Amarillo-Rojo para las pendientes.

4. **Herramienta `Reclassify` (Reclasificación Normativa POT):**
   - Ruta: *Spatial Analyst Tools → Reclass → Reclassify*.
   - **Input raster:** `Slope_UXX_deg`.
   - **Reclass field:** `Value`.
   - Definir la tabla de valores:
     - $0 - 15 \rightarrow 1$
     - $15 - 30 \rightarrow 2$
     - $30 - 90 \rightarrow 3$
   - **Output raster:** `Reclass_Slope_POT`.
   - Clic en **Run**.

5. **Gráfico de Perfil Topográfico (`Profile Graph` / Escena 3D):**
   - En la pestaña **Map**, seleccionar la herramienta de medición de elevación o usar la herramienta **Interpolate Shape** (*3D Analyst Tools → Functional Surface*) sobre la línea del cauce.
   - Visualizar el perfil longitudinal en la ventana interactiva de ArcGIS Pro o convertir la vista a **Local Scene** para exploración tridimensional inmersiva.

---

## 4. Transferencia Autónoma a su Unidad Territorial Asignada (`U01–U30`)

Cada estudiante procede de forma **estrictamente individual** sobre la microcuenca asignada dentro de su portafolio metropolitano (Q01 a Q10) y su tramo funcional (`U01` a `U30`):

1. **Recorte del DEM:** Recortar el DEM metropolitano con el polígono perimetral de su microcuenca asignada (`limite_cuenca_UXX.gpkg`).
2. **Generación de capas:**
   - Mapa de pendientes en grados (`pendiente_UXX_9377.tif` y `Slope_UXX_deg` en la `.gdb`).
   - Mapa de sombreado del terreno (`hillshade_UXX_9377.tif`).
   - Reclasificación según POT (`amenaza_pendiente_pot_UXX.tif`).
3. **Perfil del tramo asignado:** Trazar el perfil longitudinal del segmento del cauce asignado (Alto-Ladera, Medio-Transición o Bajo-Confluencia) y anotar el desnivel total ($\Delta Z$) y la pendiente media ($S_0 = \Delta Z / L$).
4. **Almacenamiento seguro:** Guardar las salidas vectoriales en su GeoPackage `UXX_proyecto.gpkg` y en su File Geodatabase `UXX_proyecto.gdb`, y los rásteres derivados en la subcarpeta `raster/`.

---

## 5. Cierre de Sesión y Empaquetado Técnico

1. Guardar y cerrar los proyectos en QGIS y ArcGIS Pro.
2. Comprobar que no queden bloqueos de base de datos (`.wal`, `.shm` o `.lock`).
3. Comprimir la carpeta de trabajo en:
   ```text
   C:\Temp\UXX_S11_Apellido_Nombre.zip
   ```
4. Transferir el archivo comprimido a su memoria USB personal y respaldarlo en el espacio institucional de OneDrive.

---

## 6. Checklist de Finalización de Clase y Repaso Semanal

- [ ] Se verificó que el DEM está rigurosamente en `EPSG:9377` con método Bilineal y `NoData = -9999`.
- [ ] Se calculó el mapa de pendientes en grados y se aplicó la simbología coherente Verde-Amarillo-Rojo.
- [ ] Se generó el *Hillshade* (315°/45°) y se aplicó la fusión plástica *Multiply* en QGIS y ArcGIS Pro.
- [ ] Se reclasificó el relieve bajo los tres rangos normativos del POT ($<15^\circ$, $15^\circ-30^\circ$, $>30^\circ$).
- [ ] Se ejecutó el espejo en ArcGIS Pro con las herramientas equivalentes de *Spatial Analyst*.
- [ ] Se completó la transferencia a su Unidad Territorial individual (`U01–U30`) y se respaldó el `.zip`.
