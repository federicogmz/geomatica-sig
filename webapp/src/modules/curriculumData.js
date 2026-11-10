/**
 * Academia Geomática & GeoLab Iguaná: Plan de Estudios Gamificado y Autónomo
 * 10 Fases de Despertar Progresivo (Fase 0 a Fase 9)
 * Articulado sobre la Cuenca de la Quebrada La Iguaná (Medellín, Colombia · EPSG:9377).
 * Cumple con estándares de diseño taste-skill: cero em-dashes.
 */

export const GLOSSARY_TERMS = [
  { term: 'Geomática', def: 'Ciencia y tecnología interdisciplinaria encargada de la adquisición, modelado, tratamiento, almacenamiento, análisis y difusión de información espacial o georreferenciada.' },
  { term: 'SIG (GIS)', def: 'Sistema de Información Geográfica. Integración organizada de hardware, software, datos geográficos, métodos y personas, diseñada para capturar, almacenar, manipular, analizar y desplegar información espacialmente referenciada.' },
  { term: 'Dato Espacial', def: 'Información que contiene una componente geométrica (coordenadas DÓNDE), una componente temática (atributos QUÉ) y una componente temporal (momento de validez CUÁNDO).' },
  { term: 'Modelo Vectorial', def: 'Estructura de datos basada en coordenadas discretas que representa el mundo mediante puntos (0D), líneas (1D) y polígonos (2D).' },
  { term: 'Modelo Ráster', def: 'Estructura de datos basada en una matriz regular continua de celdas o píxeles, donde cada celda almacena un valor representativo (ej. elevación, temperatura, reflectancia).' },
  { term: 'Geoide', def: 'Superficie equipotencial del campo de gravedad terrestre que coincide aproximadamente con el nivel medio del mar en reposo. Es la superficie de referencia para las alturas ortométricas (msnm).' },
  { term: 'Elipsoide', def: 'Figura geométrica matemática generada por la rotación de una elipse sobre su eje menor, empleada como aproximación regular de la forma de la Tierra (ej. GRS80, WGS84).' },
  { term: 'Datum Geodésico', def: 'Conjunto de parámetros que definen la posición y orientación de un elipsoide de referencia respecto al centro de masa de la Tierra (datum geocéntrico) o a un punto de tangencia local.' },
  { term: 'MAGNA-SIRGAS', def: 'Marco Geocéntrico Nacional de Referencia oficial de Colombia, densificación del sistema SIRGAS basado en el elipsoide GRS80.' },
  { term: 'CTM12 (EPSG:9377)', def: 'Proyección Transversa de Mercator con Origen Nacional único para Colombia (Resolución IGAC 471 de 2020), con meridiano central 73° W, latitud origen 4° N, Falso Este 5.000.000 m y Falso Norte 2.000.000 m.' },
  { term: 'Escala Numérica', def: 'Razón matemática (1:E) entre la distancia medida en el mapa (d) y la distancia real en el terreno (D).' },
  { term: 'Escala Gráfica', def: 'Línea segmentada graduada dibujada sobre el mapa que mantiene la relación proporcional exacta incluso cuando el documento sufre reducciones o ampliaciones (fotocopias o pantallas).' },
  { term: 'Criterio de Nyquist', def: 'Principio cartográfico que establece que el tamaño del píxel o resolución espacial (R) debe ser como máximo la mitad del tamaño característico del objeto a detectar (W): R <= W/2.' },
  { term: 'GeoPackage (.gpkg)', def: 'Estándar abierto del OGC (Open Geospatial Consortium) basado en SQLite que almacena múltiples capas vectoriales y ráster en un único archivo portable, superando las limitaciones históricas del Shapefile.' },
  { term: 'WMS', def: 'Web Map Service. Geoservicio estándar del OGC que entrega mapas georreferenciados en formato de imagen ráster (PNG/JPEG), ideal para visualización rápida de ortofotos o cartografía base.' },
  { term: 'WFS', def: 'Web Feature Service. Geoservicio estándar del OGC que transfiere las geometrías vectoriales crudas y sus tablas de atributos completas, permitiendo edición y geoprocesamiento.' },
  { term: 'Snapping (Auto-ensamblado)', def: 'Mecanismo asistido de digitalización que atrae magnéticamente el cursor del usuario al vértice, nodo o segmento más cercano dentro de un radio de tolerancia en píxeles.' },
  { term: 'Topología', def: 'Rama de la matemática y del análisis espacial que estudia las relaciones espaciales entre objetos (adyacencia, contención, conectividad) independientes de sus coordenadas métricas.' },
  { term: 'Buffer (Zona de amortiguamiento)', def: 'Operación de geoprocesamiento de proximidad que genera un polígono envolvente a una distancia métrica determinada alrededor de puntos, líneas o polígonos.' },
  { term: 'Clip (Recorte)', def: 'Operación de geoprocesamiento de extracción espacial que utiliza un polígono delimitador para recortar los elementos de otra capa que caen dentro de su perímetro.' },
  { term: 'Intersect (Intersección)', def: 'Operación de geoprocesamiento que combina las áreas compartidas entre dos capas poligonales, preservando únicamente las geometrías superpuestas y fusionando sus tablas de atributos.' },
  { term: 'Dissolve (Disolución)', def: 'Operación espacial que fusiona polígonos adyacentes o superpuestos en una única geometría continua eliminando linderos internos comunes.' },
  { term: 'DEM (MDT)', def: 'Modelo Digital de Elevación. Matriz ráster regular donde cada celda contiene el valor de altitud sobre el nivel del mar (msnm) de la superficie terrestre.' },
  { term: 'RMSE (Error Cuadrático Medio)', def: 'Parámetro estadístico estandarizado (Root Mean Square Error) que cuantifica la discrepancia entre coordenadas observadas con receptores GNSS y coordenadas oficiales de control geodésico.' },
  { term: 'NDVI (Sentinel-2 en QGIS)', def: 'Índice de Vegetación de Diferencia Normalizada calculado en la Calculadora Ráster de QGIS: (B08 - B04) / (B08 + B04), acotado en [-1.0, +1.0].' },
  { term: 'NDBI (Sentinel-2 en QGIS)', def: 'Índice Diferencial de Área Construida calculado en la Calculadora Ráster de QGIS: (B11 - B08) / (B11 + B08), empleado para mapear impermeabilización urbana.' }
];

