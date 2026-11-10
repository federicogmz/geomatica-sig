# Parcial 1: SIG Vectorial, Geodesia y Topología en QGIS (15%)

> **Curso:** Geomática, Ingeniería y SIG  
> **Pregrados:** Ingeniería Civil y Diseño Urbano · Universidad EAFIT  
> **Ponderación:** 15% de la nota definitiva del curso  
> **Modalidad:** Individual, presencial, en el computador asignado con QGIS LTR  
> **Materiales permitidos:** Computador de laboratorio/personal con QGIS LTR, notas de clase y los tres insumos vectoriales oficiales del examen. Prohibida la comunicación entre compañeros y el uso de herramientas de IA generativa.

---

## 1. Alerta Técnica Fundamental: Rutas Relativas y Empaquetamiento en un Único GeoPackage

Uno de los errores más frecuentes y críticos en evaluaciones SIG es suponer que el archivo de proyecto (`.qgz` o `.qgs`) guarda en su interior las geometrías de las capas. **Esto es completamente falso.**

> [!WARNING]
> **¿Cómo funciona QGIS?**  
> Un archivo `.qgz` es únicamente un archivo de configuración comprimido (XML) que almacena la simbología, etiquetas, diseño de impresión y *las rutas en disco* donde residen los datos. **NO guarda los puntos, líneas ni polígonos.**  
> **El error fatal:** Si sus capas apuntan a rutas absolutas locales (como `C:\Users\nombre\Downloads\...` o carpetas temporales fuera de la entrega), al abrir el proyecto en el computador del profesor aparecerá el diálogo de *«Capas no disponibles»* con signos de exclamación amarillos y el proyecto estará completamente vacío.

### Procedimiento obligatorio para empaquetar y entregar:

1. **Activar rutas relativas en QGIS:**  
   En el menú superior de QGIS, vayan a `Proyecto → Propiedades → General`. En la opción **Guardar rutas**, seleccionen obligatoriamente **Relativas** (nunca *Absolutas*). De esta forma, QGIS buscará las capas respecto a la ubicación del archivo `.qgz` y no respecto a su usuario de Windows o Mac.
2. **Contenedor único GeoPackage (`analisis_riesgo_inundacion.gpkg`):**  
   Creen una base de datos GeoPackage única denominada exactamente `analisis_riesgo_inundacion.gpkg` en la raíz de su carpeta de trabajo y guarden allí **todas las capas del examen** (insumos migrados, capa corregida, disolución e intersecciones). Es un único archivo SQLite robusto y portable. Ninguna capa en el panel de capas debe quedar apuntando a shapefiles temporales en `insumos_p1/` ni a descargas externas.
3. **Estructura plana en la raíz del .zip:**  
   El archivo comprimido `P1_Apellido_Nombre.zip` debe contener directamente en la raíz los cuatro archivos requeridos (sin subcarpetas anidadas):
   - `analisis_riesgo_inundacion.gpkg` (con todas las capas vectoriales en EPSG:9377)
   - `resumen_amenaza_inundacion.json` (reporte cuantitativo)
   - `mapa_amenaza_inundacion.pdf` (plano técnico A3 exportado a 300 ppp)
   - `proyecto.qgz` (proyecto QGIS con rutas relativas)
4. **La prueba de fuego antes de enviar:**  
   Muevan o copien su archivo `.zip` a otra ubicación (por ejemplo el Escritorio o una carpeta temporal), descomprímanlo y abran el archivo `proyecto.qgz`. Si abre limpio sin solicitar capas perdidas, el empaquetado es correcto.
5. **Penalización por capas rotas:**  
   De acuerdo con el pacto pedagógico y la rúbrica oficial, se aplicará una **deducción directa de -0.5 puntos** sobre la nota del parcial si el archivo `.zip` no incluye los datos o si el proyecto abre con capas no disponibles.

---

## 2. El Encargo Territorial

Han sido contratados como especialistas SIG por el **DAGRD (Departamento Administrativo de Gestión del Riesgo de Desastres de Medellín)** y la Secretaría de Gestión y Control Territorial para elaborar el informe técnico y cartográfico de **evaluación de exposición predial e infraestructura crítica ante Amenaza Alta por Inundación / Avenida Torrencial** en la cuenca de la Quebrada Santa Elena (sector centro-oriente de Medellín: comunas 8 y 10, barrios Boston, Caicedo, Sucre y La Candelaria).

