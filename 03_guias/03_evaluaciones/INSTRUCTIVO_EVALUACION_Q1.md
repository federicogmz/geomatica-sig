# Quiz 1: Fundamentos cartográficos (8%)

> **Curso:** Geomática, Ingeniería y SIG  
> **Pregrados:** Ingeniería Civil y Diseño Urbano · Universidad EAFIT  
> **Ponderación:** 8% de la nota definitiva del curso  
> **Semana:** 3 · Bloque 1 (Aula de clase)  
> **Modalidad:** Individual, presencial, en clase, sin excepción  
> **Duración sugerida:** 30-35 min  
> **Materiales permitidos:** Calculadora y regla. No se permite celular ni notas.  

---

## Escenario A: georreferenciar un plano antiguo (3.5%)

La Alcaldía les entrega un plano catastral escaneado de un lote dentro de la cuenca de La Iguaná, cerca de la presa de laminación de la Carrera 70. El plano **no tiene coordenadas ni CRS** — antes de poder cargarlo en QGIS y usarlo, hay que georreferenciarlo, y para eso primero necesitan saber a qué escala está.

**A0. (0.5%)** El plano trae impresas una escala numérica (1:5 000) y una escala gráfica (una barra), pero fue escaneado con un fotocopiador antiguo que pudo haber ampliado o reducido la imagen ligeramente sin que ustedes lo sepan. ¿En cuál de las dos escalas confían para medir sobre el escaneo, y por qué?

**A1. (1%)** Para confirmar la escala real del escaneo (por si el fotocopiador sí alteró el tamaño), miden un tramo de la Carrera 70 que saben mide 7 m de ancho real. En el escaneo, ese tramo mide 1.4 mm. ¿A qué escala quedó el plano después de escanearlo?

**A2. (1%)** Con esa escala, necesitan reportar la distancia entre los dos accesos vehiculares del lote, que en el plano miden 4.8 cm de separación. ¿Cuál es la distancia real, en metros?

**A3. (1%)** La norma municipal exige un área mínima de 300 m² para uso residencial en ese sector. El lote, en el plano, mide 1.5 cm × 2 cm. Calcule su área real (en m² y en hectáreas) y diga si el lote cumple la norma.

---

## Escenario B: elegir una imagen satelital (0.5%)

Van a hacer un mapeo preliminar de agrietamientos del terreno de aproximadamente 8 m de ancho, en la parte alta de la cuenca (zona de riesgo de movimientos en masa). Tienen dos opciones: Sentinel-2 (10×10 m/píxel, gratuita) o una imagen comercial de alta resolución (3×3 m/píxel, con costo).

**B1. (0.5%)** ¿Cuál de las dos permite distinguir esos agrietamientos? Justifique en una frase qué pasaría si usaran la otra.

---

## Escenario C: coordenadas de un punto de control (2%)

Un compañero georreferenció con GPS un punto de control cerca de la transición San Cristóbal → Robledo y lo anotó en su libreta de campo en el formato tradicional, para después transcribirlo a QGIS.

**C1. (1%)** El punto quedó anotado como **6° 17' 24" N, 75° 36' 00" O**. Conviértalo a decimal (use todas las cifras decimales exactas, sin redondear de más).

**C2. (1%)** Otro compañero, trabajando ya en QGIS, tiene guardada la longitud de un punto de referencia distinto como **−74.7°** y necesita reportarla en el formato tradicional GMS para un oficio dirigido al IGAC. Conviértala.

---

## Escenario D: capas que no calzan (1%)

Al superponer en QGIS la capa de vías que acaban de digitalizar (en Magna-Sirgas) con una capa antigua de predios heredada de un proyecto anterior de la Alcaldía (en Datum Bogotá), sin reproyectar ninguna de las dos:

**D1. (1%)** ¿Qué van a observar en el mapa, y por qué pasa esto? (Una o dos frases.)

---

## Escenario E: coordenadas planas para delinear la cuenca (1%)

El siguiente paso del proyecto, ya en el Módulo 1, es descargar un DEM y delinear en QGIS la cuenca completa de La Iguaná a partir de un punto de salida (*pour point*). Antes de eso, necesitan expresar en CTM12 —no en grados— el punto de control del Escenario C1, porque las herramientas de distancia y área de QGIS trabajan en metros.

**E1. (1%)** Usando la fórmula simplificada vista en clase y el punto del Escenario C1 (ya convertido a decimal), calcule su Este y su Norte en CTM12.

```
Norte ≈ 2 000 000 + (lat − 4) × 111 320 × 0.9992
Este  ≈ 5 000 000 + (lon − (−73)) × 111 320 × cos(lat) × 0.9992
```

---

*Verifique que su nombre y grupo queden escritos antes de entregar.*
