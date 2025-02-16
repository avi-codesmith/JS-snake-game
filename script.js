"use strict";

const playground = document.querySelector(".playground");
const pandpIcon = document.querySelector(".pandpIcon");
const soundIcon = document.querySelector(".soundIcon");
let scoreEl = document.querySelector(".numberScore");
let highScoreEl = document.querySelector(".numberHighScore");
let arrow = document.querySelector(".arrowkeys-wrapper");
let para = document.querySelector(".para");

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
let isPlaying = true;
let sound = true;

let highScore = localStorage.getItem("highScore") || 0;
highScoreEl.innerHTML = highScore;

window.onload = () => {
  let arrow = document.querySelector(".arrowkeys"); // Corrected class name

  setTimeout(() => {
    arrow.classList.add("displayNone"); // Wrapped class name in quotes
    para.classList.add("displayNone"); // Wrapped class name in quotes
  }, 4000);
};

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
  let htmlMarkup = `
    <div class="food" style="grid-area: ${foodY} / ${foodX};"></div>
  `;

  headX += velocityX;
  headY += velocityY;

  if (headX === foodX && headY === foodY) {
    random();
    snakeBody.push([headX, headY]);
    if (sound) {
      eatSound.play();
    }
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
    htmlMarkup += `
      <div
        class="${className}"
        style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"
      ></div>`;
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
  playground.style.backgroundColor = " rgba(250, 82, 82, 0.9)";
  gameover = true;
  if (sound) {
    loseSound.play();
  }
  clearInterval(gameloop);

  setTimeout(() => {
    alert("You lose! Click OK to play again.");
    location.reload();
  }, 100);
};

random();
gameloop = setInterval(initGame, 150);

pandpIcon.addEventListener("click", () => {
  if (isPlaying) {
    clearInterval(gameloop); // Stop the game
    pandpIcon.src = "play-button.png";
  } else {
    gameloop = setInterval(initGame, 150);
    pandpIcon.src = "pause.png";
  }
  isPlaying = !isPlaying;
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    if (isPlaying) {
      clearInterval(gameloop); // Stop the game
      pandpIcon.src = "play-button.png";
    } else {
      gameloop = setInterval(initGame, 150);
      pandpIcon.src = "pause.png";
    }
    isPlaying = !isPlaying;
  }
});

soundIcon.addEventListener("click", () => {
  if (sound) {
    sound = false;
    soundIcon.src = "music.png";
  } else if (sound === false) {
    sound = true;
    soundIcon.src = "volume.png";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyM") {
    if (sound) {
      sound = false;
      soundIcon.src = "music.png";
    } else if (sound === false) {
      sound = true;
      soundIcon.src = "volume.png";
    }
  }
});
