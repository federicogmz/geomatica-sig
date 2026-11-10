# G14: Presentación de ArcGIS Pro — Proyectos (`.aprx`), File Geodatabases (`.gdb`), Dominios y Servicios REST

**Sesión del Jueves 29 de octubre (Semana 15) · Parte A: Ecosistema SIG Corporativo y Equivalencia con QGIS.**  
En la primera parte de esta sesión conoceremos la arquitectura de **ArcGIS Pro**, el estándar corporativo de ESRI ampliamente utilizado en alcaldías, empresas de servicios públicos y firmas de consultoría de ingeniería. Exploraremos la estructura de proyectos (`.aprx`), las **File Geodatabases (`.gdb`)**, los **Feature Datasets** en **EPSG:9377**, las reglas de integridad mediante **Dominios de Atributos** y la conexión a servidores **ArcGIS REST** (GeoMedellín / SIATA), destacando en todo momento su paralelismo directo con el ecosistema **GeoPackage (`.gpkg`) en QGIS**.

> [!NOTE]
> **Ecosistema del Informe Final (`IF` del 05 de noviembre):**  
> Esta sesión presenta el ecosistema corporativo de ArcGIS Pro (`.aprx` + `.gdb`) en contraste directo con **QGIS (`.qgz` + `.gpkg`)**, que es la plataforma oficial en la que se entregan el **Parcial 2 (`P2`)** y el **Informe Final (`IF`)**.

---

## 1. Paralelismo Conceptual y Técnico: QGIS (`.gpkg`) vs. ArcGIS Pro (`.gdb`)

Tanto QGIS como ArcGIS Pro implementan los estándares internacionales del *Open Geospatial Consortium (OGC)*, pero emplean contenedores nativos con filosofías distintas que todo profesional en geomática debe saber interoperar:

| Componente / Función | Ecosistema Abierto: **QGIS LTR** | Ecosistema Corporativo: **ArcGIS Pro** |
|---|---|---|
| **Archivo de proyecto cartográfico** | `.qgz` (XML comprimido con rutas y estilos) | `.aprx` (*ArcGIS Project File*, soporta múltiples mapas 2D/3D y layouts) |
| **Base de datos espacial nativa** | **GeoPackage (`.gpkg`)**: un **único archivo SQLite** portátil y abierto que almacena vectores, rásteres y tablas. | **File Geodatabase (`.gdb`)**: una **carpeta del sistema operativo** con archivos binarios indexados (`.gdbtable`, `.gdbtablx`). |
| **Capa vectorial individual** | Tabla espacial / *Vector Layer* | **Feature Class** (Clase de entidad: puntos, líneas o polígonos) |
| **Agrupación con SRC forzado** | Grupos lógicos en el panel de capas (el SRC se controla por capa) | **Feature Dataset**: contenedor físico dentro de la `.gdb` que **obliga** a todas sus *Feature Classes* a compartir exactamente el mismo SRC (`EPSG:9377`). |
| **Validación de atributos (Listas)** | *Formulario de atributos → Mapa de valores / Relación de valor* | **Domains (*Coded Value Domains* / *Range Domains*)** almacenados a nivel de la Geodatabase. |
| **Explorador de datos y servicios** | Panel **Navegador** (*Browser*) | Panel **Catálogo** (*Catalog Pane*) |

> [!WARNING]
> **Regla de oro al manipular una File Geodatabase (`.gdb`):**  
> Aunque en el Explorador de Windows o Finder una carpeta `proyecto_iguana.gdb` se ve como un directorio común lleno de cientos de archivos crípticos, **jamás deben renombrar, borrar ni mover archivos individuales desde el explorador del sistema operativo**, pues corromperán la base de datos completa. Toda gestión se realiza desde el *Catalog Pane* de ArcGIS Pro (o el panel *Navegador* de QGIS, que también lee `.gdb` de forma nativa).

---

## 2. Creación del Proyecto `.aprx` e Inicialización de la File Geodatabase

1. Inicien **ArcGIS Pro** en el computador del laboratorio con su cuenta institucional de EAFIT (o sigan la demostración guiada si trabajan en su portátil con QGIS).
2. En la pantalla de inicio, bajo *New Project*, elijan la plantilla **Map**:
   - **Name:** `proyecto_iguana_arcgis`
   - **Location:** Carpeta local de trabajo del curso.
   - Marquen **Create a new folder for this project** y pulsen **OK**.
3. Observen en el panel derecho (**Catalog Pane → Databases**) que ArcGIS Pro inicializa automáticamente la base de datos relacional `proyecto_iguana_arcgis.gdb` junto al archivo `proyecto_iguana_arcgis.aprx`.

---

## 3. Creación de un Feature Dataset en `EPSG:9377` y Migración desde GeoPackage

Un **Feature Dataset** garantiza por diseño que ninguna capa vectorial pueda almacenarse dentro de él con un sistema de coordenadas distinto al oficial del proyecto:

### 3.1 Crear el Feature Dataset con CRS Oficial
1. En el **Catalog Pane**, desplieguen **Databases**, hagan clic derecho sobre `proyecto_iguana_arcgis.gdb` → **New → Feature Dataset**.
2. Configuren los parámetros:
   - **Feature Dataset Name:** `Territorio_Iguana_9377`
   - **Coordinate System:** Busquen en la caja de filtro el código **`9377`** y seleccionen **MAGNA-SIRGAS / Origen-Nacional (`EPSG:9377`)**.
3. Hagan clic en **Run**.

### 3.2 Migrar Capas desde `proyecto_iguana.gpkg` hacia la `.gdb`
1. En la cinta superior **Analysis**, abran **Tools** (*Geoprocessing*) y busquen la herramienta **`Feature Class to Geodatabase`**.
2. Seleccionen en **Input Features** las capas vectoriales de su GeoPackage (`limite_cuenca`, `red_hidrica`, `manzanas_iguana` / `predios_iguana`).
3. En **Output Geodatabase**, elijan el Feature Dataset recién creado `proyecto_iguana_arcgis.gdb\Territorio_Iguana_9377`.
4. Pulsen **Run**. Al refrescar el catálogo, todas las entidades habrán quedado convertidas a *Feature Classes* nativos de ESRI y estrictamente ancladas a `EPSG:9377`.

---

## 4. Demostración de Dominios de Atributos (*Coded Value Domains*)

En proyectos de consultoría donde múltiples ingenieros editan la misma base de datos, los **Dominios** impiden errores de digitación (como escribir `"Alta"`, `"ALTA"`, `"alta "` o `"A"` en una misma columna):

1. Hagan clic derecho sobre `proyecto_iguana_arcgis.gdb` → **Domains**.
2. En la vista de dominios, creen una nueva regla:
   - **Domain Name:** `dom_prioridad_intervencion`
   - **Description:** `Nivel de prioridad de intervención hidrogeomorfológica`
   - **Field Type:** `Text` | **Domain Type:** `Coded Value Domain`
3. En la tabla lateral de **Coded Values**, definan los pares *Code* $\rightarrow$ *Description*:
   - `ALTA` $\rightarrow$ `Intervención prioritaria (Pendiente crítica y retiro invadido)`
   - `MEDIA` $\rightarrow$ `Mitigación biofísica y monitoreo periódico`
   - `BAJA` $\rightarrow$ `Conservación ambiental / Zona estable`
4. Hagan clic en **Save** en la cinta superior de *Domains*.
5. Al abrir la vista de campos (**Fields View**) de la capa de manzanas o predios y asignar `dom_prioridad_intervencion` en la columna **Domain** del campo `prioridad`, tanto ArcGIS Pro como los formularios móviles (*ArcGIS Field Maps*) desplegarán únicamente esa lista cerrada de opciones.
   - *(Paralelismo en QGIS: Propiedades de la capa → Formulario de atributos → seleccionar el campo → Tipo de control = **Mapa de valores**).*

---

## 5. Conexión a Servicios Web Institucionales ArcGIS REST (GeoMedellín y SIATA)

Las infraestructuras de datos espaciales de Medellín y el Área Metropolitana publican sus capas oficiales mediante servicios web **ArcGIS REST FeatureServer / MapServer**, que pueden consumirse en vivo sin descargar archivos a disco:

### 5.1 En ArcGIS Pro:
1. En el **Catalog Pane**, clic derecho sobre **Servers → New ArcGIS Server Connection**.
2. Ingresen la URL del servidor institucional de GeoMedellín:
   ```text
   https://geomedellin.medellin.gov.co/server/rest/services
   ```
3. Pulsen **OK** y desplieguen el servidor en **Servers**: podrán arrastrar directamente al mapa las capas de *Ortofotos*, *Catastro*, *Red Hídrica* o *Zonificación de Amenaza del POT*.

### 5.2 Equivalencia directa en QGIS:
1. En el panel **Navegador** de QGIS, hagan clic derecho sobre **ArcGIS REST Servers → Conexión nueva...**
2. Asignénele el nombre `GeoMedellin REST` y peguen la misma URL (`https://geomedellin.medellin.gov.co/server/rest/services`).
3. Al expandir la conexión en QGIS, podrán cargar exactamente los mismos servicios vectoriales y ortofotos oficiales en su lienzo de trabajo.

---

## Checklist de Cierre de la Parte A (G14)

- [ ] Se comprendió la equivalencia arquitectónica entre **QGIS (`.qgz` + `.gpkg`)** y **ArcGIS Pro (`.aprx` + `.gdb`)**.
- [ ] Se estructuró un **Feature Dataset** en `EPSG:9377` y se verificó la interoperabilidad entre GeoPackage y File Geodatabase.
- [ ] Se demostró la creación de **Dominios de valores codificados** para blindar la calidad temática de las tablas de atributos.
- [ ] Se conectó el servicio institucional **ArcGIS REST** de GeoMedellín.
