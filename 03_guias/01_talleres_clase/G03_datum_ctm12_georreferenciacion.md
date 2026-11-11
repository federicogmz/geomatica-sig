# G03: Geodesia MAGNA-SIRGAS CTM12 (EPSG:9377), transformaciones espaciales y georreferenciación

> **Semestre / Ciclo:** 2027-1  
> **Semana / Fecha:** Semana 3 (`S03`) · Jueves 04 de febrero de 2027  
> **Horario oficial:** 12:00 m. – 4:30 p.m. (4.5 h presenciales en Sala de Cómputo EAFIT)  
> **Modalidad:** 100 % Individual  
> **Software en Sala:** QGIS LTR + ArcGIS Pro (Licencia institucional Advanced)  
> **Cuenca Escuela de Demostración:** Cuenca de la Quebrada La Iguaná (Sector Boquerón – Presa de Laminación Cra. 70)  
> **Área de Aplicación Individual:** Unidad Territorial Única (`U01` a `U30`)  

---

## 1. Presupuesto de Tiempo Semanal (Dedicación Total: hasta 9.0 h)

| Bloque de Actividad | Franja Horaria / Duración | Entorno y Enfoque Pedagógico |
|---|:---:|---|
| **Sub-bloque 1: Fundamento y QGIS LTR** | `12:00 m. – 1:50 p.m.` (110 min) | Sala de Cómputo: Geodesia colombiana (Res. 471/2020), distinción crítica **Asignar proyección** vs. **Reproyectar**, y georreferenciación de planos con control de RMSE en QGIS LTR. |
| **Pausa Activa Pedagógica** | `1:50 p.m. – 2:10 p.m.` (20 min) | Descanso cognitivo y almuerzo ligero integrado. |
| **Sub-bloque 2: Espejo ArcGIS Pro y Unidad** | `2:10 p.m. – 4:25 p.m.` (135 min) | Sala de Cómputo: Herramientas **Define Projection** frente a **Project** en ArcGIS Pro, Georeferencing Tool y homologación de la unidad `U01`–`U30`. |
| **Protocolo de Cierre en Sala** | `4:25 p.m. – 4:30 p.m.` (5 min) | Empaquetado `C:\Temp\SIG_Usuario\ -> .zip`, copia a USB/Drive institucional y purga local. |
| **Trabajo Autónomo Independiente** | $\le 4.5\text{ h}$ semanales | PC Personal / Casa: Georreferenciación de insumos complementarios y resolución del taller de preparación para el Hito 1. |

---

## 2. Fundamento Geodésico: El Sistema Oficial CTM12 (EPSG:9377)

Mediante la **Resolución 471 de 2020**, el Instituto Geográfico Agustín Codazzi (IGAC) adoptó para toda Colombia la proyección **Transversa de Mercator con Origen Nacional único (CTM12 / EPSG:9377)**, vinculada al marco de referencia geocéntrico **MAGNA-SIRGAS** (elipsoide GRS80).

Esta norma sustituyó los cinco antiguos orígenes Gauss-Krüger (Bogotá, Este Central, Este Este, Oeste, Oeste Oeste) y eliminó las distorsiones históricas del antiguo **Datum Bogotá** (referenciado al elipsoide Internacional de Hayford 1924 con origen astronómico en el Observatorio Astronómico Nacional), el cual generaba desplazamientos relativos de más de **500 metros** frente a observaciones satelitales GNSS modernas.

---

## 3. Secuencia Didáctica: Worked-Example Fading

```
[Etapa 1: Ejemplo Resuelto] ──> [Etapa 2: Completación] ──> [Etapa 3: Caso Roto] ──> [Etapa 4: Transferencia U01-U30]
 (Asignar vs. Reproyectar)       (Georreferenciador RMSE)    (Capa 4326 bautizada 9377)  (Espejo Pro + Unidad Propia)
```

### Etapa 1: Ejemplo Trabajado con "Por Qué" (12:00 m. – 12:50 p.m.)

