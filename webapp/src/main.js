import { MapEngine } from './core/mapEngine.js';
import { LayerManager } from './core/layerManager.js';
import { stateStore, RANKS } from './core/stateStore.js';
import { audioFx } from './core/audioFx.js';
import { MeasurementTool } from './gis-tools/measurementTool.js';
import { DigitizerTool } from './gis-tools/digitizerTool.js';
import { TopologyChecker } from './gis-tools/topologyChecker.js';
import { GeoprocessingTool } from './gis-tools/geoprocessing.js';
import { ElevationProfileTool } from './gis-tools/elevationProfile.js';
import { GnssAuditTool } from './gis-tools/gnssAuditTool.js';
import { MapComposerTool } from './gis-tools/mapComposer.js';
import { Autograder } from './grading/autograder.js';
import { CertificateGenerator } from './grading/certificateGen.js';
import { WorkshopRunner } from './modules/workshopRunner.js';
import { DidacticSimulators } from './modules/didacticSimulators.js';
import {
  COURSE_INFO,
  MODULES_DATA,
  EVALUATIONS_DATA,
  BADGES_CATALOG,
  THEORY_WEEKS,
  LAB_GUIDES,
  GLOSSARY_EXPANDED,
  GEOSERVICES_DIRECTORY
} from './modules/courseData.js';
import { CURRICULUM_STAGES } from './modules/curriculumData.js';
import { renderMath } from './core/mathRenderer.js';

/**
 * GeoLab Iguaná · Aplicación WebGIS Gamificada & Academia Autónoma
 * Plataforma Autocontenida de Geomática, Ingeniería y SIG (Universidad EAFIT)
 */
class App {
  constructor() {
    this.mapEngine = null;
    this.layerManager = null;
    this.measurementTool = null;
    this.digitizerTool = null;
    this.topologyChecker = null;
    this.geoprocessing = null;
    this.elevationTool = null;
    this.gnssAudit = null;
    this.composer = null;
    this.autograder = null;
    this.certificateGen = null;
    this.workshopRunner = null;
    this.simulators = null;
    this.isMapMounted = false;
    this.activeRoadmapFilter = 'all';
  }

  async init() {
    console.log('🚀 Inicializando GeoLab Iguaná: Curso Autocontenido & Gamificado...');

    // 1. Inicializar herramientas analíticas auxiliares y simuladores
    this.elevationTool = new ElevationProfileTool();
    this.certificateGen = new CertificateGenerator(stateStore);
    this.simulators = new DidacticSimulators(stateStore);

    // 2. Conectar Eventos Globales de Navegación y Modales
    this.setupViewNavigation();
    this.setupToolbarEvents();
    this.setupStudentProfile();
    this.setupAttributeTableDrawer();
    this.setupModals();
    this.setupGlossaryFilter();

    // 3. Suscribirse a cambios de estado
    stateStore.subscribe(() => {
      this.syncUIWithState();
    });

    // 4. Sincronizar UI inicial
    await this.syncUIWithState();

    // 5. Renderizar contenido de las vistas
    this.renderHubRoadmap();
    this.renderHubSimulators();
    this.renderTheoryView();
    this.renderLabsView();
    this.renderGradesView();
    this.renderGlossaryView();
    renderMath(document.body);

    console.log('✨ GeoLab Iguaná listo: Curso autocontenido operativo.');
  }

