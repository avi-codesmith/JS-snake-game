"use strict";

const playbground = document.querySelector(".playground");

let foodX = Math.floor(Math.random() * 30 + 1);
let foodY = Math.floor(Math.random() * 30 + 1);
let headX = Math.floor(Math.random() * 30 + 1);
let headY = Math.floor(Math.random() * 30 + 1);

const initGame = () => {
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`;
  htmlMarkup += `<div class="head" style="grid-area: ${headY} / ${headX};"></div>`;
  playbground.innerHTML = htmlMarkup;
};

initGame();
document.addEventListener("keydown", changeDirection);
