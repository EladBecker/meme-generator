'use strict';


window.addEventListener('resize', function () {
    // Note: changing the canvas dimension this way clears the canvas
    resizeCanvas();
});

let gCurrId;
let gCurrLineIdx;

function initMemeEditor(id) {
    document.querySelector('.meme-editor').classList.remove('hidden');
    document.querySelector('.gallery-container').classList.add('hidden');
    initCanvas();
    gCurrId = id;
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

document.addEventListener('keydown', (ev) => {

    if (ev.code === "ArrowUp") {
        ev.preventDefault();
        onMoveLine(-10);
    }
    else if (ev.code === "ArrowDown") {
        ev.preventDefault();
        onMoveLine(10);
    }
});

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