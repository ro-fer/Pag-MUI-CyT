async function cargarContenidoExtra() {
    try {
        const response = await fetch("scripts/categorias.json");
        if (!response.ok) {
            throw new Error("Failed to fetch categorias.json");
        }
        const data = await response.json();
        agregarContenidoExtra(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function agregarContenidoExtra(data) {
    const dropdown = document.getElementById('dropdown');
    if (!dropdown) {
        console.error('No se encontró el contenedor principal para insertar el contenido adicional.');
        return;
    }

    let contenidoHTML = '';

    for (const categoria in data) {
        if (data.hasOwnProperty(categoria)) {
            if(categoria=='Todos' ){
                contenidoHTML += '<li class="dropdown-separator"></li>';
            }
            contenidoHTML += `<li><a class="dropdown-item" href="${data[categoria]}" target="_blank">${categoria}</a></li>`;
        }
    }
    
    dropdown.innerHTML = contenidoHTML;
}

// Llamar a la función para cargar y agregar el contenido adicional
cargarContenidoExtra();

// Manejar el clic en el botón de "Recursos" para mostrar/ocultar el menú desplegable
document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    const recursosBtn = document.getElementById('recursos-btn');
    const dropdown = document.getElementById('dropdown');

    menuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    recursosBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Evita que el clic se propague y cierre el menú inmediatamente
        dropdown.classList.toggle('show-dropdown');
    });

    document.addEventListener('click', function() {
        dropdown.classList.remove('show-dropdown');
    });

    dropdown.addEventListener('click', function(event) {
        event.stopPropagation(); // Evita que el menú se cierre cuando se hace clic dentro de él
    });
});

