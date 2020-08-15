'use strict';

// DECLERATION
const NUM_OF_IMGS = 21;
const KEYWORDS = 'KEYWORDS';
let gKeywordsMap;
let gImgs = []; // { id: 1, url: 'img/meme-imgs-square/1.jpg', keywords: ['Trump'] }
let gId = 1;

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
};

// _createImgs();
_creatImgs();
_createKeywords();



// C.R.U.D.L
function getImgById(id) {
    return gImgs.find((img) => img.id === id);
}

function getMeme() {
    return gMeme;
}

function getKeywordsMap() {
    return gKeywordsMap;
}

function updateKeywords(newKeyword) {
    if (!gKeywordsMap[newKeyword]) gKeywordsMap[newKeyword] = 1;
    else gKeywordsMap[newKeyword]++;
    saveToStorage(KEYWORDS, gKeywordsMap);
}

function getImgs() {
    return gImgs;
}

function getLines() {
    return gMeme.lines;
}

function getLineNum() {
    return gMeme.lines.length;
}
function getCurrLine(currLine) {
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

function moveLine(lineIdx, diff) {
    gMeme.lines[lineIdx].y += diff;
}

function editAlign(lineIdx, alignTo) {
    switch (alignTo) {
        case 'left':
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
    if (!refLine) refLine = {
        txt: 'New line',
        stroke: '#000000',
        fill: '#ffffff',
        size: 40,
        font: 'Impact',
        align: 'center',
        x: 100,
        y: newY
    };
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

function _createKeywords() {
    gKeywordsMap = loadFromStorage(KEYWORDS);
    if (!gKeywordsMap) {
        gKeywordsMap = { 'trump': 7, 'happy': 3 };
        saveToStorage(KEYWORDS, gKeywordsMap);
    }
}

function _creatImgs() {
    gImgs.push(_createImg('dr evil'));
    gImgs.push(_createImg('cat sleep computer'));
    gImgs.push(_createImg('baby dog sleep'));
    gImgs.push(_createImg('ancient aliens'));
    gImgs.push(_createImg('leo'));
    gImgs.push(_createImg('jail i killed a man'));
    gImgs.push(_createImg('flip computer rage'));
    gImgs.push(_createImg('evil baby'));
    gImgs.push(_createImg('one does not simply'));
    gImgs.push(_createImg('obama laugh'));
    gImgs.push(_createImg('nba kiss artest pierce'));
    gImgs.push(_createImg('matrix what if i told you'));
    gImgs.push(_createImg('putin'));
    gImgs.push(_createImg('puppies'));
    gImgs.push(_createImg('patrick'));
    gImgs.push(_createImg('oprah you get a'));
    gImgs.push(_createImg('third place celebrate'));
    gImgs.push(_createImg('tell me more willy wonka'));
    gImgs.push(_createImg('successful baby'));
    gImgs.push(_createImg('shocked baby'));
    gImgs.push(_createImg('trump 1'));
    gImgs.push(_createImg('trump 2'));
    gImgs.push(_createImg('toy story buzz everywhere'));
    gImgs.push(_createImg('third world solution'));
    gImgs.push(_createImg('yoga puppy dog'));
    gImgs.push(_createImg('what would you do'));
    gImgs.push(_createImg('why the fuck'));
    gImgs.push(_createImg('zero fucks given maria sound of music'));
}

function _createImg(name) {
    const img = {
        id: gId++,
        url: `img/meme-imgs-various-aspect-ratios/${name}.jpg`,
        keywords: [name.split(' ')]
    };
    return img;
}
