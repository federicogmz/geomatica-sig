# Taller de Repaso — Previo al Parcial 1: SIG Vectorial, Geodesia y Topología en QGIS

**Semana sugerida:** Semana 10 a inicios de Semana 11 · **Tiempo estimado de trabajo autónomo:** 90–120 min  
**Modalidad:** Individual en computador con QGIS LTR · **Insumos:** Capas vectoriales de La Iguaná (`drenajes_iguana.shp`, `predios_catastro.gpkg` y `equipamientos_comunitarios.gpkg`).

> [!NOTE]
> El **Parcial 1 (15%)** es la primera evaluación mayor del semestre (Semana 11, Bloque 1). Es una prueba práctica individual en el laboratorio de cómputo que simula un encargo real de consultoría territorial. Evalúa al **100% las competencias del Módulo 1 (SIG Vectorial)**: geodesia en Colombia (CTM12), control de calidad topológica con el plugin Comprobador de topología (*Topology Checker*), geoprocesamiento multicapa, cálculo de métricas en tablas de atributos y composición cartográfica normativa.
>
> Este taller de repaso está diseñado como una **guía de estudio exhaustiva paso a paso** sobre un caso de *retiro hídrico normativo*. En la prueba del Parcial 1 se evaluarán **exactamente estas mismas operaciones y herramientas**, pero aplicadas a un sector territorial diferente (cuenca de Santa Elena) y a un encargo de *evaluación de amenaza alta por inundación*, midiendo tu capacidad de comprensión y generalización espacial sin depender de memorizar datos numéricos.

---

## Estructura del Simulacro

El encargo consiste en auditar la cartografía catastral y delimitar con rigor técnico y legal la **afectación predial por retiro hídrico normativo (30 metros)** en la Quebrada La Iguaná (Medellín).

### Carpeta de Salida Obligatoria: `simulacro_p1/`
Al finalizar el ejercicio, tu carpeta de trabajo debe contener exactamente estos **cuatro archivos**:

```text
simulacro_p1/
├── analisis_vectorial.gpkg    (GeoPackage con 5 capas en EPSG:9377)
├── resumen_afectacion.json    (Reporte de texto con las métricas cuantitativas)
├── mapa_parcial1.pdf          (Composición cartográfica A3 exportada a 300 ppp)
└── proyecto.qgz               (Proyecto QGIS guardado con rutas relativas)
```

---

## Fase 1: Geodesia, Diagnóstico de Coordenadas y Estructuración

### Paso 1.1: Diagnóstico de la Capa sin Proyección
1. Abre QGIS con un proyecto nuevo en blanco.
2. Carga en el lienzo la capa `drenajes_iguana.shp` (arrastrándola desde el explorador de archivos o mediante **Capa $\to$ Añadir capa $\to$ Añadir capa vectorial...**).
3. Observa el panel de capas: junto al nombre `drenajes_iguana` aparece un ícono de signo de interrogación amarillo (`?`) o una advertencia indicando que la capa carece de CRS/SRC definido (*Coordinate Reference System* no disponible porque no tiene archivo `.prj`).
4. Mueve el cursor sobre el trazado de la quebrada y observa los valores de coordenadas en la **barra de estado inferior** de QGIS:
   - Coordenada $X$ (Este): valores alrededor de $4.713.000\text{ m}$.
   - Coordenada $Y$ (Norte): valores alrededor de $2.251.500\text{ m}$.
5. **Diagnóstico técnico:** Estas magnitudes métricas corresponden inequívocamente al sistema oficial de Colombia **MAGNA-SIRGAS / Origen Nacional CTM12 (`EPSG:9377`)**, cuyo origen coordenado de referencia se ubica en $X = 5.000.000\text{ m}$, $Y = 2.000.000\text{ m}$.

