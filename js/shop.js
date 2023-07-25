import { crEl } from './helper/crEl.js';

console.log('shop.js file was loaded');

const productsDivEl = document.getElementById('products');

const urlProd = 'https://dummyjson.com/products';
fetch(urlProd)
  .then((resp) => resp.json())
  .then((data) => {
    const prodObj = data.products;
    getProducts(prodObj);
  });

function getProducts(arr) {
  arr.map((oneProd) => {
    // const oneProductDiv = document.createElement('div');
    const oneProductDiv = crEl('div', { class: 'product' });

    const idEl = crEl('p', {}, oneProd.id);
    const titleEl = crEl('h4', {}, oneProd.title);
    const priceEl = crEl('h5', {}, oneProd.price);
    const discPercEl = crEl('p', {}, oneProd.discountPercentage);
    const ratingEl = crEl('p', {}, oneProd.rating);
    const stockEl = crEl('p', {}, oneProd.stock);
    const brandEl = crEl('p', {}, oneProd.brand);
    const categEl = crEl('p', {}, oneProd.categoty);
    const thumbImgEl = crEl('img', {
      src: oneProd.thumbnail,
      alt: `${oneProd.title} product photo`,
      class: 'thumbnail',
    });
    const infoDiv = crEl('div', { class: 'info' });
    const daugiauBtn = crEl(
      'a',
      { href: `single-item.html?id=${oneProd.id}` },
      'Daugiau'
    );

    infoDiv.append(
      titleEl,
      priceEl,
      idEl,
      ratingEl,
      stockEl,
      discPercEl,
      daugiauBtn
    );
    oneProductDiv.append(thumbImgEl, infoDiv);
    productsDivEl.append(oneProductDiv);
  });
}
