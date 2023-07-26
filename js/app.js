import { crEl } from './helper/crEl.js';
console.log('app.js file was loaded');
// taikomes
const els = {
  postsContainer: document.getElementById('posts'),
  sortTitleBtn: document.getElementById('sort-title'),
  sortTitleBtnReverse: document.getElementById('sort-title-reverse'),
  title15Btn: document.getElementById('title15'),
  cards20Btn: document.getElementById('cards20'),
};
// console.log('els ===', els);
const url = 'https://dummyjson.com/posts';

// Declarative way
// Turesim viena pagrindini globalu masyva
// To masyvo reprezentacija bus htmle
// Visi pokyciai bus daromi masyvui, ir iskarto
// juos atspindesim htmle

let mainPostArr = [];

els.sortTitleBtn.addEventListener('click', sortPostByTitle);
els.sortTitleBtnReverse.addEventListener('click', sortPostByTitleReverse);
els.title15Btn.addEventListener('click', title15);
els.cards20Btn.addEventListener('click', cards20);

getPosts();

function getPosts() {
  fetch(url + '?limit=10')
    .then((resp) => resp.json())
    .then((atsObj) => {
      mainPostArr = atsObj.posts;
      render();
    })
    .catch(console.warn);
}

function render() {
  els.postsContainer.innerHTML = '';
  // spauzdindami gautime parsiustus duomenis
  // console.log('render fn mainPostArr ===', mainPostArr);
  const htmlElArr = mainPostArr.map((pObj) => makeOnePostEl(pObj));
  // ===== mano budas update posts count
  // els.postCount.textContent = mainPostArr.length + ' post loaded';
  // console.log('htmlElArr ===', htmlElArr);

  els.postsContainer.append(...htmlElArr);
}

function makeOnePostEl(pObj) {
  const liEl = crEl('li', { class: 'post' });
  const titleEl = crEl('h3', {}, `_${pObj.id}_ ${pObj.title}`);
  const pEl = crEl('p', {}, pObj.body.slice(0, 25) + '...');
  const reactionsEl = crEl('p', { class: 'rating' });
  reactionsEl.innerHTML = pObj.reactions + ' &#x2605;';
  const linkEl = crEl(
    'a',
    { class: 'post-link', href: `single-post.html?pId=${pObj.id}` },
    'Read more...'
  );
  liEl.append(titleEl, pEl, reactionsEl, linkEl);
  // console.log('liEl ===', liEl);
  return liEl;
}

function sortPostByTitle() {
  console.log('sortPostByTitle ran');
  // isrikiuoti
  mainPostArr.sort((aObj, bObj) => {
    return aObj.title.localeCompare(bObj.title);
  });
  console.table(mainPostArr);
  // perpiesti masyva po isrikiavimo
  render();
}

function sortPostByTitleReverse() {
  mainPostArr.sort((aObj, bObj) => aObj.title < bObj.title);
  render();
}

function title15() {
  mainPostArr.map((postObj) => {
    postObj.title = postObj.title.slice(0, 5);
    return postObj;
  });
  render();
}

function cards20() {
  fetch(url + '?limit=20')
    .then((resp) => resp.json())
    .then((atsObj) => {
      mainPostArr = atsObj.posts;
      render();
    })
    .catch(console.warn);
}

function updatePostsCount() {
  const postsCount = mainPostArr.length;
  console.log('postsCount ===', postsCount);
  return postsCount;
}
