'use strict';

const KEY = 'MY_MEMES';
let gImgsCount = 21;
let gMyMemes;

function init() {
    renderGallery();
    renderKeywordsMap();
}

function openGallery(isGallery) {
    document.querySelector('.meme-editor').classList.add('hidden');
    document.querySelector('.meme-editor').classList.remove('flex', 'wrap', 'space-between');
    document.querySelector('.gallery-container').classList.remove('hidden');
    toggleMenu();
    if (isGallery) renderGallery();
    else renderMyMemes();
}

function renderGallery(imgs) {
    if (!imgs || !imgs.length) imgs = getImgs();
    let strHTML = '';
    for (let i = 0; i < imgs.length; i++) {
        const img = new Image();
        img.src = imgs[i].url;
        strHTML += `
        <div>
            <img src="${imgs[i].url}" class="img-${imgs[i].id}" onclick="initMemeEditor(${imgs[i].id})" />
        </div>`
    }
    document.querySelector('.img-list-container').innerHTML = strHTML;
    getMyMemes();
}

function renderMyMemes() {
    getMyMemes();
    let strHTML = '';
    gMyMemes.forEach(img => {
        strHTML += `<img src="${img}" />`;
    });
    document.querySelector('.img-list-container').innerHTML = strHTML;
}

// MY MEMES

function getMyMemes() {
    gMyMemes = loadFromStorage(KEY);
    if (!gMyMemes) gMyMemes = [];
}

function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('show');
    document.querySelector('.screen').classList.toggle('show');
}

//SEARCH

function onSearch() {
    const queryStr = document.querySelector('.search-input').value;
    if (queryStr === '' || queryStr.length < 3) {
        renderGallery();
        return;
    }
    updateKeywords(queryStr);
    const keywordsMap = getKeywordsMap();
    console.log(keywordsMap);
    const imgs = getImgs();
    const searchRslts = imgs.filter(img => {
        return img.keywords.some(keyword => {
            return keyword.includes(queryStr);
        });
    });
    renderGallery(searchRslts);
    renderKeywordsMap();
}
document.querySelector('.search-input').addEventListener('keyup', ev=>{
    if(ev.keyCode === 13){
        ev.preventDefault();
        document.querySelector('.search-btn').click();
    }
});

function renderKeywordsMap() {
    const keywordsMap = getKeywordsMap();
    var strHTML = '';
    for (const keyword in keywordsMap) {
        const currKeywordCount = keywordsMap[keyword];
        strHTML += `<span style="font-size:${currKeywordCount * 10 > 50 ? 50 : currKeywordCount * 10}px; cursor:pointer;" onclick="onSearch('${keyword}')">&nbsp;${keyword}&nbsp;</span>`
    }
    document.querySelector('.keywords-map').innerHTML = strHTML;
}