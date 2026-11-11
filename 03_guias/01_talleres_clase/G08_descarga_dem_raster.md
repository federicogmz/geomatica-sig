# G08: Adquisición de Modelos Digitales de Elevación (DEM), reproyección GDAL Warp, control NoData y recorte matricial por máscara

> **Semestre / Ciclo:** 2027-1  
> **Semana / Fecha:** Semana 10 (`S10`) · Jueves 01 de abril de 2027  
> **Horario oficial:** 12:00 m. – 4:30 p.m. (4.5 h presenciales en Sala de Cómputo EAFIT)  
> **Modalidad:** 100 % Individual  
> **Software en Sala:** QGIS LTR + ArcGIS Pro (Licencia institucional Advanced con extensión Spatial Analyst activa)  
> **Cuenca Escuela de Demostración:** Cuenca de la Quebrada La Iguaná (Medellín)  
> **Área de Aplicación Individual:** Microcuenca completa de su Unidad Territorial asignada (`U01` a `U30`)  

---

## 1. Contexto Académico y Transición del Calendario (Retorno tras Hitos 2, 3 y Semana Santa)

Para contextualizar el inicio del **Módulo de Modelación Ráster y Análisis del Relieve**, recapitulemos la trayectoria de las últimas semanas:

1. **Semana 8 (`S08` · 11 mar 2027):** Se desarrolló en sala la **Evaluación Práctica Integradora 1 ([Hito 2, 20 %, Tier P](../03_evaluaciones/HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md))** sobre saneamiento topológico, geoprocesamiento multicriterio ($R = 30 + D\text{ m}$) y maquetación cartográfica A3. En cumplimiento del acuerdo pedagógico, esa semana no tuvo guías de laboratorio adicionales para proteger el presupuesto de 4.5 h autónomas.
2. **Semana 9 (`S09` · 18 mar 2027):** Tuvo lugar la entrega y sustentación del **[Avance 1 Individual del Proyecto (Hito 3, 20 %, Tier D)](../03_evaluaciones/HITO_3_AVANCE_PROYECTO_INDIVIDUAL_A3.md)** mediante 2 rondas presenciales de Estación en Vivo y Revisión de Pares estructurada.
3. **Jueves 25 de marzo de 2027:** Correspondió al receso institucional universitario por **Semana Santa** (sin actividades académicas).
4. **Semana 10 (`S10` · 01 abr 2027):** Retornamos al aula iniciando formalmente el modelo matricial (Ráster), la adquisición de Modelos Digitales de Elevación (DEM) y el control de celdas nulas en QGIS LTR y ArcGIS Pro.

---

## 2. Presupuesto de Tiempo Semanal (Dedicación Total: hasta 9.0 h)

| Bloque de Actividad | Franja Horaria / Duración | Entorno y Enfoque Pedagógico |
|---|:---:|---|
| **Sub-bloque 1: Modelo Ráster y GDAL en QGIS** | `12:00 m. – 1:50 p.m.` (110 min) | Sala de Cómputo: Modelo matricial, píxeles, resolución espacial, tipo `Float32`, `NoData = -9999`, reproyección **GDAL Warp (`gdalwarp`)** y recorte por máscara sobre La Iguaná. |
| **Pausa Activa Pedagógica** | `1:50 p.m. – 2:10 p.m.` (20 min) | Descanso cognitivo y almuerzo ligero integrado. |
| **Sub-bloque 2: ArcGIS Pro y Aplicación Unidad** | `2:10 p.m. – 4:25 p.m.` (135 min) | Sala de Cómputo: **Project Raster**, **Extract by Mask** y control riguroso de **Environments** en ArcGIS Pro sobre la microcuenca individual `U01`–`U30`. |
| **Protocolo de Cierre en Sala** | `4:25 p.m. – 4:30 p.m.` (5 min) | Empaquetado `C:\Temp\SIG_Usuario\ -> .zip`, copia a USB/Drive institucional y purga local. |
| **Trabajo Autónomo Independiente** | $\le 4.5\text{ h}$ semanales | PC Personal / Casa: Descarga, reproyección y recorte limpio del DEM base para los análisis morfométricos de G09. |

---

