// Join page: timestamp + footer dates + membership modals
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.querySelector('#currentyear');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  const lastMod = document.querySelector('#lastModified');
  if (lastMod) lastMod.textContent = `Last Modification: ${document.lastModified}`;

  const timestamp = document.querySelector('#timestamp');
  if (timestamp) timestamp.value = new Date().toISOString();

  // Force English validation messages (browser locale may show Spanish)
  const form = document.querySelector('.join-form');
  if (form) {
    const fields = form.querySelectorAll('input[required], textarea[required]');
    fields.forEach((field) => {
      field.addEventListener('invalid', () => {
        if (field.validity.valueMissing) {
          field.setCustomValidity('Please complete this field.');
        } else if (field.validity.typeMismatch && field.type === 'email') {
          field.setCustomValidity('Please enter a valid email address (e.g. example@email.com).');
        } else if (field.validity.patternMismatch) {
          field.setCustomValidity('Please use only letters, hyphens and spaces (minimum 7 characters).');
        } else {
          field.setCustomValidity('');
        }
      });
      field.addEventListener('input', () => field.setCustomValidity(''));
    });
  }

  document.querySelectorAll('.more-info').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const dialog = document.getElementById(link.dataset.modal);
      if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
    });
  });

  document.querySelectorAll('dialog .close-modal').forEach((btn) => {
    btn.addEventListener('click', () => btn.closest('dialog').close());
  });

  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });
});
