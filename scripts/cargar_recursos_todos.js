async function cargarTodos() {
    try {
        // Cargar datos de categorías
        const categoriasResponse = await fetch("../scripts/categorias_completas.json");
        if (!categoriasResponse.ok) {
            throw new Error("Failed to fetch categorias_completas.json");
        }
        const categoriasData = await categoriasResponse.json();

        // Crear un objeto de categorías para acceso rápido
        const categoriasMap = {};
        categoriasData.forEach(categoria => {
            categoriasMap[categoria.nombre] = categoria;
        });

        // Cargar datos de recursos
        const recursosResponse = await fetch("../scripts/recursos.json");
        if (!recursosResponse.ok) {
            throw new Error('Failed to fetch recursos.json');
        }
        const recursosData = await recursosResponse.json();

        // Crear contenedores de categorías
        const container = document.getElementById("section-carousel");
        container.innerHTML = ''; // Limpiar contenedor antes de agregar nuevos elementos

        categoriasData.forEach(categoria => {
            // Excluir "Todos" y "Nuevo Recurso"
            if (categoria.nombre === "Todos" || categoria.nombre === "Nuevo Recurso") {
                return;
            }

            const section = crearSeccionCategoria(categoria, recursosData, categoriasMap);
            container.appendChild(section);
        });

        // Aplicar imágenes de fondo a través de ::before
        document.querySelectorAll('.car-categoria').forEach(div => {
            const fondo = div.getAttribute('data-fondo');
            if (fondo) {
                div.style.setProperty('--fondo', `url(${fondo})`);
            }
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
}

function crearSeccionCategoria(categoria, recursosData, categoriasMap) {
    const divCategoria = document.createElement('div');
    divCategoria.classList.add('car-categoria');
    divCategoria.setAttribute('id', `categoria-${categoria.nombre}`);
    divCategoria.setAttribute('data-fondo', categoria.fondo); // Guardar la URL del fondo en un atributo de datos

    // Agregar el título y enlace
    divCategoria.innerHTML = `<h2><a href="${categoria.link_page}" target="_blank">${categoria.nombre}</a></h2>`;
    
    // Crear el contenedor para los recursos
    const divTrack = document.createElement('div');
    divTrack.classList.add('track');
    divCategoria.appendChild(divTrack);

    // Insertar los recursos en la lista
    recursosData.forEach(resource => {
        if (resource.categorias.includes(categoria.nombre)) {
            const card = createCard(resource, categoriasMap);
            divTrack.appendChild(card);
        }
    });

    return divCategoria;
}

function createCard(resource, categoriasMap) {
    const divCardCont = document.createElement('div');
    divCardCont.classList.add('card-container');
    
    const divCard = document.createElement('div');
    divCard.classList.add('card');

    const { nombre, link, descripcion, categorias } = resource;

    // Generar HTML de categorías
    let categoriasHTML = categorias.map(categoria => {
        const categoriaData = categoriasMap[categoria];
        return categoriaData
            ? `<div class="categoria"><a href="${categoriaData.link_page}" target="_blank">${categoria}</a></div>`
            : `<div class="categoria">${categoria}</div>`;
    }).join("");

    divCard.innerHTML = `
        <h3 class="recurso-title car-titulo-rec">${nombre}</h3>
        <div class="recurso-descripcion car-descri">
            <p class="descripcion-todos">${descripcion}</p>
            <div class="spacer"></div>
            <div class="recurso-boton car-boton">
                <a href="${link}" target="_blank">Link</a>
            </div>
            <div class="categorias car-cat">
                ${categoriasHTML}
            </div>
        </div>
    `;

    divCardCont.appendChild(divCard);

    return divCardCont;
}

// Llamar a la función para cargar todos los recursos y categorías al cargar la página
document.addEventListener('DOMContentLoaded', cargarTodos);
