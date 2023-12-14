const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");

let birdY = 50;
let velocity = 0;
let gravity = 2;
let isGameOver = false;
let score = 0;

function jump() {
    if (!isGameOver) {
        velocity = -20;
    }
}

function updateGame() {
    velocity += gravity;
    birdY += velocity;

    if (birdY > gameContainer.clientHeight - bird.clientHeight) {
        birdY = gameContainer.clientHeight - bird.clientHeight;
        velocity = 0;
    }

    if (birdY < 0) {
        birdY = 0;
        velocity = 0;
    }

    bird.style.transform = `translateY(${birdY}px)`;
}

function createPipe() {
    const pipe = document.createElement("div");
    pipe.className = "pipe";
    gameContainer.appendChild(pipe);

    const pipeHeight = Math.random() * (gameContainer.clientHeight - 100) + 50;
    pipe.style.height = `${pipeHeight}px`;

    const pipeAnimation = pipe.animate([{ left: "100%" }, { left: "-10%" }], {
        duration: 3000,
        iterations: 1,
    });

    pipeAnimation.onfinish = () => {
        if (!isGameOver) {
            gameContainer.removeChild(pipe);
            score++;
            scoreElement.textContent = score;
        }
    };
}

function checkCollision() {
    const birdRect = bird.getBoundingClientRect();

    const pipes = document.getElementsByClassName("pipe");

    for (const pipe of pipes) {
        const pipeRect = pipe.getBoundingClientRect();

        if (
            birdRect.left < pipeRect.right &&
            birdRect.right > pipeRect.left &&
            birdRect.top < pipeRect.bottom &&
            birdRect.bottom > pipeRect.top
        ) {
            endGame();
        }
    }
}

function endGame() {
    isGameOver = true;
    alert(`Game Over! Your score is ${score}.`);
    location.reload(); // You might want to implement a more elegant way to restart the game.
}

document.addEventListener("keydown", jump);
setInterval(() => {
    if (!isGameOver) {
        createPipe();
        checkCollision();
        updateGame();
    }
}, 1000 / 60);
