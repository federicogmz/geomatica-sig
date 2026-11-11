# G02: Escalas, coordenadas métricas y lectura cartográfica aplicada

> **Semestre / Ciclo:** 2027-1  
> **Semana / Fecha:** Semana 2 (`S02`) · Jueves 28 de enero de 2027  
> **Horario oficial:** 12:00 m. – 4:30 p.m. (4.5 h presenciales en Sala de Cómputo EAFIT)  
> **Modalidad:** 100 % Individual  
> **Software en Sala:** QGIS LTR + ArcGIS Pro (Licencia institucional Advanced)  
> **Cuenca Escuela de Demostración:** Cuenca de la Quebrada La Iguaná (Medellín, 46.25 km² — exclusiva para modelado docente)  
> **Área de Aplicación Individual:** Unidad Territorial Única (`U01` a `U30`)  
> **Mapas de Ejercicio y Calibración:** Cartografía digital en formato PDF en [mapas_ejercicio/](mapas_ejercicio/)  

---

## 1. Presupuesto de Tiempo Semanal (Dedicación Total: hasta 9.0 h)

| Bloque de Actividad | Franja Horaria / Duración | Entorno y Enfoque Pedagógico |
|---|:---:|---|
| **Sub-bloque 1: Fundamento y QGIS LTR** | `12:00 m. – 1:50 p.m.` (110 min) | Sala de Cómputo: Escalas lineales ($1:N$) y de superficie ($1:N^2$), conversión GMS a decimales y aproximación métrica CTM12 en QGIS LTR sobre La Iguaná. |
| **Pausa Activa Pedagógica** | `1:50 p.m. – 2:10 p.m.` (20 min) | Descanso cognitivo y almuerzo ligero integrado. |
| **Sub-bloque 2: Espejo ArcGIS Pro y Unidad** | `2:10 p.m. – 4:25 p.m.` (135 min) | Sala de Cómputo: Medición planar vs. geodésica en ArcGIS Pro (`.aprx`), calibración de planos en [mapas_ejercicio/](mapas_ejercicio/) y aplicación en la unidad `U01`–`U30`. |
| **Protocolo de Cierre en Sala** | `4:25 p.m. – 4:30 p.m.` (5 min) | Empaquetado `C:\Temp\SIG_Usuario\ -> .zip`, copia a USB/Drive institucional y purga local. |
| **Trabajo Autónomo Independiente** | $\le 4.5\text{ h}$ semanales | PC Personal / Casa: Verificación manual de órdenes de magnitud métricas y resolución del taller de preparación para el Hito 1. |

---

## 2. Protocolo de Calibración de Medición Digital

Para realizar mediciones digitales exactas sobre planos cartográficos en PDF o en el visor de mapa sin sufrir distorsiones por el escalado de pantalla:
1. **Calibración del Visor de PDF:** Al abrir cualquier plano de la carpeta [mapas_ejercicio/](mapas_ejercicio/) (p. ej. `mapas_ejercicio/G01_mapa_A_atanasio_girardot.pdf`), configuren el zoom obligatoriamente al **100 % ("Tamaño real")** o utilicen la **Herramienta de Medición** (*Herramientas $\rightarrow$ Medir* en Adobe Acrobat) configurada en milímetros.
2. **Prioridad de la Escala Gráfica:** La escala gráfica es invariante frente a deformaciones por fotocopiado o zoom digital, ya que la barra se amplía o reduce en la misma proporción que el dibujo del terreno.

---

## 3. Secuencia Didáctica: Worked-Example Fading

```
[Etapa 1: Ejemplo Resuelto] ──> [Etapa 2: Completación] ──> [Etapa 3: Caso Roto] ──> [Etapa 4: Transferencia U01-U30]
 (Escalas 1:N y 1:N^2)           (Cálculo CTM12 Manual)      (Error Unidades/Escalas)    (Espejo Pro + Unidad Propia)
```

### Etapa 1: Ejemplo Trabajado con "Por Qué" (12:00 m. – 12:50 p.m.)

#### Fundamento Matemático:
- **Escala lineal ($1 : N$):** Relación adimensional entre la distancia medida en el mapa ($d$) y la distancia real en el terreno ($D$):
  $$\text{Escala} = \frac{d}{D} = \frac{1}{N} \implies D = d \times N$$
- **Escala de superficie ($1 : N^2$):** La relación de áreas varía con el cuadrado del factor de escala:
  $$\frac{a}{A} = \left(\frac{1}{N}\right)^2 = \frac{1}{N^2} \implies A = a \times N^2$$
  *(Donde $a$ es el área en el plano y $A$ es el área real).*

#### Ejemplo Resuelto Demostrado por el Docente:
Un plano topográfico de una faja de contención en la Quebrada La Iguaná carece de rótulo de escala numérica visible. En el visor calibrado al 100 %, una cancha de fútbol reglamentaria ($D = 105.0\text{ m}$ de longitud real) mide $d = 2.10\text{ cm}$ en pantalla:

$$\text{Escala} = \frac{2.10\text{ cm}}{10\,500.0\text{ cm}} = \frac{1}{5\,000}$$
El plano se encuentra a escala **$1 : 5\,000$**.

