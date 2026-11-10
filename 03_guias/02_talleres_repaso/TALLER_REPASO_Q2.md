# Taller de Repaso — Previo al Quiz 2: SIG Vectorial, Atributos y GeoPackage

**Semana sugerida:** Semana 5 a inicios de Semana 6 · **Tiempo estimado de trabajo autónomo:** 60–90 min  
**Modalidad:** Individual en computador con QGIS LTR · **Insumos:** Tus capas de trabajo de las Semanas 4 y 5 (`predios_eafit_9377.shp`, `vias_eafit_4326.geojson` o capas de La Iguaná).

> [!NOTE]
> Este taller reproduce fielmente la dinámica, los retos técnicos y la lógica de calificación programática del **Quiz 2 (8%)**. Si completas este simulacro y ejecutas el script de autoevaluación, sabrás exactamente cómo resolver cada punto de la evaluación en el laboratorio.

---

## Reto 1: El Diagnóstico del Archivo Huérfano (Sin `.prj`)

### Situación Técnica
Un colega te envía una capa catastral de Robledo / La Iguaná, pero en la carpeta falta el archivo `.prj` (o está corrupto). Al cargarla en QGIS, el programa muestra una advertencia de *SRC Desconocido / No definido*.

### ¿Cómo diagnosticar el CRS real sin adivinar?
1. Haz clic derecho sobre la capa → **Propiedades... → Información**.
2. Observa la sección **Extensión (*Extent*)**:
   - Si los valores $X$ son del orden **$4\,710\,000$ a $4\,725\,000$** y los valores $Y$ son del orden **$2\,250\,000$ a $2\,265\,000$**: las coordenadas son **planas métricas en CTM12 (EPSG:9377)**.
   - Si los valores $X$ son del orden **$830\,000$ a $840\,000$** y los valores $Y$ son del orden **$1\,180\,000$ a $1\,190\,000$**: son **planas métricas en MAGNA-SIRGAS Origen West (EPSG:3116)**.
   - Si los valores $X$ son del orden **$-75.5$ a $-75.7$** y los valores $Y$ son del orden **$+6.2$ a $+6.4$**: son **coordenadas geográficas (EPSG:4326)**.

### Ejercicio Práctico 1.1: Simula y Resuelve el Error
1. En tu explorador de archivos, haz una copia de `predios_eafit_9377.shp` en una subcarpeta llamada `simulacro_q2/`.
2. En esa subcarpeta, **elimina exclusivamente el archivo `.prj`**.
3. Abre un proyecto en blanco en QGIS y arrastra `predios_eafit_9377.shp`.
4. Nota cómo QGIS le asigna un signo de interrogación `?` junto al nombre en el panel de capas.
5. Haz clic sobre el ícono `?` (o clic derecho → *Capa → Establecer SRC de la capa → Asignar SRC a la capa...*).
6. Selecciona **EPSG:9377 (MAGNA-SIRGAS / Origen-Nacional)** y haz clic en *Aceptar*.
7. Añade una capa base OpenStreetMap desde QuickMapServices: ¡los polígonos deben caer con exactitud milimétrica sobre los edificios!

> [!WARNING]
> **Diferencia vital para el Quiz:**
> - **Asignar SRC a la capa (*Set Layer CRS*):** Le dice a QGIS en qué sistema estaban originalmente los números de la geometría. No altera las coordenadas.
> - **Reproyectar capa (*Reproject Layer*):** Aplica fórmulas matemáticas para transformar las coordenadas de un CRS a otro. Si usas "Reproyectar" sobre una capa huérfana mal definida, arruinarás los datos.

---

## Reto 2: Caza y Comprensión de MultiPolígonos

### Concepto Clave
- **Polígono simple (*Polygon*):** Un registro en la tabla de atributos = Una única área poligonal cerrada en el mapa.
- **MultiPolígono (*MultiPolygon*):** Un registro en la tabla de atributos = Dos o más islas/polígonos físicamente separados en el terreno (p. ej., un lote atravesado por una vía o dos bloques de aulas bajo la misma matrícula inmobiliaria).

### Ejercicio Práctico 2.1
1. Abre la tabla de atributos de tu capa de predios.
2. Abre la calculadora de campos y escribe la siguiente expresión de inspección:
   ```sql
   num_geometries($geometry)
   ```
3. Si el resultado es `> 1`, esa fila es un **MultiPolígono**.
4. Ahora calcula el área con `$area`:
   - ¿QGIS calcula solo una parte o suma automáticamente todas las partes del MultiPolígono?
   - **Respuesta técnica:** `$area` suma de forma transparente la superficie de todas las partes del polígono compuesto.

---

## Reto 3: Calculadora de Campos con Lógica Condicional

En el Quiz 2 se evalúa tu capacidad para generar campos analíticos mediante expresiones lógicas.

### Ejercicio Práctico 3.1: Cálculo de `area_m2`
1. Conmuta la edición de la capa (ícono del lápiz).
2. Abre la **Calculadora de campos**.
3. Parámetros:
   - Crear un campo nuevo: `area_m2`
   - Tipo de campo: **Número real (decimal)**
   - Longitud: `12`, Precisión: `2`
   - Expresión:
     ```sql
     $area
     ```
4. Clic en *Aceptar*.

