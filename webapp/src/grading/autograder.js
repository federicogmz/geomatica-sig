import confetti from 'canvas-confetti';
import { audioFx } from '../core/audioFx.js';

/**
 * Motor de Autocalificación en Tiempo Real (Escala 0.0 a 5.0)
 */
export class Autograder {
  constructor(stateStore, layerManager) {
    this.stateStore = stateStore;
    this.layerManager = layerManager;
  }

  evaluateExercise(exercise, studentAnswer, context = {}) {
    let passed = false;
    let score = 0.0;
    let feedback = '';

    switch (exercise.type) {
      case 'calculation': {
        const val = parseFloat(studentAnswer);
        if (isNaN(val)) {
          feedback = 'Por favor ingresa un valor numérico válido.';
          break;
        }
        const diff = Math.abs(val - exercise.expected);
        if (diff <= exercise.tolerance) {
          passed = true;
          score = 5.0;
          feedback = `¡Correcto! ${exercise.explanation}`;
        } else {
          score = Math.max(1.0, 5.0 - (diff / exercise.expected) * 5.0);
          score = Math.round(score * 10) / 10;
          feedback = `Valor obtenido: ${val}${exercise.unit || ''}. El valor esperado es aprox. ${exercise.expected}${exercise.unit || ''}. Pista: ${exercise.hint}`;
        }
        break;
      }

      case 'select_choice': {
        if (studentAnswer === exercise.expected) {
          passed = true;
          score = 5.0;
          feedback = `¡Exacto! ${exercise.explanation}`;
        } else {
          score = 1.5;
          feedback = `Opción incorrecta. Pista: ${exercise.hint}`;
        }
        break;
      }

      case 'attribute_query': {
        const val = parseInt(studentAnswer, 10);
        if (val === exercise.expected) {
          passed = true;
          score = 5.0;
          feedback = `¡Excelente conteo! ${exercise.explanation}`;
        } else {
          score = Math.max(1.0, 5.0 - Math.abs(val - exercise.expected) * 1.5);
          score = Math.round(score * 10) / 10;
          feedback = `Reportaste ${val} objetos, pero el conteo oficial arroja ${exercise.expected}. Pista: ${exercise.hint}`;
        }
        break;
      }

      case 'interactive_map': {
        if (exercise.action === 'locate_point') {
          const { easting, northing } = context;
          const b = exercise.bounds;
          if (easting >= b.minX && easting <= b.maxX && northing >= b.minY && northing <= b.maxY) {
            passed = true;
            score = 5.0;
            feedback = `¡Coordenada CTM12 verificada! ${exercise.explanation}`;
          } else {
            score = 2.0;
            feedback = `Ubicación fuera de rango (E: ${Math.round(easting)}m, N: ${Math.round(northing)}m). Pista: ${exercise.hint}`;
          }
        } else {
          passed = true;
          score = 5.0;
          feedback = exercise.explanation;
        }
        break;
      }

      case 'interactive_draw':
      case 'topology_audit': {
        const topologyReport = context.topologyReport;
        if (topologyReport && topologyReport.errorsCount === 0 && topologyReport.totalFeatures > 0) {
          passed = true;
          score = 5.0;
          feedback = `¡Topología 100% limpia! Cero solapes, cero dangles y geometrías válidas.`;
        } else if (topologyReport && topologyReport.errorsCount > 0) {
          score = Math.max(2.0, 5.0 - topologyReport.errorsCount * 1.0);
          score = Math.round(score * 10) / 10;
          feedback = `Se detectaron ${topologyReport.errorsCount} inconsistencias topológicas. Corrige los vértices señalados en rojo.`;
        } else {
          score = 1.0;
          feedback = 'Primero digitaliza una geometría en el mapa antes de evaluar.';
        }
        break;
      }

      case 'geoprocess_action': {
        if (exercise.action === 'run_buffer_30m') {
          const bufferLayer = this.layerManager.getLayer('user_buffer');
          if (bufferLayer && bufferLayer.geojson && bufferLayer.geojson.features.length > 0) {
            passed = true;
            score = 5.0;
            feedback = exercise.explanation;
          } else {
            score = 1.0;
            feedback = 'Aún no has generado la capa de Buffer. Ejecútala en la barra de Geoprocesamiento.';
          }
        } else if (exercise.action === 'run_intersection') {
          const intersectLayer = this.layerManager.getLayer('user_intersect');
          if (intersectLayer && intersectLayer.geojson && intersectLayer.geojson.features.length > 0) {
            passed = true;
            score = 5.0;
            feedback = exercise.explanation;
          } else {
            score = 1.0;
            feedback = 'Ejecuta la intersección entre la Faja de Retiro y los Predios Catastrales.';
          }
        }
        break;
      }

      case 'interactive_tool':
      case 'composer_export': {
        passed = true;
        score = 5.0;
        feedback = exercise.explanation;
        break;
      }

      default: {
        passed = true;
        score = 5.0;
        feedback = 'Actividad completada.';
      }
    }

    if (passed) {
      audioFx.playSuccess();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.85 }
      });
    } else {
      audioFx.playWarning();
    }

    return {
      passed,
      score,
      feedback
    };
  }
}
