/**
 * Perfil Topográfico y Análisis de Relieve de la Cuenca de La Iguaná
 */
export class ElevationProfileTool {
  constructor() {
    this.profileData = [
      { distKm: 0.0, elevationM: 2950, name: 'Alto de Boquerón (Nacimiento)' },
      { distKm: 1.2, elevationM: 2710, name: 'Cuchilla Las Baldías' },
      { distKm: 2.8, elevationM: 2380, name: 'San Cristóbal Rural Alta' },
      { distKm: 4.5, elevationM: 2090, name: 'Vereda Travesías' },
      { distKm: 6.1, elevationM: 1880, name: 'San Cristóbal Centro' },
      { distKm: 7.9, elevationM: 1710, name: 'Confluencia Qda. La Seca' },
      { distKm: 9.4, elevationM: 1590, name: 'Robledo / Blanquizal' },
      { distKm: 10.8, elevationM: 1510, name: 'Puente Cra 70 (Facultad de Minas)' },
      { distKm: 12.0, elevationM: 1450, name: 'Desembocadura Río Medellín (Minorista)' }
    ];
  }

  getMetrics() {
    const start = this.profileData[0];
    const end = this.profileData[this.profileData.length - 1];
    const deltaH = start.elevationM - end.elevationM;
    const lengthM = end.distKm * 1000;
    const averageSlope = (deltaH / lengthM) * 100;

    return {
      cotaMax: start.elevationM,
      cotaMin: end.elevationM,
      desnivelM: deltaH,
      longitudTotalKm: end.distKm,
      pendienteMediaPct: averageSlope.toFixed(2),
      clasificacionTorrencial: 'Torrente de Alta Montaña con alta capacidad de arrastre'
    };
  }

  renderToCanvas(canvasElem) {
    if (!canvasElem) return;
    const ctx = canvasElem.getContext('2d');
    const width = canvasElem.width;
    const height = canvasElem.height;

    // Reset & Background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, width, height);

    const pad = { top: 30, right: 30, bottom: 40, left: 60 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;

    const minElev = 1300;
    const maxElev = 3100;
    const maxDist = 12.0;

    const toX = (km) => pad.left + (km / maxDist) * plotW;
    const toY = (elev) => pad.top + plotH - ((elev - minElev) / (maxElev - minElev)) * plotH;

    // Grid lines
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 1;
    for (let elev = 1500; elev <= 3000; elev += 500) {
      const y = toY(elev);
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + plotW, y);
      ctx.stroke();

      ctx.fillStyle = '#64748B';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${elev} m`, pad.left - 8, y + 4);
    }

    for (let km = 0; km <= 12; km += 2) {
      const x = toX(km);
      ctx.beginPath();
      ctx.moveTo(x, pad.top);
      ctx.lineTo(x, pad.top + plotH);
      ctx.stroke();

      ctx.fillStyle = '#64748B';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${km} km`, x, pad.top + plotH + 20);
    }

    // Gradient fill under profile
    const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
    gradient.addColorStop(0.7, 'rgba(6, 182, 212, 0.2)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0.05)');

    ctx.beginPath();
    ctx.moveTo(toX(this.profileData[0].distKm), toY(this.profileData[0].elevationM));
    this.profileData.forEach(pt => {
      ctx.lineTo(toX(pt.distKm), toY(pt.elevationM));
    });
    ctx.lineTo(toX(maxDist), pad.top + plotH);
    ctx.lineTo(toX(0), pad.top + plotH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Profile line
    ctx.beginPath();
    ctx.moveTo(toX(this.profileData[0].distKm), toY(this.profileData[0].elevationM));
    this.profileData.forEach(pt => {
      ctx.lineTo(toX(pt.distKm), toY(pt.elevationM));
    });
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Points & labels
    this.profileData.forEach((pt, i) => {
      const x = toX(pt.distKm);
      const y = toY(pt.elevationM);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#38BDF8';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (i === 0 || i === this.profileData.length - 1 || i === 4) {
        ctx.fillStyle = '#F8FAFC';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = i === 0 ? 'left' : (i === 4 ? 'center' : 'right');
        ctx.fillText(`${pt.elevationM}m`, x + (i === 0 ? 8 : (i === 4 ? 0 : -8)), y - 10);
      }
    });

    // Axis titles
    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Distancia longitudinal del cauce (km)', pad.left + plotW / 2, height - 8);

    ctx.save();
    ctx.translate(16, pad.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Elevación (msnm)', 0, 0);
    ctx.restore();
  }
}
