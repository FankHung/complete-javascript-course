'use strict';

// Selecting elements
const score = document.querySelectorAll('.score');
const diceEL = document.querySelector('.dice');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const btnNewEL = document.querySelector('.btn--new');
const btnRollEL = document.querySelector('.btn--roll');
const btnHoldEL = document.querySelector('.btn--hold');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

let playing, scores, currentScore, activePlayer;

// Dynamic get elements
const getScroeEL = idx => {
  return document.getElementById(`score--${idx}`);
};
const getCurrScroeEL = idx => {
  return document.getElementById(`current--${idx}`);
};
const getPlayerEL = idx => {
  return document.querySelector(`.player--${idx}`);
};

// Function - init
const init = () => {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  diceEL.classList.add('hidden');
  getScroeEL(0).textContent = 0;
  getScroeEL(1).textContent = 0;
  getCurrScroeEL(0).textContent = 0;
  getCurrScroeEL(1).textContent = 0;
  getPlayerEL(0).classList.remove('player--winner');
  getPlayerEL(1).classList.remove('player--winner');
  getPlayerEL(0).classList.add('player--active');
  getPlayerEL(1).classList.remove('player--active');
};

init();

// Function - Switch Player
const switchPlayer = () => {
  currentScore = 0;
  getCurrScroeEL(activePlayer).textContent = 0;
  // getPlayerEL(activePlayer).classList.remove('player--active');
  activePlayer = (activePlayer + 1) % 2;
  // getPlayerEL(activePlayer).classList.add('player--active');
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// Rolling dice
btnRollEL.addEventListener('click', () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.src = `dice-${dice}.png`; // diceEL.setAttribute('src', `dice-${dice}.png`);
    diceEL.classList.remove('hidden');

    if (dice !== 1) {
      currentScore += dice;
    } else {
      // Switch player
      switchPlayer();
    }
    getCurrScroeEL(activePlayer).textContent = currentScore;
  }
});

btnHoldEL.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;
    getScroeEL(activePlayer).textContent = scores[activePlayer];

    // Check if player's score is > 100
    if (scores[activePlayer] > 100) {
      playing = false;
      diceEL.classList.add('hidden');
      getPlayerEL(activePlayer).classList.remove('player--active');
      getPlayerEL(activePlayer).classList.add('player--winner');
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnNewEL.addEventListener('click', init);