#### La Distinción Crítica: Asignar Proyección vs. Reproyectar
Esta es la confusión conceptual más frecuente y costosa en la ingeniería geomática:

| Operación | ¿Qué le hace a las coordenadas físicas de los vértices? | ¿Cuándo se debe usar? | Herramienta en QGIS LTR | Herramienta en ArcGIS Pro |
|---|---|---|---|---|
| **Asignar Proyección (*Define CRS*)** | **NO toca ningún vértice.** Únicamente reescribe la etiqueta de metadatos (`.prj` o cabecera de la tabla espacial). | **EXCLUSIVAMENTE** cuando un archivo no tiene sistema declarado (*CRS desconocido*) o la etiqueta original era errónea. | *Capa $\rightarrow$ Establecer SRC de la capa* | **Define Projection** *(Data Management Tools)* |
| **Reproyectar (*Project / Transform*)** | **Modifica matemáticamente todos los vértices.** Aplica ecuaciones geodésicas rigurosas y genera una nueva capa con las nuevas coordenadas. | Siempre que se desee transformar datos de un sistema válido a otro (ej. de `EPSG:4326` a `EPSG:9377`). | *Capa $\rightarrow$ Guardar objetos como...* / *Reproyectar capa* | **Project** *(Data Management Tools)* |

#### Demostración del Profesor sobre La Iguaná:
1. Cargamos una capa de curvas de nivel del sector San Cristóbal en coordenadas geográficas WGS84 (`EPSG:4326`).
2. Sus coordenadas de vértice se expresan en grados: $X \approx -75.60^\circ$, $Y \approx 6.29^\circ$.
3. Para incorporarla a la base de cálculo de ingeniería en metros, ejecutamos:
   - Menú **Procesos $\rightarrow$ Caja de herramientas $\rightarrow$ Reproyectar capa**.
   - SRC de destino: **EPSG:9377 (MAGNA-SIRGAS / Origen-Nacional)**.
   - Capa resultante: Las coordenadas se transforman a $X \approx 4\,712\,540\text{ m}$, $Y \approx 2\,254\,720\text{ m}$.

> [!NOTE]
> **Prompt de Auto-Explicación Obligatorio 1:**
> *¿Qué ocurriría físicamente con el cálculo del área de un predio si un analista le "Asigna proyección" EPSG:9377 a una capa cuyas coordenadas están en grados decimales (EPSG:4326) en lugar de "Reproyectarla"?*

---

### Etapa 2: Ejemplo de Completación — Fading del Último Paso (12:50 p.m. – 1:20 p.m.)

Se suministra un plano escaneado de ingeniería de la faja de protección de la Quebrada La Iguaná cercano a la Presa de Laminación de la Cra. 70.

```
+---------------------------------------------------------------------------------+
| FLUJO EN QGIS: Menú Capa -> Georreferenciador...                                |
| 1. Abrir imagen escaneada: plano_historico_cra70.png                            |
| 2. Identificar 4 Puntos de Control de Terreno (GCP) en cruces viales conocidos   |
| 3. Configuración de transformación: Polinomial 1 (afín) o Helmert               |
| 4. Método de remuestreo: Bilineal (conserva gradientes de líneas)               |
| 5. SRC de salida: EPSG:9377 (MAGNA-SIRGAS Origen Nacional)                      |
| 6. Control de calidad: Error medio cuadrático residual (RMSE < 2.0 píxeles)     |
+---------------------------------------------------------------------------------+
```

#### Pasos dados en el Georreferenciador:
- Se cargó la imagen escaneada.
- Se capturaron 3 puntos de control en intersecciones viales consolidadas:
  - **GCP 1:** Cruce Cra 70 con Calle 53 ($X = 4\,717\,820.5\text{ m}, Y = 2\,251\,630.2\text{ m}$).
  - **GCP 2:** Cruce Cra 70 con Calle 51 ($X = 4\,717\,835.1\text{ m}, Y = 2\,251\,410.8\text{ m}$).
  - **GCP 3:** Esquina nororiental de la unidad deportiva Atanasio Girardot ($X = 4\,718\,210.0\text{ m}, Y = 2\,251\,550.0\text{ m}$).

