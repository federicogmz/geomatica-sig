# G13: Índices Espectrales (NDVI y NDBI), Álgebra de Mapas y Presión Urbana

**Semestre 2027-1 · Módulo 4: Teledetección Multiespectral y Modelación Biespectral · Sesión S13 (Jueves 22 de abril de 2027)**  
*Horario:* 12:00 m. – 4:30 p.m. (`Sub-bloque 1: 12:00–1:50 p.m.` QGIS LTR · `Pausa Activa: 1:50–2:10 p.m.` · `Sub-bloque 2: 2:10–4:30 p.m.` ArcGIS Pro + Cierre `C:\Temp -> .zip`)  
*Presupuesto Académico:* 4.5 h presenciales + 4.5 h de trabajo autónomo semanal (3 Créditos Académicos · 5 UMEs · 144 h semestrales)  
*Modalidad:* **100 % Individual** · *Metodología:* **Worked-Example Fading** (Cuenca Escuela La Iguaná $\rightarrow$ Espejo en ArcGIS Pro $\rightarrow$ Transferencia autónoma a Unidad Territorial `U01–U30`).

---

## 1. Fundamentos Matemáticos de los Índices de Diferencia Normalizada

Los índices espectrales normalizados aprovechan las asimetrías de reflectancia entre dos bandas radiométricas mediante la estructura:
$$\text{Índice} = \frac{\text{Banda}_A - \text{Banda}_B}{\text{Banda}_A + \text{Banda}_B}$$

Esta formulación garantiza:
1. **Rango numérico acotado:** Todos los valores se restringen teóricamente al intervalo $[-1.0, +1.0]$.
2. **Mitigación de sombras topográficas:** Al dividir la diferencia por la suma, se cancela en gran medida la variación de iluminación solar generada por la pendiente y orientación de las laderas andinas.

### 1.1 Índice de Vegetación de Diferencia Normalizada (NDVI)
Compara el Infrarrojo Cercano (`B08`) contra el Rojo (`B04`):
$$\text{NDVI} = \frac{\text{B08} - \text{B04}}{\text{B08} + \text{B04}}$$
- $\text{NDVI} > 0.45$: Bosque denso, dosel continuo y vegetación vigorosa (San Cristóbal / Boquerón).
- $0.20 \le \text{NDVI} \le 0.45$: Pastos, matorrales y coberturas vegetales dispersas.
- $\text{NDVI} < 0.20$: Suelo desnudo, concreto, asfalto, tejados y áreas urbanizadas.
- $\text{NDVI} < 0.0$: Agua abierta y sombras profundas.

### 1.2 Índice de Edificación / Área Construida (NDBI)
Compara el Infrarrojo de Onda Corta (`B11`) contra el Infrarrojo Cercano (`B08`):
$$\text{NDBI} = \frac{\text{B11} - \text{B08}}{\text{B11} + \text{B08}}$$
- $\text{NDBI} > 0.0$ (positivo): Superficies impermeables, concreto, techos metálicos, ladrillo y asfalto.
- $\text{NDBI} \le 0.0$ (negativo): Zonas con cobertura vegetal viva o alta retención de humedad.

---

## 2. Parámetro Individualizado: Umbral de Vegetación por Documento de Identidad

Para asegurar la autoría técnica y la reproducibilidad individual en el diseño territorial, cada estudiante calcula su propio umbral crítico de vegetación $U_{\text{NDVI}}$ en función del último dígito $D \in \{0, 1, \dots, 9\}$ de su documento de identidad:

$$U_{\text{NDVI}} = 0.20 + 0.01 \times D$$

*Ejemplo:* Si el documento de identidad termina en $D = 4$, el umbral individual es $U_{\text{NDVI}} = 0.20 + 0.01 \times 4 = \mathbf{0.24}$.

---

## 3. Sub-bloque 1: Flujo en QGIS LTR sobre la Cuenca Escuela La Iguaná

Con las bandas recortadas en `EPSG:9377` a 10 m (`s2_b04_rojo_9377.tif`, `s2_b08_nir_9377.tif`, `s2_b11_swir1_9377.tif`):

### 3.1 Cálculo de NDVI y NDBI en la Calculadora Ráster
1. Ir a **Raster → Calculadora ráster...**
2. Clic sobre `s2_b08_nir_9377@1` y pulsar **Extensión actual de la capa**.
3. **Cálculo de NDVI:**
   - Capa de salida: `ndvi_iguana_9377.tif`.
   - Expresión (con paréntesis obligatorios):
     ```text
     ( "s2_b08_nir_9377@1" - "s2_b04_rojo_9377@1" ) / ( "s2_b08_nir_9377@1" + "s2_b04_rojo_9377@1" )
     ```
   - Clic en **Aceptar**.
4. **Cálculo de NDBI:**
   - Capa de salida: `ndbi_iguana_9377.tif`.
   - Expresión:
     ```text
     ( "s2_b11_swir1_9377@1" - "s2_b08_nir_9377@1" ) / ( "s2_b11_swir1_9377@1" + "s2_b08_nir_9377@1" )
     ```
   - Clic en **Aceptar**.

### 3.2 Simbología Profesional y Fusión Plástica 3D
- **Para `ndvi_iguana_9377.tif`:**
  - *Propiedades → Simbología → Monobanda pseudocolor*.
  - Rampa: `RdYlGn` (Rojo a Verde), Mín = `-0.10`, Máx = `+0.70`.
  - Modo de mezcla (*Blending Mode*): **Multiplicar (*Multiply*)** sobre `hillshade_iguana.tif`.
