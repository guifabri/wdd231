import { places } from '../data/discover.mjs';

// Footer dates (same pattern as directory.js / home.js)
const currentYearSpan = document.querySelector('#currentyear');
if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

const lastModifiedP = document.querySelector('#lastModified');
if (lastModifiedP) lastModifiedP.textContent = `Last Modification: ${document.lastModified}`;

// Render 8 discover cards: h2 + figure/img + address + p + button "Learn more"
const grid = document.querySelector('#discover-grid');

function renderPlaces(items) {
  if (!grid) return;
  grid.innerHTML = '';
  items.forEach((place, index) => {
    const card = document.createElement('section');
    card.classList.add('discover-card');
    card.style.gridArea = `card${index + 1}`;
    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}" alt="${place.name}, Ureña" width="300" height="200" loading="lazy">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button">Learn more</button>`;
    grid.appendChild(card);
  });
}

renderPlaces(places);

// Last visit message — simple inline, no overlay/location logic
const visitMessage = document.querySelector('#visit-message');
try {
  const KEY = 'discover-last-visit';
  const now = Date.now();
  const prev = Number(localStorage.getItem(KEY));
  let message = 'Welcome! Let us know if you have any questions.';
  if (prev) {
    const days = Math.floor((now - prev) / 86400000);
    if (days < 1) {
      message = 'Back so soon! Awesome!';
    } else {
      message = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
    }
  }
  if (visitMessage) visitMessage.textContent = message;
  localStorage.setItem(KEY, String(now));
} catch (error) {
  if (visitMessage) visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
}
