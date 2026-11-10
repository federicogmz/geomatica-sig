/*
  Navegación mínima para las presentaciones HTML del curso.
  Flechas / espacio / click en los bordes para avanzar o retroceder.
  Reutilizar este archivo sin modificar en cada semana; el contenido va en el HTML.
*/
(function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  let i = 0;

  function render() {
    slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
    const hint = document.getElementById("nav-hint");
    if (hint) hint.textContent = (i + 1) + " / " + slides.length;
  }

  function go(delta) {
    i = Math.min(Math.max(i + delta, 0), slides.length - 1);
    render();
  }

  document.addEventListener("keydown", (e) => {
    if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(e.key)) go(1);
    if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) go(-1);
  });

  function addBrandFooter() {
    document.querySelectorAll(".slide:not(.slide--portada):not(.slide--divider)").forEach((slide) => {
      const ribbon = document.createElement("div");
      ribbon.className = "brand-ribbon";
      ribbon.innerHTML =
        '<div class="seg cyan"><span class="url">www.eafit.edu.co</span></div>' +
        '<div class="seg navy1"></div><div class="seg gold"></div>' +
        '<div class="seg green"></div><div class="seg navy2"></div>';
      const accent = document.createElement("div");
      accent.className = "brand-accent";
      accent.innerHTML = '<div class="tab"></div>';
      slide.appendChild(ribbon);
      slide.appendChild(accent);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const stage = document.getElementById("stage");
    const prev = document.createElement("div");
    prev.className = "click-zone prev";
    prev.onclick = () => go(-1);
    const next = document.createElement("div");
    next.className = "click-zone next";
    next.onclick = () => go(1);
    stage.appendChild(prev);
    stage.appendChild(next);
    addBrandFooter();
    render();
  });
})();
