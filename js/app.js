'use strict';
console.log('app.js file was loaded');

const url = 'https://dummyjson.com/posts';

// Declarative way
// Turesim viena pagrindini globalu masyva
// To masyvo reprezentacija bus HTML'e
// Visi pokyciai bus daromi masyvui,
// ir iskarto juos atspindesim HTML'e

let mainPostArr = [];

getPosts();
render();

function getPosts() {
  fetch(url + '?limit=10')
    .then((resp) => resp.json())
    .then((atsObj) => {
      mainPostArr = atsObj.posts;
      render(mainPostArr);
    })
    .catch(console.warn());
}

function render() {
  // spausdindami gautume parsiustus duomenis
  console.log('mainPostArr ===', mainPostArr);
}
