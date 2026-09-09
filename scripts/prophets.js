const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

// 1. Definir la función de renderizado
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Crear elementos HTML
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let birthDate = document.createElement('p');
    let birthPlace = document.createElement('p');
    let portrait = document.createElement('img');

    // Llenar contenido de texto
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Atributos clave de la imagen (mantiene el CLS en verde y carga optimizada)
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Ensamblar la tarjeta
    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(portrait);

    // Inyectar en el DOM
    cards.appendChild(card);
  });
};

// 2. Función asíncrona para obtener los datos con manejo de errores
async function getProphetData() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayProphets(data.prophets);
    } else {
      console.error('Error en la respuesta de la API:', response.status);
    }
  } catch (error) {
    console.error('Error al realizar el fetch:', error);
  }
}

// 3. Ejecución única
getProphetData();