/**
 * Herramienta de Auditoría GNSS y Cálculo Automático de Dispersión
 * Según Guía G11 y estándares ASPRS / IGAC
 */
export class GnssAuditTool {
  constructor(layerManager) {
    this.layerManager = layerManager;
    this.auditPoints = [
      { id: 1, name: 'Puente Cra 70 (Fac. Minas)', xRef: 4715236.1, yRef: 2252112.0, xField: 4715234.2, yField: 2252110.5, desc: 'Estribo de puente' },
      { id: 2, name: 'Esquina Cra 80 con Cll 55', xRef: 4714105.0, yRef: 2252649.0, xField: 4714102.8, yField: 2252650.3, desc: 'Mojón municipal' },
      { id: 3, name: 'Plaza San Cristóbal', xRef: 4710888.5, yRef: 2254322.1, xField: 4710890.1, yField: 2254320.6, desc: 'Placa topográfica' },
      { id: 4, name: 'Estación IGAC MEDE (UNAL)', xRef: 4716850.0, yRef: 2252900.0, xField: 4716848.2, yField: 2252901.8, desc: 'Antena MAGNA-ECO' },
      { id: 5, name: 'Sensor SIATA San Cristóbal', xRef: 4709500.0, yRef: 2253800.0, xField: 4709497.9, yField: 2253798.5, desc: 'Estación hidrometeorológica' }
    ];
  }

  computeAudit() {
    let sumSquaredErrors = 0;
    const details = this.auditPoints.map(pt => {
      const dx = pt.xField - pt.xRef;
      const dy = pt.yField - pt.yRef;
      const distError = Math.sqrt(dx * dx + dy * dy);
      const squaredError = dx * dx + dy * dy;
      sumSquaredErrors += squaredError;

      return {
        ...pt,
        dx: Number(dx.toFixed(2)),
        dy: Number(dy.toFixed(2)),
        distErrorM: Number(distError.toFixed(2)),
        squaredError: Number(squaredError.toFixed(3))
      };
    });

    const n = details.length;
    const meanSquaredError = sumSquaredErrors / n;
    const rmseR = Math.sqrt(meanSquaredError);

    // Criterio de tolerancia oficial
    const passesCatastro1000 = rmseR <= 1.0;
    const passesDiagnostico5000 = rmseR <= 3.5;

    return {
      n,
      sumSquaredErrors: Number(sumSquaredErrors.toFixed(3)),
      meanSquaredError: Number(meanSquaredError.toFixed(3)),
      rmseR: Number(rmseR.toFixed(2)),
      passesCatastro1000,
      passesDiagnostico5000,
      points: details,
      technicalVerdict: passesDiagnostico5000
        ? 'Aceptado para diagnóstico territorial y modelación de cuencas (Escala 1:5.000). Para escala 1:1.000 requiere corrección GNSS diferencial.'
        : 'Rechazado: La dispersión posicional excede la tolerancia admisible de 3.5 m.'
    };
  }
}
