
// Objet pour les catégories
const words = {
    fruits: ['pomme', 'banane', 'orange', 'fraise', 'ananas', 'mangue'],
    pays: ['France', 'Japon', 'Brésil', 'Canada', 'Thaïlande','Luxembourg'],
    villes: ['Marrakech','Shanghai','Washington','Bruxelles','Marseille','Madrid'],
    objets:['telephone','lampe','horloge','bouteille','violoncelle','tronconneuse'],
    sport: ['football','basketball','accrobranche','natation','parachutisme','quidditch'],
    metiers: ['developpeur','designer','boulanger','avocat','professeur','medecin'],
};
let chosenWord = '';
let lettersChosen = [];

document.getElementById('start-btn').onclick = () => startGame();

const startGame = () => {
  const category = document.getElementById('category').value;
  const wordList = words[category];
  chosenWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
  lettersChosen = [];
  displayWord();
  displayKeyboard();
};

const displayWord = () => {
  const wordDisplay = document.getElementById('word-display');
  wordDisplay.innerHTML = '';
  chosenWord.split('').forEach(letter => {
    const displayLetter = lettersChosen.includes(letter) ? letter : '_';
    wordDisplay.innerHTML += `<span>${displayLetter}</span>`;
  });
};

const displayKeyboard = () => {
  const keyboard = document.getElementById('keyboard');
  keyboard.innerHTML = '';
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  keyboard.innerHTML += `<div class="keyboard-row">`;
  alphabet.forEach((letter,index) => {
    const disabled = lettersChosen.includes(letter) ? 'disabled' : '';
    keyboard.innerHTML += `<button onclick="letterChosen('${letter}')" ${disabled}>${letter}</button>`;
    if ((index + 1) % 10 === 0 && index < alphabet.length - 1) {
        keyboard.innerHTML += `</div><div class="keyboard-row">`;
      }
  });
  keyboard.innerHTML += `</div>`;
};

const letterChosen = (letter) => {
  lettersChosen.push(letter);
  if (!chosenWord.includes(letter)) {
    // Dessinez une partie du pendu
    // Ajouter la structure pour dessiner le pendu
  }
  displayWord();
  displayKeyboard();
};