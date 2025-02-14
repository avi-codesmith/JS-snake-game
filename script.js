"use strict";

const playbground = document.querySelector(".playground");

let foodX = null;
let foodY = null;
let headX = Math.floor(Math.random() * 30) + 1;
let headY = Math.floor(Math.random() * 30) + 1;
let valocityX = 0;
let valocityY = 0;
let snakeBody = [];

const random = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const initGame = () => {
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`;
  headX = headX + valocityX;
  headY = headY + valocityY;
  htmlMarkup += `<div class="head" style="grid-area: ${headY} / ${headX};"></div>`;
  playbground.innerHTML = htmlMarkup;
  if (headX === foodX && headY === foodY) {
    random();
    snakeBody.push([foodX, foodY]);
    console.log(snakeBody);
  }
};

const changeDirection = document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    valocityX = 0;
    valocityY = -1;
  } else if (e.key === "ArrowDown") {
    valocityX = 0;
    valocityY = 1;
  } else if (e.key === "ArrowRight") {
    valocityX = 1;
    valocityY = 0;
  } else if (e.key === "ArrowLeft") {
    valocityX = -1;
    valocityY = 0;
  }
  initGame();
});

random();
setInterval(() => {
  initGame();
}, 222);
