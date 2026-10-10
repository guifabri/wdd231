document.addEventListener('DOMContentLoaded', () => {
  const results = document.querySelector('#order-results');
  if (!results) return;
  const params = new URLSearchParams(window.location.search);
  const fields = [
    ['Name', params.get('name')],
    ['Email', params.get('email')],
    ['Food', params.get('food')],
    ['Quantity', params.get('quantity')],
    ['Submitted', params.get('timestamp')]
  ];
  results.innerHTML = '';
  fields.forEach(([label, value]) => {
    const p = document.createElement('p');
    let display = value || 'Not provided';
    if (label === 'Submitted' && value) {
      const date = new Date(value);
      if (!Number.isNaN(date.getTime())) display = date.toLocaleString('en-US');
    }
    p.innerHTML = `<strong>${label}:</strong> `;
    p.appendChild(document.createTextNode(display));
    results.appendChild(p);
  });
});
