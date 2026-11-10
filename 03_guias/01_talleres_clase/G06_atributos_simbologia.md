# G06: Tablas de atributos, calculadora de campos, simbología temática y salida cartográfica A3

**Módulo 1 · Semana 6.** Tercera sesión de acompañamiento intensivo y aplicación del **Quiz 2 (8%)**. En esta sesión dominarán la componente alfanumérica y analítica del SIG: tipos de datos en la tabla de atributos, cálculo de métricas geométricas en metros y kilómetros cuadrados, diseño de simbología temática profesional, etiquetado con halo protector y creación de composiciones cartográficas en el Diseñador de Impresión de QGIS.

---

## 1. El Modelo de Atributos en SIG

Un Sistema de Información Geográfica no es un programa de dibujo vectorial: cada punto, línea o polígono está indisolublemente vinculado a una fila (registro) en una base de datos tabular.

### Tipos de datos fundamentales:
- **Texto / Cadena (*String*):** Nombres propios, códigos catastrales, categorías (ej. `"San Cristóbal"`, `"Robledo"`, `"Residencial"`).
- **Entero (*Integer*):** Conteo discreto sin decimales (ej. número de pisos `3`, código de comuna `7`).
- **Número Real / Decimal (*Double / Real*):** Mediciones continuas y cálculos matemáticos (ej. área en $km^2$ `46.25`, longitud `15234.8`). **Obligatorio para cualquier cálculo geométrico.**
- **Fecha (*Date*):** Fechas de levantamiento o actualización (ej. `2026-09-10`).

> [!WARNING]
> Nunca guarden un área o longitud en un campo de tipo *Texto*. Si lo hacen, QGIS no podrá calcular estadísticas, ordenar numéricamente ni clasificar por rangos de magnitud.

---

## 2. Normalización de Campos en la Tabla de Atributos

Abran su proyecto `proyecto_iguana.qgz` y la capa `zonas_cobertura` o `red_hidrica` dentro de `proyecto_iguana.gpkg`.

1. Abran la tabla de atributos: clic derecho sobre la capa → **Abrir tabla de atributos** (o tecla `F6`).
2. Conmuten el lápiz de edición (esquina superior izquierda de la tabla).
3. **Regla de nomenclatura técnica:**
   - Todos los nombres de columnas en **minúsculas** sin tildes, sin espacios y sin caracteres especiales.
   - Usar formato `snake_case` (ej. `tipo_cobertura`, `area_km2`, `orden_drenaje`, `nombre_afluente`).

---

## 3. Uso de la Calculadora de Campos para Métricas Geométricas

Calcularemos métricas matemáticas exactas a partir de la geometría física de los polígonos:

1. En la barra de la tabla de atributos, hagan clic en el ícono de ábaco (**Abrir calculadora de campos**, `Ctrl + I` / `Cmd + I`).
2. Marquen la casilla **Crear un campo nuevo**.
3. Configuren los parámetros:
   - **Nombre del campo de salida:** `area_km2`
   - **Tipo del campo de salida:** **Número real (decimal)**.
   - **Longitud:** `10`, **Precisión:** `3` (tres cifras decimales).
4. En el panel central de expresión:
   - Desplieguen la categoría **Geometría** y busquen `$area`.
   - Recuerden que como el proyecto está en EPSG:9377 (coordenadas planas en metros), `$area` devuelve metros cuadrados ($m^2$).
   - Para convertir a kilómetros cuadrados ($km^2$), dividan entre $1\,000\,000$:
     ```sql
     $area / 1000000
     ```
5. Hagan clic en *Aceptar*. Noten cómo toda la columna se llena automáticamente con el área precisa de cada polígono.
6. **Para capas de líneas (`red_hidrica`):**
   - Creen un campo `long_m` (Número real, precisión 1).
   - Expresión: `$length` (devuelve la longitud en metros).

---

## 4. Simbología Temática Profesional

La simbología transforma tablas de números en comunicación visual inteligible:

1. Clic derecho sobre `zonas_cobertura` → **Propiedades... → pestaña Simbología**.
2. Cambien de *Símbolo único* a **Categorizado**:
   - **Valor:** Seleccionen el campo `tipo_cobertura` (ej. Bosque, Urbano, Agropecuario).
   - **Rampa de color:** Seleccionen una paleta armónica (eviten la rampa *Spectral* o arcoíris; usen verdes para vegetación, tonos cálidos/grises para urbano).
   - Hagan clic en el botón inferior **Clasificar**.
