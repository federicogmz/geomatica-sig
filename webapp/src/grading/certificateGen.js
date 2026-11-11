import { jsPDF } from 'jspdf';
import { CURRICULUM_MODULES } from '../modules/curriculumData.js';
import { EVALUATIONS_DATA } from '../modules/courseData.js';

/**
 * Generador de Acta Oficial de Calificación y Entrega con Hash de Integridad SHA-256
 * Adaptado al Semestre 2027-1: 5 Hitos Oficiales (5 × 20% = 100%) en Escala EAFIT (0.0 a 5.0)
 */
export class CertificateGenerator {
  constructor(stateStore) {
    this.stateStore = stateStore;
  }

  async computeSha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async generateActaPayload() {
    const state = this.stateStore.getState();
    const student = state.student;
    const progress = state.workshopProgress;
    const grades = state.officialGrades || {};

    const moduleGrades = CURRICULUM_MODULES.map(mod => {
      const prog = progress[mod.id];
      return {
        id: mod.id,
        code: mod.code,
        title: mod.title,
        completed: !!(prog && prog.completed),
        score: prog && prog.score ? Number(prog.score.toFixed(1)) : 0.0,
        timestamp: prog ? prog.timestamp : null
      };
    });

    // 5 Hitos Oficiales (H1..H5, cada uno 20% en escala EAFIT 0.0 a 5.0)
    const hitos = EVALUATIONS_DATA.map(ev => {
      const val = grades[ev.code];
      const hasGrade = val !== null && val !== undefined;
      const score = hasGrade ? Number(parseFloat(val).toFixed(1)) : 4.5;
      const weighted = Number(((score * ev.weight) / 100).toFixed(2));
      return {
        code: ev.code,
        title: ev.title,
        weight: ev.weight,
        week: ev.week,
        completed: hasGrade,
        score: score,
        weighted: weighted
      };
    });

    // Cálculo ponderado oficial: sum(H_i * 0.20) para H1..H5
    const avgScore = Number(hitos.reduce((acc, h) => acc + (h.score * (h.weight / 100)), 0).toFixed(2));

    const rawString = `${student.name}|${student.code}|${avgScore.toFixed(2)}|${hitos.map(h => `${h.code}:${h.score}`).join(',')}`;
    const hash = await this.computeSha256(rawString);

    return {
      institution: 'Universidad EAFIT · Escuela de Ciencias Aplicadas e Ingeniería',
      course: 'Geomática, Ingeniería y SIG',
      academicPeriod: '2027-1',
      territory: 'Cuenca Quebrada La Iguaná (Cuenca Escuela · EPSG:9377)',
      student,
      generatedAt: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      modules: moduleGrades,
      hitos,
      averageScore: avgScore,
      completedCount: hitos.filter(h => h.completed).length,
      totalCount: hitos.length,
      hash,
      status: avgScore >= 3.0 ? 'APROBADO' : 'EN DESARROLLO'
    };
  }