### Ejercicio Práctico 3.2: Campo Condicional `es_grande`
Queremos clasificar con una bandera booleana (`1` o `0`) aquellos predios de gran extensión para priorización predial:
1. En la calculadora de campos:
   - Nombre: `es_grande`
   - Tipo: **Número entero (integer)**
   - Expresión condicional estricta:
     ```sql
     CASE 
       WHEN "area_m2" > 1900 THEN 1 
       ELSE 0 
     END
     ```
2. Clic en *Aceptar*.
3. Abre el filtro de la tabla de atributos y selecciona `es_grande = 1`: cuenta cuántos predios cumplen la condición.

---

## Reto 4: Importación y Reproyección de Punto GPS

En el quiz te darán coordenadas de un punto de campo capturado con GPS en grados decimales (WGS84):
$$\text{Latitud: } 6.2836^\circ\text{ N}, \quad \text{Longitud: } -75.5824^\circ\text{ O}$$

### Paso a Paso para Importar sin Errores:
1. Crea en Bloc de Notas / TextEdit un archivo de texto llamado `inspeccion_campo.csv` con el siguiente contenido exacto:
   ```csv
   id,nombre,lat,lon
   1,Punto_Control,6.2836,-75.5824
   ```
2. En QGIS: Menú **Capa → Añadir capa → Añadir capa de texto delimitado...**
3. Selecciona tu archivo `inspeccion_campo.csv`.
4. En **Definición de geometría**:
   - Campo X: `lon` (Longitud, Oeste, negativo).
   - Campo Y: `lat` (Latitud, Norte, positivo).
   - **SRC de la geometría:** `EPSG:4326 - WGS 84` (¡porque las coordenadas están en grados!).
5. Clic en *Añadir*. El punto aparece en el mapa.
6. Ahora expórtalo a EPSG:9377:
   - Clic derecho sobre la capa de puntos → **Exportar → Guardar objetos como...**
   - Formato: **GeoPackage**.
   - Nombre de archivo: `simulacro_q2.gpkg`, Nombre de capa: `punto_gps_9377`.
   - **SRC:** `EPSG:9377 - MAGNA-SIRGAS / Origen-Nacional`.
   - Clic en *Aceptar*.

---

## Reto 5: Simbología Temática y Exportación Final

1. **Simbología graduada:**
   - Clic derecho sobre la capa de predios → *Propiedades → Simbología*.
   - Renderizador: **Graduado**.
   - Columna: `area_m2`.
   - Rampa de color: *Viridis* o *YlOrRd*.
   - Modo: *Cortes naturales (Jenks)* con 4 clases.
   - Clic en *Clasificar* y *Aceptar*.
2. **Exportar a GeoJSON:**
   - Clic derecho sobre la capa → *Exportar → Guardar objetos como...*
   - Formato: **GeoJSON**.
   - Nombre: `predios.geojson`.
   - SRC: `EPSG:9377`.
   - Clic en *Aceptar*.
3. **Guardar el proyecto:**
   - Menú *Proyecto → Propiedades → pestaña General*: verificar que **Guardar rutas relativas al archivo de proyecto** esté activado.
   - Guardar como `proyecto.qgz` en la misma carpeta.

---

## Protocolo de Autoverificación Manual en QGIS

Antes de dar por concluida tu práctica o evaluación, realiza este control de calidad directo en QGIS:

### 1. Verificación del Archivo GeoJSON y Sistema de Coordenadas
- [ ] Carga `predios.geojson` en un proyecto limpio de QGIS.
- [ ] Clic derecho $\to$ **Propiedades $\to$ Información**:
  - Confirma que el SRC sea **MAGNA-SIRGAS / Origen Nacional (EPSG:9377)**.
  - La geometría es de tipo `Polygon` o `MultiPolygon`.

### 2. Verificación de Atributos y Regla Condicional
- [ ] Abre la tabla de atributos (`F6`):
  - [ ] Existe la columna `area_m2` calculada en metros cuadrados ($m^2$).
  - [ ] Existe la columna `es_grande` (entero `1` o `0`).
  - [ ] Comprueba que los predios con `area_m2 > 1900` tengan exactamente `es_grande = 1`.
  - [ ] Comprueba que los predios con `area_m2 <= 1900` tengan `es_grande = 0`.

### 3. Verificación de la Plancha PDF y Proyecto
- [ ] `mapa_q2.pdf`: Abre el PDF al 100% y confirma la presencia de escala gráfica, norte, membrete y leyenda clara.
- [ ] `proyecto.qgz`: Guarda con rutas relativas y comprueba que abra sin capas perdidas.

---

## Lista de Chequeo para el Quiz 2

- [ ] Sé cómo diagnosticar el CRS de una capa huérfana mirando la magnitud de sus coordenadas en Metros vs. Grados.
- [ ] Conozco la diferencia entre "Asignar SRC" y "Reproyectar".
- [ ] Sé calcular `$area` en metros cuadrados y sé que suma todas las partes de un MultiPolígono.
- [ ] Domino la sintaxis `CASE WHEN ... THEN ... ELSE ... END` en la calculadora de campos.
- [ ] Sé cómo importar un archivo `.csv` con coordenadas en WGS84 y luego guardarlo en EPSG:9377.
- [ ] Sé exportar a GeoJSON y GeoPackage verificando que el CRS de salida sea EPSG:9377.
