import { fmtPrice, getFavs, toggleFav, getLastCategory, setLastCategory, isFav } from './helpers.js';

const grid = document.querySelector('#menu-grid');
const count = document.querySelector('#menu-count');
const errorBox = document.querySelector('#menu-error');
const filterButtons = document.querySelectorAll('[data-filter]');
const dialog = document.querySelector('#item-dialog');

let allItems = [];
let activeFilter = getLastCategory();

async function loadMenu() {
  try {
    const response = await fetch('data/menu.json');
    if (!response.ok) throw new Error(await response.text());
    allItems = await response.json();
    applyFilter(activeFilter);
  } catch (error) {
    if (errorBox) errorBox.textContent = 'Could not load the menu. Please try again later.';
  }
}

function filteredItems(category) {
  if (category === 'all') return allItems;
  return allItems.filter((item) => item.category === category);
}

function renderItems(items) {
  if (!grid) return;
  grid.innerHTML = '';
  const favs = getFavs();
  items.forEach((item) => {
    const card = document.createElement('section');
    card.classList.add('menu-card');
    card.style.gridArea = `c${item.id}`;
    const liked = favs.includes(Number(item.id));
    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
      </figure>
      <p class="menu-desc">${item.description}</p>
      <p class="menu-price"><strong>${fmtPrice(item.price)}</strong> <span class="menu-cat">${item.category}</span></p>
      <div class="menu-actions">
        <button type="button" data-details="${item.id}">Learn more</button>
        <button type="button" data-like="${item.id}" aria-pressed="${liked}">${liked ? '♥ Liked' : '♡ Like'}</button>
      </div>`;
    grid.appendChild(card);
  });
  if (count) {
    const total = items.reduce((sum, item) => sum + Number(item.price), 0);
    count.textContent = `${items.length} items — Total ${fmtPrice(total)}`;
  }
}

function applyFilter(category) {
  activeFilter = category;
  setLastCategory(category);
  filterButtons.forEach((btn) => {
    const on = btn.dataset.filter === category;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-pressed', String(on));
  });
  renderItems(filteredItems(category));
}

function openDetails(id) {
  const item = allItems.find((entry) => Number(entry.id) === Number(id));
  if (!item || !dialog) return;
  dialog.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
      <img src="${item.image}" alt="${item.name}" width="300" height="200">
    </figure>
    <p>${item.description}</p>
    <p><strong>Price:</strong> ${fmtPrice(item.price)}</p>
    <p><strong>Category:</strong> ${item.category}</p>
    <p><strong>Favorite:</strong> ${isFav(item.id) ? 'Yes' : 'No'}</p>
    <button type="button" class="close-modal">Close</button>`;
  const closeBtn = dialog.querySelector('.close-modal');
  if (closeBtn) closeBtn.addEventListener('click', () => dialog.close());
  if (typeof dialog.showModal === 'function') dialog.showModal();
}

if (grid) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  grid.addEventListener('click', (event) => {
    const detailsBtn = event.target.closest('[data-details]');
    if (detailsBtn) {
      openDetails(detailsBtn.dataset.details);
      return;
    }
    const likeBtn = event.target.closest('[data-like]');
    if (likeBtn) {
      toggleFav(likeBtn.dataset.like);
      renderItems(filteredItems(activeFilter));
    }
  });

  if (dialog) {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  loadMenu();
}
