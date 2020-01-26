'use strict';

const feed = document.querySelector('.feed');
const area = document.querySelector('.post-adder__area');
const button = document.querySelector('.post-adder__button');

button.addEventListener('click', addPost);
area.addEventListener('focus', () => {
  document.addEventListener('keydown', hotKeysCheck);
});
area.addEventListener('blur', () => {
  document.removeEventListener('keydown', hotKeysCheck);
});

function addPost() {
  const areaText = area.value;
  if (areaText.trim()) {
    const li = document.createElement('li');
    li.classList.add('comment');
    
    const info = document.createElement('div');
    info.classList.add('comment__info');
  
    const name = document.createElement('p');
    name.classList.add('comment__name');
    name.textContent = 'Стандартное имя';

    const date = document.createElement('p');
    date.classList.add('comment__date');
    const today = new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).split(' ');
    date.textContent = `${today[0]} ${today[1]} ${today[2]}`;

    info.append(name, date);
    
    const text = document.createElement('p');
    text.classList.add('comment__text');
    text.textContent = area.value;
    
    li.append(info, text);
    feed.append(li);
    area.value = '';
  }
}

function hotKeysCheck(e) {
  if (e.ctrlKey && e.keyCode == 13) {
    addPost();
  }
}




