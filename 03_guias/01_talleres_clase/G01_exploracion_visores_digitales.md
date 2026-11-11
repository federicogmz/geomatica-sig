# G01: Exploración de visores geográficos, entorno QGIS LTR / ArcGIS Pro y reconocimiento territorial

> **Semestre / Ciclo:** 2027-1  
> **Semana / Fecha:** Semana 1 (`S01`) · Jueves 21 de enero de 2027  
> **Horario oficial:** 12:00 m. – 4:30 p.m. (4.5 h presenciales en Sala de Cómputo EAFIT)  
> **Modalidad:** 100 % Individual  
> **Software en Sala:** QGIS LTR (OSGeo4W) + ArcGIS Pro (Licencia institucional Advanced)  
> **Cuenca Escuela de Demostración:** Cuenca de la Quebrada La Iguaná (Medellín, 46.25 km² — exclusiva para demostraciones docentes y GeoLab WebGIS; prohibida como asignación estudiantil)  
> **Área de Aplicación Individual:** Unidad Territorial Única asignada (`U01` a `U30` sobre el portafolio de 10 cuencas metropolitanas)  

---

## 1. Presupuesto de Tiempo Semanal (Dedicación Total: hasta 9.0 h)

| Bloque de Actividad | Franja Horaria / Duración | Entorno y Enfoque Pedagógico |
|---|:---:|---|
| **Sub-bloque 1: Fundamento y QGIS LTR** | `12:00 m. – 1:50 p.m.` (110 min) | Sala de Cómputo: Presentación del curso, cartografía en visores web y primer contacto con QGIS LTR sobre la Cuenca Escuela La Iguaná. |
| **Pausa Activa Pedagógica** | `1:50 p.m. – 2:10 p.m.` (20 min) | Descanso cognitivo y almuerzo ligero integrado. |
| **Sub-bloque 2: Espejo ArcGIS Pro y Unidad** | `2:10 p.m. – 4:25 p.m.` (135 min) | Sala de Cómputo: Montaje de proyecto en ArcGIS Pro, asignación de la unidad `U01`–`U30`, protocolo de almacenamiento local y transferencia. |
| **Protocolo de Cierre en Sala** | `4:25 p.m. – 4:30 p.m.` (5 min) | Empaquetado `C:\Temp\SIG_Usuario\ -> .zip`, copia a USB/Drive institucional y purga local. |
| **Trabajo Autónomo Independiente** | $\le 4.5\text{ h}$ semanales | PC Personal / Casa: Lectura de la Res. IGAC 471/2020 y exploración preliminar de la unidad asignada. |

---

## 2. Protocolo de Infraestructura y Almacenamiento en Sala EAFIT

> [!CAUTION]
> **Prohibición de edición directa en unidades de nube sincronizada:**
> Ejecutar proyectos de QGIS (`.qgz`) o ArcGIS Pro (`.aprx`) directamente sobre carpetas locales sincronizadas con OneDrive, Google Drive o Dropbox provoca bloqueos de escritura (`.lock`), colapso de bases SQLite (`.gpkg`) y rutas rotas.

1. **Directorio temporal de trabajo:** Al iniciar la sesión en el PC de la sala, abran el Explorador de Windows y creen la carpeta local:
   ```text
   C:\Temp\SIG_Usuario\
   ```
   *(Sustituyan `Usuario` por su nombre de usuario de red institucional).*
2. **Estructura interna de carpetas:**
   ```text
   C:\Temp\SIG_Usuario\
   ├── 01_documentos/
   ├── 02_datos_vectoriales/
   ├── 03_datos_raster/
   ├── 04_proyectos/
   └── 05_salidas_graficas/
   ```
3. Toda la práctica de hoy se guardará en esa raíz. Al finalizar la clase (4:25 p.m.), comprimirán esta carpeta en un único archivo ZIP para transferirla a su almacenamiento externo.

---

## 3. Secuencia Didáctica: Worked-Example Fading

