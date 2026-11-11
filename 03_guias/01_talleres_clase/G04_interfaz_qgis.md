# G04: Arquitectura de proyectos espaciales, GeoPackage (.gpkg), File Geodatabase (.gdb) y Geoservicios OGC / REST

> **Semestre / Ciclo:** 2027-1  
> **Semana / Fecha:** Semana 4 (`S04`) · Jueves 11 de febrero de 2027  
> **Horario oficial:** 12:00 m. – 4:30 p.m. (4.5 h presenciales en Sala de Cómputo EAFIT)  
> **Modalidad:** 100 % Individual  
> **Software en Sala:** QGIS LTR + ArcGIS Pro (Licencia institucional Advanced)  
> **Cuenca Escuela de Demostración:** Cuenca de la Quebrada La Iguaná (Medellín)  
> **Área de Aplicación Individual:** Unidad Territorial Única (`U01` a `U30`)  

---

## 1. Presupuesto de Tiempo Semanal (Dedicación Total: hasta 9.0 h)

| Bloque de Actividad | Franja Horaria / Duración | Entorno y Enfoque Pedagógico |
|---|:---:|---|
| **Sub-bloque 1: Fundamento y QGIS LTR** | `12:00 m. – 1:50 p.m.` (110 min) | Sala de Cómputo: Arquitectura de proyectos `.qgz`, contenedor abierto **GeoPackage (`.gpkg`)**, rutas relativas, geoservicios WMS/WFS y carga de tablas CSV sobre La Iguaná. |
| **Pausa Activa Pedagógica** | `1:50 p.m. – 2:10 p.m.` (20 min) | Descanso cognitivo y almuerzo ligero integrado. |
| **Sub-bloque 2: Espejo ArcGIS Pro y Unidad** | `2:10 p.m. – 4:25 p.m.` (135 min) | Sala de Cómputo: **File Geodatabase (`.gdb`)**, **Feature Datasets (`EPSG:9377`)**, **Dominios Codificados**, **Subtipos** y servicios ArcGIS REST para la unidad `U01`–`U30`. |
| **Protocolo de Cierre en Sala** | `4:25 p.m. – 4:30 p.m.` (5 min) | Empaquetado `C:\Temp\SIG_Usuario\ -> .zip`, copia a USB/Drive institucional y purga local. |
| **Trabajo Autónomo Independiente** | $\le 4.5\text{ h}$ semanales | PC Personal / Casa: Consolidación de tablas y estructuración de la Geodatabase de su unidad territorial. |

---

## 2. Superación del Formato Shapefile Histórico

En este curso **no creamos Shapefiles sueltos (`.shp`)**. El formato Shapefile (creado en la década de 1990) presenta limitaciones que invalidan la práctica profesional moderna:
1. **Truncamiento de campos:** Los nombres de atributos no pueden superar 10 caracteres (`nombre_predio` se corta a `nombre_pr~1`).
2. **Fragmentación de archivos:** Cada capa requiere entre 3 y 8 archivos independientes (`.shp`, `.shx`, `.dbf`, `.prj`, `.cpg`, etc.). La pérdida de uno solo corrompe toda la capa.
3. **Límite de tamaño:** Máximo 2 GB por archivo.
4. **Ausencia de nulos reales:** Almacena ceros (`0`) en lugar de valores vacíos (`NULL`).
5. **Cero topología interna:** No admite dominios de atributos ni reglas topológicas nativas.

Adoptamos los dos contenedores espaciales contemporáneos:
- **GeoPackage (`.gpkg`):** Estándar abierto OGC basado en SQLite, embebido en un único archivo que almacena vectores, rásteres y tablas con soporte nativo para `EPSG:9377`.
- **File Geodatabase (`.gdb`):** Estándar corporativo de ESRI para ArcGIS Pro que permite encapsular conjuntos de datos (*Feature Datasets*), topología, subtipos y dominios codificados.

---

## 3. Secuencia Didáctica: Worked-Example Fading

```
[Etapa 1: Ejemplo Resuelto] ──> [Etapa 2: Completación] ──> [Etapa 3: Caso Roto] ──> [Etapa 4: Transferencia U01-U30]
 (.qgz, .gpkg y Rutas Relativas) (CSV Hitos La Iguaná)      (Rutas Rotas y Capas Memory) (File GDB, Dominios y REST)
```

