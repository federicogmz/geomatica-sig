# G07: Geoprocesamiento vectorial y descarga en tiempo real vía Geoservicios WFS

**Módulo 1 · Semana 7.** En esta sesión aprenderán a realizar operaciones espaciales combinadas sobre la Cuenca de La Iguaná y a consumir datos vectoriales oficiales en vivo mediante **Web Feature Service (WFS)**, preparando el insumo definitivo para el **Informe 1 (I1)** y habilitando la **Ruta de Mejora Activa del Quiz 2**.

---

## 1. ¿Qué es un Geoservicio WFS (Web Feature Service)?

A diferencia de un servicio WMS (que solo envía una imagen plana tipo PNG de las capas), un **WFS** transfiere los **objetos vectoriales crudos con sus geometrías y tablas de atributos completas**. Permite consultar, filtrar y descargar datos oficiales directamente a nuestro GeoPackage sin buscar shapefiles dispersos por internet.

### Conexión al WFS de GeoMedellín:
1. En el **Panel de Navegador**, ubiquen la entrada **WFS / OGC API - Características**.
2. Clic derecho → **Nueva conexión...**
3. Configuren:
   - **Nombre:** `GeoMedellin WFS Oficial`
   - **URL:** `https://geomedellin.medellin.gov.co/server/services/IDE/WFS_Catastro/MapServer/WFSServer`
4. Clic en *Aceptar*.
5. Desplieguen la conexión: verán capas oficiales como *Manzanas*, *Vías* y *División Comunal*.
6. Arrastren la capa de *Manzanas* al lienzo de QGIS.

---

## 2. Geoprocesamiento Vectorial 1: Recorte (*Clip*)

Como el WFS trae las manzanas de todo Medellín, debemos recortarlas al límite exacto de la Cuenca de La Iguaná:

1. Vayan al menú **Vectorial → Herramientas de geoprocesamiento → Cortar (*Clip*)...**
2. **Capa de entrada:** Capa WFS de manzanas (la capa grande a recortar).
3. **Capa de superposición:** Polígono delimitador de la Cuenca de La Iguaná (el "molde de galletas").
4. En **Cortado**, hagan clic en `...` → **Guardar en GeoPackage...**
5. Seleccionen su archivo `proyecto_iguana.gpkg` y asignen el nombre de tabla `manzanas_iguana`.
6. Clic en *Ejecutar*. Ahora tienen las manzanas oficiales recortadas y almacenadas localmente.

---

## 3. Geoprocesamiento Vectorial 2: Faja de Retiro Hídrico (*Buffer*)

El Plan de Ordenamiento Territorial (POT) de Medellín y Corantioquia establecen una **faja de protección ambiental y retiro obligatorio de 30 metros** a cada lado de las corrientes naturales de agua:

1. Vayan al menú **Vectorial → Herramientas de geoprocesamiento → Zona de amortiguamiento (*Buffer*)...**
2. **Capa de entrada:** `red_hidrica` (eje del cauce principal y afluentes).
3. **Distancia:** `30` **metros** (verifiquen que la unidad esté en metros, garantizado por EPSG:9377).
4. **Segmentos:** `10` (define la suavidad de las curvas).
5. Marquen la casilla **Disolver resultado (*Dissolve*)** para que los buffers de afluentes que se cruzan se unan en un único polígono continuo sin traslapes internos.
6. Guarden en `proyecto_iguana.gpkg` como `retiro_hidrico_30m`.
7. Clic en *Ejecutar*.

---

## 4. Geoprocesamiento Vectorial 3: Intersección (*Intersect*) para la Propuesta Territorial

Para identificar qué sectores o predios urbanos están invadiendo la faja de retiro hídrico (insumo fundamental para la sustentación del I1):

1. Vayan a **Vectorial → Herramientas de geoprocesamiento → Intersección...**
2. **Capa de entrada:** `manzanas_iguana`.
3. **Capa de superposición:** `retiro_hidrico_30m`.
4. Guarden en `proyecto_iguana.gpkg` como `manzanas_en_riesgo_retiro`.
5. Clic en *Ejecutar*.
6. Abran la tabla de atributos resultante y calculen con la calculadora de campos el área total en $m^2$ de zonas construidas que se encuentran dentro de la faja de amenaza hídrica:
   ```sql
   $area
   ```

---

## 5. Práctica Autónoma para Repasar Durante la Semana

Para consolidar las operaciones espaciales antes de la sustentación del Informe 1:

1. **Diferencia (*Difference*):**
   - Ejecuta la herramienta **Vectorial → Herramientas de geoprocesamiento → Diferencia...** entre `manzanas_iguana` (Entrada) y `retiro_hidrico_30m` (Superposición).
   - Observa cómo se obtienen las porciones de manzana seguras que quedan fuera de la faja de retiro.
2. **Unión de atributos espaciales (*Spatial Join*):**
   - Menú *Vectorial → Herramientas de gestión de datos → Unir atributos por localización...*
   - Asocia a cada manzana el nombre del afluente más cercano para enriquecer el diagnóstico técnico.
3. **Preparación de la Lámina A3 para I1:**
   - Carga las capas resultantes en el Diseñador de Impresión A3 (visto en G06), asegurando una jerarquía visual impecable entre el cauce, la faja de 30 m y el tejido urbano expuesto.

---

## 6. Ruta de Mejora Activa (Recuperación Quiz 2)

Quienes hayan obtenido observaciones o deducciones de nota en el Quiz 2 (traslapes, errores topológicos o capas sueltas):
1. Abran su archivo entregado en el Quiz 2.
2. Ejecuten el **Comprobador de topología** (visto en G05) y apliquen la modificación de vértices (*Vertex Tool*) o la herramienta **Remodelar objetos espaciales (*Reshape Features*)** para subsanar los traslapes y huecos detectados.
3. Garanticen que las capas corregidas queden guardadas en un GeoPackage con campos en minúsculas y `area_km2` calculada.
4. Envíen el archivo corregido por el canal de Teams habilitado antes del cierre de la semana para recuperar hasta el 50% de la nota perdida.

---

## Checklist antes de pasar al Informe 1

- [ ] Se conectó exitosamente el servicio WFS oficial de GeoMedellín.
- [ ] Se ejecutaron las operaciones de Clip, Buffer (30 m disuelto) e Intersect.
- [ ] Todas las capas resultantes están integradas en `proyecto_iguana.gpkg` en EPSG:9377.
- [ ] Se identificaron espacialmente las áreas de conflicto ambiental para sustentar la propuesta de I1.
- [ ] Se repasaron las herramientas de geoprocesamiento con la práctica autónoma semanal.
