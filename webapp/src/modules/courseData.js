/**
 * courseData.js · Base de Conocimiento Completa del Curso (Semestre 2027-1)
 * Pregrados: Ingeniería Civil & Diseño Urbano y Gestión del Hábitat (EAFIT)
 * Cuenca Escuela Oficial: Cuenca Quebrada La Iguaná (Medellín · 46.25 km²)
 * Portafolio Evaluativo Individual: 30 Unidades Territoriales (U01 a U30)
 * Marco Oficial: MAGNA-SIRGAS Origen Nacional CTM12 (EPSG:9377, Res. IGAC 471/2020)
 * Horario: Jueves 12:00 m. – 4:30 p.m. (Sub-bloque 1 QGIS LTR + Pausa Activa + Sub-bloque 2 Espejo ArcGIS Pro)
 * 7 Módulos (M0–M6) · 16 Clases Teóricas (S01–S16) · 16 Talleres Prácticos (G01–G16)
 * 5 Hitos Evaluativos Oficiales 100% Individuales (5 × 20% = 100%)
 */

export const COURSE_INFO = {
  name: 'Geomática, Ingeniería y Sistemas de Información Geográfica',
  code: 'GEOMATICA-SIG-EAFIT',
  semester: '2027-1',
  institution: 'Universidad EAFIT · Escuela de Ciencias Aplicadas e Ingeniería',
  programs: ['Ingeniería Civil', 'Diseño Urbano y Gestión del Hábitat'],
  territory: 'Cuenca de la Quebrada La Iguaná (Cuenca Escuela Oficial · 46.25 km²)',
  crs: 'MAGNA-SIRGAS / Origen Nacional CTM12 (EPSG:9377)',
  resolution: 'Resolución IGAC 471 de 2020',
  durationWeeks: 16,
  totalHours: 72,
  weeklyHours: 4.5,
  schedule: {
    day: 'Jueves',
    nominalWindow: '12:00 m. – 4:30 p.m.',
    roomType: 'Sala de Cómputo EAFIT (QGIS LTR + ArcGIS Pro)',
    subblock1: '12:00 m. – 1:50 p.m. (110 min: Fundamento conceptual + Modelado en QGIS LTR sobre Cuenca Escuela La Iguaná)',
    activeBreak: '1:50 p.m. – 2:10 p.m. (20 min: Pausa activa pedagógica y almuerzo ligero)',
    subblock2: '2:10 p.m. – 4:30 p.m. (140 min: Espejo corporativo en ArcGIS Pro + Aplicación a unidad territorial individual U01–U30 + Cierre C:\\Temp -> .zip)',
    startDate: '2027-01-21',
    endDate: '2027-05-13'
  },
  territorialDesign: {
    modality: '100% Individual',
    teachingWatershed: 'Cuenca de la Quebrada La Iguaná (Medellín, 46.25 km² — exclusiva para demostraciones del profesor y GeoLab WebGIS; prohibida como asignación estudiantil)',
    portfolioUnits: '30 Unidades Territoriales Únicas (U01 a U30 sobre 10 Quebradas del Valle de Aburrá)',
    crs: 'EPSG:9377'
  }
};

export const MODULES_DATA = [
  {
    id: 'M0',
    number: 0,
    title: 'Fundamentos Cartográficos, Geodesia y Territorio Base',
    weeks: [1, 2, 3],
    badgeColor: '#10B981',
    description: 'Lectura de mapas, escala numérica y gráfica, resolución espacial, geodesia en Colombia, Datum Bogotá vs MAGNA-SIRGAS y Origen Nacional CTM12 (EPSG:9377).'
  },
  {
    id: 'M1',
    number: 1,
    title: 'SIG Vectorial, Topología y Bases Espaciales (.gpkg & .gdb)',
    weeks: [4, 5, 6, 7, 8, 9],
    badgeColor: '#3B82F6',
    description: 'Arquitectura en espejo QGIS LTR (.gpkg) + ArcGIS Pro (File Geodatabase .gdb, Feature Datasets, Subtipos y Dominios), geoservicios WMS/WFS/REST, snapping, geoprocesamiento (Buffer 30+D m, Intersect) y auditoría topológica.'
  },
  {
    id: 'M2',
    number: 2,
    title: 'SIG Ráster y Morfometría del Relieve (QGIS + Spatial Analyst)',
    weeks: [10, 11],
    badgeColor: '#F59E0B',
    description: 'Modelos Digitales de Elevación (DEM Copernicus y ALOS PALSAR 12.5 m), control estricto NoData = -9999, reproyección bilineal a EPSG:9377, pendientes POT, sombreado hillshade, álgebra ráster y perfiles longitudinales.'
  },
  {
    id: 'M3',
    number: 3,
    title: 'Posicionamiento Satelital GNSS y Control de Calidad (HDOP / RMSE)',
    weeks: [12],
    badgeColor: '#8B5CF6',
    description: 'Constelaciones GNSS, trilateración, dilución de precisión (HDOP <= 2.0), multipath en cañones urbanos, importación en QGIS y ArcGIS Pro (XY Table To Point) y validación posicional RMSE contra vértices IGAC.'
  },
  {
    id: 'M4',
    number: 4,
    title: 'Teledetección Sentinel-2 (18NVL) e Índices Espectrales (NDVI / NDBI)',
    weeks: [13, 14],
    badgeColor: '#EC4899',
    description: 'Física de la teledetección, firmas espectrales, escena Sentinel-2 MSI L2A MGRS 18NVL (10 m y 20 m), combinaciones RGB/CIR e índices NDVI y NDBI en QGIS y Spatial Analyst de ArcGIS Pro (Hito 4).'
  },
  {
    id: 'M5',
    number: 5,
    title: 'Automatización Espacial Visual (ModelBuilder .atbx & .model3)',
    weeks: [15],
    badgeColor: '#06B6D4',
    description: 'Grafos dirigidos de geoprocesamiento reproducible: diseño, parametrización y validación de flujos multicriterio en ModelBuilder de ArcGIS Pro (.atbx) y Diseñador Gráfico de Modelos de QGIS (.model3).'
  },
  {
    id: 'M6',
    number: 6,
    title: 'Cierre Integrador: Hito 5 Proyecto Final Individual y Pitch Ejecutivo',
    weeks: [16],
    badgeColor: '#EF4444',
    description: 'Integración interdisciplinar sobre la unidad territorial asignada, automatización dual con ModelBuilder (.atbx) y Diseñador Gráfico (.model3), Dossier Infográfico A3 y Pitch Ejecutivo Relámpago (4 + 3 min).'
  }
];

export const EVALUATIONS_DATA = [
  {
    code: 'H1',
    title: 'Hito 1: Taller Evaluativo 1 en Sala — Geodesia EPSG:9377 y Bases Espaciales (.gpkg / .gdb)',
    weight: 20,
    week: 5,
    type: 'individual',
    date: '2027-02-18',
    coveredWeeks: 'S01–S04',
    aiTier: 'P',
    outcomes: ['RAA1', 'RAA2'],
    guideRef: 'G05'
  },
  {
    code: 'H2',
    title: 'Hito 2: Evaluación Práctica Integradora 1 — Topología, Geoprocesamiento Vectorial y Salida A3',
    weight: 20,
    week: 8,
    type: 'individual',
    date: '2027-03-11',
    coveredWeeks: 'S05–S07',
    aiTier: 'P',
    outcomes: ['RAA1', 'RAA2'],
    guideRef: 'G08'
  },
  {
    code: 'H3',
    title: 'Hito 3: Avance 1 Individual del Proyecto — Línea Base Vectorial (.gpkg + .gdb), Lámina A3 y Estación en Vivo',
    weight: 20,
    week: 9,
    type: 'individual',
    date: '2027-03-18',
    coveredWeeks: 'S01–S08',
    aiTier: 'D',
    outcomes: ['RAA1', 'RAA2', 'RAA4'],
    guideRef: 'G09'
  },
  {
    code: 'H4',
    title: 'Hito 4: Evaluación Práctica Integradora 2 — Terreno (DEM), GNSS (HDOP) e Índices Sentinel-2',
    weight: 20,
    week: 14,
    type: 'individual',
    date: '2027-04-29',
    coveredWeeks: 'S10–S13',
    aiTier: 'P',
    outcomes: ['RAA3'],
    guideRef: 'G14'
  },
  {
    code: 'H5',
    title: 'Hito 5: Proyecto Final Individual Multicriterio — Automatización ModelBuilder (.atbx), Dossier A3 y Pitch Ejecutivo',
    weight: 20,
    week: 16,
    type: 'individual',
    date: '2027-05-13',
    coveredWeeks: 'S01–S15',
    aiTier: 'O',
    outcomes: ['RAA1', 'RAA2', 'RAA3', 'RAA4'],
    guideRef: 'G16'
  }
];

export const BADGES_CATALOG = [
  { id: 'first_steps', name: 'Iniciado Territorial', icon: '🌱', description: 'Completaste la primera lección conceptual del curso.', xpReward: 50 },
  { id: 'ctm12_master', name: 'Pionero CTM12', icon: '🧭', description: 'Comprendiste el Origen Nacional único de Colombia (EPSG:9377).', xpReward: 75 },
  { id: 'scale_detective', name: 'Detector de Deformación', icon: '📏', description: 'Descubriste la trampa de la fotocopiadora con la escala gráfica.', xpReward: 75 },
  { id: 'gpkg_architect', name: 'Arquitecto GeoPackage', icon: '📦', description: 'Creaste y estructuraste un contenedor .gpkg en EPSG:9377 sin shapefiles.', xpReward: 100 },
  { id: 'zero_dangles', name: 'Cero Dangles & Solapes', icon: '🧲', description: 'Digitalizaste con snapping magnético a 12 px y aprobaste la auditoría topológica.', xpReward: 125 },
  { id: 'buffer_protector', name: 'Guardián de la Faja de Retiro', icon: '🛡️', description: 'Generaste el retiro legal de 30 m del POT e identificaste predios en conflicto.', xpReward: 125 },
  { id: 'dem_climber', name: 'Conquistador de Boquerón', icon: '⛰️', description: 'Analizaste el perfil de 1.500 m de desnivel y la pendiente del 10% en La Iguaná.', xpReward: 150 },
  { id: 'gnss_auditor', name: 'Explorador GNSS', icon: '🎯', description: 'Comprendiste la trilateración satelital, el DOP y la corrección diferencial RTK.', xpReward: 150 },
  { id: 's2_explorer', name: 'Cazador Espectral Sentinel-2', icon: '🛰️', description: 'Calculaste los índices NDVI y NDBI con Sentinel-2 en la Calculadora Ráster de QGIS.', xpReward: 175 },
  { id: 'model_builder', name: 'Ingeniero de Flujos Automatizados', icon: '⚙️', description: 'Diseñaste un modelo de geoprocesamiento encadenado en ModelBuilder / QGIS.', xpReward: 175 },
  { id: 'master_cartographer', name: 'Cartógrafo Oficial A3', icon: '🖨️', description: 'Diseñaste una lámina técnica A3 formal con grilla métrica bajo norma IGAC.', xpReward: 200 },
  { id: 'geomatics_champion', name: 'Maestro Geomático EAFIT', icon: '🏆', description: 'Culminaste el 100% de los módulos y emitiste tu Acta Oficial con SHA-256.', xpReward: 300 }
];

