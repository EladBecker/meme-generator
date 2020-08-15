'use strict';

// DECLERATION
const NUM_OF_IMGS = 21;
const KEYWORDS = 'KEYWORDS';
let gNum = 0;
let gKeywordsMap;
let gImgs = []; // { id: 1, url: 'img/meme-imgs-square/1.jpg', keywords: ['Trump'] }
let gId = 1;

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
};

// _createImgs();
_creatImgsNotSquares();
_creatrKeywords();



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
    console.log(gKeywordsMap);
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
            stroke: '#000000',
            fill: '#ffffff',
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

function _createImg(id) {
    const img = { id: gId, url: `img/meme-imgs-square/${id}.jpg`, keywords: [gNum++ % 2 === 0 ? 'happy' : 'sad'] };
    return img;
}

function _creatrKeywords() {
    gKeywordsMap = loadFromStorage();
    if (!gKeywordsMap) {
        gKeywordsMap = { 'trump': 7, 'happy': 3 };
        saveToStorage(KEYWORDS, gKeywordsMap);
    }
}

function _creatImgsNotSquares() {
    gImgs.push(_createImgNotSquare('dr evil'));
    gImgs.push(_createImgNotSquare('cat sleep computer'));
    gImgs.push(_createImgNotSquare('baby dog sleep'));
    gImgs.push(_createImgNotSquare('ancient aliens'));
    gImgs.push(_createImgNotSquare('leo'));
    gImgs.push(_createImgNotSquare('jail i killed a man'));
    gImgs.push(_createImgNotSquare('flip computer rage'));
    gImgs.push(_createImgNotSquare('evil baby'));
    gImgs.push(_createImgNotSquare('one does not simply'));
    gImgs.push(_createImgNotSquare('obama laugh'));
    gImgs.push(_createImgNotSquare('nba kiss artest pierce'));
    gImgs.push(_createImgNotSquare('matrix what if i told you'));
    gImgs.push(_createImgNotSquare('putin'));
    gImgs.push(_createImgNotSquare('puppies'));
    gImgs.push(_createImgNotSquare('patrick'));
    gImgs.push(_createImgNotSquare('oprah you get a'));
    gImgs.push(_createImgNotSquare('third place celebrate'));
    gImgs.push(_createImgNotSquare('tell me more willy wonka'));
    gImgs.push(_createImgNotSquare('successful baby'));
    gImgs.push(_createImgNotSquare('shocked baby'));
    gImgs.push(_createImgNotSquare('trump 1'));
    gImgs.push(_createImgNotSquare('trump 2'));
    gImgs.push(_createImgNotSquare('toy story buzz everywhere'));
    gImgs.push(_createImgNotSquare('third world solution'));
    gImgs.push(_createImgNotSquare('yoga puppy dog'));
    gImgs.push(_createImgNotSquare('what would you do'));
    gImgs.push(_createImgNotSquare('why the fuck'));
    gImgs.push(_createImgNotSquare('zero fucks given maria sound of music'));
}

function _createImgNotSquare(name) {
    const img = {
        id: gId++,
        url: `img/meme-imgs-various-aspect-ratios/${name}.jpg`,
        keywords: [name.split(' ')]
    };
    return img;
}