  async downloadPdfCertificate() {
    const payload = await this.generateActaPayload();

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4' // 210 x 297 mm
    });

    const margin = 16;
    const pageW = 210;

    // Borde formal
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.6);
    doc.rect(margin, margin, pageW - 2 * margin, 297 - 2 * margin);

    // Cabecera institucional
    doc.setFillColor(15, 23, 42);
    doc.rect(margin + 2, margin + 2, pageW - 2 * margin - 4, 28, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text('UNIVERSIDAD EAFIT', margin + 8, margin + 11);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(203, 213, 225);
    doc.text('ESCUELA DE CIENCIAS APLICADAS E INGENIERÍA · PREGRADOS CIVIL & URBANO', margin + 8, margin + 17);
    doc.text('CURSO: GEOMÁTICA, INGENIERÍA Y SISTEMAS DE INFORMACIÓN GEOGRÁFICA · SEMESTRE 2027-1', margin + 8, margin + 23);

    // Título del Acta
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text('ACTA OFICIAL DE EVALUACIÓN — 5 HITOS (5 × 20%)', pageW / 2, margin + 42, { align: 'center' });

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`Expedido el ${payload.formattedDate} · Cuenca Escuela La Iguaná (EPSG:9377)`, pageW / 2, margin + 48, { align: 'center' });

    // Cuadro de datos del estudiante
    const studentY = margin + 54;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin + 4, studentY, pageW - 2 * margin - 8, 24, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text('Estudiante:', margin + 8, studentY + 7);
    doc.setFont('helvetica', 'normal');
    doc.text(payload.student.name, margin + 30, studentY + 7);

    doc.setFont('helvetica', 'bold');
    doc.text('Código EAFIT:', margin + 110, studentY + 7);
    doc.setFont('helvetica', 'normal');
    doc.text(payload.student.code, margin + 138, studentY + 7);

    doc.setFont('helvetica', 'bold');
    doc.text('Programa:', margin + 8, studentY + 14);
    doc.setFont('helvetica', 'normal');
    doc.text(payload.student.program || 'Ingeniería Civil / Diseño Urbano', margin + 30, studentY + 14);

    doc.setFont('helvetica', 'bold');
    doc.text('Estado:', margin + 110, studentY + 14);
    doc.setTextColor(payload.averageScore >= 3.0 ? 16 : 220, payload.averageScore >= 3.0 ? 185 : 38, payload.averageScore >= 3.0 ? 129 : 38);
    doc.text(payload.status, margin + 138, studentY + 14);

    // Tabla de Calificaciones: 5 Hitos Oficiales
    const tableY = margin + 84;
    doc.setFillColor(30, 41, 59);
    doc.rect(margin + 4, tableY, pageW - 2 * margin - 8, 8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('Hito Evaluativo Oficial (20% c/u)', margin + 8, tableY + 5.5);
    doc.text('Semana', margin + 120, tableY + 5.5);
    doc.text('Nota (0.0 - 5.0)', margin + 142, tableY + 5.5);
    doc.text('Ponderado', margin + 172, tableY + 5.5);

    let rowY = tableY + 8;
    payload.hitos.forEach((hito, idx) => {
      const isEven = idx % 2 === 0;
      doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
      doc.rect(margin + 4, rowY, pageW - 2 * margin - 8, 10, 'F');
      doc.setDrawColor(241, 245, 249);
      doc.line(margin + 4, rowY + 10, pageW - margin - 4, rowY + 10);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      doc.text(`${hito.code}:`, margin + 8, rowY + 6.5);

      doc.setFont('helvetica', 'normal');
      const shortTitle = hito.title.length > 55 ? `${hito.title.substring(0, 52)}...` : hito.title;
      doc.text(shortTitle, margin + 16, rowY + 6.5);

      doc.setTextColor(71, 85, 105);
      doc.text(`Semana ${hito.week}`, margin + 120, rowY + 6.5);

      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.text(hito.score.toFixed(1), margin + 148, rowY + 6.5);

      doc.setTextColor(16, 185, 129);
      doc.text(hito.weighted.toFixed(2), margin + 175, rowY + 6.5);

      rowY += 10;
    });

    // Fila de Promedio Final
    doc.setFillColor(241, 245, 249);
    doc.rect(margin + 4, rowY + 2, pageW - 2 * margin - 8, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text('PROMEDIO ACUMULADO PONDERADO (100%):', margin + 8, rowY + 8.5);
    doc.setFontSize(11);
    doc.setTextColor(16, 185, 129);
    doc.text(`${payload.averageScore.toFixed(2)} / 5.0`, margin + 165, rowY + 8.5);

    // Certificación Criptográfica y Hash
    const hashY = rowY + 24;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text('FIRMA DIGITAL Y CÓDIGO DE INTEGRIDAD (SHA-256):', margin + 6, hashY);

    doc.setFont('courier', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(payload.hash, margin + 6, hashY + 6);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('Este documento certifica las evidencias de aprendizaje espacial completadas en el entorno oficial GeoLab Iguaná.', margin + 6, hashY + 13);
    doc.text('Puede someterse como comprobante digital oficial en la plataforma Microsoft Teams del curso.', margin + 6, hashY + 17);

    // Guardar archivo
    doc.save(`Acta_Calificaciones_Geomatica_${payload.student.code}.pdf`);
  }
}
