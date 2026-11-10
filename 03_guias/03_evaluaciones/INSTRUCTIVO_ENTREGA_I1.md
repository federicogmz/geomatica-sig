# Instructivo de Entrega: Informe 1 (I1) — Diagnóstico Cartográfico y Propuesta Territorial

> **Curso:** Geomática, Ingeniería y SIG  
> **Pregrados:** Ingeniería Civil y Diseño Urbano · Universidad EAFIT  
> **Ponderación:** 12% de la nota definitiva del curso  
> **Fecha y hora límite de entrega digital:** **Jueves de la Semana 10 a las 12:00 m. vía Teams**  
> **Modalidad:** 100% Digital (sin impresión física en papel)  
> **Sustentación presencial:** Realizada durante la sesión de la Semana 10 (proyectando el mapa digital)  

---

## 1. Propósito Central: El Mapa como Sustento de una Propuesta Territorial

El **Informe 1 (I1)** constituye el punto de partida del **Proyecto Integrador** sobre la cuenca de la **Quebrada La Iguaná** (Medellín, Antioquia). Esta entrega no es un mero ejercicio técnico pasivo de digitalización o calco de geometrías. **La salida cartográfica técnica es la herramienta gráfica y técnica para estructurar, argumentar y comunicar la Propuesta de Proyecto Integrador de cada grupo.**

Cada grupo debe formular una **propuesta territorial concreta** que articule de manera transversal la **Ingeniería Civil** (manejo integral de cuencas, drenajes, estabilidad de laderas, obras hidráulicas de mitigación, infraestructura vial y servicios públicos) con el **Diseño Urbano** (morfología urbana, usos del suelo, espacio público, conectividad barrial, fajas de retiro ambiental y habitabilidad). El mapa técnico debe reflejar claramente tanto el diagnóstico del estado actual de la cuenca como la localización espacial de su propuesta.

### Líneas temáticas y ejemplos para la formulación de la propuesta:
- **Zonificación de áreas aptas y seguras para desarrollo urbano:** Delimitación de sectores consolidados o en expansión, condicionados por las rondas de retiro a drenajes, fajas de amenaza por avenidas torrenciales y laderas de alta pendiente.
- **Corredores ecológicos y parques lineales en rondas hídricas:** Integración del espacio público urbano en la parte baja (comunas 7 Robledo y 11 Laureles-Estadio) con la protección del cauce principal de La Iguaná y sus afluentes tributarios.
- **Protección y restauración de bosque en cuenca alta:** Plan de contención de la frontera urbana informal en el corregimiento de San Cristóbal mediante cinturones verdes, bioingeniería de laderas y conservación de cabeceras de drenaje.
- **Infraestructura de amortiguamiento y disipación hidráulica integrada al paisaje:** Articulación de las obras existentes (azud de la Cra. 80, presa de laminación de la Cra. 70) con nuevos espacios de retención de crecientes y espacio público barrial.

---

## 2. Alerta Técnica Fundamental: Guardar Proyecto (.qgz) vs. Asociar Capas (Datos en Disco)

Uno de los errores más frecuentes al iniciar en SIG es suponer que el archivo de proyecto (`.qgz` o `.qgs`) contiene en su interior los datos geográficos de las capas. **Esto es completamente falso.**

> **¡Atención! Regla Crítica de Almacenamiento:**  
> **¿Cómo funciona QGIS?** Un archivo `.qgz` es únicamente un archivo de configuración (un índice comprimido con instrucciones XML) que almacena la simbología, etiquetas, diseño de impresión y *la ruta en el disco duro* donde están guardados los datos. **NO guarda los puntos, líneas ni polígonos.**  
> **El error fatal:** Si envían únicamente el archivo `.qgz` por Teams, al abrirlo en el PC del profesor aparecerá el diálogo de *«Capas no disponibles»* con signos de exclamación amarillos y el mapa estará totalmente vacío.

