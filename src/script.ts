const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

class Character {
    x: number;
    y: number;
    width: number;
    height: number;
    jumping = false;
    yspeed = 0;

    gravity = 1;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

const player = new Character(100, canvas.height - 50, 50, 50);

document.addEventListener('keydown', (event) => {
    if (event.key === " " && !player.jumping) {
        console.log('Jumping');
        player.yspeed = 15;
        player.jumping = true;
    }
})

function drawCharacter() {
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function jump() {
    if (!player.jumping) return;

    if (player.y > canvas.height - player.height) {
        player.jumping = false;
        player.y = canvas.height - player.height;
        return;
    }

    player.yspeed -= player.gravity;
    player.y -= player.yspeed; 
}

function updateCharacter() {
    jump();
    player.y = Math.max(0, player.y);
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacter();
    updateCharacter();
    requestAnimationFrame(loop);
}

loop();