### Paso 1.2: Asignación Formal del Sistema de Coordenadas (¡No Reproyectar!)
> [!IMPORTANT]
> **Diferencia conceptual crítica:**
> - **Asignar proyección:** Define los metadatos del CRS existente que el archivo no tiene escritos. **No modifica los números de las coordenadas**.
> - **Reproyectar:** Transforma matemáticamente los pares coordenados de un sistema a otro (por ejemplo, de WGS84 grados a CTM12 metros). Si "reproyectas" una capa que no tiene CRS definido, corrompes su ubicación espacial.

1. Haz clic derecho sobre la capa `drenajes_iguana` en el panel de capas.
2. Selecciona **Establecer SRC de la capa $\to$ Asignar SRC a la capa...**
3. En el cuadro de diálogo:
   - Escribe en el filtro de búsqueda: `9377`.
   - Selecciona **MAGNA-SIRGAS / Origen Nacional (EPSG:9377)**.
   - Haz clic en **Aceptar**.
4. Verifica que el signo de interrogación desapareció de la capa.
5. Haz clic en la esquina inferior derecha de la ventana de QGIS (donde se indica el CRS del proyecto) y asegúrate de que el **Proyecto QGIS** también esté configurado en `EPSG:9377`.

### Paso 1.3: Creación del Contenedor GeoPackage Centralizado
1. Abre el panel **Navegador** de QGIS (*Ver $\to$ Paneles $\to$ Navegador*).
2. Haz clic derecho sobre la entrada **GeoPackage** y selecciona **Crear base de datos...**
3. En la ventana emergente:
   - **Base de datos:** Navega hasta tu carpeta de trabajo y asígnale el nombre:
     `simulacro_p1/analisis_vectorial.gpkg`
   - **Nombre de la tabla:** Escribe temporalmente `drenajes_iguana`.
   - **Tipo de geometría:** `Línea / MultiLínea`.
   - **SRC:** `EPSG:9377 - MAGNA-SIRGAS / Origen Nacional`.
   - Haz clic en **Aceptar**.
4. Para importar la geometría real de `drenajes_iguana`:
   - Haz clic derecho sobre la capa `drenajes_iguana` en el panel de capas $\to$ **Exportar $\to$ Guardar objetos como...**
   - **Formato:** `GeoPackage`.
   - **Nombre de archivo:** Selecciona `analisis_vectorial.gpkg`.
   - **Nombre de la capa:** `drenajes_iguana`.
   - **SRC:** `EPSG:9377`.
   - Haz clic en **Aceptar** (si solicita sobrescribir la tabla vacía inicial, confirma).
5. Carga también `equipamientos_comunitarios.gpkg` en QGIS y expórtala dentro de `analisis_vectorial.gpkg` asegurando que su CRS de salida sea `EPSG:9377`.
6. Carga `predios_catastro.gpkg` al proyecto para iniciar el control de calidad en la siguiente fase.

---

## Fase 2: Control de Calidad y Validación Topológica con *Topology Checker*

La cartografía predial catastral entregada por terceros presenta errores sistemáticos de digitalización: solapes entre linderos privados y microvacíos (huecos) entre predios colindantes. Esto distorsiona el catastro y altera los cálculos de área. Para subsanar estos errores, en este taller aprenderás a solucionarlos mediante dos técnicas fundamentales en QGIS: **modificando directamente los vértices con la Herramienta de Vértices (*Vertex Tool*)** o **redibujando el límite con la Herramienta Remodelar objetos espaciales (*Reshape Features*)**, siempre con autoensamblado (*snapping*) activado.

### Paso 2.1: Localización y Activación del Plugin de Topología
1. En el menú superior de QGIS, ve a **Complementos $\to$ Administrar e instalar complementos...**
2. Haz clic en la pestaña lateral **Instalados**.
3. Busca en la lista: **Comprobador de topología (*Topology Checker*)**.
4. Asegúrate de que la casilla esté **marcada con un chulo**.
5. Haz clic en **Cerrar**.
6. En la barra de herramientas de complementos o en el menú **Vectorial $\to$ Comprobador de topología**, haz clic en el ícono del plugin (parece un polígono con marcas de verificación) para abrir el panel en la parte inferior o lateral de tu pantalla.