#### Paso a completar por el estudiante:
1. Activen la herramienta **Añadir punto (+)** y fijen el **GCP 4** sobre el puente peatonal del canal de La Iguaná usando la opción *"Desde el lienzo del mapa"* referenciada contra la ortofoto de GeoMedellín.
2. Abran la tabla de puntos de control y verifiquen el residuo en píxeles:
   - Error residual reportado: `___________ píxeles`.
3. Si el error supera los $2.5\text{ píxeles}$, desplacen el nodo con la herramienta *Mover punto GCP* hasta que el error medio cuadrático total (RMSE) sea inferior a **2.0 píxeles**.
4. Hagan clic en **Comenzar georreferenciación** y comprueben en el lienzo principal que el canal escaneado calce con la geometría real de la ortofoto oficial.

---

### Etapa 3: Diagnóstico y Reparación de Caso Roto de Consultoría (1:20 p.m. – 1:50 p.m.)

#### El Caso Roto:
Una consultora vial entregó a la Secretaría de Infraestructura un paquete de shapefiles donde la capa de predios a adquirir se llama `predios_adquisicion_9377.shp`. Al cargarla en un proyecto de QGIS configurado en CTM12 (`EPSG:9377`), el lienzo del mapa queda en blanco. Al hacer clic derecho $\rightarrow$ *Zoom a la capa*, el visor se desplaza al Océano Atlántico frente a las costas de África ecuatorial (en las proximidades del meridiano de Greenwich y el ecuador). Al abrir la tabla de atributos y revisar las coordenadas de los vértices, los valores son:
```text
X = -75.584321
Y = 6.251430
```
El analista junior argumentó: *"Yo le di clic derecho a la capa en QGIS, entré a Propiedades, fui a la pestaña SRC y le asigné EPSG:9377 porque el contrato exigía entregar en CTM12"*.

```
+-----------------------------------------------------------------------------------+
| DIAGNÓSTICO DEL ERROR DE CONSULTORÍA:                                             |
| Coordenadas reales de los vértices: [-75.58, 6.25] (Están en GRADOS DECIMALES)    |
| Se aplicó: Asignar Proyección (Define CRS) = EPSG:9377                            |
| Consecuencia: QGIS interpreta que el predio mide -75.58 METROS por 6.25 METROS    |
| respecto al origen CTM12 (X0=5.000.000, Y0=2.000.000).                           |
| ¡El predio quedó flotando a 5.000 km de Medellín en el Golfo de Guinea!           |
+-----------------------------------------------------------------------------------+
```

#### Andamiaje de Análisis del Error (Responde en tu libreta técnica):
1. **Detectar:** ¿Cuál fue la confusión conceptual cometida por el analista y qué síntoma visual y numérico delata inmediatamente que la capa no fue reproyectada?
2. **Explicar:** ¿Por qué "Asignar proyección" no transforma los números de los vértices y cuál es la diferencia matemática frente a una verdadera "Reproyección"?
3. **Corregir:** Escribe el procedimiento exacto paso a paso para reparar esta capa:
   - Paso A: Restaurar el CRS original verdadero (`EPSG:4326`) mediante *Establecer SRC de la capa*.
   - Paso B: Ejecutar la transformación métrica real mediante la herramienta *Reproyectar capa* hacia `EPSG:9377`.
   - Paso C: Comprobar que los nuevos vértices queden en el rango métrico de Medellín ($X \approx 4.7\text{ M}, Y \approx 2.2\text{ M}$).

---

*(1:50 p.m. – 2:10 p.m. · Pausa Activa Pedagógica / Almuerzo Ligero)*

---

### Etapa 4: Espejo Corporativo en ArcGIS Pro y Transferencia a su Unidad Territorial (2:10 p.m. – 4:25 p.m.)

