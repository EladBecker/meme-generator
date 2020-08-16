'use strict';

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
}

function drawText(line, isSaving = false) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = line.stroke; // 'black'
    gCtx.fillStyle = line.fill; // ''white'
    gCtx.font = line.size + 'px ' + line.font; // '40px Impact'
    gCtx.textAlign = 'center';//line.align; // 'center'
    gCtx.fillText(line.txt, line.x, line.y);
    gCtx.strokeText(line.txt, line.x, line.y);
}

function drawMeme(imgUrl, meme) {
    const elContainer = document.querySelector('.canvas-container');
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
        // if (img.height !== img.width) {
        //     const scale = Math.min(gCanvas.width / img.width, gCanvas.height / img.height);
        //     elContainer.style.height = img.height * scale + 'px';
        //     elContainer.style.width = img.width * scale + 'px';
        // }
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawLines(meme);
    }
}

function drawLines(meme) {
    if (!meme) return;
    meme.lines.forEach(line => { drawText(line) });
}

function getCanvas() {
    return gCanvas;
}
function getCtx() {
    return gCtx;
}

