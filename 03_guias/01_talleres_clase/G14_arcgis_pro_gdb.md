# G14: Consolidación Corporativa en File Geodatabase (`.gdb`), Dominios de Atributos y Preparación al Hito 4

**Semestre 2027-1 · Módulo 5: SIG Corporativo y Bases de Datos Espaciales · Sesión S14 (Jueves 29 de abril de 2027)**  
*Horario:* 12:00 m. – 4:30 p.m. (Jornada continua: Sub-bloque 1 Consolidación .gdb + Sub-bloque 2 Hito 4 en Sala de Cómputo EAFIT)  
*Presupuesto Académico:* 4.5 h presenciales + 4.5 h de trabajo autónomo semanal (3 Créditos Académicos · 5 UMEs · 144 h semestrales)  
*Modalidad:* **100 % Individual** · *Metodología:* **Worked-Example Fading** (Estructura corporativa en ArcGIS Pro $\rightarrow$ Interoperabilidad con QGIS $\rightarrow$ Aplicación del Hito 4).

---

## 1. Estructura de la Sesión y Arquitectura de la Jornada S14

La sesión 14 articula la consolidación de bases de datos corporativas con la segunda evaluación práctica integradora del semestre:

| Bloque | Horario | Duración | Contenido y Enfoque Pedagógico |
|:---:|:---:|:---:|---|
| **Sub-bloque 1** | 12:00 m. – 1:50 p.m. | 110 min | **Consolidación Corporativa en File Geodatabase (`.gdb`):** Proyectos `.aprx`, creación de Feature Datasets con SRC oficial `EPSG:9377`, migración desde GeoPackage (`.gpkg`), reglas de integridad mediante Dominios Codificados (*Coded Value Domains*), Subtipos y consumo de servicios web institucionales ArcGIS REST (GeoMedellín y SIATA). |
| **Pausa Activa** | 1:50 p.m. – 2:10 p.m. | 20 min | **Pausa activa pedagógica:** Desconexión visual y preparación para la evaluación. |
| **Sub-bloque 2** | 2:10 p.m. – 4:30 p.m. | 140 min | **Aplicación del Hito 4 (20% del curso):** Evaluación Práctica Integradora 2 individual en PC de la Sala de Cómputo (Terreno DEM, Control GNSS por HDOP/RMSE e Índices Sentinel-2 NDVI/NDBI). |

---

## 2. Paralelismo Conceptual y Técnico: QGIS (`.gpkg`) vs. ArcGIS Pro (`.gdb`)

Tanto QGIS como ArcGIS Pro implementan los estándares del *Open Geospatial Consortium (OGC)*, pero emplean modelos de almacenamiento con filosofías distintas que todo profesional en ingeniería y planeación debe interoperar:

| Componente / Función | Ecosistema Abierto: **QGIS LTR** | Ecosistema Corporativo: **ArcGIS Pro** |
|---|---|---|
| **Archivo de proyecto cartográfico** | `.qgz` (XML comprimido con rutas y estilos) | `.aprx` (*ArcGIS Project File*, proyectos con múltiples mapas 2D/3D y layouts) |
| **Base de datos espacial nativa** | **GeoPackage (`.gpkg`)**: archivo SQLite monousuario y abierto que alberga vectores, rásteres y tablas. | **File Geodatabase (`.gdb`)**: carpeta del sistema operativo con archivos binarios indexados (`.gdbtable`, `.gdbtablx`). |
| **Capa vectorial individual** | Tabla espacial / *Vector Layer* | **Feature Class** (Clase de entidad: puntos, líneas o polígonos) |
| **Agrupación con SRC forzado** | Grupos lógicos en el panel de capas | **Feature Dataset**: contenedor físico que **obliga** a todas sus *Feature Classes* a compartir exactamente el mismo SRC (`EPSG:9377`). |
| **Validación de atributos (Listas)** | Formulario de atributos $\rightarrow$ Mapa de valores | **Domains (*Coded Value Domains*)** a nivel de base de datos. |
| **Explorador de datos** | Panel **Navegador** (*Browser*) | Panel **Catálogo** (*Catalog Pane*) |

> [!WARNING]
> **Regla de integridad al manipular una File Geodatabase (`.gdb`):**  
> Una File Geodatabase se visualiza en Windows Explorer como una carpeta con extensión `.gdb` repleta de decenas de archivos binarios crípticos. **Jamás modifique, renombre, mueva ni elimine archivos individuales dentro de esa carpeta desde el explorador del sistema operativo**, pues corromperá la geodatabase completa. Toda administración se ejecuta desde el *Catalog Pane* de ArcGIS Pro o desde el *Navegador* de QGIS.

---

## 3. Sub-bloque 1: Práctica Guiada de Estructuración Corporativa