export const CURRICULUM_STAGES = [
  {
    stageNumber: 0,
    id: 'stage_0',
    title: 'El Génesis del Espacio',
    subtitle: 'Definiciones Fundamentales & Anatomía de un SIG',
    xpReward: 50,
    unlocksDescription: 'El Lienzo Cartográfico (Canvas)',
    unlockKey: 'canvas',
    description: 'Comienza tu viaje desde cero: comprende qué es la geomática, cómo se estructura un SIG profesional y cómo se formula una pregunta territorial.',
    theory: [
      {
        title: '1. ¿Qué es la Geomática y qué es un SIG?',
        content: `La **Geomática** es la disciplina científica y técnica que integra la captura, modelado, análisis y difusión de información espacial. Integra ramas como la geodesia, la cartografía, la teledetección y los Sistemas de Información Geográfica.

Un **Sistema de Información Geográfica (SIG / GIS)** se compone de **5 pilares inseparables**:
1. **Datos:** El insumo fundamental (cartografía, censos, ortofotos, modelos de elevación).
2. **Software:** Herramientas de cálculo y visualización (QGIS, ArcGIS Pro, GeoLab).
3. **Hardware:** Computadores, servidores de cómputo, receptores satelitales GNSS.
4. **Métodos:** Procedimientos analíticos, normativas de ordenamiento (POT, IGAC) y algoritmos espaciales.
5. **Personas:** Ingenieros, planificadores y analistas que formulan preguntas espaciales para resolver problemas en el territorio.`
      },
      {
        title: '2. La Triple Dimensión del Dato Espacial',
        content: `Cualquier dato convencional se convierte en un **dato geográfico** cuando posee simultáneamente:
* **Componente Espacial / Geométrica (¿DÓNDE?):** Posición explícita respecto a un sistema de coordenadas de referencia.
* **Componente Temática o Alfanumérica (¿QUÉ?):** Atributos descriptivos asociados a la geometría (ej. caudal de 4.2 m³/s, uso del suelo residencial, material de la tubería).
* **Componente Temporal (¿CUÁNDO?):** Fecha de medición o vigencia temporal de la información.`
      },
      {
        title: '3. Dos Formas de Mirar el Mundo: Vectorial vs Ráster',
        content: `* **Modelo Vectorial:** Representa entidades discretas con límites definidos mediante geometrías exactas:
  * **Puntos (0D):** Estaciones pluviométricas, hidrantes, árboles.
  * **Líneas (1D):** Ejes de quebradas, vías de transporte, redes de acueducto.
  * **Polígonos (2D):** Límite de la cuenca hidrográfica (46.25 km²), predios catastrales, zonas de riesgo.
* **Modelo Ráster:** Representa variables territoriales continuas dividiendo el espacio en una matriz regular de celdas o píxeles. Cada celda almacena un valor escalar (ej. elevación en msnm, temperatura en °C, o reflectancia óptica).`
      }
    ],
    exercises: [
      {
        id: 'q0_1',
        type: 'select_choice',
        question: 'En un estudio hidrológico para la Cuenca de La Iguaná, ¿cuál de los siguientes elementos debe modelarse obligatoriamente mediante una geometría vectorial de tipo POLÍGONO (2D)?',
        options: [
          'El perímetro delimitador de la cuenca hidrográfica',
          'El eje del cauce principal de la quebrada',
          'La estación pluviométrica de medición de lluvia',
          'Una ortofoto satelital de 10 cm de resolución'
        ],
        expected: 'El perímetro delimitador de la cuenca hidrográfica',
        hint: 'Un polígono encierra un área con perímetro y superficie bidimensional (m² o km²).',
        explanation: 'Excelente. Una cuenca encierra un área colectora superficial (46.25 km² en La Iguaná), por lo que se representa como un polígono 2D. El cauce es una línea (1D), la estación es un punto (0D) y la ortofoto es ráster.'
      },
      {
        id: 'q0_2',
        type: 'select_choice',
        question: '¿Qué componente distingue a un Dato Geográfico frente a cualquier registro ordinario de una hoja de cálculo?',
        options: [
          'Tener coordenadas explícitas referenciadas a un sistema geodésico (DÓNDE)',
          'Tener un código o número de identificación',
          'Estar guardado en formato PDF para impresión',
          'Haber sido medido exclusivamente por satélite'
        ],
        expected: 'Tener coordenadas explícitas referenciadas a un sistema geodésico (DÓNDE)',
        hint: 'Recuerda la tríada espacial: Dónde, Qué y Cuándo.',
        explanation: 'Exacto. La georreferenciación (coordenadas ligadas a un marco de referencia geodésico) es lo que convierte a un dato ordinario en un dato espacial.'
      }
    ]
  },

  {
    stageNumber: 1,
    id: 'stage_1',
    title: 'La Forma de la Tierra y el Origen Nacional CTM12',
    subtitle: 'Geodesia, Elipsoides y Proyecciones Cartográficas',
    xpReward: 75,
    unlocksDescription: 'Monitor de Coordenadas en Vivo & Brújula',
    unlockKey: 'coords',
    description: 'Comprende la verdadera forma de la Tierra (Geoide vs Elipsoide) y por qué Colombia adoptó por ley la proyección única CTM12 (EPSG:9377).',
    theory: [
      {
        title: '1. La Forma de la Tierra: Geoide vs Elipsoide',
        content: `La Tierra no es una esfera lisa ni un cuerpo geométrico perfecto:
* **Geoide:** Es la superficie equipotencial del campo gravitatorio terrestre que coincide con el nivel medio de los océanos en reposo. Es irregular debido a variaciones de masa en la corteza terrestre. Es la superficie física para medir altitudes ortométricas reales (msnm).
* **Elipsoide de Revolución:** Es una figura geométrica matemáticamente regular creada al rotar una elipse sobre su eje polar menor. Se utiliza como marco de cálculo analítico para proyectar coordenadas (ej. elipsoide GRS80 / WGS84).`
      },
      {
        title: '2. Coordenadas Geográficas vs Planas Proyectadas',
        content: `* **Coordenadas Geográficas (Angulares):** Miden ángulos desde el centro de la Tierra:
  * **Latitud (φ):** Ángulo respecto al Ecuador (0° a 90° Norte o Sur).
  * **Longitud (λ):** Ángulo respecto a Greenwich (0° a 180° Este u Oeste). En Colombia, la longitud siempre es NEGATIVA (Oeste / W).
* **Coordenadas Planas Proyectadas (Métricas):** Proyectan el elipsoide curvo sobre un plano cartesiano cilíndrico, permitiendo medir distancias y áreas directamente en metros.`
      },
      {
        title: '3. El Origen Nacional CTM12 (EPSG:9377) de Colombia',
        content: `Mediante la Resolución IGAC 471 de 2020, Colombia unificó sus 5 antiguos husos locales en un **Origen Nacional Único**:
* **Código EPSG:** \`9377\` (MAGNA-SIRGAS / Origen Nacional)
* **Tipo de proyección:** Transversa de Mercator (CTM12)
* **Meridiano Central:** $73^\\circ 00' 00'' \\text{ W}$
* **Latitud Origen:** $4^\\circ 00' 00'' \\text{ N}$
* **Falso Este ($X_0$):** $5'000.000\\text{ metros}$
* **Falso Norte ($Y_0$):** $2'000.000\\text{ metros}$`
      }
    ],
    exercises: [
      {
        id: 'q1_1',
        type: 'calculation',
        question: 'Convierte a Grados Decimales la coordenada de longitud del nacimiento de La Iguaná en el Alto de Boquerón: 75° 39\' 14" W. Ingresa el valor en grados decimales con signo negativo:',
        unit: '°',
        expected: -75.6539,
        tolerance: 0.005,
        hint: 'Longitud decimal = -(Grados + Minutos/60 + Segundos/3600) = -(75 + 39/60 + 14/3600).',
        explanation: 'Cálculo exacto. En Colombia la longitud es siempre negativa por encontrarse al Oeste (W) del Meridiano de Greenwich: -75.6539°.'
      },
      {
        id: 'q1_2',
        type: 'select_choice',
        question: '¿Cuál es el valor oficial del Falso Este en la proyección oficial colombiana MAGNA-SIRGAS Origen Nacional CTM12 (EPSG:9377)?',
        options: [
          '5.000.000 metros',
          '1.000.000 metros',
          '2.000.000 metros',
          '500.000 metros'
        ],
        expected: '5.000.000 metros',
        hint: 'El Falso Este se fijó en 5 millones de metros para evitar coordenadas negativas en todo el territorio nacional.',
        explanation: 'Correcto. El Falso Este es 5.000.000 m (y el Falso Norte es 2.000.000 m).'
      }
    ]
  },

  {
    stageNumber: 2,
    id: 'stage_2',
    title: 'Teledetección y Mapas Base Libres',
    subtitle: 'Servicios de Teselas Web & Sensores Remotos',
    xpReward: 75,
    unlocksDescription: 'Selector de Mapas Base Libres (Esri Satélite, Topo, Dark, OSM)',
    unlockKey: 'basemaps',
    description: 'Aprende cómo operan los geoservicios de teselas piramidales web (XYZ) y cuándo utilizar imágenes ópticas satelitales frente a mapas vectoriales.',
    theory: [
      {
        title: '1. Mosaicos de Teselas Piramidales (Slippy Map Tiles)',
        content: `Los visores geográficos modernos no descargan una sola imagen gigante del planeta. Utilizan una estructura piramidal de teselas estándar (256x256 píxeles) organizadas en niveles de zoom ($Z$) y coordenadas ($X, Y$):
* **Nivel 0:** Todo el planeta en una sola tesela de 256x256 px.
* **Nivel 14 a 18:** Nivel de detalle urbano y de cuenca, donde cada nivel cuadruplica el número de teselas para garantizar renderizado instantáneo.`
      },
      {
        title: '2. Comparación de Fuentes Cartográficas de Base',
        content: `* **Esri World Imagery (Satélite Óptico):** Esencial para verificar coberturas vegetales, techos, taludes y obras civiles reales sobre el terreno.
* **Esri World Topographic (Topografía y Curvas):** Ideal para ingeniería, muestra sombreado de relieve (hillshade), drenajes y curvas de nivel.
* **Esri Dark Canvas:** Fondo neutro de alto contraste para destacar capas vectoriales temáticas sin distracciones visuales.
* **OpenStreetMap:** Cartografía comunitaria de libre acceso para verificación de nomenclatura vial y equipamientos.`
      }
    ],
    exercises: [
      {
        id: 'q2_1',
        type: 'select_choice',
        question: 'Si requieres auditar invasiones recientes de construcciones sobre la faja de retiro de una quebrada, ¿cuál mapa base ofrece la mayor evidencia visual del terreno?',
        options: [
          'Esri World Imagery (Ortofoto Satelital de Alta Resolución)',
          'Esri Dark Canvas (Lienzo Oscuro Mudo)',
          'OpenStreetMap (Vial)',
          'Esri Light Canvas (Lienzo Claro Mudo)'
        ],
        expected: 'Esri World Imagery (Ortofoto Satelital de Alta Resolución)',
        hint: 'Una imagen satelital óptica muestra la textura real de techos, explanaciones y vegetación en el terreno.',
        explanation: 'Exacto. La fotografía satelital óptica de alta resolución permite observar los techos y cortes de terreno recientes que aún no figuran en planos oficiales.'
      }
    ]
  },

  {
    stageNumber: 3,
    id: 'stage_3',
    title: 'Escalas y Métricas de Terreno',
    subtitle: 'La Trampa de la Fotocopiadora & Medición Espacial',
    xpReward: 100,
    unlocksDescription: 'Escala Gráfica Dinámica & Herramienta de Medición',
    unlockKey: 'scale_measure',
    description: 'Domina la relación matemática entre el plano y la realidad, detecta deformaciones en pantallas e impresiones y mide distancias reales sobre el terreno.',
    theory: [
      {
        title: '1. Escala Numérica vs Escala Gráfica',
        content: `* **Escala Numérica (1:N):** Relación matemática directa entre la distancia en el papel ($d$) y la distancia en el terreno real ($D$):
  $$D = d \\times N$$
* **Escala Gráfica:** Barra graduada segmentada dibujada sobre la lámina.
* **La Trampa de la Fotocopiadora:** Cuando un plano se imprime, fotocopia o visualiza en pantallas con diferente densidad de píxeles, el documento sufre reducciones o ampliaciones ópticas:
  * La **escala numérica queda invalidada** y produce graves errores de medición.
  * La **escala gráfica se agranda o encoge en la misma proporción**, conservando su validez matemática absoluta.`
      },
      {
        title: '2. Criterio de Nyquist para Resolución en Terreno',
        content: `Para identificar con certidumbre un rasgo territorial (ej. una grieta o una vivienda) sin confundirlo con ruido, la resolución del píxel ($R$) debe ser como máximo la mitad del tamaño característico del objeto ($W$):
$$R \\le \\frac{W}{2}$$
Para detectar grietas de 1.0 m en laderas se requiere un píxel menor a 0.5 metros.`
      }
    ],
    exercises: [
      {
        id: 'q3_1',
        type: 'calculation',
        question: 'En un plano con escala nominal 1:5.000, una barra de escala gráfica de 200 m medía 4.0 cm en el original. En una copia escaneada deformada la barra mide 3.8 cm. ¿A qué porcentaje exacto se redujo la copia?',
        unit: '%',
        expected: 95.0,
        tolerance: 0.5,
        hint: 'Porcentaje = (3.8 cm / 4.0 cm) * 100.',
        explanation: 'Exacto: la copia se redujo al 95%. La escala numérica 1:5.000 ya no es confiable, pero la escala gráfica sigue calibrada.'
      },
      {
        id: 'q3_2',
        type: 'interactive_measure',
        action: 'measure_stream',
        question: 'Activa la herramienta de Medición (Regla) en la barra superior y mide la distancia recta entre el nacimiento de La Iguaná (Boquerón al occidente) y la desembocadura en el Río Medellín (oriente). La distancia en línea recta ronda entre 10.0 y 11.5 km.',
        hint: 'Haz clic en "Medir" y mide de extremo oeste a extremo este de la quebrada.',
        expectedRange: [9500, 12500],
        explanation: 'Medición completada. La distancia en línea recta es de aproximadamente 10.8 km, aunque el cauce sinuoso recorre más de 15 km.'
      }
    ]
  },

  {
    stageNumber: 4,
    id: 'stage_4',
    title: 'El Territorio Vectorial de La Iguaná',
    subtitle: 'Estructuras de Datos, GeoPackage y Capas Reales',
    xpReward: 100,
    unlocksDescription: 'Panel de Capas (TOC) & Capas Vectoriales de La Iguaná',
    unlockKey: 'layers_toc',
    description: 'Explora la delimitación topográfica oficial de la cuenca (46.25 km²), sus drenajes tributarios y el estándar moderno GeoPackage (.gpkg).',
    theory: [
      {
        title: '1. ¿Qué es una Cuenca Hidrográfica?',
        content: `Una cuenca es un área territorial natural delimitada por una línea topográfica divisoria de aguas (*divortium aquarum*), cuyas escorrentías drenan hacia un único punto de salida común.
En La Iguaná:
* **Área oficial:** $46.25\\text{ km}^2$ ($38.73\\text{ km}^2$ en suelo rural de San Cristóbal y $7.52\\text{ km}^2$ en la llanura urbana de Medellín).
* **Nacimiento:** Alto de Boquerón ($2.950\\text{ msnm}$).
* **Desembocadura:** Río Medellín ($1.450\\text{ msnm}$) en Puente Colombia / Plaza Minorista.`
      },
      {
        title: '2. GeoPackage (.gpkg) frente a Shapefile (.shp)',
        content: `El formato Shapefile de 1990 tiene serias limitaciones técnicas: corta nombres de columnas a 10 caracteres, no soporta nulos verdaderos y requiere múltiples archivos (.shp, .shx, .dbf, .prj).
El estándar abierto **GeoPackage (.gpkg)** del OGC almacena múltiples capas vectoriales y ráster en un único archivo SQLite relacional, con índices espaciales R-Tree de alto rendimiento.`
      }
    ],
    exercises: [
      {
        id: 'q4_1',
        type: 'select_choice',
        question: '¿Cuál es el área territorial total oficial de la Cuenca de la Quebrada La Iguaná según los estudios del Plan de Manejo Ambiental?',
        options: [
          '46.25 km²',
          '24.10 km²',
          '105.80 km²',
          '12.50 km²'
        ],
        expected: '46.25 km²',
        hint: 'Revisa la teoría: 38.73 km² rurales + 7.52 km² urbanos.',
        explanation: 'Exacto. La cuenca posee exactamente 46.25 km² de extensión superficial.'
      }
    ]
  },

  {
    stageNumber: 5,
    id: 'stage_5',
    title: 'La Base de Datos Alfanumérica',
    subtitle: 'Tablas de Atributos & Consultas Lógicas Espaciales',
    xpReward: 125,
    unlocksDescription: 'Tabla de Atributos Drawer & Filtros Temáticos',
    unlockKey: 'attribute_table',
    description: 'Aprende a consultar la dimensión temática de la información geográfica: examina atributos, filtra equipamientos y sincroniza selecciones con el mapa.',
    theory: [
      {
        title: '1. La Tabla de Atributos Relacional',
        content: `En un SIG, cada elemento geométrico tiene una fila vinculada 1:1 en una tabla de base de datos relacional.
Los tipos de campos determinan las operaciones analíticas posibles:
* **Texto (String/Varchar):** Nombres, categorías, barrios.
* **Entero (Integer):** Conteos, número de pisos, capacidad de personas.
* **Flotante / Real (Double):** Áreas métricas, caudales, coordenadas, pendientes.`
      }
    ],
    exercises: [
      {
        id: 'q5_1',
        type: 'attribute_query',
        question: 'Abre la Tabla de Atributos (botón inferior "Tabla"). Filtra la capa "Equipamientos Comunitarios" y responde: ¿Cuántos equipamientos tienen una capacidad registrada mayor o igual a 200 personas?',
        expected: 3,
        tolerance: 0,
        hint: 'Busca la columna "capacidad" en la tabla de atributos.',
        explanation: 'Correcto. Hay 3 equipamientos de alta capacidad (Colegio Parroquial, Hospital y Centro Comunitario) en el área de La Iguaná.'
      }
    ]
  },

  {
    stageNumber: 6,
    id: 'stage_6',
    title: 'Digitalización y Control Topológico',
    subtitle: 'Snapping Magnético & Patologías Geométricas',
    xpReward: 150,
    unlocksDescription: 'Lápiz de Digitalización, Snapping e Inspector Topológico',
    unlockKey: 'digitizer_snapping',
    description: 'Aprende a capturar geometrías con calidad técnica: usa el imán de autoensamblado a 12 px para conectar nodos y erradicar dangles y solapes.',
    theory: [
      {
        title: '1. Las Tres Patologías Topológicas Fundamentales',
        content: `Al digitalizar a mano alzada sin asistencia magnética, ocurren siempre tres errores graves:
1. **Solapes / Traslapes (Must Not Overlap):** Dos polígonos comparten la misma área física. Duplica conteos prediales e impositivos.
2. **Huecos o astillas (Must Not Have Gaps):** Quedan grietas milimétricas vacías entre linderos adyacentes.
3. **Nodos colgantes (Must Not Have Dangles):** Un afluente tributario o tubería no conecta exactamente con la red receptora, rompiendo la conectividad hidrológica.`
      },
      {
        title: '2. Autoensamblado (Snapping)',
        content: `El autoensamblado magnético atrae el cursor al vértice o segmento existente más cercano cuando se aproxima dentro de una tolerancia de captura (12 a 15 píxeles), garantizando confluencias limpias.`
      }
    ],
    exercises: [
      {
        id: 'q6_1',
        type: 'interactive_draw',
        action: 'draw_tributary',
        question: 'Activa el Lápiz de Dibujo y el imán de Snapping en la barra superior. Traza una línea conectora que represente una quebrada tributaria y haz clic final sobre el cauce de La Iguaná asegurando conexión limpia.',
        hint: 'Haz clic en "Dibujar", traza 2 o 3 vértices y conéctalo al cauce principal.',
        explanation: 'Trazo topológico verificado: confluencia exacta sin extremos sueltos (dangles).'
      },
      {
        id: 'q6_2',
        type: 'topology_audit',
        action: 'run_topology_check',
        question: 'Ejecuta el Comprobador de Topología (botón "Topología") para verificar que la capa no tenga autointersecciones ni traslapes.',
        hint: 'Presiona el botón de verificación topológica.',
        explanation: 'Auditoría topológica aprobada: cero solapes y geometrías conformes a la norma QGIS.'
      }
    ]
  },

  {
    stageNumber: 7,
    id: 'stage_7',
    title: 'Geoprocesamiento Espacial en Cuencas',
    subtitle: 'Fajas de Retiro Hídrico & Análisis de Conflictos Territoriales',
    xpReward: 175,
    unlocksDescription: 'Caja de Herramientas de Geoprocesamiento (Buffer, Clip, Intersect)',
    unlockKey: 'geoprocessing',
    description: 'Aplica análisis espacial vectorial: genera la Faja de Retiro de 30 metros según el POT de Medellín y cruza con predios catastrales mediante Intersección.',
    theory: [
      {
        title: '1. Las 4 Operaciones Clave de Geoprocesamiento',
        content: `* **Buffer (Zona de Amortiguamiento):** Genera un polígono perimétrico a una distancia radial fija en metros alrededor de objetos espaciales.
* **Clip (Recorte):** Utiliza un polígono como molde para recortar otra capa, manteniendo sus atributos.
* **Intersect (Intersección):** Cruza dos capas y conserva únicamente las áreas compartidas de superposición, fusionando las columnas de ambas tablas.
* **Dissolve (Disolución):** Fusiona polígonos adyacentes eliminando linderos internos comunes.`
      },
      {
        title: '2. Faja de Protección Ambiental (POT Medellín)',
        content: `El Plan de Ordenamiento Territorial de Medellín y la legislación ambiental colombiana exigen una **faja de retiro obligatorio de 30 metros** a cada lado de las corrientes de agua para amortiguar avenidas torrenciales.`
      }
    ],
    exercises: [
      {
        id: 'q7_1',
        type: 'geoprocess_action',
        action: 'run_buffer_30m',
        question: 'Abre la Caja de Geoprocesamiento, selecciona "Buffer" sobre la Red Hídrica con una distancia de 30 metros y activa la opción Disolver.',
        expectedDistance: 30,
        hint: 'Abre "Geoprocesos" en la barra superior, fija 30 metros y ejecuta.',
        explanation: 'Faja de retiro hídrico de 30 m generada y disuelta. Representa la franja de protección legal.'
      },
      {
        id: 'q7_2',
        type: 'geoprocess_action',
        action: 'run_intersection',
        question: 'Cruza la Faja de Retiro generada con los Predios Catastrales mediante la herramienta "Intersección".',
        expectedCount: 18,
        tolerance: 5,
        hint: 'En Geoprocesos, selecciona "Intersección" entre el Buffer y los Predios.',
        explanation: 'Intersección completada: predios en conflicto territorial identificados con precisión.'
      }
    ]
  },

  {
    stageNumber: 8,
    id: 'stage_8',
    title: 'Relieve, Modelos DEM y Auditoría GNSS',
    subtitle: 'Modelos Digitales de Elevación & Control de Exactitud RMSE',
    xpReward: 200,
    unlocksDescription: 'Perfil Topográfico de La Iguaná & Auditor GNSS RMSE',
    unlockKey: 'dem_gnss',
    description: 'Analiza el perfil de 1.500 m de desnivel en La Iguaná, calcula su pendiente longitudinal media y audita la exactitud horizontal de mediciones satelitales.',
    theory: [
      {
        title: '1. El Desnivel Torrencial de La Iguaná',
        content: `La Quebrada La Iguaná desciende desde los 2.950 msnm en el Alto de Boquerón hasta los 1.450 msnm en el Río Medellín, experimentando un desnivel vertical de 1.500 metros en solo 15 kilómetros de recorrido longitudinal.
Esta condición le confiere una pendiente longitudinal media del 10.0%, clasificándola como corriente de alta torrencialidad.`
      },
      {
        title: '2. Error Cuadrático Medio Horizontal (RMSE)',
        content: `El RMSE horizontal cuantifica la exactitud posicional respecto a coordenadas de control geodésico del IGAC:
$$\\text{RMSE}_r = \\sqrt{\\frac{1}{n} \\sum_{i=1}^n \\left[(X_{\\text{gnss}} - X_{\\text{oficial}})^2 + (Y_{\\text{gnss}} - Y_{\\text{oficial}})^2\\right]}$$
Para consultoría territorial a escala 1:5.000 se exige un $\\text{RMSE}_r \\le 3.5\\text{ m}$.`
      }
    ],
    exercises: [
      {
        id: 'q8_1',
        type: 'calculation',
        question: 'Si el cauce desciende 1.500 metros en una distancia horizontal de 15.000 metros (15 km), ¿cuál es su pendiente longitudinal media en porcentaje?',
        unit: '%',
        expected: 10.0,
        tolerance: 0.5,
        hint: 'Pendiente % = (1500 / 15000) * 100.',
        explanation: 'Cálculo exacto: 10.0% de pendiente longitudinal media, índice de alta torrencialidad.'
      },
      {
        id: 'q8_2',
        type: 'calculation',
        question: 'En una auditoría GNSS con n=3 vértices, la suma de discrepancias cuadráticas [(DX)² + (DY)²] dio 17.20 m². ¿Cuál es el RMSE horizontal en metros?',
        unit: 'm',
        expected: 2.39,
        tolerance: 0.05,
        hint: 'RMSE = sqrt(17.20 / 3) = sqrt(5.733).',
        explanation: 'RMSE = 2.39 metros. Cumple con la tolerancia para cartografía técnica a escala 1:5.000.'
      }
    ]
  },

  {
    stageNumber: 9,
    id: 'stage_9',
    title: 'Compositor Cartográfico y Certificación Final',
    subtitle: 'Norma Técnica IGAC & Acta Oficial con Hash SHA-256',
    xpReward: 250,
    unlocksDescription: 'Compositor de Lámina A3 & Acta Oficial de Calificaciones',
    unlockKey: 'composer_acta',
    description: 'Genera la lámina cartográfica formal para presentación ejecutiva y emite tu Acta Oficial de Calificación firmada con hash SHA-256 inmutable.',
    theory: [
      {
        title: '1. Los 5 Elementos Obligatorios de un Plano Técnico',
        content: `Según los estándares del IGAC y de consultoría en ingeniería, todo plano debe incorporar:
1. **Lienzo Principal:** Proyección CTM12 declarada (EPSG:9377).
2. **Grilla Métrica de Coordenadas:** Rotulada en Este y Norte.
3. **Escala Gráfica y Numérica:** Barra graduada de comprobación.
4. **Norte Geodésico:** Flecha de orientación.
5. **Cajetín Institucional:** Título, autores, código, escala, fecha y fuentes oficiales.`
      }
    ],
    exercises: [
      {
        id: 'q9_1',
        type: 'composer_export',
        action: 'generate_certificate',
        question: 'Abre el Compositor de Lámina A3, descarga la lámina técnica en PDF y genera tu Acta Oficial de Calificación con código SHA-256 para someterla en Teams.',
        hint: 'Abre "Lámina A3" en la barra superior y luego "Acta / Notas".',
        explanation: 'Felicitaciones. Has culminado exitosamente todas las fases del laboratorio autónomo de Geomática, Ingeniería y SIG.'
      }
    ]
  }
];

// Alias para compatibilidad con el generador de actas
export const CURRICULUM_MODULES = CURRICULUM_STAGES.map(s => ({
  ...s,
  code: `Fase ${s.stageNumber}`
}));
