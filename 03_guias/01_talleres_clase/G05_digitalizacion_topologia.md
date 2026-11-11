# G05: Digitalización guiada, auto-ensamblado (Snapping) y auditoría topológica en QGIS LTR y ArcGIS Pro

> **Semestre / Ciclo:** 2027-1  
> **Semana / Fecha:** Semana 5 (`S05`) · Jueves 18 de febrero de 2027  
> **Horario oficial:** 12:00 m. – 4:30 p.m. (4.5 h presenciales en Sala de Cómputo EAFIT)  
> **Modalidad:** 100 % Individual  
> **Software en Sala:** QGIS LTR + ArcGIS Pro (Licencia institucional Advanced)  
> **Cuenca Escuela de Demostración:** Cuenca de la Quebrada La Iguaná (Medellín)  
> **Área de Aplicación Individual:** Unidad Territorial Única (`U01` a `U30`)  
> **Hito Evaluativo en Sala:** **Hito 1 (20 %, Nivel P — Semanas S01 a S04)** aplicado en el Sub-bloque 2  

---

## 1. Presupuesto de Tiempo Semanal y Estructura Especial de Sesión

Debido a la aplicación del **Hito 1 (Taller Evaluativo 1 en Sala)** en el segundo bloque de hoy, la instrucción técnica de topología se concentra e integra en el Sub-bloque 1, reservando el Sub-bloque 2 para la evaluación individual:

| Bloque de Actividad | Franja Horaria / Duración | Entorno y Enfoque Pedagógico |
|---|:---:|---|
| **Sub-bloque 1: Topología QGIS y ArcGIS Pro** | `12:00 m. – 1:50 p.m.` (110 min) | Sala de Cómputo: Digitalización con *Snapping*, reparación con **Vertex Tool / Reshape** y reglas de **Geodatabase Topology** en ArcGIS Pro sobre La Iguaná. |
| **Pausa Activa Pedagógica** | `1:50 p.m. – 2:10 p.m.` (20 min) | Descanso cognitivo y preparación para la evaluación presencial. |
| **Sub-bloque 2: Aplicación del Hito 1** | `2:10 p.m. – 4:25 p.m.` (135 min) | **SALA DE CÓMPUTO: APLICACIÓN DEL HITO 1 (20 %, TIER P)**. Evaluación práctica individual sobre Geodesia EPSG:9377 y Bases Espaciales (`.gpkg` / `.gdb`). |
| **Protocolo de Cierre en Sala** | `4:25 p.m. – 4:30 p.m.` (5 min) | Entrega del paquete `Apellido_Nombre_H1.zip`, compresión `C:\Temp\SIG_Usuario\ -> .zip` y purga local. |
| **Trabajo Autónomo Independiente** | $\le 4.5\text{ h}$ semanales | PC Personal / Casa: Transferencia de las reglas topológicas al polígono focal de su unidad `U01`–`U30` hasta alcanzar **0 errores**. |

---

## 2. El Riesgo Topológico: Por qué la digitalización "a pulso" invalida un SIG

En ingeniería civil y diseño urbano, un plano dibujado sin control topológico es inutilizable para el cálculo de cantidades de obra o delimitación de derechos de propiedad. La digitalización visual a mano alzada genera sistemáticamente tres patologías geométricas:
1. **Traslapes / Superposiciones (*Overlaps*):** Dos polígonos colindantes comparten una porción de área física. Esto provoca que el terreno se contabilice dos veces, distorsionando las estadísticas catastrales y los presupuestos de compensación.
2. **Huecos y Astillas (*Gaps / Slivers*):** Fisuras milimétricas vacías entre geometrías adyacentes que deberían compartir exactamente los mismos linderos.
3. **Auto-intersecciones (*Bowties / Invalid Geometries*):** El contorno de un polígono se cruza sobre sí mismo formando un nudo ("figura en ocho"). QGIS y ArcGIS Pro no pueden calcular áreas ni ejecutar geoprocesos sobre geometrías no válidas.
4. **Extremos sueltos (*Dangles*):** Líneas de una red de drenaje que no conectan exactamente con el cauce receptor, quebrando la conectividad hidrológica del modelo.

---

## 3. Secuencia Didáctica: Worked-Example Fading (Sub-bloque 1 · 110 min)

```
[Etapa 1: Ejemplo Resuelto] ──> [Etapa 2: Completación] ──> [Etapa 3: Caso Roto] ──> [Etapa 4: Espejo Pro + Unidad]
 (Snapping + Trazado QGIS)       (Comprobador + Vertex Tool) (Parcelas con 12% Error)    (Geodatabase Topology Pro)
```

### Etapa 1: Ejemplo Trabajado con "Por Qué" (12:00 m. – 12:40 p.m.)

