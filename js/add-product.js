console.log('add-product.js file was loaded');

const els = {
  form: document.forms[0],
  title: document.getElementById('title'),
  price: document.getElementById('price'),
  brand: document.getElementById('brand'),
  thumbnail: document.getElementById('thumbnail'),
  category: document.getElementById('category'),
};

els.form.addEventListener('submit', newProductHandler);

function newProductHandler(event) {
  event.preventDefault();

  const newProductObj = {
    title: els.title.value.trim(),
    price: els.price.value.trim(),
    brand: els.brand.value.trim(),
    thumbnail: els.thumbnail.value.trim(),
    category: els.category.value,
    userId: 5,
  };

  sendNewProductFetch(newProductObj);
}

function sendNewProductFetch(newProductDataObj) {
  const newProductInJson = JSON.stringify(newProductDataObj);

  fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: newProductInJson,
  })
    .then((resp) => resp.json())
    .then((result) => {
      console.log('result === ', result);
      if (result.id) {
        console.log('sekme');
        window.location.href = 'shop.html';
      } else {
        console.warn('kazkas blogai ', result.message);
      }
    })
    .catch(console.warn);
}
