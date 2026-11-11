# Taller de Repaso y Entrenamiento Autónomo — Hito 1: Geodesia y Bases Espaciales

> **Curso:** Geomática, Ingeniería y SIG (`GEOMATICA-SIG-EAFIT`)  
> **Semestre:** 2027-1 · Universidad EAFIT  
> **Módulo:** Geodesia, CTM12 (`EPSG:9377`) y Contenedores Geoespaciales (.gpkg / .gdb)  
> **Presupuesto de Trabajo Autónomo:** $\le 4.5\text{ horas}$  
> **Insumos de Práctica:** `03_guias/02_talleres_repaso/insumos_p1/`  
> **Preparación Directa para:** **Hito 1 (Semana 5 · 20.0 % · Tier P)**

---

## 1. Propósito y Resultados de Aprendizaje

Este taller de repaso proporciona un simulacro práctico y cronometrado para consolidar las competencias evaluadas en el **Hito 1**:
- **RAA1:** Diferenciar de manera irrevocable la **asignación de CRS** (definición de metadatos cuando una capa carece de `.prj`) frente a la **reproyección geodésica** (transformación matemática de coordenadas hacia `EPSG:9377`).
- **RAA2:** Construir estructuras de almacenamiento interoperables en **GeoPackage (`.gpkg`)** de QGIS LTR y **File Geodatabase (`.gdb`)** de ArcGIS Pro, implementando Feature Datasets, Subtipos y Dominios Codificados.
- **QA/QC:** Detectar y reparar proyectos con rutas absolutas rotas antes de la entrega final.

---

## 2. Insumos Disponibles en `insumos_p1/`

Para este simulacro utilizaremos los datos ubicados en `03_guias/02_talleres_repaso/insumos_p1/`:
- `drenajes_iguana.shp` (+ `.dbf`, `.shx`, `.cpg`): Capa lineal de drenajes sin archivo de proyección (`.prj`).
- `equipamientos_comunitarios.gpkg`: Capa puntual en coordenadas geográficas WGS84 (`EPSG:4326`).
- `predios_catastro.gpkg`: Malla predial en MAGNA-SIRGAS Origen Medellín (`EPSG:3116`).

---

## 3. Plan de Entrenamiento Cronometrado (4.5 Horas)

