'use strict';

const KEY = 'MY_MEMES';
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
        const keywordsStr = imgs[i].keywords.join(' | ');
        strHTML += `
        <div class="img-holder" onclick="initMemeEditor(${imgs[i].id})">
            <img src="${imgs[i].url}" class="img-${imgs[i].id}"  />
            <div class="img-keywords">${keywordsStr}</div>
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
    const queryStr = document.querySelector('.search-input').value.toLowerCase();
    if (queryStr === '' || queryStr.length < 3) return;
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
document.querySelector('.search-input').addEventListener('keyup', ev => {
    if (ev.keyCode === 13) {
        ev.preventDefault();
        document.querySelector('.search-btn').click();
    }
});

function renderKeywordsMap() {
    const keywordsMap = getKeywordsMap();
    let maxSearch = 0;
    for (const keyword in keywordsMap) {
        maxSearch = maxSearch > keywordsMap[keyword] ? maxSearch : keywordsMap[keyword];
    }
    var strHTML = '';
    for (const keyword in keywordsMap) {
        strHTML += `
            <span style="font-size:${keywordsMap[keyword] * 50 / maxSearch }px; cursor:pointer;"   onclick="onKeywordClick('${keyword}')">
                &nbsp;${keyword}&nbsp;
            </span>`
    }
    document.querySelector('.keywords-map').innerHTML = strHTML;
}

function onKeywordClick(keyword) {
    document.querySelector('.search-input').value = keyword;
    document.querySelector('.search-btn').click();
}