- **Para `ndbi_iguana_9377.tif`:**
  - Rampa: `RdYlBu` invertida (Azul = húmedo/verde, Rojo = impermeable/concreto).

### 3.3 Auditoría Estadística con `Estadísticas de capa ráster`
En la **Caja de Herramientas de Procesos**, ejecutar **Estadísticas de capa ráster**:
- `ndvi_iguana_9377.tif`: Mínimo $\approx 0.06$, Máximo $\approx 0.63$, Media $\approx \mathbf{0.31}$.
- `ndbi_iguana_9377.tif`: Mínimo $\approx -0.32$, Máximo $\approx +0.18$, Media $\approx \mathbf{-0.09}$.

### 3.4 Detección Biespectral de Presión Urbana y Poligonización Limpia
Para delimitar con precisión milimétrica las superficies impermeables carentes de cobertura arbórea:
1. En la **Calculadora Ráster**, escribir la condición combinada usando el parámetro docente de referencia ($0.25$ para La Iguaná):
   ```text
   ( "ndbi_iguana_9377@1" > 0.0 ) AND ( "ndvi_iguana_9377@1" < 0.25 )
   ```
2. Guardar como `presion_urbana_iguana_9377.tif`.
3. Ir a **Raster → Conversión → Poligonizar (ráster a vectorial)...**
4. Campo: `DN`.
5. **Filtrado estricto:** Clic derecho en la capa vectorial $\rightarrow$ **Filtrar...** $\rightarrow$ `"DN" = 1`.
6. Disolver polígonos (*Dissolve*) y calcular el área en hectáreas:
   ```sql
   round($area / 10000.0, 2)
   ```
   *Verificación docente en La Iguaná:* Se obtienen exactamente **$828.25\text{ ha}$** de presión urbana consolidada (y **$65.07\text{ ha}$** ubicadas dentro de la faja de retiro de $30\text{ m}$ del cauce).

---

## 4. Sub-bloque 2: Espejo Corporativo en ArcGIS Pro

### 4.1 Uso de Band Arithmetic en Raster Functions
1. En ArcGIS Pro, abrir el proyecto individual en `EPSG:9377`.
2. Ir a **Imagery → Raster Functions**.
3. Buscar la función **`Band Arithmetic`**:
   - **Raster:** Compuesto de bandas Sentinel-2 (`B04`, `B08`, `B11`).
   - **Method:** Seleccionar **`NDVI`**:
     - *NIR Band Indexes:* 2 (o índice de la banda B08).
     - *Red Band Indexes:* 1 (o índice de la banda B04).
   - Para **`NDBI`**: Seleccionar *Method = User Defined* e ingresar la expresión `(B3 - B2) / (B3 + B2)`.
   - Clic en **Create new layer**.

### 4.2 Álgebra de Mapas con Spatial Analyst en ArcGIS Pro
1. En la caja de herramientas **Spatial Analyst Tools → Map Algebra → Raster Calculator**:
   ```text
   ("B08_NIR" - "B04_Red") / ("B08_NIR" + "B04_Red")
   ```
   Guardar como `NDVI_UXX` en la File Geodatabase.
2. Calcular la condición de presión urbana combinada:
   ```text
   Con(("NDBI_UXX" > 0.0) & ("NDVI_UXX" < 0.24), 1, 0)
   ```
3. Ejecutar **Raster to Polygon**, seleccionar por atributos `gridcode = 1`, disolver con **Dissolve** y calcular hectáreas en la tabla de atributos.

---

## 5. Transferencia Autónoma a su Unidad Territorial (`U01–U30`)

Cada estudiante aplica individualmente sobre su microcuenca y tramo asignado:
1. Calcular `NDVI_UXX` y `NDBI_UXX` utilizando sus bandas recortadas en `EPSG:9377`.
2. Aplicar su umbral individualizado $U_{\text{NDVI}} = 0.20 + 0.01 \times D$.
3. Generar la máscara booleana de presión urbana:
   $$(\text{NDBI} > 0.0) \land (\text{NDVI} < U_{\text{NDVI}})$$
4. Poligonizar filtrando estrictamente `"DN" = 1` y cuantificar las hectáreas totales de presión urbana en su unidad.
5. Cruzar con su faja de retiro individual $R = 30 + D\text{ m}$ para calcular las hectáreas en zona de conflicto hídrico.

---

## 6. Checklist de Finalización de Clase y Preparación Hito 4

- [ ] Calculé `NDVI` y `NDBI` en la Calculadora Ráster de QGIS y mediante *Band Arithmetic* / *Raster Calculator* en ArcGIS Pro.
- [ ] Parametricé mi umbral individual de vegetación $U_{\text{NDVI}} = 0.20 + 0.01 \times D$ según mi documento.
- [ ] Verifiqué las estadísticas zonales y el histograma bimodal de reflectancias.
- [ ] Construí la máscara de presión urbana y la poligonicé filtrando rigurosamente `"DN" = 1`.
- [ ] Calculé la superficie afectada en hectáreas disueltas sobre mi Unidad Territorial `U01–U30`.
- [ ] Consolidé mis capas en `.gpkg` y `.gdb` con rutas relativas, quedando 100% preparado para el **Hito 4 (S14)**.