### Etapa 1: Ejemplo Trabajado con "Por Qué" (12:00 m. – 12:50 p.m.)

#### Demostración del Profesor sobre La Iguaná en QGIS LTR:

1. **Configuración del Proyecto:**
   - Inicien QGIS LTR.
   - Vayan a **Proyecto $\rightarrow$ Propiedades... $\rightarrow$ pestaña SRC**.
   - Filtren y asignen: `EPSG:9377 - MAGNA-SIRGAS 2018 / Origen-Nacional`.
   - Vayan a la pestaña **General** y en la casilla **Guardar rutas**, seleccionen obligatoriamente:
     ```text
     Relativas
     ```
   - *Por qué:* Una ruta relativa (`./02_datos_vectoriales/capa.gpkg`) enlaza los datos a partir de la ubicación de la carpeta del proyecto. Una ruta absoluta (`C:\Users\estudiante\Desktop\...`) se rompe tan pronto se abre el proyecto en otro equipo o en la estación de evaluación del docente.

2. **Creación del GeoPackage Oficial:**
   - Menú **Capa $\rightarrow$ Crear capa $\rightarrow$ Nueva capa GeoPackage...**
   - Base de datos: Clic en `...`, naveguen a `C:\Temp\SIG_Usuario\02_datos_vectoriales\` y nombren el archivo:
     ```text
     cuenca_escuela_iguana.gpkg
     ```
   - Nombre de la tabla: `hitos_monitoreo`.
   - Tipo de geometría: **Punto**.
   - SRC de la geometría: **EPSG:9377**.
   - Nuevo campo de atributo:
     - Nombre: `nombre_estacion` (Tipo: Cadena de texto).
     - Nombre: `cota_msnm` (Tipo: Número real / decimal).
   - Hagan clic en *Aceptar*. En el Panel de Navegador tendrán su base espacial abierta lista.

3. **Conexión a Geoservicios WMS Oficiales:**
   - En el **Panel de Navegador**, ubiquen la entrada **WMS/WMTS**.
   - Clic derecho $\rightarrow$ **Nueva conexión...**
   - Parámetros:
     - **Nombre:** `GeoMedellin Ortofoto`
     - **URL:** `https://geomedellin.medellin.gov.co/server/services/Ortofoto/MapServer/WMSServer`
   - Clic en *Aceptar*, desplieguen la conexión y arrastren la capa de ortofoto al panel de capas.

> [!NOTE]
> **Prompt de Auto-Explicación Obligatorio 1:**
> *¿Por qué un servicio WMS no permite editar geometrías ni calcular el área de un polígono, y qué tipo de servicio OGC se requeriría para descargar las entidades con su tabla de atributos completa?*

---

### Etapa 2: Ejemplo de Completación — Fading del Último Paso (12:50 p.m. – 1:20 p.m.)

Se suministra el archivo plano de coordenadas de monitoreo de la Cuenca Escuela `hitos_iguana.csv` ubicado en su carpeta de documentos con la siguiente estructura:

```csv
id,nombre_hito,lon,lat,tipo_monitoreo
1,Boqueron_Nacimiento,-75.654000,6.333500,Pluviometrico
2,Azud_Cra80,-75.602100,6.269800,Disipador_Energia
3,Presa_Cra70,-75.589000,6.262500,Laminacion_Crecientes
4,Desembocadura_RioMedellin,-75.571000,6.257000,Confluencia
```

#### Pasos dados en QGIS LTR:
1. Menú **Capa $\rightarrow$ Añadir capa $\rightarrow$ Añadir capa de texto delimitado...**
2. Se selecciona el archivo CSV.
3. En *Definición de geometría*, se marcan Coordenadas de punto: Campo X = `lon`, Campo Y = `lat`.
4. En *SRC de la geometría*, se asigna `EPSG:4326 - WGS 84` (porque los datos del CSV están en grados decimales, no en metros).

