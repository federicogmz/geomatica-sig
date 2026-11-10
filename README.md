# Geomática, Ingeniería y SIG (EAFIT) 🌍
> **Semestre / Hito:** **2026-1 (Estado de cierre ejecutado)**  
> **Pregrados:** Ingeniería Civil · Diseño Urbano y Gestión del Territorio  
> **Carga Académica:** **3 Créditos Académicos · 5 UMEs** (`4.5 h/sem` presenciales $[72\text{ h}]$ + `4.5 h/sem` trabajo independiente $[72\text{ h}]$ = `144 h totales`)  
> **Proyecto Territorial Central:** Cuenca de la Quebrada La Iguaná (Medellín, Colombia · 46.25 km²)  
> **Marco de Referencia Oficial:** MAGNA-SIRGAS Origen Nacional CTM12 (`EPSG:9377`)
> **Stack Práctico Ejecutado (`2026-1`):** 100 % en **QGIS LTR** (`EPSG:9377`, `.gpkg`, Geoservicios OGC, Sentinel-2 y Modelador Gráfico `.model3`) · **ArcGIS Pro** como sesión demostrativa/conceptual en Semana 15.

---

## 🌟 GeoLab Iguaná: Plataforma WebGIS Autónoma y Didáctica

Dentro de este repositorio se encuentra **GeoLab Iguaná**, una aplicación web interactiva concebida como un curso didáctico autónomo y un software SIG ligero en el navegador para que los estudiantes complementen el trabajo de clase sin sentirse abrumados por la complejidad inicial de interfaces como QGIS o ArcGIS Pro.

### 🚀 Características Principales:
1. **Desbloqueo Progresivo de Herramientas (*Progressive Disclosure*):**
   - La interfaz inicia limpia y minimalista (Nivel 1: solo navegación, medición y lectura de coordenadas CTM12).
   - A medida que el estudiante avanza en las lecturas y resuelve los retos prácticos, se desbloquean nuevas herramientas: *Árbol de Capas y Simbología*, *Digitalización con Snapping a 15 px*, *Comprobador de Topología*, *Caja de Geoprocesamiento (Buffer 30 m, Intersect, Clip)*, *Perfil de Relieve (2.950 a 1.450 msnm)*, *Auditoría GNSS con cálculo de RMSE* y *Compositor de Láminas A3*.
2. **Autocalificación en Tiempo Real (0.0 a 5.0):**
   - Los ejercicios espaciales y numéricos son evaluados directamente en el navegador por los motores geométricos (`Turf.js` y `Proj4js`) con retroalimentación inmediata, micro-sonidos táctiles y animación de celebración (*confetti*).
3. **Acta Oficial de Calificación y Entrega Digital:**
   - Emite un acta formal con código criptográfico **SHA-256**, fecha y desglose de notas, exportable en **PDF institucional** o en **JSON** para someter directamente en el equipo de Microsoft Teams del curso.
4. **100% en Cliente y Despliegue en GitHub Pages:**
   - No requiere servidores de bases de datos ni backend de pago. Funciona como una Single Page Application estática lista para publicarse en la web mediante GitHub Pages.

---

## 🛠️ Cómo Ejecutar Localmente

### Requisitos:
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- `npm`

### Pasos:
```bash
# 1. Ingresar a la carpeta de la webapp
cd webapp

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abre en tu navegador la dirección indicada (por defecto `http://localhost:5173/`).

Para compilar la versión estática final de producción:
```bash
npm run build
```
Los archivos optimizados quedarán generados en `webapp/dist/`.

---

## 🚀 Despliegue en GitHub y Activación de GitHub Pages

Este repositorio ya incluye el archivo de automatización [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), el cual compila la aplicación y la publica en GitHub Pages en cada actualización de la rama `main`.

### Pasos para publicar por primera vez:

```bash
# 1. Inicializar git si aún no está inicializado
git init

# 2. Añadir todos los archivos del curso y la webapp
git add .

# 3. Crear el primer commit
git commit -m "feat: GeoLab Iguaná WebGIS y contenidos del curso"

# 4. Vincular con el repositorio oficial en GitHub
git remote add origin https://github.com/federicogmz/geomatica-sig.git

# 5. Renombrar la rama a main y subir los cambios
git branch -M main
git push -u origin main
```

### Configuración en GitHub:
1. En GitHub, ve a **Settings** de tu repositorio (`federicogmz/geomatica-sig`).
2. En la barra lateral izquierda, entra a **Pages**.
3. En la sección **Build and deployment → Source**, selecciona **GitHub Actions**.
4. ¡Listo! En un par de minutos tu aplicación estará en vivo en:
   `https://federicogmz.github.io/geomatica-sig/`

---

## 📁 Estructura del Repositorio

- `01_programa/`:
  - [`SILABO.md`](01_programa/SILABO.md): Sílabo institucional del curso (3 Créditos · 5 UMEs · 16 semanas).
  - [`PROGRAMA_DOCENTE.md`](01_programa/PROGRAMA_DOCENTE.md): Programa docente detallado sesión por sesión y secuencia metodológica ejecutada.
  - [`PACTO_PEDAGOGICO.md`](01_programa/PACTO_PEDAGOGICO.md): Pacto pedagógico, sistema de evaluación (8 actividades oficiales + taller opcional de reemplazo) y normas de entrega.
- `02_clases/`: Diapositivas interactivas en HTML, presentaciones teóricas de cada semana (`S01`–`S16`) y sus capas de práctica (`capas_practica/`).
- `03_guias/`: Guías de talleres de laboratorio (`01_talleres_clase`), talleres de repaso (`02_talleres_repaso`) e instructivos oficiales de evaluación (`03_evaluaciones`), cada uno acompañado directamente por su respectivo paquete de datos (`insumos_*` / `mapas_ejercicio/`).
- `.github/workflows/deploy.yml`: Flujo de CI/CD para compilar y desplegar la webapp en GitHub Pages.
- `webapp/`: Código fuente de la plataforma WebGIS interactiva (Vite, Leaflet, Turf.js, Proj4js, jsPDF).

---

## 👨‍🏫 Autor y Créditos
- **Docente:** Federico Gómez  
- **Institución:** Universidad EAFIT · Escuela de Ciencias Aplicadas e Ingeniería  
- **Medellín, Colombia · 2026**
