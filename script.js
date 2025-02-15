"use strict";

const playground = document.querySelector(".playground");
let scoreEl = document.querySelector(".numberScore");
let highScoreEl = document.querySelector(".numberHighScore");

let foodX, foodY;
let headX = Math.floor(Math.random() * 30) + 1;
let headY = Math.floor(Math.random() * 30) + 1;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let gameover = false;
let eatSound = new Audio("./eat.mp3");
let loseSound = new Audio("./lose.mp3");
let gameloop;
let score = 0;

let highScore = localStorage.getItem("highScore") || 0;
highScoreEl.innerHTML = highScore;

const random = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && velocityY === 0) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY === 0) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX === 0) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX === 0) {
    velocityX = 1;
    velocityY = 0;
  }
});

const initGame = () => {
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`;

  headX += velocityX;
  headY += velocityY;

  if (headX === foodX && headY === foodY) {
    random();
    snakeBody.push([headX, headY]);
    eatSound.play();
    score++;
    scoreEl.innerHTML = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      highScoreEl.innerHTML = highScore;
    }
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [headX, headY];

  for (let i = 0; i < snakeBody.length; i++) {
    let className = i === 0 ? "head mouth" : "head";
    htmlMarkup += `<div class="${className}" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;

    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver();
    }
  }

  playground.innerHTML = htmlMarkup;

  if (headX <= 0 || headX > 30 || headY <= 0 || headY > 30) {
    gameOver();
  }
};

const gameOver = () => {
  playground.style.backgroundColor = "#fa5252";
  gameover = true;
  loseSound.play();
  clearInterval(gameloop);

  setTimeout(() => {
    alert("You lose! Click OK to play again.");
    location.reload();
  }, 100);
};

random();
gameloop = setInterval(initGame, 150);