#### Paso a completar por el estudiante:
1. Hagan clic en **Añadir**. Los 4 puntos aparecerán sobre la ortofoto de La Iguaná.
2. Exporten esta capa temporal e intégrenla directamente dentro de su contenedor `cuenca_escuela_iguana.gpkg`:
   - Clic derecho sobre la capa CSV en el panel de capas $\rightarrow$ **Exportar $\rightarrow$ Guardar objetos como...**
   - Formato: **GeoPackage**.
   - Nombre de archivo: `C:\Temp\SIG_Usuario\02_datos_vectoriales\cuenca_escuela_iguana.gpkg`.
   - Nombre de la capa: `estaciones_ctm12`.
   - **SRC:** `EPSG:9377 - MAGNA-SIRGAS 2018 / Origen-Nacional` *(QGIS reproyectará automáticamente los puntos de grados a metros durante la exportación).*
3. Pasen el cursor sobre el punto 3 (Presa Cra 70) y anoten las coordenadas métricas CTM12 reportadas en la barra de estado:
   - Este ($X$): `___________ m`
   - Norte ($Y$): `___________ m`

---

### Etapa 3: Diagnóstico y Reparación de Caso Roto de Consultoría (1:20 p.m. – 1:50 p.m.)

#### El Caso Roto:
Un consultor entregó un archivo de proyecto `diagnostico_urbano.qgz` a una entidad municipal. Al abrir el archivo en la estación de trabajo de la interventoría, aparecen los siguientes fallos críticos:
1. Se abre una ventana de alerta roja: **"Capas no disponibles: 4 capas no pudieron ser localizadas"**. La ruta que busca el programa es `D:\Mis_Documentos\Trabajos_2026\SIG\capa_vias.shp`.
2. Tres capas analíticas de retiros hídricos y pendientes que el consultor aseguró haber modelado no existen en el disco, pues fueron generadas con el ícono de "disco volador/memoria" (**Capa borrador temporal / `memory:`**) y se borraron automáticamente al cerrar QGIS.
3. El proyecto abre con una penalización técnica de **−0.5 directo** según las normas del curso y el contrato de consultoría.

```
+-----------------------------------------------------------------------------------+
| PATOLOGÍAS CRÍTICAS DEL PROYECTO ROTO:                                            |
| 1. Rutas absolutas fijadas a la unidad 'D:\' de la máquina personal del autor.   |
| 2. Capas 'memory:Scratch' descartadas de la memoria RAM tras salir del software.  |
| 3. Fragmentación de archivos Shapefile dispersos fuera de un contenedor (.gpkg).  |
+-----------------------------------------------------------------------------------+
```

#### Andamiaje de Análisis del Error (Responde en tu libreta técnica):
1. **Detectar:** ¿Qué síntomas visuales delatan una capa no disponible y una capa volátil en memoria en QGIS?
2. **Explicar:** ¿Cómo interpreta el sistema operativo las rutas absolutas frente a las relativas y por qué las capas temporales en RAM no se preservan en el archivo `.qgz`?
3. **Corregir:** Explica el procedimiento técnico exacto para:
   - Reparar las rutas rotas mediante el diálogo *Manejar capas no encontradas* (*Change Data Source*).
   - Convertir una capa volátil de memoria en una capa física persistente mediante *Hacer permanente...* integrándola en el GeoPackage del proyecto.

---

*(1:50 p.m. – 2:10 p.m. · Pausa Activa Pedagógica / Almuerzo Ligero)*

---

### Etapa 4: Espejo Corporativo en ArcGIS Pro y Transferencia a su Unidad Territorial (2:10 p.m. – 4:25 p.m.)

En este bloque estructuramos la base de datos espacial corporativa en **ArcGIS Pro** para tu Unidad Territorial.

