fetch('products.json')
  .then(r => r.json())
  .then(({ products }) => {
    const mount = document.getElementById('catalog');

    products.forEach(p => {
      // Ensure optional fields
      const features = Array.isArray(p.features) ? p.features : [];
      const labels = (p.sizes && p.sizes.labels) || ["S","M","L","XL","2XL","3XL","4XL","5XL","6XL","7XL"];
      const values = (p.sizes && p.sizes.values) || new Array(labels.length).fill("");

      const el = document.createElement('section');
      el.className = 'product';
      el.innerHTML = `
        <div class="row">
          <img class="photo" src="${p.image}" alt="${p.name}">
          <div class="details">
            <div class="headline">
              <div class="code">${p.code}</div>
              <div class="price">${p.price}</div>
            </div>
            <div class="title">${p.name}</div>
            ${features.length ? `
              <ul class="features">
                ${features.map(f => `<li>${f}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        </div>
        <table class="size-table" aria-label="sizes">
          <thead>
            <tr>${labels.map(l => `<th>${l}</th>`).join('')}</tr>
          </thead>
          <tbody>
            <tr>${values.map(v => `<td>${v}</td>`).join('')}</tr>
          </tbody>
        </table>
      `;
      mount.appendChild(el);
    });
  })
  .catch(e => {
    console.error('Error loading products:', e);
    document.getElementById('catalog').innerHTML =
      `<p>Could not load products.json.</p>`;
  });

