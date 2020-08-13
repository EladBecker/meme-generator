'use strict';

const NUM_OF_IMGS = 18;

// DECLERATION
let gKeywords = {
    'trump': 3,
    'happy': 1
};
let gImgs = []; // { id: 1, url: 'img/meme-imgs-square/1.jpg', keywords: ['Trump'] }
_createImgs();

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
};


// C.R.U.D.L
function getImgById(id) {
    return gImgs.find((img) => img.id === id);
}

function getMeme() {
    return gMeme;
}

function getKeywords() {
    return gKeywords;
}

function getLineNum(){
    return gMeme.lines.length;
}
function getCurrLine(currLine){
    return gMeme.lines[currLine];
}

function editLine(lineIdx, txt) {
    gMeme.lines[lineIdx].txt = txt;
}

function editFontSize(lineIdx, newSize) {
    gMeme.lines[lineIdx].size = newSize;
}

function editFont(lineIdx, fontName) {
    gMeme.lines[lineIdx].font = fontName;
}

function editFill(lineIdx, fillColor) {
    gMeme.lines[lineIdx].fill = fillColor;
}

function editStroke(lineIdx, strokeColor) {
    gMeme.lines[lineIdx].stroke = strokeColor;
}

function editAlign(lineIdx, alignTo) {
    // gMeme.lines[lineIdx].align = alignTo;
    switch (alignTo) {
        case 'left':
            // gMeme.lines[lineIdx].x = 10 + gCtx.measureText(gMeme.lines[lineIdx].txt).width;
            gMeme.lines[lineIdx].x = 100;
            break;
        case 'center':
            gMeme.lines[lineIdx].x = getCanvas().width / 2;
            break;
        case 'right':
            gMeme.lines[lineIdx].x = getCanvas().width - 100;
            break;
    }
}

function addLine(prevLineIdx) {
    let newY;
    if (gMeme.lines.length === 0) newY = 50;
    else if (gMeme.lines.length === 1) newY = getCanvas().height - 50;
    else newY = getCanvas().height / 2;
    let refLine = gMeme.lines[prevLineIdx];
    if (!refLine) {
        refLine = {
            txt: 'New line',
            stroke: '#000',
            fill: '#fff',
            size: 40,
            font: 'Impact',
            align: 'center',
            x: 100,
            y: newY
        }
    }
    gMeme.lines.push({
        txt: 'New line',
        stroke: refLine.stroke,
        fill: refLine.fill,
        size: refLine.size,
        font: refLine.font,
        align: refLine.align,
        x: refLine.x,
        y: newY
    });
}

function deleteLine(lineIdx) {
    gMeme.lines.splice(lineIdx, 1)
}

function clearLines() {
    gMeme.lines = [];
}

// DB

function _createImgs() {
    for (let i = 1; i <= NUM_OF_IMGS; i++) {
        gImgs.push(_createImg(i));
    }
}

function _createImg(id){
    return {id, url: `img/meme-imgs-square/${id}.jpg`, keywords: []};
}