#### Configuración de la Barra de Auto-Ensamblado (*Snapping*) en QGIS LTR:
1. Vayan a **Proyecto $\rightarrow$ Opciones de autoensamblado...** (o activen el ícono del imán en la barra de herramientas).
2. Configuren los parámetros técnicos recomendados:
   - **Modo:** *Todas las capas* o *Configuración avanzada*.
   - **Tipo de enganche:** Marquen obligatoriamente **Vértice** y **Segmento**.
   - **Tolerancia:** `12` a `15` **píxeles** *(usar unidades de pantalla/píxeles garantiza que la sensibilidad del enganche responda con suavidad a cualquier nivel de zoom).*
   - **Evitar solapamiento (*Avoid Overlap*):** Activen la casilla en las capas de polígonos colindantes.
   - **Trazado automático (*Enable Tracing*, ícono de imán con línea discontinua):** Permite calcar bordes existentes automáticamente sin tener que digitalizar vértice por vértice.

#### Digitalización sin solapes demostrada por el docente:
- Conmutamos edición en la capa `zonas_cobertura`.
- Digitalizamos el polígono de una ladera forestal en San Cristóbal y cerramos con clic derecho.
- Para digitalizar el sector urbano contiguo: con *Evitar solapamiento* activado, nos montamos deliberadamente sobre el interior del bosque. Al cerrar el polígono, QGIS rebana automáticamente el sobrante, logrando una frontera compartida matemáticamente idéntica, con cero huecos y cero traslapes.

> [!NOTE]
> **Prompt de Auto-Explicación Obligatorio 1:**
> *¿Por qué fijar la tolerancia de auto-ensamblado en metros en lugar de píxeles puede resultar catastrófico al digitalizar a escalas de gran detalle (1:500) o a escalas territoriales (1:50.000)?*

---

### Etapa 2: Ejemplo de Completación — Fading del Último Paso (12:40 p.m. – 1:10 p.m.)

#### Auditoría y Reparación de Errores con el Comprobador de Topología en QGIS LTR:
Se suministra una capa de prueba con inconsistencias deliberadas en el sector Robledo.

1. Abran el panel inferior: **Vectorial $\rightarrow$ Comprobador de topología**.
2. Hagan clic en el ícono de llave inglesa (**Configurar**) y agreguen las reglas:
   - `zonas_cobertura` $\rightarrow$ **no debe tener geometrías no válidas**.
   - `zonas_cobertura` $\rightarrow$ **no debe superponerse (*must not overlap*)**.
   - `zonas_cobertura` $\rightarrow$ **no debe tener huecos (*must not have gaps*)**.
   - `red_hidrica` $\rightarrow$ **no debe tener extremos sueltos (*must not have dangles*)**.
3. Clic en **Validar todo**. El panel listará en rojo los errores geométricos detectados.

#### Paso a completar por el estudiante:
1. Hagan doble clic sobre el primer error de solape para hacer zoom automático al punto del conflicto.
2. Reparen la anomalía mediante uno de los dos métodos de edición vectorial:
   - **Método A (Herramienta de Vértices / *Vertex Tool*):** Seleccionen la herramienta de vértices, hagan clic sobre los nodos invasores y desplácenlos hasta que el auto-ensamblado los imante sobre el borde del polígono contiguo; o eliminen vértices redundantes presionando la tecla `Supr` (`Delete`).
   - **Método B (Remodelar objetos espaciales / *Reshape Features*):** En la barra de digitalización avanzada, tracen una línea de corte que empiece fuera del polígono, atraviese el solape calcando el límite correcto y termine fuera con clic derecho para rebanar el exceso.
3. Hagan clic nuevamente en **Validar todo** y certifiquen que la lista de errores quede en **0 errores**.

---

### Etapa 3: Diagnóstico y Reparación de Caso Roto de Consultoría (1:10 p.m. – 1:30 p.m.)

#### El Caso Roto:
Un consultor entregó el levantamiento digital de un plan parcial de expansión urbana en la cuenca baja de una quebrada. La digitalización se realizó sin activar el imán de auto-ensamblado. Al someter el archivo a la auditoría de la Curaduría Urbana:
- El predio matriz original medía $100.000\text{ m}^2$ ($10.0\text{ ha}$).
- Al sumar el área de los 85 lotes resultantes en la tabla de atributos, la suma total arrojó $112.450\text{ m}^2$ (un **12.45 % de área ficticia inventada** por causa de micro-solapes entre lotes vecinos).
- Adicionalmente, al ejecutar un geoproceso de intersección con la faja de protección ambiental, QGIS se bloqueó emitiendo el mensaje: `GEOS exception: TopologyException: side location conflict`.

```
+-----------------------------------------------------------------------------------+
| PATOLOGÍAS CRÍTICAS DEL PLAN PARCIAL:                                             |
| 1. Suma de parcelas (112.450 m²) > Predio matriz (100.000 m²) por solapes no vistos|
| 2. Huecos milimétricos entre linderos que generan predios fantasma sin propietario|
| 3. Geometrías no válidas (auto-intersecciones) que impiden geoprocesos espaciales  |
+-----------------------------------------------------------------------------------+
```

#### Andamiaje de Análisis del Error (Responde en tu libreta técnica):
1. **Detectar:** ¿Qué prueba numérica elemental delata que una capa de polígonos tiene defectos de solape topológico?
2. **Explicar:** ¿Por qué los algoritmos geométricos computacionales (librería GEOS) colapsan cuando intentan calcular la intersección de una geometría que se cruza a sí misma?
3. **Corregir:** Plantea la estrategia de saneamiento paso a paso utilizando el *Comprobador de topología* y la *Herramienta de vértices* para devolver la integridad topológica al plano.

