import { crEl } from './helper/crEl.js';
console.log('app.js file was loaded');

const els = {
  postContainer: document.getElementById('posts'),
  sortTitleBtn: document.getElementById('sort-title'),
  sortTitleBtnBack: document.getElementById('sort-title-back'),
};

const url = 'https://dummyjson.com/posts';

// Declarative way
// Turesim viena pagrindini globalu masyva
// To masyvo reprezentacija bus HTML'e
// Visi pokyciai bus daromi masyvui,
// ir iskarto juos atspindesim HTML'e

let mainPostArr = [];

els.sortTitleBtn.addEventListener('click', sortPostByTitle);
els.sortTitleBtnBack.addEventListener('click', sortPostByTitleReverse);

getPosts();

function getPosts() {
  fetch(url + '?limit=10')
    .then((resp) => resp.json())
    .then((atsObj) => {
      mainPostArr = atsObj.posts;
      render();
    })
    .catch(console.warn());
}

function render() {
  // spausdindami gautume parsiustus duomenis
  els.postContainer.innerHTML = '';
  const htmlElArr = mainPostArr.map((pObj) => makeOnePostEl(pObj));
  console.log('htmlElArr ===', htmlElArr);
  els.postContainer.append(...htmlElArr);
}

/*
const singlePost = {
  id: 1,
  title: 'His mother had always taught him',
  body: 'His mother',
  userId: 9,
  tags: ['history', 'american', 'crime'],
  reactions: 2,
};
to ========
<li class="post">
    <h3>title</h3>
    <p>intro</p>
    <a class="post-link" href="#">read more...</a>
</li>
*/

function makeOnePostEl(pObj) {
  const liEl = crEl('li', { class: 'post' });
  const titleEl = crEl('h3', {}, `_:${pObj.id}_ ${pObj.title}`);
  const pEl = crEl('p', {}, pObj.body.slice(0, 25) + '...');
  const linkEl = crEl(
    'a',
    { class: 'post-link', href: `single-post.html?pId=${pObj.id}` },
    'read more...'
  );
  liEl.append(titleEl, pEl, linkEl);
  return liEl;
}

function sortPostByTitle() {
  // isrikiuoti
  mainPostArr.sort((aObj, bObj) => aObj.title > bObj.title);
  // perpiesti masyva po sorto
  render();
}

function sortPostByTitleReverse() {
  mainPostArr.sort((aObj, bObj) => {
    return aObj.title < bObj.title;
  });
  render();
}
