# G04: Primeros pasos en QGIS (interfaz, CRS, GeoPackage y Geoservicios WMS)

**Módulo 1 · Semana 4.** Primera de las "tres clases" en las que cualquier duda procedimental se resuelve de manera guiada y personalizada (ver Pacto Pedagógico). Vayan siguiendo esta guía en el PC del laboratorio y tomen capturas de pantalla para consolidar su guía personal de trabajo.

---

## 1. Anatomía de la Ventana de QGIS

Al iniciar QGIS (versión LTR) reconocerán los siguientes componentes principales:

- **Barra de menú superior:** Acceso a todas las funciones analíticas (*Proyecto, Editar, Ver, Capa, Configuración, Procesos*).
- **Barras de herramientas:** Íconos de acceso rápido para zoom, selección, digitalización y atributos (personalizables desde *Ver → Barras de herramientas*).
- **Panel de Navegador (Browser):** Explorador de archivos locales, unidades externas y **conexiones a geoservicios en la nube (WMS/WMTS, WFS, ArcGIS REST)**.
- **Panel de Capas (Layers):** Lista jerárquica de datos cargados. El orden define el dibujo: las capas superiores tapan a las inferiores.
- **Lienzo del Mapa (Canvas):** Área gráfica central de visualización y edición cartográfica.
- **Barra de Estado (inferior):** Muestra las coordenadas del cursor, la escala visual de visualización, el nivel de aumento y el **código EPSG del CRS del proyecto** (esquina inferior derecha).

---

## 2. Configuración Geodésica del Proyecto (EPSG:9377)

Antes de incorporar cualquier capa, es mandatorio fijar el Sistema de Referencia de Coordenadas (CRS) del proyecto en el sistema oficial de Colombia:

1. Vayan a **Proyecto → Propiedades... → pestaña SRC**.
2. En la barra de filtro escriban `9377`.
3. Seleccionen **MAGNA-SIRGAS 2018 / Origen-Nacional (EPSG:9377)**.
4. Hagan clic en *Aplicar* y *Aceptar*.
5. Verifiquen en la esquina inferior derecha de la barra de estado que aparezca `EPSG:9377`.

---

## 3. Creación del Contenedor Oficial: GeoPackage (`.gpkg`)

En este curso **no crearemos Shapefiles sueltos** para evitar la pérdida de archivos auxiliares (`.prj`, `.dbf`) y la limitación de nombres de columnas a 10 caracteres. Utilizaremos el estándar abierto **GeoPackage**:

1. Vayan al menú **Capa → Crear capa → Nueva capa GeoPackage...**
2. En *Base de datos*, hagan clic en el botón `...`, naveguen a su memoria USB o carpeta de trabajo y nombren el archivo: `proyecto_iguana.gpkg`.
3. En *Nombre de la tabla*, escriban `hitos_iguana`.
4. En *Tipo de geometría*, elijan **Punto**.
5. En *SRC*, confirmen que esté asignado `EPSG:9377 - MAGNA-SIRGAS / Origen-Nacional`.
6. Clic en *Aceptar*. En el Panel de Navegador tendrán ahora su base de datos espacial lista para almacenar todas las capas del semestre.

---

## 4. Conexión a Geoservicios WMS / WMTS (Ortofoto Oficial)

Los geoservicios permiten visualizar cartografía oficial en tiempo real sin saturar el disco duro con descargas pesadas:

1. En el **Panel de Navegador**, ubiquen la entrada **WMS/WMTS**.
2. Hagan clic derecho sobre ella → **Nueva conexión...**
3. Configuren los siguientes parámetros para la ortofoto del Distrito de Medellín:
   - **Nombre:** `GeoMedellin Ortofoto`
   - **URL:** `https://geomedellin.medellin.gov.co/server/services/Ortofoto/MapServer/WMSServer`
4. Hagan clic en *Aceptar*.
5. Desplieguen la conexión en el Navegador y arrastren la capa de ortofoto al Panel de Capas.
6. Noten cómo pueden hacer zoom sobre la Cuenca de La Iguaná observando las laderas de San Cristóbal y el tejido urbano de Robledo en alta resolución.

---

## 5. Carga de CSV y Ruta de Mejora Activa (Recuperación Quiz 1)

En el Taller G02 (Semana 3) calcularon a mano las coordenadas CTM12 del nacimiento y la desembocadura de La Iguaná con una fórmula aproximada. Ahora contrastarán ese valor con la geodésica exacta de QGIS:

1. Creen un archivo de texto con Bloc de notas o Excel guardado como `coordenadas_iguana.csv` con la siguiente estructura:
   ```csv
   hito,lon,lat
   Boqueron_Nacimiento,-75.6540,6.3335
   Presa_Cra70,-75.5890,6.2625
   Desembocadura_RioMedellin,-75.5710,6.2570
   ```
2. En QGIS, vayan a **Capa → Añadir capa → Añadir capa de texto delimitado...**
3. Seleccionen el archivo CSV.
4. En *Definición de geometría*, marquen **Coordenadas de punto**:
   - Campo X: `lon`
   - Campo Y: `lat`
5. En *SRC de la geometría*, seleccionen **EPSG:4326 - WGS 84** (porque los datos del CSV están en grados decimales, no en metros).
6. Clic en *Añadir*. Los puntos aparecerán sobre la ortofoto en la cuenca.
7. Pasen el cursor sobre cada punto y lean en la **Barra de Estado** sus coordenadas proyectadas en metros (EPSG:9377).

> **Entrega de Recuperación Activa Q1:** En una hoja o nota de Teams, contrasten:
> $$\text{Error en metros} = \sqrt{(X_{\text{QGIS}} - X_{\text{Manual}})^2 + (Y_{\text{QGIS}} - Y_{\text{Manual}})^2}$$
> Expliquen por qué la aproximación esférica manual difiere del elipsoide de QGIS. Entregar esta verificación recupera hasta el 50% de la nota de Q1.

---

## 6. Guardado del Proyecto con Rutas Relativas (Regla Anti-Error)

Para evitar la penalización de **−0.5** por capas no disponibles al abrir el proyecto en otro equipo:

1. Vayan a **Proyecto → Propiedades... → pestaña General**.
2. En la casilla **Guardar rutas**, seleccionen obligatoriamente **Relativas** (nunca *Absolutas*).
3. Vayan a **Proyecto → Guardar como...** y guarden su archivo `proyecto_iguana.qgz` en la misma carpeta raíz de su USB donde crearon `proyecto_iguana.gpkg` y guardaron su CSV.

---

## Checklist de Finalización de Clase

- [ ] El CRS del proyecto está verificado en `EPSG:9377`.
- [ ] Crearon el contenedor `proyecto_iguana.gpkg`.
- [ ] Conectaron exitosamente el geoservicio WMS de GeoMedellín / AMVA.
- [ ] Cargaron el CSV con los hitos de La Iguaná y leyeron sus coordenadas CTM12.
- [ ] Guardaron el proyecto `.qgz` con **rutas relativas activadas**.