### Paso 2.2: Configuración de las Reglas Espaciales
1. En el panel del Comprobador de topología, haz clic en el botón **Configurar** (ícono de llave inglesa).
2. Se abrirá la ventana de reglas topológicas. Configuraremos dos reglas para la capa `predios_catastro`:
   - **Regla 1 (Solapes):**
     - En el primer desplegable selecciona la capa: `predios_catastro`.
     - En el desplegable de operaciones selecciona: **no debe tener superposiciones** (*must not have overlaps*).
     - Haz clic en el botón **Añadir regla**.
   - **Regla 2 (Huecos):**
     - En el primer desplegable selecciona la capa: `predios_catastro`.
     - En el desplegable de operaciones selecciona: **no debe tener huecos** (*must not have gaps*).
     - Haz clic en el botón **Añadir regla**.
3. Verifica que en la tabla central aparezcan ambas reglas listadas.
4. Haz clic en **Aceptar**.

### Paso 2.3: Ejecución de la Auditoría y Lectura de Errores
1. En el panel del Comprobador de topología, haz clic en el botón **Validar todo**.
2. QGIS procesará las geometrías y mostrará una tabla con los errores encontrados:
   - Columna **Error:** Indica el tipo de infracción (*superposiciones* o *hueco*).
   - Columna **Capa:** `predios_catastro`.
   - Columna **Objeto espacial:** Identificador numérico del predio infractor.
3. Sobre el lienzo del mapa, QGIS dibujará un **resaltado en color rojo intenso** sobre cada punto, línea o polígono donde ocurre el conflicto.
4. **Inspección rápida:** Haz doble clic sobre cualquier fila de la lista de errores. QGIS automáticamente centrará el zoom del mapa exactamente sobre la falla topológica.

### Paso 2.4: Configuración del Autoensamblado (Snapping)
Para reparar los errores sin crear nuevas fallas geométricas, es indispensable usar el autoensamblado:
1. Ve al menú **Proyecto $\to$ Opciones de autoensamblado...** (o activa la barra de herramientas de autoensamblado y haz clic en el ícono del imán, atajo de teclado: `S`).
2. Configuración obligatoria:
   - **Modo:** `Todas las capas` o `Capa avanzada`.
   - **Tipo de enganche:** `Vértice y segmento` (ícono de nodo y arista).
   - **Tolerancia:** `10` píxeles (`px`).
   - **Activar edición topológica:** Haz clic en el ícono de las dos líneas intersecadas con nodos compartidos. Esto garantiza que al mover un vértice de un lindero común, se actualicen ambos predios simultáneamente.
   - **Activar autoensamblado en intersecciones:** Recomendado para calzar aristas.

### Paso 2.5: Métodos de Corrección Asistida de Errores Topológicos

En QGIS dispones de **dos métodos oficiales** para reparar los errores detectados por el Comprobador de topología. Puedes utilizar el que te resulte más cómodo o combinarlos según el tipo de inconsistencia geométrica:

1. Selecciona la capa `predios_catastro` en el panel de capas.
2. Haz clic en el ícono de **Conmutar edición** (el lápiz amarillo, atajo: `Ctrl+E` en Windows / `Cmd+E` en Mac).

---

#### Método 1: Modificación directa con la Herramienta de Vértices (*Vertex Tool*)
Este método es ideal para ajustes puntuales nodo por nodo o cuando hay pocos vértices involucrados.

- Activa la **Herramienta de Vértices (*Vertex Tool*)** (ícono de llave inglesa con nodos rojos en la barra de herramientas de digitalización).

##### Caso A: Reparar Superposiciones (Solapes) con Vértices
1. Haz doble clic sobre el error de superposición en el panel del Comprobador de topología para hacer zoom automático sobre el conflicto.
2. Observa cómo un predio invade el lindero del predio vecino.
3. Pasa el cursor sobre el vértice invasor: el puntero mostrará una diana o círculo rojo indicando el nodo activo.
4. Haz un clic para levantarlo, muévelo hacia el lindero real del predio vecino hasta que el imán de autoensamblado (snapping) se enganche con una cruz morada/rosada al vértice o arista compartida, y haz clic de nuevo para fijarlo.
5. Si existen vértices redundantes que causan picos invasores innecesarios, haz clic sobre el vértice que sobra y presiona la tecla `Supr` (`Delete`) en tu teclado para eliminarlo.