```
[Etapa 1: Ejemplo Resuelto] ──> [Etapa 2: Completación] ──> [Etapa 3: Caso Roto] ──> [Etapa 4: Transferencia U01-U30]
 (Medición y Por qué WebMerc)   (Visores Oficiales IGAC)    (Diagnóstico Error Escala) (Espejo Pro + Unidad Propia)
```

### Etapa 1: Ejemplo Trabajado con "Por Qué" (12:00 m. – 12:45 p.m.)

#### Contexto Físico
Los visores geográficos en línea utilizan predominantemente la proyección **WGS 84 / Pseudo-Mercator (`EPSG:3857`)**, una proyección cilíndrica conforme que conserva formas locales pero distorsiona severamente las áreas y distancias a medida que se aleja del Ecuador.

#### Paso a paso demostrado por el profesor en La Iguaná:
1. Abran simultáneamente en dos pestañas del navegador:
   - [Google Maps](https://maps.google.com)
   - [OpenStreetMap](https://www.openstreetmap.org)
2. **Paso Técnico 1:** Localicen la desembocadura de la Quebrada La Iguaná en el Río Medellín (coordenadas aproximadas: $6.2570^\circ\text{ N}, -75.5710^\circ\text{ W}$).
   - *Por qué geoespacial:* La desembocadura es el punto de cota mínima de la cuenca (~1.450 msnm), donde las aguas se integran a la red fluvial metropolitana.
3. **Paso Técnico 2:** Utilicen la herramienta de medición de Google Maps (clic derecho $\rightarrow$ *Medir distancia*) y tracen una línea recta hasta el puente de la Carrera 70 (Presa de laminación de crecientes).
   - Distancia medida en pantalla: $\approx 2\,150\text{ m}$.
   - *Alerta de error frecuente:* En `EPSG:3857`, el factor de escala en el paralelo de Medellín ($6.25^\circ\text{ N}$) introduce una leve distorsión planar ($k = 1 / \cos(\varphi) \approx 1.006$): una distancia medida sobre un plano Mercator web no corregido difiere de una medición geodésica sobre el elipsoide o sobre una proyección conforme local como CTM12 (`EPSG:9377`).

> [!NOTE]
> **Prompt de Auto-Explicación Obligatorio 1:**
> *¿Por qué un ingeniero civil o un diseñador urbano no debe utilizar las distancias medidas directamente sobre capturas de pantalla de Google Maps para cuantificar el presupuesto de una canalización hidráulica o el ancho de una faja de retiro predial?*

---

### Etapa 2: Ejemplo de Completación — Fading del Último Paso (12:45 p.m. – 1:20 p.m.)

Se suministran las fuentes oficiales del Estado colombiano y del Distrito de Medellín. El estudiante completa la extracción de parámetros normativos:

1. Ingresen al portal oficial [Colombia en Mapas](https://www.colombiaenmapas.gov.co/) del IGAC.
2. Busquen el municipio de Medellín y activen la capa de **Cartografía Básica Oficial**.
3. **Pasos dados:**
   - La plataforma declara explícitamente el sistema de coordenadas oficial: **MAGNA-SIRGAS / Origen Nacional CTM12 (`EPSG:9377`)**.
   - Los drenajes y curvas de nivel están georreferenciados bajo estándares normativos del IGAC (Res. 471 de 2020).
4. **Paso a completar por el estudiante:**
   - Ubiquen en el visor el nacimiento de la Quebrada La Iguaná en el **Alto de Boquerón** (Corregimiento de San Cristóbal).
   - Identifiquen en el visor la cota altimétrica aproximada de la curva de nivel más alta del nacimiento:
     - Cota registrada: `___________ msnm`.
   - Contrasten esa cota con la desembocadura (~1.450 msnm) y calculen el desnivel topográfico bruto de la Cuenca Escuela:
     $$\Delta H = H_{\text{nacimiento}} - H_{\text{desembocadura}} = \text{___________ metros}$$

---

### Etapa 3: Diagnóstico y Reparación de Caso Roto de Consultoría (1:20 p.m. – 1:50 p.m.)

#### Caso Roto:
Un analista junior de una consultora ambiental presentó un plano de diagnóstico para la faja de retiro de una quebrada en Medellín. Para calcular el área de afectación de 25 predios, tomó una captura de pantalla de Google Satellite, midió un polígono de 4.0 cm de ancho por 6.0 cm de largo en un documento PDF exportado a escala no calibrada, y multiplicó las dimensiones asumiendo que la escala gráfica del visor web era constante en toda la pantalla. Al contrastar con el levantamiento topográfico de campo, el área reportada tenía un error del $34\text{ \%}$.

```
+-----------------------------------------------------------------------------------+
| FLUJO DEFECTUOSO DEL CONSULTOR JUNIOR:                                            |
| Captura web EPSG:3857 -> Pegado en Word -> Medición con regla en PDF              |
| -> Conversión con escala lineal simple -> Cálculo de área predial                 |
| ¡RESULTADO INVÁLIDO: Distorsión de escala web + deformación de pantalla + elipse! |
+-----------------------------------------------------------------------------------+
```

#### Andamiaje de Análisis del Error (Responde en tu libreta técnica):
1. **Detectar:** ¿Qué pasos metodológicos del consultor violan los principios de la cartografía métrica y qué causó la discrepancia del 34 %?
2. **Explicar:** ¿Por qué la escala gráfica de un visor web cambia al desplazarse en latitud y por qué medir con regla sobre un visor digital sin calibrar la resolución DPI del monitor invalida cualquier cálculo?
3. **Corregir:** Redacta el procedimiento técnico estandarizado que debió seguir el consultor utilizando QGIS LTR o ArcGIS Pro bajo el sistema oficial `EPSG:9377`.

---

*(1:50 p.m. – 2:10 p.m. · Pausa Activa Pedagógica / Almuerzo Ligero)*

---

### Etapa 4: Espejo Corporativo en ArcGIS Pro y Transferencia a su Unidad Territorial (2:10 p.m. – 4:25 p.m.)

En este sub-bloque iniciamos el contacto dual con **ArcGIS Pro** y recibes tu asignación individual para todo el semestre.

#### A. Espejo Corporativo en ArcGIS Pro:
1. En el PC de la sala, inicien **ArcGIS Pro**.
2. Creen un nuevo proyecto de mapa (*Map*) seleccionando como destino la ruta local:
   ```text
   C:\Temp\SIG_Usuario\04_proyectos\
   ```
   Nombre del proyecto: `SIG_2027_1_S01.aprx`.
3. Reconozcan los paneles fundamentales:
   - **Catalog Pane:** Árbol de carpetas, bases de datos geográficas (`.gdb`), cajas de herramientas (`.atbx`) y conexiones de servidor.
   - **Contents Pane:** Jerarquía de capas cargadas y orden de visualización.
   - **Map View:** Lienzo de navegación cartográfica.
   - **Geoprocessing Pane:** Biblioteca de herramientas analíticas.
4. En el menú superior, vayan a **Map $\rightarrow$ Basemap** y alternen entre *Topographic* e *Imagery*.
5. Naveguen hasta el Valle de Aburrá y observen cómo ArcGIS Pro reproyecta dinámicamente las capas base al sistema de coordenadas de la vista.

#### B. Asignación de la Unidad Territorial Única (`U01` a `U30`):
Cada estudiante del curso trabajará de forma **100 % individual** sobre una de las 30 Unidades Territoriales metropolitanas asignadas por el docente según la lista oficial:

| ID Cuenca | Quebrada Principal | Tramo Funcional Asignado | Código de Unidad |
|:---:|---|:---:|:---:|
| **Q01** | La Ayurá (Envigado) | Alto-Ladera / Medio-Transición / Bajo-Confluencia | `U01` / `U02` / `U03` |
| **Q02** | La Presidenta (Medellín - El Poblado) | Alto-Ladera / Medio-Transición / Bajo-Confluencia | `U04` / `U05` / `U06` |
| **Q03** | Santa Elena (Medellín - Centro Oriente) | Alto-Ladera / Medio-Transición / Bajo-Confluencia | `U07` / `U08` / `U09` |
| **Q04** | Altavista - La Picacha (Belén) | Alto-Ladera / Medio-Transición / Bajo-Confluencia | `U10` / `U11` / `U12` |
| **Q05** | Doña María (Itagüí / San Antonio de Prado) | Alto-Ladera / Medio-Transición / Bajo-Confluencia | `U13` / `U14` / `U15` |
| **Q06** | La Doctora (Sabaneta) | Alto-Ladera / Medio-Transición / Bajo-Confluencia | `U16` / `U17` / `U18` |
| **Q07** | La Hueso - Ana Díaz (San Javier / La América) | Alto-Ladera / Medio-Transición / Bajo-Confluencia | `U19` / `U20` / `U21` |
| **Q08** | La García (Bello) | Alto-Ladera / Medio-Transición / Bajo-Confluencia | `U22` / `U23` / `U24` |
| **Q09** | La Madera (Medellín Noroccidente / Bello) | Alto-Ladera / Medio-Transición / Bajo-Confluencia | `U25` / `U26` / `U27` |
| **Q10** | La Aguacatala (Medellín - Suroriente) | Alto-Ladera / Medio-Transición / Bajo-Confluencia | `U28` / `U29` / `U30` |

> [!IMPORTANT]
> **Parámetro Individual $D$:**
> Registren el último dígito de su documento de identidad ($D \in \{0, 1, \dots, 9\}$). Este número gobernará sus parámetros de análisis durante todo el semestre (p. ej. en la Semana 7: Faja de retiro $R = 30 + D\text{ m}$; en teledetección: umbral $U_{\text{NDVI}} = 0.20 + 0.01 \cdot D$).

#### C. Transferencia Autónoma a su Unidad Territorial:
1. En ArcGIS Pro (o en QGIS LTR), creen un marcador espacial (*Bookmark*) centrado exactamente sobre el tramo de la quebrada correspondiente a su unidad `Uxx`.
2. Identifiquen y anoten en su bitácora técnica:
   - Nombre oficial de la quebrada y comuna(s) o municipio(s) que atraviesa.
   - Cota máxima y cota mínima visible en la cartografía base para su tramo.
   - Dos hitos urbanos o infraestructuras críticas (puentes, colegios, industrias) expuestos a la faja del cauce.

---

## 4. Protocolo Obligatorio de Cierre en Sala (4:25 p.m. – 4:30 p.m. · 5 min)

1. Cierren QGIS LTR y ArcGIS Pro guardando cambios en los respectivos proyectos.
2. Vayan al Explorador de Windows a `C:\Temp\`.
3. Hagan clic derecho sobre `SIG_Usuario` $\rightarrow$ **Comprimir en archivo ZIP**.
4. Nombren el archivo comprimido siguiendo el estándar institucional:
   ```text
   SIG_Uxx_Apellido_Nombre_S01.zip
   ```
5. Copien el archivo ZIP a su memoria USB personal y súbanlo a su carpeta personal de OneDrive EAFIT como respaldo.
6. **Eliminen la carpeta local `C:\Temp\SIG_Usuario\`** para proteger sus datos y liberar espacio en la sala.

---

## 5. Checklist de Verificación y Entrega

- [ ] Reconocí la diferencia entre proyecciones web cilíndricas (`EPSG:3857`) y el sistema oficial colombiano (`EPSG:9377`).
- [ ] Completé la estimación altimétrica en el visor oficial de Colombia en Mapas.
- [ ] Resolví las 3 preguntas del Caso Roto de consultoría.
- [ ] Creé mi proyecto base en ArcGIS Pro (`.aprx`) y en QGIS LTR (`.qgz`).
- [ ] Registré mi código de unidad asignada (`U01` a `U30`) y mi parámetro individual $D$.
- [ ] Ejecuté el protocolo de cierre de 5 minutos comprimiendo a ZIP y limpiando `C:\Temp`.