  /**
   * Configura la navegación de pestañas principales (Inicio, Teoría, Labs, WebGIS, Misiones, Notas, Glosario)
   */
  setupViewNavigation() {
    const navButtons = document.querySelectorAll('.view-tab-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });
  }

  /**
   * Cambia la vista activa de la aplicación
   */
  async switchView(viewName) {
    audioFx.playClick();
    stateStore.setCurrentView(viewName);

    // Actualizar botones de navegación
    document.querySelectorAll('.view-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.view === viewName);
    });

    // Ocultar todos los contenedores de vista
    const viewContainers = [
      'view-hub',
      'view-theory',
      'view-labs',
      'view-webgis',
      'view-quest',
      'view-grades',
      'view-glossary'
    ];

    viewContainers.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });

    // Mostrar el contenedor activo
    const targetEl = document.getElementById(`view-${viewName}`);
    if (targetEl) {
      targetEl.classList.remove('hidden');
      renderMath(targetEl);
    }

    // Si entra a WebGIS, montar el motor Leaflet si no estaba montado e invalidar tamaño
    if (viewName === 'webgis') {
      if (!this.isMapMounted) {
        await this.mountGisEngine();
      }
      setTimeout(() => {
        if (this.mapEngine?.map) {
          this.mapEngine.map.invalidateSize();
        }
      }, 80);
    }

    // Si entra a Misiones, renderizar el runner de aventura
    if (viewName === 'quest') {
      if (!this.workshopRunner) {
        await this.mountGisEngine();
      }
      this.renderQuestSelectorGrid();
      this.workshopRunner?.render();
    }

    // Si entra a Calificaciones, actualizar tabla de notas
    if (viewName === 'grades') {
      this.renderGradesView();
    }
  }

  /**
   * Sincroniza la barra superior y los indicadores con el estado actual
   */
  async syncUIWithState() {
    const state = stateStore.getState();
    const rank = stateStore.getRank();
    const nextRank = stateStore.getNextRank();

    // Actualizar Encabezado (XP y Nivel)
    const xpPill = document.getElementById('header-xp-pill');
    if (xpPill) {
      xpPill.textContent = `${state.xp || 0} XP · Nivel ${rank.level} (${rank.title})`;
    }

    // Actualizar Perfil del Estudiante en Header
    const nameElem = document.getElementById('header-student-name');
    const codeElem = document.getElementById('header-student-code');
    const avatarElem = document.getElementById('avatar-initials');

    const studentName = state.student?.name || 'Estudiante EAFIT';
    const studentCode = state.student?.code || '202710001010';

    if (nameElem) nameElem.textContent = studentName;
    if (codeElem) codeElem.textContent = studentCode;
    if (avatarElem) {
      const initials = studentName.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
      avatarElem.textContent = initials || 'EA';
    }

    // Actualizar Tarjeta Gamificada en el Hub
    const hubName = document.getElementById('hub-student-name');
    const hubMeta = document.getElementById('hub-student-meta');
    const hubAvatar = document.getElementById('hub-avatar-large');
    const hubRankBadge = document.getElementById('hub-student-rank-badge');
    const hubProgressText = document.getElementById('hub-level-progress-text');
    const hubBarFill = document.getElementById('hub-level-bar-fill');

    if (hubName) hubName.textContent = studentName;
    if (hubMeta) hubMeta.textContent = `Código: ${studentCode} · ${state.student?.program || 'Ingeniería Civil'}`;
    if (hubAvatar) {
      const initials = studentName.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
      hubAvatar.textContent = initials || 'EA';
    }
    if (hubRankBadge) {
      hubRankBadge.textContent = `${rank.badge} ${rank.title}`;
    }

    // Cálculo de porcentaje para subir de nivel
    if (hubProgressText && hubBarFill) {
      if (nextRank) {
        const curBase = rank.minXp;
        const target = nextRank.minXp;
        const gainedInLevel = (state.xp || 0) - curBase;
        const needed = target - curBase;
        const pct = Math.max(5, Math.min(100, Math.round((gainedInLevel / needed) * 100)));
        hubProgressText.textContent = `${state.xp || 0} / ${target} XP (Nivel ${rank.level})`;
        hubBarFill.style.width = `${pct}%`;
      } else {
        hubProgressText.textContent = `${state.xp || 0} XP (Nivel Máximo)`;
        hubBarFill.style.width = '100%';
      }
    }
  }

  /**
   * Monta el motor Leaflet y las herramientas SIG
   */
  async mountGisEngine() {
    if (this.isMapMounted) return;
    this.isMapMounted = true;

    // 1. Iniciar Leaflet en el contenedor
    this.mapEngine = new MapEngine('map-view');
    const map = this.mapEngine.init();

    // 2. Iniciar Gestor de Capas Vectoriales
    this.layerManager = new LayerManager(map);
    await this.layerManager.loadInitialLayers();

    // 3. Iniciar Herramientas Espaciales
    this.measurementTool = new MeasurementTool(map);
    this.digitizerTool = new DigitizerTool(map, this.layerManager);
    this.topologyChecker = new TopologyChecker(map, this.layerManager);
    this.geoprocessing = new GeoprocessingTool(this.layerManager);
    this.gnssAudit = new GnssAuditTool(this.layerManager);
    this.composer = new MapComposerTool(stateStore, this.layerManager);
    this.autograder = new Autograder(stateStore, this.layerManager);

    // 4. Iniciar Guía Interactiva de Misiones (Modo Aventura)
    this.workshopRunner = new WorkshopRunner(
      'panel-workshop',
      stateStore,
      this.autograder,
      this.layerManager,
      {
        openGlossaryModal: () => this.openGlossaryModal(),
        onStageCompleted: (info) => this.handleStageCompleted(info),
        onStageChange: () => this.syncUIWithState()
      }
    );

    // 5. Suscribir a cambios en capas
    this.renderLayerList();
    this.layerManager.subscribe(() => {
      this.renderLayerList();
      this.renderAttributeTable();
    });

    this.renderAttributeTable();
  }

  /**
   * Renderiza el Mapa de Ruta (Roadmap) de 16 semanas en el Hub
   */
  renderHubRoadmap() {
    const grid = document.getElementById('hub-roadmap-grid');
    if (!grid) return;

    const state = stateStore.getState();
    const filter = this.activeRoadmapFilter;

    // Filtrar semanas según módulo seleccionado
    const filteredWeeks = THEORY_WEEKS.filter(w => {
      if (filter === 'all') return true;
      return w.moduleId === filter;
    });

    grid.innerHTML = filteredWeeks.map(w => {
      const mod = MODULES_DATA.find(m => m.id === w.moduleId);
      const isCompleted = state.completedTheory[w.week];
      const evalItem = EVALUATIONS_DATA.find(e => e.week === w.week);
      const labItem = LAB_GUIDES.find(g => g.week === w.week);

      return `
        <article class="hub-week-card ${evalItem ? 'eval-highlight' : ''}">
          <div class="hub-week-top">
            <span class="hub-week-badge" style="border-left: 3px solid ${mod?.badgeColor || '#10B981'};">
              ${w.moduleId} · Semana ${w.week}
            </span>
            ${evalItem ? `<span class="hub-eval-tag">${evalItem.code} (${evalItem.weight}%)</span>` : ''}
          </div>

          <h4 class="hub-week-title">${w.title}</h4>
          <p class="hub-week-desc">${w.subtitle}</p>

          <div style="font-size: 11px; color: var(--text-muted); display: flex; align-items: center; justify-content: space-between;">
            <span>⏱️ ${w.readingTime}</span>
            <span style="color: ${isCompleted ? 'var(--accent)' : 'var(--text-muted)'}; font-weight: 600;">
              ${isCompleted ? '✓ Leída (+50 XP)' : '○ Pendiente'}
            </span>
          </div>

          <div class="hub-week-actions">
            <button class="btn btn-primary btn-xs btn-open-theory-week" data-week="${w.week}">
              📖 Leer Teoría
            </button>
            ${labItem ? `
              <button class="btn btn-secondary btn-xs btn-open-lab-guide" data-guide="${labItem.code}">
                🛠️ Taller ${labItem.code}
              </button>
            ` : ''}
            <button class="btn btn-secondary btn-xs btn-jump-webgis" title="Explorar en mapa">
              🗺️ SIG
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Conectar eventos de botones de la tarjeta
    grid.querySelectorAll('.btn-open-theory-week').forEach(btn => {
      btn.addEventListener('click', () => {
        const week = parseInt(btn.dataset.week, 10);
        stateStore.setTheoryWeek(week);
        this.switchView('theory');
        this.renderTheoryView();
      });
    });

    grid.querySelectorAll('.btn-open-lab-guide').forEach(btn => {
      btn.addEventListener('click', () => {
        const guide = btn.dataset.guide;
        stateStore.setLabGuide(guide);
        this.switchView('labs');
        this.renderLabsView();
      });
    });

    grid.querySelectorAll('.btn-jump-webgis').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchView('webgis');
      });
    });

    // Conectar botones de filtro de módulos
    const filtersBar = document.getElementById('hub-module-filters');
    if (filtersBar) {
      filtersBar.querySelectorAll('.hub-filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          filtersBar.querySelectorAll('.hub-filter-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.activeRoadmapFilter = pill.dataset.mod;
          this.renderHubRoadmap();
          audioFx.playClick();
        });
      });
    }

    renderMath(grid);
  }

  /**
   * Monta los simuladores interactivos didácticos en el Hub
   */
  renderHubSimulators() {
    const container = document.getElementById('hub-simulators-container');
    if (!container || !this.simulators) return;

    container.innerHTML = `
      <div id="hub-sim-photocopier-box"></div>
      <div id="hub-sim-ctm12-box"></div>
      <div id="hub-sim-buffer-box"></div>
      <div id="hub-sim-elevation-box"></div>
      <div id="hub-sim-gnss-box"></div>
      <div id="hub-sim-ndvi-box"></div>
    `;

    this.simulators.renderPhotocopierSimulator(document.getElementById('hub-sim-photocopier-box'));
    this.simulators.renderCtm12Converter(document.getElementById('hub-sim-ctm12-box'));
    this.simulators.renderBufferSimulator(document.getElementById('hub-sim-buffer-box'));
    this.simulators.renderElevationSimulator(document.getElementById('hub-sim-elevation-box'));
    this.simulators.renderGnssSimulator(document.getElementById('hub-sim-gnss-box'));
    this.simulators.renderNdviSimulator(document.getElementById('hub-sim-ndvi-box'));

    renderMath(container);
  }

  /**
   * Renderiza la vista completa de Teoría (S01 a S16)
   */
  renderTheoryView() {
    const sidebar = document.getElementById('theory-weeks-list');
    const contentPane = document.getElementById('theory-content-pane');
    if (!sidebar || !contentPane) return;

    const state = stateStore.getState();
    const activeWeekNum = state.selectedTheoryWeek || 1;
    const activeWeek = THEORY_WEEKS.find(w => w.week === activeWeekNum) || THEORY_WEEKS[0];
    const mod = MODULES_DATA.find(m => m.id === activeWeek.moduleId);
    const isCompleted = state.completedTheory[activeWeek.week];

    // 1. Renderizar lista lateral de semanas
    sidebar.innerHTML = THEORY_WEEKS.map(w => {
      const isActive = w.week === activeWeekNum;
      const isDone = state.completedTheory[w.week];
      return `
        <button class="theory-week-nav-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" data-week="${w.week}">
          <span class="nav-week-num">${w.moduleId} · Semana ${w.week}</span>
          <span class="nav-week-title">${w.title}</span>
        </button>
      `;
    }).join('');

    sidebar.querySelectorAll('.theory-week-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const week = parseInt(btn.dataset.week, 10);
        stateStore.setTheoryWeek(week);
        this.renderTheoryView();
        audioFx.playClick();
      });
    });

    // 2. Renderizar contenido de la semana activa
    contentPane.innerHTML = `
      <div class="theory-header-box">
        <div class="theory-tag-row">
          <span class="hub-week-badge" style="border-left: 3px solid ${mod?.badgeColor || '#10B981'};">
            ${activeWeek.moduleId} · ${mod?.title || ''}
          </span>
          <span class="badge-exercise-num">Semana ${activeWeek.week}</span>
          <span style="font-size: 11.5px; color: var(--text-muted);">⏱️ ${activeWeek.readingTime}</span>
        </div>
        <h2 class="theory-main-title">${activeWeek.title}</h2>
        <p class="theory-main-subtitle">${activeWeek.subtitle}</p>
      </div>

      <!-- Objetivos de Aprendizaje -->
      <section class="theory-objectives-box">
        <h4 class="theory-objectives-title">🎯 Objetivos de Aprendizaje</h4>
        <ul class="theory-objectives-list">
          ${activeWeek.objectives.map(obj => `<li>${obj}</li>`).join('')}
        </ul>
      </section>

      <!-- Artículo Teórico Enriquecido -->
      <article class="theory-article-container">
        ${activeWeek.contentHtml}
      </article>

      <!-- Contenedor para Widget Didáctico Específico de la Semana -->
      <div id="theory-embedded-simulator" style="margin: 24px 0;"></div>

      <!-- Reto de Autocomprobación Conceptual -->
      ${activeWeek.quiz ? `
        <section class="exercise-card mt-4" id="theory-quiz-card" style="border-color: var(--accent-border);">
          <div class="exercise-card-header">
            <span class="badge-exercise-num">Autocomprobación</span>
            <span class="badge-exercise-type">Validación Inmediata (+25 XP)</span>
          </div>
          <p class="exercise-question-text">${activeWeek.quiz.question}</p>
          <div class="exercise-choices-list">
            ${activeWeek.quiz.options.map((opt, i) => `
              <label class="choice-option-label" for="th_opt_${i}">
                <input type="radio" name="theory_quiz_choice" id="th_opt_${i}" value="${i}">
                <span class="choice-text">${opt}</span>
              </label>
            `).join('')}
          </div>
          <div style="margin-top: 14px; display: flex; align-items: center; justify-content: space-between;">
            <button class="btn btn-primary btn-sm" id="btn-verify-theory-quiz">
              Comprobar Respuesta
            </button>
            <span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">
              Pista disponible si fallas
            </span>
          </div>
          <div class="exercise-feedback-box hidden" id="theory-quiz-feedback"></div>
        </section>
      ` : ''}

      <!-- Botón de Conclusión de Lectura -->
      <div style="margin-top: 32px; padding: 20px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h4 style="font-size: 14.5px; color: var(--text-primary); margin-bottom: 2px;">
            ${isCompleted ? '✓ Lección Completada con Éxito' : '¿Terminaste de estudiar esta lección?'}
          </h4>
          <span style="font-size: 12px; color: var(--text-secondary);">
            ${isCompleted ? 'Ya has sumado los +50 XP a tu expediente académico.' : 'Márcala como completada para ganar +50 XP y desbloquear insignias.'}
          </span>
        </div>
        <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} btn-md" id="btn-complete-theory" ${isCompleted ? 'disabled' : ''}>
          ${isCompleted ? '✓ Completada' : 'Marcar Lección Completada (+50 XP)'}
        </button>
      </div>
    `;

    // Montar simulador interactivo embebido según la semana activa
    const simBox = document.getElementById('theory-embedded-simulator');
    if (simBox && this.simulators) {
      if (activeWeek.week === 2) this.simulators.renderPhotocopierSimulator(simBox);
      else if (activeWeek.week === 3) this.simulators.renderCtm12Converter(simBox);
      else if (activeWeek.week === 7) this.simulators.renderBufferSimulator(simBox);
      else if (activeWeek.week === 11) this.simulators.renderElevationSimulator(simBox);
      else if (activeWeek.week === 12) this.simulators.renderGnssSimulator(simBox);
      else if (activeWeek.week === 13) this.simulators.renderNdviSimulator(simBox);
    }

    // Conectar autocomprobación de quiz teórico
    const btnQuiz = document.getElementById('btn-verify-theory-quiz');
    if (btnQuiz && activeWeek.quiz) {
      btnQuiz.addEventListener('click', () => {
        const selected = document.querySelector('input[name="theory_quiz_choice"]:checked');
        const fb = document.getElementById('theory-quiz-feedback');
        if (!selected) {
          alert('Por favor selecciona una opción antes de comprobar.');
          return;
        }

        const chosenIdx = parseInt(selected.value, 10);
        if (chosenIdx === activeWeek.quiz.correctIndex) {
          audioFx.playSuccess();
          fb.classList.remove('hidden', 'feedback-error');
          fb.classList.add('feedback-success');
          fb.innerHTML = `<div class="feedback-icon">✓</div><div class="feedback-text">${activeWeek.quiz.explanation} (+25 XP)</div>`;
          stateStore.addXp(25, `Quiz teórico semana ${activeWeek.week}`);
        } else {
          audioFx.playWarning();
          fb.classList.remove('hidden', 'feedback-success');
          fb.classList.add('feedback-error');
          fb.innerHTML = `<div class="feedback-icon">⚠️</div><div class="feedback-text">Incorrecto. Pista: ${activeWeek.quiz.hint}</div>`;
        }
        renderMath(fb);
      });
    }

    // Conectar botón de completar lección
    const btnComplete = document.getElementById('btn-complete-theory');
    if (btnComplete) {
      btnComplete.addEventListener('click', () => {
        audioFx.playSuccess();
        stateStore.completeTheoryWeek(activeWeek.week, 50);
        this.renderTheoryView();
        this.renderHubRoadmap();
      });
    }

    // Renderizar todas las ecuaciones y expresiones KaTeX de la lección
    renderMath(contentPane);
  }

  /**
   * Renderiza la vista completa de Laboratorios (G01 a G16)
   */
  renderLabsView() {
    const sidebar = document.getElementById('labs-list');
    const contentPane = document.getElementById('labs-content-pane');
    if (!sidebar || !contentPane) return;

    const state = stateStore.getState();
    const activeGuideCode = state.selectedLabGuide || 'G01';
    const activeGuide = LAB_GUIDES.find(g => g.code === activeGuideCode) || LAB_GUIDES[0];
    const isCompleted = state.completedLabs[activeGuide.code];

    // 1. Renderizar lista lateral de guías
    sidebar.innerHTML = LAB_GUIDES.map(g => {
      const isActive = g.code === activeGuideCode;
      const isDone = state.completedLabs[g.code];
      return `
        <button class="lab-nav-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" data-guide="${g.code}">
          <span class="lab-nav-code">${g.code} · Semana ${g.week} (${g.moduleId})</span>
          <span class="lab-nav-title">${g.title}</span>
        </button>
      `;
    }).join('');

    sidebar.querySelectorAll('.lab-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const guide = btn.dataset.guide;
        stateStore.setLabGuide(guide);
        this.renderLabsView();
        audioFx.playClick();
      });
    });

    // 2. Renderizar contenido de la guía activa
    contentPane.innerHTML = `
      <div class="theory-header-box">
        <div class="theory-tag-row">
          <span class="hub-eval-tag">${activeGuide.code}</span>
          <span class="hub-week-badge">${activeGuide.moduleId} · Semana ${activeGuide.week}</span>
          <span style="font-size: 11.5px; color: var(--text-muted);">⏱️ ${activeGuide.duration}</span>
        </div>
        <h2 class="theory-main-title">${activeGuide.title}</h2>
        <p class="theory-main-subtitle">${activeGuide.summary}</p>
      </div>

      <div class="lab-meta-bar">
        <div><strong>Software:</strong> ${activeGuide.software}</div>
        <div>•</div>
        <div><strong>Modalidad:</strong> ${activeGuide.modality}</div>
        <div>•</div>
        <div><strong>Insumos:</strong> ${activeGuide.dataRequired}</div>
      </div>

      <h3 style="font-size: 16px; margin: 20px 0 12px 0;">📋 Procedimiento Paso a Paso</h3>
      <div class="lab-steps-list">
        ${activeGuide.steps.map((step, idx) => `
          <div class="lab-step-item">
            <span class="step-num-badge">${idx + 1}</span>
            <div class="step-text">${step}</div>
          </div>
        `).join('')}
      </div>

      <div class="callout-card tip mt-4">
        <div class="callout-icon">📦</div>
        <div class="callout-content">
          <strong>Entregable Oficial:</strong> ${activeGuide.deliverable}
        </div>
      </div>

      <!-- Botones de Acción de Laboratorio -->
      <div style="margin-top: 28px; display: flex; gap: 12px; align-items: center;">
        <button class="btn btn-primary btn-lg" id="btn-jump-lab-to-webgis">
          🗺️ Abrir Práctica en Estación WebGIS ➔
        </button>
        <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-accent'} btn-lg" id="btn-complete-lab" ${isCompleted ? 'disabled' : ''}>
          ${isCompleted ? '✓ Taller Superado' : 'Marcar Taller Superado (+75 XP)'}
        </button>
      </div>
    `;

    document.getElementById('btn-jump-lab-to-webgis')?.addEventListener('click', () => {
      this.switchView('webgis');
    });

    document.getElementById('btn-complete-lab')?.addEventListener('click', () => {
      audioFx.playSuccess();
      stateStore.completeLabGuide(activeGuide.code, 75);
      this.renderLabsView();
      this.renderHubRoadmap();
    });

    // Renderizar ecuaciones matemáticas KaTeX en el contenido de laboratorios
    renderMath(contentPane);
  }

  /**
   * Renderiza el selector de etapas en el Modo Aventura (Quest)
   */
  renderQuestSelectorGrid() {
    const grid = document.getElementById('quest-stages-selector-grid');
    if (!grid) return;

    const state = stateStore.getState();
    const curStage = state.currentStage || 0;

    grid.innerHTML = CURRICULUM_STAGES.map(s => {
      const isCur = s.stageNumber === curStage;
      const isDone = state.workshopProgress[`stage_${s.stageNumber}`]?.completed;
      return `
        <div class="hub-week-card ${isCur ? 'active' : ''}" style="cursor: pointer; padding: 12px;" data-stage="${s.stageNumber}">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="badge-exercise-num">Fase ${s.stageNumber}</span>
            <span style="font-size: 11px; color: ${isDone ? 'var(--accent)' : 'var(--text-muted)'};">
              ${isDone ? '✓ Completada' : '+ ' + s.xpReward + ' XP'}
            </span>
          </div>
          <h4 style="font-size: 13px; font-weight: 700; margin-top: 4px;">${s.title}</h4>
          <span style="font-size: 11px; color: var(--text-muted);">${s.subtitle}</span>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.hub-week-card').forEach(card => {
      card.addEventListener('click', () => {
        const stageNum = parseInt(card.dataset.stage, 10);
        stateStore.setStage(stageNum);
        this.renderQuestSelectorGrid();
        this.workshopRunner?.render();
        audioFx.playClick();
      });
    });
  }

  /**
   * Renderiza la vista de Calificaciones Oficiales & Muro de Insignias
   */
  renderGradesView() {
    const tbody = document.getElementById('grades-table-body');
    const avgElem = document.getElementById('grades-weighted-average');
    const badgesGrid = document.getElementById('badges-grid-container');
    if (!tbody) return;

    const state = stateStore.getState();
    const grades = state.officialGrades || {};

    let totalWeightEvaluated = 0;
    let accumulatedScore = 0;

    tbody.innerHTML = EVALUATIONS_DATA.map(ev => {
      const currentScore = grades[ev.code] !== null && grades[ev.code] !== undefined ? grades[ev.code] : 4.5;
      const weighted = Number(((currentScore * ev.weight) / 100).toFixed(2));

      totalWeightEvaluated += ev.weight;
      accumulatedScore += weighted;

      return `
        <tr>
          <td><strong style="color: var(--accent); font-family: var(--font-mono);">${ev.code}</strong></td>
          <td>${ev.title}</td>
          <td>${ev.weight}%</td>
          <td>Semana ${ev.week}</td>
          <td><span class="hub-week-badge">${ev.type}</span></td>
          <td>
            <input type="number" step="0.1" min="0.0" max="5.0" value="${currentScore.toFixed(1)}" class="grade-input-box" data-code="${ev.code}">
          </td>
          <td style="font-family: var(--font-mono); font-weight: 700; color: #38BDF8;">
            ${weighted.toFixed(2)}
          </td>
        </tr>
      `;
    }).join('');

    if (avgElem) {
      const finalAverage = (accumulatedScore * (100 / totalWeightEvaluated)).toFixed(1);
      avgElem.textContent = `${finalAverage} / 5.0`;
      avgElem.style.color = finalAverage >= 3.0 ? 'var(--accent)' : '#EF4444';
    }

    // Conectar inputs de nota
    tbody.querySelectorAll('.grade-input-box').forEach(input => {
      input.addEventListener('change', (e) => {
        const code = e.target.dataset.code;
        const val = parseFloat(e.target.value);
        if (!isNaN(val) && val >= 0.0 && val <= 5.0) {
          stateStore.setOfficialGrade(code, val);
          this.renderGradesView();
        }
      });
    });

    // Muro de Insignias
    if (badgesGrid) {
      const unlockedList = state.unlockedBadges || [];
      badgesGrid.innerHTML = BADGES_CATALOG.map(b => {
        const isUnlocked = unlockedList.includes(b.id);
        return `
          <div class="badge-item-card ${isUnlocked ? 'unlocked' : 'locked'}">
            <div class="badge-big-icon">${b.icon}</div>
            <div class="badge-name">${b.name}</div>
            <div class="badge-desc">${b.description}</div>
            <div style="font-size: 10.5px; font-family: var(--font-mono); color: var(--accent); margin-top: 4px;">
              ${isUnlocked ? '✓ DESBLOQUEADA' : `🔒 +${b.xpReward} XP`}
            </div>
          </div>
        `;
      }).join('');
    }

    // Botón para abrir el Acta Oficial
    document.getElementById('grades-btn-open-acta')?.addEventListener('click', () => {
      this.openActaModal();
    });
  }

  /**
   * Renderiza la vista de Glosario y Directorio de Geoservicios
   */
  renderGlossaryView() {
    const cardsGrid = document.getElementById('glossary-cards-grid');
    const geoGrid = document.getElementById('geoservices-cards-grid');
    if (!cardsGrid) return;

    cardsGrid.innerHTML = GLOSSARY_EXPANDED.map(item => `
      <div class="bento-card" style="padding: 16px;">
        <h4 style="font-size: 14.5px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
          ${item.term}
        </h4>
        <p style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.5;">
          ${item.def}
        </p>
      </div>
    `).join('');

    if (geoGrid) {
      geoGrid.innerHTML = GEOSERVICES_DIRECTORY.map(s => `
        <div class="bento-card" style="padding: 16px;">
          <span class="hub-eval-tag" style="margin-bottom: 8px; display: inline-block;">${s.type}</span>
          <h4 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
            ${s.name}
          </h4>
          <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 10px;">
            ${s.description}
          </p>
          <a href="${s.url}" target="_blank" rel="noopener noreferrer" style="font-size: 11.5px; color: var(--accent); text-decoration: none; font-weight: 600;">
            Visitar portal oficial ➔
          </a>
        </div>
      `).join('');
    }

    renderMath(cardsGrid);
  }

  setupGlossaryFilter() {
    const input = document.getElementById('input-glossary-filter');
    if (!input) return;

    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const cardsGrid = document.getElementById('glossary-cards-grid');
      if (!cardsGrid) return;

      const filtered = GLOSSARY_EXPANDED.filter(item => {
        return item.term.toLowerCase().includes(q) || item.def.toLowerCase().includes(q);
      });

      cardsGrid.innerHTML = filtered.map(item => `
        <div class="bento-card" style="padding: 16px;">
          <h4 style="font-size: 14.5px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
            ${item.term}
          </h4>
          <p style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.5;">
            ${item.def}
          </p>
        </div>
      `).join('');
    });
  }

  /**
   * Configura eventos de la barra de herramientas SIG
   */
  setupToolbarEvents() {
    // Selector de Mapa Base
    document.getElementById('select-basemap')?.addEventListener('change', (e) => {
      if (this.mapEngine) {
        this.mapEngine.setBaseLayer(e.target.value);
      }
      audioFx.playClick();
    });

    // Herramienta de Medición
    const btnMeasure = document.getElementById('btn-tool-measure');
    if (btnMeasure) {
      btnMeasure.addEventListener('click', () => {
        audioFx.playClick();
        if (!this.measurementTool) return;
        if (this.measurementTool.active) {
          this.measurementTool.stop();
          btnMeasure.classList.remove('active');
        } else {
          this.digitizerTool?.stop();
          document.getElementById('btn-tool-digitize')?.classList.remove('active');
          this.measurementTool.start();
          btnMeasure.classList.add('active');
        }
      });
    }

    // Herramienta de Digitalización
    const btnDigitize = document.getElementById('btn-tool-digitize');
    if (btnDigitize) {
      btnDigitize.addEventListener('click', () => {
        audioFx.playClick();
        if (!this.digitizerTool) return;
        if (this.digitizerTool.mode) {
          this.digitizerTool.stop();
          btnDigitize.classList.remove('active');
        } else {
          this.measurementTool?.stop();
          document.getElementById('btn-tool-measure')?.classList.remove('active');
          this.digitizerTool.start('line');
          btnDigitize.classList.add('active');
        }
      });
    }

    // Snapping toggle
    const btnSnap = document.getElementById('btn-tool-snap');
    if (btnSnap) {
      btnSnap.addEventListener('click', () => {
        audioFx.playClick();
        if (this.digitizerTool) {
          this.digitizerTool.snappingEnabled = !this.digitizerTool.snappingEnabled;
          btnSnap.classList.toggle('active', this.digitizerTool.snappingEnabled);
        }
      });
    }

    // Topología
    document.getElementById('btn-tool-topology')?.addEventListener('click', () => {
      audioFx.playClick();
      if (this.topologyChecker) {
        const report = this.topologyChecker.auditUserFeatures();
        alert(`Auditoría Topológica:\n- Total objetos evaluados: ${report.totalFeatures}\n- Inconsistencias detectadas: ${report.errorsCount}\n\nRevisa los marcadores rojos en el mapa.`);
      }
    });

    // Modales de herramientas
    document.getElementById('btn-tool-geoprocess')?.addEventListener('click', () => this.openModal('modal-geoprocess'));
    document.getElementById('btn-tool-elevation')?.addEventListener('click', () => {
      this.openModal('modal-elevation');
      setTimeout(() => {
        const canvas = document.getElementById('elevation-canvas');
        if (canvas && this.elevationTool) this.elevationTool.renderToCanvas(canvas);
      }, 100);
    });

    document.getElementById('btn-tool-gnss')?.addEventListener('click', () => {
      this.openModal('modal-gnss');
      this.renderGnssAuditModal();
    });

    document.getElementById('btn-tool-composer')?.addEventListener('click', () => {
      this.openModal('modal-composer');
      setTimeout(() => {
        const canvas = document.getElementById('composer-preview-canvas');
        if (canvas && this.composer) this.composer.renderPreview(canvas);
      }, 100);
    });

    // Zoom a la Cuenca
    document.getElementById('btn-zoom-extent')?.addEventListener('click', () => {
      audioFx.playClick();
      this.layerManager?.zoomToLayer('cuenca');
    });

    // Botones de sonido y reset
    document.getElementById('btn-toggle-sound')?.addEventListener('click', () => {
      const enabled = audioFx.toggleSound();
      document.getElementById('btn-toggle-sound').textContent = enabled ? '🔊' : '🔇';
    });

    document.getElementById('btn-reset-course')?.addEventListener('click', () => {
      if (confirm('¿Deseas reiniciar tu progreso en el curso? Tus datos de estudiante se conservarán.')) {
        audioFx.playClick();
        stateStore.resetProgress();
        this.syncUIWithState();
        this.renderHubRoadmap();
        this.renderTheoryView();
        this.renderLabsView();
        this.renderGradesView();
      }
    });
  }

  /**
   * Renderiza el Árbol de Capas (TOC)
   */
  renderLayerList() {
    const container = document.getElementById('layers-list-container');
    if (!container || !this.layerManager) return;

    const layers = this.layerManager.getAllLayers();
    container.innerHTML = Object.values(layers).map(layer => `
      <div class="layer-item" data-layer-id="${layer.id}">
        <div class="layer-main-row">
          <label class="layer-label-group">
            <input type="checkbox" class="layer-toggle-chk" ${layer.visible ? 'checked' : ''} data-layer-id="${layer.id}">
            <div class="layer-swatch" style="background-color: ${layer.style?.fillColor || layer.style?.color || '#3B82F6'};"></div>
            <span class="layer-name">${layer.name}</span>
          </label>
          <div class="layer-actions">
            <button class="btn-layer-action btn-zoom-layer" data-layer-id="${layer.id}" title="Zoom a la capa">🔍</button>
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.layer-toggle-chk').forEach(chk => {
      chk.addEventListener('change', (e) => {
        this.layerManager.toggleLayerVisibility(e.target.dataset.layerId, e.target.checked);
        audioFx.playClick();
      });
    });

    container.querySelectorAll('.btn-zoom-layer').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.layerId;
        this.layerManager.zoomToLayer(id);
        audioFx.playClick();
      });
    });
  }

  /**
   * Renderiza la Tabla de Atributos Drawer
   */
  renderAttributeTable() {
    const tbody = document.getElementById('attr-table-body');
    const thead = document.getElementById('attr-table-head');
    const statsBadge = document.getElementById('table-stats-badge');
    const titleElem = document.getElementById('table-layer-title');

    if (!tbody || !thead || !this.layerManager) return;

    const layer = this.layerManager.getLayer(this.activeTableLayerId || 'equipamientos');
    if (!layer || !layer.geojson || !layer.geojson.features) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Sin datos para mostrar</td></tr>';
      return;
    }

    if (titleElem) titleElem.textContent = layer.name;
    const features = layer.geojson.features;
    if (statsBadge) statsBadge.textContent = `${features.length} registros`;

    if (features.length === 0) {
      thead.innerHTML = '';
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Capa vacía</td></tr>';
      return;
    }

    const sampleProps = features[0].properties || {};
    const columns = Object.keys(sampleProps);

    thead.innerHTML = `<tr>${columns.map(c => `<th>${c}</th>`).join('')}</tr>`;
    tbody.innerHTML = features.slice(0, 50).map(f => {
      return `<tr>${columns.map(c => `<td>${f.properties[c] !== undefined ? f.properties[c] : ''}</td>`).join('')}</tr>`;
    }).join('');
  }

  setupAttributeTableDrawer() {
    const btnToggle = document.getElementById('btn-toggle-table');
    const drawer = document.getElementById('attribute-drawer');
    const btnClose = document.getElementById('btn-close-drawer');

    if (btnToggle && drawer) {
      btnToggle.addEventListener('click', () => {
        audioFx.playClick();
        drawer.classList.toggle('collapsed');
      });
    }

    if (btnClose && drawer) {
      btnClose.addEventListener('click', () => {
        audioFx.playClick();
        drawer.classList.add('collapsed');
      });
    }
  }

  setupStudentProfile() {
    const btnProfile = document.getElementById('btn-student-profile');
    const hubBtnEdit = document.getElementById('hub-btn-edit-profile');
    const modal = document.getElementById('modal-student');
    const btnSave = document.getElementById('btn-save-student');
    const btnCancel = document.getElementById('btn-cancel-student');

    const openProfile = () => {
      const state = stateStore.getState();
      document.getElementById('input-student-name').value = state.student?.name || '';
      document.getElementById('input-student-code').value = state.student?.code || '';
      document.getElementById('select-student-program').value = state.student?.program || 'Ingeniería Civil';
      this.openModal('modal-student');
    };

    btnProfile?.addEventListener('click', openProfile);
    hubBtnEdit?.addEventListener('click', openProfile);

    btnCancel?.addEventListener('click', () => {
      this.closeModal('modal-student');
    });

    btnSave?.addEventListener('click', () => {
      const name = document.getElementById('input-student-name').value.trim();
      const code = document.getElementById('input-student-code').value.trim();
      const program = document.getElementById('select-student-program').value;

      if (!name) {
        alert('Por favor ingresa tu nombre completo.');
        return;
      }

      stateStore.updateStudent({ name, code, program });
      audioFx.playSuccess();
      this.closeModal('modal-student');
      this.syncUIWithState();
    });

    document.getElementById('hub-btn-view-acta')?.addEventListener('click', () => {
      this.openActaModal();
    });
  }

  openActaModal() {
    this.openModal('modal-acta');
    this.renderActaModalContent();
  }

  async renderActaModalContent() {
    const container = document.getElementById('acta-modal-content');
    if (!container || !this.certificateGen) return;

    const payload = await this.certificateGen.generateActaPayload();
    container.innerHTML = `
      <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 13.5px; font-weight: 700; color: var(--text-primary);">${payload.student.name}</span>
          <span class="badge-exercise-type">${payload.student.code}</span>
        </div>
        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">
          ${payload.student.institution} · ${payload.student.program}
        </div>
        <div style="font-size: 12px; color: var(--text-secondary);">
          Período: ${payload.academicPeriod} · Territorio: ${payload.territory}
        </div>
      </div>

      <div style="background: #090D16; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; font-family: var(--font-mono); font-size: 11px; margin-bottom: 14px;">
        <span style="color: var(--text-muted);">HASH CRIPTOGRÁFICO DE AUTENTICIDAD (SHA-256):</span><br>
        <span style="color: var(--accent); word-break: break-all; font-weight: 700;">${payload.hash}</span>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-sm);">
        <span style="font-weight: 700; color: var(--text-primary);">Nota Oficial Promedio Acumulada:</span>
        <span style="font-size: 20px; font-weight: 800; color: var(--accent); font-family: var(--font-mono);">${payload.averageScore} / 5.0 (${payload.status})</span>
      </div>
    `;

    document.getElementById('btn-download-acta-pdf').onclick = async () => {
      audioFx.playClick();
      await this.certificateGen.downloadPdfCertificate();
    };

    document.getElementById('btn-copy-acta-json').onclick = () => {
      audioFx.playClick();
      navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      alert('¡Comprobante JSON copiado al portapapeles! Puedes pegarlo en Teams.');
    };
  }

  renderGnssAuditModal() {
    const tbody = document.getElementById('gnss-table-body');
    if (!tbody || !this.gnssAudit) return;
    const report = this.gnssAudit.computeHorizontalRmse();

    tbody.innerHTML = report.points.map(p => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td>${p.officialX.toFixed(2)}</td>
        <td>${p.officialY.toFixed(2)}</td>
        <td>${p.fieldX.toFixed(2)}</td>
        <td>${p.fieldY.toFixed(2)}</td>
        <td style="color: ${p.dx >= 0 ? '#34D399' : '#EF4444'};">${p.dx.toFixed(2)}</td>
        <td style="color: ${p.dy >= 0 ? '#34D399' : '#EF4444'};">${p.dy.toFixed(2)}</td>
        <td style="font-weight: 700; color: #38BDF8;">${p.radialError.toFixed(2)} m</td>
      </tr>
    `).join('');

    const rmseElem = document.getElementById('gnss-kpi-rmse');
    if (rmseElem) rmseElem.textContent = `${report.rmseHorizontal.toFixed(2)} m`;
  }

  setupModals() {
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-backdrop');
        if (modal) modal.classList.add('hidden');
        audioFx.playClick();
      });
    });

    document.getElementById('btn-close-elevation-foot')?.addEventListener('click', () => this.closeModal('modal-elevation'));
    document.getElementById('btn-close-gnss-foot')?.addEventListener('click', () => this.closeModal('modal-gnss'));
    document.getElementById('btn-close-composer-foot')?.addEventListener('click', () => this.closeModal('modal-composer'));
    document.getElementById('btn-close-acta-foot')?.addEventListener('click', () => this.closeModal('modal-acta'));
    document.getElementById('btn-cancel-geoprocess')?.addEventListener('click', () => this.closeModal('modal-geoprocess'));

    // Ejecutar geoprocesamiento
    document.getElementById('btn-exec-geoprocess')?.addEventListener('click', () => {
      const op = document.getElementById('select-geo-op').value;
      const resInfo = document.getElementById('geoprocess-result-info');

      if (op === 'buffer' && this.geoprocessing) {
        const dist = parseFloat(document.getElementById('buffer-dist-slider').value) || 30;
        const res = this.geoprocessing.buffer('drenajes', dist);
        audioFx.playSuccess();
        if (resInfo) {
          resInfo.classList.remove('hidden');
          resInfo.textContent = `¡Buffer de ${dist} metros generado con éxito! Área delimitada: ${res.areaHa} ha. La capa se ha desplegado en el mapa.`;
        }
      }
    });

    // Slider de buffer en modal
    const slider = document.getElementById('buffer-dist-slider');
    const valText = document.getElementById('buffer-dist-val');
    if (slider && valText) {
      slider.addEventListener('input', (e) => {
        valText.textContent = `${e.target.value} m`;
      });
    }

    // Descarga PDF Compositor
    document.getElementById('btn-composer-download-pdf')?.addEventListener('click', () => {
      audioFx.playClick();
      this.composer?.exportToPdf();
    });
  }

  openModal(modalId) {
    audioFx.playClick();
    document.getElementById(modalId)?.classList.remove('hidden');
  }

  closeModal(modalId) {
    audioFx.playClick();
    document.getElementById(modalId)?.classList.add('hidden');
  }

  handleStageCompleted(info) {
    this.showUnlockModal(
      `¡Fase ${info.stageNumber} Superada!`,
      `Has desbloqueado: ${info.unlocksDescription}`,
      info.xpGained,
      '✨'
    );
  }

  showUnlockModal(title, desc, xp, icon = '✨') {
    const modal = document.getElementById('modal-unlock');
    const titleElem = document.getElementById('unlock-modal-title');
    const descElem = document.getElementById('unlock-modal-desc');
    const xpElem = document.getElementById('unlock-modal-xp');
    const iconElem = document.getElementById('unlock-modal-icon');

    if (titleElem) titleElem.textContent = title;
    if (descElem) descElem.textContent = desc;
    if (xpElem) xpElem.textContent = `+${xp} XP`;
    if (iconElem) iconElem.textContent = icon;

    if (modal) modal.classList.remove('hidden');

    const btnClose = document.getElementById('btn-close-unlock-modal');
    if (btnClose) {
      btnClose.onclick = () => {
        audioFx.playClick();
        modal.classList.add('hidden');
        this.syncUIWithState();
      };
    }
  }
}

// Inicializar la aplicación al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init().catch(err => {
    console.error('Error iniciando GeoLab Iguaná:', err);
  });
});