#### A. Creación de File Geodatabase (`.gdb`) y Feature Dataset:
1. En ArcGIS Pro, abran el panel **Catalog** (`View $\rightarrow$ Catalog Pane`).
2. Desplieguen la carpeta de su proyecto en `C:\Temp\SIG_Usuario\02_datos_vectoriales\`.
3. Clic derecho sobre la carpeta $\rightarrow$ **New $\rightarrow$ File Geodatabase**:
   ```text
   unidad_territorial_Uxx.gdb
   ```
4. Clic derecho sobre la `.gdb` creada $\rightarrow$ **New $\rightarrow$ Feature Dataset**:
   - Nombre: `modelo_espacial_9377`.
   - Sistema de coordenadas (*Coordinate System*): Busquen el código `9377` y seleccionen **MAGNA-SIRGAS 2018 / Origen-Nacional**.
   - *Por qué:* El Feature Dataset impone una referencia espacial uniforme: todas las clases de entidad que residan en él compartirán obligatoriamente el mismo sistema de coordenadas, habilitando la futura topología.

#### B. Configuración de Dominios Codificados (Coded Value Domains):
Los dominios previenen errores de digitación al restringir los atributos a un catálogo cerrado:
1. Clic derecho sobre `unidad_territorial_Uxx.gdb` $\rightarrow$ **Domains**.
2. Creen un dominio llamado `dom_estado_conservacion`:
   - *Field Type:* **Short Integer**.
   - *Domain Type:* **Coded Values**.
   - Códigos y valores:
     - `1`: Excelente (Cobertura boscosa continua)
     - `2`: Moderado (Vegetación dispersa o rastrojo)
     - `3`: Degradado (Erosión activa o invasión antrópica)
     - `4`: Canalizado / Estructura artificial
3. Guarden los cambios en la barra de dominios (*Save*).

#### C. Configuración de Subtipos (Subtypes):
1. Clic derecho sobre el Feature Dataset $\rightarrow$ **New $\rightarrow$ Feature Class**:
   - Nombre: `red_drenaje`.
   - Tipo de geometría: **Line**.
2. En la estructura de campos, añadan el campo `tipo_drenaje` de tipo **Short Integer**.
3. Hagan clic derecho sobre la clase `red_drenaje` $\rightarrow$ **Design $\rightarrow$ Subtypes**:
   - *Subtype Field:* `tipo_drenaje`.
   - Subtipos:
     - `1`: Cauce Principal
     - `2`: Afluente Natural Permanente
     - `3`: Drenaje Torrencial Estacional
     - `4`: Canal de Drenaje Artificial
4. Para cada subtipo, asocien el dominio `dom_estado_conservacion` al campo correspondiente.

#### D. Conexión a Servicios ArcGIS REST Oficiales:
1. En el panel Catalog, hagan clic derecho sobre **Servers $\rightarrow$ New ArcGIS Server Connection**:
   - URL del servidor:
     ```text
     https://geomedellin.medellin.gov.co/server/rest/services
     ```
2. Desplieguen la conexión creada: explorarán carpetas temáticas como *IDE*, *MedioAmbiente* y *Movilidad*.
3. Arrastren la capa de drenajes o curvas de nivel sobre su unidad territorial `U01`–`U30` y compárenla con su base local.

---

## 4. Protocolo Obligatorio de Cierre en Sala (4:25 p.m. – 4:30 p.m. · 5 min)

1. Guarden el proyecto de ArcGIS Pro (`.aprx`) y el proyecto QGIS (`.qgz`).
2. Verifiquen que no queden capas en memoria (`memory:`) sin consolidar.
3. En el Explorador de Windows, diríjanse a `C:\Temp\`.
4. Compriman la carpeta de trabajo:
   ```text
   SIG_Uxx_Apellido_Nombre_S04.zip
   ```
5. Cópienlo a su memoria USB y a la nube de OneDrive EAFIT.
6. Eliminen la carpeta local `C:\Temp\SIG_Usuario\` antes de retirarse.

---

## 5. Checklist de Verificación y Entrega

- [ ] Creé mi contenedor GeoPackage (`cuenca_escuela_iguana.gpkg`) en `EPSG:9377`.
- [ ] Configuré las rutas del proyecto QGIS en modo **Relativas**.
- [ ] Conecté el WMS de ortofoto oficial y cargué el CSV de hitos de monitoreo.
- [ ] Resolví las 3 preguntas del Caso Roto de rutas rotas y capas temporales.
- [ ] Creé la File Geodatabase (`.gdb`) y el Feature Dataset en `EPSG:9377` en ArcGIS Pro.
- [ ] Parametricé Dominios Codificados y Subtipos para el control de captura de atributos.
- [ ] Conecté el servidor ArcGIS REST de GeoMedellín.
- [ ] Ejecuté el cierre seguro de 5 minutos en `C:\Temp`.