##### Caso B: Reparar Huecos (Microvacíos) con Vértices
1. Haz doble clic sobre el error de hueco en el Comprobador de topología.
2. Observa la franja vacía que separa los dos predios que deberían ser colindantes.
3. Pasa el cursor sobre el segmento del predio que deja el hueco: aparecerá un pequeño signo más (`+`) en el punto medio del segmento. Haz clic sobre él para insertar un nuevo vértice.
4. Arrastra el nuevo vértice hasta el vértice del predio vecino hasta que el autoensamblado lo fije de forma magnética.
5. Repite el proceso hasta que los linderos compartan exactamente los mismos nodos y el vacío desaparezca por completo.

---

#### Método 2: Redibujado rápido con la Herramienta Remodelar objetos espaciales (*Reshape Features*)
Este método es sumamente eficiente y rápido, especialmente para corregir solapes o huecos que abarcan tramos largos de linderos sin tener que mover cada vértice de manera individual.

- **Dónde encontrarla:** En la barra de herramientas de **Digitalización avanzada** (si no la ves activa, ve al menú superior **Ver $\to$ Barras de herramientas $\to$ Digitalización avanzada**). Su ícono representa un polígono atravesado por una línea de remodelación (*Remodelar objetos espaciales*).

##### ¿Cómo funciona la regla de remodelado (*Reshape*)?
La herramienta permite "rebanar" el excedente o "rellenar" un hueco redibujando el lindero correcto en un solo trazo continuo:
1. Con la edición activa en `predios_catastro`, selecciona el predio que invade a su vecino o el predio que debe expandirse para cerrar el hueco.
2. Activa la herramienta **Remodelar objetos espaciales (*Reshape Features*)**.
3. **Trazo del nuevo lindero:**
   - Haz el **primer clic fuera** del polígono a corregir (o en un vértice de su lindero exterior).
   - Cruza el borde hacia el interior y ve haciendo clics calcando exactamente el lindero real del predio vecino, apoyándote en el imán de autoensamblado (**snapping**) para que cada nodo se fije magnéticamente a los vértices del vecino.
   - Cruza nuevamente el borde hacia afuera del polígono a corregir.
   - Haz **clic derecho** para finalizar y aplicar el cambio.
4. QGIS recalculará automáticamente la geometría:
   - Para un **solape**: eliminará la porción invasora que quedó fuera del nuevo trazado, recortando el predio exactamente por el lindero del vecino.
   - Para un **hueco**: expandirá el polígono rellenando el microvacío hasta calzar milimétricamente con el lindero contiguo.

### Paso 2.6: Revalidación y Exportación de la Capa Limpia
1. En el panel del Comprobador de topología, haz clic nuevamente en **Validar todo**.
2. Revisa la lista: el número de errores disminuirá. Continúa ajustando vértices con la *Herramienta de Vértices* o redibujando con *Remodelar (Reshape)* hasta que la lista muestre:
   ```text
   0 errores encontrados
   ```
3. Haz clic en el ícono de **Guardar cambios de la capa** (disco sobre el lápiz) y apaga la edición conmutada.
4. Exporta la capa limpia dentro de `analisis_vectorial.gpkg`:
   - Clic derecho en `predios_catastro` $\to$ **Exportar $\to$ Guardar objetos como...**
   - Formato: `GeoPackage`.
   - Archivo: `simulacro_p1/analisis_vectorial.gpkg`.
   - Nombre de la capa: exactamente `predios_topologia_valida`.
   - SRC: `EPSG:9377`.
   - Clic en **Aceptar**.

---

## Fase 3: Geoprocesamiento Vectorial y Cálculo de Atributos

Una vez saneada la topología, ejecutamos las operaciones espaciales para delimitar la franja de riesgo y cuantificar las afectaciones.