### Procedimiento obligatorio para empaquetar y entregar:
1. **Activar rutas relativas en QGIS:** En el menú superior vayan a `Proyecto → Propiedades → General`. En la opción **Guardar rutas** seleccionen obligatoriamente **Relativas** (nunca Absolutas). Con esto, QGIS buscará las capas respecto a la carpeta del proyecto y no respecto a su usuario personal de Windows o Mac.
2. **Opción A (Recomendada y Profesional — GeoPackage):** Creen una base de datos única `datos_iguana_9377.gpkg` dentro de su carpeta de trabajo y guarden allí todas las capas vectoriales del proyecto. Es un único archivo SQLite robusto y portable.
3. **Opción B (Estructura con Shapefiles):** Si usan Shapefile, recuerden que cada capa requiere mínimo 4 archivos en el mismo directorio: `.shp` (geometría), `.shx` (índice), `.dbf` (atributos) y `.prj` (CRS). Para no complicarse con estos archivos, alternativamente pueden enviarlo también en formato GeoJSON `.geojson`.
4. **Comprimir la carpeta completa en .zip:** La entrega digital debe ser una carpeta comprimida (ej. `grupo03_I1.zip`) que contenga el archivo `.qgz`, la carpeta o GeoPackage con los datos y el archivo vectorial PDF del mapa exportado.
5. **La prueba antes de enviar:** Muevan o copien el `.zip` a otra ubicación (o envíenselo a otro compañero de grupo), descomprímanlo y abran el `.qgz`. Si abre limpio sin solicitar rutas perdidas, el empaquetado es correcto.

---

## 3. Requisitos Técnicos del Dataset Espacial

- **Sistema de Coordenadas Oficial:** Todas las capas y el proyecto deben estar en **MAGNA-SIRGAS / Origen Nacional CTM12 (EPSG: 9377)**. Si descargan capas en coordenadas geográficas (WGS84 / EPSG: 4326), deben aplicar la herramienta `Reproyectar capa` a EPSG: 9377 (no solo 'Asignar proyección'). Coordenadas de control: Este 4 704 000 a 4 714 000 m, Norte 2 216 000 a 2 222 000 m.
- **Límite de la cuenca:** Polígono continuo cerrado con geometría válida (área de referencia $pprox 46.25    ext{ km}^2$, compuesta por $38.73	ext{ km}^2$ de franja rural/boscosa y $7.52	ext{ km}^2$ de franja urbana consolidada).
- **Red hídrica:** Eje del cauce principal de la Quebrada La Iguaná ($pprox 15	ext{ km}$) jerarquizado respecto a sus afluentes principales (San Franciscana, La Seca, Los Amigos, La Popa, entre otras).
- **Capas base de la franja urbana:** Manzanas catastrales, malla vial jerarquizada (primaria, secundaria, local) y división barrial/comunal.
- **Infraestructura y propuesta:** Hitos de control hidráulico (azud Cra. 80, presa Cra. 70, desembocadura en Río Medellín) y polígonos/líneas que demarquen el área de intervención de su propuesta de proyecto integrador.
- **Tablas de atributos:** Nombres de campos en minúsculas y formato `snake_case` (ej. `area_km2`, `longitud_m`, `tipo_via`). Campos cuantitativos calculados obligatoriamente con tipo de dato **Real/Decimal**.

---

## 4. Especificaciones de la Salida Cartográfica Digital (Formato A3)

El mapa debe ser compuesto en el **Diseñador de Impresión de QGIS** y exportado en formato vectorial **PDF a 300 ppp**. Aunque la entrega es **100% digital (sin impresión en papel)**, la lámina debe maquetarse bajo estándar de página A3 para asegurar proporciones cartográficas, escalas normalizadas y legibilidad técnica profesional.

- **Maquetación de Hoja:** Tamaño de página **A3 ($420 	imes 297	ext{ mm}$) en orientación horizontal**. La morfología de la cuenca es alargada de occidente a oriente; la orientación horizontal aprovecha al máximo la visualización en pantalla y la relación de aspecto.
- **Marco principal de mapa (Canvas):** Ocupa entre el 60% y el 70% de la lámina. **Escala numérica fija y redonda** (ej. 1:25.000, 1:35.000 o 1:50.000). Prohibido dejar escalas residuales con decimales (como 1:27.483).
- **Los 8 elementos indispensables:**
  1. **Título formal:** Qué, Dónde, Cuándo y Tema de la propuesta (ej. *«Cuenca de la Quebrada La Iguaná: Diagnóstico Cartográfico y Propuesta de Parque Lineal — Medellín, 2026»*).
  2. **Marco principal encuadrado:** A escala redonda fija con la herramienta *«Mover contenido del elemento»*.
  3. **Leyenda limpia:** Desactivar 'Actualización automática', renombrar en español técnico y suprimir nombres de archivos `.shp` o capas invisibles.
  4. **Escala gráfica y numérica:** Barra gráfica calibrada en kilómetros con divisiones enteras (ej. 0, 1, 2, 3 km) y texto de escala numérica complementario.
  5. **Flecha Norte:** Símbolo sobrio y discreto.
  6. **Cuadrícula proyectada en CTM12:** Con cruces o líneas y cotas en metros sin decimales (rango 4.7M Este y 2.2M Norte).
  7. **Mapa de localización regional:** Inserción del Valle de Aburrá / Medellín destacando la cuenca.
  8. **Pie técnico:** Sistema de coordenadas declarado (`EPSG:9377`), fuentes oficiales con año, nombres completos de los integrantes del grupo y su pregrado, fecha y área calculada de la cuenca.