#### A. Espejo en ArcGIS Pro: Define Projection frente a Project:
1. En **ArcGIS Pro**, abran el panel **Geoprocessing**.
2. Busquen la herramienta:
   ```text
   Define Projection (Data Management Tools)
   ```
   - *Finalidad:* Graba o actualiza la etiqueta de referencia espacial en el archivo `.prj`. **No crea una nueva clase de entidad.**
3. Busquen la herramienta:
   ```text
   Project (Data Management Tools)
   ```
   - *Finalidad:* Toma las geometrías de entrada, aplica la transformación geodésica y exporta una **nueva clase de entidad** (*Output Feature Class*) con los vértices recalculados en el nuevo sistema.
4. Experimenten con ambas herramientas sobre una capa de prueba y verifiquen en las propiedades de la entidad (*Layer Properties $\rightarrow$ Source $\rightarrow$ Spatial Reference*) el cambio en las coordenadas de la extensión (*Extent*).

#### B. Georreferenciación en ArcGIS Pro:
1. En la pestaña **Map**, añadan el archivo ráster `plano_historico_cra70.png`.
2. Seleccionen la capa ráster en el panel de contenidos y vayan a la pestaña contextual **Imagery $\rightarrow$ Georeference**.
3. Utilicen las herramientas:
   - **Fit to Display:** Acerca el plano al área visible.
   - **Add Control Points:** Captura pares de puntos entre el plano escaneado y el mapa base.
   - **Transformation:** Seleccionen **1st Order Polynomial (Affine)**.
4. Abran la tabla de enlaces (**Control Points Table**) y verifiquen que el **Forward Residual** no exceda la tolerancia admisible.
5. Hagan clic en **Save** para actualizar los encabezados o en **Save As New** para generar un GeoTIFF proyectado en `EPSG:9377`.

#### C. Transferencia Autónoma a la Unidad Territorial `U01` a `U30`:
1. Identifiquen la cartografía base preliminar de su cuenca asignada.
2. Si disponen de capas en coordenadas geográficas WGS84 (`EPSG:4326`) o en el antiguo sistema Magna Medellín (`EPSG:3116`), apliquen la herramienta **Project** en ArcGIS Pro (o *Reproyectar capa* en QGIS) seleccionando como destino:
   ```text
   EPSG:9377 - MAGNA-SIRGAS 2018 / Origen-Nacional
   ```
3. Garanticen que la capa de salida quede guardada en su carpeta local:
   ```text
   C:\Temp\SIG_Usuario\02_datos_vectoriales\red_hidrica_Uxx_9377.shp (o .gpkg)
   ```
4. Verifiquen que la extensión espacial de la capa resultante presente coordenadas coherentes con el Valle de Aburrá.

---

## 4. Protocolo Obligatorio de Cierre en Sala (4:25 p.m. – 4:30 p.m. · 5 min)

1. Cierren las sesiones de QGIS y ArcGIS Pro guardando sus proyectos.
2. Vayan a `C:\Temp\` en el Explorador de archivos.
3. Compriman la carpeta de trabajo:
   ```text
   SIG_Uxx_Apellido_Nombre_S03.zip
   ```
4. Respáldenlo en su memoria USB y en la nube de EAFIT.
5. Purguen la carpeta `C:\Temp\SIG_Usuario\` antes de dejar el computador de la sala.

---

## 5. Checklist de Verificación y Entrega

- [ ] Comprendo la diferencia física entre el Datum Bogotá y el marco MAGNA-SIRGAS CTM12 (`EPSG:9377`).
- [ ] Domino la distinción operativa entre *Asignar proyección* (*Define*) y *Reproyectar* (*Project*).
- [ ] Georreferencié un plano escaneado en QGIS LTR garantizando un RMSE residual $< 2.0\text{ píxeles}$.
- [ ] Resolví las 3 preguntas del Caso Roto de la capa en grados mal clasificada.
- [ ] Ejecuté las herramientas homólogas en ArcGIS Pro (*Define Projection*, *Project* y *Georeference*).
- [ ] Homologué las capas base de mi unidad territorial `U01`–`U30` a `EPSG:9377`.
- [ ] Ejecuté el cierre seguro de 5 minutos en `C:\Temp`.