3. Eliminen la última fila residual con valor vacío `""`.
4. **Simbología graduada (para magnitudes cuantitativas):**
   - Para visualizar el tamaño de los polígonos o el orden de caudal, elijan **Graduado**, seleccionen la columna numérica (`area_km2`) y configuren el método en **Cuantiles** o **Cortes Naturales (Jenks)** con 4 o 5 clases.

---

## 5. Etiquetado Técnico con Halo Protector

Las etiquetas permiten identificar toponimia crítica sin saturar el mapa:

1. En las propiedades de la capa, vayan a la pestaña **Etiquetas**.
2. Cambien a **Etiquetas sencillas (*Single Labels*)**.
3. En **Valor**, elijan la columna que contiene los nombres (ej. `nombre_afluente`).
4. **Configuración tipográfica:**
   - Fuente: *Inter*, *Roboto* o *Helvetica*, tamaño 8 a 9 pt.
5. **El Halo Protector (Indispensable para legibilidad):**
   - Vayan a la sub-pestaña **Buffer / Halo**.
   - Marquen la casilla **Dibujar halo de texto**.
   - Tamaño: `1.0` a `1.5` **milímetros**.
   - Color: Blanco con opacidad del 85-100%.
   - Esto genera un contorno limpio que separa las letras del fondo satelital o de las curvas de nivel.

---

## 6. Salidas Cartográficas en el Diseñador de Impresión (Preparación I1)

La salida cartográfica es el producto formal de ingeniería y diseño urbano:

1. Vayan a **Proyecto → Nueva composición de impresión...** (Asignen el nombre `Lamina_Diagnostico_A3`).
2. Clic derecho sobre el lienzo en blanco → **Propiedades de la página...**
   - Tamaño: **A3 (420 × 297 mm)**.
   - Orientación: **Horizontal**.
3. **Añadir el Mapa Principal:**
   - Herramienta lateral *Añadir mapa* (ícono de hoja de mapa).
   - Tracen una ventana ocupando el 75% del espacio central.
   - En *Propiedades del elemento*, ajusten la **Escala** a un número redondo estándar (ej. `15000` o `20000`).
4. **Añadir la Cuadrícula / Grilla:**
   - En propiedades del mapa, desplieguen **Cuadrículas** → clic en `+`.
   - Modificar cuadrícula:
     - Tipo de cuadrícula: *Cruz* o *Sólido* suave.
     - CRS: `EPSG:9377`.
     - Intervalo X e Y: `1000` **metros**.
     - Dibujar coordenadas: Activar, formato decimal sin ceros sobrantes.
5. **Añadir Elementos Esenciales:**
   - **Barra de Escala:** Menú *Añadir elemento → Añadir barra de escala*. Ajustar unidades en metros/kilómetros.
   - **Flecha de Norte:** *Añadir flecha de norte*.
   - **Leyenda:** *Añadir leyenda*, desmarcar *Auto-actualizar* y remover capas auxiliares.
   - **Membrete Técnico:** Usar la herramienta *Añadir etiqueta de texto* para colocar: Título, Autor(es), Asignatura, Fecha, Escala numérica y Declaración del CRS: `MAGNA-SIRGAS / Origen Nacional CTM12 (EPSG:9377)`.

---

## 7. Práctica Autónoma para Repasar Durante la Semana

Para afianzar lo aprendido y preparar la entrega del Informe 1:

1. **Clasificación condicional:**
   - En la capa de vías o predios, abre la calculadora de campos y crea una columna `prioridad_intervencion` (Texto):
     ```sql
     CASE 
       WHEN "area_km2" > 0.05 THEN 'Alta extensión'
       WHEN "area_km2" BETWEEN 0.01 AND 0.05 THEN 'Media extensión'
       ELSE 'Menor'
     END
     ```
2. **Control de duplicados:**
   - Ordena la tabla de atributos por nombre y verifica que no existan polígonos duplicados.
3. **Exportación de lámina preliminar:**
   - En el Diseñador de Impresión, exporta a PDF a **300 ppp** y revisa en un visor PDF que los textos sean perfectamente legibles y no se corten los bordes.

---

## Checklist de Finalización de Clase y Repaso Semanal

- [ ] Todos los campos de las tablas de atributos están en minúsculas y `snake_case`.
- [ ] Se calcularon `area_km2` en polígonos y `long_m` en líneas con tipo de dato Decimal.
- [ ] La simbología está categorizada con colores acordes a la semiótica cartográfica.
- [ ] Las etiquetas tienen halo protector blanco activado.
- [ ] Se configuró una composición de impresión en formato A3 horizontal con grilla CTM12, escala gráfica y membrete.
- [ ] Se guardaron los cambios en el GeoPackage y en el proyecto `.qgz` con rutas relativas.
