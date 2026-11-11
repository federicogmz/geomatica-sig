# G10: Calculadora Ráster, Álgebra de Mapas, Poligonización y Estadísticas Zonales

**Semestre 2027-1 · Módulo 2: SIG Ráster y Álgebra Espacial · Sesión S11 — Parte 2 (Jueves 08 de abril de 2027)**  
*Horario:* 12:00 m. – 4:30 p.m. (Jornada continua de 4.5 h presenciales en Sala de Cómputo EAFIT)  
*Presupuesto Académico:* 4.5 h presenciales + 4.5 h de trabajo autónomo semanal (3 Créditos Académicos · 5 UMEs · 144 h semestrales)  
*Modalidad:* **100 % Individual** · *Metodología:* **Worked-Example Fading** (Cuenca Escuela La Iguaná $\rightarrow$ Espejo en ArcGIS Pro $\rightarrow$ Transferencia autónoma a Unidad Territorial `U01–U30`).

---

## 1. Estructura de la Sesión y Arquitectura Pedagógica

Esta sesión profundiza en la modelación matemática matricial y la interoperabilidad ráster-vectorial:

| Bloque | Horario | Duración | Contenido y Enfoque Pedagógico |
|:---:|:---:|:---:|---|
| **Sub-bloque 1** | 12:00 m. – 1:50 p.m. | 110 min | **Fundamento Conceptual y Modelado Guiado en QGIS LTR (Cuenca Escuela La Iguaná):** Álgebra de mapas condicional, reclasificación de amenaza por pendiente, poligonización vectorial filtrando estrictamente `"DN" = 1`, disolución geométrica (*Dissolve*), estadísticas de zona (*Zonal Statistics*), curvas de nivel vectoriales y análisis del **Caso Roto** (vectorización de clase nula `DN = 0` y confusión de atributos). |
| **Pausa Activa** | 1:50 p.m. – 2:10 p.m. | 20 min | **Pausa activa pedagógica y desconexión visual:** Almuerzo ligero e hidratación. |
| **Sub-bloque 2** | 2:10 p.m. – 4:30 p.m. | 140 min | **Espejo Corporativo en ArcGIS Pro + Transferencia Autónoma Individual (`U01–U30`):** Replicación con herramientas de *Spatial Analyst* (`Con`, `Raster Calculator`, `Raster to Polygon`, `Dissolve`, `Zonal Statistics as Table`), aplicación individual a su microcuenca y tramo asignado, empaquetado seguro desde `C:\Temp` a `.zip`. |

---

## 2. Sub-bloque 1: Flujo en QGIS LTR sobre la Cuenca Escuela La Iguaná

### 2.1 Fundamentos del Álgebra de Mapas (Raster Calculator)
El álgebra de mapas permite evaluar operaciones algebraicas y booleanas celda a celda entre capas ráster alineadas en la misma cuadrícula espacial:
- Acceso en QGIS: **Raster → Calculadora ráster...**
- Sintaxis de capas: `"nombre_capa@banda"` (ej. `"pendiente_grados_iguana@1"`).
- Evaluación booleana: Las expresiones lógicas devuelven `1` (verdadero) o `0` (falso).

### 2.2 Reclasificación Aritmético-Booleana de Amenaza
Combinaremos las condiciones de pendiente del terreno mediante álgebra directa:
```sql
("pendiente_grados_iguana@1" < 15) * 1 + 
("pendiente_grados_iguana@1" >= 15 AND "pendiente_grados_iguana@1" <= 30) * 2 + 
("pendiente_grados_iguana@1" > 30) * 3
```
1. Capa de salida: `amenaza_pendiente_iguana.tif` (formato GeoTIFF).
2. Simbología: **Paleta / Valores únicos**:
   - `1`: Verde (Baja amenaza $<15^\circ$).
   - `2`: Amarillo (Media amenaza $15^\circ-30^\circ$).
   - `3`: Rojo (Alta amenaza $>30^\circ$).

### 2.3 Generación de Máscara Binaria de Laderas Críticas
Para aislar las laderas con restricción severa para urbanización ($> 30^\circ$):
```sql
("pendiente_grados_iguana@1" > 30) * 1
```
Guardar como `mascara_critica_iguana.tif`. Esta capa contiene únicamente valores `1` (laderas críticas) y `0` (terreno no crítico).

