"use strict";
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
function desenharPersonagem() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(100, 25, 50, 50);
}
function loop() {
    desenharPersonagem();
}
loop();
//# sourceMappingURL=script.js.map