async function cargarRecursos(categoria) {
  try {
    //console.log('Categoría:', categoria);

    // Ejemplo de fetch y procesamiento de recursos
    const response = await fetch("scripts/recursos.json"); // Ruta relativa desde la raíz del servidor
    if (!response.ok) {
      throw new Error('Failed to fetch recursos.json');
    }
    const resources = await response.json();

    // Filtrar recursos por categoría
    const filteredResources = resources.filter(resource => resource.categorias.includes(categoria));
    //console.log('Recursos filtrados:', filteredResources);

    // Insertar las tarjetas de recursos filtrados en el contenedor
    filteredResources.forEach(resource => {
      insertCard(resource);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function createCard(resource) {
  const divCard = document.createElement('div');
  divCard.classList.add('recurso');

  const { nombre, link, descripcion, categorias } = resource;
  divCard.innerHTML = `
    <h3 class="recurso-title">${nombre}</h3>
    <div class="recurso-descripcion">
      ${descripcion}
      <div class="recurso-boton">
        <a href="${link}" target="_blank">Sitio Recurso</a>
      </div>
      <div class="categorias">
        ${categorias.map(categoria => `
          <div class="categoria">
            <a href="#" target="_blank">${categoria}</a>
          </div>`).join('')}
      </div>
    </div>
  `;

  return divCard;
}

function insertCard(resource) {
  const container = document.getElementById('recursos-container');
  const card = createCard(resource);
  container.appendChild(card);
}
