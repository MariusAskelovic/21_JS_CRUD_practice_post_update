import { crEl } from './helper/crEl.js';
console.log('single-post.js file was loaded');

const url = 'https://dummyjson.com/posts';
const contentEl = document.getElementById('content');

// gauti pId is url parametru

const params = new URLSearchParams(window.location.search);
const postId = params.get('pId');
console.log('postId ===', postId);

// parsiusti to posto objekta

function getPostById() {
  fetch(`${url}/${postId}`)
    .then((resp) => resp.json())
    .then((postObj) => {
      console.log('postObj ===', postObj);
      renderPost(postObj);
    })
    .catch(console.warn);
}
getPostById();
// sugeneruoti html

/*
{
  id: 1,
  title: 'His mother had always taught him',
  body: "His mother ",
  userId: 9,
  tags: ['history', 'american', 'crime'],
  reactions: 2,
}

<h1 class='main-title'>title</h1>
<p class="text">body</p>
<ul class="unlisted">
  <li class="tag">tag</li>
</ul>
<p class="react">2 People liked the post</p>
*/
function renderPost(pObj) {
  console.log('renderPost ran ', pObj);
  const title = crEl('h1', { class: 'main-title' }, pObj.title);
  const pEl = crEl('p', { class: 'text' }, pObj.body);
  const tagTitle = crEl('h2', { class: 'tag-title' }, 'Tags:');

  const ulEl = crEl('ul', { class: 'unlisted flex tags' });
  pObj.tags.forEach((tagString) => {
    const liEl = crEl('li', { class: 'tag' }, tagString);
    ulEl.append(liEl);
  });
  const pLikes = crEl(
    'p',
    { class: 'react' },
    `${pObj.reactions} People liked the post`
  );
  contentEl.append(title, pEl, tagTitle, ulEl, pLikes);
}
