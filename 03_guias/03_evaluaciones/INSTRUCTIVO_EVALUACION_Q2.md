# Quiz 2: SIG vectorial (8%)

> **Curso:** Geomática, Ingeniería y SIG  
> **Pregrados:** Ingeniería Civil y Diseño Urbano · Universidad EAFIT  
> **Ponderación:** 8% de la nota definitiva del curso  
> **Semana:** 6 · Bloque 2 (Laboratorio de Cómputo)  
> **Modalidad:** Individual, presencial, en el laboratorio, con QGIS  
> **Duración:** 80 minutos, cronometrados y estrictos — lo que no esté entregado al terminar el tiempo no se califica  
> **Materiales permitidos:** Su computador con QGIS, el archivo `predios_sector.shp` que se entrega con este quiz.  

---

## El encargo

Trabajan para una consultora ambiental que apoya el estudio de riesgo de la cuenca de La Iguaná. Un contratista externo les entrega `predios_sector.shp`, un conjunto de 7 predios de un sector en Robledo, sin control de calidad.

Al final de las cuatro etapas, entreguen en una sola carpeta, exactamente estos archivos (reemplazando cada `<código...>` por el número EPSG real que determinen ustedes en la Etapa 1 — por ejemplo, si asignan EPSG:3116, ese archivo se llamaría `predios_3116.gpkg`):

```
predios_<código_plano>.gpkg
predios_<código_geo>.gpkg
predios.geojson
proyecto.qgz
```

Revisen los nombres antes de entregar — si un archivo no está o se llama distinto, esa parte del quiz queda sin entregar.

---

## Etapa 1: CRS y reproyección real (2.5%, ~25 min)

Al abrir `predios_sector.shp` en QGIS, algo no cuadra: la capa no aparece donde debería, o QGIS les pide que elijan un CRS al cargarla.

**1.1** Diagnostiquen qué le falta al archivo (revisen qué archivos vinieron junto al `.shp`, comparando contra la anatomía de un shapefile).

**1.2** El contratista no les dice en qué sistema quedaron las coordenadas — solo que "está en metros, no en grados." Miren los valores de X y Y en la tabla de atributos o en la barra de estado: X ronda los 4.7 millones, Y ronda los 2.2 millones. ¿Qué sistema de referencia colombiano tiene esas magnitudes de falso este y falso norte? Determinen el código EPSG correcto ustedes mismos, asígnenselo a la capa **sin reproyectar nada** (las coordenadas no deben cambiar), y exporten el resultado como `predios_<código_plano>.gpkg`.

**1.3** Ahora sí, **reproyecten de verdad** esa misma capa a coordenadas geográficas (grados, no metros) — el mismo sistema geográfico estándar que ya usaron en semanas anteriores para cargar puntos desde un CSV con lat/lon. Determinen su código EPSG y expórtenla como `predios_<código_geo>.gpkg`. Esto es distinto de lo que hicieron en 1.2: ahí solo declararon un CRS sin tocar las coordenadas; aquí las coordenadas sí deben transformarse a un sistema distinto.

---

## Etapa 2: geometrías y atributos (3%, ~30 min)

En la tabla de atributos de `predios_sector` hay 7 filas. Una de ellas no es un polígono simple y corriente.

**2.1** Encuentren cuál predio es en realidad más de un polígono bajo un mismo registro (columna `tipo` los distingue, pero confírmenlo también revisando la geometría).

**2.2** Con la calculadora de campos, agreguen una columna `area_m2` con el área de cada predio, en metros cuadrados, sobre la capa que ya tiene el CRS correcto (la de la Etapa 1).

**2.3** Con una expresión condicional en la calculadora de campos, agreguen una columna `es_grande` que valga `1` si `area_m2 > 1900`, y `0` en caso contrario.

**2.4** La consultora les pasa un punto de control que el equipo de campo tomó con GPS, en coordenadas geográficas: **6.2836° N, −75.5824° O**. Impórtenlo como una capa de punto nueva y agréguenla dentro del mismo GeoPackage de la Etapa 1, como una segunda capa (recuerden que un GeoPackage puede guardar varias capas en un solo archivo). Determinen dentro de cuál `id_predio` cae ese punto, y regístrenlo en el punto como dos atributos nuevos: `predio_id` y `predio_area_m2` (el área de ese predio).

**2.5** Guarden todos los cambios en el GeoPackage de la Etapa 1 — debe quedar con dos capas: `predios` (con `area_m2` y `es_grande`) y el punto de control (con `predio_id` y `predio_area_m2`).

---

## Etapa 3: el formato correcto para cada entrega (1.25%, ~13 min)

La consultora necesita mandarle esta capa a dos personas distintas: un colega que solo necesita verla rápido sin instalar nada raro, y el equipo de datos, que la va a integrar con otras capas en un solo paquete.

**3.1** Exporten la capa de predios (ya con `area_m2` y `es_grande`) a GeoJSON, como `predios.geojson`.

**3.2** El GeoPackage de la Etapa 2 es su segunda entrega para este punto — no hace falta crear uno nuevo, pero confirmen que sigue teniendo sus dos capas y todas las columnas antes de dejarlo en la carpeta final.

---

## Etapa 4: simbología graduada (1.25%, ~12 min)

**4.1** Sobre la capa de predios con el CRS correcto, apliquen simbología **graduada** según `area_m2`, con **al menos 3 clases** (una escala de color/tono proporcional al área).

**4.2** Guarden el proyecto como `proyecto.qgz` en la misma carpeta de entrega.

---

## Antes de entregar

- [ ] `predios_<código_plano>.gpkg` — CRS correcto (el que ustedes determinaron), con dos capas: `predios` (columnas `area_m2` y `es_grande`) y el punto de control (columnas `predio_id` y `predio_area_m2`).
- [ ] `predios_<código_geo>.gpkg` — reproyectado de verdad a coordenadas geográficas.
- [ ] `predios.geojson` — exportado desde la capa de predios ya corregida, con las mismas columnas.
- [ ] `proyecto.qgz` — con simbología graduada aplicada sobre `area_m2`, mínimo 3 clases.
- [ ] Los cuatro archivos con esos nombres (reemplazando cada `<código...>` por el EPSG real que determinaron), en una sola carpeta.
