# Hito 1: Taller Evaluativo en Sala — Geodesia EPSG:9377 y Bases Espaciales (.gpkg / .gdb)

> **Curso:** Geomática, Ingeniería y SIG (`GEOMATICA-SIG-EAFIT`)  
> **Semestre:** 2027-1 · Universidad EAFIT  
> **Semana de Aplicación:** Semana 5 (`S05`) · Jueves 18 de febrero de 2027  
> **Horario:** 12:00 m. – 1:50 p.m. (110 minutos en sala de cómputo)  
> **Ponderación:** 20.0 % de la calificación definitiva del curso  
> **Modalidad:** Individual en PC (Sala de Cómputo EAFIT)  
> **Política de Inteligencia Artificial:** **`Tier P` (Prohibido / Supervisado en Sala)**  
> **Resultados de Aprendizaje Evaluados:** `RAA1` (Relacional), `RAA2` (Relacional)  
> **Contenidos Integrados:** Semanas `S01` a `S04` (Guías `G01`, `G02`, `G03`, `G04`)

---

## 1. Propósito y Sentido Formativo (TILT - Purpose)

El profesional en Ingeniería Civil o Diseño Urbano debe garantizar la fidelidad métrica y la interoperabilidad de la información territorial antes de cualquier cálculo hidráulico, diseño vial o plan de ordenamiento. La adopción obligatoria en Colombia del sistema **MAGNA-SIRGAS Origen Nacional CTM12 (`EPSG:9377`, Res. IGAC 471 de 2020)** superó los cinco orígenes tradicionales de Gauss-Krüger. 

Este taller evalúa la capacidad del estudiante para:
1. Diagnosticar anomalías geodésicas en coberturas espaciales del Valle de Aburrá.
2. Discernir y ejecutar con precisión la **asignación de referencia espacial** frente a la **reproyección geodésica**.
3. Construir estructuras de almacenamiento geoespacial normalizadas tanto en el ecosistema abierto (**GeoPackage `.gpkg`** en QGIS LTR) como en el ecosistema corporativo (**File Geodatabase `.gdb`** con Feature Datasets y Dominios Codificados en ArcGIS Pro).

---

## 2. Condiciones de Partida y Entorno Técnico (TILT - Task)

