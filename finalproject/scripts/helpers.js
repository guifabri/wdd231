export function fmtPrice(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return '$0.00';
  return `$${n.toFixed(2)}`;
}

const FAV_KEY = 'fastburger-favs';

export function getFavs() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
  } catch {
    return [];
  }
}

export function isFav(id) {
  return getFavs().includes(Number(id));
}

export function toggleFav(id) {
  const favs = getFavs();
  const num = Number(id);
  const i = favs.indexOf(num);
  if (i >= 0) favs.splice(i, 1);
  else favs.push(num);
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  } catch {
    // storage unavailable, ignore
  }
  return favs;
}

export function getLastCategory() {
  try {
    return localStorage.getItem('fastburger-filter') || 'all';
  } catch {
    return 'all';
  }
}

export function setLastCategory(value) {
  try {
    localStorage.setItem('fastburger-filter', value);
  } catch {
    // ignore
  }
}
