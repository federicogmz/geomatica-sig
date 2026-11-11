# Taller de Repaso y Entrenamiento Autónomo — Hito 2: Topología, Geoprocesamiento y Cartografía A3

> **Curso:** Geomática, Ingeniería y SIG (`GEOMATICA-SIG-EAFIT`)  
> **Semestre:** 2027-1 · Universidad EAFIT  
> **Módulo:** Saneamiento Topológico, Geoprocesamiento Parametrizado ($D$) y Salida Normativa A3  
> **Presupuesto de Trabajo Autónomo:** $\le 4.5\text{ horas}$  
> **Insumos de Práctica:** `03_guias/02_talleres_repaso/insumos_p1/`  
> **Preparación Directa para:** **Hito 2 (Semana 8 · 20.0 % · Tier P)**

---

## 1. Propósito y Resultados de Aprendizaje

Este taller de repaso proporciona un entrenamiento intensivo para el **Hito 2 (Evaluación Práctica Integradora 1)**:
- **RAA1:** Operar con exactitud en el sistema de coordenadas oficial **MAGNA-SIRGAS Origen Nacional CTM12 (`EPSG:9377`)**.
- **RAA2:** Auditar geometrías mediante el **Comprobador de topología** en QGIS LTR y **Geodatabase Topology** en ArcGIS Pro, eliminando solapes, huecos y polígonos astilla; ejecutar cadenas de geoprocesamiento (*Buffer* disuelto, *Intersect*, *Dissolve*) parametrizadas con la **semilla individual $D$**; y componer una lámina cartográfica ejecutiva en **formato A3 horizontal (PDF a 300 ppp)** cumpliendo los ocho estándares anatómicos.

---

## 2. Insumos Disponibles en `insumos_p1/`

Utilizaremos los datos de `03_guias/02_talleres_repaso/insumos_p1/`:
- `predios_catastro.gpkg`: Cobertura de predios urbanos con inconsistencias topológicas inducidas.
- `drenajes_iguana.shp`: Ejes lineales de drenajes para aplicar el retiro hídrico normativo.

---

## 3. Plan de Entrenamiento Cronometrado (4.5 Horas)

