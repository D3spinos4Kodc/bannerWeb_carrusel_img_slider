// — Selección del carrusel y función de transición manual —
const carrusel = document.querySelector('.carrusel');

function activar(e) {
  if (carrusel.classList.contains('transicionando')) return;
  const elementos = document.querySelectorAll('.elemento');
  if (e.target.matches('.siguiente') || e.target.matches('.anterior')) {
    carrusel.classList.add('transicionando');
    void carrusel.offsetWidth;
    setTimeout(() => {
      if (e.target.matches('.siguiente')) {
        carrusel.append(elementos[0]);
      } else {
        carrusel.prepend(elementos[elementos.length - 1]);
      }
      setTimeout(() => {
        carrusel.classList.remove('transicionando');
      }, 0);
    }, 0);
  }
}

document.addEventListener('click', activar, false);

// — Inicialización al cargar la página —
window.addEventListener('DOMContentLoaded', () => {
  // Precarga de imágenes
  document.querySelectorAll('.elemento').forEach(el => {
    const url = el.style.backgroundImage.replace(/url\(['"](.+)['"]\)/, '$1');
    (new Image()).src = url;
  });

  // Animación de inicio suave
  setTimeout(() => {
    carrusel.classList.add('transicionando');
    setTimeout(() => carrusel.classList.remove('transicionando'), 900);
  }, 1000);

  // — Loop automático: solo un satélite dispara el cambio —
  const primeraOrbita = document.querySelector('.orb1');
  const btnSiguiente = document.querySelector('.siguiente');
  if (primeraOrbita && btnSiguiente) {
    primeraOrbita.addEventListener('animationiteration', () => {
      btnSiguiente.click();
    });
  }
});