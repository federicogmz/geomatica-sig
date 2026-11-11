/**
 * Gestor de Estado Central y Persistencia en LocalStorage
 * Mantiene el progreso del estudiante, fases desbloqueadas (0 a 9), XP acumulado,
 * rangos académicos, estado de vistas, lecciones teóricas y guías de laboratorio.
 */

const STORAGE_KEY = 'geolab_iguana_state_2027_1';
const LEGACY_STORAGE_KEYS = ['geolab_iguana_course_v3', 'geolab_iguana_state'];

export const RANKS = [
  { minXp: 0, level: 1, title: 'Iniciado Territorial', badge: '🌱' },
  { minXp: 150, level: 2, title: 'Explorador de Coordenadas', badge: '🧭' },
  { minXp: 350, level: 3, title: 'Geodesta CTM12', badge: '📐' },
  { minXp: 600, level: 4, title: 'Modelador Vectorial', badge: '🗺️' },
  { minXp: 950, level: 5, title: 'Inspector Topológico', badge: '✅' },
  { minXp: 1350, level: 6, title: 'Ingeniero de Cuencas', badge: '⚙️' },
  { minXp: 1800, level: 7, title: 'Maestro de Terrenos & DEM', badge: '⛰️' },
  { minXp: 2300, level: 8, title: 'Auditor GNSS de Precisión', badge: '🎯' },
  { minXp: 2900, level: 9, title: 'Especialista en Teledetección QGIS', badge: '🛰️' },
  { minXp: 3600, level: 10, title: 'Ingeniero Geomático Mayor', badge: '🏆' }
];

export const UNLOCK_ELEMENTS = {
  0: [],
  1: ['canvas', 'coords', 'compass'],
  2: ['basemaps'],
  3: ['scale', 'measure'],
  4: ['layers_toc', 'layers_iguana'],
  5: ['attribute_table'],
  6: ['digitizer', 'snapping', 'topology'],
  7: ['geoprocessing'],
  8: ['elevation', 'gnss_audit'],
  9: ['composer', 'certificate']
};

const DEFAULT_STATE = {
  student: {
    name: 'Estudiante EAFIT',
    code: '202710001010',
    institution: 'Universidad EAFIT · Escuela de Ciencias Aplicadas e Ingeniería',
    program: 'Ingeniería Civil'
  },
  currentView: 'hub', // 'hub' | 'theory' | 'labs' | 'webgis' | 'quest' | 'grades' | 'glossary'
  selectedTheoryWeek: 1,
  selectedLabGuide: 'G01',
  currentStage: 0, // Modo aventura: 0 a 9
  maxUnlockedStage: 9, // Por defecto en la nueva arquitectura el estudiante puede explorar libremente o avanzar en aventura
  xp: 120, // XP inicial de bienvenida
  completedTheory: { 1: true },
  completedLabs: { 'G01': true },
  unlockedBadges: ['first_steps'],
  stageScores: {
    0: 5.0
  },
  officialGrades: {
    H1: null,
    H2: null,
    H3: null,
    H4: null,
    H5: null
  },
  workshopProgress: {
    stage_0: { completed: true, score: 5.0, timestamp: new Date().toISOString() }
  },
  layerSettings: {
    cuenca: true,
    drenajes: true,
    equipamientos: true,
    predios: false,
    inundacion: false,
    vertices: false,
    userLayers: []
  },
  theme: 'dark',
  soundEnabled: true,
  viewMode: 'quest' // 'quest' | 'free'
};

class StateStore {
  constructor() {
    this.state = this.loadState();
    this.listeners = [];
  }