## 3. El Modelo de Datos Matricial (Ráster)

A diferencia del modelo vectorial (que representa objetos discretos mediante pares de coordenadas $X, Y$), un **ráster** es una malla ortogonal continua organizada en filas y columnas donde cada celda (píxel) almacena un valor escalar:
- **En un Modelo Digital de Elevación (DEM / MDE):** El valor de cada píxel representa la **cota altimétrica sobre el nivel del mar en metros (msnm)**.
- **Resolución espacial:** La dimensión del lado de la celda sobre el terreno (p. ej. $12.5\text{ m} \times 12.5\text{ m} = 156.25\text{ m}^2$ por píxel en ALOS PALSAR RTC; $30\text{ m} \times 30\text{ m} = 900\text{ m}^2$ en SRTM).
- **Tipo de dato radiométrico:** Para elevación continua se exige **Float32 (Real de 32 bits)** para capturar variaciones submétricas de relieve sin truncamiento a enteros.
- **Valor NoData:** Valor numérico reservado para indicar ausencia de datos o celdas exteriores a la máscara de la cuenca (el estándar oficial del curso es **`-9999`**).

---

## 4. Secuencia Didáctica: Worked-Example Fading

```
[Etapa 1: Ejemplo Resuelto] ──> [Etapa 2: Completación] ──> [Etapa 3: Caso Roto] ──> [Etapa 4: Transferencia U01-U30]
 (GDAL Warp y NoData -9999)      (Clip por Máscara La Iguaná)(DEM con NoData=0 msnm)     (Environments Pro + Unidad)
```

### Etapa 1: Ejemplo Trabajado con "Por Qué" (12:00 m. – 12:50 p.m.)

#### Adquisición y Reproyección Rigurosa con GDAL Warp en QGIS LTR:

Fuentes principales de acceso abierto:
1. **ALOS PALSAR RTC (12.5 m):** Descargable desde el geoportal [ASF Vertex](https://vertex.daac.asf.alaska.edu/) (Alaska Satellite Facility, requiere cuenta gratuita de NASA Earthdata). Producto de radar de apertura sintética corregido radiométricamente por terreno.
2. **SRTM GL1 (30 m):** Misión topográfica de transbordador espacial NASA.

#### Demostración del Profesor sobre La Iguaná:
El DEM crudo descargado de ASF Vertex viene proyectado en coordenadas geográficas WGS84 (`EPSG:4326`) o UTM con resolución en grados. **No se pueden calcular pendientes ni perfiles hidrológicos en grados.** Es mandatorio reproyectarlo a `EPSG:9377`:

1. Menú **Ráster $\rightarrow$ Proyecciones $\rightarrow$ Combar (reproyectar)... (*GDAL Warp*)**.
2. Parámetros de configuración:
   - *Capa de entrada:* `dem_alos_palsar_crudo.tif`.
   - *SRC de destino:* **EPSG:9377 - MAGNA-SIRGAS 2018 / Origen-Nacional**.
   - **Método de remuestreo:** Seleccionar **Bilineal (*Bilinear*)** o **Cúbico (*Cubic*)**.
     - *Por qué físico:* Un DEM es una superficie matemática continua. El método de *Vecino más próximo (Nearest Neighbor)* genera escalonamientos y artefactos de terrazas artificiales que falsean las pendientes. Por el contrario, para capas categóricas (como usos del suelo), se usaría *Vecino más próximo* para no inventar clases intermedias inexistentes.
   - **Establecer valor sin datos para bandas de salida (*dstnodata*):** Escribir explícitamente:
     ```text
     -9999
     ```
   - *Resolución del ráster de salida:* `12.5` metros.
3. Línea de comando GDAL ejecutada en segundo plano por QGIS:
   ```bash
   gdalwarp -s_srs EPSG:4326 -t_srs EPSG:9377 -r bilinear -tr 12.5 12.5 -dstnodata -9999.0 dem_crudo.tif dem_iguana_9377.tif
   ```

> [!NOTE]
> **Prompt de Auto-Explicación Obligatorio 1:**
> *¿Por qué calcular el mapa de pendientes sobre un DEM cuyas coordenadas horizontales están en grados (EPSG:4326) y las elevaciones verticales en metros produce pendientes erróneas cercanas al 89° en laderas suaves?*

---

### Etapa 2: Ejemplo de Completación — Fading del Último Paso (12:50 p.m. – 1:20 p.m.)

#### Recorte Altimétrico por Capa de Máscara en QGIS LTR:
Se suministran el DEM reproyectado `dem_iguana_9377.tif` y el polígono delimitador de la cuenca. El estudiante completa el aislamiento matricial:

1. Menú **Ráster $\rightarrow$ Extracción $\rightarrow$ Cortar ráster por capa de máscara (*Clip raster by mask layer*)...**
2. *Capa de entrada:* `dem_iguana_9377.tif`.
3. *Capa de máscara:* Polígono delimitador de la cuenca.
4. *SRC de origen y destino:* `EPSG:9377`.
5. **Paso a completar por el estudiante:**
   - En la casilla **Asignar un valor sin datos a las bandas de salida**, ingresen:
     ```text
     -9999
     ```
   - Marquen la casilla: **Crear una banda alfa de salida** (o verifiquen que la casilla de coincidencia de extensión esté activa).
   - Guarden como GeoTIFF: `C:\Temp\SIG_Usuario\03_datos_raster\dem_iguana_recortado.tif`.
   - Clic en *Ejecutar*.
6. Abran las propiedades del ráster resultante $\rightarrow$ pestaña **Histograma** $\rightarrow$ clic en *Calcular histograma*.
7. Consulten con la herramienta *Identificar objetos* y anoten las cotas altimétricas exactas:
   - Cota mínima en la desembocadura: `___________ msnm`
   - Cota máxima en la divisoria del Boquerón: `___________ msnm`
   - ¿Aparecen celdas negras de borde con valor 0? `[ ] Sí  [ ] No` *(Debe ser NO).*

---

### Etapa 3: Diagnóstico y Reparación de Caso Roto de Consultoría (1:20 p.m. – 1:50 p.m.)

#### El Caso Roto:
Un consultor ambiental presentó el estudio hidrológico de una cuenca de montaña en el Valle de Aburrá. Para recortar el DEM ALOS PALSAR a la divisoria de la cuenca, utilizó una herramienta genérica sin definir el parámetro `dstnodata`. El software rellenó las celdas rectangulares exteriores a la cuenca con ceros (`0.0`).
- Al ejecutar la herramienta de **Estadísticas zonales (*Zonal Statistics*)** para determinar los parámetros morfométricos de la cuenca, el reporte oficial indicó:
  ```text
  Elevación Máxima: 2.840 msnm
  Elevación Mínima: 0 msnm (Nivel del mar)
  Elevación Media: 820 msnm
  ```
- Con base en esa cota mínima de 0 msnm, calculó el tiempo de concentración hidrológica de la cuenca en 4.5 horas (cuando el valor real para esa cuenca es de solo 45 minutos debido a sus pendientes escarpadas entre 1.450 y 2.840 msnm). La presa de laminación proyectada quedó subdimensionada en un factor de 6.

```
+-----------------------------------------------------------------------------------+
| EL ERROR LETAL DEL NODATA INDEFINIDO:                                            |
| Celdas exteriores sin máscara = Valor 0.0 (en vez de NoData = -9999)              |
| Consecuencia: ¡El software asume que la cuenca desemboca en el Océano Pacífico!   |
| Elevación mínima falsa: 0 msnm (en pleno Valle de Aburrá a 1.450 msnm)            |
| Pendiente media colapsada y tiempo de concentración completamente falseado        |
+-----------------------------------------------------------------------------------+
```

#### Andamiaje de Análisis del Error (Responde en tu libreta técnica):
1. **Detectar:** ¿Qué valor del reporte de estadísticas delator revela que las celdas exteriores están siendo procesadas como terreno real?
2. **Explicar:** ¿Cómo interpreta el álgebra ráster y las funciones estadísticas una celda con valor `0.0` frente a una celda con valor `NoData = -9999`?
3. **Corregir:** Plantea la instrucción técnica en QGIS (o línea de comando GDAL) para reasignar el valor NoData y eliminar el marco espurio de ceros sin alterar los píxeles reales del relieve.

---

*(1:50 p.m. – 2:10 p.m. · Pausa Activa Pedagógica / Almuerzo Ligero)*

---

### Etapa 4: Espejo Corporativo en ArcGIS Pro y Transferencia a su Microcuenca (2:10 p.m. – 4:25 p.m.)

En **ArcGIS Pro** (con licencia *Advanced* y extensión *Spatial Analyst* activa en sala), el procesamiento ráster exige un control riguroso de la pestaña **Environments**:

#### A. Control de Environments en ArcGIS Pro:
1. En la pestaña superior **Analysis $\rightarrow$ Environments**:
   - **Output Coordinate System:** `Current Map [EPSG:9377]`.
   - **Cell Size:** `Same as layer [dem_crudo]` (o fijar en `12.5`).
   - **Snap Raster:** Seleccionar el DEM base *(garantiza que todas las matrices derivadas de pendiente, aspecto y flujos compartan exactamente las mismas esquinas de píxel, previniendo desfases submétricos).*
   - **Mask:** Seleccionar el polígono de su microcuenca.

#### B. Reproyección y Extracción por Máscara:
1. Herramienta **Project Raster (Data Management Tools)**:
   - *Input Raster:* DEM crudo.
   - *Output Coordinate System:* `EPSG:9377`.
   - *Resampling Technique:* **Bilinear** (para elevación continua).
2. Herramienta **Extract by Mask (Spatial Analyst Tools)**:
   - *Input Raster:* DEM reproyectado en `EPSG:9377`.
   - *Feature mask data:* Polígono de su microcuenca asignada.
   - *Output Raster:* `dem_Uxx_recortado.tif`.
3. Verifiquen en las propiedades de la capa ráster (*Source $\rightarrow$ Raster Information*) que el valor **NoData** sea `-9999` y que la estadística mínima coincida con la cota real del tramo inferior de la quebrada.

#### C. Transferencia Autónoma a su Unidad Territorial `U01` a `U30`:
1. Identifiquen la microcuenca completa correspondiente a su quebrada asignada (el polígono envolvente de la cuenca alta hasta el punto de desembocadura de su tramo).
2. Descarguen o carguen el DEM base de la zona.
3. Ejecuten el flujo completo: Reproyección a `EPSG:9377` con remuestreo bilineal + Recorte por máscara con `NoData = -9999`.
4. Apliquen simbología **Monobanda pseudocolor** con rampa armónica topográfica (*Elevation* o *Viridis* invertida).
5. Guarden el ráster resultante en `C:\Temp\SIG_Usuario\03_datos_raster\dem_Uxx_9377.tif`.

---

## 5. Protocolo Obligatorio de Cierre en Sala (4:25 p.m. – 4:30 p.m. · 5 min)

1. Guarden las ediciones en ArcGIS Pro y QGIS LTR.
2. En `C:\Temp\`, compriman su carpeta de trabajo en:
   ```text
   SIG_Uxx_Apellido_Nombre_S10.zip
   ```
3. Cópienlo a su memoria USB personal y súbanlo a OneDrive institucional.
4. Purguen la carpeta local `C:\Temp\SIG_Usuario\` antes de salir de la sala de cómputo.

---

## 6. Checklist de Verificación y Entrega

- [ ] Comprendo la estructura del modelo matricial (filas, columnas, resolución de píxel, Float32).
- [ ] Reproyecté el DEM a `EPSG:9377` con **remuestreo bilineal** usando GDAL Warp.
- [ ] Fijé explícitamente el valor **`NoData = -9999`** evitando marcos rectangulares de ceros.
- [ ] Recorté el DEM a la máscara exacta de la cuenca sin alterar las cotas altimétricas reales.
- [ ] Resolví las 3 preguntas del Caso Roto de consultoría sobre el falseamiento de estadísticas zonales.
- [ ] Configuré la pestaña de **Environments** en ArcGIS Pro (*Snap Raster*, *Cell Size*, *Mask*).
- [ ] Ejecuté las herramientas homólogas *Project Raster* y *Extract by Mask* en ArcGIS Pro.
- [ ] Ejecuté el cierre seguro de 5 minutos en `C:\Temp`.