```text
┌────────────────────────────────────────────────────────────────────────┐
│ FASE 1 (70 min): Auditoría Topológica y Corrección de Geometrías       │
│ FASE 2 (75 min): Geoprocesamiento Parametrizado con Semilla D         │
│ FASE 3 (85 min): Composición Cartográfica A3 Horizontal (PDF 300 ppp)  │
│ FASE 4 (40 min): Control de Calidad QA/QC y Verificación Cruzada       │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Fase 1: Auditoría y Saneamiento Topológico en QGIS LTR (70 min)

1. Abre QGIS LTR y carga `predios_catastro.gpkg`. Asegúrate de que el CRS del proyecto esté fijado en **`EPSG:9377`**.
2. **Activación del Plugin:** Ve a *Complementos > Administrar e instalar complementos* y activa **Comprobador de topología**.
3. **Configuración de Reglas:** Abre el panel del Comprobador de topología (*Vectorial > Comprobador de topología*) y añade las siguientes reglas:
   - `predios_catastro` $\rightarrow$ *no debe superponerse*
   - `predios_catastro` $\rightarrow$ *no debe tener huecos*
   - `predios_catastro` $\rightarrow$ *no debe tener geometrías duplicadas*
4. Haz clic en **Validar todo**. Analiza los errores resaltados en rojo.
5. **Corrección de Defectos:**
   - Activa la edición de la capa.
   - En el menú *Configuración > Opciones de autoensamblado*, activa el auto-ensamblado (*Snapping*) con tolerancia de $1.0\text{ m}$ a vértice y segmento.
   - Corrige los solapes usando la herramienta *Dividir objetos espaciales* o la herramienta de vértices para alinear los linderos.
   - Detecta polígonos astilla (*slivers* menores a $5\text{ m}^2$) mediante la expresión `$area < 5` y fusiónalos con el predio vecino más grande (*Edición > Combinar objetos espaciales seleccionados*).
6. Vuelve a validar en el Comprobador hasta obtener: **0 errores**.

---

### Fase 2: Geoprocesamiento Parametrizado con Semilla $D$ (75 min)

Asume como valor de prueba tu último dígito de documento de identidad: $D \in \{0, 1, \dots, 9\}$.

#### Paso 2.1: Buffer Disuelto de Retiro Hídrico
1. Carga la capa de drenajes (asegúrate de que esté en `EPSG:9377`).
2. Abre la herramienta **Amortiguador (Buffer)** (*Vectorial > Herramientas de geoprocesamiento > Amortiguador*):
   - Distancia: $R = 30 + D\text{ metros}$ *(p. ej., si $D=5$, distancia $= 35\text{ m}$)*.
   - Segmentos: $25$ (para bordes curvos suaves).
   - **Casilla obligatoria:** Marca **Disolver resultado**.
   - Salida: Guarda como `faja_retiro_d_9377.gpkg`.

#### Paso 2.2: Intersección con Predios Catastrales
1. Abre **Intersección (*Intersect*)**:
   - Capa de entrada: `predios_saneados`
   - Capa de superposición: `faja_retiro_d_9377`
   - Salida: `predios_afectados_retiro.gpkg`
2. Abre la tabla de atributos de la capa resultante:
   - Crea el campo `area_afect_m2` de tipo Decimal: `round($area, 2)`.
   - Crea el campo `area_afect_ha` de tipo Decimal: `round($area / 10000, 4)`.
   - Crea `pct_afectacion`: `round(( "area_afect_m2" / "area_original" ) * 100, 2)`.

#### Paso 2.3: Agregación con Dissolve
1. Abre la herramienta **Disolver (*Dissolve*)**:
   - Capa de entrada: `predios_afectados_retiro`
   - Campo de disolución: `uso_suelo` (o la tipología catastral disponible).
2. Abre la tabla resultante y constata que las geometrías de una misma categoría se unificaron en una sola entidad multipolígono.

---

### Fase 3: Composición Cartográfica A3 Horizontal (85 min)

1. En QGIS, ve a *Proyecto > Nueva composición de impresión* con el nombre `Lamina_A3_Repaso`.
2. Haz clic derecho en el lienzo en blanco > **Propiedades de la página**:
   - Tamaño: **A3**.
   - Orientación: **Horizontal ($420 \times 297\text{ mm}$)**.
3. Inserta los **8 elementos anatómicos indispensables**:
   - **Mapa Principal:** Añadir mapa ocupando el 70 % del lienzo. Bloquea la escala en un valor redondo de ingeniería ($1:2\,000$ o $1:5\,000$).
   - **Cuadrícula métrica:** En las propiedades del elemento mapa > *Cuadrículas*:
     - Intervalo $X$ e $Y$: $100\text{ m}$ o $200\text{ m}$.
     - Tipo de cuadrícula: *Cruz* o *Sólida con marco exterior de zebra*.
     - Coordenadas: Dibujar coordenadas con formato decimal sin ceros sobrantes, orientación vertical para el eje Este/Oeste.
   - **Escala gráfica y numérica:** Barra de escala con divisiones de $50\text{ m}$ o $100\text{ m}$.
   - **Flecha de Norte:** Símbolo sobrio orientado al norte de cuadrícula.
   - **Leyenda:** Desactiva *Autoactualizar*. Renombra las capas con nombres limpios (sin guiones bajos ni códigos de programación).
   - **Mapa de Ubicación:** Inserta un segundo mapa pequeño en la esquina con el contexto general del Valle de Aburrá.
   - **Cajetín y Metadatos:** Cuadro de texto formal con autor, fecha, CRS (`EPSG:9377`), elipsoide GRS80 y tabla con el resumen numérico de áreas afectadas en hectáreas.
4. Exporta a PDF: *Composición > Exportar como PDF...*:
   - Resolución de exportación: **300 ppp**.
   - Marca la opción **Crear PDF geoespacial** si está disponible.

---

### Fase 4: Control de Calidad QA/QC

Verifica tu entrega contra las siguientes trampas habituales:

> [!WARNING]
> **Las 3 Fallas Más Frecuentes en el Hito 2:**
> 1. **No disolver el Buffer:** Genera cientos de anillos superpuestos entre drenajes vecinos, multiplicando las áreas intersectadas de manera artificial.
> 2. **Olvidar recalcular `$area`:** Mantener el valor del campo original de área predial después de recortar por la faja de retiro.
> 3. **Escalas cartográficas arbitrarias:** Dejar el mapa en escalas como $1:3\,428.75$ en vez de fijar $1:2\,500$ o $1:5\,000$.

---

## 4. Lista de Autoevaluación previa al Hito 2

- [ ] Mi Comprobador de topología no arroja solapes ni huecos entre predios.
- [ ] Mi buffer hídrico está disuelto en un único polígono continuo y mide $30 + D\text{ m}$.
- [ ] Recalculé el área afectada en metros cuadrados y hectáreas tras la intersección.
- [ ] Mi lámina A3 está exportada a 300 ppp con cuadrícula CTM12, escala redonda y leyenda limpia.
