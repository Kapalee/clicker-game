"use strict";

window.addEventListener("load", ready);

function ready() {
  console.log("JavaScript ready!");
  document.querySelector("#btn_start").addEventListener("click", startGame);
}

let points = 0;
let lives = 3;
function startGame() {
  console.log("start");

  points = 0;
  lives = 3;

  document.querySelector("#start").classList.add("hidden");

  startAnimation();
  regClick();
  addPosition();
  aniRestart();
}

function aniRestart() {
  document.querySelector("#alien_container1").addEventListener("animationiteration", animationRestart);
  document.querySelector("#alien_container2").addEventListener("animationiteration", animationRestart);
  document.querySelector("#alien_container3").addEventListener("animationiteration", animationRestart);
  document.querySelector("#alien_container4").addEventListener("animationiteration", animationRestart);
  document.querySelector("#pie_container1").addEventListener("animationiteration", animationRestart);
  document.querySelector("#cheesecake_container1").addEventListener("animationiteration", animationRestart);
  document.querySelector("#donut_container1").addEventListener("animationiteration", animationRestart);
  document.querySelector("#dumpling_container1").addEventListener("animationiteration", animationRestart);
}

function addPosition() {
  document.querySelector("#alien_container1").classList.add("position1");
  document.querySelector("#alien_container2").classList.add("position2");
  document.querySelector("#alien_container3").classList.add("position3");
  document.querySelector("#alien_container4").classList.add("position4");
  document.querySelector("#pie_container1").classList.add("position5");
  document.querySelector("#cheesecake_container1").classList.add("position6");
  document.querySelector("#donut_container1").classList.add("position7");
  document.querySelector("#dumpling_container1").classList.add("position8");
}

function regClick() {
  document.querySelector("#alien_container1").addEventListener("click", clickAlien);
  document.querySelector("#alien_container2").addEventListener("click", clickAlien);
  document.querySelector("#alien_container3").addEventListener("click", clickAlien);
  document.querySelector("#alien_container4").addEventListener("click", clickAlien);
  document.querySelector("#pie_container1").addEventListener("click", clickGood);
  document.querySelector("#cheesecake_container1").addEventListener("click", clickGood);
  document.querySelector("#donut_container1").addEventListener("click", clickGood);
  document.querySelector("#dumpling_container1").addEventListener("click", clickGood);
}

function startAnimation() {
  document.querySelector("#alien_container1").classList.add("falling1");
  document.querySelector("#alien_container2").classList.add("falling1");
  document.querySelector("#alien_container3").classList.add("falling1");
  document.querySelector("#alien_container4").classList.add("falling1");
  document.querySelector("#pie_container1").classList.add("falling2");
  document.querySelector("#cheesecake_container1").classList.add("falling2");
  document.querySelector("#donut_container1").classList.add("falling2");
  document.querySelector("#dumpling_container1").classList.add("falling2");
}

function clickAlien() {
  let alien = this;
  console.log("Click alien");
  alien.removeEventListener("click", clickAlien);

  alien.classList.add("paused");

  alien.querySelector("img").classList.add("zoom_in");

  alien.addEventListener("animationend", alienGone);

  incrementPoints();
}

function clickGood() {
  let pie = this;
  console.log("Click Good");
  pie.removeEventListener("click", clickGood);

  pie.classList.add("paused");

  pie.querySelector("img").classList.add("zoom_in");

  pie.addEventListener("animationend", goodGone);

  decrementLives();
}

function alienGone() {
  let alien = this;
  console.log(this);

  alien.removeEventListener("animationend", alienGone);

  alien.querySelector("img").classList.remove("zoom_in");

  alien.classList.remove("paused");

  animationRestart.call(this);

  alien.addEventListener("click", clickAlien);
}

function goodGone() {
  let good = this;
  console.log("goodGone");
  good.removeEventListener("animationend", goodGone);

  good.querySelector("img").classList.remove("zoom_in");

  good.classList.remove("paused");

  animationRestart.call(this);

  good.addEventListener("click", clickGood);
}

function animationRestart() {
  let good = this;
  console.log("restartAni");
  good.classList.remove("falling2", "falling1");
  good.classList.remove("position1", "position2", "position3", "position4", "position5", "position6", "position7", "position8");
  good.offsetWidth;
  let falling = Math.floor(Math.random() * 2) + 1;

  good.classList.add("falling" + falling);
  let pos = Math.floor(Math.random() * 8) + 1;
  good.classList.add("position" + pos);
}

function incrementPoints() {
  console.log("point");
  points++;
  console.log("har nu " + points + " point");
  displayPoints();
  if (points >= 10) {
    levelComplete();
  }
}
function displayPoints() {
  console.log("vis point");
  document.querySelector("#coin_count").textContent = points;
}

function decrementLives() {
  console.log("minus liv");
  if (lives <= 1) {
    gameover();
  } else {
    showDecrementedLives();
  }
  lives--;
}

function incrementLives() {
  console.log("+ point");
  if (lives >= 3) {
    lives;
  } else lives++;
  showIncrementedLives();
}

function showDecrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("active_heart");
  document.querySelector("#heart" + lives).classList.add("broken_heart");
}

function showIncrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("broken_heart");
  document.querySelector("#heart" + lives).classList.add("active_heart");
}

function gameover() {
  console.log("Game over bitch");
  document.querySelector("#game_over").classList.remove("hidden");
}

function levelComplete() {
  console.log("Level complete bitch");
  document.querySelector("#level_complete").classList.remove("hidden");
}

function stopGame() {
  // Stop animationer
  document.querySelector("#alien_container1").classList.remove("falling1", "falling2");
  document.querySelector("#alien_container2").classList.remove("falling1", "falling2");
  document.querySelector("#alien_container3").classList.remove("falling1", "falling2");
  document.querySelector("#alien_container4").classList.remove("falling1", "falling2");
  document.querySelector("#pie_container1").classList.remove("falling2", "falling1");
  document.querySelector("#cheesecake_container1").classList.remove("falling2", "falling1");
  document.querySelector("#donut_container1").classList.remove("falling2", "falling1");
  document.querySelector("#dumpling_container1").classList.remove("falling2", "falling1");

  // Fjern click
  document.querySelector("#alien_container1").removeEventListener("click", clickAlien);
  document.querySelector("#alien_container2").removeEventListener("click", clickAlien);
  document.querySelector("#alien_container3").removeEventListener("click", clickAlien);
  document.querySelector("#alien_container4").removeEventListener("click", clickAlien);
  document.querySelector("#pie_container1").removeEventListener("click", clickGood);
  document.querySelector("#cheesecake_container1").removeEventListener("click", clickGood);
  document.querySelector("#donut_container1").removeEventListener("click", clickGood);
  document.querySelector("#dumpling_container1").removeEventListener("click", clickGood);

  // Stop og nulstil lyde, fx baggrundsmusik
  document.querySelector("#sound_dreams").pause();
  document.querySelector("#sound_dreams").currentTime = 0;
}
