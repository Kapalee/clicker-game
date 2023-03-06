"use strict";

window.addEventListener("load", ready);

function ready() {
  console.log("JavaScript ready!");
  document.querySelector("#btn_start").addEventListener("click", startGame);
  document.querySelector("#btn_go_to_start").addEventListener("click", showStartScreen);
  document.querySelector("#btn_restart").addEventListener("click", startGame);
}

let points = 0;
let lives = 3;
let IsGameRunning = false;
function startGame() {
  console.log("start");
  IsGameRunning = true;
  points = 0;
  lives = 3;

  document.querySelector("#start").classList.add("hidden");
  showGameScreen();
  resetPoints();
  resetLives();

  startAnimation();
  regClick();
  addPosition();
  aniRestart();
  startTimer();
}
function resetLives() {
  // sæt lives til 3
  lives = 3;
  //nulstil visning af liv (hjerte vi ser)
  document.querySelector("#heart1").classList.remove("broken_heart");
  document.querySelector("#heart2").classList.remove("broken_heart");
  document.querySelector("#heart3").classList.remove("broken_heart");
  document.querySelector("#heart1").classList.add("active_heart");
  document.querySelector("#heart2").classList.add("active_heart");
  document.querySelector("#heart3").classList.add("active_heart");
}

function resetPoints() {
  // nulstil point
  points = 0;
  // nulstil vising af point
  displayPoints();
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

  document.querySelector("#alien_death").currentTime = 0;

  document.querySelector("#alien_death").play();


  incrementPoints();
}

function clickGood() {
  let pie = this;
  console.log("Click Good");
  pie.removeEventListener("click", clickGood);

  pie.classList.add("paused");

  pie.querySelector("img").classList.add("zoom_in");

  pie.addEventListener("animationend", goodGone);

  document.querySelector("#bad_death").currentTime = 0;

  document.querySelector("#bad_death").play();

  decrementLives();
}

function alienGone() {
  let alien = this;
  console.log(this);

  alien.removeEventListener("animationend", alienGone);

  alien.querySelector("img").classList.remove("zoom_in");

  alien.classList.remove("paused");

  if (IsGameRunning) {
    animationRestart.call(this);
  }
  alien.addEventListener("click", clickAlien);
}

function goodGone() {
  let good = this;
  console.log("goodGone");
  good.removeEventListener("animationend", goodGone);

  good.querySelector("img").classList.remove("zoom_in");

  good.classList.remove("paused");

  if (IsGameRunning) {
    animationRestart.call(this);
  }
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
  stopGame();
}

function levelComplete() {
  console.log("Level complete bitch");
  document.querySelector("#level_complete").classList.remove("hidden");
  stopGame();
}
function showStartScreen() {
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}
function showGameScreen() {
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function startTimer() {
  document.querySelector("#minut_viser").classList.add("minut_animation");
  document.querySelector("#time_viser").classList.add("time_animation");

  //Når animationen er færdig kaldes stopSpillet()
  document.querySelector("#minut_viser").addEventListener("animationend", gameover);
}

function timeIsUp() {
  console.log("Tiden er gået!");

  if (points >= 10) {
    levelComplete();
  } else {
    gameover();
  }
}

function stopGame() {
  IsGameRunning = false;
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

  document.querySelector("#minut_viser").classList.remove("minut_animation");
  document.querySelector("#time_viser").classList.remove("time_animation");

  // Stop og nulstil lyde, fx baggrundsmusik
  //document.querySelector("#sound_dreams").pause();
 // document.querySelector("#sound_dreams").currentTime = 0;
}
