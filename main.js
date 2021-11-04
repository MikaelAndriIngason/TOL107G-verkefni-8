// Sækir föll úr öðrum skrám
import { show, updateResultScreen, createButtons, playButtons, updateGames } from './lib/ui.js';
import { computerPlay, checkGame } from './lib/rock-paper-scissors.js';

//  Hámarks fjöldi best-of leikja
const MAX_BEST_OF = 10;

//  Fjöldi sigra spilara í öllum leikjum
let totalWins = 0;

//  Núverandi umferð
let totalRounds;
let currentRound = 1;
let playerWins   = 0;
let computerWins = 0;

// Utanumhald um alla spilaða leiki
const games = [];


/**
 * Uppfærir stöðu eftir að spilari hefur spilað.
 * @param {number} player Það sem spilari spilaði
 */
function playRound(player) {
  let computer = computerPlay();
  let result   = checkGame(player, computer);

  if      (result == 1)  playerWins++;
  else if (result == -1) computerWins++;

  // Uppfærir niðurstöðuskjá
  updateResultScreen({
    player,
    computer,
    result,
    currentRound,
    totalRounds,
    playerWins,
    computerWins,
  });

  // Uppfærum teljara ef ekki jafntefli, verðum að gera eftir að við setjum titil
  if (result != 0) currentRound++;

  // Ákveðum hvaða takka skuli sýna
  if (currentRound == totalRounds + 1 || playerWins >= Math.round(totalRounds / 2) || computerWins >= Math.round(totalRounds / 2))
    playButtons('finish');
  else
    playButtons('next');

  // Sýnum niðurstöðuskjá
  show('result');
}


/**
 * Fall sem bregst við því þegar smellt er á takka fyrir fjölda umferða
 * @param {Event} e Upplýsingar um atburð
 */
function round(e) {
  if(e != null) totalRounds = e;
  show('play');
}
window.round = round;


/**
 * Uppfærir stöðu yfir alla spilaða leiki þegar leik lýkur.
 * Gerir tilbúið þannig að hægt sé að spila annan leik í framhaldinu.
 */
function finishGame() {
  let win = false;

  if(playerWins > computerWins) {
    win = true
    totalWins++;
  }

  // Bætum við nýjasta leik
  games.push({"player": playerWins, "computer": computerWins, "win": win})

  // Uppfærum stöðu og bætum leik við lista af spiluðum leikjum
  updateGames(games, totalWins);

  // Núllstillum breytur
  currentRound = 1;
  playerWins   = 0;
  computerWins = 0; 

  // Byrjum nýjan leik!
  show('rounds');
}

//Þegar síðan er hlöðuð inn þá er bara sýnt start takkan
window.onload = show('start');

// Takki sem byrjar leik
document.querySelector('.start button').addEventListener('click', () => show('rounds'));

// Búum til takka fyrir umferðir
createButtons(MAX_BEST_OF);

// Event listeners fyrir skæri, blað, steinn takka
document.querySelector('button.scissor').addEventListener('click', () => playRound(1));
document.querySelector('button.paper').addEventListener('click', () => playRound(2));
document.querySelector('button.rock').addEventListener('click', () => playRound(3));

// Næsta umferð og ljúka leik takkar
document.querySelector('button.finishGame').addEventListener('click', finishGame);
document.querySelector('button.nextRound').addEventListener('click', function() { round() });