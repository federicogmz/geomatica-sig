import proj4 from 'proj4';
import { wgs84ToCtm12, formatCtm12 } from '../core/crsConverter.js';
import { audioFx } from '../core/audioFx.js';

/**
 * didacticSimulators.js · Widgets Didácticos & Simuladores Interactivos
 * Creados específicamente para que los estudiantes comprendan conceptos abstractos
 * de geomática mediante experimentación visual en tiempo real.
 */
export class DidacticSimulators {
  constructor(stateStore) {
    this.stateStore = stateStore;
  }

  /**
   * 1. Simulador: La Trampa de la Fotocopiadora (Escala Numérica vs Gráfica)
   */
  renderPhotocopierSimulator(container) {
    if (!container) return;
    container.innerHTML = `
      <div class="simulator-card" id="sim-photocopier">
        <div class="sim-header">
          <div class="sim-badge">🔬 Simulador Interactivo 1</div>
          <h4 class="sim-title">La Trampa de la Fotocopiadora: ¿Por qué la Escala Numérica miente?</h4>
          <p class="sim-desc">
            Modifica el deslizador para simular una deformación por impresión, fotocopiadora o cambio de pantalla. Observa cómo la escala numérica 1:5.000 se vuelve falsa, mientras la escala gráfica se adapta manteniendo la verdad métrica.
          </p>
        </div>

        <div class="sim-controls-row">
          <label class="sim-label" for="photocopier-slider">
            Factor de Zoom / Deformación de Hoja: <strong id="photocopier-factor-val">100%</strong>
          </label>
          <input type="range" id="photocopier-slider" min="50" max="150" step="5" value="100" class="sim-range-input">
          <div class="sim-presets">
            <button class="btn btn-secondary btn-xs" data-factor="100">Original (100%)</button>
            <button class="btn btn-secondary btn-xs" data-factor="75">Reducción A3→A4 (71%)</button>
            <button class="btn btn-secondary btn-xs" data-factor="141">Ampliación A4→A3 (141%)</button>
          </div>
        </div>

        <!-- Lienzo del Plano Simulado -->
        <div class="sim-viewport">
          <div class="sim-map-sheet" id="sim-sheet" style="transform: scale(1);">
            <div class="sim-sheet-inner">
              <div class="sim-map-header">
                <span class="sim-map-tag">PLANO CATASTRAL CUENCA LA IGUANÁ</span>
                <span class="sim-nominal-scale" id="sim-nominal-text">Escala Nominal Escrita: <strong>1:5.000</strong></span>
              </div>
              <div class="sim-drawing-box">
                <div class="sim-river-line">Quebrada La Iguaná (Cauce Principal)</div>
                <div class="sim-feature-box">Manzana Catastral 42</div>
              </div>
              <!-- Escala Gráfica Dinámica dentro del plano -->
              <div class="sim-graphic-scale-container">
                <span class="sim-scale-legend">Escala Gráfica de Control (200 m nominal = 4.0 cm):</span>
                <div class="sim-scale-bar-svg" id="sim-graphic-bar">
                  <div class="sim-bar-segment black"><span>0</span></div>
                  <div class="sim-bar-segment white"><span>50m</span></div>
                  <div class="sim-bar-segment black"><span>100m</span></div>
                  <div class="sim-bar-segment white"><span>200m</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel de Diagnóstico Numérico -->
        <div class="sim-metrics-grid">
          <div class="sim-metric-card">
            <span class="metric-title">Medida en Papel con Regla</span>
            <span class="metric-number" id="metric-paper-len">4.0 cm</span>
            <span class="metric-sub">Longitud física medida</span>
          </div>
          <div class="sim-metric-card" id="card-calc-graphic">
            <span class="metric-title">Distancia Real con Escala Gráfica</span>
            <span class="metric-number text-success" id="metric-graphic-dist">200.0 m</span>
            <span class="metric-sub text-success">¡Exacta! Error: 0.0%</span>
          </div>
          <div class="sim-metric-card" id="card-calc-numeric">
            <span class="metric-title">Distancia Calculada con 1:5.000</span>
            <span class="metric-number" id="metric-numeric-dist">200.0 m</span>
            <span class="metric-sub" id="metric-numeric-err">Sin deformación</span>
          </div>
        </div>

        <div class="sim-explanation-box" id="sim-photocopier-verdict">
          <strong>Principio Cartográfico:</strong> Al 100%, ambas escalas coinciden. Al deformar la hoja, la escala gráfica se encoge o agranda junto con el dibujo, preservando la proporción matemática exacta.
        </div>
      </div>
    `;

    const slider = container.querySelector('#photocopier-slider');
    const factorVal = container.querySelector('#photocopier-factor-val');
    const sheet = container.querySelector('#sim-sheet');
    const paperLen = container.querySelector('#metric-paper-len');
    const numericDist = container.querySelector('#metric-numeric-dist');
    const numericErr = container.querySelector('#metric-numeric-err');
    const cardNumeric = container.querySelector('#card-calc-numeric');
    const verdict = container.querySelector('#sim-photocopier-verdict');

    const update = (val) => {
      const factor = parseFloat(val) / 100;
      factorVal.textContent = `${val}%`;
      sheet.style.transform = `scale(${factor})`;

      const measuredCm = (4.0 * factor).toFixed(2);
      paperLen.textContent = `${measuredCm} cm`;

      // Si un ingeniero calcula a ciegas: D = measuredCm * 50 m/cm
      const calculatedMeters = (measuredCm * 50).toFixed(1);
      const errorMeters = (calculatedMeters - 200).toFixed(1);
      const errorPct = (((calculatedMeters - 200) / 200) * 100).toFixed(1);

      numericDist.textContent = `${calculatedMeters} m`;

      if (factor === 1.0) {
        numericErr.textContent = 'Sin deformación (Error 0.0%)';
        numericErr.className = 'metric-sub text-success';
        verdict.innerHTML = `<strong>Documento Original:</strong> La hoja está a su tamaño nominal. Tanto la escala gráfica como la numérica arrojan los 200 metros reales.`;
      } else {
        const sign = errorPct > 0 ? '+' : '';
        numericErr.textContent = `¡ERROR DEFORMACIÓN! ${sign}${errorPct}% (${sign}${errorMeters} m)`;
        numericErr.className = 'metric-sub text-error';
        verdict.innerHTML = `
          <strong style="color: #EF4444;">¡ALERTA DE FALSO CÁLCULO!</strong>
          El documento sufrió una deformación del ${val}%. La escala numérica fija 1:5.000 dice erróneamente que la distancia es de <strong>${calculatedMeters} m</strong> (con un error peligroso de ${sign}${errorMeters} m). En cambio, la <strong>escala gráfica</strong> se deformó en idéntica proporción y midió exactamente los <strong>200.0 m reales</strong>. ¡Por esto es obligatorio incluir escala gráfica en todo plano de ingeniería!
        `;
      }
    };

    slider.addEventListener('input', (e) => update(e.target.value));

    container.querySelectorAll('.sim-presets button').forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.dataset.factor;
        slider.value = f;
        update(f);
      });
    });
  }

  /**
   * 2. Conversor Interactivo CTM12 & GMS (EPSG:9377)
   */
  renderCtm12Converter(container) {
    if (!container) return;
    container.innerHTML = `
      <div class="simulator-card" id="sim-ctm12">
        <div class="sim-header">
          <div class="sim-badge">🧭 Simulador Interactivo 2</div>
          <h4 class="sim-title">Conversor Geodésico Oficial: WGS84 (GMS / Decimal) ➔ CTM12 (EPSG:9377)</h4>
          <p class="sim-desc">
            Transforma coordenadas angulares de La Iguaná a coordenadas planas métricas oficiales de Colombia (Resolución IGAC 471 de 2020) con Falso Este 5.000.000 m y Falso Norte 2.000.000 m.
          </p>
        </div>

        <div class="sim-presets-bar">
          <span style="font-size: 11.5px; color: var(--text-muted);">Puntos Clave de La Iguaná:</span>
          <button class="btn btn-secondary btn-xs" id="btn-pre-boqueron">Boquerón (Nacimiento)</button>
          <button class="btn btn-secondary btn-xs" id="btn-pre-cra80">Azud Cra 80 (Robledo)</button>
          <button class="btn btn-secondary btn-xs" id="btn-pre-minorista">Puente Colombia (Desembocadura)</button>
        </div>

        <div class="converter-inputs-grid">
          <div class="conv-col">
            <h5 class="conv-col-title">1. Entrada WGS84 (Latitud / Longitud)</h5>
            <div class="form-group-compact">
              <label>Latitud Norte (° Decimal):</label>
              <input type="number" id="conv-lat" class="form-control-compact" step="0.00001" value="6.28722">
            </div>
            <div class="form-group-compact">
              <label>Longitud Oeste / W (° Decimal con signo negativo):</label>
              <input type="number" id="conv-lng" class="form-control-compact" step="0.00001" value="-75.65389">
            </div>
            <button class="btn btn-primary btn-sm mt-2 w-100" id="btn-run-conversion">
              Calcular Coordenadas CTM12 ➔
            </button>
          </div>

          <div class="conv-col result-col">
            <h5 class="conv-col-title">2. Salida Oficial MAGNA-SIRGAS CTM12 (EPSG:9377)</h5>
            <div class="conv-result-row">
              <span class="conv-res-label">Coordenada Este (X):</span>
              <span class="conv-res-val highlight" id="conv-res-x">4.927.810 m</span>
            </div>
            <div class="conv-result-row">
              <span class="conv-res-label">Coordenada Norte (Y):</span>
              <span class="conv-res-val highlight" id="conv-res-y">2.253.140 m</span>
            </div>
            <div class="conv-steps-box" id="conv-steps">
              <strong>Parámetros de Proyección CTM12:</strong><br>
              • Meridiano Central: 73° 00' 00" W<br>
              • Latitud Origen: 4° 00' 00" N<br>
              • Falso Este ($X_0$): 5'000.000 m<br>
              • Falso Norte ($Y_0$): 2'000.000 m
            </div>
          </div>
        </div>
      </div>
    `;

    const latInput = container.querySelector('#conv-lat');
    const lngInput = container.querySelector('#conv-lng');
    const resX = container.querySelector('#conv-res-x');
    const resY = container.querySelector('#conv-res-y');
    const btnCalc = container.querySelector('#btn-run-conversion');

    const executeConv = () => {
      const lat = parseFloat(latInput.value);
      const lng = parseFloat(lngInput.value);
      if (isNaN(lat) || isNaN(lng)) return;

      const [x, y] = wgs84ToCtm12(lat, lng);
      resX.textContent = `${Math.round(x).toLocaleString('es-CO')} m`;
      resY.textContent = `${Math.round(y).toLocaleString('es-CO')} m`;
      audioFx.playClick();
    };

    btnCalc.addEventListener('click', executeConv);

    container.querySelector('#btn-pre-boqueron').addEventListener('click', () => {
      latInput.value = '6.28722';
      lngInput.value = '-75.65389';
      executeConv();
    });

    container.querySelector('#btn-pre-cra80').addEventListener('click', () => {
      latInput.value = '6.26510';
      lngInput.value = '-75.59410';
      executeConv();
    });

    container.querySelector('#btn-pre-minorista').addEventListener('click', () => {
      latInput.value = '6.26000';
      lngInput.value = '-75.57167';
      executeConv();
    });
  }

  /**
   * 3. Simulador: Faja de Retiro Hídrico (Buffer 30m) & Amenaza en La Iguaná
   */
  renderBufferSimulator(container) {
    if (!container) return;
    container.innerHTML = `
      <div class="simulator-card" id="sim-buffer">
        <div class="sim-header">
          <div class="sim-badge">🛡️ Simulador Interactivo 3</div>
          <h4 class="sim-title">Faja de Protección Hídrica (Buffer) & Afectación de Predios (POT Medellín)</h4>
          <p class="sim-desc">
            Ajusta el ancho de la franja de amortiguamiento ambiental y observa en tiempo real cuántas viviendas quedan expuestas a riesgo por avenida torrencial.
          </p>
        </div>

        <div class="sim-controls-row">
          <label class="sim-label" for="sim-buffer-slider">
            Distancia de Retiro Radial: <strong id="sim-buffer-dist-val">30 metros</strong> (Mandato POT Medellín)
          </label>
          <input type="range" id="sim-buffer-slider" min="5" max="60" step="5" value="30" class="sim-range-input">
        </div>

        <div class="sim-canvas-box" style="position: relative; height: 160px; background: #0B1120; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); overflow: hidden;">
          <canvas id="sim-buffer-canvas" width="600" height="160" style="width: 100%; height: 100%;"></canvas>
        </div>

        <div class="sim-metrics-grid">
          <div class="sim-metric-card">
            <span class="metric-title">Ancho Total de Franja</span>
            <span class="metric-number" id="sim-buffer-width">60 metros</span>
            <span class="metric-sub">30 m a cada costado del eje</span>
          </div>
          <div class="sim-metric-card">
            <span class="metric-title">Predios Afectados en Conflicto</span>
            <span class="metric-number text-error" id="sim-buffer-count">18 predios</span>
            <span class="metric-sub text-error">En zona de amenaza alta</span>
          </div>
          <div class="sim-metric-card">
            <span class="metric-title">Área Protegida Estimada</span>
            <span class="metric-number" id="sim-buffer-area">90.0 ha</span>
            <span class="metric-sub">Largo de cauce ~15 km</span>
          </div>
        </div>
      </div>
    `;

    const canvas = container.querySelector('#sim-buffer-canvas');
    const ctx = canvas.getContext('2d');
    const slider = container.querySelector('#sim-buffer-slider');
    const distVal = container.querySelector('#sim-buffer-dist-val');
    const widthVal = container.querySelector('#sim-buffer-width');
    const countVal = container.querySelector('#sim-buffer-count');
    const areaVal = container.querySelector('#sim-buffer-area');

    // Muestra fija de 24 predios simulados a lo largo del cauce
    const houses = [
      { x: 50, y: 55 }, { x: 90, y: 105 }, { x: 130, y: 48 }, { x: 170, y: 110 },
      { x: 210, y: 60 }, { x: 250, y: 95 }, { x: 290, y: 50 }, { x: 330, y: 115 },
      { x: 370, y: 62 }, { x: 410, y: 100 }, { x: 450, y: 45 }, { x: 490, y: 112 },
      { x: 530, y: 58 }, { x: 570, y: 108 }, { x: 75, y: 35 }, { x: 150, y: 125 },
      { x: 230, y: 30 }, { x: 310, y: 130 }, { x: 390, y: 28 }, { x: 470, y: 135 },
      { x: 550, y: 25 }, { x: 110, y: 70 }, { x: 270, y: 85 }, { x: 430, y: 78 }
    ];

    const draw = (bufferDist) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const riverY = h / 2;
      const pixelBuffer = bufferDist * 1.3;

      // 1. Dibujar zona de buffer
      ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.strokeStyle = '#6366F1';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.fillRect(0, riverY - pixelBuffer, w, pixelBuffer * 2);
      ctx.strokeRect(0, riverY - pixelBuffer, w, pixelBuffer * 2);
      ctx.setLineDash([]);

      // 2. Dibujar cauce central de La Iguaná
      ctx.strokeStyle = '#06B6D4';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, riverY);
      for (let x = 0; x <= w; x += 30) {
        const yOffset = Math.sin(x * 0.03) * 6;
        ctx.lineTo(x, riverY + yOffset);
      }
      ctx.stroke();

      // 3. Dibujar predios y evaluar intersección
      let affected = 0;
      houses.forEach(house => {
        const d = Math.abs(house.y - riverY);
        const isInside = d <= pixelBuffer;
        if (isInside) affected++;

        ctx.fillStyle = isInside ? '#EF4444' : '#F59E0B';
        ctx.strokeStyle = isInside ? '#FFFFFF' : 'transparent';
        ctx.lineWidth = 1;
        ctx.fillRect(house.x - 5, house.y - 5, 10, 10);
        ctx.strokeRect(house.x - 5, house.y - 5, 10, 10);
      });

      // Actualizar métricas
      distVal.textContent = `${bufferDist} metros`;
      widthVal.textContent = `${bufferDist * 2} metros`;
      countVal.textContent = `${affected} predios`;
      areaVal.textContent = `${(bufferDist * 2 * 15 * 0.1).toFixed(1)} ha`;
    };

    draw(30);

    slider.addEventListener('input', (e) => {
      draw(parseInt(e.target.value, 10));
    });
  }

  /**
   * 4. Simulador: Perfil Topográfico de La Iguaná & Pendiente Crítica
   */
  renderElevationSimulator(container) {
    if (!container) return;
    container.innerHTML = `
      <div class="simulator-card" id="sim-elevation">
        <div class="sim-header">
          <div class="sim-badge">⛰️ Simulador Interactivo 4</div>
          <h4 class="sim-title">Perfil Longitudinal de La Iguaná: 1.500 m de Desnivel en 15 km</h4>
          <p class="sim-desc">
            Visualiza la caída abrupta desde el Alto de Boquerón (2.950 msnm) hasta el Río Medellín (1.450 msnm) y comprende por qué es una cuenca torrencial con pendiente media del 10.0%.
          </p>
        </div>

        <div class="sim-canvas-box" style="height: 180px; background: #0B1120; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); padding: 8px;">
          <canvas id="sim-elev-canvas" width="600" height="180" style="width: 100%; height: 100%; display: block;"></canvas>
        </div>

        <div class="sim-metrics-grid">
          <div class="sim-metric-card">
            <span class="metric-title">Nacimiento (Boquerón)</span>
            <span class="metric-number">2.950 msnm</span>
            <span class="metric-sub">Distancia: km 0.0</span>
          </div>
          <div class="sim-metric-card">
            <span class="metric-title">Desembocadura (Río Medellín)</span>
            <span class="metric-number">1.450 msnm</span>
            <span class="metric-sub">Distancia: km 15.0</span>
          </div>
          <div class="sim-metric-card">
            <span class="metric-title">Pendiente Media Longitudinal</span>
            <span class="metric-number text-warning">10.0%</span>
            <span class="metric-sub text-warning">Alta Torrencialidad</span>
          </div>
        </div>
      </div>
    `;

    const canvas = container.querySelector('#sim-elev-canvas');
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Dibujar perfil con curva cóncava natural de río
    ctx.clearRect(0, 0, w, h);

    // Gradiente de relleno
    const grad = ctx.createLinearGradient(0, 20, 0, h - 20);
    grad.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0.02)');

    ctx.beginPath();
    ctx.moveTo(40, 25);
    // Puntos de cota a lo largo de 15 km
    ctx.bezierCurveTo(w * 0.3, 85, w * 0.7, 125, w - 30, h - 25);
    ctx.lineTo(w - 30, h - 15);
    ctx.lineTo(40, h - 15);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Línea de perfil
    ctx.beginPath();
    ctx.moveTo(40, 25);
    ctx.bezierCurveTo(w * 0.3, 85, w * 0.7, 125, w - 30, h - 25);
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Rótulos de cota
    ctx.fillStyle = '#F9FAFB';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('Alto Boquerón: 2.950 m', 45, 20);
    ctx.fillText('Río Medellín: 1.450 m', w - 130, h - 30);

    // Cuenca Alta y Baja
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('Cuenca Alta (San Cristóbal)', w * 0.15, 65);
    ctx.fillText('Cuenca Baja Urbana (Robledo)', w * 0.65, 115);
  }

  /**
   * 5. Simulador: Auditoría GNSS & Error Cuadrático Medio (RMSE)
   */
  renderGnssSimulator(container) {
    if (!container) return;
    container.innerHTML = `
      <div class="simulator-card" id="sim-gnss">
        <div class="sim-header">
          <div class="sim-badge">🎯 Simulador Interactivo 5</div>
          <h4 class="sim-title">Auditoría GNSS de Campo: Dispersión Satelital & Cálculo de RMSE Horizontal</h4>
          <p class="sim-desc">
            Modifica la calidad de la señal satelital (DOP) y observa cómo se dispersan los puntos medidos respecto al mojón oficial del IGAC, calculando el RMSE horizontal en tiempo real.
          </p>
        </div>

        <div class="sim-controls-row">
          <label class="sim-label" for="sim-dop-slider">
            Calidad de Geometría Satelital (DOP): <strong id="sim-dop-val">2.0 (Excelente)</strong>
          </label>
          <input type="range" id="sim-dop-slider" min="1.0" max="6.0" step="0.5" value="2.0" class="sim-range-input">
        </div>

        <div class="sim-metrics-grid">
          <div class="sim-metric-card">
            <span class="metric-title">Punto de Control IGAC</span>
            <span class="metric-number">Mojón Oficial</span>
            <span class="metric-sub">Coordenada Verdad (0, 0)</span>
          </div>
          <div class="sim-metric-card">
            <span class="metric-title">RMSE Horizontal Calculado</span>
            <span class="metric-number text-success" id="sim-rmse-val">1.85 m</span>
            <span class="metric-sub" id="sim-rmse-status">Aprobado Norma 1:5.000</span>
          </div>
          <div class="sim-metric-card">
            <span class="metric-title">Tolerancia ASPRS</span>
            <span class="metric-number">3.50 m</span>
            <span class="metric-sub">Límite normativo de rechazo</span>
          </div>
        </div>
      </div>
    `;

    const slider = container.querySelector('#sim-dop-slider');
    const dopVal = container.querySelector('#sim-dop-val');
    const rmseVal = container.querySelector('#sim-rmse-val');
    const rmseStatus = container.querySelector('#sim-rmse-status');

    slider.addEventListener('input', (e) => {
      const dop = parseFloat(e.target.value);
      dopVal.textContent = `${dop.toFixed(1)} ${dop <= 2.5 ? '(Excelente)' : (dop <= 4.0 ? '(Moderado)' : '(Degradado)')}`;

      // RMSE escala proporcionalmente al DOP
      const calcRmse = (dop * 0.92).toFixed(2);
      rmseVal.textContent = `${calcRmse} m`;

      if (calcRmse <= 3.50) {
        rmseVal.className = 'metric-number text-success';
        rmseStatus.textContent = 'Aprobado Norma ASPRS 1:5.000';
        rmseStatus.className = 'metric-sub text-success';
      } else {
        rmseVal.className = 'metric-number text-error';
        rmseStatus.textContent = '¡RECHAZADO! Excede tolerancia de 3.5m';
        rmseStatus.className = 'metric-sub text-error';
      }
    });
  }

  /**
   * 6. Simulador: Espectro Satelital NDVI (Vegetación vs Área Construida)
   */
  renderNdviSimulator(container) {
    if (!container) return;
    container.innerHTML = `
      <div class="simulator-card" id="sim-ndvi">
        <div class="sim-header">
          <div class="sim-badge">🛰️ Simulador Interactivo 6</div>
          <h4 class="sim-title">Firma Espectral Sentinel-2 & Calculadora Dinámica de NDVI</h4>
          <p class="sim-desc">
            Modifica la reflectancia del Rojo (Banda 4) y del Infrarrojo Cercano (Banda 8) para observar cómo cambia el índice biofísico entre el bosque del Boquerón y la ciudad de Robledo.
          </p>
        </div>

        <div class="sim-presets-bar">
          <span style="font-size: 11.5px; color: var(--text-muted);">Coberturas Típicas:</span>
          <button class="btn btn-secondary btn-xs" id="btn-ndvi-forest">Bosque Boquerón</button>
          <button class="btn btn-secondary btn-xs" id="btn-ndvi-pasture">Pastizal Ladera</button>
          <button class="btn btn-secondary btn-xs" id="btn-ndvi-urban">Techos Urbanos (Robledo)</button>
          <button class="btn btn-secondary btn-xs" id="btn-ndvi-water">Río Medellín (Agua)</button>
        </div>

        <div class="converter-inputs-grid">
          <div class="conv-col">
            <div class="form-group-compact">
              <label>Reflectancia Banda 4 (Rojo visible, 665 nm):</label>
              <input type="range" id="sim-b4-slider" min="0.01" max="0.80" step="0.02" value="0.08" class="sim-range-input">
              <span id="sim-b4-val" style="font-family: var(--font-mono); font-size: 12px; color: #EF4444;">0.08</span>
            </div>
            <div class="form-group-compact mt-2">
              <label>Reflectancia Banda 8 (NIR Infrarrojo, 842 nm):</label>
              <input type="range" id="sim-b8-slider" min="0.01" max="0.80" step="0.02" value="0.55" class="sim-range-input">
              <span id="sim-b8-val" style="font-family: var(--font-mono); font-size: 12px; color: #10B981;">0.55</span>
            </div>
          </div>

          <div class="conv-col result-col">
            <h5 class="conv-col-title">Fórmula: NDVI = (B8 - B4) / (B8 + B4)</h5>
            <div class="conv-result-row">
              <span class="conv-res-label">Índice NDVI Resultante:</span>
              <span class="conv-res-val highlight" id="sim-ndvi-result">+0.75</span>
            </div>
            <div class="sim-thermometer-box">
              <div class="sim-thermometer-bar">
                <div class="sim-thermometer-fill" id="sim-ndvi-fill" style="width: 87%; background: #10B981;"></div>
              </div>
              <div class="sim-thermometer-labels">
                <span>-1.0 (Agua)</span>
                <span>0.0 (Urbano/Suelo)</span>
                <span>+1.0 (Bosque Denso)</span>
              </div>
            </div>
            <div class="conv-steps-box" id="sim-ndvi-desc">
              <strong>Diagnóstico Biofísico:</strong> Vegetación vigorosa de bosque nuboso en la cuenca alta.
            </div>
          </div>
        </div>
      </div>
    `;

    const b4Slider = container.querySelector('#sim-b4-slider');
    const b8Slider = container.querySelector('#sim-b8-slider');
    const b4Val = container.querySelector('#sim-b4-val');
    const b8Val = container.querySelector('#sim-b8-val');
    const resVal = container.querySelector('#sim-ndvi-result');
    const fill = container.querySelector('#sim-ndvi-fill');
    const desc = container.querySelector('#sim-ndvi-desc');

    const updateNdvi = () => {
      const b4 = parseFloat(b4Slider.value);
      const b8 = parseFloat(b8Slider.value);
      b4Val.textContent = b4.toFixed(2);
      b8Val.textContent = b8.toFixed(2);

      const ndvi = (b8 - b4) / (b8 + b4);
      const formatted = (ndvi >= 0 ? '+' : '') + ndvi.toFixed(2);
      resVal.textContent = formatted;

      // Porcentaje de -1 a 1 mapeado a 0% - 100%
      const pct = Math.max(0, Math.min(100, ((ndvi + 1) / 2) * 100));
      fill.style.width = `${pct}%`;

      if (ndvi >= 0.5) {
        fill.style.background = '#10B981';
        resVal.style.color = '#10B981';
        desc.innerHTML = `<strong>Bosque Vigoroso:</strong> Fuerte absorción de rojo por clorofila y alta reflectancia en el mesófilo celular del infrarrojo. Típico del Alto de Boquerón.`;
      } else if (ndvi >= 0.2) {
        fill.style.background = '#F59E0B';
        resVal.style.color = '#F59E0B';
        desc.innerHTML = `<strong>Vegetación Moderada / Pastizal:</strong> Cobertura mixta de rastrojo y laderas semiurbanizadas de Robledo.`;
      } else if (ndvi >= 0.0) {
        fill.style.background = '#6B7280';
        resVal.style.color = '#9CA3AF';
        desc.innerHTML = `<strong>Suelo Desnudo / Área Construida:</strong> Techos de teja, asfalto y explanaciones que reflejan similarmente en rojo y NIR.`;
      } else {
        fill.style.background = '#06B6D4';
        resVal.style.color = '#06B6D4';
        desc.innerHTML = `<strong>Cuerpo de Agua / Sombras Profundas:</strong> El agua absorbe fuertemente la radiación infrarroja, arrojando valores negativos.`;
      }
    };

    b4Slider.addEventListener('input', updateNdvi);
    b8Slider.addEventListener('input', updateNdvi);

    container.querySelector('#btn-ndvi-forest').addEventListener('click', () => {
      b4Slider.value = '0.06';
      b8Slider.value = '0.58';
      updateNdvi();
    });

    container.querySelector('#btn-ndvi-pasture').addEventListener('click', () => {
      b4Slider.value = '0.15';
      b8Slider.value = '0.35';
      updateNdvi();
    });

    container.querySelector('#btn-ndvi-urban').addEventListener('click', () => {
      b4Slider.value = '0.28';
      b8Slider.value = '0.26';
      updateNdvi();
    });

    container.querySelector('#btn-ndvi-water').addEventListener('click', () => {
      b4Slider.value = '0.12';
      b8Slider.value = '0.04';
      updateNdvi();
    });

    updateNdvi();
  }
}