### 2.4 Poligonización Vectorial Limpia: Filtrado Estricto `"DN" = 1`
1. Ir a **Raster → Conversión → Poligonizar (ráster a vectorial)...**
2. Parámetros:
   - **Capa de entrada:** `mascara_critica_iguana.tif`.
   - **Nombre del campo:** `DN` (*Digital Number*).
3. Guardar como capa temporal o en `proyecto_iguana.gpkg` con nombre `laderas_criticas_raw`.
4. **Filtrado estricto:**
   - Abrir la tabla de atributos o hacer clic derecho en la capa $\rightarrow$ **Filtrar...**
   - Escribir la expresión de selección:
     ```sql
     "DN" = 1
     ```
   - Exportar los objetos filtrados a una capa definitiva: `laderas_criticas_30deg.gpkg`.

### 2.5 Disolución Geométrica (Dissolve) y Cálculo de Área Neta
1. Ir a **Vectorial → Herramientas de geoprocesamiento → Disolver...**
2. Entrada: `laderas_criticas_30deg`.
3. Guardar en el GeoPackage como `laderas_criticas_disueltas`.
4. Abrir la Calculadora de Campos y crear un campo:
   - **Nombre:** `area_ha` | **Tipo:** `Decimal (real)`
   - **Expresión:** `round($area / 10000.0, 2)`
5. Anotar el área total neta de laderas críticas en la Cuenca de La Iguaná.

### 2.6 Estadísticas de Zona (Zonal Statistics)
Cruza capas continuas (DEM o pendientes) contra polígonos (barrios o tramos de microcuenca):
1. Ir a **Caja de Herramientas de Procesos → Estadísticas de zona**.
2. **Capa ráster:** `dem_iguana_recorte_9377.tif` (o `pendiente_grados_iguana.tif`).
3. **Capa vectorial con zonas:** Polígonos de sectores o tramos.
4. **Prefijo de salida:** `elev_` (o `pend_`).
5. Estadísticas a calcular: **Media (*Mean*)**, **Máximo (*Max*)**, **Mínimo (*Min*)**, **Desviación estándar (*StDev*)**.
6. Ejecutar y revisar los nuevos atributos agregados a la capa vectorial.

### 2.7 Extracción de Curvas de Nivel Vectoriales
1. Ir a **Raster → Extracción → Curvas de nivel...**
2. Capa de entrada: `dem_iguana_recorte_9377.tif`.
3. Intervalo: `25` metros. Campo: `elev`.
4. Estilizado basado en reglas:
   - **Maestras (cada 100 m):** `"elev" % 100 = 0` $\rightarrow$ Línea café oscuro (`#8c510a`), grosor 0.35 mm con etiqueta de cota.
   - **Intermedias (cada 25 m):** `"elev" % 100 != 0` $\rightarrow$ Línea café claro (`#dfc27d`), grosor 0.15 mm sin etiqueta.

---

## 3. El Caso Roto (Broken Example): Errores Críticos a Evitar

> [!CAUTION]
> **Caso Roto A: Poligonización Masiva sin Filtrar `DN = 0`**  
> Cuando un estudiante ejecuta *Poligonizar* sobre una máscara binaria y olvida filtrar `"DN" = 1`, el algoritmo crea un polígono gigantesco que abarca toda la cuenca exterior y los fondos de valle (la clase `0`). Al intentar calcular áreas o intersectar con otras capas, el software procesa cientos de miles de vértices innecesarios, congela la sesión de QGIS y arroja estadísticas de afectación completamente falsas.  
> **Protocolo de remediación:** Siempre inspeccionar la tabla de atributos tras poligonizar, ordenar por el campo `DN` y aplicar de inmediato el filtro `"DN" = 1` antes de cualquier cálculo espacial.

> [!WARNING]
> **Caso Roto B: Confusión de Columnas Espectrales y Atributos de Geometría**  
> El campo `DN` resultante de la poligonización almacena únicamente el valor digital de la celda de origen (`0` o `1`), **no es un valor de área, longitud ni pendiente**. Jamás sume la columna `DN` para estimar superficie; el área debe derivarse con `$area` tras verificar que la capa esté en `EPSG:9377`.

---

## 4. Sub-bloque 2: Espejo Corporativo en ArcGIS Pro