---

### Etapa 4: Espejo Corporativo en ArcGIS Pro — Geodatabase Topology (1:30 p.m. – 1:50 p.m.)

En **ArcGIS Pro** (con licencia institucional *Advanced* disponible en la sala), la topología no es un complemento auxiliar externo, sino una regla de integridad estructural que reside dentro del **Feature Dataset**:

1. Abran su Geodatabase `unidad_territorial_Uxx.gdb` en el panel Catalog.
2. Desplieguen su Feature Dataset `modelo_espacial_9377`.
3. Hagan clic derecho sobre el Feature Dataset $\rightarrow$ **New $\rightarrow$ Topology**:
   - Nombre: `topologia_ordenamiento`.
   - Cluster Tolerance: `0.001 Meters` (tolerancia métrica por defecto).
   - Clases de entidad participantes: marquen `zonas_cobertura` y `red_drenaje`.
4. En el asistente de reglas (**Rules**), añadan:
   - `zonas_cobertura` $\rightarrow$ **Must Not Overlap** (Evita la duplicación de áreas).
   - `zonas_cobertura` $\rightarrow$ **Must Not Have Gaps** (Evita grietas o vacíos en el tejido territorial).
5. Hagan clic en *Finish*. Clic derecho sobre la topología creada $\rightarrow$ **Validate**.
6. Arrastren la topología al mapa: los errores aparecerán señalados en capas auxiliares de puntos, líneas y áreas de error.
7. Vayan a la pestaña **Edit $\rightarrow$ Topology $\rightarrow$ Error Inspector**: esta ventana permite auditar cada fallo geométrico y aplicar correcciones asistidas (*Merge*, *Create Feature* para rellenar huecos, o *Subtract*).

---

*(1:50 p.m. – 2:10 p.m. · Pausa Activa Pedagógica / Almuerzo Ligero)*

---

## 4. Sub-bloque 2: Aplicación del Hito 1 en Sala (2:10 p.m. – 4:25 p.m. · 135 min)

> [!IMPORTANT]
> **APLICACIÓN DEL HITO 1: TALLER EVALUATIVO 1 EN SALA (20 %, TIER P)**  
> **Contenidos evaluados:** Semanas `S01` a `S04` (Geodesia MAGNA-SIRGAS `EPSG:9377`, asignación vs reproyección de coordenadas, arquitectura de bases espaciales en `.gpkg` y `.gdb`, dominios codificados, subtipos y buffer paramétrico $R = 30 + D\text{ m}$).  
> **Condiciones de examen:** Modalidad individual, presencial en sala de cómputo, navegación web restringida al material del curso y datos locales en `C:\Temp\SIG_Usuario\`.

- Sigan las instrucciones detalladas del instructivo oficial de evaluación: [HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md](../03_evaluaciones/HITO_1_TALLER_GEODESIA_BASES_ESPACIALES.md).
- Apliquen los procedimientos aprendidos sobre su **Unidad Territorial Asignada (`U01` a `U30`)** y su parámetro individual $D$.
- Al concluir el ejercicio, generen la estructura solicitada y prepárense para el cierre de sesión.

---

## 5. Protocolo Obligatorio de Cierre en Sala (4:25 p.m. – 4:30 p.m. · 5 min)

1. Guarden las ediciones en ArcGIS Pro y QGIS LTR.
2. En `C:\Temp\`, compriman su entrega oficial del examen en:
   ```text
   Apellido_Nombre_H1.zip
   ```
3. Suban el paquete `Apellido_Nombre_H1.zip` al canal oficial de entregas en Teams.
4. Compriman adicionalmente su carpeta completa de trabajo en `SIG_Uxx_Apellido_Nombre_S05.zip` y respáldenla en su USB.
5. Purguen la carpeta `C:\Temp\SIG_Usuario\` antes de retirarse.
6. **Trabajo Autónomo Post-Clase ($\le 4.5\text{ h}$):** Apliquen las reglas de *Geodatabase Topology* aprendidas en el Sub-bloque 1 sobre el polígono focal de su unidad `U01`–`U30` hasta certificar **0 errores**, insumo indispensable para el geoprocesamiento de la próxima semana.

---

## 6. Checklist de Verificación de Sesión

- [ ] Configuré la barra de auto-ensamblado (*Snapping*) con tolerancia de 12–15 px y opción de evitar solapamientos.
- [ ] Ejecuté el *Comprobador de topología* en QGIS LTR y reparé errores con la *Herramienta de vértices*.
- [ ] Analicé el Caso Roto de consultoría justificando por qué los solapes falsean el cómputo de áreas.
- [ ] Estructuré una *Geodatabase Topology* con reglas *Must Not Overlap* y *Must Not Have Gaps* en ArcGIS Pro.
- [ ] Presenté y entregué en sala el **Hito 1 (20 %)** dentro del tiempo reglamentario.
- [ ] Ejecuté el protocolo de entrega, respaldo en USB y purga de `C:\Temp`.