### Insumos Suministrados en la Carpeta del Examen (`insumos_p1/`)

1. `manchas_inundacion_tr100.shp`: Polígonos de modelación hidráulica de desborde correspondientes a un periodo de retorno de 100 años ($T_R = 100\text{ años}$). **La capa carece de archivo de definición de proyección (`.prj`)**.
2. `predios_sector_afectado.gpkg`: Cartografía predial catastral del sector con inconsistencias topológicas severas (solapes y microvacíos entre linderos privados) originadas por digitalizaciones heterogéneas de terceros.
3. `equipamientos_criticos.gpkg`: Inventario de infraestructura institucional, de salud, educación y seguridad del sector.

---

## 3. Estructura del Paquete de Entrega

Al finalizar el examen, deberán comprimir su carpeta de trabajo en un único archivo denominado:
```text
P1_Apellido_Nombre.zip
```

El archivo ZIP debe contener exactamente estos **cuatro elementos** en la raíz (sin carpetas anidadas):

```text
├── analisis_riesgo_inundacion.gpkg    (GeoPackage con las 5 capas vectoriales en EPSG:9377)
├── resumen_amenaza_inundacion.json    (Archivo de texto con las métricas cuantitativas)
├── mapa_amenaza_inundacion.pdf        (Plano técnico A3 exportado a 300 ppp)
└── proyecto.qgz                       (Proyecto de QGIS con rutas relativas)
```

> [!WARNING]
> La denominación de los archivos y de las capas dentro del GeoPackage debe ser **exacta**. Capas con nombres cambiados, capas en CRS incorrectos o archivos faltantes afectarán la calificación de la etapa respectiva de acuerdo con la rúbrica docente.

---

## 4. Requerimientos Técnicos por Etapa

### Etapa 1: Geodesia y Estructuración del Repositorio (1.0 pt / 20%)
1. **Asignación del CRS Oficial:** Inspeccionen las magnitudes de coordenadas de `manchas_inundacion_tr100.shp` en la barra de estado de QGIS ($X \approx 4.716.000\text{ m}$, $Y \approx 2.251.000\text{ m}$) y asignen formalmente el sistema de referencia oficial de Colombia:
   - **MAGNA-SIRGAS / Origen Nacional CTM12 (`EPSG:9377`)**.
   - *Condición técnica:* Asignar la proyección (definir los metadatos del CRS intrínseco), **no reproyectar**.
2. **Creación del GeoPackage:** Creen el contenedor unificado `analisis_riesgo_inundacion.gpkg` configurado en `EPSG:9377`.
3. **Migración de Insumos:** Importen `manchas_inundacion_tr100` y `equipamientos_criticos` dentro del GeoPackage garantizando que ambas capas queden almacenadas en `EPSG:9377`.

---

### Etapa 2: Control de Calidad y Corrección Topológica (1.5 pts / 30%)
1. **Auditoría Topológica con Topology Checker:** Auditen la capa predial mediante el plugin **Comprobador de topología (*Topology Checker*)** aplicando las dos reglas espaciales obligatorias sobre `predios_sector_afectado`:
   - `no debe superponerse` (*must not have overlaps*).
   - `no debe tener huecos` (*must not have gaps*).
2. **Corrección Asistida:** Mediante edición vectorial con autoensamblado (*snapping*) activado, reparen las inconsistencias detectadas empleando la **Herramienta de Vértices (*Vertex Tool*)** o la herramienta **Remodelar objetos espaciales (*Reshape Features*)** hasta que el comprobador reporte **0 errores**.
3. **Capa Saneada:** Guarden la capa corregida dentro de `analisis_riesgo_inundacion.gpkg` con el nombre exacto:
   ```text
   predios_topologia_valida
   ```

---

### Etapa 3: Geoprocesamiento y Métricas de Exposición (1.5 pts / 30%)
1. **Zona de Inundación Crítica (Disolución de Manchas):**  
   Los tramos de modelación hidráulica de `manchas_inundacion_tr100` presentan particiones y solapes entre subsectores. Ejecuten la herramienta **Disolver (*Dissolve*)** para consolidar un único polígono continuo de amenaza crítica.  
   - Almacenen la capa resultante en `analisis_riesgo_inundacion.gpkg` como:
     `zona_inundacion_critica`