### Paso 3.1: Delimitación de la Franja de Retiro Hídrico (Buffer Disuelto)
1. Ve al menú **Vectorial $\to$ Herramientas de geoprocesamiento $\to$ Zona de amortiguamiento (*Buffer*)...**
2. En la ventana del algoritmo:
   - **Capa de entrada:** `drenajes_iguana`.
   - **Distancia:** `30` (unidades métricas de CTM12).
   - **Segmentos:** `10` (define la suavidad de las curvas en los extremos).
   - **Estilo de terminación:** `Redondo`.
   - **Estilo de unión:** `Redondo`.
   - **Disolver resultado (*Dissolve*):** **MARCAR OBLIGATORIAMENTE ESTA CASILLA**.
     > [!TIP]
     > Si no marcas *Disolver resultado*, cada segmento individual de la quebrada generará un polígono de buffer separado que se solapará con los segmentos contiguos. Al calcular áreas más adelante, ¡las áreas solapadas se sumarían dos o tres veces falsamente!
   - **Hecho de amortiguamiento (Salida):** Haz clic en los tres puntos (`...`) $\to$ **Guardar en GeoPackage...**
     - Selecciona `simulacro_p1/analisis_vectorial.gpkg`.
     - Nombre de la nueva capa: `retiro_hidrico_30m`.
3. Haz clic en **Ejecutar** y luego en **Cerrar**.

### Paso 3.2: Intersección de Predios Afectados
1. Ve al menú **Vectorial $\to$ Herramientas de geoprocesamiento $\to$ Intersección...**
2. Configuración:
   - **Capa de entrada:** `predios_topologia_valida` (la capa limpia sin solapes).
   - **Capa de superposición:** `retiro_hidrico_30m`.
   - **Intersección (Salida):** Guardar en GeoPackage `analisis_vectorial.gpkg` con el nombre de capa:
     `predios_afectados_retiro`
3. Haz clic en **Ejecutar** y luego en **Cerrar**.
4. Observa el mapa: se generará una capa que contiene únicamente las "rebanadas" de predios que caen dentro de los 30 m del retiro.

### Paso 3.3: Cálculo de Áreas en Hectáreas con la Calculadora de Campos
1. Haz clic derecho sobre la capa `predios_afectados_retiro` $\to$ **Abrir tabla de atributos** (o presiona `F6`).
2. Haz clic en el ícono del lápiz para conmutar la edición (`Ctrl+E`).
3. Haz clic en el ícono de la **Calculadora de campos** (parece un ábaco, atajo: `Ctrl+I`).
4. Configura los parámetros:
   - Asegúrate de que esté marcada la casilla **Crear un campo nuevo**.
   - **Nombre del campo de salida:** `area_afectada_ha`
   - **Tipo de campo de salida:** `Número decimal (real)`.
   - **Longitud del campo:** `10`.
   - **Precisión:** `4`.
5. En el panel central de expresión, escribe exactamente:
   ```sql
   $area / 10000
   ```
   > [!NOTE]
   > En QGIS, la variable `$area` calcula automáticamente el área planimétrica de la geometría actual en metros cuadrados ($m^2$) respetando el elipsoide y el CRS del proyecto. Dado que $1\text{ hectárea} = 10.000\text{ m}^2$, dividimos entre 10.000.
6. Haz clic en **Aceptar**.
7. Verifica que en la tabla apareció la nueva columna con los valores en hectáreas.
8. Haz clic en el ícono de **Guardar cambios** y desactiva el lápiz de edición.

### Paso 3.4: Identificación de Equipamientos Comunitarios en el Retiro
1. Ve al menú **Vectorial $\to$ Herramientas de geoprocesamiento $\to$ Cortar (*Clip*)...** (o Intersección).
2. Configuración:
   - **Capa de entrada:** `equipamientos_comunitarios`.
   - **Capa de superposición:** `retiro_hidrico_30m`.
   - **Cortado (Salida):** Guardar en `analisis_vectorial.gpkg` con el nombre de capa:
     `equipamientos_en_retiro`
