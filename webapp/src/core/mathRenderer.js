import katex from 'katex';
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';
import 'katex/dist/katex.min.css';

/**
 * mathRenderer.js · Renderizador KaTeX para Matemáticas y Fórmulas
 * Procesa automáticamente bloques display ($$...$$ y \[...\]) e inline ($...$ y \(...\))
 * en cualquier contenedor DOM de la plataforma.
 */
export function renderMath(container = document.body) {
  if (!container) return;

  // 1. Renderizado automático con delimiters para inline y display math
  try {
    renderMathInElement(container, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false }
      ],
      ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option'],
      ignoredClasses: ['no-math', 'katex'],
      throwOnError: false,
      errorColor: '#EF4444',
      strict: false,
      trust: true
    });
  } catch (err) {
    console.warn('Advertencia en auto-render KaTeX:', err);
  }

  // 2. Garantía para cajas de fórmulas (.formula-box)
  // Si alguna caja quedó con texto sin procesar, renderizarla directamente en display mode
  try {
    const boxes = container.querySelectorAll ? container.querySelectorAll('.formula-box') : [];
    boxes.forEach(box => {
      // Ignorar cajas que contienen únicamente código HTML formateado
      if (box.querySelector('code')) return;
      if (!box.querySelector('.katex') && box.textContent.trim()) {
        let raw = box.textContent.trim();
        // Quitar delimitadores $$ envolventes si aún persisten
        if (raw.startsWith('$$') && raw.endsWith('$$') && raw.length > 4) {
          raw = raw.slice(2, -2).trim();
        }
        if (raw) {
          katex.render(raw, box, {
            displayMode: true,
            throwOnError: false,
            errorColor: '#EF4444'
          });
        }
      }
    });
  } catch (err) {
    console.warn('Advertencia en renderizado directo .formula-box:', err);
  }
}

