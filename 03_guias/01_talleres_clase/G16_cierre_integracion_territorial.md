# G16: Cierre Integrador del Curso — Protocolo QA/QC, Dossier Infográfico A3 y Pitch Ejecutivo Relámpago

**Semestre 2027-1 · Módulo 6: Síntesis Territorial y Evaluación Final · Sesiones S15 y S16 (06 y 13 de mayo de 2027)**  
*Horario:* 12:00 m. – 4:30 p.m. (`Ronda A: 12:00–1:50 p.m.` · `Pausa Activa: 1:50–2:10 p.m.` · `Ronda B: 2:10–4:30 p.m.` en Sala de Cómputo EAFIT)  
*Presupuesto Académico:* 4.5 h presenciales + 4.5 h de trabajo autónomo semanal (3 Créditos Académicos · 5 UMEs · 144 h semestrales)  
*Modalidad:* **100 % Individual** · *Hito Evaluativo:* **Hito 5 (20.0% de la calificación definitiva)**.

---

## 1. Integración Territorial Multicriterio Individual

El cierre del curso consolida todo el ciclo de ingeniería geomática desarrollado a lo largo de las 16 semanas. Cada estudiante ha modelado de forma independiente su **Unidad Territorial Asignada (`U01` a `U30`)**, combinando:

1. **Relieve y Morfometría del Terreno:**
   - Modelo Digital de Elevación reproyectado a `EPSG:9377`.
   - Pendiente del terreno en grados y porcentaje, sombreado analítico (*Hillshade* 315°/45°) y reclasificación según rangos normativos del POT ($<15^\circ$, $15^\circ-30^\circ$, $>30^\circ$).
   - Perfil topográfico longitudinal del cauce con cálculo de cota máxima, cota mínima y pendiente media.
2. **Cobertura Biofísica e Índices Espectrales Sentinel-2:**
   - Procesamiento de la escena MGRS `18NVL` recortada por máscara a $10\text{ m}$ con `NoData = -9999`.
   - Índice de Vegetación (`NDVI`) con umbral individualizado $U_{\text{NDVI}} = 0.20 + 0.01 \times D$.
   - Índice de Área Construida (`NDBI`) y máscara biespectral de presión urbana impermeabilizada.
   - Vectorización limpia filtrando rigurosamente `"DN" = 1`.
3. **Conflicto Hidráulico y Normativa Territorial:**
   - Faja de retiro hídrico individualizada $R = 30 + D\text{ m}$ generada mediante buffer disuelto.
   - Cruce espacial con el catastro y el polígono focal para determinar áreas críticas de invasión de ronda en hectáreas.
4. **Automatización Reproducible:**
   - Modelo funcional ejecutable en el **Diseñador Gráfico de Modelos de QGIS (`.model3`)** y en **ModelBuilder de ArcGIS Pro (`.atbx`)** con parámetros dinámicos expuestos (`P`).

---

## 2. Protocolo de Auditoría y Control de Calidad Espacial (QA/QC)

Antes de empaquetar la entrega final, cada estudiante debe verificar rigurosamente esta lista de aseguramiento técnico:

### 2.1 Rigor Geodésico (`EPSG:9377`)
- [ ] **Todas** las capas vectoriales y matriciales están proyectadas en **MAGNA-SIRGAS / Origen-Nacional (`EPSG:9377`)**.
- [ ] No existen capas en coordenadas geográficas (`EPSG:4326`) mezcladas con capas métricas.
- [ ] Tanto el proyecto QGIS (`.qgz`) como el proyecto ArcGIS Pro (`.aprx`) declaran `EPSG:9377` en su vista activa.

### 2.2 Integridad de Contenedores y Rutas Relativas
- [ ] Las capas vectoriales residen ordenadas en el **GeoPackage individual (`codigo_UXX.gpkg`)** y en la **File Geodatabase (`codigo_UXX.gdb`)** dentro de un Feature Dataset.
- [ ] La geodatabase incluye al menos un dominio codificado de atributos activo (*Coded Value Domain*).
- [ ] Los proyectos están guardados con **rutas relativas activadas**. No existen vínculos a carpetas personales temporales (`C:\Users\...`, `Descargas` o memorias USB desvinculadas).
- [ ] Se probó descomprimir el paquete comprimido en un directorio externo de prueba y los proyectos abren con **cero advertencias de capas perdidas**.

### 2.3 Coherencia Geométrica y Atributos
- [ ] Cero errores topológicos de solapes o huecos residuales en el polígono focal.
- [ ] Todas las geometrías de conflicto e intervención tienen el campo de área calculado en hectáreas (`area_ha`).
- [ ] Los índices espectrales tienen rangos numéricos acotados dentro del intervalo físico $[-1.0, +1.0]$.
- [ ] La poligonización ráster no contiene el polígono exterior de fondo (`DN = 0`).

---

## 3. Maquetación del Dossier Infográfico A3 de 2 Páginas

El producto cartográfico principal del Hito 5 es un **Dossier Infográfico en formato A3 Horizontal (2 páginas continuas en un solo archivo PDF a 300 ppp)**.

### Página 1: Diagnóstico Territorial Multicriterio Integrado
- **Cuerpo cartográfico principal:** Vista del territorio en `EPSG:9377` con cuadrícula métrica oficial visible (intervalo cada $500\text{ m}$ o $1\,000\text{ m}$ según la escala).
- **Elementos normativos:** Barra de escala gráfica métrica, norte geográfico oficial, título técnico completo (*"Unidad Territorial UXX — Quebrada YYY: Diagnóstico Territorial Integrado, 2027"*), autor y código, fecha y fuentes oficiales (AMVA, IGAC, ESA Copernicus).
- **Cartografía temática integrada:** Relieve sombreado 3D (*Hillshade*) fusionado con el mapa de pendientes, faja de retiro $R = 30 + D\text{ m}$ y polígonos de presión urbana impermeabilizada.
- **Gráficas y métricas cuantitativas:**
  - Gráfica del perfil longitudinal del cauce (distancia acumulada vs. cota msnm).
  - Histograma altimétrico o tabla resumen de áreas en hectáreas y porcentaje de suelo en amenaza alta ($>30^\circ$), faja de retiro y presión urbana.