3. Haz clic en **Ejecutar** y luego en **Cerrar**.

---

## Fase 4: Consulta de Estadísticas en QGIS y Creación del Reporte JSON

Para elaborar el reporte cuantitativo no necesitas programar; puedes consultar las estadísticas nativas directamente en la interfaz de QGIS.

### Paso 4.1: Consulta de Métricas en QGIS
1. **Total de predios afectados:**
   - Abre la tabla de atributos de `predios_afectados_retiro` (`F6`).
   - Mira la barra de título superior de la ventana: indicará `Total de objetos: X` (por ejemplo, 24).
2. **Área total predial afectada (en hectáreas):**
   - En el menú principal de QGIS, ve a **Ver $\to$ Paneles $\to$ Estadísticas** (se abrirá el panel de estadísticas).
   - En el panel de estadísticas, selecciona la capa: `predios_afectados_retiro`.
   - En el campo numérico selecciona: `area_afectada_ha`.
   - En la lista de resultados, busca la fila **Suma (*Sum*)**: anota ese valor redondeado a 2 decimales (ej. `6.42`).
3. **Área total de la franja de retiro (en hectáreas):**
   - Selecciona en el panel de estadísticas la capa `retiro_hidrico_30m`.
   - Como no tiene el campo precalculado, puedes abrir su tabla de atributos, calcular `$area / 10000` en un campo temporal o simplemente escribir la expresión en el panel de estadísticas si tu versión lo soporta, o leer el valor del área (ej. `14.85`).
4. **Total de equipamientos en riesgo:**
   - Abre la tabla de atributos de `equipamientos_en_retiro` y consulta el número total de objetos (ej. `3`).

### Paso 4.2: Creación del Archivo `resumen_afectacion.json`
1. Abre tu editor de texto preferido (Bloc de notas en Windows, TextEdit en Mac, o VS Code).
2. Crea un archivo nuevo y copia la siguiente estructura, sustituyendo los números por tus resultados reales de QGIS:

```json
{
  "estudiante": "Tu Nombre Completo",
  "codigo": "202610001",
  "crs_utilizado": "EPSG:9377",
  "metricas": {
    "area_retiro_total_ha": 14.85,
    "area_predios_afectada_ha": 6.42,
    "total_predios_afectados": 24,
    "total_equipamientos_en_retiro": 3
  }
}
```

3. Guarda el archivo con el nombre exacto:
   `simulacro_p1/resumen_afectacion.json`
   *(Asegúrate de que la extensión sea `.json` y no `.json.txt`)*.

---

## Fase 5: Composición Cartográfica en el Diseñador de Impresión

### Paso 5.1: Creación del Lienzo y Configuración de Página
1. En el menú superior de QGIS, ve a **Proyecto $\to$ Nueva composición de impresión...**
2. Asigna un nombre al título (ej. `Plano_Afectacion_Iguana`) y haz clic en **Aceptar**.
3. En el área en blanco del diseñador, haz clic derecho sobre la hoja blanca y selecciona **Propiedades de la página...**
4. En el panel lateral derecho:
   - **Tamaño:** `A3` (420 × 297 mm) o `Carta`.
   - **Orientación:** `Horizontal`.

### Paso 5.2: Inserción y Encuadre del Mapa Principal
1. En la barra de herramientas de la izquierda del diseñador, haz clic en el botón **Añadir mapa** (ícono de hoja con montañas).
2. Dibuja un rectángulo grande en el lienzo arrastrando el cursor, dejando un margen perimetral y un espacio reservado a la derecha o en la base para el membrete y la leyenda.
3. Con el mapa seleccionado, en el panel lateral derecho (**Propiedades del elemento**):
   - **Escala:** Escribe un número redondo cerrado, por ejemplo `5000` (escala 1:5.000) o `10000` (1:10.000) según el tamaño del área.
   - Para encuadrar el área de estudio sin modificar la escala, usa la herramienta **Mover contenido del elemento** (tecla `C`) y arrastra el mapa hasta centrar el tramo de La Iguaná.

