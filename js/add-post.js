console.log('add-post.js file was loaded');

// taikomes
const els = {
  form: document.forms[0],
  title: document.getElementById('title'),
  body: document.getElementById('body'),
  tags: document.getElementById('tags'),
};
console.log('els ===', els);

// uzdeti formai submit listeneri
els.form.addEventListener('submit', newPostHandler);

// formos apdorojimo funkcija
/**
 * Pagrindine formo apdorojimo funkcija
 * @param {SubmitEvent} event
 */
function newPostHandler(event) {
  // stabdom perkrovima
  event.preventDefault();
  console.log('submiting form');
  // paimti visus inputus is formos is sudeti i viena objekta

  const newPostObj = {
    title: els.title.value.trim(),
    body: els.body.value.trim(),
    tags: els.tags.value.split(',').map((tag) => tag.trim()),
    userId: 15,
  };

  sendNewPostFetch(newPostObj);
}

// { 'Content-Type': 'application/json' },
function sendNewPostFetch(newPostDataObj) {
  // console.log('newPostInJson fn ran ===', newPostInJson);
  const newPostInJson = JSON.stringify(newPostDataObj);
  fetch('https://dummyjson.com/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: newPostInJson,
  })
    .then((resp) => resp.json())
    .then((postResult) => {
      console.log('post result === ', postResult);
      if (postResult.id) {
        // jei id gryzo, tai sukurtas irasas
        console.log('sekme');
        // naviguoti i index.html
        // window.location.href = 'index.html';
      } else {
        // kitu atveju klaida
        console.warn('kazkas nepavyko', postResult.message);
        const h1El = document.querySelector('.container h1');
        h1El.textContent = postResult.message;
        h1El.style.color = 'red';
      }
    })
    .catch(console.warn);
}
