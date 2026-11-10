# Instructivo de Entrega: Informe Final (`IF`) con Sustentación Oral
## Continuidad de la Propuesta Territorial de I1: Análisis Territorial Multicriterio con Ráster, Imágenes Satelitales e Índices Espectrales en la Cuenca La Iguaná (QGIS)

> **Curso:** Geomática, Ingeniería y SIG  
> **Pregrados:** Ingeniería Civil y Diseño Urbano · Universidad EAFIT  
> **Software:** **100% en QGIS** (`EPSG:9377` — MAGNA-SIRGAS 2018 / Origen-Nacional)  
> **Ponderación:** **26.0% de la nota definitiva del curso** (**20.0%** Entrega Técnica, Documento y Mapa [3.85 / 5.0] + **6.0%** Sustentación Oral Individual [1.15 / 5.0])  
> **Entrega digital (`grupoXX_IF.zip`):** **Jueves 05 de noviembre de 2026 (Semana 16) hasta las 12:00 m. vía Teams**  
> **Sustentación Oral en clase:** **Jueves 05 de noviembre de 2026 · Bloque 1 (12:00–3:00 p.m. · 15 min por equipo)**

---

## 1. Propósito e Hilo Conductor: La Evolución de la Propuesta de I1

El **Informe Final (`IF`)** representa el cierre del **Proyecto Integrador** del semestre sobre la **Cuenca de la Quebrada La Iguaná**. 

> [!IMPORTANT]
> **Continuidad directa con el Informe 1 (I1):**  
> Este trabajo **no comienza desde cero**. El punto de partida de cada equipo es la **Propuesta Territorial y el diagnóstico preliminar que formularon y sustentaron en I1** (basada principalmente en capas vectoriales: red hídrica, curvas de nivel, vías, infraestructura y delimitaciones conceptuales).  
> 
> En este Informe Final, cada grupo someterá su propuesta original a una **validación cuantitativa y espacial rigurosa**, incorporando las temáticas y herramientas avanzadas vistas en la segunda mitad del curso: **modelos digitales de elevación (DEM), análisis morfométrico del terreno, teledetección con imágenes satelitales Sentinel-2 e índices espectrales (`NDVI` y `NDBI`)**.

### Pregunta Rectora del Informe Final
> *¿De qué manera los datos ráster de elevación (DEM, pendientes y relieve) y las imágenes satelitales multiespectrales (Sentinel-2: vigor vegetal `NDVI` y huella construida `NDBI`) confirman, refinan o reorientan la propuesta territorial que el equipo formuló en I1, cuáles son las áreas críticas prioritarias cuantificadas en hectáreas (`area_ha`), y cómo se articula una solución integral viable desde la Ingeniería Civil y el Diseño Urbano?*

---

## 2. Ejes Temáticos Nuevos a Integrar sobre la Base de I1

Cada equipo debe enriquecer el proyecto de I1 articulando las siguientes tres dimensiones analíticas en QGIS:

### 2.1. Dimensión Morfométrica y del Relieve (Datos Ráster `DEM`)
* **Modelo Digital de Elevación:** Integración y recorte del DEM oficial de la cuenca en `EPSG:9377`.
* **Mapa de Pendientes:** Cálculo de pendientes en grados y categorización según los rangos de referencia geomorfológica y del POT:
  * $< 15^\circ$: Pendientes bajas (llanura aluvial y conos de deyección, zonas de acumulación).
  * $15^\circ\text{--}30^\circ$: Pendientes medias (laderas de transición con restricciones moderadas a severas).
  * $\ge 30^\circ$: Pendientes fuertes / críticas (escarpes y laderas con alta susceptibilidad a movimientos en masa).
* **Lectura Tridimensional y Perfil:** Generación de sombreado del relieve (*Hillshade*) para contextualizar el drenaje y trazado del perfil longitudinal del cauce principal (mediante la herramienta de *Perfil de Elevación* de QGIS) o de las laderas donde se implanta su propuesta.

### 2.2. Dimensión Satelital y Multiespectral (`Sentinel-2` en QGIS)
* **Descarga o Uso de Bandas Ópticas:** Procesamiento de reflectancias de superficie (L2A, escena de baja nubosidad $<10\%$) de Sentinel-2 (B4 Roja, B8 Infrarrojo Cercano - NIR, B11 Infrarrojo de Onda Corta - SWIR) recortadas al ámbito de la cuenca en `EPSG:9377`.
* **Índice de Vegetación de Diferencia Normalizada (`NDVI`):**
  $$\text{NDVI} = \frac{\text{B8} - \text{B4}}{\text{B8} + \text{B4}}$$
  * Diagnóstico del estado y vigor de la cobertura vegetal protectora en la cuenca alta vs. zonas con desprotección radicular y pérdida de cobertura en rondas y taludes.
