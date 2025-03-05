const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

function desenharPersonagem() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(100, 25, 50, 50);
}

function loop() {
    desenharPersonagem();
}

loop();