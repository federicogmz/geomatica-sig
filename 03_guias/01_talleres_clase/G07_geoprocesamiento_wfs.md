# G07: Geoprocesamiento vectorial avanzado, consumo WFS en tiempo real y modelación de rondas hídricas (30 + D m)

> **Semestre / Ciclo:** 2027-1  
> **Semana / Fecha:** Semana 7 (`S07`) · Jueves 04 de marzo de 2027  
> **Horario oficial:** 12:00 m. – 4:30 p.m. (4.5 h presenciales en Sala de Cómputo EAFIT)  
> **Modalidad:** 100 % Individual  
> **Software en Sala:** QGIS LTR + ArcGIS Pro (Licencia institucional Advanced)  
> **Cuenca Escuela de Demostración:** Cuenca de la Quebrada La Iguaná (Medellín)  
> **Área de Aplicación Individual:** Unidad Territorial Única (`U01` a `U30`)  
> **Preparación Directa:** Insumos y flujo hacia la **Evaluación Práctica Integradora 1 ([Hito 2, 20 %, Tier P](../03_evaluaciones/HITO_2_EVALUACION_VECTORIAL_CARTOGRAFIA.md) — Semana 8 · 11 mar 2027)**  

---

## 1. Presupuesto de Tiempo Semanal (Dedicación Total: hasta 9.0 h)

| Bloque de Actividad | Franja Horaria / Duración | Entorno y Enfoque Pedagógico |
|---|:---:|---|
| **Sub-bloque 1: Geoprocesamiento y WFS en QGIS** | `12:00 m. – 1:50 p.m.` (110 min) | Sala de Cómputo: Descarga WFS oficial, geoprocesos de **Buffer con Dissolve**, **Clip** e **Intersect** con retiro paramétrico individual $R = 30 + D\text{ m}$ sobre La Iguaná. |
| **Pausa Activa Pedagógica** | `1:50 p.m. – 2:10 p.m.` (20 min) | Descanso cognitivo y almuerzo ligero integrado. |
| **Sub-bloque 2: ArcGIS Pro y Aplicación H2** | `2:10 p.m. – 4:25 p.m.` (135 min) | Sala de Cómputo: **Pairwise Buffer**, **Pairwise Intersect** y **Summarize Within** en ArcGIS Pro sobre la unidad `U01`–`U30` y simulacro hacia el Hito 2. |
| **Protocolo de Cierre en Sala** | `4:25 p.m. – 4:30 p.m.` (5 min) | Empaquetado `C:\Temp\SIG_Usuario\ -> .zip`, copia a USB/Drive institucional y purga local. |
| **Trabajo Autónomo Independiente** | $\le 4.5\text{ h}$ semanales | PC Personal / Casa: Depuración de polígonos de afectación y repaso hacia la evaluación práctica del Hito 2. |

---

## 2. Parámetro Individual del Retiro Hídrico: $R = 30 + D\text{ metros}$

El Plan de Ordenamiento Territorial (POT) de Medellín y la normativa ambiental regional establecen una faja de protección y retiro obligatorio a lado y lado del cauce natural de las corrientes de agua.

Para garantizar la autoría individual y evaluar la sensibilidad espacial del modelo, cada estudiante parametrizará su geoproceso con su último dígito de documento de identidad ($D \in \{0, 1, \dots, 9\}$):

$$R = 30 + D\text{ metros}$$

- Si $D = 0 \implies R = 30\text{ m}$
- Si $D = 4 \implies R = 34\text{ m}$
- Si $D = 9 \implies R = 39\text{ m}$

Las capas resultantes deberán nombrarse explícitamente incorporando su parámetro: `retiro_hidrico_<30+D>m` (p. ej. `retiro_hidrico_34m`).

---

## 3. Secuencia Didáctica: Worked-Example Fading

```
[Etapa 1: Ejemplo Resuelto] ──> [Etapa 2: Completación] ──> [Etapa 3: Caso Roto] ──> [Etapa 4: Transferencia U01-U30]
 (WFS, Clip y Buffer Dissolve)   (Cruce Intersect y Recálculo) (Buffer sin Dissolve +38%)  (Pairwise Pro + Simulacro H2)
```

### Etapa 1: Ejemplo Trabajado con "Por Qué" (12:00 m. – 12:50 p.m.)

#### Demostración del Profesor sobre La Iguaná en QGIS LTR:

1. **Consumo de Vectores Crudos mediante Geoservicios WFS (Web Feature Service):**
   - A diferencia de un WMS (que solo transmite imágenes estáticas), un **WFS** transfiere las entidades vectoriales reales con su geometría pura y su tabla de atributos completa.
   - En el **Panel de Navegador**, ubiquen la entrada **WFS / OGC API - Características**.
   - Clic derecho $\rightarrow$ **Nueva conexión...**:
     - **Nombre:** `GeoMedellin WFS Oficial`
     - **URL:** `https://geomedellin.medellin.gov.co/server/services/IDE/WFS_Catastro/MapServer/WFSServer`
   - Clic en *Aceptar*, desplieguen la conexión y arrastren la capa oficial de *Manzanas* al lienzo de QGIS.