* **Índice de Edificación de Diferencia Normalizada (`NDBI`):**
  $$\text{NDBI} = \frac{\text{B11} - \text{B8}}{\text{B11} + \text{B8}}$$
  * Cartografía de la huella construida impermeable, techos, pavimentos y suelos desnudos expuestos, contrastando la presión urbana informal sobre las márgenes y bordes de ladera (ej. sectores de San Cristóbal, Robledo, Olaya Herrera, etc.).
  * *(Nota técnica: Remuestrear la banda B11 de 20 m a 10 m para coincidir con la resolución de B8 antes del álgebra ráster).*

### 2.3. Cruce Multicriterio, Ajuste de la Propuesta de I1 y Cuantificación
* **Validación Crítica de I1:** Contrastar los polígonos o sectores de intervención planteados en I1 con los nuevos rásteres:
  * *¿La propuesta original de I1 contemplaba zonas que el DEM revela como laderas inestables ($\ge 30^\circ$)?*
  * *¿Qué valores de `NDVI` y `NDBI` caracterizan el sector seleccionado? ¿Existe conflicto entre cobertura vegetal protectora y avance de la impermeabilización urbana?*
* **Delimitación de Zonas Prioritarias de Intervención:** Creación de una capa vectorial poligonal final (`zonas_prioritarias`) en `EPSG:9377` que delimite los sectores donde el equipo concentrará sus acciones, calculando en su tabla de atributos el área exacta en hectáreas (`area_ha`).
* **Propuesta Integral Articulada:**
  * **Ingeniería Civil:** Estabilización de taludes, bioingeniería, muros de contención/gaviones, control torrencial, disipadores de energía, manejo de escorrentías y drenaje urbano sostenible (SUDS).
  * **Diseño Urbano:** Franjas de amortiguamiento y parques lineales de quebrada, senderos ecológicos, espacio público de borde para contener la expansión informal, mejoramiento barrial y relocalización de viviendas en alto riesgo no mitigable.

---

## 3. Entregables Oficiales (`grupoXX_IF.zip`)

Cada equipo entregará un único archivo comprimido **`grupoXX_IF.zip`** con **exactamente 3 componentes** (todo rigurosamente homologado en **`EPSG:9377`**):

```text
grupoXX_IF.zip
├── 1_proyecto_qgis/
│   ├── proyecto_iguana.qgz           # Proyecto QGIS con rutas relativas
│   ├── proyecto_iguana.gpkg          # GeoPackage con vectores de I1 + zonas_prioritarias (area_ha)
│   └── raster_base/                  # Rásteres en EPSG:9377:
│       ├── dem_iguana_9377.tif       # Modelo Digital de Elevación (DEM)
│       ├── pendiente_iguana_9377.tif # Mapa de pendientes en grados
│       ├── ndvi_iguana_9377.tif      # Índice de vegetación Sentinel-2
│       └── ndbi_iguana_9377.tif      # Índice de huella construida Sentinel-2
├── 2_Mapa_Sintesis_A3_grupoXX.pdf    # Plancha técnica A3 (300 dpi) diagnóstico y propuesta
└── 3_Informe_Territorial_grupoXX.pdf # Informe territorial analítico (máximo 5 páginas)
```

---

### 3.1. Especificaciones del `Mapa_Sintesis_A3_grupoXX.pdf`
* **Formato:** Hoja tamaño **A3 ($420 \times 297\text{ mm}$) en orientación horizontal**, exportada desde el Diseñador de Impresión de QGIS en **PDF a 300 ppp**.
* **Contenido Cartográfico:**
  * Marco principal a escala fija redonda (ej. 1:25.000 o 1:35.000) donde se visualice la cuenca con su relieve (*Hillshade* de fondo o pendientes transparentes), la red hídrica jerarquizada y la localización nítida de las **Zonas Prioritarias de Intervención**.
  * Cuadros o mapas de detalle secundarios que evidencien el análisis satelital (`NDVI` y `NDBI`) y el relieve (perfil longitudinal del cauce o pendientes críticas).
  * **Los 8 elementos indispensables:**
    1. **Título formal:** Tema, localización geográfica y marco temporal.
    2. **Marco principal encuadrado:** A escala redonda fija con la cuenca destacada.
    3. **Leyenda técnica clasificada:** Depurada, en español y sin nombres de archivo crudos.
    4. **Escala gráfica y numérica:** Barra en km con divisiones enteras y texto de escala numérica complementaria.
    5. **Flecha Norte:** Símbolo sobrio y normativo.
    6. **Cuadrícula proyectada:** En `EPSG:9377` con cotas en metros sin decimales.
    7. **Mapa de localización regional:** Inserción del Valle de Aburrá destacando la cuenca.
    8. **Cuadro de créditos técnicos:** Sistema de coordenadas declarado (`EPSG:9377`), fuentes oficiales con año, fecha, autores con pregrado y área de la cuenca.

