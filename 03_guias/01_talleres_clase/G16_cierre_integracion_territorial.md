# G16: Cierre Integrador del Curso — Auditoría QA/QC, Parcial 2 y Sustentación del Informe Final (`IF`)

**Sesión de Cierre del Jueves 05 de noviembre (Semana 16) · Consolidación Territorial en QGIS, Aplicación del Parcial 2 (`P2` — 15%, 1h30m) y Entrega + Sustentación del Informe Final (`IF` — 26%).**  
En esta última sesión del semestre cerraremos el ciclo completo de consultoría geomática sobre la **Cuenca de la Quebrada La Iguaná** en **QGIS**: aplicaremos el protocolo de aseguramiento y control de calidad espacial (**QA/QC**), verificaremos la portabilidad con rutas relativas, presentaremos el **Parcial 2 (`P2` — 15%, 90 min)** y realizaremos la sustentación oral del **Informe Final (`IF` — 26%, entregado en `grupoXX_IF.zip`)**.

---

## 1. Integración Multicriterio para el Análisis Territorial en La Iguaná (`IF` en QGIS)

A lo largo del curso pasamos de explorar visores básicos a construir un análisis territorial completo en **QGIS** bajo **MAGNA-SIRGAS / Origen-Nacional (`EPSG:9377`)** que articula tres dimensiones para fundamentar una propuesta de **Ingeniería Civil y Diseño Urbano**:

1. **Relieve y Amenaza Morfométrica:**
   - Pendiente del terreno (`pendiente_iguana_9377.tif`) y sombreado analítico (*Hillshade*) sobre el DEM de La Iguaná para identificar laderas críticas ($> 30^\circ$) e inestabilidad geotécnica.
2. **Cobertura Biofísica y Presión Urbana (Sentinel-2 en QGIS):**
   - Índices espectrales **`NDVI`** (`ndvi_iguana_9377.tif`, vigor vegetal y desprotección de laderas) y **`NDBI`** (`ndbi_iguana_9377.tif`, impermeabilización y expansión urbana).
3. **Conflicto Hidráulico y Priorización de Intervención:**
   - Cruce espacial en **QGIS** (manual o mediante el **Diseñador Gráfico de Modelos `.model3`**) con la faja de retiro hídrico de $30\text{ m}$ para delimitar los **sectores prioritarios de conflicto (`zonas_conflicto_prioritario`)** y las **intervenciones propuestas (`propuesta_intervencion`)**, cuantificando hectáreas (ha) afectadas.

---

## 2. Protocolo de Auditoría y Control de Calidad Espacial (QA/QC en QGIS)

Antes de comprimir su entrega definitiva `grupoXX_IF.zip`, verifiquen en equipo cada punto de esta lista de control:

### 2.1 Auditoría de Sistema de Referencia (`EPSG:9377`)
- [ ] **Todas** las capas vectoriales en `proyecto_iguana.gpkg` y los rásteres en `raster_base/` están en **MAGNA-SIRGAS / Origen-Nacional (`EPSG:9377`)**.
- [ ] El proyecto general (`proyecto_iguana.qgz`) tiene configurado `EPSG:9377` en la barra inferior de estado.

### 2.2 Auditoría Geométrica, Ráster y Tabular
- [ ] Las capas `zonas_conflicto_prioritario` y `propuesta_intervencion` dentro de `proyecto_iguana.gpkg` tienen áreas calculadas en hectáreas (`area_ha = $area / 10000.0`).
- [ ] Los rásteres `ndvi_iguana_9377.tif` y `ndbi_iguana_9377.tif` tienen valores acotados dentro del intervalo físico $[-1.0, +1.0]$.

### 2.3 Verificación de Rutas Relativas (Cero Enlaces Rotos)
1. En **QGIS**, abrir **Proyecto → Propiedades... → General**.
2. Confirmar que **Guardar rutas** esté en **Relativas**.
3. Verificar que ninguna capa apunte a carpetas temporales (`Temp`, `Descargas` o rutas absolutas fuera de `1_proyecto_qgis/`).

---

## 3. Estructura Simplificada del Paquete Único (`grupoXX_IF.zip`)

Cierren completamente **QGIS** antes de comprimir (para liberar archivos temporales `.wal` o `.shm` del GeoPackage) y organicen su entrega siguiendo la estructura simplificada de [`INSTRUCTIVO_ENTREGA_IF.md`](../03_evaluaciones/INSTRUCTIVO_ENTREGA_IF.md):

```text
grupoXX_IF.zip
├── 1_proyecto_qgis/
│   ├── proyecto_iguana.gpkg               # Capas vectoriales de diagnóstico, zonas_conflicto_prioritario y propuesta_intervencion
│   ├── proyecto_iguana.qgz                # Proyecto QGIS con simbología lista y rutas relativas
│   └── raster_base/                       # Rásteres clave en EPSG:9377 (pendiente, ndvi, ndbi)
├── 2_Lamina_Sintesis_A3_grupoXX.pdf       # Mapa A3 horizontal (300 dpi) de diagnóstico y propuesta territorial
└── 3_Informe_Territorial_grupoXX.pdf      # Informe ejecutivo conciso (máx. 4–5 páginas) enfocado en análisis y propuesta
```

---

## 4. Aplicación del Parcial Práctico 2 (`P2` — 15%, 1h30m) y Sustentación Oral del `IF` (`26%`)

* **Bloque 1 — Parcial Práctico 2 (`P2`, 15%, 90 minutos / 1h30m):** Evalúa de manera individual en **QGIS** y 100% excluyente respecto a las evaluaciones anteriores las temáticas de las Semanas 12 a 15 (sin cubo virtual `.vrt`): cálculo directo de `NDVI` y `NDBI` en la Calculadora Ráster de QGIS, vectorización de presión urbana (`"DN" = 1`), modelo automatizado (`modelo_automatizado_p2.model3`) en el Diseñador Gráfico de Modelos de QGIS encadenando `Buffer (30 m, Dissolve)` $\rightarrow$ `Intersección` $\rightarrow$ `Calculadora de Campos (area_ha)`, métricas JSON y mapa síntesis PDF (ver [`INSTRUCTIVO_EVALUACION_P2.md`](../03_evaluaciones/INSTRUCTIVO_EVALUACION_P2.md)).
* **Bloque 2 — Entrega Única y Sustentación Oral del Informe Final (`IF` = 26%):** Cada equipo presenta su defensa oral de **10 minutos** (7 min Pitch ejecutivo + 3 min de preguntas individuales a cada integrante sobre la Lámina A3 y el proyecto en QGIS; ver [`INSTRUCTIVO_ENTREGA_IF.md`](../03_evaluaciones/INSTRUCTIVO_ENTREGA_IF.md)).

---

## Checklist Final del Curso (Semana 16 — 05 de Noviembre)

- [ ] Se verificó el cumplimiento del protocolo QA/QC en `EPSG:9377` en QGIS con rutas relativas.
- [ ] Se exportó la lámina `2_Lamina_Sintesis_A3_grupoXX.pdf` (A3 a 300 dpi) y el informe `3_Informe_Territorial_grupoXX.pdf` (máx. 4–5 páginas enfocadas en el análisis territorial y la propuesta, sin pasos de menús).
- [ ] Se probó descomprimir `grupoXX_IF.zip` en una carpeta limpia verificando que `proyecto_iguana.qgz` abre sin enlaces rotos.
- [ ] Se presentó el **Parcial 2 (`P2` — 15%, 1h30m en QGIS)**, se radicó `grupoXX_IF.zip` y el equipo realizó la **Sustentación Oral**.