- **Criterios cartográficos:** Contraste figura-fondo (la cuenca debe destacar nítidamente frente al entorno atenuado); semiótica del color adecuada (evitar la rampa arcoíris; usar paletas secuenciales para magnitudes continuas y cualitativas para categorías); etiquetas con halo blanco protector de 1 a 1.5 mm.

---

## 5. Guía de Sustentación Oral y Presentación de la Propuesta

La sustentación se realizará en la sesión presencial proyectando el mapa digital del grupo en pantalla. Cada equipo dispondrá de **10 minutos** en total. Todos los integrantes deben intervenir. Pueden apoyarse libremente en notas de campo, libretas de apuntes o material complementario si lo consideran necesario, garantizando una exposición fluida, profesional y articulada.

| Momento / Tiempo | Contenido y Foco de la Exposición |
|---|---|
| **1. Diagnóstico Territorial**<br/>*(3.0 min)* | • Presentar la caracterización biofísica y urbana de la cuenca proyectando el mapa digital.<br/>• Describir el gradiente territorial: zona de cabecera boscosa (San Cristóbal) vs. ladera urbana densa (Robledo, San Javier, Laureles).<br/>• Señalar el cauce principal de La Iguaná, afluentes críticos y problemáticas identificadas (amenaza torrencial, presión de ocupación, aislamiento de espacio público). |
| **2. Propuesta del Proyecto Integrador**<br/>*(5.5 min)* | • **Planteamiento central:** Explicar con total claridad la propuesta que el grupo desarrollará a lo largo del semestre.<br/>• **Sustentación sobre el mapa:** Señalar dónde se localiza la intervención propuesta y por qué allí.<br/>• **Articulación interdisciplinaria:** Explicar cómo la propuesta integra la visión de **Ingeniería Civil** (manejo de aguas, mitigación de riesgos, obras viales o de drenaje) con el **Diseño Urbano** (conectividad, habitabilidad, espacio público, fajas verdes). |
| **3. Decisiones Técnicas y Cartográficas**<br/>*(1.0 min)* | • Explicar por qué se seleccionó la escala de trabajo elegida y cómo se definió la jerarquía visual de la lámina.<br/>• Detallar las fuentes oficiales consultadas, la verificación del CRS CTM12 (EPSG:9377) y el cálculo de métricas en atributos.<br/>• Justificar la semiótica de color empleada para comunicar la propuesta frente al diagnóstico base. |
| **4. Hoja de Ruta para las Siguientes Entregas**<br/>*(0.5 min)* | • Describir brevemente cómo piensan validar o profundizar la propuesta en el Módulo 2 con el análisis del terreno (DEM y pendientes), en el Módulo 3 con datos GNSS y verificación de campo, y en el cierre del semestre con teledetección (GEE) y Python. |

---

## 6. Catálogo de Fuentes de Información Geoespacial Abierta

Para construir el diagnóstico y justificar espacialmente su propuesta, los grupos deben consultar y descargar capas de los siguientes portales y repositorios oficiales abiertos:

| Portal / Entidad | Capas Clave para la Cuenca de La Iguaná | Utilidad para la Propuesta |
|---|---|---|
| **GeoMedellín**<br/>*(Alcaldía de Medellín)*<br/>[geomedellin.medellin.gov.co](https://geomedellin.medellin.gov.co/) | • Manzanas catastrales y sectores censales.<br/>• Límite comunas (7, 11, 13) y corregimiento San Cristóbal.<br/>• Curvas de nivel oficiales (cada 5 m).<br/>• Amenazas POT (movimientos en masa e inundación). | Base oficial de catastro y planeación territorial para sustentar el componente urbano y legal de la propuesta. |
| **Geocatálogo AMVA**<br/>*(Área Metropolitana)*<br/>[metropol.gov.co](https://www.metropol.gov.co/) | • Red hídrica metropolitana y drenajes.<br/>• Malla vial metropolitana jerarquizada.<br/>• Coberturas del suelo CORINE Land Cover.<br/>• Límite conurbación metropolitana. | Coherencia en la hidrología superficial y visión territorial de la cuenca dentro del Valle de Aburrá. |
| **Geoportal SIATA**<br/>*(Sist. Alerta Temprana)*<br/>[siata.gov.co](https://siata.gov.co/) | • Sensores de nivel en la Quebrada La Iguaná.<br/>• Pluviómetros y estaciones meteorológicas.<br/>• Registro histórico de crecientes y avenidas torrenciales. | Insumo fundamental de Ingeniería Civil para justificar obras de mitigación, amortiguamiento y retiros seguros. |
| **Colombia en Mapas**<br/>*(IGAC)*<br/>[colombiaenmapas.gov.co](https://colombiaenmapas.gov.co/) | • Cartografía básica oficial (1:25.000 / 1:10.000).<br/>• Toponimia oficial de cerros, lomas y quebradas.<br/>• Vértices de la red geodésica MAGNA-SIRGAS. | Toponimia validada (Alto de Boquerón, Cerro de Las Repetidoras) y puntos de control geodésico. |
| **OpenStreetMap (OSM)**<br/>*(Plugin QuickOSM QGIS)*<br/>[overpass-turbo.eu](https://overpass-turbo.eu/) | • Vías barriales y senderos rurales (`highway`).<br/>• Huella de edificaciones recientes (`building`).<br/>• Equipamientos de salud y educación (`amenity`). | Datos altamente actualizados sobre caminos en laderas informales y morfología construida reciente. |
| **Servicio Geológico (SGC)**<br/>*(SGC Colombia)*<br/>[sgc.gov.co](https://sgc.gov.co/) | • Fallas geológicas activas (Sistema Romeral / Iguaná).<br/>• Cartografía geológica superficial 1:25.000. | Sustento litológico-estructural para identificar zonas inestables no aptas para urbanización. |
| **CORANTIOQUIA**<br/>*(Corporación Ambiental)*<br/>[corantioquia.gov.co](https://corantioquia.gov.co/) | • Fajas de protección y rondas hídricas legales.<br/>• Reserva forestal protectora regional / nacional.<br/>• POMCA del Río Aburrá - Medellín. | Límites normativos de protección ambiental en la cuenca alta para propuestas de conservación. |

---

## 7. Documentación Técnica y Tutoriales de Consulta Paso a Paso

Si tienen dudas técnicas durante el geoprocesamiento o la preparación de la salida gráfica, consulten las siguientes fuentes oficiales y guías paso a paso recomendadas para cada procedimiento:

| Procedimiento Técnico | Recurso Oficial / Tutorial Paso a Paso | Enlace de Consulta |
|---|---|---|
| **1. Proyectos y Rutas Relativas** | Documentación oficial de QGIS sobre guardado de proyectos, rutas relativas y estructura de directorios. | [docs.qgis.org → Project Files](https://docs.qgis.org/latest/en/docs/user_manual/introduction/qgis_configuration.html#project-properties) |
| **2. Manejo de GeoPackage** | Tutorial paso a paso para empaquetar capas vectoriales, tablas y estilos en un contenedor SQLite/GPKG. | [qgistutorials.com → GeoPackage](https://www.qgistutorials.com/) |
| **3. Reproyección a CTM12** | Guía técnica oficial del IGAC sobre la Resolución 471 de 2020 y transformación desde orígenes antiguos y WGS84. | [igac.gov.co → CTM12](https://www.igac.gov.co/) |
| **4. Diseñador de Impresión A3** | Tutorial de composición cartográfica: inserción de mapas, cuadrículas CTM12, escalas gráficas y leyendas. | [docs.qgis.org → Print Layout](https://docs.qgis.org/latest/en/docs/user_manual/print_composer/overview_composer.html) |
| **5. Descarga con QuickOSM** | Manual de consulta rápida de geometrías de OpenStreetMap (vías, manzanas, ríos) directamente desde QGIS. | [wiki.openstreetmap.org → QuickOSM](https://wiki.openstreetmap.org/wiki/QGIS) |
| **6. Validación y Geoprocesamiento** | Guía de herramientas nativas de QGIS para corregir auto-intersecciones, eliminar duplicados, Clip, Dissolve y Buffer. | [docs.qgis.org → Vector](https://docs.qgis.org/latest/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html) |

---

## 8. Rúbrica de Evaluación y Reglas del Pacto Pedagógico

El Informe 1 tiene un peso de **12% de la nota definitiva del curso**. Se evalúa con los siguientes criterios:

| Criterio Evaluativo | % | Descriptores de Calidad y Desempeño |
|---|:---:|---|
| **1. Rigor Geodésico y Topología** | **3.0%** | • Todas las capas y el proyecto configurados en EPSG: 9377 (MAGNA-SIRGAS Origen Nacional CTM12).<br/>• Límite perimetral de cuenca cerrado, continuo y con área acorde a la realidad (~46.25 km²).<br/>• Red hídrica limpia y conectada a la desembocadura; geometrías sin autointersecciones ni nulos. |
| **2. Calidad de Atributos y Empaquetado** | **2.5%** | • Campos normalizados en minúsculas y formato `snake_case`, con tipos de datos correctos.<br/>• Áreas ($km^2$) y longitudes ($m$) calculadas matemáticamente con la calculadora de campos.<br/>• **Empaquetado perfecto:** Proyecto con rutas relativas o GeoPackage que abre sin capas perdidas. |
| **3. Salida Cartográfica Digital (A3)** | **4.0%** | • Presencia impecable de los 8 elementos anatómicos en composición A3 horizontal exportada a PDF (300 ppp).<br/>• Escala numérica redonda con barra gráfica funcional; cuadrícula con coordenadas CTM12 en metros.<br/>• Excelente jerarquía visual (cuenca destacada), colores apropiados y etiquetas con halo protector.<br/>• Archivo PDF nítido, sin elementos cortados ni textos solapados, entregado dentro del archivo .zip. |
| **4. Propuesta Territorial y Sustentación** | **2.5%** | • Claridad, coherencia e interés técnico de la **Propuesta de Proyecto Integrador** presentada.<br/>• Articulación explícita y visible entre **Ingeniería Civil** y **Diseño Urbano**.<br/>• Dominio temático en la exposición proyectando el mapa digital y participación equitativa del grupo. |

> **Recordatorio de Condiciones del Pacto Pedagógico:**  
> - **Fecha límite inmodificable:** Jueves de la Semana 8 a las **12:00 m. en punto (inicio de la clase) vía Teams**. Después de esa hora se considera entrega tardía (-5% de penalización por cada día de retraso según Pacto Pedagógico §6).  
> - **Penalización por archivo incompleto / capas rotas:** **-0.5 directo sobre la nota del trabajo** si el archivo `.zip` no incluye los archivos fuente, si faltan extensiones de Shapefiles o si el proyecto abre con capas no disponibles.  
> - **Nomenclatura oficial:** `grupoXX_I1.zip`.  

---

## 9. Lista de Chequeo Final (Checklist antes de comprimir y enviar a Teams)

- [ ] ¿Todas las capas vectoriales y el proyecto están en `MAGNA-SIRGAS / CTM12 (EPSG:9377)`?
- [ ] ¿El proyecto QGIS está guardado con **rutas relativas** (`Proyecto → Propiedades → General → Relativas`)?
- [ ] ¿La propuesta de proyecto integrador está claramente definida y señalada en el mapa con articulación Civil + Diseño Urbano?
- [ ] ¿La escala del marco de mapa es un número redondo (ej. 1:25.000, 1:50.000) y ocupa el 60-70% de la lámina A3?
- [ ] ¿La cuadrícula muestra coordenadas proyectadas en metros con valores de siete cifras (Este ~4.7M, Norte ~2.2M)?
- [ ] ¿La leyenda está depurada (sin nombres de archivo .shp ni capas invisibles) y las etiquetas tienen halo blanco?
- [ ] ¿El cuadro de créditos incluye título formal, sistema EPSG:9377, fuentes con año, autores y área calculada (~46.25 km²)?
- [ ] ¿Hicieron la prueba descomprimiendo el .zip en otra carpeta y abriendo el proyecto sin errores de capas faltantes?
- [ ] ¿Exportaron el mapa técnico a **PDF vectorial de alta resolución (300 ppp)** y lo incluyeron dentro de la carpeta del .zip?
- [ ] ¿El archivo comprimido está subido a Teams antes del **jueves a las 12:00 m.**?
