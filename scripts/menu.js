async function cargarContenidoExtra() {
    try {
        const response = await fetch("../scripts/categorias.json");
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
    const container = document.getElementById('recursos');
    if (!container) {
        console.error('No se encontró el contenedor principal para insertar el contenido adicional.');
        return;
    }

    let contenidoHTML = '<ul class="dropdown" id="dropdown">'; // Inicializar contenidoHTML correctamente

    for (const categoria in data) {
        if (data.hasOwnProperty(categoria)) {
            contenidoHTML += `<li><a href="${data[categoria]}" target="_blank">${categoria}</a></li>`;
        }
    }

    contenidoHTML += '</ul>'; // Cerrar la lista

    const extraDiv = document.createElement('div'); // Crear el div extraDiv aquí
    extraDiv.id = 'contenido-extra';
    extraDiv.classList.add('extra-contenido');
    extraDiv.innerHTML = contenidoHTML;

    container.appendChild(extraDiv);
}

// scripts/menu.js
document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
});


// Llamar a la función para cargar y agregar el contenido adicional
cargarContenidoExtra();
