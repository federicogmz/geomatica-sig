# G03: Guía Técnica de Instalación y Configuración de QGIS LTR (Trabajo Independiente en Casa)

> **Semestre / Ciclo:** 2027-1  
> **Semana / Fecha:** Semana 3 (`S03`) · Jueves 04 de febrero de 2027 (o previo a la sesión)  
> **Ámbito de Aplicación:** Trabajo Autónomo e Independiente fuera del aula ($\le 4.5\text{ h}$ semanales)  
> **Audiencia:** Estudiantes de Ingeniería Civil y Diseño Urbano en computadores personales (Windows / macOS / Linux)  
> **Versión recomendada:** Serie **QGIS LTR** (Long Term Release / Soporte de Largo Plazo)  

---

## 1. El Ecosistema de Software del Curso: Salas EAFIT vs. Trabajo en Casa

Para evitar confusiones operativas y sobrecarga técnica, ten presente la distribución de herramientas del semestre:

1. **En las Salas de Cómputo de EAFIT:**
   - Todos los computadores cuentan con la suite completa preinstalada: **QGIS LTR** y **ArcGIS Pro** (con licencia institucional *Advanced* y extensión *Spatial Analyst* activa).
   - Durante las 4.5 horas presenciales de clase (Sub-bloques 1 y 2) trabajamos directamente sobre los equipos universitarios. No es obligatorio llevar laptop a la sala de cómputo.
2. **En Casa / Equipos Personales:**
   - Para las horas de trabajo independiente, consolidación de bitácoras y preparación de entregas cartográficas, utilizaremos **QGIS LTR**, un software libre, gratuito y multiplataforma que no requiere llaves de licencia corporativas ni conexión a VPN.
   - ArcGIS Pro puede consultarse fuera de clase mediante las salas de acceso abierto de EAFIT o escritorios virtuales institucionales cuando sea requerido para la fase avanzada de ModelBuilder.

---

## 2. ¿Qué versión de QGIS debo instalar?