### Paso 5.3: Configuración de la Cuadrícula Métrica Oficial (CTM12)
1. En las propiedades del mapa, despliega la pestaña **Cuadrículas (*Grids*)**.
2. Haz clic en el botón verde de suma (`+`) para añadir `Grid 1`.
3. Selecciona `Grid 1` y haz clic en el botón **Modificar cuadrícula...**
4. Ajusta los parámetros:
   - **Tipo de cuadrícula:** `Cruces` o `Línea sólida` con color gris claro y opacidad reducida.
   - **SRC:** Haz clic en el selector y elige `EPSG:9377 - MAGNA-SIRGAS / Origen Nacional`.
   - **Intervalo:** Escribe en $X$: `500` (o `1000`) y en $Y$: `500` (o `1000`) metros.
5. Despliega la subsección **Dibujar coordenadas**:
   - Marca la casilla **Dibujar coordenadas**.
   - **Formato:** `Decimal`.
   - **Precisión de coordenadas:** `0` (las coordenadas métricas no llevan decimales en la grilla).
   - **Izquierda:** En *Dibujar*, elige `Mostrar todo`; en *Dirección*, selecciona **Vertical ascendente**.
   - **Derecha:** En *Dibujar*, elige `Mostrar todo`; en *Dirección*, selecciona **Vertical ascendente**.
   - **Arriba y Abajo:** Dirección `Horizontal`.

### Paso 5.4: Elementos Normativos de Salida Cartográfica
1. **Escala gráfica:**
   - Clic en el botón **Añadir barra de escala** y dibújala en una esquina inferior del mapa.
   - En sus propiedades: Unidades en `Metros`, segmentos: 1 a la izquierda y 2 o 3 a la derecha, con valores cerrados (ej. 100, 200, 300 m).
2. **Flecha de Norte:**
   - Clic en el botón **Añadir flecha de norte** (o Añadir imagen SVG).
   - Selecciona una flecha formal y sobria. Asegúrate de que esté sincronizada con la rotación del mapa principal.
3. **Leyenda dinámica depurada:**
   - Clic en el botón **Añadir leyenda** y colócala en el espacio reservado.
   - En propiedades de la leyenda, **desmarca la casilla "Autoactualizar"**.
   - Elimina las capas auxiliares o repetidas usando el botón rojo de menos (`-`).
   - Haz doble clic sobre cada capa restante para escribir nombres limpios y profesionales:
     - `Eje hidrográfico Quebrada La Iguaná`
     - `Retiro normativo de protección (30 m)`
     - `Predios con afectación parcial`
     - `Equipamientos comunitarios en franja de retiro`
     - `Predios catastrales colindantes`
4. **Membrete o Cartela Técnica Institucional:**
   - Añade un marco con la herramienta **Añadir forma (Rectángulo)** y agrega etiquetas de texto con **Añadir etiqueta**.
   - Incluye los siguientes datos obligatorios:
     - **Título:** PLANO DE AFECTACIÓN PREDIAL POR RETIRO HÍDRICO (30 M)
     - **Subtítulo:** Cuenca Baja Quebrada La Iguaná — Sector Blanquizal
     - **Entidad:** DAGRD / Alcaldía de Medellín — Consultoría Técnica
     - **Consultor / Estudiante:** Tu Nombre Completo (Código estudiantil)
     - **Fecha:** Semestre 2026-2
     - **Sistema de Coordenadas:** MAGNA-SIRGAS Origen Nacional CTM12 (`EPSG:9377`)
     - **Escala numérica:** 1:5.000 (o la escala que hayas fijado)

### Paso 5.5: Exportación a PDF a 300 ppp
1. En el menú superior del diseñador, ve a **Diseño $\to$ Exportar como PDF...**
2. Selecciona la ruta: `simulacro_p1/mapa_parcial1.pdf`.
3. En la ventana de opciones de exportación:
   - **Resolución de exportación:** Asegúrate de que indique `300 ppp` (resolución estándar de impresión).
   - Mantén activa la opción de crear PDF geoespacial o vectorial.
