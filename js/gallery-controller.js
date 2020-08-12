'use strict';

const KEY = 'MY_MEMES';
let gImgsCount = 18;
let gMyMemes;


function openGallery(isGallery) {
    document.querySelector('.meme-editor').classList.add('hidden');
    document.querySelector('.gallery-container').classList.remove('hidden');
    if (isGallery) renderGallery();
    else renderMyMemes();
}

function renderGallery() {
    let strHTML = '';
    for (let i = 1; i <= gImgsCount; i++) {
        strHTML += `<img src="img/meme-imgs-square/${i}.jpg" onclick="initMemeEditor(${i})"  class="square"/>`
    }
    document.querySelector('.img-list-container').innerHTML = strHTML;
    getMyMemes();
}

function renderMyMemes() {
    getMyMemes();
    let strHTML = '';
    gMyMemes.forEach(img => {
        strHTML += `<img src="${img}" class="square" />`;
    });
    document.querySelector('.img-list-container').innerHTML = strHTML;
}

// MY MEMES

function getMyMemes() {
    gMyMemes = loadFromStorage(KEY);
    if (!gMyMemes) gMyMemes = [];
}

