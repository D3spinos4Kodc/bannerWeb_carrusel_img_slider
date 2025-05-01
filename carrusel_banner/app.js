// — Variables de configuración —
const TRANSITION_DURATION = 800; // Duración en milisegundos
const AUTO_ADVANCE_DELAY = 5000; // Tiempo entre transiciones automáticas

// — Selección del carrusel y función de transición manual —
const carrusel = document.querySelector('.carrusel');
let isTransitioning = false;
let autoAdvanceTimeout = null;

function activar(e) {
  if (isTransitioning) return;
  isTransitioning = true;
  
  const elementos = document.querySelectorAll('.elemento');
  const isNext = e.target.matches('.siguiente');
  
  // Reiniciar el auto-avance
  resetAutoAdvance();
  
  carrusel.classList.add('transicionando');
  
  setTimeout(() => {
    if (isNext) {
      carrusel.appendChild(elementos[0]);
    } else {
      carrusel.insertBefore(elementos[elementos.length - 1], elementos[0]);
    }
    
    setTimeout(() => {
      carrusel.classList.remove('transicionando');
      isTransitioning = false;
      startAutoAdvance(); // Reanudar auto-avance
    }, TRANSITION_DURATION);
    
  }, TRANSITION_DURATION);
}

// — Control del auto-avance —
function startAutoAdvance() {
  autoAdvanceTimeout = setTimeout(() => {
    if (!isTransitioning) {
      document.querySelector('.siguiente').click();
    }
  }, AUTO_ADVANCE_DELAY);
}

function resetAutoAdvance() {
  clearTimeout(autoAdvanceTimeout);
}

// — Inicialización al cargar la página —
window.addEventListener('DOMContentLoaded', () => {
  // Precarga de imágenes
  document.querySelectorAll('.elemento').forEach(el => {
    const url = el.style.backgroundImage.replace(/url\(['"](.+)['"]\)/, '$1');
    (new Image()).src = url;
  });

  // Iniciar auto-avance
  startAutoAdvance();

  // Configurar event listeners
  document.querySelectorAll('.siguiente, .anterior').forEach(btn => {
    btn.addEventListener('click', activar);
  });
});