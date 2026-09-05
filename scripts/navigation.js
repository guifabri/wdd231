/**
 * Navigation Module (navigation.js)
 * Course: WDD 231 - Web Frontend Development I
 * Handles responsive hamburger menu toggle and accessibility states.
 */

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('#menuButton');
  const navMenu = document.querySelector('.nav-menu');

  if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');

      menuButton.setAttribute('aria-expanded', isOpen.toString());
      menuButton.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (event) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        navMenu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.innerHTML = '&#9776;';
      }
    });

    // Close menu when window resizes beyond mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.innerHTML = '&#9776;';
      }
    });
  }
});