2. **Intersección de Predios Expuestos:**  
   Determinen la porción predial exacta ubicada dentro de la mancha de inundación cruzando `predios_topologia_valida` y `zona_inundacion_critica`.  
   - Almacenen la capa en `analisis_riesgo_inundacion.gpkg` como:
     `predios_amenaza_alta`
3. **Cálculo de Áreas Inundables en Hectáreas:**  
   En la tabla de atributos de `predios_amenaza_alta`, calculen con la calculadora de campos un nuevo atributo numérico decimal denominado `area_inundable_ha` expresado en hectáreas ($1\text{ ha} = 10.000\text{ m}^2$).
4. **Infraestructura Crítica Expuesta:**  
   Identifiquen los equipamientos que caen dentro de la mancha de inundación y guarden la capa resultante en `analisis_riesgo_inundacion.gpkg` como:
   `equipamientos_en_amenaza`
5. **Reporte Cuantitativo JSON:**  
   Creen el archivo `resumen_amenaza_inundacion.json` con las métricas consolidadas del análisis (redondeadas a 2 decimales):
   ```json
   {
     "estudiante": "Nombre Completo del Estudiante",
     "codigo": "202610001",
     "crs_utilizado": "EPSG:9377",
     "sector_estudio": "Quebrada Santa Elena - Comunas 8 y 10",
     "metricas": {
       "area_mancha_inundacion_ha": 0.00,
       "area_predios_inundable_ha": 0.00,
       "total_predios_afectados": 0,
       "total_equipamientos_en_amenaza": 0
     }
   }
   ```

---

### Etapa 4: Cartografía Normativa y Proyecto QGIS (1.0 pt / 20%)
1. **Plano de Salida (`mapa_amenaza_inundacion.pdf`):**  
   Elaboren en el diseñador de impresión una plancha técnica en formato **A3 horizontal** (o Carta horizontal) exportada a **300 ppp** con los siguientes requerimientos:
   - **Encuadre:** Área de estudio a escala redonda adecuada.
   - **Simbología Temática de Riesgo:** Jerarquía visual clara (mancha de inundación semitransparente, predios expuestos destacados, equipamientos diferenciados por tipo).
   - **Cuadrícula métrica:** Grilla en coordenadas CTM12 (`EPSG:9377`) con etiquetas en los bordes en formato vertical en los laterales.
   - **Elementos de ley:** Escala gráfica métrica, flecha de norte y leyenda limpia y clasificada.
   - **Membrete técnico:** Título formal del encargo (DAGRD), nombre del autor, fecha, escala numérica y mención explícita a *MAGNA-SIRGAS Origen Nacional CTM12 (EPSG:9377)*.
2. **Proyecto QGIS (`proyecto.qgz`):**  
   Guarden el proyecto en la raíz de la entrega configurado con **rutas relativas**, garantizando que abra limpiamente sin capas desvinculadas.

---

## Rúbrica de Evaluación Docente (5.0 pts / 15%)

| Criterio Evaluado | Puntos | Descripción de Desempeño |
| :--- | :---: | :--- |
| **Geodesia y Estructura del Repositorio** | **1.0** | Asignación correcta de `EPSG:9377` a `manchas_inundacion_tr100.shp`, contenedor `analisis_riesgo_inundacion.gpkg` operativo y capas migradas en CTM12. |
| **Calidad y Topología Predial** | **1.5** | Capa `predios_topologia_valida` sin solapes y sin huecos (0 errores en Topology Checker). Geometrías íntegras corregidas con Vertex Tool o Reshape. |
| **Geoprocesamiento y Métricas de Amenaza** | **1.5** | Disolución de mancha ejecutada (`zona_inundacion_critica`), intersección predial exacta (`predios_amenaza_alta`), cálculo de `area_inundable_ha` en hectáreas, equipamientos aislados (`equipamientos_en_amenaza`) y archivo `resumen_amenaza_inundacion.json` con cifras consistentes. |
| **Composición Cartográfica y Proyecto** | **1.0** | Plancha `mapa_amenaza_inundacion.pdf` a 300 ppp con estándares normativos (cuadrícula métrica CTM12, escala gráfica, norte, leyenda, membrete) y `proyecto.qgz` con rutas relativas funcionales. |
| **Total Parcial 1** | **5.0** | **15% de la calificación definitiva del curso.** |
