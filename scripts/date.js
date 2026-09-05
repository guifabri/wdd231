/**
 * Date & Dynamic Footer Module (date.js)
 * Course: WDD 231 - Web Frontend Development I
 * Injects the dynamic copyright year and last modified timestamp.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year
  const currentYearSpan = document.getElementById('currentyear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Last Modified Date & Time
  const lastModifiedEl = document.getElementById('lastModified');
  if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
  }
});

