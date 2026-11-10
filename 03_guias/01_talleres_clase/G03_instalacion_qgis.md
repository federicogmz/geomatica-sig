# G03: Instalación de QGIS (versión LTR)

**Necesaria antes de la Semana 4** (Módulo 1). Instálenla con tiempo, no la
dejen para la noche anterior a la clase.

## ¿Qué versión instalo?

La versión **LTR** (Long Term Release, "de soporte extendido"), no la
última versión con las funciones más nuevas. La LTR es más estable, que es
lo que queremos para un curso.

> Al momento de armar esta guía (julio 2026), la LTR vigente es la serie
> **QGIS 3.44 "Solothurn"**. La siguiente LTR (QGIS 4.2) está prevista para
> octubre de 2026, después de que termine este semestre. Instalen
> **3.44.x**, no la 4.x. Verifiquen el número de parche exacto (el "x") en
> [qgis.org/download](https://qgis.org/download/) el día que instalen,
> porque IGAC y QGIS lanzan parches menores con frecuencia.

## Windows

1. Vayan a [qgis.org/download](https://qgis.org/download/).
2. Busquen el instalador **"QGIS Standalone Installer Version 3.44 (LTR)"**
   para su arquitectura (casi siempre 64-bit).
3. Ejecuten el instalador y dejen las opciones por defecto.
4. Al abrir QGIS por primera vez, busquen el ícono con el texto **"QGIS
   3.44"** (no "QGIS 3.44 (con GRASS)" ni ningún otro complemento: para
   este curso basta la versión estándar).

## macOS

1. Vayan a [qgis.org/download](https://qgis.org/download/) → sección macOS.
2. Descarguen el paquete `.dmg` correspondiente a su chip (Apple Silicon
   M1/M2/M3 o Intel; revisen "Acerca de este Mac" si no lo saben).
3. Abran el `.dmg` y arrastren QGIS a la carpeta Aplicaciones.
4. La primera vez que lo abran, macOS puede pedir confirmar que quieren
   abrir una app descargada de internet. Acéptenlo desde Preferencias del
   Sistema → Privacidad y Seguridad si aparece bloqueada.

## Linux

Sigan las instrucciones específicas de su distribución en
[qgis.org/download](https://qgis.org/download/) (repositorios apt para
Ubuntu/Debian, o Flatpak como alternativa universal). Si tienen dudas,
pregunten por el canal de Teams del curso. Linux varía más entre equipos.

## Verificación después de instalar

Antes de la Semana 4, confirmen que:

- [ ] QGIS abre sin errores.
- [ ] En el menú **Ayuda → Acerca de**, la versión mostrada empieza con
      `3.44`.
- [ ] Tienen conexión a internet disponible en el equipo donde instalaron
      (algunas prácticas cargan capas base en línea).
- [ ] Tienen su memoria USB o disco externo listo. No vamos a depender de
      OneDrive durante la clase (ver Pacto Pedagógico).

## Problemas comunes

- **"No tengo permisos de administrador en mi equipo":** avisen por Teams
  con anticipación; puede tomar unos días resolverlo con la universidad si
  usan un computador institucional.
- **Antivirus bloquea el instalador:** es un falso positivo conocido de
  algunos antivirus con instaladores de OSGeo4W. Permitan la excepción o
  descarguen desde el enlace oficial de qgis.org (no de sitios espejo).
- **Mac muestra "app dañada" o "no se puede abrir":** ver el paso de
  Preferencias del Sistema arriba; es un bloqueo de seguridad estándar de
  macOS para apps sin notarizar de ciertos repositorios, no un problema del
  instalador.
