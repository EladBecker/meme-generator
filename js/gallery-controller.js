'use strict';

let gImgsCount = 18;

function initGallery() {
    renderGallery();
}

function renderGallery() {
    // <img src="img/meme-imgs-square/1.jpg" onclick="initMemeEditor(1)" />
    let strHTML = '';
    for (let i = 1; i <= gImgsCount; i++) {
        strHTML += `<img src="img/meme-imgs-square/${i}.jpg" onclick="initMemeEditor(${i})" />`
    }
    document.querySelector('.gallery-container').innerHTML=strHTML;
}