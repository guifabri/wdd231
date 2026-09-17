// Chamber Home: footer dates + random spotlights + Urena weather (current + 3-day)
// Ureña, Tachira: lat 7.918, lon -72.447 (72.447 W) | metric = Celsius
const API_KEY = 'eab4722df416e8205ba55ea74c45e341';
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=7.918&lon=-72.447&units=metric&appid=${API_KEY}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=7.918&lon=-72.447&units=metric&appid=${API_KEY}`;

// --- 1. Footer dates ---
const currentYearSpan = document.querySelector('#currentyear');
if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
const lastModifiedP = document.querySelector('#lastModified');
if (lastModifiedP) lastModifiedP.textContent = `Last Modification: ${document.lastModified}`;

// --- 2. Spotlights: random Gold/Silver members via fetch ---
const spotlightsContainer = document.querySelector('#spotlights');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function getSpotlights() {
  if (!spotlightsContainer) return;
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw Error(await response.text());
    const members = await response.json();
    const eligible = members.filter((m) => m.membership === 'Gold' || m.membership === 'Silver');
    const picks = shuffle([...eligible]).slice(0, 3);
    displaySpotlights(picks);
  } catch (error) {
    console.log(error);
  }
}

function displaySpotlights(members) {
  spotlightsContainer.innerHTML = '';
  members.forEach((member) => {
    const card = document.createElement('section');
    card.classList.add('member-card');
    card.innerHTML = `
      <h3>${member.name}</h3>
      <p class="tagline">${member.membership} Member</p>
      <hr>
      <div class="card-body">
        <div class="logo-box">
          <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
        </div>
        <div class="card-info">
          <p><strong>PHONE:</strong> ${member.phone}</p>
          <p><strong>ADDRESS:</strong> ${member.address}</p>
          <p><strong>URL:</strong> <a href="https://${member.website.replace(/^https?:\/\//, '')}" target="_blank" rel="noopener">${member.website}</a></p>
        </div>
      </div>`;
    spotlightsContainer.appendChild(card);
  });
}

// --- 3. Weather: current + 3-day forecast ---
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('.weather figcaption');
const forecastContainer = document.querySelector('#forecast');

function displayCurrent(data) {
  if (currentTemp) currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;C`;
  if (weatherIcon) {
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    weatherIcon.setAttribute('loading', 'lazy');
    weatherIcon.setAttribute('width', '100');
    weatherIcon.setAttribute('height', '100');
  }
  if (captionDesc) captionDesc.textContent = data.weather[0].description;
}

function displayForecast(data) {
  if (!forecastContainer) return;
  // One entry per day at ~12:00, fallback to even spacing
  let daily = data.list.filter((item) => item.dt_txt.includes('12:00:00')).slice(0, 3);
  if (daily.length < 3) daily = [data.list[8], data.list[16], data.list[24]].filter(Boolean);
  forecastContainer.innerHTML = '';
  daily.forEach((item) => {
    const day = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
    const article = document.createElement('article');
    article.classList.add('forecast-day');
    article.innerHTML = `
      <h4>${day}</h4>
      <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="${item.weather[0].description}" loading="lazy" width="60" height="60">
      <p><strong>${item.main.temp.toFixed(0)}&deg;C</strong></p>
      <p class="forecast-desc">${item.weather[0].description}</p>`;
    forecastContainer.appendChild(article);
  });
}

async function getWeather() {
  try {
    const [resCurrent, resForecast] = await Promise.all([fetch(currentUrl), fetch(forecastUrl)]);
    if (!resCurrent.ok) throw Error(await resCurrent.text());
    if (!resForecast.ok) throw Error(await resForecast.text());
    displayCurrent(await resCurrent.json());
    displayForecast(await resForecast.json());
  } catch (error) {
    console.log(error);
  }
}

getSpotlights();
getWeather();
