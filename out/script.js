"use strict";
const gameOverMessage = document.getElementById('game-over');
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
let ended = false;
let iteration = 0;
let points = 0;
class Box {
    x;
    y;
    width;
    height;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
class Character extends Box {
    jumping = false;
    yspeed = 0;
    gravity = 0.8;
}
class Obstacle extends Box {
    xspeed;
    constructor(x, y, width, height, xspeed) {
        super(x, y, width, height);
        this.xspeed = xspeed;
    }
}
const player = new Character(100, canvas.height - 50, 50, 50);
const obstacles = [];
document.addEventListener('keydown', (event) => {
    if (event.key === " " && !player.jumping) {
        console.log('Jumping');
        player.yspeed = 15;
        player.jumping = true;
    }
    if (event.key == " " && ended) {
        location.reload();
    }
});
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawObstacles();
    drawCharacter();
    updateCharacter();
    checkCollision();
    if (ended) {
        console.log('Game Over');
        gameOverMessage.style.visibility = 'visible';
        return;
    }
    if (iteration % (Math.floor(Math.random() * 20) + 60) == 0) {
        obstacles.push(new Obstacle(canvas.width, canvas.height - 50, 30, 50, -5));
        console.log(obstacles);
    }
    requestAnimationFrame(loop);
    iteration++;
    if (iteration % 6 == 0)
        updatePoints();
}
loop();
function drawCharacter() {
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}
function updateCharacter() {
    jump();
    player.y = Math.max(0, player.y);
}
function jump() {
    if (!player.jumping)
        return;
    if (player.y > canvas.height - player.height) {
        player.jumping = false;
        player.y = canvas.height - player.height;
        return;
    }
    player.yspeed -= player.gravity;
    player.y -= player.yspeed;
}
function drawObstacles() {
    for (const obstacle of obstacles) {
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        if (obstacle.x < -obstacle.width) {
            obstacles.shift();
            console.log('Removing obstacle');
        }
        obstacle.x += obstacle.xspeed;
    }
}
function checkCollision() {
    for (const obstacle of obstacles) {
        if (player.x < obstacle.x + obstacle.width && player.x + player.width > obstacle.x
            && player.y < obstacle.y + obstacle.height && player.y + player.height > obstacle.y) {
            console.log('Collision');
            ended = true;
        }
    }
}
function updatePoints() {
    points += 5;
    const pointsElement = document.getElementById('points');
    pointsElement.innerText = `Points: ${points}`;
}
//# sourceMappingURL=script.js.map