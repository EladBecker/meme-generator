'use strict';

let gCanvas;
let gCtx;

function initCanvas() {
    gCanvas = document.getElementById('memeCanvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas();
    handleEvents();
}

function handleEvents() {
    gCanvas.addEventListener('mousedown', function (){
        gCanvas.addEventListener('mousemove', dragTxt);
    });
    gCanvas.addEventListener('mouseup', function () {
        gCanvas.removeEventListener('mousemove', dragTxt);
    });
}

function dragTxt(ev) {
    let lineToDragIdx = getTxtToDrag(ev);
    if (lineToDragIdx < 0 || lineToDragIdx > getLineNum() - 1) return;
    let dragLine = getCurrLine(lineToDragIdx);
    dragLine.x += ev.movementX;
    dragLine.y += ev.movementY;
    drawMeme(getImgById(gCurrId).url, getMeme());
}

function getTxtToDrag(ev) {
    const lines = getLines();
    const distances = lines.map(line => Math.abs(line.y - ev.offsetY));
    let shortestDistIdx = 0;
    for (let i = 1; i < distances.length; i++) {
        shortestDistIdx = (distances[i] < distances[shortestDistIdx]) ? i : shortestDistIdx
    }
    if (distances[shortestDistIdx] < 50) return shortestDistIdx;
    return -1;
}