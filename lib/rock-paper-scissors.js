// Export-ar föllin svo það séi hægt að importa þeim í önnur skjöl
export { checkGame, playAsText, computerPlay };

/**
 * Breytir því sem spilað var úr tölu í texta.
 * @param {string} play Hverju var spilað sem tölu
 * @returns Textaheiti þess sem spilað var
 */
function playAsText(play) {
  switch (play) {
    case 1:
      return 'Skæri';
    case 2:
      return 'Blað';
    case 3:
      return 'Steinn';
    default:
      return 'Óþekkt';
  }
}


/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  if (player === 1 && computer === 2) // Skæri vinnur blað
    return 1;

  if (player === 2 && computer === 3) // Blað vinnur stein
    return 1;

  if (player === 3 && computer === 1) // Steinn vinnur skæri
    return 1;

  if (player === computer) // Jafntefli!
    return 0;

  return -1;
}


/**
 * Spilar fyrir tölvu.
 * @returns {number} Heiltala á bilinu [1, 3]
 */
function computerPlay() {
  return (Math.floor(Math.random() * 3) + 1);
}