4. Haz clic en **Guardar**.
5. Abre el PDF resultante en un visor externo y comprueba que se visualice nítido, sin textos cortados ni elementos desalineados.

### Paso 5.6: Guardado del Proyecto QGIS en Rutas Relativas
1. Regresa a la ventana principal de QGIS.
2. Ve al menú **Proyecto $\to$ Propiedades... $\to$ pestaña General**.
3. En la sección **Guardar rutas**, asegúrate de seleccionar: **Relativas**.
4. Haz clic en **Aceptar**.
5. Ve a **Proyecto $\to$ Guardar como...** y guarda el archivo en:
   `simulacro_p1/proyecto.qgz`.

---

## Fase 6: Protocolo de Autoverificación Manual en QGIS

Antes de dar por concluida tu práctica o examen, realiza este **chequeo visual y operativo directo en QGIS** para garantizar que no haya inconsistencias:

### 1. Chequeo de Archivos en la Carpeta
Abre el explorador de archivos de tu sistema operativo y entra a la carpeta `simulacro_p1/`. Deben existir exactamente estos 4 elementos:
- [ ] `analisis_vectorial.gpkg`
- [ ] `resumen_afectacion.json`
- [ ] `mapa_parcial1.pdf`
- [ ] `proyecto.qgz`

### 2. Chequeo de Capas en el GeoPackage
En el panel Navegador de QGIS, despliega la base de datos `analisis_vectorial.gpkg`. Comprueba que aparezcan listadas las **5 capas requeridas**:
- [ ] `drenajes_iguana`
- [ ] `predios_topologia_valida`
- [ ] `retiro_hidrico_30m`
- [ ] `predios_afectados_retiro`
- [ ] `equipamientos_en_retiro`

### 3. Chequeo de Sistemas de Coordenadas (CRS)
Haz clic derecho sobre cada una de las 5 capas del GeoPackage $\to$ **Propiedades $\to$ Información**.
- [ ] Confirma que la línea **CRS / SRC** diga: `EPSG:9377 - MAGNA-SIRGAS / Origen Nacional`. Ninguna capa debe estar en WGS84 (`EPSG:4326`) ni en el origen central Bogotá (`EPSG:3116`).

### 4. Chequeo de Topología Limpia (Cero Errores)
Abre el panel del Comprobador de topología:
- [ ] Configura las reglas sobre `predios_topologia_valida`: *no debe superponerse* y *no debe tener huecos*.
- [ ] Haz clic en **Validar todo**.
- [ ] Confirma que el contador indique exactamente **0 errores encontrados**.

### 5. Chequeo de la Tabla de Atributos
Abre la tabla de atributos de `predios_afectados_retiro` (`F6`):
- [ ] Existe la columna `area_afectada_ha`.
- [ ] Los valores de `area_afectada_ha` son números decimales positivos razonables (en hectáreas, no millones de metros cuadrados).

### 6. Chequeo del Archivo JSON
Abre `resumen_afectacion.json` en un editor de texto:
- [ ] Todas las comillas y llaves `{ }` están cerradas correctamente.
- [ ] Contiene los datos del estudiante, el CRS (`EPSG:9377`) y las 4 métricas numéricas.

### 7. Chequeo del Plano Cartográfico PDF
Abre `mapa_parcial1.pdf` al 100% de zoom:
- [ ] La cuadrícula métrica muestra números enteros claros cada 500 m o 1000 m.
- [ ] La escala gráfica, el norte y el membrete están alineados y son legibles.
- [ ] El mapa no muestra recuadros en blanco ni capas superpuestas de manera desordenada.

### 8. Chequeo de Cierre: Prueba de Rutas del Proyecto `.qgz`
- Cierra QGIS.
- Vuelve a abrir QGIS haciendo doble clic directamente sobre `simulacro_p1/proyecto.qgz`.
- [ ] El proyecto debe abrir de inmediato **sin ninguna ventana de advertencia de capas no encontradas** (*Handle Bad Layers*).
