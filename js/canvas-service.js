'use strict';

let gCanvas;
let gCtx;

function initCanvas() {
    gCanvas = document.getElementById('memeCanvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas();
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
}

function drawText(line) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = line.stroke; // 'black'
    gCtx.fillStyle = line.fill; // ''white'
    gCtx.font = line.size + 'px ' + line.font; // '40px Impact'
    gCtx.textAlign = 'center';//line.align; // 'center'
    gCtx.fillText(line.txt, line.x, line.y);
    gCtx.strokeText(line.txt, line.x, line.y);
}

function drawMeme(imgUrl, meme) {
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        if (meme) {
            meme.lines.forEach(line => { drawText(line) });
        }
    }
    img.src = imgUrl;
}

function getCanvas() {
    return gCanvas;
}
function getCtx() {
    return gCtx;
}