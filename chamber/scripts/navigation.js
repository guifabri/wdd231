/**
 * Chamber Navigation (navigation.js)
 * Mobile hamburger toggle for chamber pages.
 * Button: #menuButton, Menu wrapper: .navigation
 */
document.addEventListener('DOMContentLoaded', () => {
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

  // Close when a link is selected (mobile)
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a') && navigation.classList.contains('open')) {
      setState(false);
    }
  });

  // Close when clicking outside the open menu
  document.addEventListener('click', (event) => {
    if (
      navigation.classList.contains('open') &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      setState(false);
    }
  });

  // Reset when resizing to desktop (button hidden via larger.css)
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && navigation.classList.contains('open')) {
      setState(false);
    }
  });
});
