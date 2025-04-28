// Selecciona el contenedor principal del carrusel
const slider = document.querySelector('.slider');

// Función principal que maneja las transiciones del carrusel
function activate(e) {
  // Evita que se activen múltiples transiciones simultáneamente
  if (slider.classList.contains('transitioning')) return;
  
  // Obtiene todos los elementos del carrusel
  const items = document.querySelectorAll('.item');
  
  // Verifica si se hizo clic en alguno de los botones de navegación
  if (e.target.matches('.next') || e.target.matches('.prev')) {
    // Agrega la clase que activa los efectos de transición
    slider.classList.add('transitioning');
    
    // Fuerza un reflow del DOM para asegurar que los estilos se apliquen inmediatamente
    // Esto es un "truco" para forzar al navegador a procesar los cambios de CSS
    void slider.offsetWidth;
    
    // Establece un temporizador para realizar el cambio real de imágenes
    // después de que la animación visual haya comenzado
    setTimeout(() => {
      if (e.target.matches('.next')) {
        // Si se presiona "siguiente", mueve el primer elemento al final
        slider.append(items[0]);
      } else if (e.target.matches('.prev')) {
        // Si se presiona "anterior", mueve el último elemento al principio
        slider.prepend(items[items.length-1]);
      }
      
      // Retrasa la eliminación de la clase de transición
      // para permitir que termine la animación visual
      setTimeout(() => {
        slider.classList.remove('transitioning');
      }, 0); // Tiempo muy corto para finalizar la transición
    }, 0); // Tiempo reducido para hacer la transición más rápida (era 400ms)
  }
}

// Agrega el controlador de eventos para detectar clics en los botones
document.addEventListener('click', activate, false);

// Inicializa el carrusel cuando se carga completamente la página
window.addEventListener('DOMContentLoaded', () => {
  // Precarga las imágenes para evitar parpadeos durante las transiciones
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    // Extrae la URL de la imagen del estilo CSS
    const bgUrl = item.style.backgroundImage.replace(/url\(['"](.+)['"]\)/, '$1');
    // Crea un objeto Image que cargará la imagen en caché del navegador
    const img = new Image();
    img.src = bgUrl;
  });
  
  // Aplica una animación inicial para mostrar el efecto de transición al cargar
  setTimeout(() => {
    slider.classList.add('transitioning');
    setTimeout(() => {
      slider.classList.remove('transitioning');
    }, 900); // Duración de la animación inicial
  }, 1000); // Retraso antes de iniciar la animación
});