# G05: Digitalización vectorial, auto-ensamblado y control topológico

**Módulo 1 · Semana 5.** Segunda de las "tres clases" de acompañamiento paso a paso. En esta sesión aprenderán las reglas de oro para digitalizar cartografía profesional sin traslapes, sin huecos y con geometrías limpias, evitando los errores topológicos más comunes que invalidan las entregas espaciales.

---

## 1. El Riesgo Topológico: Por qué la digitalización a mano falla

Cuando se digitalizan laderas, predios o redes hídricas a simple vista con el cursor, es humanamente imposible hacer coincidir los vértices de dos polígonos vecinos. Invariablemente ocurren dos patologías geométricas:
1. **Traslapes / Superposiciones (*Overlaps*):** Dos polígonos comparten la misma área física. En un catastro o estudio de cuenca, esto significa que el terreno se calcula dos veces, distorsionando las estadísticas.
2. **Huecos o astillas (*Gaps / Slivers*):** Quedan grietas milimétricas vacías entre polígonos colindantes.
3. **Auto-intersecciones (*Bowties / Invalid Geometries*):** El perímetro de un polígono se cruza a sí mismo formando un "ocho". QGIS no puede calcular el área de una geometría inválida.

Para resolver esto de forma profesional se utilizan dos herramientas indispensables: la **Barra de Auto-ensamblado (*Snapping*)** y el plugin **Comprobador de topología**.

---

## 2. Configuración de la Barra de Auto-Ensamblado (Snapping)

1. En el menú superior, vayan a **Proyecto → Opciones de autoensamblado...** (o hagan clic en el ícono de imán en la barra de herramientas).
2. Activen el imán (ícono rojo/verde según el tema).
3. Configuren los siguientes parámetros:
   - **Modo:** *Todas las capas* o *Capa avanzada*.
   - **Tipo de enganche:** Marquen **Vértice** y **Segmento**.
   - **Tolerancia:** `12` **píxeles** (no en metros, para que el enganche responda con suavidad al nivel de zoom).
   - **Solapamiento:** Activen la casilla **Evitar solapamiento** (*Avoid Overlap*) en las capas que no deban pisarse entre sí.
   - **Trazado automático (*Tracing*):** Activen el ícono de trazado (letra T o imán con línea punteada). Esto permite calcar bordes existentes automáticamente sin tener que hacer clic en cada vértice.

---

## 3. Digitalización Guiada en La Iguaná

Dentro de su contenedor `proyecto_iguana.gpkg`, creen dos capas nuevas en EPSG:9377:
- `red_hidrica` (Tipo: Cadena de líneas / Multilínea).
- `zonas_cobertura` (Tipo: Polígono / Multipolígono).

### A. Digitalización de líneas (Eje de la quebrada y afluentes)
1. Seleccionen la capa `red_hidrica` en el Panel de Capas y hagan clic en el lápiz (**Conmutar edición**).
2. Hagan clic en **Añadir objeto espacial de línea**.
3. Digitalicen el cauce principal de La Iguaná desde el Alto de Boquerón aguas abajo hacia el Río Medellín, siguiendo el fondo de valle visible en la ortofoto.
4. Para conectar un afluente (ej. Quebrada La Seca), comiencen a digitalizar desde su nacimiento y terminen haciendo clic derecho justo sobre el vértice del cauce principal: el imán asegurará que la confluencia sea topológicamente exacta (sin extremos sueltos o *dangles*).
5. Guarden los cambios haciendo clic en el ícono del disquete con lápiz.

### B. Digitalización de polígonos adyacentes sin traslapes
1. Conmuten la edición en `zonas_cobertura`.
2. Digitalicen el primer polígono (ej. una zona de bosque en San Cristóbal). Cierren con clic derecho.
3. Para el polígono colindante (ej. la zona urbana adyacente):
   - Con la opción *Evitar solapamiento* activada, comiencen a digitalizar el segundo polígono montándose deliberadamente sobre el interior del primero.
   - Al hacer clic derecho para cerrar, QGIS recortará automáticamente el sobrante, logrando un borde compartido matemáticamente perfecto sin huecos ni traslapes.

---

## 4. Auditoría con el Comprobador de Topología (Topology Checker)

Antes de guardar cualquier entrega vectorial, es obligatorio verificar su consistencia topológica:

1. Vayan al menú **Vectorial → Comprobador de topología** (si no aparece, actívenlo en *Complementos → Administrar e instalar complementos* buscando *Topology Checker*).
2. Se abrirá el panel inferior de topología. Hagan clic en el ícono de llave inglesa (**Configurar**).
3. Añadan las tres reglas fundamentales para la Cuenca de La Iguaná:
   - `zonas_cobertura` → **no debe tener geometrías no válidas**.
   - `zonas_cobertura` → **no debe superponerse** (*must not overlap*).
   - `zonas_cobertura` → **no debe tener huecos** (*must not have gaps*).
   - `red_hidrica` → **no debe tener extremos sueltos** (*must not have dangles*, excepto en nacimientos y desembocadura).
4. Hagan clic en *Aceptar* y luego en el botón **Validar todo**.
5. Si aparecen errores en la tabla roja:
   - Hagan doble clic sobre el error para que QGIS haga zoom al punto exacto.
   - Para reparar las inconsistencias geométricas, disponen de dos métodos según la complejidad:
     - **Modificando los vértices con la Herramienta de Vértices (*Vertex Tool*):** desplacen los nodos invasores hasta calzarlos magnéticamente con el lindero contiguo o eliminen nodos redundantes con la tecla `Supr` (`Delete`).
     - **Con la Herramienta Remodelar objetos espaciales (*Reshape Features*):** en la barra de *Digitalización avanzada*, seleccionen el objeto, tracen una línea de corte desde afuera hacia adentro calcando con autoensamblado (*snapping*) el borde del polígono vecino y terminen afuera con clic derecho para rebanar el solape o rellenar el hueco automáticamente.
   - Vuelvan a validar hasta que la lista de errores quede totalmente en blanco (cero errores).

---

## Checklist de Calidad antes de entregar

- [ ] Todas las capas están almacenadas en `proyecto_iguana.gpkg` en `EPSG:9377`.
- [ ] No se utilizaron Shapefiles sueltos.
- [ ] El *Comprobador de topología* se ejecutó y arrojó **cero errores de superposición y geometrías válidas**.
- [ ] Las confluencias de la red hídrica están enganchadas exactamente a los vértices del cauce principal.
- [ ] Se guardaron las ediciones en todas las capas y el proyecto `.qgz`.
