'use strict';

let gCurrId;
let gCurrLineIdx;

function initMemeEditor(id) {
    document.querySelector('.meme-editor').classList.remove('hidden');
    document.querySelector('.meme-editor').classList.add('flex', 'wrap', 'space-between');
    document.querySelector('.gallery-container').classList.add('hidden');
    gCurrId = id;
    initCanvas(getImgById(gCurrId).url);
    drawMeme(getImgById(gCurrId).url, getMeme());
    gCurrLineIdx = 0;
    onClearLines();
    onAddLine();
}

// EDIT PANEL
function onEditLine() {
    if (!getLineNum()) return;
    const txt = document.querySelector('.line-text').value;
    editLine(gCurrLineIdx, txt.toUpperCase());
    drawMeme(getImgById(gCurrId).url, getMeme());
}

function onChangeLine() {
    gCurrLineIdx = (gCurrLineIdx < getLineNum() - 1) ? gCurrLineIdx + 1 : 0;
    const currLine = getCurrLine(gCurrLineIdx);
    document.querySelector('.line-text').value = currLine.txt;
    document.querySelector('.font-size').value = currLine.size;
    document.querySelector('.fonts').value = currLine.font;
    document.querySelector('.fill-color').value = currLine.fill;
    document.querySelector('.outline-color').value = currLine.stroke;
    document.querySelector('.line-text').focus();
    drawMeme(getImgById(gCurrId).url, getMeme());
}

function onEditFontSize(newSize) {
    editFontSize(gCurrLineIdx, newSize);
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
    document.querySelector('.line-text').value = '';
    document.querySelector('.line-text').focus();
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

function onMoveLine(diff) {
    moveLine(gCurrLineIdx, diff);
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

function onShareMeme(elForm, ev) {
    uploadImg(elForm, ev);
}

function setCurrLine(lineIdx) {
    gCurrLineIdx = lineIdx;
}