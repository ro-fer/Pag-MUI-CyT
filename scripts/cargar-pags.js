async function cargarRecursos() {
  try {
    console.log('Intentando cargar recursos...');
    const response = await fetch("scripts/paginas.json"); // Ruta relativa o absoluta según tu configuración
    if (!response.ok) {
      throw new Error('Failed to fetch paginas.json');
    }
    console.log('Recursos cargados exitosamente.');
    const resources = await response.json();

    // Insertar cada recurso en el contenedor
    resources.forEach(resource => {
      console.log('Insertando recurso:', resource);
      insertCard(resource);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function createCard(resource) {
  const divCard = document.createElement('div');
  divCard.classList.add('container');

  const { nombre, link, descripcion, img } = resource;
  divCard.innerHTML = `
    <h4 class="pag-title">${nombre}</h4>
    <div class="img">
      <img src="${img}" alt="${nombre}" class="img-pag">
    </div>
    <div class="titulo">
          <h4><a href="${link}" target="_blank" class="link-pag">${nombre}</a></h4>
      </div>
      <div class="descripcion">
          <p>${descripcion}</p>
      </div>
  `;

  return divCard;
}

function insertCard(resource) {
  const container = document.getElementById('container-pag');
  if (container) {
    const card = createCard(resource);
    container.appendChild(card);
    console.log('Recurso insertado:', resource);
  } else {
    console.error('No se encontró el contenedor con el ID container-pag');
  }
}

// Llamar a cargarRecursos cuando la página se haya cargado
document.addEventListener('DOMContentLoaded', () => {
  console.log('Documento cargado. Iniciando carga de recursos...');
  cargarRecursos();
});