### 4.1 Herramienta Con y Raster Calculator en ArcGIS Pro
1. En ArcGIS Pro, abrir el panel **Geoprocessing**.
2. **Uso de `Con` (Condicional de Spatial Analyst):**
   - Ruta: *Spatial Analyst Tools → Conditional → Con*.
   - **Input conditional raster:** `Slope_UXX_deg`.
   - **Expression:** `Value > 30`.
   - **Input true raster or constant value:** `1`.
   - **Input false raster or constant value:** `0`.
   - **Output raster:** `Mask_Slope_Crit_UXX`.
3. Alternativamente, usar **Raster Calculator** con la sintaxis:
   ```text
   Con("Slope_UXX_deg" > 30, 1, 0)
   ```

### 4.2 Herramienta Raster to Polygon
1. Ruta: *Conversion Tools → From Raster → Raster to Polygon*.
2. **Input raster:** `Mask_Slope_Crit_UXX`.
3. **Field:** `Value`.
4. **Simplify polygons:** Marcada (suaviza esquinas de celda ortogonales).
5. **Output polygon features:** `Laderas_Criticas_Raw`.
6. En la tabla de atributos de la salida, abrir **Select Layer By Attribute**:
   - `gridcode = 1`
   - Clic en **Apply**.
   - Clic derecho en la capa $\rightarrow$ **Data → Export Features** para guardar como `Laderas_Criticas_30deg` en la `.gdb`.

### 4.3 Herramienta Dissolve
1. Ruta: *Data Management Tools → Generalization → Dissolve*.
2. **Input Features:** `Laderas_Criticas_30deg`.
3. **Output Feature Class:** `Laderas_Criticas_Dissolved`.
4. Añadir campo `area_afectada_ha` (tipo *Double*) y calcular con:
   ```python
   !shape.geodesicArea@hectares!  # o !shape.area! / 10000
   ```

### 4.4 Herramienta Zonal Statistics as Table
1. Ruta: *Spatial Analyst Tools → Zonal → Zonal Statistics as Table*.
2. **Input raster or feature zone data:** Polígono de su unidad territorial.
3. **Zone field:** Identificador de sector (`id_tramo` o `nombre_zona`).
4. **Input value raster:** DEM en `EPSG:9377` o mapa de pendientes.
5. **Output table:** `Estadisticas_Zonales_UXX`.
6. **Statistics type:** `ALL` o `MEAN_MAXIMUM_MINIMUM`.
7. Ejecutar e inspeccionar la tabla resumen generada en la `.gdb`.

---

## 5. Transferencia Autónoma a su Unidad Territorial Asignada (`U01–U30`)

Cada estudiante desarrolla de forma individual:
1. Reclasificación booleana de laderas críticas en su microcuenca.
2. Poligonización rigurosa filtrando `"DN" = 1` / `gridcode = 1`.
3. Disolución de parches y cálculo de hectáreas netas afectadas.
4. Generación de curvas de nivel a 25 m con distinción de curvas maestras cada 100 m.
5. Cálculo de estadísticas zonales de elevación y pendiente para su tramo funcional (`U01` a `U30`).
6. Verificación de integridad: cero polígonos de fondo `DN = 0` y rutas relativas validadas.

---

## 6. Cierre de Sesión y Empaquetado Técnico

1. Guardar y cerrar proyectos en QGIS y ArcGIS Pro.
2. Comprimir la carpeta de trabajo:
   ```text
   C:\Temp\UXX_S12_Apellido_Nombre.zip
   ```
3. Transferir a almacenamiento seguro USB / OneDrive.

---

## 7. Checklist de Finalización de Clase y Repaso Semanal

- [ ] Se domina la sintaxis booleana en la Calculadora Ráster de QGIS y en `Con` de ArcGIS Pro.
- [ ] Se poligonizó la máscara crítica filtrando rigurosamente `"DN" = 1` (evitando el Caso Roto de `DN = 0`).
- [ ] Se ejecutó *Dissolve* y se calculó el área total neta en hectáreas sin solapes.
- [ ] Se generaron estadísticas de zona (*Zonal Statistics as Table*) extrayendo medias y máximos.
- [ ] Se maquetaron curvas de nivel maestras e intermedias con regla de módulo (`"elev" % 100`).
- [ ] Se completó el espejo en ArcGIS Pro y la transferencia a la Unidad Territorial `U01–U30`.
