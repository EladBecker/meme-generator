'use strict';


window.addEventListener('resize', function () {
    // Note: changing the canvas dimension this way clears the canvas
    resizeCanvas();
    onLoadImgToCanvas(1);
    onLoadMemeTxt();
});

let gCurrId;
let gCurrLineIdx;

function initMemeEditor(id) {
    document.querySelector('.meme-editor').classList.remove('hidden');
    document.querySelector('.gallery').classList.add('hidden');
    initCanvas();
    gCurrId = id;
    drawMeme(getImgById(gCurrId).url, getMeme());
    gCurrLineIdx = 0;
    onClearLines();
    onAddLine();
}

// EDIT PANEL
function onEditLine() {
    const txt = document.querySelector('.line-text').value;
    editLine(gCurrLineIdx, txt);
    drawMeme(getImgById(gCurrId).url, getMeme());
}

function onEditFontSize(diff) {
    editFontSize(gCurrLineIdx, diff);
    drawMeme(getImgById(gCurrId).url, getMeme());
}

function onEditAlign(alignTo) {
    editAlign(gCurrLineIdx, alignTo);
    drawMeme(getImgById(gCurrId).url, getMeme());
}

function onEditFont(fontName) {
    editFont(gCurrLineIdx, fontName);
    drawMeme(getImgById(gCurrId).url, getMeme());
}

function onEditFill(fillColor) {
    editFill(gCurrLineIdx, fillColor);
    drawMeme(getImgById(gCurrId).url, getMeme());
}

function onEditStroke(strokeColor) {
    editStroke(gCurrLineIdx, strokeColor);
    drawMeme(getImgById(gCurrId).url, getMeme());
}

function onAddLine() {
    addLine(gCurrLineIdx);
    gCurrLineIdx = getMeme().lines.length - 1;
    drawMeme(getImgById(gCurrId).url, getMeme());
}

function onDeleteLine() {
    if (gCurrLineIdx < 0) return;
    deleteLine(gCurrLineIdx);
    drawMeme(getImgById(gCurrId).url, getMeme());
    gCurrLineIdx = getMeme().lines.length - 1;
}
function onClearLines() {
    clearLines();
    gCurrLineIdx = 0;
    drawMeme(getImgById(gCurrId).url, getMeme());
}

// FUNCTIONALITY
function onDownloadMeme(elLink) {
    const imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

function onSaveMeme() {
    const imgContent = gCanvas.toDataURL('image/jpeg');
    gMyMemes.push(imgContent);
    console.log(gMyMemes);
    saveToStorage(KEY, gMyMemes);
}