```text
┌────────────────────────────────────────────────────────────────────────┐
│ FASE 1 (60 min): Diagnóstico Geodésico y Homologación a EPSG:9377      │
│ FASE 2 (70 min): Estructuración del GeoPackage (.gpkg) en QGIS LTR    │
│ FASE 3 (80 min): Espejo Corporativo en ArcGIS Pro (.gdb + Dominios)   │
│ FASE 4 (60 min): Simulación de Rutas Rotas y Lista de Chequeo QA/QC    │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Fase 1: Diagnóstico Geodésico y Reproyección a CTM12 (60 min)

#### Paso 1.1: Diagnóstico de la Capa sin `.prj`
1. Carga `drenajes_iguana.shp` en QGIS LTR.
2. Nota que QGIS muestra una advertencia de *«CRS indefinido»* o asigna el CRS del proyecto por defecto.
3. Abre la **Calculadora de Campos** o inspecciona las coordenadas de los nodos con la herramienta de información:
   - Si las coordenadas Este están alrededor de $830\,000\text{ m}$ y las Norte alrededor de $1\,180\,000\text{ m}$, el datum original es **Magna-SIRGAS Origen Medellín (`EPSG:3116`)**.
   - Si están en valores de $X \approx 4.7\times 10^6\text{ m}$ e $Y \approx 2.2\times 10^6\text{ m}$, ya estarían en CTM12.
4. **Error Típico a Evitar (Ejemplo Erróneo):**
   > *«Si la capa no tiene proyección, le aplico directamente Reproyectar Capa hacia 9377.»*  
   > ❌ **Falso:** Si el software no sabe cuál es el origen de partida, la transformación matemática producirá geometrías desplazadas en miles de kilómetros. Primero se debe **Asignar proyección (Definir CRS)** al sistema original (`EPSG:3116`).

#### Paso 1.2: Reproyección a Origen Nacional CTM12 (`EPSG:9377`)
1. Ejecuta la herramienta **Reproyectar capa** (*Vector general > Reproyectar capa*):
   - Capa de entrada: `drenajes_iguana` (con CRS definido `EPSG:3116`).
   - CRS de destino: `EPSG:9377` (**MAGNA-SIRGAS 2018 / Origen-Nacional**).
2. Repite el procedimiento con `equipamientos_comunitarios.gpkg` (que parte de `EPSG:4326`) y `predios_catastro.gpkg` (que parte de `EPSG:3116`).
3. Guarda temporalmente las tres capas reproyectadas.

---

### Fase 2: Construcción de la Base GeoPackage en QGIS LTR (70 min)

1. En el Navegador de QGIS, haz clic derecho sobre **GeoPackage > Crear base de datos...**:
   - Nombre: `repaso_hito1_ejercicio.gpkg`.
   - CRS de la base: `EPSG:9377`.
2. Exporta las tres capas reproyectadas dentro del archivo `.gpkg`:
   - `drenajes_9377` (Línea)
   - `equipamientos_9377` (Punto)
   - `predios_9377` (Polígono)
3. En la tabla de atributos de `drenajes_9377`, abre la Calculadora de Campos y crea el campo oficial:
   - Nombre: `longitud_m`
   - Tipo: Número real (`Double`)
   - Expresión: `round($length, 2)`
4. En la tabla de atributos de `predios_9377`:
   - Crea `area_m2` con `round($area, 2)`.
   - Crea `area_ha` con `round($area / 10000, 4)`.
5. Guarda el proyecto QGIS como `repaso_hito1.qgz`.

---

### Fase 3: Espejo Corporativo en ArcGIS Pro (.gdb + Dominios) (80 min)

1. Inicia ArcGIS Pro y crea un nuevo proyecto denominado `Repaso_Hito1_ArcGIS`.
2. En el panel de Catálogo, expande la carpeta de bases de datos y crea `Repaso_Corporativo.gdb` (o usa la que se crea por defecto).
3. **Creación del Feature Dataset:**
   - Clic derecho en `Repaso_Corporativo.gdb > New > Feature Dataset`.
   - Nombre: `Infraestructura_Urbana`.
   - CRS: Selecciona **MAGNA-SIRGAS 2018 Origen Nacional (`EPSG:9377`)**.
4. Importa las capas vectoriales dentro del Feature Dataset mediante *Import > Feature Class (multiple)*.
5. **Configuración de Dominios Codificados (*Coded Value Domains*):**
   - Clic derecho en la geodatabase > **Domains**.
   - Dominio 1: `Dom_EstadoConservacion`:
     - Tipo de campo: *Short Integer*.
     - Código `1` $\rightarrow$ *Excelente / Sin Deterioro*
     - Código `2` $\rightarrow$ *Bueno / Mantenimiento Rutinario*
     - Código `3` $\rightarrow$ *Regular / Requiere Intervención*
     - Código `4` $\rightarrow$ *Crítico / Riesgo Geotécnico*
   - Clic en **Save** en la cinta de opciones de dominios.
6. **Vincular el Dominio al Campo:**
   - Abre la vista de Campos (*Fields*) de la capa de equipamientos o drenajes.
   - Crea el campo `estado_conservacion` de tipo *Short Integer*.
   - En la columna **Domain**, selecciona `Dom_EstadoConservacion`.
   - Guarda los cambios. Abre la tabla de atributos y verifica que al editar el campo aparezca la lista desplegable con las descripciones.

---

### Fase 4: Simulación de Rutas Rotas y Lista de Chequeo QA/QC (60 min)

#### Experimento de Rutas Rotas:
1. Guarda y cierra QGIS y ArcGIS Pro.
2. Cambia el nombre de la carpeta contenedora (por ejemplo, agrégale un sufijo `_movida`).
3. Abre `repaso_hito1.qgz`:
   - Si las capas cargan sin ninguna ventana emergente, las rutas relativas están correctamente guardadas en la cabecera del archivo de proyecto.
   - Si aparece la ventana roja de *«Manejar capas no disponibles»*, significa que guardaste capas con rutas absolutas fijadas a tu disco duro.
4. **Cómo arreglarlo:** En QGIS, ve a *Proyecto > Propiedades > General > Guardar rutas* y selecciona **Relativas**. Vuelve a enlazar las fuentes en el GeoPackage local y guarda.

---

## 4. Lista de Autoevaluación previa al Hito 1

Marca cada casilla para asegurar tu preparación:

- [ ] Sé diagnosticar una capa sin `.prj` comparando sus coordenadas con los rangos conocidos de Magna Medellín (`3116`), Bogotá (`21897`) y CTM12 (`9377`).
- [ ] Conozco la diferencia exacta entre la herramienta *Asignar proyección* y la herramienta *Reproyectar capa*.
- [ ] Sé crear un GeoPackage en QGIS y exportar múltiples capas vectoriales en su interior.
- [ ] Calculo `$length` y `$area` con funciones de redondeo a 2 y 4 decimales.
- [ ] Sé crear una File Geodatabase (`.gdb`), un Feature Dataset en `EPSG:9377` y configurar un Dominio Codificado en ArcGIS Pro.
- [ ] Comprobé que mi proyecto abre limpio y sin errores tras moverlo a otra carpeta.