### Página 2: Propuesta Técnica de Intervención Diferenciada
La segunda página plasma la solución técnica formulada por el estudiante según su perfil profesional:

- **Ruta A — Ingeniería Civil:**
  - Zonificación de estabilidad y laderas críticas aptas para bioingeniería o muros de contención.
  - Localización georreferenciada de obras hidráulicas: azudes disipadores de energía, presas de laminación o canalizaciones abiertas sostenibles.
  - Identificación de cruces viales y obras de drenaje transversal (alcantarillas, pontones) con riesgo de colapso por avenidas torrenciales.
  - Tabla de dimensionamiento y presupuesto preliminar por tramo.
- **Ruta B — Diseño Urbano y Gestión del Hábitat:**
  - Delimitación del Parque Lineal Ribereño y faja de amortiguamiento ambiental permeable.
  - Conectividad ecológica y corredores peatonales que articulan la ladera alta con el valle.
  - Identificación de asentamientos informales localizados en zona de alto riesgo no mitigable con propuesta de reasentamiento o mitigación in situ.
  - Plan de espacio público ribereño y tratamiento paisajístico de bordes.

---

## 4. Guion y Dinámica del Pitch Ejecutivo Relámpago (`4 min + 3 min`)

Durante la sesión S16 (13 de mayo), cada estudiante defenderá su proyecto de forma individual ante el profesor y sus compañeros:

```text
┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐
│   Pitch Ejecutivo Proyectado         │  │   Estación en Vivo y Preguntas       │
│   4 Minutos Cronometrados            │  │   3 Minutos Técnicos                 │
│   (Apoyado en el Dossier A3)         │  │   (Operación interactiva de SIG)     │
└──────────────────────────────────────┘  └──────────────────────────────────────┘
```

### 4.1 Estructura del Pitch (4 Minutos)
1. **Minuto 1 — Localización y Conflicto:** Identificación de la microcuenca, parámetros asignados ($R$ y $U_{\text{NDVI}}$) y síntesis del diagnóstico físico (pendientes críticas y desprotección vegetal).
2. **Minuto 2 — Cuantificación Espacial:** Presentación de las cifras clave: hectáreas de ladera inestable, predios afectados en la ronda hídrica y porcentaje de impermeabilización.
3. **Minuto 3 — Propuesta Técnica (Civil o Diseño Urbano):** Sustentación de las intervenciones propuestas georreferenciadas y su impacto en la resiliencia territorial.
4. **Minuto 4 — Automatización y Conclusiones:** Explicación breve de la lógica del modelo automatizado (`.atbx` o `.model3`) y lección aprendida del ejercicio.

### 4.2 Dinámica de la Estación en Vivo (3 Minutos)
El profesor solicitará al estudiante una verificación directa en pantalla sobre sus archivos:
- Encender/apagar una capa en QGIS o ArcGIS Pro para comprobar la simbología y la ausencia de rutas rotas.
- Ejecutar el modelo automatizado cambiando la distancia de retiro a un nuevo valor de prueba para verificar la dinamismo del grafo.
- Abrir la tabla de atributos y demostrar que las áreas fueron calculadas con fórmulas geodésicas en metros y hectáreas.

---

## 5. Estructura Oficial del Paquete de Entrega (`H5_Codigo_Apellido.zip`)

El paquete comprimido final debe entregarse antes del cierre de la sesión S16 con la siguiente arquitectura limpia:

```text
H5_Codigo_Apellido/
├── 1_bases_espaciales/
│   ├── UXX_proyecto.gpkg            # Capas vectoriales homologadas en EPSG:9377
│   └── UXX_proyecto.gdb/            # File Geodatabase con Feature Dataset y Dominios
├── 2_proyectos/
│   ├── proyecto_qgis.qgz             # Proyecto QGIS con rutas relativas
│   └── proyecto_arcgis.aprx          # Proyecto ArcGIS Pro configurado
├── 3_automatizacion/
│   ├── modelo_UXX.model3            # Modelo gráfico de QGIS
│   └── modelo_UXX.atbx              # Caja de herramientas ModelBuilder
├── 4_raster/
│   ├── dem_UXX_9377.tif             # DEM recortado
│   ├── pendiente_UXX_9377.tif       # Pendientes en grados
│   ├── hillshade_UXX_9377.tif       # Sombreado analítico
│   ├── ndvi_UXX_9377.tif            # Índice NDVI
│   └── ndbi_UXX_9377.tif            # Índice NDBI
└── 5_dossier/
    └── Dossier_A3_2Paginas_Codigo_Apellido.pdf   # 2 páginas en PDF horizontal (300 dpi)
```

---

## 6. Checklist de Cierre y Radicación Definitiva (S16)

- [ ] Se ejecutó el protocolo QA/QC en `EPSG:9377` comprobando cero enlaces rotos.
- [ ] Se maquetó y exportó el Dossier A3 de 2 páginas en un único PDF a 300 ppp.
- [ ] Se ensayó el Pitch Ejecutivo cumpliendo el tiempo estricto de 4 minutos.
- [ ] Se verificó que el modelo (`.atbx` y/o `.model3`) se ejecuta sin errores en vivo.
- [ ] Se radicó el archivo `H5_Codigo_Apellido.zip` y se realizó la defensa individual ante el auditorio.
