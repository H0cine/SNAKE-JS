const gameboard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
const score = document.querySelector("#score");
const resetbtn = document.querySelector("#resetbtn");
const pausebtn = document.querySelector("#pausebtn");
const startbtn = document.querySelector("#startbtn");
const gamewidth = gameboard.width;
const gameheight = gameboard.height;
const boardbackground = "black";
const snakeclr = "limegreen";
const foodclr = "red";
const unitesize = 25;
let running = false;
let xVelocity = unitesize;
let yVelocity = 0;
let foodx, foody;
let scr = 0;
let snake = [
    {x: unitesize * 4, y: 0},
    {x: unitesize * 3, y: 0},
    {x: unitesize * 2, y: 0},
    {x: unitesize, y: 0},
    {x: 0, y: 0}
];

window.addEventListener("keydown", changedirection);
resetbtn.addEventListener("click", resetgame);
startbtn.addEventListener("click", startgame);
pausebtn.addEventListener("click", pausegame);

function startgame() {
    running = true;
    scr = 0;
    score.textContent = scr;
    createfood();
    drawfood();
    nexttick();
}

function pausegame() {
    running = !running;
    if (running) {
        nexttick();
        startbtn.textContent = "Pause";
    } else {
        ctx.font = "50px MV Boli";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", gamewidth / 2, gameheight / 2);
        startbtn.textContent = "Continue";
    }
}

function nexttick() {
    if (running) {
        setTimeout(() => {
            clearboard();
            drawfood();
            movesnake();
            drawsnake();
            checkgameover();
            nexttick();
        }, 100);
    }
}

function clearboard() {
    ctx.fillStyle = boardbackground;
    ctx.fillRect(0, 0, gamewidth, gameheight);
}

function createfood() {
    function randomfood(min, max) {
        return Math.floor((Math.random() * (max - min) + min) / unitesize) * unitesize;
    }
    foodx = randomfood(0, gamewidth - unitesize);
    foody = randomfood(0, gameheight - unitesize);
}

function drawfood() {
    ctx.fillStyle = foodclr;
    ctx.fillRect(foodx, foody, unitesize, unitesize);
}

function movesnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);

    if (snake[0].x === foodx && snake[0].y === foody) {
        scr++;
        score.textContent = scr;
        createfood();
    } else {
        snake.pop();
    }
}

function drawsnake() {
    ctx.fillStyle = snakeclr;
    snake.forEach(part => ctx.fillRect(part.x, part.y, unitesize, unitesize));
}

function changedirection(event) {
    const keypressed = event.keyCode;
    const left = 37, right = 39, up = 38, down = 40;
    const goingUp = yVelocity === -unitesize, goingDown = yVelocity === unitesize;
    const goingRight = xVelocity === unitesize, goingLeft = xVelocity === -unitesize;

    switch (keypressed) {
        case left: if (!goingRight) { xVelocity = -unitesize; yVelocity = 0; } break;
        case up: if (!goingDown) { yVelocity = -unitesize; xVelocity = 0; } break;
        case right: if (!goingLeft) { xVelocity = unitesize; yVelocity = 0; } break;
        case down: if (!goingUp) { yVelocity = unitesize; xVelocity = 0; } break;
    }
}

function checkgameover() {
    if (snake[0].x < 0 || snake[0].x >= gamewidth || snake[0].y < 0 || snake[0].y >= gameheight) {
        running = false;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            running = false;
        }
    }

    if (!running) {
        displaygameover();
    }
}

function displaygameover() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gamewidth / 2, gameheight / 2);
    startbtn.textContent = "Restart";
}

function resetgame() {
    scr = 0;
    xVelocity = unitesize;
    yVelocity = 0;
    snake = [
        {x: unitesize * 4, y: 0},
        {x: unitesize * 3, y: 0},
        {x: unitesize * 2, y: 0},
        {x: unitesize, y: 0},
        {x: 0, y: 0}
    ];
    startgame();
}
