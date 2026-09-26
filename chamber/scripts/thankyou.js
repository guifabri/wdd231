// Thank-you page: footer dates + display submitted form data
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.querySelector('#currentyear');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  const lastMod = document.querySelector('#lastModified');
  if (lastMod) lastMod.textContent = `Last Modification: ${document.lastModified}`;

  const params = new URLSearchParams(window.location.search);
  const results = document.querySelector('#results');
  if (!results) return;

  const fields = [
    ['First Name', params.get('fname')],
    ['Last Name', params.get('lname')],
    ['Email', params.get('email')],
    ['Mobile Phone', params.get('phone')],
    ['Business Name', params.get('business')],
    ['Submitted', params.get('timestamp')],
  ];

  results.innerHTML = '';
  fields.forEach(([label, value]) => {
    const p = document.createElement('p');
    let display = value || 'Not provided';
    if (label === 'Submitted' && value) {
      const date = new Date(value);
      if (!isNaN(date)) display = date.toLocaleString('en-US');
    }
    p.innerHTML = `<strong>${label}:</strong> `;
    p.appendChild(document.createTextNode(display));
    results.appendChild(p);
  });
});