Si sobre ese mismo plano una zona de inundación ocupa una figura rectangular de $3.0\text{ cm}$ de ancho por $4.5\text{ cm}$ de largo ($a = 13.5\text{ cm}^2$):
$$A = 13.5\text{ cm}^2 \times (5\,000)^2 = 13.5 \times 25\,000\,000\text{ cm}^2 = 337\,500\,000\text{ cm}^2 = 33\,750\text{ m}^2 = 3.375\text{ ha}$$

*Por qué geoespacial:* Al duplicar la escala lineal de un mapa (p. ej. pasar de 1:10.000 a 1:5.000), el nivel de detalle se cuadruplica ($2^2 = 4$). Desconocer la relación cuadrática de las áreas conduce a subestimaciones graves en compras de tierras y diseños estructurales.

> [!NOTE]
> **Prompt de Auto-Explicación Obligatorio 1:**
> *Si un plano a escala 1:2.000 se imprime por error al 50 % de su tamaño original, ¿cuál es la nueva escala resultante y por qué factor debe multiplicarse cualquier medición de área realizada directamente sobre la hoja impresa?*

---

### Etapa 2: Ejemplo de Completación — Fading del Último Paso (12:50 p.m. – 1:20 p.m.)

En Colombia, la **Resolución IGAC 471 de 2020** unificó los sistemas de proyección en el **Origen Nacional CTM12 (`EPSG:9377`)**:
- Latitud de origen ($\varphi_0$): $4^\circ\ 00'\ 00''\text{ N}$
- Meridiano central ($\lambda_0$): $73^\circ\ 00'\ 00''\text{ W}$ ($-73.0^\circ$)
- Factor de escala central ($k_0$): $0.9992$
- Falso Este ($X_0$): $5\,000\,000\text{ m}$
- Falso Norte ($Y_0$): $2\,000\,000\text{ m}$

#### Fórmulas de aproximación esférica métrica:
$$\text{Norte } (Y) \approx Y_0 + (\varphi - \varphi_0) \times 111\,320 \times k_0$$
$$\text{Este } (X) \approx X_0 + (\lambda - \lambda_0) \times 111\,320 \times \cos(\varphi) \times k_0$$
*(Donde $111\,320\text{ m}$ es la longitud métrica promedio de un grado de arco terrestre).*

#### Pasos dados para el Puente de la Cra. 70 sobre La Iguaná:
- Latitud ($\varphi$): $6^\circ\ 15'\ 45''\text{ N} = 6 + 15/60 + 45/3600 = 6.262500^\circ\text{ N}$
- Longitud ($\lambda$): $75^\circ\ 35'\ 20.4''\text{ W} = -(75 + 35/60 + 20.4/3600) = -75.589000^\circ\text{ W}$
- $\Delta \varphi = 6.262500 - 4.0 = 2.262500^\circ$
- $\text{Norte} \approx 2\,000\,000 + (2.262500 \times 111\,320 \times 0.9992) = 2\,251\,659.6\text{ m}$

#### Paso a completar por el estudiante:
Calcula analíticamente la coordenada Este aproximada en CTM12:
- $\Delta \lambda = -75.589000 - (-73.0) =$ `___________` grados
- $\cos(6.2625^\circ) =$ `___________`
- **Este ($X$) calculado:** `___________` metros
*(Verifica que el resultado oscile en el rango metropolitano esperado: $X \in [4\,710\,000, 4\,725\,000]\text{ m}$).*

---

### Etapa 3: Diagnóstico y Reparación de Caso Roto de Consultoría (1:20 p.m. – 1:50 p.m.)

#### El Caso Roto de Consultoría:
Un equipo consultor fue contratado para calcular el volumen de excavación y presupuesto de revegetalización en una ladera del Valle de Aburrá. El analista midió en un plano PDF a escala $1:2\,500$ un polígono de intervención que en pantalla tenía $80\text{ cm}^2$. Para convertir a metros cuadrados, multiplicó:
$$\text{Área calculada por el analista} = 80\text{ cm}^2 \times 2\,500 = 200\,000\text{ cm}^2 = 20\text{ m}^2$$
Con base en ese cálculo, estimó que solo se requerían $20\text{ m}^2$ de biomanto, solicitando un presupuesto de \$600.000 COP. Cuando el contratista llegó al terreno, descubrió que la ladera medía en realidad **5 hectáreas** ($50\,000\text{ m}^2$), paralizando la obra civil con un déficit presupuestal crítico.

```
+--------------------------------------------------------------------------------+
| ERROR CATASTRÓFICO DEL ANALISTA:                                               |
| Confundió factor de escala lineal N con factor de escala de área N^2:          |
| 80 cm² × 2.500 = 200.000 cm² (¡INCORRECTO!)                                    |
| Debería ser: 80 cm² × (2.500)² = 80 × 6.250.000 cm² = 50.000 m² (5.0 ha)       |
| ¡El presupuesto real era 2.500 veces mayor!                                    |
+--------------------------------------------------------------------------------+
```