---

### 3.2. Estructura Sugerida del `Informe_Territorial_grupoXX.pdf` (Máximo 5 Páginas)

> [!TIP]
> **Enfoque analítico y de toma de decisiones:** No incluya tutoriales ni capturas de pantallas de ventanas o botones de QGIS. Utilice el espacio para argumentar con datos espaciales, tablas resumen y mapas de soporte.

1. **Evolución de la Propuesta desde I1 y Diagnóstico del Relieve (1 página):**
    * Breve recuento de la propuesta original formulada en I1.
    * Análisis del relieve con el DEM: lectura del perfil longitudinal del drenaje, identificación de gargantas torrenciales y tabla resumen de distribución de áreas según pendientes ($<15^\circ$, $15^\circ\text{--}30^\circ$, $\ge 30^\circ$).
2. **Diagnóstico Satelital Multiespectral: Dinámica de Cobertura y Huella Urbana (1 página):**
    * Interpretación espacial de los índices `NDVI` y `NDBI`.
    * Contraste entre la cobertura protectora de la cuenca alta (bosques/rastrojos) y la presión urbana por impermeabilización en comunas y corregimiento.
    * Detección de puntos críticos donde la ocupación o deforestación amenaza las rondas hídricas o taludes inestables.
3. **Validación Cuantitativa y Delimitación de Zonas Prioritarias (1 página):**
    * Explicación del cruce espacial realizado para delimitar las `zonas_prioritarias`.
    * Cuantificación del área de intervención en hectáreas (`area_ha`), desagregando según niveles de criticidad o sectores de atención.
    * Modificaciones o ajustes que el equipo debió hacer a la propuesta inicial de I1 tras contrastarla con la evidencia ráster y satelital.
4. **Propuesta Integral de Intervención: Ingeniería Civil + Diseño Urbano (1 a 2 páginas):**
    * **Componente de Ingeniería Civil:** Tipología de obras geotécnicas e hidráulicas requeridas, justificación técnica según pendientes y caudales, criterios de drenaje y mitigación de amenazas.
    * **Componente de Diseño Urbano:** Lineamientos espaciales para el borde urbano-rural, parques lineales, conectividad ecológica, tratamiento de espacio público, manejo de retiros y relación con las comunidades locales.
    * Tabla resumen de intervenciones priorizadas por sector.

---

## 4. Sustentación Oral en Clase (Semana 16 — 15 Minutos por Equipo)

El **jueves 05 de noviembre**, durante el **Bloque 1 (12:00 m. – 3:00 p.m.)**, cada equipo presentará su trabajo proyectando su **Mapa Síntesis A3** y el **proyecto en vivo en QGIS**:

* **10 minutos — Pitch de Consultoría Territorial:** 
  * Explicar cómo evolucionó la propuesta desde I1 hasta este cierre.
  * Sustentar el diagnóstico físico con base en los mapas de pendientes y los índices satelitales (`NDVI`/`NDBI`).
  * Demostrar la viabilidad y pertinencia de las hectáreas priorizadas y las intervenciones propuestas desde la Ingeniería Civil y el Diseño Urbano.
* **5 minutos — Preguntas Individuales del Docente:**
  * Cada integrante responderá una pregunta técnica individual sobre la procedencia de los datos, los geoprocesamientos realizados en QGIS (cálculo de pendientes, álgebra ráster de índices, consultas espaciales) o la justificación territorial y de ingeniería de las decisiones adoptadas.

---

## 5. Rúbrica de Calificación (Sobre 5.0 Puntos — 26.0% del Curso)