export const THEORY_WEEKS = [
  {
    week: 1,
    moduleId: 'M0',
    title: 'Introducción a la Geomática & Reconocimiento de La Iguaná',
    subtitle: '¿Qué es la geomática? Los 5 pilares de un SIG y el territorio continuo',
    readingTime: '15 min',
    objectives: [
      'Definir qué es la geomática y diferenciarla de la topografía clásica y la cartografía.',
      'Identificar los 5 pilares inseparables de un SIG (datos, software, hardware, métodos y personas).',
      'Reconocer las características físicas, altitudinales y de gradiente urbano-rural de la Cuenca de La Iguaná (46.25 km²).'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. ¿Qué es la Geomática?</h3>
        <p>
          La <strong>Geomática</strong> es la disciplina científica y tecnológica que integra la captura, modelado, almacenamiento, análisis, gestión y difusión de información espacial georreferenciada. Nace de la convergencia de la <em>geodesia</em>, la <em>topografía</em>, la <em>cartografía</em>, la <em>teledetección</em> y las tecnologías de la información.
        </p>

        <div class="callout-card tip">
          <div class="callout-icon">💡</div>
          <div class="callout-content">
            <strong>La Pregunta Espacial:</strong> Un dato ordinario responde a <em>¿Qué?</em> (ej. caudal = 4.5 m³/s). Un dato geomático responde simultáneamente a <em>¿DÓNDE?</em> (coordenadas referenciadas a un elipsoide), <em>¿QUÉ?</em> (atributos descriptivos) y <em>¿CUÁNDO?</em> (momento temporal de captura).
          </div>
        </div>

        <h3>2. Los 5 Pilares Fundamentales de un SIG</h3>
        <p>Un Sistema de Información Geográfica no es solo un programa de computadora. Es una arquitectura simbiótica compuesta por:</p>
        <ol>
          <li><strong>Datos:</strong> El insumo vital (vectores, rásteres, nubes LiDAR, ortofotos, tablas censales). Sin datos de calidad, ningún algoritmo produce respuestas confiables (<em>Garbage In, Garbage Out</em>).</li>
          <li><strong>Software:</strong> Motores de renderizado, teledetección y geoprocesamiento analítico (QGIS, ArcGIS Pro, GeoLab).</li>
          <li><strong>Hardware:</strong> Estaciones de trabajo, procesadores multinúcleo, servidores de mapas y receptores GNSS.</li>
          <li><strong>Métodos y Normativas:</strong> Algoritmos, modelos matemáticos, leyes territoriales (POT, Decretos del IGAC, manuales de cuencas).</li>
          <li><strong>Personas:</strong> Ingenieros y diseñadores urbanos que formulan preguntas territoriales complejas y toman decisiones.</li>
        </ol>

        <h3>3. El Territorio Central del Curso: Cuenca de La Iguaná</h3>
        <p>
          A diferencia de cursos abstractos con datos desarticulados, nuestro semestre completo trabaja sobre un territorio real, continuo y desafiante: la <strong>Cuenca de la Quebrada La Iguaná</strong> en Medellín.
        </p>
        <ul>
          <li><strong>Área Total:</strong> 46.25 km² (38.73 km² en zona rural de San Cristóbal y 7.52 km² en área urbana densa).</li>
          <li><strong>Nacimiento:</strong> Alto de Boquerón (2.950 msnm), zona boscosa y nubosa de alta pendiente.</li>
          <li><strong>Desembocadura:</strong> Río Medellín (1.450 msnm), frente a la Plaza Minorista y la Quebrada Santa Elena.</li>
          <li><strong>Desnivel Vertical:</strong> 1.500 metros en solo 15 kilómetros de recorrido longitudinal, con pendiente media del 10.0%, convirtiéndola en una corriente de alta torrencialidad histórica.</li>
        </ul>
      </div>
    `,
    quiz: {
      question: '¿Qué componente convierte a un simple registro numérico en un Dato Geográfico profesional?',
      options: [
        'Estar almacenado en formato PDF de alta resolución',
        'Poseer coordenadas espaciales explícitas respecto a un marco de referencia geodésico (DÓNDE)',
        'Tener un identificador numérico consecutivo en Excel',
        'Haber sido medido exclusivamente con un teléfono celular'
      ],
      correctIndex: 1,
      hint: 'Recuerda la triple dimensión: Dónde, Qué y Cuándo.',
      explanation: '¡Exacto! La georreferenciación (coordenadas ligadas a un marco geodésico como MAGNA-SIRGAS CTM12) es la componente esencial que define al dato espacial.'
    }
  },
  {
    week: 2,
    moduleId: 'M0',
    title: 'Escalas, Resolución Espacial & Coordenadas Geográficas',
    subtitle: 'La Trampa de la Fotocopiadora, el Criterio de Nyquist y la conversión GMS ↔ Decimal',
    readingTime: '18 min',
    objectives: [
      'Comprender la diferencia matemática y el comportamiento ante deformaciones de la escala numérica vs. la escala gráfica.',
      'Aplicar el Criterio de Nyquist para determinar la resolución de píxel requerida según el objeto territorial a estudiar.',
      'Dominar la conversión manual y automatizada de coordenadas geográficas sexagesimales (GMS) a grados decimales.'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. Escala Numérica vs. Escala Gráfica: La Trampa de la Fotocopiadora</h3>
        <p>
          La <strong>Escala Numérica (1:N)</strong> es la razón matemática adimensional entre la distancia medida sobre el plano ($d$) y la distancia real sobre el terreno ($D$):
        </p>
        <div class="formula-box">
          $$D = d \\times N$$
        </div>
        <p>
          Si mides $4.0\\text{ cm}$ en un plano $1:5.000$, la distancia real es $4.0\\text{ cm} \\times 5.000 = 20.000\\text{ cm} = 200\\text{ m}$.
        </p>

        <div class="callout-card warning">
          <div class="callout-icon">⚠️</div>
          <div class="callout-content">
            <strong>La Trampa de la Fotocopiadora:</strong> Cuando un plano técnico se imprime en un formato diferente (ej. de A1 a A3), se fotocopia con zoom o se proyecta en una pantalla con distinta densidad de píxeles, la hoja se agranda o encoge:
            <ul>
              <li><strong>La escala numérica se destruye:</strong> el texto que dice "1:5.000" ya no coincide con la realidad métrica.</li>
              <li><strong>La escala gráfica se salva:</strong> como es una barra dibujada sobre el mismo papel, se agranda o encoge exactamente en la misma proporción que el resto del plano, conservando su precisión métrica absoluta.</li>
            </ul>
          </div>
        </div>

        <h3>2. Resolución Espacial y Criterio de Nyquist</h3>
        <p>
          En teledetección y modelos ráster, la <strong>resolución espacial</strong> corresponde al tamaño del lado del píxel proyectado en el suelo ($R$). Según el <em>Criterio de Nyquist</em>, para detectar un objeto territorial de ancho característico $W$ sin confundirlo con ruido de fondo:
        </p>
        <div class="formula-box">
          $$R \\le \\frac{W}{2}$$
        </div>
        <p>
          Si deseas mapear viviendas informales de $6\\text{ metros}$ de ancho en la ladera de Robledo, requieres un sensor con resolución espacial máxima de $3\\text{ metros}$ (ej. Sentinel-2 con píxel de 10 m es insuficiente; se requiere ortofoto o PlanetScope).
        </p>

        <h3>3. Coordenadas Geográficas: Sexagesimales (GMS) ↔ Grados Decimales</h3>
        <p>
          Las coordenadas angulares miden la posición sobre el elipsoide en Grados (°), Minutos (') y Segundos ("):
        </p>
        <div class="formula-box">
          $$\\text{Grados Decimales} = \\pm \\left(\\text{Grados} + \\frac{\\text{Minutos}}{60} + \\frac{\\text{Segundos}}{3600}\\right)$$
        </div>
        <p>
          <strong>Regla de Signos:</strong> Norte ($+$), Sur ($-$), Este ($+$), Oeste/West ($-$). En Colombia, toda la longitud territorial se encuentra al Oeste de Greenwich, por lo que <em>la longitud en grados decimales es siempre negativa</em>.
        </p>
      </div>
    `,
    quiz: {
      question: 'El Alto de Boquerón se ubica a 75° 39\' 14" W. ¿Cuál es su valor exacto en Grados Decimales?',
      options: [
        '+75.6539°',
        '-75.6539°',
        '-75.3914°',
        '-76.1200°'
      ],
      correctIndex: 1,
      hint: 'Longitud = -(75 + 39/60 + 14/3600). Debe llevar signo negativo por ser Oeste (W).',
      explanation: '¡Excelente! 75 + 0.65 + 0.00388 = 75.6539°, y por ser longitud Oeste (W) respecto a Greenwich, su valor matemático es -75.6539°.'
    }
  },
  {
    week: 3,
    moduleId: 'M0',
    title: 'Geodesia, Datum Bogotá a MAGNA-SIRGAS & CTM12',
    subtitle: 'Elipsoide vs Geoide, Resolución 471/2020 del IGAC y el Origen Nacional Único (EPSG:9377)',
    readingTime: '20 min',
    objectives: [
      'Distinguir la superficie física del Geoide frente a la superficie matemática del Elipsoide.',
      'Comprender la evolución geodésica de Colombia desde el Datum Bogotá (1941) hasta MAGNA-SIRGAS.',
      'Dominar los parámetros y la justificación técnica del Origen Nacional CTM12 (EPSG:9377).'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. La Verdadera Forma de la Tierra: Geoide vs. Elipsoide</h3>
        <p>
          La Tierra no es plana ni esférica. En geodesia distinguimos tres superficies:
        </p>
        <ul>
          <li><strong>Superficie Topográfica:</strong> El relieve físico real (montañas, valles, depresiones) donde caminamos.</li>
          <li><strong>Geoide:</strong> Superficie equipotencial del campo gravitatorio terrestre que coincide aproximadamente con el nivel medio del mar en reposo. Es irregular debido a variaciones de densidad de masa en la corteza. Es la superficie de referencia para medir <em>alturas ortométricas</em> ($H$, en msnm).</li>
          <li><strong>Elipsoide de Revolución:</strong> Cuerpo geométrico regular generado al rotar una elipse sobre su eje polar menor (ej. GRS80 o WGS84). Se usa como marco matemático para calcular coordenadas planas y geográficas.</li>
        </ul>

        <h3>2. Evolución del Datum Geodésico en Colombia</h3>
        <p>
          Un <strong>Datum Geodésico</strong> es un conjunto de parámetros que definen la posición y orientación de un elipsoide respecto a la Tierra:
        </p>
        <ul>
          <li><strong>Datum Bogotá (1941):</strong> Datum local clásico con origen topocéntrico en el Observatorio Astronómico de Bogotá, elipsoide Internacional de Hayford 1924. Presentaba discrepancias de hasta 500 metros frente a sistemas satelitales modernos.</li>
          <li><strong>MAGNA-SIRGAS (Marco Geocéntrico Nacional de Referencia):</strong> Adoptado a inicios de los 2000, es la densificación de SIRGAS para Colombia, con origen en el centro de masas terrestre (geocéntrico) y elipsoide GRS80.</li>
        </ul>

        <h3>3. La Revolución del Origen Nacional CTM12 (EPSG:9377)</h3>
        <p>
          Históricamente, Colombia dividía su territorio en 5 orígenes locales cartográficos (Bogotá-Magna, Este Central, Este Este, Oeste, Oeste Oeste). Esto provocaba que un proyecto lineal (vías, oleoductos o cuencas intermunicipales) sufriera saltos de coordenadas catastróficos al cruzar de un huso a otro.
        </p>
        <p>
          Mediante la <strong>Resolución IGAC 471 de 2020</strong>, se estableció un <strong>Origen Nacional Único</strong> para todo el territorio colombiano:
        </p>
        <div class="kpi-grid">
          <div class="kpi-mini-card">
            <span class="label">Código EPSG</span>
            <span class="val">9377</span>
          </div>
          <div class="kpi-mini-card">
            <span class="label">Proyección</span>
            <span class="val">Transversa de Mercator</span>
          </div>
          <div class="kpi-mini-card">
            <span class="label">Meridiano Central</span>
            <span class="val">73° 00' 00" W</span>
          </div>
          <div class="kpi-mini-card">
            <span class="label">Latitud Origen</span>
            <span class="val">4° 00' 00" N</span>
          </div>
          <div class="kpi-mini-card">
            <span class="label">Falso Este (X₀)</span>
            <span class="val">5'000.000 m</span>
          </div>
          <div class="kpi-mini-card">
            <span class="label">Falso Norte (Y₀)</span>
            <span class="val">2'000.000 m</span>
          </div>
        </div>
      </div>
    `,
    quiz: {
      question: '¿Por qué se asignó un Falso Este de 5.000.000 m y un Falso Norte de 2.000.000 m en el CTM12?',
      options: [
        'Para que las coordenadas en Medellín coincidan exactamente con la altitud sobre el nivel del mar',
        'Para evitar coordenadas negativas en cualquier rincón del territorio continental e insular colombiano',
        'Porque es la distancia en metros entre Bogotá y Washington D.C.',
        'Fue una decisión aleatoria sin fundamento geodésico'
      ],
      correctIndex: 1,
      hint: 'Al sumar valores altos de traslación cartesiana, ninguna coordenada en Colombia resulta negativa.',
      explanation: '¡Correcto! Los falsos orígenes garantizan que todas las coordenadas Este y Norte en Colombia continental, San Andrés y aguas territoriales sean siempre números positivos.'
    }
  },
  {
    week: 4,
    moduleId: 'M1',
    title: 'Entorno QGIS, Contenedor GeoPackage & Geoservicios WMS/WMTS',
    subtitle: 'Adiós al Shapefile, rutas relativas y conexión a Infraestructuras de Datos Espaciales',
    readingTime: '16 min',
    objectives: [
      'Configurar adecuadamente la interfaz de QGIS LTR y el CRS de proyecto en EPSG:9377.',
      'Crear y gestionar un contenedor GeoPackage (.gpkg) eliminando el uso de Shapefiles sueltos.',
      'Consumir servicios de teselas de mapas web (WMS y WMTS) de GeoMedellín, AMVA y el IGAC.'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. Por qué la industria abandonó el Shapefile (.shp)</h3>
        <p>
          El formato Shapefile fue creado por ESRI a inicios de los años 90. Aunque sigue siendo muy popular, impone restricciones técnicas inaceptables para la ingeniería moderna:
        </p>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Característica</th>
              <th>Shapefile (.shp)</th>
              <th>GeoPackage (.gpkg) - Estándar OGC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Estructura</td>
              <td>Requiere entre 3 y 8 archivos sueltos (.shp, .shx, .dbf, .prj...)</td>
              <td>1 solo archivo SQLite autocontenido y portable</td>
            </tr>
            <tr>
              <td>Nombres de columnas</td>
              <td>Truncados a solo 10 caracteres</td>
              <td>Longitud ilimitada con soporte UTF-8 completo</td>
            </tr>
            <tr>
              <td>Límite de tamaño</td>
              <td>Máximo 2 GB por archivo</td>
              <td>Hasta 140 Terabytes</td>
            </tr>
            <tr>
              <td>Múltiples capas</td>
              <td>1 sola capa por archivo</td>
              <td>Múltiples capas vectoriales y ráster con índices R-Tree</td>
            </tr>
          </tbody>
        </table>

        <h3>2. Guardado con Rutas Relativas</h3>
        <p>
          En QGIS es mandatorio configurar en <em>Proyecto → Propiedades → General → Guardar rutas: Relativas</em>. Esto garantiza que al mover la carpeta del proyecto a otra computadora o memoria USB, QGIS encuentre todas las capas sin romper los enlaces de archivo.
        </p>

        <h3>3. Geoservicios Estándar OGC: WMS y WMTS</h3>
        <p>
          Un <strong>Web Map Service (WMS)</strong> genera imágenes ráster georreferenciadas (PNG o JPEG) en tiempo real desde los servidores de las entidades oficiales. Permite consultar ortofotos de alta resolución de GeoMedellín sin descargar gigabytes de archivos locales.
        </p>
      </div>
    `,
    quiz: {
      question: '¿Cuál es una ventaja crítica del formato GeoPackage (.gpkg) sobre el antiguo Shapefile?',
      options: [
        'Permite almacenar múltiples capas vectoriales y ráster en un único archivo sin truncar nombres de atributos',
        'Solo funciona en computadoras con procesadores de 64 núcleos',
        'Hace que el mapa se imprima automáticamente en papel bond',
        'Elimina la necesidad de conocer el sistema de coordenadas'
      ],
      correctIndex: 0,
      hint: 'Revisa la tabla comparativa: 1 solo archivo SQLite vs múltiples archivos sueltos.',
      explanation: '¡Excelente! GeoPackage es un estándar abierto del OGC basado en SQLite que supera los límites de 2GB y el truncamiento de 10 caracteres del Shapefile.'
    }
  },
  {
    week: 5,
    moduleId: 'M1',
    title: 'Geometrías Vectoriales, Auto-ensamblado & Topología',
    subtitle: 'Puntos, líneas, polígonos, imán de snapping y eliminación de patologías geométricas',
    readingTime: '18 min',
    objectives: [
      'Comprender las dimensiones geométricas vectoriales (0D, 1D y 2D).',
      'Configurar la barra de auto-ensamblado (snapping) con tolerancia en píxeles.',
      'Identificar las tres patologías topológicas clásicas: solapes, huecos y nodos colgantes (dangles).'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. Las Dimensiones del Modelo Vectorial</h3>
        <ul>
          <li><strong>Puntos (0D):</strong> Coordenadas individuales $(X, Y)$ que representan entidades discretas sin longitud ni área (estaciones pluviométricas de SIATA, hidrantes, luminarias).</li>
          <li><strong>Líneas / Cadenas de líneas (1D):</strong> Sucesión conectada de vértices con longitud pero sin ancho superficial (eje del cauce de La Iguaná, tuberías de acueducto, vías).</li>
          <li><strong>Polígonos (2D):</strong> Anillo cerrado de vértices con perímetro y área superficial (cuenca de 46.25 km², lotes catastrales, manchas de inundación).</li>
        </ul>

        <h3>2. Auto-ensamblado (Snapping) Magnético</h3>
        <p>
          Al digitalizar con el ratón a simple vista, es imposible conectar dos líneas de manera exacta. El <strong>Snapping</strong> atrae el cursor al vértice o segmento existente más cercano dentro de un radio de tolerancia:
        </p>
        <div class="callout-card tip">
          <div class="callout-icon">🧲</div>
          <div class="callout-content">
            <strong>Regla de Oro en QGIS:</strong> Configurar siempre la tolerancia de snapping en <strong>píxeles de pantalla (ej. 12 a 15 px)</strong> en vez de metros, para que el enganche responda con naturalidad independientemente del nivel de zoom.
          </div>
        </div>

        <h3>3. Las Tres Patologías Topológicas</h3>
        <ol>
          <li><strong>Superposiciones / Traslapes (Must Not Overlap):</strong> Dos polígonos vecinos pisan la misma área física. En catastro o zonificación, esto duplica impuestos o cálculos de riesgo.</li>
          <li><strong>Huecos o Astillas (Must Not Have Gaps):</strong> Grietas vacías microscópicas entre predios colindantes.</li>
          <li><strong>Nodos Colgantes (Must Not Have Dangles):</strong> Un drenaje tributario no toca el cauce principal, interrumpiendo el flujo hidrológico continuo.</li>
        </ol>
      </div>
    `,
    quiz: {
      question: 'Si un afluente tributario se digitaliza sin tocar el cauce de la quebrada por 2 milímetros, ¿qué patología topológica se genera?',
      options: [
        'Solape superficial (Overlap)',
        'Extremo suelto o nodo colgante (Dangle)',
        'Autointersección (Bowtie)',
        'Inversión polar magnética'
      ],
      correctIndex: 1,
      hint: 'Un extremo que queda en el aire sin conectarse con la red se llama "colgante".',
      explanation: '¡Correcto! Se produce un nodo colgante (Dangle), lo cual rompe la conectividad hidrológica y de redes en el SIG.'
    }
  },
  {
    week: 6,
    moduleId: 'M1',
    title: 'Tablas de Atributos, Calculadora de Campos & Simbología',
    subtitle: 'Campos relacionales, expresiones geométricas (<code>$area</code>, <code>$length</code>), halo protector y Diseñador A3',
    readingTime: '17 min',
    objectives: [
      'Normalizar campos en tablas de atributos siguiendo el estándar snake_case.',
      'Formular cálculos de geometría métrica en la Calculadora de Campos (<code>$area</code> y <code>$length</code>).',
      'Aplicar simbología temática graduada y categorizada con etiquetado protegido por halo.'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. La Tabla de Atributos Relacional</h3>
        <p>
          Cada geometría espacial tiene una fila vinculada 1:1 en una tabla estructurada de base de datos.
          Es mandatorio seguir las normas de nomenclatura técnica:
        </p>
        <ul>
          <li>Usar minúsculas y guiones bajos (<code>snake_case</code>, ej. <code>area_ha</code>, <code>tipo_suelo</code>).</li>
          <li>Nunca usar espacios, tildes, signos de puntuación o la letra 'ñ'.</li>
        </ul>

        <h3>2. Calculadora de Campos y Geometría en CTM12</h3>
        <p>
          Al trabajar bajo la proyección métrica EPSG:9377, los operadores de geometría devuelven magnitudes en metros del Sistema Internacional:
        </p>
        <div class="formula-box">
          <code>$area</code> → Área en metros cuadrados (m²)<br>
          <code>$area / 1000000</code> → Área en kilómetros cuadrados (km²)<br>
          <code>$area / 10000</code> → Área en hectáreas (ha)<br>
          <code>$length</code> → Longitud en metros (m)
        </div>

        <h3>3. Simbología Temática y Etiquetado</h3>
        <p>
          Para que un mapa sea comunicable, la simbología debe seguir principios semiológicos:
        </p>
        <ul>
          <li><strong>Categorizada:</strong> Para atributos cualitativos discretos (usos del suelo: residencial, comercial, institucional).</li>
          <li><strong>Graduada:</strong> Para variables cuantitativas numéricas continuas (habitantes, caudales, pendientes).</li>
          <li><strong>Halo en Etiquetas:</strong> Borde exterior blanco de 1 mm alrededor de los textos para garantizar legibilidad sobre ortofotos oscuras o relieve sombreado.</li>
        </ul>
      </div>
    `,
    quiz: {
      question: '¿Qué expresión de la Calculadora de Campos en QGIS calcula el área en hectáreas de un polígono en EPSG:9377?',
      options: [
        '<code>$area * 10000</code>',
        '<code>$area / 10000</code>',
        '<code>$length / 100</code>',
        '<code>$area / 1000000</code>'
      ],
      correctIndex: 1,
      hint: 'Una hectárea equivale exactamente a 10.000 metros cuadrados.',
      explanation: '¡Exacto! Como <code>$area</code> entrega metros cuadrados, al dividir entre 10.000 se obtiene el área en hectáreas ($1\\text{ ha} = 10.000\\text{ m}^2$).'
    }
  },
  {
    week: 7,
    moduleId: 'M1',
    title: 'Geoprocesamiento Vectorial & Geoservicios WFS',
    subtitle: 'Buffer de 30 m según POT Medellín, Clip, Dissolve, Intersect y descarga en vivo vía WFS',
    readingTime: '19 min',
    objectives: [
      'Dominar las 4 operaciones espaciales clave: Buffer, Clip, Dissolve e Intersect.',
      'Aplicar la faja de retiro legal de 30 metros según el POT de Medellín y Corantioquia.',
      'Conectarse a servicios WFS para descargar geometrías vectoriales crudas oficiales.'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. Las 4 Operaciones Clave de Geoprocesamiento</h3>
        <ul>
          <li><strong>Buffer (Zona de Amortiguamiento):</strong> Genera una corona perimétrica a una distancia métrica equidistante alrededor de puntos, líneas o polígonos.</li>
          <li><strong>Clip (Recorte Espacial):</strong> Utiliza una capa como "cortador de galletas" para recortar los objetos de otra capa que caen dentro de su perímetro.</li>
          <li><strong>Intersect (Intersección):</strong> Conserva únicamente las porciones compartidas donde dos capas se solapan, combinando las columnas de ambas tablas.</li>
          <li><strong>Dissolve (Disolución):</strong> Fusiona geometrías adyacentes o superpuestas que comparten un atributo común, borrando límites internos.</li>
        </ul>

        <h3>2. Faja de Protección Ambiental en La Iguaná</h3>
        <p>
          Por mandato del Plan de Ordenamiento Territorial (POT) de Medellín y la corporación ambiental Corantioquia, las corrientes naturales de agua deben contar con una <strong>faja de retiro hídrico obligatorio de 30 metros</strong> a cada costado del eje o cota máxima de inundación.
        </p>

        <h3>3. Geoservicios Vectoriales WFS (Web Feature Service)</h3>
        <p>
          A diferencia del WMS (que solo entrega una imagen estática), el <strong>WFS</strong> entrega los datos vectoriales crudos con sus geometrías y tablas de atributos completas, permitiendo al analista hacer geoprocesamiento directo sin depender de archivos locales.
        </p>
      </div>
    `,
    quiz: {
      question: 'Si cruzas la Faja de Retiro (Buffer 30 m) con los Predios Catastrales para saber qué construcciones invaden la ronda hídrica, ¿qué operación utilizas?',
      options: [
        'Intersección (Intersect)',
        'Disolución (Dissolve)',
        'Buffer inverso',
        'Reproyección ortométrica'
      ],
      correctIndex: 0,
      hint: 'La operación que conserva el área común entre dos capas y combina sus tablas es la intersección.',
      explanation: '¡Correcto! La herramienta Intersección permite obtener exclusivamente los fragmentos prediales que caen dentro del retiro hídrico con todos sus atributos catastrales.'
    }
  },
  {
    week: 8,
    moduleId: 'M2',
    title: 'Consolidación Vectorial & Introducción al Modelo Ráster',
    subtitle: 'Cierre del modelo vectorial, preparación de Hito 3 y fundamentos de campos continuos matriciales',
    readingTime: '15 min',
    objectives: [
      'Preparar y consolidar la base de datos espacial (.gpkg + .gdb) y la lámina técnica A3 del Hito 3 (S09).',
      'Comprender la transición física del modelo vectorial discreto al modelo ráster continuo.',
      'Identificar las fuentes globales de elevación (SRTM y ALOS PALSAR 12.5 m RTC).'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. Del Modelo Vectorial al Modelo Matricial</h3>
        <p>
          Mientras el modelo vectorial representa elementos con fronteras definidas (predios, vías, ríos), los fenómenos territoriales continuos como la altitud, la pendiente y la temperatura varían suavemente en el espacio y se modelan mediante matrices regulares de píxeles.
        </p>
        <h3>2. Fuentes de Elevación y Resolución</h3>
        <p>
          En la Cuenca de La Iguaná empleamos el DEM <strong>ALOS PALSAR RTC</strong> con resolución espacial de <strong>12.5 metros</strong>, derivado de radar de apertura sintética (SAR), ideal para capturar el escarpado relieve de Boquerón y San Cristóbal.
        </p>
      </div>
    `,
    quiz: {
      question: '¿Por qué la altitud del terreno se modela preferentemente con el modelo ráster y no con vectores poligonales?',
      options: [
        'Porque la elevación es un campo continuo que varía celda a celda sin fronteras discretas',
        'Porque los archivos ráster ocupan menos memoria en disco',
        'Porque el modelo vectorial no admite números con decimales',
        'Porque los vectores solo sirven para vías y carreteras'
      ],
      correctIndex: 0,
      hint: 'La cota z cambia en cada punto del espacio geográfico de forma continua.',
      explanation: '¡Correcto! La elevación es un campo continuo espacial, cuya variación infinita se aproxima de forma óptima mediante matrices regulares de celdas cuadradas.'
    }
  },
  {
    week: 9,
    moduleId: 'M2',
    title: 'Modelos Ráster de Elevación (DEM) & Cálculo de Pendientes',
    subtitle: 'SRTM vs ALOS PALSAR 12.5 m, reproyección a CTM12, pendientes en grados y porcentaje',
    readingTime: '20 min',
    objectives: [
      'Comprender la estructura matricial de un Modelo Digital de Elevación (DEM/MDT).',
      'Reproyectar un ráster a CTM12 con remuestreo bilineal sin distorsionar cotas.',
      'Calcular mapas de pendientes en grados (°) y porcentaje (%) según los rangos del POT.'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. ¿Qué es un Modelo Digital de Elevación (DEM)?</h3>
        <p>
          Un <strong>DEM (Digital Elevation Model)</strong> es una matriz ráster regular donde cada píxel almacena el valor numérico de la altitud ortométrica (msnm) de la superficie del terreno.
        </p>
        <ul>
          <li><strong>SRTM (Shuttle Radar Topography Mission):</strong> Resolución de 30 metros. Útil para cuencas regionales.</li>
          <li><strong>ALOS PALSAR:</strong> Resolución de 12.5 metros (sensor de radar de apertura sintética). Es el insumo oficial del curso para modelar el relieve escarpado de La Iguaná.</li>
        </ul>

        <h3>2. Reproyección con GDAL Warp a EPSG:9377</h3>
        <p>
          Nunca se debe calcular pendiente sobre un DEM en coordenadas geográficas (grados), porque el eje horizontal estaría en grados y el vertical en metros, generando pendientes irreales del 10.000%. Es obligatorio reproyectar a <strong>MAGNA-SIRGAS CTM12 (EPSG:9377)</strong> con método de remuestreo <em>Bilineal</em> o <em>Cúbico</em>.
        </p>

        <h3>3. Pendiente en Grados vs. Porcentaje</h3>
        <div class="formula-box">
          $$\\text{Pendiente } (\\%) = \\tan(\\theta^\\circ) \\times 100$$
        </div>
        <p>
          Una pendiente de $45^\\circ$ equivale al $100\\%$ (un metro de avance horizontal por un metro de ascenso vertical). El POT de Medellín clasifica como ladera de alta amenaza por movimientos en masa aquellas con pendientes superiores a $30^\\circ$ ($>57.7\\%$).
        </p>
      </div>
    `,
    quiz: {
      question: 'Si un talud sube 30 metros verticales en una distancia horizontal de 60 metros, ¿cuál es su pendiente en porcentaje?',
      options: [
        '50%',
        '25%',
        '100%',
        '200%'
      ],
      correctIndex: 0,
      hint: 'Pendiente % = (Desnivel vertical / Distancia horizontal) * 100 = (30 / 60) * 100.',
      explanation: '¡Exacto! (30 m / 60 m) * 100 = 50% de pendiente longitudinal.'
    }
  },
  {
    week: 10,
    moduleId: 'M2',
    title: 'Álgebra de Mapas, Curvas de Nivel y Perfiles Topográficos',
    subtitle: 'Calculadora ráster, reclasificación de pendientes, extracción de curvas a 25 m y perfil longitudinal',
    readingTime: '20 min',
    objectives: [
      'Operar la Calculadora Ráster de QGIS mediante expresiones lógicas y condicionales booleanas.',
      'Generar curvas de nivel equidistantes cada 25 metros a partir del DEM ALOS PALSAR.',
      'Construir el perfil topográfico longitudinal de la Cuenca de La Iguaná (1.500 m de desnivel).',
      'Auditar la base de datos espacial (.gpkg + .gdb) y la lámina técnica A3 del Hito 3 en la estación en vivo.'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. Álgebra de Mapas y Operadores Booleanos</h3>
        <p>
          El <strong>álgebra de mapas</strong> (formalizada por Dana Tomlin) permite operar matrices ráster como variables algebraicas. Mediante operadores relacionales (<code>&gt;</code>, <code>&lt;</code>, <code>=</code>) y lógicos (<code>AND</code>, <code>OR</code>), se generan máscaras binarias (1 = cumple condición, 0 = no cumple).
        </p>

        <h3>2. Curvas de Nivel Equidistantes</h3>
        <p>
          Las <strong>curvas de nivel (isolíneas)</strong> unen puntos de igual altitud sobre el terreno. Al derivarlas de un DEM remuestreado a CTM12 (EPSG:9377), se definen curvas maestras (cada 100 m) e intermedias (cada 25 m) para modelar la escarpada orografía de San Cristóbal y Boquerón.
        </p>

        <h3>3. Perfil Topográfico Longitudinal</h3>
        <p>
          El perfil altitudinal a lo largo del cauce principal de La Iguaná evidencia el fuerte gradiente de pendiente entre la cota superior (3.100 msnm) y la desembocadura en el río Medellín (1.460 msnm), fundamental para la zonificación de riesgos y obras hidráulicas.
        </p>
      </div>
    `,
    quiz: {
      question: 'En la Calculadora Ráster de QGIS, ¿qué resultado produce la expresión ("pendiente@1" > 30) * 1?',
      options: [
        'Un ráster binario donde 1 representa laderas con pendiente mayor al 30% (o 30°) y 0 el resto',
        'Un DEM con las cotas multiplicadas por 30',
        'Un archivo vectorial con curvas de nivel',
        'Un mapa de sombras con ángulo cenital de 30°'
      ],
      correctIndex: 0,
      hint: 'Las comparaciones relacionales devuelven 1 (verdadero) o 0 (falso).',
      explanation: '¡Correcto! Las expresiones condicionales generan máscaras booleanas donde las celdas que cumplen la condición toman valor 1 y las demás valor 0.'
    }
  },
  {
    week: 11,
    moduleId: 'M3',
    title: 'Sistemas GNSS y Verificación Espacial en Gabinete',
    subtitle: 'Constelaciones, fuentes de error, DOP, importación GPX/CSV en QGIS y reproyección CTM12',
    readingTime: '20 min',
    objectives: [
      'Explicar el principio de trilateración satelital y las fuentes de error en cañones urbanos.',
      'Diferenciar entre Dilución Geométrica de la Precisión (DOP) y sesgos de reloj.',
      'Importar datos crudos GPX y CSV en QGIS y reproyectar a MAGNA-SIRGAS CTM12 (EPSG:9377).'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. Fundamentos de Posicionamiento Satelital GNSS</h3>
        <p>
          Los sistemas <strong>GNSS (Global Navigation Satellite Systems)</strong> agrupan las constelaciones GPS (EE.UU.), GLONASS (Rusia), Galileo (Unión Europea) y BeiDou (China).
        </p>
        <p>
          Para obtener una posición tridimensional $(X, Y, Z)$ se requiere la señal de <strong>mínimo 4 satélites</strong> simultáneos: tres para calcular las incógnitas de posición mediante trilateración espacial y un cuarto para sincronizar y corregir el desfase del reloj interno del receptor.
        </p>

        <h3>2. Fuentes de Error y Geometría Satelital (DOP)</h3>
        <ul>
          <li><strong>Multitrayectoria (Multipath):</strong> La señal rebota en fachadas de edificaciones o laderas escarpadas antes de llegar a la antena. Es muy severo en cañones urbanos como Robledo o El Pesebre.</li>
          <li><strong>Dilución de Precisión (DOP):</strong> Mide la distribución geométrica de los satélites en la bóveda celeste. Si los satélites están agrupados en un solo cuadrante, el DOP es desfavorable ($\text{DOP} > 6$) y la precisión se degrada. Un valor $\text{DOP} < 2$ es excelente.</li>
        </ul>

        <h3>3. Auditoría de Datos en Gabinete</h3>
        <p>
          En ingeniería y diseño urbano recibimos trazas y waypoints de diferentes fuentes (smartphones, navegadores Garmin o receptores RTK). El rol del analista en gabinete consiste en filtrar mediciones con alto DOP, reproyectar formalmente a <strong>EPSG:9377</strong> y verificar la coincidencia contra la cartografía oficial.
        </p>
      </div>
    `,
    quiz: {
      question: '¿Por qué se requiere un mínimo de 4 satélites para obtener una posición GNSS fija en tres dimensiones?',
      options: [
        '3 satélites para resolver X, Y, Z y un cuarto para corregir el desfase del reloj del receptor',
        '2 satélites para latitud y longitud, 1 para cota y 1 para velocidad',
        '4 satélites para cubrir los 4 puntos cardinales',
        '1 satélite por cada constelación principal'
      ],
      correctIndex: 0,
      hint: 'Tres incógnitas espaciales (X, Y, Z) más una incógnita temporal (sesgo de reloj t).',
      explanation: '¡Exacto! El sistema resuelve 4 incógnitas simultáneas: X, Y, Z y el error de tiempo del reloj del receptor.'
    }
  },
  {
    week: 12,
    moduleId: 'M4',
    title: 'Teledetección Satelital en QGIS I: Espectro, Sentinel-2 y Combinación de Bandas',
    subtitle: 'Física óptica, firmas espectrales, Ráster Virtual (.vrt) y compuestos RGB y Falso Color Infrarrojo en QGIS',
    readingTime: '20 min',
    objectives: [
      'Comprender el principio de reflectancia espectral y el salto del infrarrojo cercano (NIR) en vegetación.',
      'Conocer las bandas de 10 m y 20 m de Sentinel-2 Nivel 2A (BOA) y construir un Ráster Virtual (.vrt) en QGIS.',
      'Renderizar composiciones multibanda en Color Verdadero (RGB 4-3-2) y Falso Color Infrarrojo (CIR 8-4-3) sobre La Iguaná.'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. El Salto del Infrarrojo Cercano (NIR)</h3>
        <p>
          Las plantas saludables absorben la radiación roja (Banda 4 de Sentinel-2, $\\sim 665\\text{ nm}$) para la fotosíntesis mediante la clorofila, pero reflejan fuertemente la radiación en el Infrarrojo Cercano (Banda 8, $\\sim 842\\text{ nm}$) debido a la estructura celular del mesófilo esponjoso (salto <em>Red Edge</em>).
        </p>

        <h3>2. Sentinel-2 MSI y Ráster Virtual en QGIS</h3>
        <p>
          Sentinel-2 (Copernicus / ESA) ofrece resolución espacial de <strong>10 metros</strong> en bandas visibles y NIR (B02, B03, B04, B08) y <strong>20 metros</strong> en SWIR (B11, B12). En QGIS, apilamos las bandas recortadas en EPSG:9377 mediante <strong>Construir ráster virtual (Build Virtual Raster)</strong> activando <em>Colocar cada archivo en una banda separada</em>.
        </p>

        <h3>3. Compuestos Multibanda RGB y Falso Color Infrarrojo</h3>
        <p>
          La composición en <strong>Color Verdadero (B04-B03-B02)</strong> muestra el territorio tal como lo percibe el ojo humano, mientras que el <strong>Falso Color Infrarrojo (B08-B04-B03)</strong> proyecta el NIR en el canal rojo, haciendo resaltar la cobertura vegetal viva en rojo carmesí intenso frente a los tonos cian/grises de las construcciones.
        </p>
      </div>
    `,
    quiz: {
      question: 'En una composición en Falso Color Infrarrojo (B08-B04-B03) de Sentinel-2 en QGIS, ¿de qué color se observa la vegetación sana?',
      options: [
        'Rojo intenso o carmesí',
        'Verde brillante',
        'Azul cian',
        'Negro profundo'
      ],
      correctIndex: 0,
      hint: 'La banda B08 (NIR) se asigna al canal rojo de la pantalla.',
      explanation: '¡Correcto! Debido a que el NIR se proyecta en el cañón rojo del monitor y la vegetación refleja masivamente el NIR, los bosques y pastos resaltan en rojo intenso.'
    }
  },
  {
    week: 13,
    moduleId: 'M4',
    title: 'Teledetección Satelital en QGIS II: Índices Espectrales (NDVI / NDBI) y Álgebra Multibanda',
    subtitle: 'Cálculo de NDVI y NDBI en la Calculadora Ráster de QGIS, máscaras booleanas, estadísticas y fusión con Hillshade',
    readingTime: '20 min',
    objectives: [
      'Calcular e interpretar los índices biofísicos normalizados NDVI y NDBI en la Calculadora Ráster de QGIS.',
      'Generar máscaras booleanas de vegetación densa y suelo degradado y cruzarlas con las pendientes críticas del DEM.',
      'Fusionar el NDVI coloreado sobre el Hillshade 3D con modo de mezcla Multiplicar.'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. Índice de Vegetación de Diferencia Normalizada (NDVI) en QGIS</h3>
        <div class="formula-box">
          $$\\text{NDVI} = \\frac{\\text{NIR} - \\text{Red}}{\\text{NIR} + \\text{Red}} = \\frac{\\text{"B08@1"} - \\text{"B04@1"}}{\\text{"B08@1"} + \\text{"B04@1"}}$$
        </div>
        <p>
          Valores $\\ge 0.50$ corresponden a vegetación densa protectora (bosque alto en Boquerón). Valores menores a $0.30$ corresponden a suelo expuesto degradado, taludes o superficies urbanas impermeables.
        </p>

        <h3>2. Índice de Área Construida (NDBI)</h3>
        <p>
          Para detectar la mancha urbana impermeable y suelo seco frente a la vegetación se emplea el infrarrojo de onda corta (SWIR B11):
        </p>
        <div class="formula-box">
          $$\\text{NDBI} = \\frac{\\text{SWIR} - \\text{NIR}}{\\text{SWIR} + \\text{NIR}} = \\frac{\\text{"B11@1"} - \\text{"B08@1"}}{\\text{"B11@1"} + \\text{"B08@1"}}$$
        </div>

        <h3>3. Estadísticas y Fusión con el Sombreado Topográfico</h3>
        <p>
          Con la herramienta <strong>Estadísticas de capa ráster</strong> extraemos el mínimo, máximo y media de la cuenca, y superponemos el NDVI pseudocolor (rampa <em>RdYlGn</em>) sobre el Hillshade del DEM con modo de mezcla <strong>Multiplicar</strong>.
        </p>
      </div>
    `,
    quiz: {
      question: 'En un píxel sobre el bosque del Boquerón, la reflectancia B08 (NIR) es 0.60 y la B04 (Rojo) es 0.10. ¿Cuál es el NDVI resultante?',
      options: [
        '+0.71',
        '-0.50',
        '+0.50',
        '+0.85'
      ],
      correctIndex: 0,
      hint: 'NDVI = (0.60 - 0.10) / (0.60 + 0.10) = 0.50 / 0.70.',
      explanation: '¡Correcto! 0.50 / 0.70 = +0.714, valor típico de vegetación vigorosa y densa.'
    }
  },
  {
    week: 14,
    moduleId: 'M5',
    title: 'ArcGIS Pro: Entorno Corporativo, Geodatabases & REST',
    subtitle: 'Estructura de File Geodatabase (.gdb), Feature Datasets en EPSG:9377, dominios, servicios REST y equivalencia con .gpkg',
    readingTime: '18 min',
    objectives: [
      'Diferenciar la arquitectura de proyectos de escritorio de ArcGIS Pro (.aprx) frente a QGIS (.qgz).',
      'Diseñar una File Geodatabase (.gdb) con Feature Datasets en EPSG:9377 y dominios de atributos.',
      'Consumir servicios ArcGIS REST / FeatureServers en vivo e intercambiar capas con GeoPackage (.gpkg).'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. El Ecosistema Corporativo de ArcGIS Pro</h3>
        <p>
          En el sector de consultoría de ingeniería y entidades gubernamentales, ArcGIS Pro opera con proyectos <code>.aprx</code> que centralizan mapas, escenas 3D, cajas de herramientas (*Toolboxes*) y conexiones a bases de datos espaciales, en total equivalencia conceptual con QGIS (<code>.qgz</code> y <code>.gpkg</code>).
        </p>

        <h3>2. Estructura de una File Geodatabase (.gdb)</h3>
        <ul>
          <li><strong>Feature Dataset:</strong> Carpeta espacial dentro de la GDB que impone un sistema de coordenadas estricto (EPSG:9377) a todas las capas que contiene, garantizando compatibilidad topológica absoluta.</li>
          <li><strong>Feature Class:</strong> Colección homogénea de geometrías espaciales equivalentes a una capa.</li>
          <li><strong>Dominios de Atributos:</strong> Reglas de integridad que restringen los valores permitidos en una columna (ej. Dominio por rango numérico o Dominio por lista de valores codificados).</li>
        </ul>

        <h3>3. Servicios ArcGIS REST e Interoperabilidad con QGIS</h3>
        <p>
          Las entidades del Valle de Aburrá publican geoservicios REST. Tanto ArcGIS Pro como QGIS leen nativamente servicios REST y contenedores File Geodatabase (<code>.gdb</code>) y GeoPackage (<code>.gpkg</code>).
        </p>
      </div>
    `,
    quiz: {
      question: '¿Qué ventaja ofrece un Dominio de Atributos en una File Geodatabase?',
      options: [
        'Evita errores de digitación al restringir los valores a una lista predefinida o a un rango numérico válido',
        'Hace que el archivo pese 0 kilobytes',
        'Convierte automáticamente polígonos en curvas de nivel',
        'Permite imprimir planos sin necesidad de impresora'
      ],
      correctIndex: 0,
      hint: 'Un dominio actúa como una lista desplegable que no permite escribir datos errados.',
      explanation: '¡Exacto! Los dominios garantizan la integridad de datos impidiendo que un digitador introduzca valores incoherentes o errores tipográficos.'
    }
  },
  {
    week: 15,
    moduleId: 'M5',
    title: 'Automatización con ModelBuilder (ArcGIS Pro) y Diseñador de Modelos (QGIS)',
    subtitle: 'Flujos encadenados, parámetros de usuario (P), equivalencia multiplataforma y pre-chequeo técnico para Hito 5',
    readingTime: '19 min',
    objectives: [
      'Construir un diagrama de flujo espacial encadenando herramientas en ModelBuilder o en el Diseñador Gráfico de Modelos de QGIS.',
      'Definir parámetros de entrada y salida dinámicos y exportar a Python (ArcPy / PyQGIS).',
      'Realizar el pre-chequeo técnico en sala garantizando 0 rutas rotas y 0 corrupción en .gdb para el Hito 5.'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. ¿Qué es ModelBuilder y su equivalente en QGIS?</h3>
        <p>
          <strong>ModelBuilder</strong> (en ArcGIS Pro) y el <strong>Diseñador Gráfico de Modelos</strong> (en QGIS) son interfaces de programación visual basadas en grafos acíclicos dirigidos (DAG). Permiten encadenar datos de entrada, herramientas de geoprocesamiento y salidas en un lienzo gráfico. Para el Hito 5 Proyecto Final integran el flujo automatizado en ambas herramientas (ModelBuilder .atbx y Diseñador Gráfico .model3).
        </p>

        <h3>2. Elementos de un Modelo</h3>
        <ul>
          <li><strong>Entradas (Óvalos Azules / Inputs):</strong> Datos de entrada (capas o parámetros numéricos).</li>
          <li><strong>Algoritmos (Rectángulos Amarillos):</strong> Herramientas de geoprocesamiento (Buffer, Clip, Intersect, Calculadora de Campos).</li>
          <li><strong>Salidas (Óvalos Verdes / Outputs):</strong> Datos derivados generados por el proceso.</li>
          <li><strong>Parámetros (P):</strong> Al marcar un elemento como Parámetro, el modelo se convierte en una herramienta reutilizable con cuadro de diálogo propio.</li>
        </ul>

        <h3>3. Salidas Cartográficas A3 y Pre-chequeo Técnico Hito 5</h3>
        <p>
          El flujo automatizado alimenta el Dossier Infográfico A3 en EPSG:9377 y será sustentado en el Hito 5. Al cierre de la sesión se realiza el pre-chequeo técnico en sala garantizando 0 rutas rotas, integridad de la File Geodatabase (.gdb) y verificación del modelo ejecutable.
        </p>
      </div>
    `,
    quiz: {
      question: 'En ModelBuilder, ¿qué indica la letra (P) sobre una variable u óvalo del modelo?',
      options: [
        'Que es un Parámetro editable por el usuario cuando ejecuta el modelo desde la caja de herramientas',
        'Que el proceso falló por falta de memoria RAM',
        'Que el archivo es de formato Polígono únicamente',
        'Que la capa está protegida con contraseña'
      ],
      correctIndex: 0,
      hint: '(P) significa Parámetro de usuario para la interfaz de ejecución.',
      explanation: '¡Correcto! La (P) expone la variable en el cuadro de diálogo de la herramienta para que cualquier persona pueda ejecutarla con sus propios datos.'
    }
  },
  {
    week: 16,
    moduleId: 'M6',
    title: 'Cierre Integrador: Hito 5 Proyecto Final Individual y Pitch Ejecutivo',
    subtitle: 'Sustentación individual en vivo: Pitch Ejecutivo Relámpago (4 + 3 min), Dossier A3 y automatización ModelBuilder / .model3 (Hito 5 · 20%)',
    readingTime: '15 min',
    objectives: [
      'Ejecutar en vivo el modelo automatizado (.atbx / .model3) sobre la unidad territorial asignada garantizando 0 errores.',
      'Sustentar de forma individual en vivo el Pitch Ejecutivo Relámpago (4 min exposición + 3 min preguntas) operando QGIS LTR y ArcGIS Pro ante el docente.',
      'Consolidar el 100% de las notas del curso (5 Hitos × 20%).'
    ],
    contentHtml: `
      <div class="theory-rich-article">
        <h3>1. La Síntesis Territorial Interdisciplinar</h3>
        <p>
          El verdadero valor de la geomática no radica en operar botones de software, sino en <strong>responder preguntas complejas del territorio para salvar vidas y optimizar inversiones</strong>:
        </p>
        <div class="comparison-grid">
          <div class="comparison-col">
            <h4>Visión de Ingeniería Civil</h4>
            <p>
              Estabilidad de laderas en Boquerón, zonificación de pendientes críticas, perfil longitudinal del cauce y cruce multicriterio con laderas desprovistas de vegetación protectora.
            </p>
          </div>
          <div class="comparison-col">
            <h4>Visión de Diseño Urbano</h4>
            <p>
              Respeto de la faja de retiro de 30 m, análisis de huella impermeable mediante NDBI, reubicación de viviendas en riesgo no mitigable y espacio público ribereño.
            </p>
          </div>
        </div>

        <h3>2. Estructura de la Sesión Final: Hito 5 (20%)</h3>
        <p>
          La sesión de cierre del semestre se estructura en el horario oficial de Sala de Cómputo (12:00 m. – 4:30 p.m.):
        </p>
        <ol>
          <li><strong>Sub-bloque 1 (12:00 m. – 1:50 p.m.):</strong> Verificación final de empaquetado, apertura de proyectos en limpio (.qgz y .aprx) y comprobación de rutas relativas con 0 enlaces rotos.</li>
          <li><strong>Pausa Activa Pedagógica (1:50 p.m. – 2:10 p.m.):</strong> Transición y preparación de la estación individual de sustentación.</li>
          <li><strong>Sub-bloque 2 (2:10 p.m. – 4:30 p.m.):</strong> Pitch Ejecutivo Relámpago individual (4 min de demostración en vivo operando QGIS LTR + ArcGIS Pro y defendiendo el Dossier A3 + 3 min de preguntas técnicas sobre geoprocesamiento e integridad espacial).</li>
        </ol>
      </div>
    `,
    quiz: {
      question: '¿Cuál es el objetivo final de integrar la geomática en proyectos de ingeniería y diseño urbano?',
      options: [
        'Tomar decisiones espaciales basadas en evidencia métrica y científica para ordenar el territorio de forma segura y sostenible',
        'Memorizar combinaciones de teclas en programas de diseño',
        'Crear mapas decorativos para redes sociales',
        'Eliminar el trabajo de campo de los ingenieros'
      ],
      correctIndex: 0,
      hint: 'La geomática es una herramienta de toma de decisiones para salvar vidas y planificar el territorio.',
      explanation: '¡Brillante! El propósito de la geomática es respaldar la toma de decisiones espaciales con rigor métrico, normativo y científico.'
    }
  }
];

export const LAB_GUIDES = [
  {
    code: 'G01',
    week: 1,
    moduleId: 'M0',
    title: 'Primer Contacto con Visores Geográficos y Reconocimiento de La Iguaná',
    duration: '90 min',
    modality: 'En equipo',
    software: 'Navegador Web / Google Earth / Colombia en Mapas',
    dataRequired: 'Conexión a Internet y visor oficial de Colombia en Mapas (IGAC)',
    summary: 'Exploración comparativa entre visores comerciales y el visor oficial del IGAC. Identificación del nacimiento en Boquerón (2.950 msnm), el valle medio y la desembocadura en el Río Medellín (1.450 msnm).',
    steps: [
      'Ingresar al geoportal Colombia en Mapas del IGAC y localizar el municipio de Medellín.',
      'Activar la cartografía básica oficial e identificar la toponimia y las curvas de nivel.',
      'Seguir el curso de la Quebrada La Iguaná desde el Alto de Boquerón (San Cristóbal) hasta el Río Medellín.',
      'Medir la distancia recta preliminar entre nacimiento y desembocadura (aprox. 10.8 km).',
      'Definir el acuerdo de gobernanza y trabajo en equipo para el semestre.'
    ],
    deliverable: 'Punto de control inicial y acuerdo de gobernanza en Teams.'
  },
  {
    code: 'G02',
    week: 2,
    moduleId: 'M0',
    title: 'Taller de Escalas, Resolución Espacial y Coordenadas Geográficas',
    duration: '90 min',
    modality: 'En equipo',
    software: 'Visor PDF calibrado / Calculadora científica',
    dataRequired: 'Plano de La Iguaná en PDF a escala nominal 1:5.000',
    summary: 'Medición de distancias en planos escalados, verificación de la trampa de la fotocopiadora con escala gráfica y conversión de coordenadas GMS a grados decimales.',
    steps: [
      'Abrir el plano técnico en PDF y calibrar el zoom al 100% de impresión.',
      'Medir con regla en pantalla la barra de escala gráfica de 200 m y verificar si coincide con 4.0 cm.',
      'Simular una reducción del documento al 95% y demostrar por qué la escala numérica 1:5.000 falsea la medida.',
      'Convertir las coordenadas del nacimiento de La Iguaná (75° 39\' 14" W) a grados decimales con signo negativo (-75.6539°).',
      'Registrar las coordenadas de las tres obras hidráulicas clave en la tabla del taller.'
    ],
    deliverable: 'Hoja de cálculo con conversiones sexagesimales y mediciones de escala corregidas.'
  },
  {
    code: 'G03',
    week: 3,
    moduleId: 'M0',
    title: 'Datum, Origen Nacional CTM12 y Georreferenciación Manual',
    duration: '90 min',
    modality: '100% Individual (Preparación Hito 1)',
    software: 'Calculadora / QGIS preliminar',
    dataRequired: 'Puntos geodésicos del IGAC en el Valle de Aburrá',
    summary: 'Cálculo manual de proyecciones cartográficas, comprensión de la Res. IGAC 471/2020 y preparación para el Hito 1 en Sala.',
    steps: [
      'Estudiar los parámetros del Origen Nacional CTM12: EPSG 9377, Falso Este 5.000.000 m, Falso Norte 2.000.000 m.',
      'Calcular la distancia euclidiana entre dos puntos de control en coordenadas planas métricas.',
      'Consolidar las transformaciones geodésicas y cálculo de distancias métricas hacia EPSG:9377.',
      'Verificar la georreferenciación de una imagen aérea sobre el campus EAFIT / La Iguaná.'
    ],
    deliverable: 'Memoria de cálculo geodésico y comprobación de coordenadas CTM12 (EPSG:9377).'
  },
  {
    code: 'G04',
    week: 4,
    moduleId: 'M1',
    title: 'Interfaz de QGIS, Creación de GeoPackage y Conexión a Servicios WMS',
    duration: '90 min',
    modality: '100% Individual',
    software: 'QGIS 3.x LTR',
    dataRequired: 'Ortofoto WMS de GeoMedellín y cartografía base IGAC',
    summary: 'Montaje del entorno de trabajo profesional en C:\\Temp, fijación estricta de EPSG:9377, creación de proyecto_iguana.gpkg y consumo de geoservicios WMS.',
    steps: [
      'Abrir QGIS y configurar el CRS del proyecto en MAGNA-SIRGAS Origen Nacional (EPSG:9377).',
      'Configurar el guardado con rutas relativas en Propiedades del Proyecto.',
      'Crear la base de datos espacial proyecto_iguana.gpkg dentro de su directorio de trabajo individual.',
      'Conectar el servicio WMS de GeoMedellín para desplegar la ortofoto de alta resolución de la ciudad.',
      'Validar la precisión de coordenadas contrastando el cálculo manual con QGIS LTR.'
    ],
    deliverable: 'Archivo proyecto_iguana.gpkg inicializado y proyecto .qgz con WMS configurado.'
  },
  {
    code: 'G05',
    week: 5,
    moduleId: 'M1',
    title: 'Digitalización Vectorial, Auto-ensamblado y Control Topológico',
    duration: '90 min',
    modality: '100% Individual (Hito 1 · 20%)',
    software: 'QGIS 3.x LTR',
    dataRequired: 'Ortofoto WMS y capa proyecto_iguana.gpkg',
    summary: 'Digitalización rigurosa de líneas y polígonos sobre La Iguaná y unidad territorial, uso del imán de auto-ensamblado a 12 px y presentación del Hito 1 en Sala.',
    steps: [
      'Crear en el GeoPackage las capas red_hidrica (Línea) y zonas_cobertura (Polígono) en EPSG:9377.',
      'Activar la barra de autoensamblado (Snapping) en modo "Todas las capas" con tolerancia de 12 píxeles.',
      'Digitalizar el cauce principal y los afluentes tributarios enganchando exactamente en los vértices del río.',
      'Digitalizar polígonos colindantes activando "Evitar solapamiento" (Avoid Overlap) para garantizar linderos perfectos.',
      'Ejecutar el Comprobador de topología para confirmar cero solapes y cero geometrías inválidas.'
    ],
    deliverable: 'Capas vectoriales digitalizadas con topología limpia en proyecto_iguana.gpkg (Hito 1).'
  },
  {
    code: 'G06',
    week: 6,
    moduleId: 'M1',
    title: 'Tablas de Atributos, Calculadora de Campos y Simbología Temática',
    duration: '90 min',
    modality: '100% Individual (Preparación Hito 2)',
    software: 'QGIS 3.x LTR',
    dataRequired: 'Capa de predios y equipamientos de La Iguaná',
    summary: 'Diseño de campos en snake_case, cálculo automático de áreas en m²/ha y longitudes en metros, simbología clasificada y preparación para el Hito 2.',
    steps: [
      'Normalizar la tabla de atributos eliminando tildes y caracteres especiales en los nombres de campo.',
      'Usar la Calculadora de Campos para crear <code>area_ha</code> con la expresión <code>$area / 10000</code> y <code>long_m</code> con <code>$length</code>.',
      'Configurar simbología temática categorizada según el tipo de equipamiento (salud, educación, comunitario).',
      'Configurar etiquetas automáticas con buffer / halo protector de 1 mm.',
      'Consolidar el esquema de atributos y geoprocesamiento vectorial en EPSG:9377.'
    ],
    deliverable: 'Tabla de atributos normalizada y enriquecida con métricas geométricas en EPSG:9377.'
  },
  {
    code: 'G07',
    week: 7,
    moduleId: 'M1',
    title: 'Geoprocesamiento Vectorial y Consumo de Geoservicios WFS',
    duration: '90 min',
    modality: '100% Individual',
    software: 'QGIS 3.x LTR',
    dataRequired: 'Red hídrica de La Iguaná y predios catastrales',
    summary: 'Generación de la Faja de Retiro legal (30 + D m), intersección espacial con predios en conflicto y conexión a geoservicios WFS en vivo.',
    steps: [
      'Conectarse al servicio WFS de GeoMedellín para descargar la capa de predios de la Comuna 7 (Robledo).',
      'Ejecutar la herramienta Buffer con distancia de retiro parametrizada (30 + D m) sobre la red hídrica activando Disolver.',
      'Ejecutar Intersección entre la faja de retiro y los predios catastrales para identificar invasiones.',
      'Calcular el área total de afectación y cuantificar los predios en zona de riesgo.',
      'Auditar y corregir la coherencia de métricas geométricas en la tabla de atributos.'
    ],
    deliverable: 'Capa faja_retiro e interseccion_predios guardadas en proyecto_iguana.gpkg.'
  },
  {
    code: 'G08',
    week: 8,
    moduleId: 'M2',
    title: 'Descarga y Preprocesamiento de Modelos DEM Ráster',
    duration: '90 min',
    modality: '100% Individual (Hito 2 · 20%)',
    software: 'QGIS 3.x LTR / GDAL',
    dataRequired: 'DEM ALOS PALSAR 12.5 m / DEM SRTM 30 m de la Cuenca La Iguaná',
    summary: 'Descarga de datos de elevación, reproyección estricta con GDAL Warp a MAGNA-SIRGAS CTM12 (EPSG:9377) con remuestreo bilineal y entrega de Hito 2.',
    steps: [
      'Cargar el DEM crudo descargado de Alaska Satellite Facility (ALOS PALSAR 12.5 m).',
      'Ejecutar Raster → Proyecciones → Combar (Reproyectar) asignando el CRS EPSG:9377 y remuestreo Bilineal.',
      'Recortar el DEM reproyectado utilizando como máscara el polígono oficial de la cuenca (46.25 km²).',
      'Inspeccionar el rango altimétrico: valor mínimo 1.450 msnm y valor máximo 2.950 msnm.',
      'Presentar la Evaluación Práctica Integradora 1 (Hito 2 · 20%) en Sala de Cómputo.'
    ],
    deliverable: 'Archivo dem_iguana_ctm12.tif preprocesado y evaluación de Hito 2.'
  },
  {
    code: 'G09',
    week: 9,
    moduleId: 'M2',
    title: 'Modelación de Pendientes, Aspecto y Sombreado 3D (Hillshade)',
    duration: '90 min',
    modality: 'En equipo',
    software: 'QGIS 3.x LTR',
    dataRequired: 'dem_iguana_ctm12.tif',
    summary: 'Derivación de capas de terreno: pendiente en grados y porcentaje, sombreado de relieve hillshade (azimut 315°, altitud 45°) y mapa de susceptibilidad.',
    steps: [
      'Ejecutar Raster → Análisis → Pendiente en grados y repetir en porcentaje.',
      'Reclasificar la pendiente según el POT de Medellín: Plano (0-15%), Moderado (15-30%), Fuerte (30-60%) y Escarpado (>60%).',
      'Generar el modelo de sombras (Hillshade) con azimut de 315° y altitud solar de 45°.',
      'Superponer la pendiente coloreada sobre el hillshade aplicando modo de mezcla "Multiplicar" para visualización 3D.',
      'Identificar las laderas de Boquerón con pendiente crítica mayor al 60%.'
    ],
    deliverable: 'Capas raster pendientes_pct.tif y hillshade_iguana.tif integradas al proyecto.'
  },
  {
    code: 'G10',
    week: 10,
    moduleId: 'M2',
    title: 'Álgebra de Mapas (Raster Calculator) y Perfil Longitudinal del Cauce',
    duration: '90 min',
    modality: '100% Individual',
    software: 'QGIS 3.x LTR / Plugin Profile Tool',
    dataRequired: 'dem_iguana_ctm12.tif y eje_cauce_iguana.shp',
    summary: 'Formulación booleana condicional en Raster Calculator para zonificación de amenaza y trazado del perfil de elevación desde Boquerón hasta el Río Medellín.',
    steps: [
      'Abrir Raster Calculator y formular la condición booleana: ("pendientes_deg@1" > 30) * 1.',
      'Instalar el complemento Profile Tool en QGIS.',
      'Trazar el perfil longitudinal a lo largo del cauce principal de La Iguaná (15 km de recorrido).',
      'Extraer el desnivel vertical: 1.500 metros (cota inicial 2.950 msnm, cota final 1.450 msnm).',
      'Calcular la pendiente media del cauce: S = (1500 / 15000) * 100 = 10.0%.'
    ],
    deliverable: 'Gráfico exportado del perfil longitudinal del cauce y mapa de amenaza por alta pendiente (insumos para Hito 4 e Hito 5).'
  },
  {
    code: 'G11',
    week: 11,
    moduleId: 'M3',
    title: 'Cápsula Esencial GNSS y Verificación Espacial de Datos GPX/CSV en QGIS',
    duration: '45 min',
    modality: '100% Individual (Cápsula GNSS)',
    software: 'QGIS 3.x LTR',
    dataRequired: 'Paquete insumos_g11_gnss/ (traza_cruda_eafit.gpx, campo_garmin_crudo.gpx, campo_smartphone_crudo.csv, vertices_control_igac.gpkg)',
    summary: 'Síntesis práctica de posicionamiento satelital GNSS, importación de waypoints y tracks en QGIS, filtrado por HDOP y reproyección a CTM12.',
    steps: [
      'Cargar desde insumos_g11_gnss/ los archivos .gpx y .csv en QGIS.',
      'Inspeccionar los atributos de calidad satelital (hdop, sat, ele).',
      'Filtrar registros con HDOP <= 2.0 descartando saltos por multitrayectoria en cañones urbanos.',
      'Reproyectar de WGS84 (EPSG:4326) a MAGNA-SIRGAS CTM12 (EPSG:9377) y contrastar con vértices IGAC.'
    ],
    deliverable: 'Capas GNSS depuradas en EPSG:9377 con cálculo de RMSE horizontal (insumos para Hito 4).'
  },
  {
    code: 'G12',
    week: 12,
    moduleId: 'M4',
    title: 'Teledetección Satelital en QGIS I: Bandas Sentinel-2, Ráster Virtual y Compuestos RGB/CIR',
    duration: '60 min',
    modality: '100% Individual',
    software: 'QGIS 3.x LTR',
    dataRequired: 'Bandas Sentinel-2 Nivel 2A de La Iguaná en EPSG:9377 (insumos_g12_g13_sentinel2/: s2_b02_azul.tif, s2_b03_verde.tif, s2_b04_rojo.tif, s2_b08_nir.tif, s2_b11_swir1.tif)',
    summary: 'Construcción de Ráster Virtual (.vrt) en QGIS con bandas de Sentinel-2 L2A y renderizado multibanda en Color Verdadero (4-3-2) y Falso Color Infrarrojo (8-4-3).',
    steps: [
      'Cargar desde insumos_g12_g13_sentinel2/ (o Copernicus Browser) las bandas recortadas de Sentinel-2 de La Iguaná (s2_b02_azul.tif, s2_b03_verde.tif, s2_b04_rojo.tif, s2_b08_nir.tif, s2_b11_swir1.tif) en EPSG:9377.',
      'Ejecutar Ráster → Miscelánea → Construir ráster virtual (Build Virtual Raster) con las bandas en secuencia ascendente.',
      'Activar obligatoriamente la casilla "Colocar cada archivo de entrada en una banda separada".',
      'Configurar la simbología Color multibanda en Color Verdadero (Rojo=s2_b04_rojo, Verde=s2_b03_verde, Azul=s2_b02_azul).',
      'Duplicar la capa y configurar el Falso Color Infrarrojo (Rojo=s2_b08_nir, Verde=s2_b04_rojo, Azul=s2_b03_verde) e inspeccionar firmas espectrales.'
    ],
    deliverable: 'Ráster virtual stack_s2_10m_iguana_9377.vrt y composiciones RGB y CIR en el proyecto de QGIS.'
  },
  {
    code: 'G13',
    week: 13,
    moduleId: 'M4',
    title: 'Teledetección Satelital en QGIS II: Índices Espectrales NDVI / NDBI y Fusión 3D',
    duration: '75 min',
    modality: '100% Individual',
    software: 'QGIS 3.x LTR',
    dataRequired: 'Bandas Sentinel-2 en insumos_g12_g13_sentinel2/ (s2_b04_rojo.tif, s2_b08_nir.tif, s2_b11_swir1.tif) y Hillshade 3D de La Iguaná',
    summary: 'Cálculo directo de NDVI y NDBI en la Calculadora Ráster de QGIS, generación de máscaras booleanas (vegetacion_densa_ndvi.tif), estadísticas de capa ráster y fusión Multiplicar con el Hillshade.',
    steps: [
      'Abrir la Calculadora Ráster de QGIS y calcular NDVI = ("s2_b08_nir@1" - "s2_b04_rojo@1") / ("s2_b08_nir@1" + "s2_b04_rojo@1") en EPSG:9377.',
      'Calcular el índice urbano NDBI = ("s2_b11_swir1@1" - "s2_b08_nir@1") / ("s2_b11_swir1@1" + "s2_b08_nir@1").',
      'Generar la máscara booleana de vegetación densa vegetacion_densa_ndvi.tif con ("ndvi_iguana_10m@1" >= 0.50) * 1.',
      'Ejecutar Estadísticas de capa ráster para obtener mínimo, máximo, media y porcentaje de vegetación densa.',
      'Renderizar el NDVI con rampa RdYlGn y modo de mezcla Multiplicar sobre el Hillshade del DEM.'
    ],
    deliverable: 'Rásteres ndvi_iguana_10m.tif (ndvi_iguana_9377.tif), vegetacion_densa_ndvi.tif y ndbi_iguana_9377.tif listos para Hito 4 e Hito 5.'
  },
  {
    code: 'G14',
    week: 14,
    moduleId: 'M5',
    title: 'ArcGIS Pro: Entorno Corporativo, File Geodatabases y Servicios REST',
    duration: '60 min',
    modality: '100% Individual (Hito 4 · 20% en S14)',
    software: 'ArcGIS Pro / QGIS 3.x LTR',
    dataRequired: 'Capas de proyecto_iguana.gpkg e insumos ráster',
    summary: 'Exploración de ArcGIS Pro (.aprx), estructura de File Geodatabase (.gdb), Feature Datasets en EPSG:9377, dominios de atributos, servicios REST y entrega de Hito 4.',
    steps: [
      'Explorar la interfaz de ArcGIS Pro (.aprx) y su equivalencia directa con QGIS (.qgz).',
      'Crear la File Geodatabase Iguana_Corporativo.gdb y un Feature Dataset en EPSG:9377.',
      'Configurar dominios de atributos (valores codificados y rangos) para validación de tablas.',
      'Conectarse a servicios ArcGIS REST de GeoMedellín / AMVA / SIATA.',
      'Presentar la Evaluación Práctica Integradora 2 (Hito 4 · 20%) en Sala de Cómputo.'
    ],
    deliverable: 'File Geodatabase (.gdb) y Evaluación Práctica Integradora 2 (Hito 4).'
  },
  {
    code: 'G15',
    week: 15,
    moduleId: 'M5',
    title: 'Automatización Espacial Dual (ModelBuilder .atbx & Diseñador QGIS .model3)',
    duration: '120 min',
    modality: '100% Individual (Pre-chequeo técnico para Hito 5)',
    software: 'ArcGIS Pro & QGIS 3.x LTR',
    dataRequired: 'Capas de la unidad territorial asignada e insumos ráster',
    summary: 'Construcción de flujos automatizados encadenados en ModelBuilder (ArcGIS Pro) y Diseñador Gráfico de Modelos (QGIS), y pre-chequeo técnico de rutas y geodatabases para el Hito 5.',
    steps: [
      'Abrir ModelBuilder en ArcGIS Pro y el Diseñador Gráfico de Modelos en QGIS.',
      'Encadenar entradas vectoriales/ráster, Buffer de retiro hídrico y cruce con zonas críticas.',
      'Configurar parámetros de usuario reutilizables (P) y validar la ejecución limpia del flujo en ambas herramientas.',
      'Realizar el pre-chequeo técnico en sala asegurando 0 rutas rotas y 0 corrupción en la File Geodatabase (.gdb).'
    ],
    deliverable: 'Modelos automatizados (.model3 y .atbx) validados y pre-chequeo técnico aprobado para Hito 5.'
  },
  {
    code: 'G16',
    week: 16,
    moduleId: 'M6',
    title: 'Cierre Integrador: Hito 5 Proyecto Final Individual y Pitch Ejecutivo',
    duration: '270 min (12:00 m. – 4:30 p.m.)',
    modality: '100% Individual (Hito 5 · 20%: Modelo + Dossier A3 + Pitch Ejecutivo 4+3 min)',
    software: 'QGIS 3.x LTR & ArcGIS Pro',
    dataRequired: 'Paquete individual Hito 5: modelos (.atbx / .model3), Dossier A3 (PDF 300 dpi) y geodatabases (.gpkg y .gdb)',
    summary: 'Sub-bloque 1 (12:00 m. – 1:50 p.m.): Verificación final de empaquetado y apertura de proyectos en limpio. Pausa activa (1:50 p.m. – 2:10 p.m.). Sub-bloque 2 (2:10 p.m. – 4:30 p.m.): Pitch Ejecutivo Relámpago individual (4+3 min) operando QGIS LTR y ArcGIS Pro en vivo.',
    steps: [
      'Sub-bloque 1 (110 min): Abrir proyectos (.qgz y .aprx) desde carpeta descomprimida verificando cero rutas rotas y ejecución del modelo.',
      'Sub-bloque 2 (140 min): Sustentar individualmente el Pitch Ejecutivo (4 min de exposición con Dossier A3 + 3 min de preguntas del docente operando el software en vivo).',
      'Emitir el Acta Oficial de Calificación y Comprobante SHA-256 desde la plataforma GeoLab Iguaná.'
    ],
    deliverable: 'Dossier Infográfico A3 (PDF 300 dpi), modelos (.atbx y .model3), geodatabases (.gpkg y .gdb) y sustentación oral individual (Hito 5 · 20%).'
  }
];

export const GLOSSARY_EXPANDED = [
  { term: 'Geomática', def: 'Ciencia y tecnología interdisciplinaria encargada de la adquisición, modelado, tratamiento, almacenamiento, análisis y difusión de información espacial o georreferenciada.' },
  { term: 'SIG (GIS)', def: 'Sistema de Información Geográfica. Integración de hardware, software, datos espaciales, métodos y personas para resolver problemas sobre el territorio.' },
  { term: 'Dato Espacial', def: 'Información que reúne simultáneamente una componente geométrica (DÓNDE), una componente temática (QUÉ) y una componente temporal (CUÁNDO).' },
  { term: 'Modelo Vectorial', def: 'Estructura discreta de coordenadas que modela el mundo mediante Puntos (0D), Líneas (1D) y Polígonos (2D).' },
  { term: 'Modelo Ráster', def: 'Matriz regular continua de celdas o píxeles donde cada celda almacena un valor numérico representativo (altitud, temperatura, reflectancia).' },
  { term: 'Geoide', def: 'Superficie equipotencial del campo gravitatorio terrestre coincidente con el nivel medio del mar en reposo. Superficie física de referencia para alturas ortométricas (msnm).' },
  { term: 'Elipsoide', def: 'Figura matemática regular generada al rotar una elipse sobre su eje menor (ej. GRS80 o WGS84). Base matemática para proyectar coordenadas.' },
  { term: 'Datum Geodésico', def: 'Conjunto de parámetros que definen la posición y orientación de un elipsoide de referencia respecto a la Tierra.' },
  { term: 'MAGNA-SIRGAS', def: 'Marco Geocéntrico Nacional de Referencia oficial de Colombia, densificación de SIRGAS basado en el elipsoide GRS80.' },
  { term: 'CTM12 (EPSG:9377)', def: 'Proyección Transversa de Mercator con Origen Nacional único para Colombia (Res. IGAC 471/2020), con meridiano central 73° W, latitud origen 4° N, Falso Este 5.000.000 m y Falso Norte 2.000.000 m.' },
  { term: 'Escala Numérica', def: 'Razón matemática 1:N entre la distancia en el papel y la distancia real en el terreno (D = d * N).' },
  { term: 'Escala Gráfica', def: 'Línea graduada dibujada en el mapa que mantiene su calibración proporcional exacta incluso cuando el plano se fotocopia, reduce o proyecta en pantalla.' },
  { term: 'Criterio de Nyquist', def: 'Principio que establece que la resolución del píxel (R) debe ser como máximo la mitad del tamaño del objeto a detectar (W): R <= W/2.' },
  { term: 'GeoPackage (.gpkg)', def: 'Estándar abierto del OGC basado en SQLite que almacena múltiples capas vectoriales y ráster en un único archivo portable de hasta 140 TB sin truncar atributos.' },
  { term: 'WMS', def: 'Web Map Service. Servicio estándar del OGC que entrega mapas georreferenciados en formato de imagen ráster (PNG/JPEG).' },
  { term: 'WFS', def: 'Web Feature Service. Servicio estándar del OGC que transfiere geometrías vectoriales crudas y tablas de atributos completas para análisis y geoprocesamiento.' },
  { term: 'Snapping (Auto-ensamblado)', def: 'Mecanismo asistido de digitalización que atrae magnéticamente el cursor del usuario al vértice o segmento más cercano dentro de una tolerancia en píxeles.' },
  { term: 'Topología', def: 'Rama matemática del análisis espacial que estudia las relaciones espaciales entre objetos (adyacencia, contención, conectividad) independientes de sus coordenadas.' },
  { term: 'Buffer (Zona de amortiguamiento)', def: 'Operación espacial de proximidad que genera un polígono perimétrico a una distancia radial fija en metros alrededor de entidades geométricas.' },
  { term: 'Clip (Recorte)', def: 'Operación de extracción espacial que utiliza un polígono delimitador para recortar los elementos de otra capa que caen dentro de su perímetro.' },
  { term: 'Intersect (Intersección)', def: 'Operación que combina las áreas compartidas entre dos capas poligonales, fusionando sus tablas de atributos y descartando zonas externas.' },
  { term: 'Dissolve (Disolución)', def: 'Operación espacial que fusiona polígonos adyacentes o superpuestos en una única geometría continua borrando linderos internos comunes.' },
  { term: 'DEM (MDT)', def: 'Modelo Digital de Elevación. Matriz ráster donde cada celda contiene el valor de altitud en metros sobre el nivel del mar (msnm).' },
  { term: 'Pendiente (%)', def: 'Tangente del ángulo de inclinación multiplicada por 100: (Desnivel vertical / Distancia horizontal) * 100. Pendiente de 45° = 100%.' },
  { term: 'Hillshade (Sombreado)', def: 'Técnica de renderizado ráster que simula iluminación solar oblicua (azimut 315°, altitud 45°) para dar apariencia 3D al relieve montañoso.' },
  { term: 'GNSS', def: 'Global Navigation Satellite Systems. Red de constelaciones de satélites (GPS, GLONASS, Galileo, BeiDou) que provee posicionamiento tridimensional continuo.' },
  { term: 'DOP (Dilución de Precisión)', def: 'Medida de la geometría relativa de los satélites visibles en el cielo. Un DOP bajo (<2) indica satélites dispersos y alta exactitud métrica.' },
  { term: 'RMSE (Error Cuadrático Medio)', def: 'Parámetro estadístico estandarizado (Root Mean Square Error) que cuantifica la discrepancia métrica entre mediciones de campo y coordenadas oficiales del IGAC.' },
  { term: 'NDVI', def: 'Normalized Difference Vegetation Index. Índice biofísico satelital: (NIR - Red) / (NIR + Red). Valores >0.5 indican vegetación densa y saludable.' },
  { term: 'NDBI', def: 'Normalized Difference Built-up Index. Índice satelital de área construida impermeable: (SWIR - NIR) / (SWIR + NIR).' },
  { term: 'File Geodatabase (.gdb)', def: 'Estructura corporativa de almacenamiento espacial de ESRI que organiza Feature Datasets, Feature Classes, subtipos y dominios de atributos.' },
  { term: 'ModelBuilder', def: 'Interfaz de programación visual de ArcGIS Pro para encadenar flujos de geoprocesamiento y automatizar modelos territoriales con parámetros.' },
  { term: 'Faja de Retiro Hídrico', def: 'Zona de protección ambiental obligatoria de 30 metros a cada lado de las corrientes de agua estipulada por el POT de Medellín y Corantioquia.' },
  { term: 'Cuenca La Iguaná', def: 'Territorio central del curso en Medellín. Área de 46.25 km², nace en Boquerón (2.950 msnm) y desemboca en el Río Medellín (1.450 msnm) con pendiente media del 10%.' }
];

export const GEOSERVICES_DIRECTORY = [
  {
    name: 'GeoMedellín (Infraestructura de Datos Espaciales de Medellín)',
    type: 'WMS / WFS / REST',
    url: 'https://geomedellin.medellin.gov.co/',
    description: 'Catastro municipal, ortofotos de alta resolución, estratificación, red vial y manzanas del POT.'
  },
  {
    name: 'AMVA (Área Metropolitana del Valle de Aburrá)',
    type: 'WMS / REST',
    url: 'https://www.metropol.gov.co/',
    description: 'Cartografía metropolitana, zonificación ambiental, fajas de retiro hídrico y coberturas del suelo.'
  },
  {
    name: 'SIATA (Sistema de Alerta Temprana de Medellín y el Valle de Aburrá)',
    type: 'API / REST',
    url: 'https://siata.gov.co/',
    description: 'Estaciones pluviométricas en tiempo real, radar meteorológico, sensores de nivel en La Iguaná y manchas de inundación.'
  },
  {
    name: 'Colombia en Mapas (IGAC)',
    type: 'WMS / WFS / Catálogo Nacional',
    url: 'https://www.colombiaenmapas.gov.co/',
    description: 'Cartografía básica oficial del Estado colombiano, red geodésica MAGNA-SIRGAS y límites político-administrativos.'
  }
];