2. **Geoproceso 1: Recorte Espacial (*Clip*):**
   - Como el WFS contiene la malla catastral de todo Medellín, recortamos los datos al límite de la cuenca:
   - Menú **Vectorial $\rightarrow$ Herramientas de geoprocesamiento $\rightarrow$ Cortar (*Clip*)...**
   - *Capa de entrada:* Capa WFS de Manzanas.
   - *Capa de superposición:* Polígono de delimitación de la cuenca.
   - *Cortado:* Clic en `...` $\rightarrow$ **Guardar en GeoPackage...** $\rightarrow$ `cuenca_escuela_iguana.gpkg` $\rightarrow$ Tabla: `manzanas_iguana`.
   - Clic en *Ejecutar*. Ahora tenemos las manzanas oficiales aisladas en nuestra base local.

3. **Geoproceso 2: Faja de Retiro Hídrico (*Buffer*) con Disolución Obligatoria (*Dissolve*):**
   - Menú **Vectorial $\rightarrow$ Herramientas de geoprocesamiento $\rightarrow$ Zona de amortiguamiento (*Buffer*)...**
   - *Capa de entrada:* `red_hidrica` (eje del cauce y afluentes).
   - *Distancia:* `30` **metros** (garantizado en metros por `EPSG:9377`).
   - *Segmentos:* `12` (controla la suavidad del arco en las curvas).
   - **Casilla crítica obligatoria: Marcar "Disolver resultado" (*Dissolve*):**
     - *Por qué geoespacial:* Una red hídrica natural está conformada por decenas de segmentos contiguos y confluencias tributarias. Si no se activa la disolución, cada segmento genera un óvalo independiente que se traslapa con los vecinos, duplicando y triplicando el cálculo de áreas de retiro en cada curva y confluencia.
   - Guardar en GeoPackage como `retiro_hidrico_30m`.

> [!NOTE]
> **Prompt de Auto-Explicación Obligatorio 1:**
> *¿Qué diferencia topológica existe entre la operación de Recorte (Clip) y la operación de Intersección (Intersect) en términos de las tablas de atributos resultantes?*

---

### Etapa 2: Ejemplo de Completación — Fading del Último Paso (12:50 p.m. – 1:20 p.m.)

#### Identificación de Conflicto Predial e Invasión de Rondas Hídricas:
Se suministran las capas `manzanas_iguana` y `retiro_hidrico_30m`. El estudiante completa la cuantificación de áreas afectadas:

1. Menú **Vectorial $\rightarrow$ Herramientas de geoprocesamiento $\rightarrow$ Intersección...**
2. *Capa de entrada:* `manzanas_iguana`.
3. *Capa de superposición:* `retiro_hidrico_30m`.
4. Guardar en GeoPackage como `manzanas_en_riesgo_retiro`. Clic en *Ejecutar*.

#### Paso a completar por el estudiante: Recálculo Obligatorio de Métricas Geométricas:
> [!WARNING]
> Tras una operación de *Clip* o *Intersect*, las columnas existentes de área en la tabla de atributos (ej. `area_m2` o `area_ha`) conservan los valores de la manzana completa original antes del corte. **No reflejan el tamaño del polígono recortado.**

1. Abran la tabla de atributos de `manzanas_en_riesgo_retiro`.
2. Abran la **Calculadora de campos**.
3. Marquen **Actualizar un campo existente** (o creen `area_afectada_m2` de tipo Real/Double).
4. Expresión métrica planar exacta:
   ```sql
   round(area($geometry), 2)
   ```
5. En la barra inferior de la tabla de atributos, seleccionen **Mostrar resumen estadístico**:
   - Suma total de área construida invadiendo la faja de retiro: `___________ m²`
   - Número total de fragmentos prediales comprometidos: `___________ polígonos`

---

### Etapa 3: Diagnóstico y Reparación de Caso Roto de Consultoría (1:20 p.m. – 1:50 p.m.)

#### El Caso Roto:
Una consultora elaboró el censo de áreas afectadas para un proyecto de reasentamiento por riesgo de avalancha en La Iguaná. El analista ejecutó la herramienta *Buffer* a $30\text{ m}$ sobre una red de drenaje digitalizada en 140 tramos individuales, pero **dejó desmarcada la opción "Disolver resultado" (*Dissolve = False*)**. Posteriormente cruzó ese buffer contra la capa predial mediante *Intersect* y sumó la columna de áreas:
- Reportó un área total de afectación de **$482.300\text{ m}^2$**, exigiendo un presupuesto de compensación predial de \$96.000 millones COP.
- Al revisar el proceso, la interventoría ejecutó el mismo buffer activando **Dissolve** y recalculó la intersección: el área real afectada era de solo **$349.500\text{ m}^2$**.
- El informe del consultor junior había inflado artificialmente el área en un **$38.0\text{ \%}$** debido a los solapes geométricos en las confluencias y quiebres del cauce.

