'use strict';

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
    // const elContainer = document.querySelector('.canvas-container');
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
        // get the scale
        var scale = Math.min(gCanvas.width / img.width, gCanvas.height / img.height);
        // get the top left position of the image
        var x = (gCanvas.width / 2) - (img.width / 2) * scale;
        var y = (gCanvas.height / 2) - (img.height / 2) * scale;
        gCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
        // gCtx.drawImage(img, 0, 0, img.width, img.height);
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

function drawRect(line) {
    gCtx.beginPath();
    gCtx.rect(10, line.y - 45, gCanvas.width - 20, line.y + 10); /// x, y, width, height
    gCtx.strokeStyle = '#ffffff';
    gCtx.stroke();
    // gCtx.fillStyle = '';
    // gCtx.fillRect(x, y, 150, 150); /// x, y, width, height
}