| Criterio de Evaluación | Puntos (sobre 5.0) | Equivalencia Curso | Aspectos a Evaluar |
| :--- | :---: | :---: | :--- |
| **1. Rigor Geodésico y Estructura en QGIS (`.gpkg`, `.qgz`, Rásteres)** | **1.50 pts** | **7.8%** | • Homologación 100% en `EPSG:9377` (tanto capas vectoriales como rásteres).<br/>• Proyecto guardado con rutas relativas funcionales que abre sin capas faltantes.<br/>• Cálculo impecable de pendientes en grados y álgebra ráster correcta para `NDVI` y `NDBI` (con B11 remuestreada).<br/>• Capa poligonal `zonas_prioritarias` con geometría limpia y campo `area_ha` calculado matemáticamente en atributos. |
| **2. Calidad del Análisis Territorial y Propuesta (`Informe_Territorial`)** | **1.50 pts** | **7.8%** | • Coherencia y continuidad explícita con la propuesta iniciada en I1.<br/>• Interpretación técnica rigurosa de las pendientes y de los índices multiespectrales.<br/>• Capacidad de argumentación cuantitativa (cifras en hectáreas, porcentajes y gradientes).<br/>• Pertinencia técnica y complementariedad real entre las soluciones de Ingeniería Civil y Diseño Urbano. |
| **3. Comunicación Cartográfica (`Mapa_Sintesis_A3_grupoXX.pdf`)** | **0.85 pts** | **4.4%** | • Composición profesional A3 horizontal a 300 ppp.<br/>• Cumplimiento estricto de los 8 elementos anatómicos indispensables.<br/>• Integración armónica de información ráster (relieve/índices) y vectorial (propuesta/red hídrica).<br/>• Jerarquía visual, semiótica de color adecuada y rotulado legible con halo protector. |
| **SUBTOTAL ENTREGA TÉCNICA Y DOCUMENTO** | **3.85 pts** | **20.0%** | **Evaluación del proyecto, informe territorial y mapa A3.** |
| **4. Sustentación Oral y Defensa Individual (15 min)** | **1.15 pts** | **6.0%** | • Síntesis ejecutiva y fluidez profesional durante el pitch de 10 minutos proyectando el mapa y QGIS.<br/>• Dominio conceptual y solvencia individual de cada estudiante al responder las preguntas del profesor sobre el procesamiento y la lectura territorial. |
| **CALIFICACIÓN TOTAL INFORME FINAL (`IF`)** | **5.00 pts** | **26.0%** | **Cierre del Proyecto Integrador del Semestre.** |

---

## 6. Lista de Chequeo Final (Checklist antes de comprimir y enviar a Teams)

Antes de generar el archivo `grupoXX_IF.zip`, verifiquen minuciosamente cada punto:

- [ ] ¿El trabajo retoma, profundiza y documenta la evolución de la propuesta planteada en el **Informe 1 (I1)**?
- [ ] ¿Todas las capas vectoriales y todos los rásteres (`DEM`, pendientes, `NDVI`, `NDBI`) están en **`MAGNA-SIRGAS 2018 / Origen-Nacional (EPSG:9377)`**?
- [ ] ¿El archivo de proyecto `.qgz` tiene configuradas las **rutas relativas** (`Proyecto → Propiedades → General → Relativas`)?
- [ ] ¿Los rásteres base se encuentran dentro de la subcarpeta `raster_base/` y abren de inmediato sin enlaces rotos?
- [ ] ¿La capa `zonas_prioritarias` tiene calculado el campo `area_ha` con tipo de dato Real/Decimal?
- [ ] ¿El `Mapa_Sintesis_A3_grupoXX.pdf` fue maquetado en tamaño A3 horizontal, a escala fija redonda y exportado a 300 ppp con los 8 elementos cartográficos reglamentarios?
- [ ] ¿El `Informe_Territorial_grupoXX.pdf` tiene una extensión máxima de 5 páginas y se enfoca en el análisis territorial y la propuesta sin capturas de menús de software?
- [ ] ¿Se verificó el empaquetado descomprimiendo el archivo `.zip` en otra carpeta o computador y abriendo el `.qgz` sin errores de capas no disponibles?
- [ ] ¿Todos los integrantes del grupo están preparados para sustentar el pitch de 10 minutos y responder individualmente las preguntas técnicas de 5 minutos?
- [ ] ¿El archivo comprimido `grupoXX_IF.zip` fue cargado en Teams antes del **jueves 05 de noviembre a las 12:00 m.**?
