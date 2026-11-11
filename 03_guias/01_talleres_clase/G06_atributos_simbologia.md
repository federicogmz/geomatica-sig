# G06: Tablas de atributos, métricas geométricas ($area vs area($geometry)), Kit de Diseño de Infografías Cartográficas A3 y Ventana de Mejora Continua H1

> **Semestre / Ciclo:** 2027-1  
> **Semana / Fecha:** Semana 6 (`S06`) · Jueves 25 de febrero de 2027  
> **Horario oficial:** 12:00 m. – 4:30 p.m. (4.5 h presenciales en Sala de Cómputo EAFIT)  
> **Modalidad:** 100 % Individual  
> **Software en Sala:** QGIS LTR + ArcGIS Pro (Licencia institucional Advanced)  
> **Cuenca Escuela de Demostración:** Cuenca de la Quebrada La Iguaná (Medellín)  
> **Área de Aplicación Individual:** Unidad Territorial Única (`U01` a `U30`)  
> **Mecanismo Pedagógico Especial:** **Ventana de Mejora Continua del Hito 1 (Recuperación de hasta el 40 % de puntos deducidos)** habilitada en el Sub-bloque 2  

---

## 1. Presupuesto de Tiempo Semanal (Dedicación Total: hasta 9.0 h)

| Bloque de Actividad | Franja Horaria / Duración | Entorno y Enfoque Pedagógico |
|---|:---:|---|
| **Sub-bloque 1: Atributos y Diseño A3 en QGIS** | `12:00 m. – 1:50 p.m.` (110 min) | Sala de Cómputo: Tipo de datos, `$area` vs. `area($geometry)`, paletas perceptualmente uniformes (*Viridis*/*ColorBrewer*), etiquetado con halo y maquetación A3 con los 8 elementos de ley. |
| **Pausa Activa Pedagógica** | `1:50 p.m. – 2:10 p.m.` (20 min) | Descanso cognitivo y almuerzo ligero integrado. |
| **Sub-bloque 2: ArcGIS Pro y Mejora Hito 1** | `2:10 p.m. – 4:25 p.m.` (135 min) | Sala de Cómputo: **Calculate Geometry Attributes** y **Layout View A3** en ArcGIS Pro + **Ventana de Mejora Continua H1 (+40 %)** + Transferencia a la unidad `U01`–`U30`. |
| **Protocolo de Cierre en Sala** | `4:25 p.m. – 4:30 p.m.` (5 min) | Empaquetado `C:\Temp\SIG_Usuario\ -> .zip`, copia a USB/Drive institucional y purga local. |
| **Trabajo Autónomo Independiente** | $\le 4.5\text{ h}$ semanales | PC Personal / Casa: Ajuste fino de la composición cartográfica A3 y exportación a PDF vectorial de 300 ppp. |

---

## 2. Rigor Matemático en la Calculadora de Campos: `$area` frente a `area($geometry)`

Una de las fuentes de discrepancia más graves en informes técnicos radica en no comprender cómo calcula áreas el motor geométrico de QGIS:

```
+-----------------------------------------------------------------------------------+
| COMPARACIÓN CRÍTICA EN QGIS LTR:                                                 |
|                                                                                   |
| 1. $area:                                                                         |
|    - Es una función dependiente del contexto del PROYECTO.                        |
|    - Si el proyecto tiene configurado un elipsoide (ej. GRS80 o WGS 84), $area     |
|      calcula el área GEODÉSICA/ELIPSOIDAL considerando la curvatura de la Tierra. |
|    - Si en 'Propiedades del proyecto -> General -> Mediciones' el elipsoide está   |
|      fijado en "Ninguno / Planimétrico", $area devuelve el área PLANAR plana.     |
|                                                                                   |
| 2. area($geometry):                                                               |
|    - Es una función PLANAR ESTRICTA que opera directamente sobre las coordenadas  |
|      euclidianas (X, Y) de los vértices almacenados en la CAPA.                   |
|    - Si la capa está en EPSG:9377 (metros), devuelve metros cuadrados planos sin  |
|      considerar deformación por escala cartográfica.                              |
|    - Si la capa estuviera por error en EPSG:4326 (grados), ¡devolvería grados²!   |
+-----------------------------------------------------------------------------------+
```

> [!WARNING]
> Para la ingeniería civil y el catastro urbano en Colombia bajo `EPSG:9377`, ambas métricas discrepan ligeramente debido a la variación del factor de escala puntual ($k$) en la proyección Transversa de Mercator según la distancia angular al meridiano central ($\lambda_0 = 73^\circ\text{ W}$):
> $$k \approx k_0 \left(1 + \frac{(\Delta \lambda)^2 \cos^2(\varphi)}{2}\right)$$
> *(donde $\Delta \lambda = \lambda - \lambda_0$ debe convertirse obligatoriamente a radianes: $2.58^\circ \times \pi / 180 \approx 0.0450\text{ rad}$).*  
> Mientras que en el meridiano central ($73^\circ\text{ W}$) el factor es $k_0 = 0.9992$, en el Valle de Aburrá ($\lambda \approx 75.58^\circ\text{ W}$, a $\approx 285\text{ km}$ al oeste), el factor de escala puntual asciende a $k \approx 1.0002$. En consecuencia, el área planar calculada directamente sobre las coordenadas de la capa proyectada resulta aproximadamente un $0.04\,\%$ mayor que el área geodésica elipsoidal ($k^2 \approx 1.0004$). Debes reportar siempre explícitamente en el membrete si tu métrica es elipsoidal (`$area`) o planar (`area($geometry)`).

---

## 3. Secuencia Didáctica: Worked-Example Fading

```
[Etapa 1: Ejemplo Resuelto] ──> [Etapa 2: Completación] ──> [Etapa 3: Caso Roto] ──> [Etapa 4: Transferencia + Mejora]
 ($area vs. area($geometry))     (Composición A3 Cuadrícula) (Plano con Semiótica Rota) (Layout Pro + Mejora Hito 1)
```

### Etapa 1: Ejemplo Trabajado con "Por Qué" (12:00 m. – 12:45 p.m.)

#### Demostración del Profesor sobre La Iguaná en QGIS LTR:

1. **Normalización de Campos en la Tabla de Atributos:**
   - Abran la tabla de atributos de `zonas_cobertura` (`F6`).
   - Conmuten el lápiz de edición.
   - **Regla estricta de nomenclatura:** Todos los nombres de columna en **minúsculas**, sin espacios, sin tildes ni caracteres especiales, utilizando formato `snake_case` (ej. `tipo_cobertura`, `area_ha`, `area_km2`, `porc_ocupacion`).

2. **Cálculo de Área y Conversión de Unidades:**
   - Abran la **Calculadora de campos** (`Ctrl + I` / `Cmd + I`).
   - Marquen: **Crear un campo nuevo**.
   - Nombre: `area_ha`.
   - Tipo: **Número real (decimal)** con Longitud = `12` y Precisión = `3`.
   - Como `$area` o `area($geometry)` devuelven metros cuadrados ($m^2$) al estar en `EPSG:9377`, convertimos a hectáreas ($1\text{ ha} = 10\,000\text{ m}^2$):
     ```sql
     round(area($geometry) / 10000, 3)
     ```
   - Creen un segundo campo `area_km2` dividiendo entre $1\,000\,000$:
     ```sql
     round(area($geometry) / 1000000, 4)
     ```

3. **Simbología Temática y Jerarquía Figura-Fondo:**
   - En las propiedades de la capa $\rightarrow$ **Simbología**, cambien de *Símbolo único* a **Categorizado**.
   - Campo de valor: `tipo_cobertura`.
   - **Paleta de colores armónica:** Utilicen rampas perceptualmente uniformes (*Viridis*, *Magma* o familias cualitativas de *ColorBrewer*). Eviten colores estridentes no asociados a la realidad física (verde para cobertura vegetal, tonos ocres/grises para tejido urbano, azul para drenajes).
   - Hagan clic en **Clasificar** y eliminen la fila residual con valor vacío `""`.

4. **Etiquetado Técnico con Halo Protector:**
   - Vayan a la pestaña **Etiquetas $\rightarrow$ Etiquetas sencillas (*Single labels*)**.
   - Valor: `nombre_sector`.
   - Fuente: *Inter*, *Roboto* o *Helvetica*, tamaño 8 a 9 pt.
   - **Sub-pestaña Buffer / Halo (Obligatorio para legibilidad):**
     - Activen: **Dibujar halo de texto**.
     - Tamaño: `1.2 mm`.
     - Color: Blanco puro (`#FFFFFF`) con 90 % de opacidad.
     - *Por qué:* El halo aísla ópticamente la tipografía de las curvas de nivel o de la ortofoto satelital, garantizando legibilidad sin importar la complejidad del fondo.

> [!NOTE]
> **Prompt de Auto-Explicación Obligatorio 1:**
> *¿Por qué guardar un valor métrico de área o longitud en un campo de tipo "Texto / String" destruye la capacidad analítica del SIG en operaciones de clasificación y resúmenes estadísticos?*

---

### Etapa 2: Ejemplo de Completación — Fading del Último Paso (12:45 p.m. – 1:15 p.m.)

#### Kit de Maquetación Cartográfica A3 en el Diseñador de Impresión de QGIS:
Se suministran las capas preparadas de la Cuenca Escuela. El estudiante completa la configuración de los **8 Elementos de Ley**:

1. Menú **Proyecto $\rightarrow$ Nueva composición de impresión...** (Nombre: `Lamina_Iguana_A3`).
2. Clic derecho sobre el lienzo en blanco $\rightarrow$ **Propiedades de la página**:
   - Tamaño: **A3 (420 × 297 mm)**.
   - Orientación: **Horizontal**.
3. **Pasos dados:**
   - Se insertó el *Mapa Principal* ocupando el 75 % del espacio visual central a escala redonda fija ($1 : 15\,000$).
   - Se insertó la *Flecha de Norte*, la *Barra de escala gráfica* con subdivisiones métricas enteras y la *Leyenda* filtrada sin capas residuales.
4. **Paso a completar por el estudiante: Configuración de la Cuadrícula Métrica CTM12 (`EPSG:9377`)**:
   - Seleccionen el marco del mapa y en *Propiedades del elemento*, desplieguen **Cuadrículas $\rightarrow$ + (Añadir cuadrícula)**.
   - Clic en **Modificar cuadrícula...**:
     - Tipo de cuadrícula: **Cruz (*Cross*)** o **Líneas sólidas tenues** con opacidad al 30 %.
     - Sistema de referencia (SRC): Asignen explícitamente `EPSG:9377`.
     - Intervalo X: `1000` **metros**.
     - Intervalo Y: `1000` **metros**.
   - Desplieguen **Dibujar coordenadas**:
     - Formato: Decimal sin decimales (`Precisión: 0`).
     - Coordenadas izquierda y derecha: Configúrenlas en **Vertical ascendente** para que no invadan el margen de la página.
   - Añadan el **Membrete Técnico Oficial** con un cuadro de texto que contenga:
     ```text
     TÍTULO: Diagnóstico Territorial y Fajas de Protección - Cuenca La Iguaná
     AUTOR: [Tu Nombre Completo]
     ESCALA: 1:15.000 | FECHA: Febrero 2027
     SISTEMA DE REFERENCIA: MAGNA-SIRGAS 2018 / Origen Nacional CTM12 (EPSG:9377)
     FUENTE: Ortofoto GeoMedellín / Cartografía Base IGAC
     ```

---

### Etapa 3: Diagnóstico y Reparación de Caso Roto de Consultoría (1:15 p.m. – 1:50 p.m.)

#### El Caso Roto:
Un informe de consultoría para una licitación pública incluyó una lámina cartográfica que fue rechazada de plano por la interventoría técnica. Al examinar el documento PDF entregado se detectaron cuatro fallas graves:
1. Se empleó una rampa de color tipo arcoíris (*Rainbow / Spectral*): zonas de bajo riesgo aparecían en azul oscuro y zonas contiguas de riesgo medio en verde fosforescente, creando límites artificiales inexistentes y distorsión perceptual.
2. Los textos de las quebradas se colocaron en color rojo sin halo protector directamente sobre una ortofoto con sombras densas, resultando ilegibles al 100 % de zoom.
3. El campo `area` de la tabla se configuró como tipo `String` ("Texto") conteniendo valores con comas y letras (ej. `"12,4 ha"`), impidiendo calcular la sumatoria total del área afectada.
4. La lámina carecía de cuadrícula métrica, escala gráfica y declaración del sistema de coordenadas, indicando únicamente: *"Escala: 1 cm = 1 cuadra en el monitor"*.

```
+-----------------------------------------------------------------------------------+
| PATOLOGÍAS CRÍTICAS DEL PLANO DEFECTUOSO:                                         |
| 1. Violación de semiología gráfica (paleta Spectral no uniforme).                 |
| 2. Contraste figura-fondo nulo (etiquetas sin halo sobre ortofoto oscura).         |
| 3. Campo de área degradado a tipo Texto (bloqueo de análisis cuantitativo).       |
| 4. Ausencia de los 8 elementos normativos de ley cartográfica.                    |
+-----------------------------------------------------------------------------------+
```

#### Andamiaje de Análisis del Error (Responde en tu libreta técnica):
1. **Detectar:** Identifica los 4 elementos obligatorios de la cartografía normativa que fueron omitidos en el plano del consultor.
2. **Explicar:** ¿Por qué la literatura científica de percepción visual (Borland & Taylor, Crameri et al.) prohíbe el uso de rampas arcoíris (*Rainbow*) en cartografía cuantitativa de ingeniería?
3. **Corregir:** Plantea la reestructuración completa del mapa:
   - Selección de paleta (*Viridis* / *Cividis*).
   - Aplicación de halo de 1.2 mm.
   - Conversión de atributos con la Calculadora de campos a tipo `Real (Double)`.
   - Adición de cuadrícula CTM12 a 1.000 m y membrete normativo.

---

*(1:50 p.m. – 2:10 p.m. · Pausa Activa Pedagógica / Almuerzo Ligero)*

---

### Etapa 4: Espejo Corporativo en ArcGIS Pro y Ventana de Mejora Continua H1 (2:10 p.m. – 4:25 p.m.)

#### A. Espejo en ArcGIS Pro: Calculate Geometry Attributes y Layout View A3:
1. En ArcGIS Pro, abran la tabla de atributos de su clase de entidad `zonas_cobertura`.
2. Hagan clic derecho sobre el encabezado de un nuevo campo numérico (`Double`) $\rightarrow$ **Calculate Geometry Attributes**:
   - *Geometry Property:* **Area (geodesic)** frente a **Area (planar)**.
   - *Area Unit:* **Hectares** o **Square Meters**.
   - *Coordinate System:* **Current Map (EPSG:9377)**.
   - Comprueben la rapidez con la que ArcGIS Pro actualiza los valores.
3. Vayan a la pestaña **Insert $\rightarrow$ New Layout**:
   - Elijan formato: **ISO A3 Landscape (420 × 297 mm)**.
4. En la pestaña *Insert*, incorporen los componentes:
   - **Map Frame:** Tracen el recuadro del mapa principal vinculándolo a su vista.
   - **Grid:** Hagan clic en *Add Grid* y seleccionen **Measured Grid**:
     - Verifiquen que el sistema sea `EPSG:9377` con intervalo de `1000 m`.
   - **North Arrow**, **Scale Bar** (con unidades métricas enteras) y **Legend**.
   - **Dynamic Text:** Incorporen metadatos automáticos de fecha, sistema de coordenadas y autor.

#### B. Ventana de Mejora Continua del Hito 1 (En Sala):

> [!TIP]
> **PROTOCOLO DE MEJORA CONTINUA (RECUPERACIÓN DE HASTA EL 40 %):**
> Los estudiantes que hayan recibido deducciones de puntaje en la entrega del [Hito 1](../03_evaluaciones/HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md) (Semana 5) disponen de esta franja en sala para:
> 1. Identificar las fallas señaladas en la retroalimentación del profesor (rutas rotas, coordenadas no homologadas a `EPSG:9377`, errores de dominio o campos mal parametrizados).
> 2. Ejecutar la corrección asistida directamente sobre su base espacial en `C:\Temp\SIG_Usuario\`.
> 3. Sustentar ante el profesor en sala la corrección verificada. Quienes validen la subsanación recuperarán **hasta el 40 % de los puntos deducidos** en la nota oficial del Hito 1.

#### C. Transferencia a su Unidad Territorial `U01` a `U30`:
- Apliquen el Kit de Diseño Cartográfico A3 sobre su polígono focal asignado.
- Generen la composición cartográfica completa garantizando los 8 elementos de ley.
- Exporten una versión preliminar en PDF a **300 ppp** en `C:\Temp\SIG_Usuario\05_salidas_graficas\`.

---

## 4. Protocolo Obligatorio de Cierre en Sala (4:25 p.m. – 4:30 p.m. · 5 min)

1. Cierren QGIS LTR y ArcGIS Pro guardando cambios en los proyectos y maquetaciones.
2. En `C:\Temp\`, compriman su carpeta de trabajo en:
   ```text
   SIG_Uxx_Apellido_Nombre_S06.zip
   ```
3. Cópienlo a su USB y cáguenlo a OneDrive institucional.
4. Borren la carpeta local `C:\Temp\SIG_Usuario\` antes de salir de la sala.

---

## 5. Checklist de Verificación y Entrega

- [ ] Calculé áreas mediante `$area` y `area($geometry)` comprendiendo la diferencia entre métricas elipsoidales y planares en `EPSG:9377`.
- [ ] Parametricé todos los nombres de campos en `snake_case` y tipos numéricos reales.
- [ ] Apliqué simbología temática con paletas perceptualmente uniformes (*Viridis* / *ColorBrewer*).
- [ ] Activé etiquetas con halo protector blanco de 1.2 mm para garantizar legibilidad figura-fondo.
- [ ] Maqueté la lámina en formato A3 horizontal con los **8 elementos de ley** y cuadrícula CTM12 cada 1.000 m.
- [ ] Ejecuté las herramientas homólogas en ArcGIS Pro (*Calculate Geometry Attributes* y *Layout View*).
- [ ] Aproveché la ventana de mejora continua del Hito 1 (si aplicaba).
- [ ] Ejecuté el cierre seguro de 5 minutos en `C:\Temp`.