```
+-----------------------------------------------------------------------------------+
| EL ERROR DEL BUFFER SIN DISOLVER:                                                 |
| Tramo A: Buffer 30 m -> Polígono de 10.000 m²                                     |
| Tramo B: Buffer 30 m -> Polígono de 10.000 m²                                     |
| Zona de confluencia solapada: 3.800 m² compartidos por ambos segmentos            |
| SIN DISSOLVE: 10.000 + 10.000 = 20.000 m² (¡Se contó 2 veces la confluencia!)     |
| CON DISSOLVE: Unión booleana limpia = 16.200 m² (Área real sobre el terreno)      |
+-----------------------------------------------------------------------------------+
```

#### Andamiaje de Análisis del Error (Responde en tu libreta técnica):
1. **Detectar:** ¿Qué evidencia visual en el lienzo del mapa revela de inmediato que un buffer no fue disuelto?
2. **Explicar:** ¿Por qué la operación de intersección duplica las entidades prediales cuando se cruza contra un polígono de superposición que contiene auto-solapes internos?
3. **Corregir:** Diseña el flujo corregido y demuestra cómo la opción *Disolver resultado* en QGIS (o *Dissolve Type = All* en ArcGIS Pro) garantiza la unicidad geométrica de la faja de protección.

---

*(1:50 p.m. – 2:10 p.m. · Pausa Activa Pedagógica / Almuerzo Ligero)*

---

### Etapa 4: Espejo Corporativo en ArcGIS Pro y Preparación Hito 2 (2:10 p.m. – 4:25 p.m.)

#### A. Geoprocesamiento de Alto Rendimiento en ArcGIS Pro:
1. En ArcGIS Pro, abran el panel **Geoprocessing**.
2. Busquen las herramientas optimizadas de la suite **Pairwise**:
   - **Pairwise Buffer (Analysis Tools):**
     - *Input Features:* `red_drenaje`.
     - *Distance:* `30 + D` metros (ingresen su valor individual, ej. $34\text{ m}$).
     - **Dissolve Type: Seleccionar obligatoriamente "All" (o "Dissolve all output features into a single feature").**
   - **Pairwise Intersect (Analysis Tools):**
     - Ejecuta la intersección entre su buffer disuelto y la clase de tejido urbano o predios.
   - **Summarize Within (Analysis Tools):**
     - Permite cuantificar automáticamente la superficie total de polígonos contenidos dentro de cada faja de zonificación, calculando promedios y sumatorias sin pasos manuales.

#### B. Transferencia Autónoma a la Unidad Territorial `U01` a `U30`:
1. Ejecuten la delimitación del retiro ambiental $R = 30 + D\text{ m}$ sobre su unidad territorial en ArcGIS Pro y en QGIS LTR.
2. Recorten y crucen contra las capas de manzanas o polígonos focales de su tramo.
3. Recalculen el campo `area_afectada_m2` mediante `round(area($geometry), 2)`.
4. Comprueben que la base espacial quede almacenada en su GeoPackage y File Geodatabase libre de solapes topológicos, lista para la evaluación práctica de la próxima semana.

---

## 4. Protocolo Obligatorio de Cierre en Sala (4:25 p.m. – 4:30 p.m. · 5 min)

1. Guarden las ediciones en los proyectos de QGIS LTR y ArcGIS Pro.
2. En `C:\Temp\`, compriman su carpeta de trabajo en:
   ```text
   SIG_Uxx_Apellido_Nombre_S07.zip
   ```
3. Cópienlo a su memoria USB y a la nube de OneDrive EAFIT.
4. Purguen la carpeta local `C:\Temp\SIG_Usuario\` antes de retirarse.

---

## 5. Checklist de Preparación para el Hito 2 (Semana 8)

- [ ] Consumí capas vectoriales oficiales en tiempo real mediante el geoservicio WFS.
- [ ] Ejecuté la operación de *Clip* para acotar los datos distritales a mi cuenca de estudio.
- [ ] Modelé la faja de retiro $R = 30 + D\text{ m}$ con **disolución geométrica activa (*Dissolve*)**.
- [ ] Ejecuté la intersección y **recalculé obligatoriamente los atributos de área en metros cuadrados**.
- [ ] Comprendí el Caso Roto de consultoría justificando cómo un buffer sin disolver infla las áreas.
- [ ] Ejecuté las herramientas homólogas *Pairwise Buffer (Dissolve All)*, *Pairwise Intersect* y *Summarize Within* en ArcGIS Pro.
- [ ] Ejecuté el cierre seguro de 5 minutos en `C:\Temp`.