#### Andamiaje de Análisis del Error (Responde en tu libreta técnica):
1. **Detectar:** ¿En qué paso exacto se cometió la falla conceptual y por qué factor quedó subdimensionada la obra?
2. **Explicar:** ¿Cuál es la demostración matemática rigurosa que justifica que la escala de superficie es $1:N^2$?
3. **Corregir:** Plantea la formulación correcta y escribe el procedimiento técnico que garantice que en QGIS LTR o ArcGIS Pro el cálculo de áreas se realice directamente sobre geometrías vectoriales proyectadas en `EPSG:9377`.

---

*(1:50 p.m. – 2:10 p.m. · Pausa Activa Pedagógica / Almuerzo Ligero)*

---

### Etapa 4: Espejo Corporativo en ArcGIS Pro y Transferencia a su Unidad Territorial (2:10 p.m. – 4:25 p.m.)

#### A. Medición Geodésica vs. Planar en ArcGIS Pro:
1. Abran su proyecto de ArcGIS Pro `SIG_2027_1_S01.aprx` en `C:\Temp\SIG_Usuario\04_proyectos\`.
2. Vayan a la pestaña **Map $\rightarrow$ Measure**:
   - Desplieguen el botón de medición y observen las opciones: **Planar** frente a **Geodesic**.
   - *Medición Planar:* Asume que la superficie terrestre es un plano euclidiano en el sistema de coordenadas asignado.
   - *Medición Geodésica:* Calcula la distancia más corta sobre la curvatura del elipsoide GRS80 (línea ortodrómica).
3. Midan la distancia entre dos extremos del cauce de La Iguaná con ambos métodos y comparen la diferencia métrica.
4. En las propiedades del mapa (**Map Properties $\rightarrow$ Coordinate Systems**), verifiquen que el sistema de coordenadas proyectadas esté configurado en:
   ```text
   MAGNA-SIRGAS 2018 / Origen-Nacional (EPSG:9377)
   ```

#### B. Calibración Cartográfica con Insumos Locales:
Abran uno de los planos cartográficos de calibración ubicados en la carpeta local del curso:
- `mapas_ejercicio/G01_mapa_A_atanasio_girardot.pdf` (Estadio Atanasio Girardot)
- `mapas_ejercicio/G01_mapa_B_belen.pdf` (Parque de Belén)
- `mapas_ejercicio/G01_mapa_C_envigado.pdf` (Zona urbana Envigado)
- `mapas_ejercicio/G01_mapa_D_itagui.pdf` (Itagüí Centro)
- `mapas_ejercicio/G01_mapa_E_sabaneta.pdf` (Sabaneta Parque)

Verifiquen en el plano asignado la longitud de la barra de escala gráfica con una regla milimetrada o herramienta de medición digital al 100 % de zoom y comprueben la equivalencia con la escala numérica indicada en el membrete.

#### C. Transferencia Autónoma a la Unidad Territorial `U01` a `U30`:
1. Localicen en ArcGIS Pro el polígono y cauce asignado a su unidad territorial.
2. Identifiquen las coordenadas geográficas de los dos extremos de su tramo (inicio y fin) consultando la barra de estado en grados decimales.
3. Calculen analíticamente en su libreta las coordenadas CTM12 proyectadas con las fórmulas de aproximación esférica de la Etapa 2.
4. Con la herramienta *Measure* de ArcGIS Pro configurada en modo `EPSG:9377`, midan las coordenadas Este y Norte reales de ambos puntos.
5. Registren la discrepancia en metros entre el cálculo esférico manual y el algoritmo elipsoidal de ArcGIS Pro:
   $$\Delta \text{Discrepancia} = \sqrt{(X_{\text{Pro}} - X_{\text{Manual}})^2 + (Y_{\text{Pro}} - Y_{\text{Manual}})^2}$$

---

## 4. Protocolo Obligatorio de Cierre en Sala (4:25 p.m. – 4:30 p.m. · 5 min)

1. Guarden los cambios en su proyecto de ArcGIS Pro (`.aprx`) y QGIS (`.qgz`).
2. En el Explorador de Windows, diríjanse a `C:\Temp\`.
3. Compriman la carpeta `SIG_Usuario` en:
   ```text
   SIG_Uxx_Apellido_Nombre_S02.zip
   ```
4. Transfiéranlo a su USB y a su nube institucional.
5. Borren el contenido de `C:\Temp\SIG_Usuario\` antes de retirarse de la sala.

---

## 5. Checklist de Verificación y Entrega

- [ ] Calculé analíticamente la escala lineal ($1:N$) y la escala de superficie ($1:N^2$) demostrando su relación cuadrática.
- [ ] Convertí coordenadas geográficas GMS a grados decimales con 6 cifras de precisión.
- [ ] Completé el cálculo manual de coordenadas aproximadas CTM12 para La Iguaná.
- [ ] Respondí con rigor las 3 preguntas del Caso Roto de consultoría.
- [ ] Contrasté la medición planar frente a geodésica en ArcGIS Pro.
- [ ] Calibré la escala digital con los mapas de [mapas_ejercicio/](mapas_ejercicio/).
- [ ] Ejecuté el cierre seguro de 5 minutos en `C:\Temp`.
