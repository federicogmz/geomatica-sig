# Pacto Pedagógico: Geomática, Ingeniería y SIG

> **Semestre / Hito:** **2026-1 (Estado de cierre ejecutado)**  
> Este documento se presenta y se acuerda con el grupo en la **Semana 1**, conforme al Reglamento Académico de Pregrado de la Universidad EAFIT (Art. 63, literal l): todo estudiante tiene derecho a conocer, desde la primera sesión de clase, el programa de la asignatura, la metodología formativa y el porcentaje de cada actividad evaluativa en la nota final. Complementa el [Sílabo del curso](SILABO.md) y el [Programa Docente](PROGRAMA_DOCENTE.md).
>
> **Ficha Técnica de la Asignatura:** **3 Créditos Académicos · 5 UMEs** · Duración de 16 semanas ($4.5\text{ h/semana}$ de acompañamiento directo en aula y laboratorio $[72\text{ h semestrales}]$ + $4.5\text{ h/semana}$ de trabajo independiente $[72\text{ h semestrales}]$ = **$144\text{ h}$ totales** de dedicación estudiantil).

---

## 1. Requisitos Técnicos y Logística de Trabajo

- [ ] **QGIS (versión LTR oficial):** Instalar la última versión de soporte extendido (LTR) disponible al inicio del semestre en su laptop personal antes de la Semana 4. Ya se encuentra instalada en los PC del laboratorio universitario (Bloque 2), por lo que la instalación personal es para trabajar fuera de clase.
- [ ] **Insumos de Teledetección Satelital (Sentinel-2 en QGIS):** Acceso mediante el complemento `STAC API Browser` en QGIS / **Copernicus Browser** ([browser.dataspace.copernicus.eu](https://browser.dataspace.copernicus.eu/)) y respaldo de paquetes de bandas multiespectrales de La Iguaná en `EPSG:9377` dispuestos en Teams para su procesamiento local en la Calculadora Ráster de QGIS en la Semana 14.
- [ ] **Almacenamiento de datos del proyecto:** Memoria USB (mínimo 16 GB) o disco duro externo. **No se recomienda trabajar directamente sobre carpetas sincronizadas en la nube (OneDrive/Google Drive)** durante la ejecución de QGIS en los PC del laboratorio, ya que genera bloqueos de lectura/escritura y rutas rotas.
- [ ] **Licencia institucional ArcGIS Pro (Sesión demostrativa Semana 15):** Gestionada por el docente con el área de TI de la Universidad para la sesión demostrativa/conceptual de la Semana 15 (toda la práctica evaluable y las entregas de la Semana 16 se ejecutan **100 % en QGIS LTR**).

---

## 2. Metodología de Trabajo en Aula y Laboratorio

- **Nivel de partida:** El curso arranca **desde cero absoluto** en SIG y geomática. No se asume conocimiento previo en sistemas de coordenadas, topografía ni manejo de software.
- **Estructura de clase integrada:** Cada sesión se divide en dos bloques articulados:
  - **Bloque 1 (12:00–3:00 p.m., Aula / PC):** Fundamentación conceptual, lectura crítica de cartografía, discusión territorial y evaluaciones individuales.
  - **Bloque 2 (4:30–6:00 p.m., Laboratorio PC):** Práctica inmediata de software, conexión a geoservicios oficiales y aplicación al proyecto territorial.
- **Regla de las tres clases:** Durante las primeras 3 sesiones de QGIS (Semanas 4 a 6), cualquier duda sobre la interfaz o herramientas básicas se resuelve de forma guiada y personalizada. A partir de la 4ª clase de software, las dudas sobre operaciones ya explicadas (cargar capas, configurar CRS, abrir calculadora de campos) se resolverán remitiendo a las guías de clase y a las notas personales del estudiante.
- **Evaluaciones individuales en clase:** Los quices y parciales se resuelven de forma individual y presencial durante las sesiones de clase para garantizar la autoría individual y la resolución técnica propia.

---

## 3. Estructura Evaluativa Oficial

> Conforme al Reglamento Académico de Pregrado de EAFIT, ninguna actividad evaluativa individual supera el 20% (todas se ubican entre el 5% y el 20%).

| Código | Actividad Evaluativa | % | Modalidad | Semana (Fecha) | Instructivo Oficial | Estado (`2026-1`) |
|:---:|---|:---:|---|:---:|---|---|
| **Q1** | Quiz 1: Fundamentos cartográficos y CTM12 | **8%** | Individual, presencial | 3 (30 jul) | [INSTRUCTIVO_EVALUACION_Q1.md](../03_guias/03_evaluaciones/INSTRUCTIVO_EVALUACION_Q1.md) | **Realizado** |
| **Q2** | Quiz 2: SIG vectorial y atributos en QGIS | **8%** | Individual, en laboratorio | 6 (20 ago) | [INSTRUCTIVO_EVALUACION_Q2.md](../03_guias/03_evaluaciones/INSTRUCTIVO_EVALUACION_Q2.md) | **Realizado** |
| **I1** | **Informe 1: Diagnóstico Vectorial y Propuesta A3** | **12%** | Grupal (Lámina digital A3 + `.gpkg`) | 10 (17 sep) | [INSTRUCTIVO_ENTREGA_I1.md](../03_guias/03_evaluaciones/INSTRUCTIVO_ENTREGA_I1.md) | **Realizado** |
| **P1** | **Parcial 1: SIG Vectorial y Topología** | **15%** | Individual, práctico en PC | 11 (24 sep) | [INSTRUCTIVO_EVALUACION_P1.md](../03_guias/03_evaluaciones/INSTRUCTIVO_EVALUACION_P1.md) | **Realizado** |
| **Q3** | Quiz 3: Terreno y Álgebra Ráster | **8%** | Individual, en laboratorio | 13 (15 oct) | [INSTRUCTIVO_EVALUACION_Q3.md](../03_guias/03_evaluaciones/INSTRUCTIVO_EVALUACION_Q3.md) | **Realizado** |
| **Q4** | Quiz 4: Posicionamiento GNSS en Gabinete y Control de Calidad (`HDOP`) | **8%** | Individual, práctico en PC en QGIS (45 min) | 15 (29 oct) | [INSTRUCTIVO_EVALUACION_Q4.md](../03_guias/03_evaluaciones/INSTRUCTIVO_EVALUACION_Q4.md) | **Realizado** |
| **P2** | **Parcial 2: Índices Sentinel-2 (`NDVI`/`NDBI`), Modelo Automatizado `.model3` y Mapa en QGIS** | **15%** | Individual, práctico en PC en QGIS (90 min / 1h30m) | 16 (05 nov) | [INSTRUCTIVO_EVALUACION_P2.md](../03_guias/03_evaluaciones/INSTRUCTIVO_EVALUACION_P2.md) | **Realizado** |
| **IF** | **Informe Final (`IF`): Análisis Territorial, Propuesta de Intervención, Lámina A3 y Sustentación Oral en QGIS** | **26%**<br>*(20% + 6%)* | Grupal en QGIS (`grupoXX_IF.zip` + Defensa Oral 10 min) | 16 (05 nov)<br>*(Avance: 29 oct)* | [INSTRUCTIVO_ENTREGA_IF.md](../03_guias/03_evaluaciones/INSTRUCTIVO_ENTREGA_IF.md)<br>*(Opcional reemplazo 20% técnico: [INSTRUCTIVO_TALLER_RECUPERACION_IF.md](../03_guias/03_evaluaciones/INSTRUCTIVO_TALLER_RECUPERACION_IF.md))* | **Realizado** |
| **Total** | | **100%** | | | | **100% Ejecutado** |

### Reglas Operativas de Grupos y del Informe Final (`IF` con Sustentación)
1. **Conformación de equipos:** Los grupos de proyecto integrador están conformados por **2 o 3 personas** definidas en la Semana 1. El mismo equipo trabaja de forma acumulativa en `I1` y en el **Informe Final (`IF`)** a lo largo de todo el semestre en **QGIS**.
2. **Informe Final (`IF`) simplificado con sustentación (`26%`):** Se concentra el cierre del curso en un **único instructivo ([`INSTRUCTIVO_ENTREGA_IF.md`](../03_guias/03_evaluaciones/INSTRUCTIVO_ENTREGA_IF.md))**, un **único paquete digital simplificado (`grupoXX_IF.zip`)** con solo 3 entregables (`1_proyecto_qgis/`, `2_Lamina_Sintesis_A3_grupoXX.pdf`, `3_Informe_Territorial_grupoXX.pdf` de 4–5 págs.) y una **Sustentación Oral presencial (7 min Pitch + 3 min Preguntas Individuales)** el jueves 05 de noviembre, enfocada en el **análisis territorial y la propuesta de Ingeniería Civil y Diseño Urbano**.
3. **Desglose de la nota del `IF` (`20%` Entrega Técnica + `6%` Sustentación Oral):** En cumplimiento del Reglamento Académico de EAFIT (ninguna nota individual superior al 20%), el `IF` se pondera en **20%** para la entrega técnica/cartográfica y **6%** para la sustentación oral y defensa individual.

---

## 4. Ruta de Mejora Activa (Mecanismo Pedagógico de Recuperación Post-Quiz)

Para consolidar el aprendizaje y premiar el trabajo deliberado en lugar del error puntual:
1. En la sesión inmediatamente posterior a cada Quiz (`Q1`, `Q2`, `Q3`, `Q4`), se presentará en el laboratorio una **nueva herramienta o procedimiento técnico**.
2. Los estudiantes que hayan cometido errores conceptuales o técnicos en el quiz podrán **utilizar esa nueva herramienta para corregir, validar y sustentar la solución adecuada a su evaluación**.
3. La entrega rigurosa y justificada de esta corrección en la fecha establecida permitirá recuperar **hasta el 50% de la nota perdida** en dicho quiz (por ejemplo: una calificación de 1.0/5.0 podrá subir hasta 3.0/5.0; una de 3.0/5.0 podrá subir hasta 4.0/5.0).
4. **Articulación de herramientas:**
   - **Q1 (Cálculo manual, S3) → S4:** Se recupera verificando coordenadas exactas en QGIS con el CRS CTM12 (`EPSG:9377`).
   - **Q2 (Vectorial, S6) → S7:** Se recupera aplicando geoprocesamiento y validación limpia de geometrías y atributos.
   - **Q3 (Terreno y Álgebra Ráster, S13 — 15 oct) → S14 (22 oct):** Se recupera corrigiendo el flujo de pendientes y álgebra ráster en QGIS e integrándolo con el análisis multiespectral de la cuenca.
   - **Q4 (Posicionamiento GNSS en Gabinete, S15 — 29 oct) → S16 (05 nov):** Se recupera corrigiendo la depuración de la traza GPX (`"hdop" <= 2.0`), la importación CSV y la validación posicional contra los vértices IGAC en `EPSG:9377`.

---

## 5. Rúbricas y Solicitud de Segundo Evaluador

- Cada entrega grupal (`I1`, `IF`) y parcial (`P1`, `P2`) cuenta con una **rúbrica analítica detallada** publicada en Teams con anterioridad a la entrega.
- Conforme al Reglamento Académico de Pregrado, en caso de desacuerdo fundamentado con una calificación, el estudiante tiene derecho a solicitar un **segundo evaluador dentro de los 3 días hábiles posteriores a la publicación oficial de la nota**. Vencido dicho plazo, la calificación adquiere firmeza institucional.

---

## 6. Plazos de Calificación y Retroalimentación

- Las calificaciones y observaciones técnicas se publicarán en un plazo máximo de **15 días hábiles** tras la entrega, habitualmente antes de la siguiente sesión evaluativa.
- Si este plazo reglamentario no se cumple, el estudiante tiene el derecho de negarse a presentar la evaluación subsiguiente hasta recibir la retroalimentación pendiente.

---

## 7. Normas Técnicas y Reglas de Entrega

- **Contenedor Oficial de Datos:** El estándar oficial del curso para datos vectoriales es **GeoPackage (`.gpkg`)** en **QGIS**. **Se desaconseja formalmente el uso de Shapefile suelto (`.shp`)**, ya que fragmenta la información y propicia la pérdida de archivos auxiliares (`.prj`, `.dbf`). Tanto el **Parcial 2 (`P2`)** como el **Informe Final (`IF`)** se desarrollan y entregan **100% en QGIS** (`.gpkg` + `.qgz`).
- **Nomenclatura oficial:** Los archivos entregados deben seguir estrictamente el patrón `grupoXX_trabajoX.zip` (p. ej. `grupo02_I1.zip` o `grupo02_IF.zip`).
- **Penalidad por archivos rotos o incompletos:** **−0.5 directo sobre la nota final del trabajo** si el proyecto QGIS abre con advertencias de capas no disponibles (*rutas rotas*), si faltan archivos fuente o si no se configuraron rutas relativas.
- **Modalidad de las Láminas Cartográficas (`I1` e `IF`): 100% Digital:**
  - Se entrega una lámina técnica maquetada en estándar **A3 horizontal ($420 \times 297\text{ mm}$)** exportada en **PDF vectorial de alta resolución (300 ppp)** dentro del archivo `.zip`.
  - **No requiere impresión en papel.** La sustentación oral se realiza proyectando el mapa digital del grupo ante el aula (en la Semana 16, mediante un *pitch* ejecutivo de 7 minutos + 3 minutos de preguntas individuales por equipo en el Bloque 2).
- **Parciales prácticos (`P1` y `P2`):** Se resuelven individualmente en **QGIS** (duración de `P2`: **90 minutos / 1h30m**) y se entregan con el archivo de proyecto `.qgz`, el `.gpkg` y los productos verificables solicitados.
- **Entregas tardías:** Trabajos entregados después de la hora límite fijada tendrán una penalización de **−5% de la nota por cada día calendario de retraso**, hasta un máximo de **5 días calendario**. Cumplido este límite, la calificación será de 0.0, salvo soporte médico o de fuerza mayor formalmente radicado.

---

## 8. Canales de Comunicación y Asesorías

- **Plataforma Oficial:** **Microsoft Teams**. Allí se publicará el material de clase, guías de laboratorio, rúbricas y canales de entrega.
- **Horario de Asesorías:** Martes de 10:00 a.m. a 12:00 m. a través de Teams o presencial previa coordinación.

---

## 9. Integridad Académica y Ética Profesional

- La honestidad académica es un principio formativo irrenunciable (Reglamento Académico, Art. 62).
- El uso de herramientas de Inteligencia Artificial debe orientarse a la comprensión de conceptos y depuración técnica, no a la sustitución de la autoría del trabajo.
- Toda sustentación oral (`I1` e `IF`) tiene como fin prioritario corroborar que los integrantes del grupo comprenden y dominan enteramente los procedimientos técnicos plasmados en sus entregas.