Instala **exclusivamente la versión LTR (Long Term Release)**, identificada en el portal oficial con el sello de estabilidad de largo plazo:
- **No instales la versión "Latest Release" (la más reciente con novedades experimentales):** Suele incluir cambios en la API de complementos que provocan inestabilidad o fallos en plugins críticos como el *Comprobador de topología*.
- Al inicio de 2027, las versiones LTR de referencia para la academia corresponden a las series **QGIS 3.34 o 3.44 LTR**.
- Consulta siempre la página oficial de descargas: [qgis.org/download](https://qgis.org/download/).

---

## 3. Instalación Paso a Paso según tu Sistema Operativo

### A. Microsoft Windows (Windows 10 / 11 de 64 bits)

1. Ingresa a [qgis.org/download](https://qgis.org/download/).
2. En la sección de Windows, busca el enlace directo:
   ```text
   QGIS Standalone Installer Version 3.xx LTR (64-bit)
   ```
3. Ejecuta el archivo instalador `.msi` descargado.
4. Sigue el asistente con las opciones estándar por defecto (*Next $\rightarrow$ I Agree $\rightarrow$ Install*).
5. Al terminar la instalación, se creará una carpeta en el menú Inicio llamada `QGIS 3.xx`.
6. **Ícono a ejecutar:** Abre únicamente el acceso directo titulado **"QGIS Desktop 3.xx LTR"** (no abras las versiones que dicen *"con GRASS"* a menos que se indique explícitamente en una práctica de hidrología avanzada).

### B. Apple macOS (macOS Sonoma, Sequoia o superior)

1. Ingresa a [qgis.org/download](https://qgis.org/download/) en la pestaña **macOS**.
2. **Identificación de la arquitectura de tu procesador:**
   - Ve a la esquina superior izquierda de tu Mac $\rightarrow$ Menú Manzana $\rightarrow$ *Acerca de este Mac*.
   - Si tu equipo tiene procesador **Apple Silicon** (chips M1, M2, M3 o M4), descarga el instalador etiquetado como `Apple Silicon (arm64)`.
   - Si tu equipo tiene procesador **Intel Core**, descarga la versión `Intel (x86_64)`.
3. Abre el archivo `.dmg` descargado y arrastra el ícono de QGIS hacia la carpeta **Aplicaciones**.
4. **Permiso de seguridad (Gatekeeper de macOS):**
   - La primera vez que abras QGIS, macOS podría mostrar una advertencia: *"QGIS no se puede abrir porque proviene de un desarrollador no identificado"*.
   - Ve a **Ajustes del Sistema $\rightarrow$ Privacidad y Seguridad**.
   - Desplázate hacia abajo hasta la sección *Seguridad* y haz clic en el botón **"Abrir de todos modos"** (*Open Anyway*).
   - Confirma con tu contraseña o Touch ID. A partir de ese momento, QGIS abrirá con normalidad.

### C. Linux (Ubuntu / Debian / Fedora)

Sigue los repositorios estables de OSGeo indicados en [qgis.org/download](https://qgis.org/download/). Para distribuciones basadas en Ubuntu/Debian:
```bash
sudo apt update
sudo apt install qgis qgis-plugin-grass
```

---

## 4. Configuración Geodésica Inicial para Colombia (EPSG:9377)

Una vez instalado QGIS, ajusta estos parámetros para evitar errores de coordenadas durante el semestre:

1. Abre QGIS Desktop.
2. Ve al menú superior **Configuración $\rightarrow$ Opciones...** (en Mac: *QGIS $\rightarrow$ Preferencias...*).
3. Selecciona la pestaña **SRC (Sistema de Referencia de Coordenadas)**:
   - En *SRC para nuevos proyectos*, marca: **Usar el SRC predeterminado**.
   - Haz clic en el ícono de selección de CRS, filtra por el código `9377` y selecciona:
     ```text
     MAGNA-SIRGAS 2018 / Origen-Nacional (EPSG:9377)
     ```
   - En *Comportamiento cuando se cargan capas sin SRC*, selecciona: **Preguntar por el SRC** (nunca dejar en asignación automática ciega).
4. Selecciona la pestaña **General**:
   - En *Guardar rutas*, asegúrate de que esté configurado en **Relativas** (esto previene la pérdida de capas cuando traslades proyectos entre tu laptop y la USB).
5. Haz clic en **Aceptar**.

---

## 5. Verificación de Complementos y Herramientas Esenciales

Comprueba que las herramientas analíticas del curso estén disponibles:

1. **Comprobador de Topología:**
   - Ve a **Complementos $\rightarrow$ Administrar e instalar complementos...**
   - En la pestaña *Instalados*, verifica que la casilla junto a **Comprobador de topología (Topology Checker)** esté activada.
2. **Georreferenciador:**
   - Ve al menú **Capa $\rightarrow$ Georreferenciador...** (o *Ráster $\rightarrow$ Georreferenciador*). Confirma que la ventana abra correctamente.
3. **Complementos recomendados para instalar desde el repositorio:**
   - En la pestaña *Todos*, busca e instala:
     - `QuickOSM`: Permite descargar geometrías abiertas de OpenStreetMap en segundos.
     - `Lat Lon Tools`: Facilita la captura y conversión rápida de coordenadas.

---

## 6. Checklist de Verificación en Casa

- [ ] QGIS LTR abre sin advertencias ni bloqueos en mi computador personal.
- [ ] La versión reportada en *Ayuda $\rightarrow$ Acerca de* corresponde a una serie LTR estable (3.34 o 3.44).
- [ ] El SRC predeterminado de nuevos proyectos quedó fijado en `EPSG:9377`.
- [ ] El *Comprobador de topología* y el *Georreferenciador* están visibles en los menús.
- [ ] Cuento con una memoria USB (mínimo 16 GB) para transportar mis archivos comprimidos desde y hacia las salas de EAFIT.
