document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('#currentyear');
  if (year) year.textContent = new Date().getFullYear();
  const lastMod = document.querySelector('#lastModified');
  if (lastMod) lastMod.textContent = `Last Modification: ${document.lastModified}`;

  const timestamp = document.querySelector('#timestamp');
  if (timestamp) timestamp.value = new Date().toISOString();

  const menuButton = document.querySelector('#menuButton');
  const navigation = document.querySelector('.navigation');
  if (!menuButton || !navigation) return;

  const setState = (open) => {
    navigation.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menuButton.innerHTML = open ? '&times;' : '&#9776;';
  };

  menuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    setState(!navigation.classList.contains('open'));
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a') && navigation.classList.contains('open')) setState(false);
  });

  document.addEventListener('click', (event) => {
    if (navigation.classList.contains('open') && !navigation.contains(event.target) && !menuButton.contains(event.target)) setState(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && navigation.classList.contains('open')) setState(false);
  });
});
