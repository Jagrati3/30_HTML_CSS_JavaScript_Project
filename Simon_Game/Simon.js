// ================= STEP 1: GAME VARIABLES =================

// store game sequence (computer sequence)
let gameSeq = [];

// store user clicks
let userSeq = [];

// all button colors
let btns = ["red", "yellow", "green", "purple"];

// game state
let started = false;
let level = 0;

// select heading
let h2 = document.querySelector("h2");


// ================= STEP 2: START GAME =================

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;

        levelUp(); // start level 1
    }
});


// ================= STEP 2: FLASH FUNCTION =================

// game flash (for computer)
function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

// user flash (when user clicks)
function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 300);
}


// ================= STEP 2: LEVEL UP =================

function levelUp() {
    userSeq = []; // reset user sequence every level

    level++;
    h2.innerText = `Level ${level}`;

    // random index
    let randIdx = Math.floor(Math.random() * 4);

    // random color
    let randColor = btns[randIdx];

    // add to game sequence
    gameSeq.push(randColor);

    console.log("Game Sequence:", gameSeq);

    // select button
    let randBtn = document.querySelector(`.${randColor}`);

    // flash it
    gameFlash(randBtn);
}


// ================= STEP 3: USER CLICK =================

// when user clicks button
function btnPress() {
    let btn = this;

    // show user flash
    userFlash(btn);

    // get color from button
    let userColor = btn.getAttribute("id");

    // store user click
    userSeq.push(userColor);

    console.log("User Sequence:", userSeq);

    // check answer
    checkAnswer(userSeq.length - 1);
}


// ================= STEP 3: CHECK ANSWER =================

function checkAnswer(idx) {
    // check current step
    if (userSeq[idx] === gameSeq[idx]) {

        // if full sequence matched
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // next level
        }

    } else {
        // game over
        // h2.innerText = "Game Over! Press any key to restart";

        // print the score of game 
        h2.innerHTML = `Game Over! Your Score was ${level - 1}. Press any key to restart`;
        resetGame();

    }
}


// ================= RESET GAME =================

function resetGame() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}


// ================= ADD EVENT TO BUTTONS =================

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}