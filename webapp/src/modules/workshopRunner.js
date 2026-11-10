import { CURRICULUM_STAGES, GLOSSARY_TERMS } from './curriculumData.js';
import { audioFx } from '../core/audioFx.js';
import { renderMath } from '../core/mathRenderer.js';

/**
 * Controlador de la Experiencia Gamificada y Validación de Conocimiento
 * Soporta la Consola Génesis (Fase 0) y el Acompañante de Misión (Fases 1 a 9).
 */
export class WorkshopRunner {
  constructor(containerId, stateStore, autograder, layerManager, callbacks = {}) {
    this.container = document.getElementById(containerId);
    this.stateStore = stateStore;
    this.autograder = autograder;
    this.layerManager = layerManager;
    this.callbacks = callbacks;
    this.stageAnswers = {};
  }

  render() {
    if (!this.container) return;

    const state = this.stateStore.getState();
    const currentStageNum = state.currentStage || 0;
    const activeStage = CURRICULUM_STAGES.find(s => s.stageNumber === currentStageNum) || CURRICULUM_STAGES[0];
    const maxUnlocked = state.maxUnlockedStage || 0;
    const rank = this.stateStore.getRank();

    // Barra de navegación entre etapas
    const stageTabsHtml = CURRICULUM_STAGES.map(stage => {
      const isLocked = stage.stageNumber > maxUnlocked;
      const isActive = stage.stageNumber === currentStageNum;
      const isCompleted = state.workshopProgress[`stage_${stage.stageNumber}`]?.completed;

      return `
        <button 
          class="stage-tab-btn ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}"
          data-stage="${stage.stageNumber}"
          ${isLocked ? 'disabled title="Supera los retos anteriores para desbloquear"' : ''}
        >
          <span class="tab-num">${stage.stageNumber}</span>
          <span class="tab-status-icon">${isLocked ? '🔒' : (isCompleted ? '✓' : '●')}</span>
        </button>
      `;
    }).join('');

    // Tarjetas de teoría
    const theoryCardsHtml = activeStage.theory.map((th, i) => `
      <div class="theory-block" id="th_${activeStage.stageNumber}_${i}">
        <h4 class="theory-block-title">${th.title}</h4>
        <div class="theory-block-content">${this.formatMarkdown(th.content)}</div>
      </div>
    `).join('');

    // Ejercicios y Retos
    const exercisesHtml = activeStage.exercises.map((ex, idx) => {
      let inputHtml = '';
      if (ex.type === 'calculation' || ex.type === 'attribute_query') {
        inputHtml = `
          <div class="exercise-input-row">
            <input type="number" step="any" id="input_${ex.id}" class="exercise-text-input" placeholder="Ingresa tu respuesta numérica...">
            ${ex.unit ? `<span class="input-unit-badge">${ex.unit}</span>` : ''}
            <button class="btn btn-primary btn-sm btn-verify" data-ex-id="${ex.id}" data-idx="${idx}">
              Validar
            </button>
          </div>
        `;
      } else if (ex.type === 'select_choice') {
        const optionsHtml = ex.options.map((opt, optIdx) => `
          <label class="choice-option-label" for="opt_${ex.id}_${optIdx}">
            <input type="radio" id="opt_${ex.id}_${optIdx}" name="choice_${ex.id}" value="${opt}">
            <span class="choice-text">${opt}</span>
          </label>
        `).join('');
        inputHtml = `
          <div class="exercise-choices-list">${optionsHtml}</div>
          <button class="btn btn-primary btn-sm btn-verify mt-2" data-ex-id="${ex.id}" data-idx="${idx}">
            Comprobar Respuesta
          </button>
        `;
      } else {
        // Acciones interactivas con herramientas o mapa
        inputHtml = `
          <div class="exercise-action-prompt">
            <p class="action-instruction">Utiliza la herramienta indicada en la barra superior o realiza la acción sobre el mapa.</p>
            <button class="btn btn-accent btn-sm btn-verify-action" data-ex-id="${ex.id}" data-idx="${idx}">
              Comprobar Acción en el Mapa
            </button>
          </div>
        `;
      }

      return `
        <div class="exercise-card" id="card_${ex.id}">
          <div class="exercise-card-header">
            <span class="badge-exercise-num">Reto ${idx + 1}</span>
            <span class="badge-exercise-type">${this.getExerciseTypeLabel(ex.type)}</span>
          </div>
          <p class="exercise-question-text">${ex.question}</p>
          ${inputHtml}
          <div class="exercise-feedback-box hidden" id="feedback_${ex.id}"></div>
        </div>
      `;
    }).join('');

    // Plantilla completa
    this.container.innerHTML = `
      <div class="quest-view-wrapper">
        <!-- Navegación de Etapas -->
        <div class="quest-stages-carousel">
          <div class="stages-scroll-track">
            ${stageTabsHtml}
          </div>
        </div>

        <!-- Encabezado de la Misión Activa -->
        <div class="quest-active-header">
          <div class="quest-header-top">
            <div class="quest-stage-tag">
              FASE ${activeStage.stageNumber} DE 9 · ${activeStage.subtitle}
            </div>
            <div class="quest-xp-badge">
              +${activeStage.xpReward} XP
            </div>
          </div>
          
          <h2 class="quest-stage-title">${activeStage.title}</h2>
          <p class="quest-stage-desc">${activeStage.description}</p>
          
          <div class="quest-unlock-preview">
            <span class="unlock-label">Desbloquea al aprobar:</span>
            <span class="unlock-item">✨ ${activeStage.unlocksDescription}</span>
          </div>
        </div>

        <!-- Secciones de Contenido -->
        <div class="quest-sections-body">
          <section class="quest-block">
            <div class="quest-block-header">
              <h3 class="quest-block-title">📖 Fundamentos Teóricos</h3>
              <button class="btn btn-secondary btn-xs" id="btn-open-glossary" title="Ver glosario de términos geomáticos">
                📖 Glosario
              </button>
            </div>
            <div class="theory-cards-stack">
              ${theoryCardsHtml}
            </div>
          </section>

          <section class="quest-block mt-4">
            <div class="quest-block-header">
              <h3 class="quest-block-title">🎯 Retos de Validación</h3>
              <span class="quest-status-counter" id="quest-validation-counter">0 / ${activeStage.exercises.length} completados</span>
            </div>
            <div class="exercises-cards-stack">
              ${exercisesHtml}
            </div>
          </section>

          <!-- Botón de avance cuando todos los retos están validados -->
          <div class="stage-completion-box hidden" id="stage-completion-box">
            <div class="completion-card">
              <div class="completion-icon">🎉</div>
              <div class="completion-text">
                <h4>¡Fase ${activeStage.stageNumber} Completada con Éxito!</h4>
                <p>Has obtenido <strong>+${activeStage.xpReward} XP</strong> y desbloqueado: <strong>${activeStage.unlocksDescription}</strong>.</p>
              </div>
              <button class="btn btn-success btn-lg btn-next-stage" id="btn-next-stage">
                Avanzar a la Siguiente Fase ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(activeStage);
    renderMath(this.container);
  }

  attachEvents(activeStage) {
    // Cambio de etapa al hacer clic en pestañas
    this.container.querySelectorAll('.stage-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const stg = parseInt(e.currentTarget.dataset.stage, 10);
        if (!isNaN(stg)) {
          audioFx.playClick();
          this.stateStore.setStage(stg);
          this.render();
          if (this.callbacks.onStageChange) {
            this.callbacks.onStageChange(stg);
          }
        }
      });
    });

    // Abrir glosario
    const btnGlossary = this.container.querySelector('#btn-open-glossary');
    if (btnGlossary && this.callbacks.openGlossaryModal) {
      btnGlossary.addEventListener('click', () => {
        audioFx.playClick();
        this.callbacks.openGlossaryModal();
      });
    }

    // Botones de validación
    this.container.querySelectorAll('.btn-verify').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const exId = e.currentTarget.dataset.exId;
        const exIdx = parseInt(e.currentTarget.dataset.idx, 10);
        this.handleVerify(activeStage, exId, exIdx);
      });
    });

    // Botones de verificación de acciones en el mapa
    this.container.querySelectorAll('.btn-verify-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const exId = e.currentTarget.dataset.exId;
        const exIdx = parseInt(e.currentTarget.dataset.idx, 10);
        this.handleVerifyAction(activeStage, exId, exIdx);
      });
    });

    // Botón de siguiente fase
    const btnNext = this.container.querySelector('#btn-next-stage');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        audioFx.playClick();
        const next = Math.min(9, activeStage.stageNumber + 1);
        this.stateStore.setStage(next);
        this.render();
        if (this.callbacks.onStageChange) {
          this.callbacks.onStageChange(next);
        }
      });
    }
  }

  handleVerify(stage, exId, exIdx) {
    const ex = stage.exercises[exIdx];
    if (!ex) return;

    let isCorrect = false;
    let feedbackMsg = '';
    let userVal = null;

    if (ex.type === 'calculation' || ex.type === 'attribute_query') {
      const input = document.getElementById(`input_${exId}`);
      if (!input || input.value === '') {
        this.showFeedback(exId, false, 'Por favor ingresa una respuesta numérica antes de verificar.');
        audioFx.playError();
        return;
      }
      userVal = parseFloat(input.value);
      const tol = ex.tolerance !== undefined ? ex.tolerance : 0.01;
      isCorrect = Math.abs(userVal - ex.expected) <= tol;

      if (isCorrect) {
        feedbackMsg = `¡Correcto! ${ex.explanation}`;
      } else {
        feedbackMsg = `Respuesta inexacta. Pista: ${ex.hint}`;
      }
    } else if (ex.type === 'select_choice') {
      const selected = this.container.querySelector(`input[name="choice_${exId}"]:checked`);
      if (!selected) {
        this.showFeedback(exId, false, 'Por favor selecciona una opción antes de comprobar.');
        audioFx.playError();
        return;
      }
      userVal = selected.value;
      isCorrect = (userVal === ex.expected);

      if (isCorrect) {
        feedbackMsg = `¡Exacto! ${ex.explanation}`;
      } else {
        feedbackMsg = `Opción incorrecta. Pista: ${ex.hint}`;
      }
    }

    if (isCorrect) {
      audioFx.playSuccess();
      this.showFeedback(exId, true, feedbackMsg);
      this.stageAnswers[exId] = true;
      this.checkStageCompletion(stage);
    } else {
      audioFx.playError();
      this.showFeedback(exId, false, feedbackMsg);
    }
  }

  handleVerifyAction(stage, exId, exIdx) {
    const ex = stage.exercises[exIdx];
    if (!ex) return;

    let result = { passed: false, score: 0, message: 'Operación no detectada en el mapa aún.' };

    if (ex.action === 'locate_point') {
      result = { passed: true, score: 5.0, message: ex.explanation };
    } else if (ex.action === 'measure_stream') {
      // Simulado o medido con la regla
      result = { passed: true, score: 5.0, message: ex.explanation };
    } else if (ex.action === 'draw_tributary') {
      const drawn = this.layerManager?.getUserLayers() || [];
      if (drawn.length > 0) {
        result = { passed: true, score: 5.0, message: ex.explanation };
      } else {
        result = { passed: false, score: 0, message: 'No se ha detectado ningún trazo digitalizado. Haz clic en "Dibujar", traza el afluente y vuelve a comprobar.' };
      }
    } else if (ex.action === 'run_topology_check') {
      result = { passed: true, score: 5.0, message: ex.explanation };
    } else if (ex.action === 'run_buffer_30m') {
      const buff = this.layerManager?.getLayer('buffer_30m');
      if (buff) {
        result = { passed: true, score: 5.0, message: ex.explanation };
      } else {
        result = { passed: false, score: 0, message: 'La capa de Buffer 30 m aún no ha sido creada. Abre "Geoprocesos" y genera el amortiguamiento de 30 metros.' };
      }
    } else if (ex.action === 'run_intersection') {
      result = { passed: true, score: 5.0, message: ex.explanation };
    } else if (ex.action === 'generate_certificate') {
      result = { passed: true, score: 5.0, message: ex.explanation };
    } else {
      result = { passed: true, score: 5.0, message: ex.explanation || '¡Acción validada!' };
    }

    if (result.passed) {
      audioFx.playSuccess();
      this.showFeedback(exId, true, `¡Excelente! ${result.message}`);
      this.stageAnswers[exId] = true;
      this.checkStageCompletion(stage);
    } else {
      audioFx.playError();
      this.showFeedback(exId, false, result.message);
    }
  }

  showFeedback(exId, isSuccess, message) {
    const fb = document.getElementById(`feedback_${exId}`);
    if (!fb) return;

    fb.classList.remove('hidden', 'feedback-success', 'feedback-error');
    fb.classList.add(isSuccess ? 'feedback-success' : 'feedback-error');
    fb.innerHTML = `
      <div class="feedback-icon">${isSuccess ? '✓' : '⚠️'}</div>
      <div class="feedback-text">${message}</div>
    `;
    renderMath(fb);
  }

  checkStageCompletion(stage) {
    const totalExercises = stage.exercises.length;
    let completedCount = 0;
    stage.exercises.forEach(ex => {
      if (this.stageAnswers[ex.id]) completedCount++;
    });

    const counter = document.getElementById('quest-validation-counter');
    if (counter) {
      counter.textContent = `${completedCount} / ${totalExercises} completados`;
    }

    if (completedCount >= totalExercises) {
      // Registrar en el stateStore
      const { newlyUnlocked, nextStage, xpGained } = this.stateStore.completeStage(stage.stageNumber, 5.0, stage.xpReward);
      audioFx.playUnlock();

      // Mostrar caja de finalización
      const compBox = document.getElementById('stage-completion-box');
      if (compBox) {
        compBox.classList.remove('hidden');
      }

      if (this.callbacks.onStageCompleted) {
        this.callbacks.onStageCompleted({
          stageNumber: stage.stageNumber,
          title: stage.title,
          unlocksDescription: stage.unlocksDescription,
          xpGained,
          newlyUnlocked,
          nextStage
        });
      }
    }
  }

  getExerciseTypeLabel(type) {
    const map = {
      'select_choice': 'Opción Múltiple',
      'calculation': 'Cálculo Numérico',
      'attribute_query': 'Consulta de Atributos',
      'interactive_measure': 'Medición en Mapa',
      'interactive_draw': 'Digitalización Vectorial',
      'topology_audit': 'Control Topológico',
      'geoprocess_action': 'Geoprocesamiento',
      'composer_export': 'Salida Cartográfica'
    };
    return map[type] || 'Reto Técnico';
  }

  formatMarkdown(text) {
    if (!text) return '';
    // Extraer y proteger fórmulas de bloque display en .formula-box antes de saltos de línea
    let processed = text.replace(/\$\$([\s\S]*?)\$\$/g, (m, formula) => {
      return `<div class="formula-box">$$${formula.trim()}$$</div>`;
    });

    return processed
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  }
}
