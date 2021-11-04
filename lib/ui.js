// Sækir föll úr öðrum skrám
import { playAsText } from './rock-paper-scissors.js';

// Export-ar föllin svo það séi hægt að importa þeim í önnur skjöl
export { createButtons, playButtons, show, updateResultScreen, updateGames};

/**
 * Býr til takka fyrir notanda til að velja umferðir leiks.
 * @param {number} max Hámark umferða
 */
function createButtons(max) {
  parent = document.querySelector('.rounds__buttons');

  // Býr til takka fyrir allar oddatölur undir MAX
  for (let i = 1; i<max; i++) {
    if (i % 2 != 0) {
      let butt = document.createElement('button');
      butt.classList.add('button');
      butt.textContent = i;
      butt.setAttribute("onclick","round(" + i + ");");
      parent.appendChild(butt);
    }
  }
}


/**
 * Birtir annaðhvort "næsta umferð" eða "næsti leikur" takkana.
 * @param {*} butt 
 */
function playButtons(butt){
  // Klára leik og næsta umferð takkanir
  const finish = document.querySelector('.finishGame');
  const next   = document.querySelector('.nextRound');

  // Felum báða takka
  finish.classList.add('hidden');
  next.classList.add('hidden');

  // Sýna takka sem valið er
  switch (butt) {
    case 'next':
      next.classList.remove('hidden');
      break;
    case 'finish':
      finish.classList.remove('hidden');
      break;
    default:
      finish.classList.remove('hidden');
  }
}


/**
 * Birtir viðeigandi ská og felur alla aðra.
 * @param {*} part Skjár sem á að sýna
 */
function show(part) {
  // Element fyrir „parta“ leiks sem við viljum fela og sýna
  const start  = document.querySelector('.start');
  const rounds = document.querySelector('.rounds');
  const play   = document.querySelector('.play');
  const result = document.querySelector('.result');

  // Felum allt
  start.classList.add('hidden');
  rounds.classList.add('hidden');
  play.classList.add('hidden');
  result.classList.add('hidden');

  // og sýnum það sem beðið er um
  switch (part) {
    case 'start':
      start.classList.remove('hidden');
      break;
    case 'rounds':
      rounds.classList.remove('hidden');
      break;
    case 'play':
      play.classList.remove('hidden');
      break;
    case 'result':
      result.classList.remove('hidden');
      break;
    default:
      console.warn(`${part} óþekkt`);
  }
}


/**
 * Uppfærir öll gildi stöðu skjás innan `.result` áður en sýndur.
 * @param {Results} r Gildi fyrir skjá
 */
function updateResultScreen({ player, computer, result, currentRound, totalRounds, playerWins, computerWins }) {
  const theResults = document.querySelector('.result__result');

  // Skilar stöðu umferðar
  document.querySelector('.result__player').textContent       = playAsText(player);
  document.querySelector('.result__computer').textContent     = playAsText(computer);
  document.querySelector('.result__status').textContent       = "Staðan er " + playerWins + "-" + computerWins;
  document.querySelector('.result__currentRound').textContent = currentRound;
  document.querySelector('.result__totalRounds').textContent  = totalRounds;

  // Segir ef notandi vann eða tapaði
  if      (result ==  1) theResults.textContent = "Þú sigrar.";
  else if (result == -1) theResults.textContent = "Talva sigrar.";
  else                   theResults.textContent = "Jafntefli.";
}


/**
 * Uppfærir hliðardálkin með stöðu leikja.
 * @param {*} games Staða allra leikja spilaða
 * @param {*} wins Hversu oft notandinn hefur unnið
 */
function updateGames(games, wins) {
  // Fyllir alla reiti með nýju stöðu spilarans
  document.querySelector('.games__played').textContent    = games.length;
  document.querySelector('.games__wins').textContent      = wins;
  document.querySelector('.games__losses').textContent    = games.length - wins;
  document.querySelector('.games__winratio').textContent  = ((wins / games.length) * 100).toFixed(2);
  document.querySelector('.games__lossratio').textContent = (Math.abs((wins-games.length) / games.length) * 100).toFixed(2);

  let text = "";
  let currentGame = games[games.length-1];

  if(currentGame["player"] > currentGame["computer"])
    text = "Þú vannst";
  else
    text = "Talva vann";

  // Bætir við nýju staki af kláruðum leiknum í listann
  let listItem = document.createElement('li');
  listItem.innerHTML = text + " " + currentGame["player"] + "-" + currentGame["computer"];
  document.querySelector('.games__list').appendChild(listItem);
}
