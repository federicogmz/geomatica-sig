import { jsPDF } from 'jspdf';
import { CURRICULUM_MODULES } from '../modules/curriculumData.js';

/**
 * Generador de Acta Oficial de Calificación y Entrega con Hash de Integridad SHA-256
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

    const evaluated = moduleGrades.filter(m => m.completed);
    const avgScore = evaluated.length > 0
      ? evaluated.reduce((acc, m) => acc + m.score, 0) / evaluated.length
      : 0.0;

    const rawString = `${student.name}|${student.code}|${avgScore.toFixed(2)}|${evaluated.map(e => `${e.id}:${e.score}`).join(',')}`;
    const hash = await this.computeSha256(rawString);

    return {
      institution: 'Universidad EAFIT · Escuela de Ciencias Aplicadas e Ingeniería',
      course: 'Geomática, Ingeniería y SIG',
      academicPeriod: '2026-2',
      territory: 'Cuenca Quebrada La Iguaná (Medellín)',
      student,
      generatedAt: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      modules: moduleGrades,
      averageScore: Number(avgScore.toFixed(2)),
      completedCount: evaluated.length,
      totalCount: CURRICULUM_MODULES.length,
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
    doc.text('CURSO: GEOMÁTICA, INGENIERÍA Y SISTEMAS DE INFORMACIÓN GEOGRÁFICA', margin + 8, margin + 23);

    // Título del Acta
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text('ACTA OFICIAL DE EVALUACIÓN Y CALIFICACIÓN AUTÓNOMA', pageW / 2, margin + 42, { align: 'center' });

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`Expedido el ${payload.formattedDate} · Proyecto Integrador La Iguaná (EPSG:9377)`, pageW / 2, margin + 48, { align: 'center' });

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

    // Tabla de Calificaciones
    const tableY = margin + 84;
    doc.setFillColor(30, 41, 59);
    doc.rect(margin + 4, tableY, pageW - 2 * margin - 8, 8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('Módulo / Actividad Práctica', margin + 8, tableY + 5.5);
    doc.text('Estado', margin + 120, tableY + 5.5);
    doc.text('Nota (0.0 - 5.0)', margin + 150, tableY + 5.5);

    let rowY = tableY + 8;
    payload.modules.forEach((mod, idx) => {
      const isEven = idx % 2 === 0;
      doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
      doc.rect(margin + 4, rowY, pageW - 2 * margin - 8, 9, 'F');
      doc.setDrawColor(241, 245, 249);
      doc.line(margin + 4, rowY + 9, pageW - margin - 4, rowY + 9);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      doc.text(`${mod.code}:`, margin + 8, rowY + 6);

      doc.setFont('helvetica', 'normal');
      doc.text(mod.title, margin + 38, rowY + 6);

      if (mod.completed) {
        doc.setTextColor(16, 185, 129);
        doc.text('Completado', margin + 120, rowY + 6);
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.text(mod.score.toFixed(1), margin + 160, rowY + 6);
      } else {
        doc.setTextColor(148, 163, 184);
        doc.text('Pendiente', margin + 120, rowY + 6);
        doc.text('--', margin + 160, rowY + 6);
      }

      rowY += 9;
    });

    // Fila de Promedio Final
    doc.setFillColor(241, 245, 249);
    doc.rect(margin + 4, rowY + 2, pageW - 2 * margin - 8, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text('PROMEDIO ACUMULADO DEL CURSO:', margin + 8, rowY + 8.5);
    doc.setFontSize(11);
    doc.setTextColor(16, 185, 129);
    doc.text(`${payload.averageScore.toFixed(2)} / 5.0`, margin + 155, rowY + 8.5);

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
    doc.text('Este documento certifica las evidencias de aprendizaje espacial completadas en el entorno autónomo GeoLab Iguaná.', margin + 6, hashY + 13);
    doc.text('Puede someterse como entregable digital oficial en la plataforma Microsoft Teams del curso.', margin + 6, hashY + 17);

    // Guardar archivo
    doc.save(`Acta_Calificaciones_Geomatica_${payload.student.code}.pdf`);
  }
}
