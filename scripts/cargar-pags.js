async function cargarPags() {
    try {
      // Fetch y procesamiento de recursos
      const response = await fetch("../scripts/paginas.json"); // Ruta relativa desde la raíz del servidor
      if (!response.ok) {
        throw new Error('Failed to fetch paginas.json');
      }
      const resources = await response.json();
  
      // Insertar cada recurso en el contenedor
      resources.forEach(resource => {
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
    const card = createCard(resource);
    container.appendChild(card);
  }