### 3.1 Creación del Proyecto `.aprx` e Inicialización de la `.gdb`
1. Abrir **ArcGIS Pro** e iniciar sesión con la cuenta institucional de EAFIT.
2. Crear un nuevo proyecto con la plantilla **Map**:
   - **Name:** `UXX_proyecto_corporativo`
   - **Location:** `C:\Temp\UXX_trabajo\`
   - Confirmar la casilla *Create a new folder for this project*.
3. Observar en el panel **Catalog → Databases** que ArcGIS Pro genera automáticamente `UXX_proyecto_corporativo.gdb`.

### 3.2 Creación de Feature Dataset en `EPSG:9377`
Un **Feature Dataset** asegura por diseño que ninguna entidad espacial ingrese con un sistema de coordenadas no homologado:
1. Clic derecho en `UXX_proyecto_corporativo.gdb` $\rightarrow$ **New → Feature Dataset**.
2. **Feature Dataset Name:** `Territorio_UXX_9377`.
3. **Coordinate System:** Filtrar por `9377` y seleccionar **MAGNA-SIRGAS / Origen-Nacional (`EPSG:9377`)**.
4. Clic en **Run**.

### 3.3 Migración de Capas desde GeoPackage hacia la Geodatabase
1. En el panel **Geoprocessing**, buscar la herramienta **`Feature Class to Geodatabase`** (*Conversion Tools*).
2. **Input Features:** Seleccionar las capas de su GeoPackage `UXX_proyecto.gpkg` (`limite_cuenca`, `red_hidrica`, `poligono_focal`, `laderas_criticas`).
3. **Output Geodatabase:** Seleccionar el Feature Dataset `Territorio_UXX_9377`.
4. Clic en **Run**. Las capas se migran automáticamente conservando geometrías y tablas de atributos.

### 3.4 Configuración de Dominios Codificados de Atributos (*Coded Value Domains*)
Los dominios previenen errores de digitación en campo y gabinete:
1. Clic derecho sobre `UXX_proyecto_corporativo.gdb` $\rightarrow$ **Domains**.
2. En la ventana de configuración:
   - **Domain Name:** `dom_tipo_intervencion`
   - **Description:** `Tipología de intervención priorizada según ruta disciplinar`
   - **Field Type:** `Text` | **Domain Type:** `Coded Value Domain`
3. En la tabla de valores codificados (*Coded Values*):
   - `DRENAJE` $\rightarrow$ `Canalización / Azud / Obra de drenaje transversal (Civil)`
   - `TALUD` $\rightarrow$ `Bioingeniería y estabilización geotécnica (Civil)`
   - `PARQUE` $\rightarrow$ `Parque lineal y espacio público ribereño (Diseño Urbano)`
   - `REUBICACION` $\rightarrow$ `Reasentamiento de vivienda en alto riesgo (Diseño Urbano)`
4. Clic en **Save**.
5. Asignar este dominio al campo `tipo_intervencion` en la vista de campos (*Fields View*) de la capa correspondiente.

### 3.5 Conexión a Geoservicios ArcGIS REST (GeoMedellín y SIATA)
1. En el **Catalog Pane**, clic derecho en **Servers → New ArcGIS Server Connection**.
2. Ingresar la URL institucional:
   ```text
   https://geomedellin.medellin.gov.co/server/rest/services
   ```
3. Expandir la conexión y explorar las carpetas de servicios en vivo (*Catastro*, *Ortofotos*, *POT_Acuerdo48*), comprobando su carga directa al mapa sin ocupar almacenamiento local.

---

## 4. Sub-bloque 2: Aplicación del Hito 4 (20% del Curso)

A las 2:10 p.m., tras la pausa activa, se da inicio a la **Evaluación Práctica Integradora 2 (Hito 4)**.

### 4.1 Alcance y Condiciones de la Evaluación
- **Duración:** 140 minutos (en la Sala de Cómputo EAFIT).
- **Ponderación:** 20.0% de la calificación definitiva del semestre.
- **Nivel de IA permitido:** **Nivel P (Prohibido)** — Evaluación individual presencial en PC sin asistentes generativos externos.
- **Temáticas Evaluadas (Semanas S10 a S13):**
  1. *Relieve y DEM (RAA3):* Reproyección a `EPSG:9377`, máscara de cuenca, derivación de pendientes en grados, sombreado (*Hillshade*) y reclasificación POT.
  2. *Control GNSS en Gabinete (RAA3):* Depuración de traza GPX/CSV con filtro de dilución de precisión (`"hdop" <= 2.0`), identificación de rebotes *multipath* y cálculo cuantitativo de $RMSE$ horizontal frente a coordenadas de referencia.
  3. *Teledetección Satelital Sentinel-2 (RAA3):* Adquisición de bandas `18NVL`, cálculo de `NDVI` y `NDBI` mediante álgebra ráster, umbralización individualizada con parámetro $D$ ($U_{\text{NDVI}} = 0.20 + 0.01 \times D$) y poligonización limpia (`DN = 1`) para cuantificación de hectáreas de presión urbana.
- **Entregable:** Paquete individual comprimido `H4_Codigo_Apellido_Nombre.zip` radicado en la plataforma oficial antes de las 4:30 p.m.

### 4.2 Ruta de Mejora Continua (Semana 15)
De acuerdo con el modelo pedagógico del curso:
- Aquellos estudiantes que identifiquen oportunidades de optimización en su entrega del Hito 4 dispondrán de la **Ventana de Mejora Continua en S15 (06 de mayo)**.
- La corrección, depuración y encapsulamiento verificado en ModelBuilder (`.atbx`) / Diseñador Gráfico (`.model3`) durante la sesión S15 permite **recuperar hasta el 40% de los puntos deducidos** en el Hito 4.

---

## 5. Checklist de Finalización de Clase (S14)

- [ ] Estructuré la File Geodatabase individual con Feature Dataset en `EPSG:9377`.
- [ ] Configuré dominios codificados de atributos y los asocié a campos de intervención territorial.
- [ ] Verifiqué la conexión a servicios institucionales ArcGIS REST.
- [ ] Desarrollé y radiqué la Evaluación Práctica Integradora 2 (**Hito 4 · 20%**).
- [ ] Guardé una copia de respaldo en mi memoria USB para la sesión de automatización y mejora continua en S15.
