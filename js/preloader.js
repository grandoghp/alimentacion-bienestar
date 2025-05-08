// Script para el preloader

window.addEventListener('load', function() {
    // Ocultar el preloader y mostrar el contenido después de que la página cargue completamente
    setTimeout(function() {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('contenido').style.display = 'block';
        }, 500);
    }, 1500); // Esperar 1.5 segundos antes de ocultar el preloader
});