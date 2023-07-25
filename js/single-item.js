'use strict';
console.log('shop.js file was loaded');

const els = {
  prodCard: document.getElementById('productCard'),
  imgEl: document.getElementById('imgEl'),
  textDiv: document.getElementById('textDiv'),
  title: document.getElementById('title'),
  price: document.getElementById('price'),
  discount: document.getElementById('discount'),
  rating: document.getElementById('rating'),
  stock: document.getElementById('stock'),
  description: document.getElementById('description'),
};

const params = new URLSearchParams(window.location.search);
const currentProductId = params.get('id');
const urlProd = `https://dummyjson.com/products/${currentProductId}`;
fetch(urlProd)
  .then((resp) => resp.json())
  .then((data) => {
    showProduct(data);
  });

function showProduct(oneObj) {
  els.imgEl.src = oneObj.images[0];
  els.title.textContent = oneObj.title;
  els.price.textContent = oneObj.price;
  els.discount.textContent = `Discount: ${oneObj.discountPercentage}%`;
  els.rating.textContent = `User Rating: ${oneObj.rating}`;
  els.stock.textContent = `${oneObj.stock} left`;
  els.description.textContent = oneObj.description;
}