### 2.1 Datos de Entrada
El docente suministrará al inicio de la sesión un paquete comprimido (`insumos_hito1.zip`) que los estudiantes deberán extraer en la carpeta local `C:\Temp\H1_Nombre_Apellido\` (o en su directorio personal asignado en la sala):
- `cobertura_origen_bogota.shp`: Capa vectorial con coordenadas en el antiguo sistema Magna Medellín / Bogotá Oeste sin archivo `.prj`.
- `estaciones_red_geodesica.csv`: Tabla con coordenadas geográficas en grados decimales (`EPSG:4326`) y elipsoidales.
- `cartografia_base_incompleta.gpkg`: Base de datos espacial abierta con tablas atributivas no tipificadas.
- `limite_unidad_territorial.geojson`: Polígono de referencia en coordenadas proyectadas oficiales.

### 2.2 Política de IA Generativa: `Tier P` (Prohibido / Supervisado)
Esta evaluación se desarrolla bajo estricta supervisión en el aula:
- Queda prohibido el uso de herramientas de IA generativa (ChatGPT, Claude, Gemini, Copilot, etc.), extensiones de navegador o canales de comunicación externa.
- Está permitido y recomendado consultar la documentación técnica local, la ayuda oficial integrada de QGIS LTR y ArcGIS Pro, y los apuntes de clase elaborados durante las semanas S01 a S04.
- Cualquier detección de conexión a asistentes de IA durante la sesión acarrea la invalidación inmediata de la prueba bajo el reglamento de régimen disciplinario de la Universidad EAFIT.

---

## 3. Especificaciones de la Tarea Técnica

El estudiante debe completar en 110 minutos los siguientes cuatro módulos técnicos:

### Módulo A: Diagnóstico Geodésico y Reproyección a CTM12 (`EPSG:9377`)
1. **Asignación vs. Reproyección:** Identificar la capa sin `.prj` suministrada. Asignar el sistema de referencia correspondiente a su datum de captura original (Magna-SIRGAS Origen Medellín `EPSG:3116` u Origen Bogotá `EPSG:21897`).
2. **Reproyección Geodésica Oficial:** Reproyectar la capa hacia el sistema oficial **MAGNA-SIRGAS 2018 / Origen-Nacional CTM12 (`EPSG:9377`)**. Verificar que las coordenadas Este ($X$) se sitúen en el rango de $4\,700\,000\text{ a }5\,300\,000\text{ m}$ y las Norte ($Y$) en el rango de $2\,000\,000\text{ a }2\,500\,000\text{ m}$.
3. **Conversión de Estaciones CSV:** Importar la tabla de estaciones GNSS delimitada por comas, configurando los campos $X$ ($Lon$) e $Y$ ($Lat$) en `EPSG:4326`. Reproyectar y exportar como capa vectorial de puntos en `EPSG:9377`.
4. **Cálculo de Distorsión Métrica:** Medir la distancia euclidiana entre dos estaciones geodésicas en el sistema proyectado `9377` y contrastarla contra la distancia geodésica elipsoidal reportada, documentando la diferencia en metros.

### Módulo B: Construcción del Contenedor Abierto GeoPackage (`.gpkg`) en QGIS
1. Crear el contenedor espacial `hito1_entrega.gpkg` en `EPSG:9377`.
2. Almacenar dentro del GeoPackage:
   - Capa poligonal saneada: `limite_estudio_9377`.
   - Capa lineal de drenajes: `red_hidrica_9377`.
   - Capa puntual de estaciones: `estaciones_control_9377`.
3. Configurar la tabla de atributos de `red_hidrica_9377` con los tipos de datos exactos:
   - `codigo_cauce`: Texto (cadena, 10 caracteres).
   - `nombre_quebrada`: Texto (cadena, 50 caracteres).
   - `orden_strahler`: Entero corto (`Integer`).
   - `longitud_m`: Real doble (`Double`, precisión 2 decimales, calculada con `$length`).
4. Configurar el proyecto de QGIS (`hito1_qgis.qgz`) almacenando **rutas relativas**.

### Módulo C: Construcción del Contenedor Corporativo File Geodatabase (`.gdb`) en ArcGIS Pro
1. Crear la File Geodatabase `Hito1_Corporativo.gdb` en ArcGIS Pro.
2. Crear un **Feature Dataset** denominado `Infraestructura_Hidrica` configurado estrictamente en **CTM12 (`EPSG:9377`)**.
3. Importar las capas vectoriales dentro del Feature Dataset.
4. Crear y asociar un **Dominio Codificado de Valores (*Coded Value Domain*)** denominado `Dom_TipoDrenaje`:
   - Código `1`: *Cauce Natural Permanente*
   - Código `2`: *Cauce Natural Intermitente*
   - Código `3`: *Canal de Concreto Abierto*
   - Código `4`: *Box-Culvert o Tramo Soterrado*
5. Aplicar el dominio al campo atributivo `tipo_drenaje` en la clase de entidad lineal y verificar que la captura mediante lista desplegable funcione sin admitir valores arbitrarios.

### Módulo D: Empaquetamiento y Auditoría de Rutas Relativas
1. Guardar el proyecto ArcGIS Pro (`Hito1_ArcGIS.aprx`) con la opción de rutas relativas activa.
2. Cerrar ambos softwares (QGIS y ArcGIS Pro) y mover la carpeta de trabajo a otra ruta temporal (p. ej. `C:\Temp\Test_Rutas\`) para verificar que ningún archivo arroje error de capa no disponible o ruta absoluta truncada.
3. Generar el archivo comprimido final: `Hito1_Apellido_Nombre.zip`.

---

## 4. Estructura Obligatoria de Entrega

El archivo comprimido `Hito1_Apellido_Nombre.zip` debe contener:

```text
Hito1_Apellido_Nombre/
├── hito1_qgis.qgz                     # Proyecto QGIS con rutas relativas
├── hito1_entrega.gpkg                 # GeoPackage con 3 capas en EPSG:9377
├── Hito1_ArcGIS/
│   ├── Hito1_ArcGIS.aprx              # Proyecto ArcGIS Pro con rutas relativas
│   └── Hito1_Corporativo.gdb/         # File Geodatabase con Feature Dataset y Dominios
└── reporte_geodesico.txt              # Parámetros geodésicos y discrepancia métrica calculada
```

---

## 5. Rúbrica Criterial Analítica de 4 Niveles (TILT - Criteria)

> [!NOTE]
> Esta rúbrica aplica las directrices de Brookhart (2013) y Sadler (1989): prohíbe adjetivos evaluativos vagos y cuantificadores ambiguos, describiendo progresiones de desempeño técnico observable y verificable.

| Criterio y Ponderación | Nivel 1 — Inicial (0.0 – 2.9) | Nivel 2 — Básico (3.0 – 3.7) | Nivel 3 — Competente (3.8 – 4.4) | Nivel 4 — Avanzado (4.5 – 5.0) |
|:---|:---|:---|:---|:---|
| **C1. Rigor Geodésico y Homologación EPSG:9377** *(35 %)* | Conserva capas en grados decimales (`EPSG:4326`) para mediciones lineales o aplica asignación de proyección sobre capas que requerían transformación de datum, generando desplazamientos métricos no corregidos. | Identifica el CRS original y re旬proyecta a `EPSG:9377`, pero el cálculo de distancias presenta inconsistencias en unidades o no reporta la comparación numérica entre distancia elipsoidal y proyectada. | Ejecuta la asignación y reproyección correcta de todas las capas a `EPSG:9377`, ubica las coordenadas en el rango CTM12 oficial ($X \approx 4.7\times 10^6\text{ m}$, $Y \approx 2.2\times 10^6\text{ m}$) y calcula la discrepancia métrica entre distancia proyectada y elipsoidal. | Cumple todos los indicadores del nivel Competente y además explica cuantitativamente la causa del factor de escala del sistema CTM12 en la zona y documenta la diferencia residual entre la distancia de cuadrícula y de terreno. |
| **C2. Estructuración del GeoPackage en QGIS** *(30 %)* | Entrega archivos shapefile sueltos (`.shp`) fuera del contenedor, omite la definición de tipos de campo (almacena números en campos de texto) o calcula longitudes con geometrías distorsionadas. | Crea el archivo `.gpkg` con las capas solicitadas en `EPSG:9377`, pero los campos de longitud carecen de redondeo a 2 decimales o conservan nombres de atributo no estandarizados (con espacios o caracteres especiales). | Estructura el archivo `.gpkg` en `EPSG:9377` con las tres capas, tipifica campos en entero y real doble, calcula la longitud métrica oficial mediante `$length` con 2 decimales y parametriza nombres según convención *snake_case*. | Cumple todos los indicadores del nivel Competente y adicionalmente implementa restricciones de integridad (valores no nulos `NOT NULL`) o índices espaciales que optimizan la consulta de atributos en el GeoPackage. |
| **C3. File Geodatabase y Dominios en ArcGIS Pro** *(25 %)* | La File Geodatabase carece de Feature Dataset, almacena clases de entidad sueltas en coordenadas heterogéneas o no crea el Dominio Codificado solicitado. | Crea la `.gdb` y el Feature Dataset en `EPSG:9377`, pero el Dominio Codificado no restringe los valores admisibles en la tabla de atributos o contiene códigos numéricos no asociados al campo. | Estructura la `.gdb` con Feature Dataset en `EPSG:9377`, crea el dominio `Dom_TipoDrenaje` con sus 4 pares código-descripción y lo vincula al campo `tipo_drenaje`, restringiendo la captura a la lista cerrada. | Cumple todos los indicadores del nivel Competente y además configura un valor por defecto (*Default Value*) y documenta la ventaja operativa de los dominios frente a la edición libre en bases de datos corporativas. |
| **C4. Integridad de Rutas y Empaquetamiento** *(10 %)* | Al abrir el archivo comprimido en un directorio externo, los proyectos (`.qgz` o `.aprx`) arrojan ventanas de error por capas no encontradas debido a rutas absolutas fijadas a unidades personales. | Los proyectos abren en rutas externas pero presentan capas temporales no guardadas en disco o archivos residuales de bloqueo (`.lock` o temporales de edición) dentro de la carpeta. | Ambos proyectos (`.qgz` y `.aprx`) abren sin advertencias de capas desconectadas al descomprimir el archivo zip en cualquier carpeta externa, operando mediante rutas relativas verificadas. | Cumple todos los indicadores del nivel Competente y entrega una estructura de carpetas jerarquizada, limpia de archivos temporales y con el archivo `reporte_geodesico.txt` debidamente documentado. |

---

## 6. Notas de Calibración para Casos Límite (*Borderline Decisions*)

- **Decisión entre Nivel 2 (Básico) y Nivel 3 (Competente):**
  - Si el estudiante reproyectó todas las capas a `EPSG:9377` y ambos contenedores (`.gpkg` y `.gdb`) abren, pero olvidó asociar el dominio codificado al campo en ArcGIS Pro (dejando el campo en edición de texto libre), se califica en **Nivel 2 (3.5)**.
  - Para alcanzar el **Nivel 3 (Competente)**, es condición indispensable que el dominio restrinja activamente la captura de valores y que las rutas relativas abran limpias en ambos programas.
- **Decisión entre Nivel 3 (Competente) y Nivel 4 (Avanzado):**
  - Para obtener **Nivel 4 (Avanzado)**, el estudiante debe demostrar rigor técnico cuantitativo: el cálculo de la distorsión del factor de escala debe estar explícito con valores numéricos en el reporte y la estructura de base de datos debe contener reglas de integridad que prevengan errores de edición.

---

## 7. Protocolo de Mejora Continua (Semana 6)

En concordancia con el diseño pedagógico del curso:
- Los estudiantes que obtengan una calificación inferior a **3.8 / 5.0** dispondrán de una ventana de mejora continua en la sesión de la **Semana 6 (`S06`, 25 de febrero de 2027)**.
- Durante los primeros 30 minutos del sub-bloque 2, el estudiante podrá corregir en sala los errores geodésicos o estructurales identificados en su unidad territorial asignada y presentarlos ante el docente.
- La corrección verificada en vivo permitirá recuperar hasta el **40 % de los puntos deducidos** en la calificación original de este Hito 1.
