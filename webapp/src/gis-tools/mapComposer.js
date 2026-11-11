import { jsPDF } from 'jspdf';

/**
 * Compositor Cartográfico Profesional (Lámina Técnica con Grilla CTM12 y Cajetín)
 */
export class MapComposerTool {
  constructor(stateStore, layerManager) {
    this.stateStore = stateStore;
    this.layerManager = layerManager;
  }

  generatePdfLayout(mapTitle = 'DIAGNÓSTICO TERRITORIAL: CUENCA QUEBRADA LA IGUANÁ') {
    const state = this.stateStore.getState();
    const student = state.student;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4' // 297 x 210 mm
    });

    const pageW = 297;
    const pageH = 210;
    const margin = 10;

    // 1. Marco exterior
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.8);
    doc.rect(margin, margin, pageW - 2 * margin, pageH - 2 * margin);

    // Marco interior
    doc.setDrawColor(100, 116, 139);
    doc.setLineWidth(0.3);
    doc.rect(margin + 2, margin + 2, pageW - 2 * margin - 4, pageH - 2 * margin - 4);

    // 2. Grilla y marcas de coordenadas CTM12 en los bordes
    doc.setFont('courier', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);

    // Coordenadas CTM12 de referencia en los bordes
    doc.text("CTM12 E: 4'708.000 m", margin + 15, margin + 5);
    doc.text("CTM12 E: 4'713.000 m", margin + 100, margin + 5);
    doc.text("CTM12 E: 4'717.000 m", margin + 180, margin + 5);

    doc.text("N: 2'254.000 m", margin + 3, margin + 25, { angle: 90 });
    doc.text("N: 2'252.000 m", margin + 3, margin + 85, { angle: 90 });
    doc.text("N: 2'250.000 m", margin + 3, margin + 145, { angle: 90 });

    // 3. Área del Mapa principal (recuadro de dibujo)
    const mapAreaW = 195;
    const mapAreaH = 180;
    doc.setFillColor(15, 23, 42);
    doc.rect(margin + 6, margin + 8, mapAreaW, mapAreaH, 'F');
    doc.setDrawColor(51, 65, 85);
    doc.rect(margin + 6, margin + 8, mapAreaW, mapAreaH, 'S');

    // Ilustración esquemática del vector en el mapa del PDF
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(1);
    doc.rect(margin + 16, margin + 18, mapAreaW - 20, mapAreaH - 20, 'S');

    // Trazado estilizado de La Iguaná
    doc.setDrawColor(6, 182, 212);
    doc.setLineWidth(1.8);
    doc.lines([[40, 20], [50, 40], [30, 20], [45, 10]], margin + 25, margin + 30, [1, 1]);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(248, 250, 252);
    doc.text("CUENCA DE LA QUEBRADA LA IGUANÁ (46.25 km²)", margin + 14, margin + 16);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text("Desde Alto de Boquerón (2.950 msnm) hasta Río Medellín (1.450 msnm)", margin + 14, margin + 22);

    // 4. Rosa de los Vientos (Norte)
    const northX = margin + mapAreaW - 12;
    const northY = margin + 22;
    doc.setFillColor(248, 250, 252);
    doc.triangle(northX, northY - 8, northX - 4, northY + 4, northX, northY, 'F');
    doc.setFillColor(100, 116, 139);
    doc.triangle(northX, northY - 8, northX + 4, northY + 4, northX, northY, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(248, 250, 252);
    doc.text('N', northX - 1.5, northY - 10);

    // 5. Escala Gráfica dentro del mapa
    const scaleX = margin + 14;
    const scaleY = margin + mapAreaH - 4;
    doc.setFillColor(248, 250, 252);
    doc.rect(scaleX, scaleY - 4, 20, 2.5, 'F');
    doc.setFillColor(15, 23, 42);
    doc.rect(scaleX + 20, scaleY - 4, 20, 2.5, 'F');
    doc.setDrawColor(248, 250, 252);
    doc.rect(scaleX, scaleY - 4, 40, 2.5, 'S');
    doc.setFontSize(7);
    doc.setTextColor(248, 250, 252);
    doc.text('0', scaleX, scaleY + 2);
    doc.text('500 m', scaleX + 16, scaleY + 2);
    doc.text('1.000 m', scaleX + 36, scaleY + 2);
    doc.text('Escala 1:25.000', scaleX + 46, scaleY + 2);

    // 6. Columna Lateral Derecha: Leyenda y Cajetín Institucional
    const sideX = margin + mapAreaW + 9;
    const sideW = pageW - sideX - margin - 2;

    // Panel Leyenda
    doc.setDrawColor(203, 213, 225);
    doc.setFillColor(248, 250, 252);
    doc.rect(sideX, margin + 8, sideW, 60, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('LEYENDA OFICIAL', sideX + 4, margin + 15);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    // Elemento leyenda: Cuenca
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(1);
    doc.line(sideX + 4, margin + 22, sideX + 12, margin + 22);
    doc.setTextColor(51, 65, 85);
    doc.text('Límite de la Cuenca (46.25 km²)', sideX + 15, margin + 23);

    // Elemento leyenda: Red Hídrica
    doc.setDrawColor(6, 182, 212);
    doc.setLineWidth(1.5);
    doc.line(sideX + 4, margin + 28, sideX + 12, margin + 28);
    doc.text('Cauce Principal La Iguaná', sideX + 15, margin + 29);

    // Elemento leyenda: Faja de Retiro 30m
    doc.setFillColor(99, 102, 241);
    doc.rect(sideX + 4, margin + 33, 8, 4, 'F');
    doc.text('Faja de Retiro Hídrico (30 m)', sideX + 15, margin + 36);

    // Elemento leyenda: Equipamientos
    doc.setFillColor(59, 130, 246);
    doc.circle(sideX + 8, margin + 43, 2.5, 'F');
    doc.text('Equipamientos Comunitarios', sideX + 15, margin + 44);

    // Elemento leyenda: Predios
    doc.setFillColor(245, 158, 11);
    doc.rect(sideX + 4, margin + 49, 8, 4, 'F');
    doc.text('Predios Catastrales', sideX + 15, margin + 52);

    // Panel Cajetín Institucional (Title Block)
    const cajetinY = margin + 72;
    const cajetinH = mapAreaH - 64;
    doc.rect(sideX, cajetinY, sideW, cajetinH, 'FD');

    doc.setFillColor(15, 23, 42);
    doc.rect(sideX, cajetinY, sideW, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('UNIVERSIDAD EAFIT', sideX + 4, cajetinY + 5);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('ESCUELA DE CIENCIAS APLICADAS E ING.', sideX + 4, cajetinY + 9.5);

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('PROYECTO:', sideX + 4, cajetinY + 18);
    doc.setFont('helvetica', 'normal');
    doc.text(mapTitle, sideX + 4, cajetinY + 23, { maxWidth: sideW - 8 });

    doc.setFont('helvetica', 'bold');
    doc.text('ESTUDIANTE / AUTOR:', sideX + 4, cajetinY + 33);
    doc.setFont('helvetica', 'normal');
    doc.text(`${student.name} (Cód: ${student.code})`, sideX + 4, cajetinY + 38);

    doc.setFont('helvetica', 'bold');
    doc.text('SISTEMA DE REFERENCIA:', sideX + 4, cajetinY + 47);
    doc.setFont('helvetica', 'normal');
    doc.text('MAGNA-SIRGAS Origen Nacional', sideX + 4, cajetinY + 52);
    doc.text('CTM12 (EPSG: 9377) · Res. IGAC 471/2020', sideX + 4, cajetinY + 56);

    doc.setFont('helvetica', 'bold');
    doc.text('FUENTES DE INFORMACIÓN:', sideX + 4, cajetinY + 65);
    doc.setFont('helvetica', 'normal');
    doc.text('GeoMedellín · SIATA · IGAC (2027)', sideX + 4, cajetinY + 70);

    doc.setFont('helvetica', 'bold');
    doc.text('FECHA:', sideX + 4, cajetinY + 79);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date().toLocaleDateString('es-CO'), sideX + 22, cajetinY + 79);

    doc.setFont('helvetica', 'bold');
    doc.text('LÁMINA:', sideX + sideW - 28, cajetinY + 79);
    doc.text('1 de 1', sideX + sideW - 12, cajetinY + 79);

    // Descargar PDF
    doc.save(`Lamina_Tecnica_Iguana_${student.code}.pdf`);
  }
}
