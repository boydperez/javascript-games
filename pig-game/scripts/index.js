'use strict';

const dice = document.querySelector('.dice');
const btnRoll1 = document.querySelector('#player_1_btn');
const btnRoll2 = document.querySelector('#player_2_btn');
const holdBtn1 = document.querySelector('#hold_1');
const holdBtn2 = document.querySelector('#hold_2');
const gameReset = document.querySelector('.game-reset');
const winner = document.querySelector('.winner-title');

let activePlayer = document.querySelector('#player_1_current_score');
let activePlayerId = 1;
let playerTotal = document.querySelector('#player_1_total_score');
let playerScore1= 0;
let playerScore2= 0;
let currentScore = 0;


function switchPlayer() {
    // Reset score to 0 before switching players
    activePlayer.textContent = 0;

    if (activePlayerId == 1) {
        activePlayer = document.querySelector('#player_2_current_score');
        activePlayerId = 2;
        playerTotal = document.querySelector('#player_2_total_score');
    } else {
        activePlayer = document.querySelector('#player_1_current_score');
        activePlayerId = 1;
        playerTotal = document.querySelector('#player_1_total_score');
    }
    // Show/hide players dice roll btn
    btnRoll1.classList.toggle('btn-roll-show');
    btnRoll2.classList.toggle('btn-roll-show');
    // Show/hide hold pin
    holdBtn1.classList.toggle('fa-map-pin-show');
    holdBtn2.classList.toggle('fa-map-pin-show');
}

function calcScore() {
    // Generate values between 1-6
    let diceValue = Math.floor(Math.random() * 6) + 1;
    currentScore += diceValue;
    activePlayer.textContent = currentScore;
    dice.src = `img/dice-${diceValue}.png`;

    if (diceValue === 1) {
        currentScore = 0;
        switchPlayer();
    }
}

function decalerWinner(winnerId) {
    winner.textContent = `Player ${winnerId} wins`;
    winner.style.visibility = 'visible';
    winner.style.opacity = '1';
    document.querySelector(`.card--${winnerId}`).style.backgroundColor = '#53B8B8';

    // Disable all actions
    btnRoll1.classList.remove('btn-roll-show');
    btnRoll2.classList.remove('btn-roll-show');
    holdBtn1.classList.remove('fa-map-pin-show');
    holdBtn2.classList.remove('fa-map-pin-show');
    gameReset.textContent = 'Play Again';
}

function holdScore() {
    if (activePlayerId == 1) {
        playerScore1 += currentScore;
        playerTotal.textContent = playerScore1;
    } else {
        playerScore2 += currentScore;
        playerTotal.textContent = playerScore2;
    }

    if (playerScore1 >= 10) {
        decalerWinner(1);
    } else if (playerScore2 >= 10) {
        decalerWinner(2)
    } else {
        currentScore = 0;
        switchPlayer();
    }
}

// Set event handlers
btnRoll1.addEventListener('click', calcScore);
btnRoll2.addEventListener('click', calcScore);

holdBtn1.addEventListener('click', holdScore);
holdBtn2.addEventListener('click', holdScore);

gameReset.addEventListener('click', function() {
    location.reload();
});