  loadState() {
    try {
      let saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        for (const legacyKey of LEGACY_STORAGE_KEYS) {
          const legacyData = localStorage.getItem(legacyKey);
          if (legacyData) {
            saved = legacyData;
            break;
          }
        }
      }
      if (saved) {
        const parsed = JSON.parse(saved);
        const migratedGrades = {
          H1: null,
          H2: null,
          H3: null,
          H4: null,
          H5: null,
          ...(parsed.officialGrades && ('H1' in parsed.officialGrades) ? parsed.officialGrades : {})
        };
        return {
          ...DEFAULT_STATE,
          ...parsed,
          officialGrades: migratedGrades
        };
      }
    } catch (e) {
      console.warn('No se pudo acceder a LocalStorage, usando estado en memoria:', e);
    }
    return { ...DEFAULT_STATE };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Error guardando en LocalStorage:', e);
    }
    this.notify();
  }

  getState() {
    return this.state;
  }

  getRank() {
    const xp = this.state.xp || 0;
    let currentRank = RANKS[0];
    for (const r of RANKS) {
      if (xp >= r.minXp) currentRank = r;
    }
    return currentRank;
  }

  getNextRank() {
    const currentRank = this.getRank();
    const nextIdx = RANKS.findIndex(r => r.level === currentRank.level) + 1;
    return nextIdx < RANKS.length ? RANKS[nextIdx] : null;
  }

  addXp(amount, reason = '') {
    const prevRank = this.getRank();
    this.state.xp = (this.state.xp || 0) + amount;
    const newRank = this.getRank();

    const leveledUp = newRank.level > prevRank.level;
    this.saveState();
    return { leveledUp, newRank, xp: this.state.xp, amount, reason };
  }

  unlockBadge(badgeId) {
    if (!this.state.unlockedBadges.includes(badgeId)) {
      this.state.unlockedBadges.push(badgeId);
      this.saveState();
      return true;
    }
    return false;
  }

  setCurrentView(viewName) {
    this.state.currentView = viewName;
    this.saveState();
  }

  setTheoryWeek(weekNum) {
    this.state.selectedTheoryWeek = weekNum;
    this.saveState();
  }

  completeTheoryWeek(weekNum, xpReward = 50) {
    if (!this.state.completedTheory[weekNum]) {
      this.state.completedTheory[weekNum] = true;
      this.addXp(xpReward, `Lectura Semana ${weekNum} completada`);
      if (weekNum === 3) this.unlockBadge('ctm12_master');
      if (weekNum === 2) this.unlockBadge('scale_detective');
      if (weekNum === 5) this.unlockBadge('zero_dangles');
      if (weekNum === 7) this.unlockBadge('buffer_protector');
      if (weekNum === 11) this.unlockBadge('dem_climber');
      if (weekNum === 12) this.unlockBadge('gnss_auditor');
      if (weekNum === 13) this.unlockBadge('s2_explorer');
      if (weekNum === 15) this.unlockBadge('model_builder');
      this.saveState();
      return true;
    }
    return false;
  }

  setLabGuide(guideCode) {
    this.state.selectedLabGuide = guideCode;
    this.saveState();
  }

  completeLabGuide(guideCode, xpReward = 75) {
    if (!this.state.completedLabs[guideCode]) {
      this.state.completedLabs[guideCode] = true;
      this.addXp(xpReward, `Taller ${guideCode} superado`);
      this.saveState();
      return true;
    }
    return false;
  }

  setOfficialGrade(evalCode, score) {
    this.state.officialGrades[evalCode] = Number(parseFloat(score).toFixed(1));
    this.saveState();
  }

  isFeatureUnlocked(featureKey) {
    // En la nueva versión de plataforma abierta, el WebGIS está disponible
    // para enriquecer la experiencia práctica desde el primer día
    return true;
  }

  updateStudent(studentData) {
    this.state.student = { ...this.state.student, ...studentData };
    this.saveState();
  }

  completeStage(stageNumber, score = 5.0, xpGained = 50) {
    const sId = `stage_${stageNumber}`;
    const prevProg = this.state.workshopProgress[sId] || {};
    const bestScore = Math.max(prevProg.score || 0, score);

    if (!prevProg.completed) {
      this.addXp(xpGained, `Fase ${stageNumber} superada`);
    }

    this.state.workshopProgress[sId] = {
      completed: true,
      score: bestScore,
      timestamp: new Date().toISOString()
    };
    this.state.stageScores[stageNumber] = bestScore;

    const nextStage = Math.min(9, stageNumber + 1);
    let newlyUnlocked = false;
    if (nextStage > this.state.maxUnlockedStage) {
      this.state.maxUnlockedStage = nextStage;
      newlyUnlocked = true;
    }
    this.state.currentStage = nextStage;

    this.saveState();
    return { newlyUnlocked, nextStage, xpGained };
  }

  setStage(stageNumber) {
    this.state.currentStage = stageNumber;
    this.saveState();
  }

  setViewMode(mode) {
    this.state.viewMode = mode;
    this.saveState();
  }

  toggleSound() {
    this.state.soundEnabled = !this.state.soundEnabled;
    this.saveState();
    return this.state.soundEnabled;
  }

  resetProgress() {
    const student = this.state.student;
    this.state = {
      ...DEFAULT_STATE,
      student,
      currentView: 'hub'
    };
    this.saveState();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }
}

export const stateStore = new StateStore();
