
// Objet pour les catégories
const mots = {
    fruits: ['tomate', 'banane', 'orange', 'fraise', 'haricot', 'mangue'],
    pays: ['France', 'Japon', 'Bresil', 'Canada', 'Thailande', 'Luxembourg'],
    villes: ['Paris', 'Jacarta', 'Miami', 'Bruxelles', 'Marseille', 'Madrid'],
    objets: ['telephone', 'lampe', 'horloge', 'bouteille', 'violoncelle', 'tronconneuse'],
    sport: ['football', 'basketball', 'accrobranche', 'natation', 'parachutisme', 'quidditch'],
    metiers: ['developpeur', 'designer', 'boulanger', 'avocat', 'professeur', 'medecin'],
};
// variables pour les differentes images de licorne
const licorneImage = {
    goodLetter: '/public/assets/img/licorneBonPoint.jpg',
    badLetter: '/public/assets/img/licorneerreur.jpg',
    win: '/public/assets/img/licornegagne.jpg',
    lose: '/public/assets/img/licornePerdu.jpg'
};
// variables pour l'image du pendu
const penduImage = {
    erreur10: '/public/assets/img/etape1.png',
    erreur9: '/public/assets/img/etape2.png',
    erreur8: '/public/assets/img/etape3.png',
    erreur7: '/public/assets/img/etape4.png',
    erreur6: '/public/assets/img/etape5.png',
    erreur5: '/public/assets/img/etape6.png',
    erreur4: '/public/assets/img/etape7.png',
    erreur3: '/public/assets/img/etape8.png',
    erreur2: '/public/assets/img/etape9.png',
    erreur1: '/public/assets/img/etape10.png',
}

// autre variables
let chosenWord = '';
let tableauMot = [];
let tableauMotCache = [];
let errorCount;


// Fonction pour choisir un mot aléatoire dans une catégorie donnée
const choisirMotAleatoire = (categorie) => {
    const listeMots = mots[categorie];
    const indexMotAleatoire = Math.floor(Math.random() * listeMots.length);
    return listeMots[indexMotAleatoire].toUpperCase();
};
// Fonction pour réinitialiser le clavier au début d'une nouvelle partie
const resetKeyboard = () => {
    keyboardButtons.forEach(button => {
        button.disabled = false; // Réactive le bouton
        button.classList.remove('disabled'); // Supprimer la classe pour réinitialiser l'apparence
    });
};
// Fonction pour désactiver le clavier
const disableKeyboard = () => {
    keyboardButtons.forEach(button => {
        button.disabled = true; // Désactiver le bouton
        button.classList.add('disabled'); // Ajouter une classe pour le style visuel
    });
};
// Fonction pour démarrer une nouvelle partie
const startGame = () => {
    const category = document.getElementById('category').value;
    console.log(category)
    chosenWord = choisirMotAleatoire(category);
    console.log(chosenWord);
    tableauMot = transformeMotTableau(chosenWord);
    tableauMotCache = cacherMot(tableauMot);
    console.log(tableauMotCache)
    console.log(tableauMot)
    resetKeyboard();
    errorCount = 10;
    updateErrorCounter();
    displayWord(tableauMotCache);
    // displayWord();
};

// fonction qui genere le tableauMot à partir du mot trouvé
const transformeMotTableau = (chosenWord) => {
    wordToFind = chosenWord.split('');

    return wordToFind
};
// fonction qui va recuperer les lettres de tableauMot et en faire des "_"
const cacherMot = (tableauMot) => {
    tableauMotCache = []
    tableauMot.forEach(() => {
        tableauMotCache.push('_')
    });
    return tableauMotCache
};
// Fonction pour afficher le mot caché dans la page HTML
const displayWord = (tableauMotCache) => {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = '';
    tableauMotCache.forEach(lettre => {
        if (lettre !== '_') {
            wordDisplay.innerHTML += `<span>${lettre}</span>`; // Afficher la lettre si elle est déjà trouvée
        } else {
            wordDisplay.innerHTML += `<span class="mx-3"> _ </span>`; // Sinon afficher un tiret
        }
    });
};

// Récupérer tous les boutons de lettre du clavier
const keyboardButtons = document.querySelectorAll('#keyboard button');
// ecouteur d'evenement pour chaque lettre choisie
keyboardButtons.forEach(button => {
    button.addEventListener('click', () => {
        const letter = button.textContent; // Récupére la lettre correspondante au bouton
        checkLetter(letter); // Appeler la fonction pour vérifier si la lettre est dans le mot
        button.disabled = true; // permet de desactiver le bouton si utilisé
        button.classList.add('disabled'); // ajoute une class 'disabled' pour desactiver la lettre visuellement en css
    });
});

// Fonction pour mettre à jour le compteur de fautes
const updateErrorCounter = () => {
    const errorCounterSpan = document.getElementById('error-count');
    errorCounterSpan.textContent = errorCount;
};

// Fonction qui compare le mot trouvé (tableauMotCache) au mot original (tableauMot) pour mettre les lettres manquantes en rouge
const revealWordWithErrors = () => {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = ''; // Réinitialiser l'affichage

    tableauMot.forEach((lettre, index) => {
        if (tableauMotCache[index] === '_') {
            // Lettre manquante affichée en rouge
            wordDisplay.innerHTML += `<span class="text-danger mx-3">${lettre}</span>`;
        } else {
            // Lettre trouvée affichée normalement
            wordDisplay.innerHTML += `<span class="mx-3">${lettre}</span>`;
        }
    });
};

// Fonction pour vérifier si la lettre est dans le mot
const checkLetter = (letter) => {
    let found = false;
    tableauMot.forEach((motLetter, index) => {
        if (motLetter === letter) {
            tableauMotCache[index] = letter;
            found = true;
        }
    });
    if (!found) {
        updateLicorneImage('badLetter');
        updatePendu('erreur' + errorCount);
        errorCount--;
        updateErrorCounter();
    } else {
        updateLicorneImage('goodLetter');
        displayWord(tableauMotCache);
    }
    if (errorCount === 0) {
        console.log("PERDU");
        updateLicorneImage('lose');
        disableKeyboard();
        revealWordWithErrors();
    };
    if (compareTableau(tableauMotCache, tableauMot)) {
        console.log("Bravo !");
        updateLicorneImage('win');
        disableKeyboard();
    }
};

// fonction pour comparer tableauMotCache et tableauMot pour verifier s'ils sont égaux
const compareTableau = (tableau1, tableau2) => {
    if (tableau1.length !== tableau2.length) {
        return false;
    }
    for (let i = 0; i < tableau1.length; i++) {
        if (tableau1[i] !== tableau2[i]) {
            return false;
        }
    }
    return true;
};


// Fonction pour mettre à jour le pendu
const updatePendu = (state) => {
    const penduElement = document.getElementById('pendu');
    switch (state) {
        case 'erreur10':
            penduElement.src = penduImage.erreur10;
            break;
        case 'erreur9':
            penduElement.src = penduImage.erreur9;
            break;
        case 'erreur8':
            penduElement.src = penduImage.erreur8;
            break;
        case 'erreur7':
            penduElement.src = penduImage.erreur7;
            break;
        case 'erreur6':
            penduElement.src = penduImage.erreur6;
            break;
        case 'erreur5':
            penduElement.src = penduImage.erreur5;
            break;
        case 'erreur4':
            penduElement.src = penduImage.erreur4;
            break;
        case 'erreur3':
            penduElement.src = penduImage.erreur3;
            break;
        case 'erreur2':
            penduElement.src = penduImage.erreur2;
            break;
        case 'erreur1':
            penduElement.src = penduImage.erreur1;
            break;
    }
}
// Fonction pour mettre à jour la licorne
const updateLicorneImage = (state) => {
    const licorneImageElement = document.getElementById('licorne-image');
    switch (state) {
        case 'goodLetter':
            licorneImageElement.src = licorneImage.goodLetter;
            break;
        case 'badLetter':
            licorneImageElement.src = licorneImage.badLetter;
            break;
        case 'win':
            licorneImageElement.src = licorneImage.win;
            break;
        case 'lose':
            licorneImageElement.src = licorneImage.lose;
            break;
    }
};


// Appel de la fonction startGame pour démarrer une nouvelle partie
startGame();
//  écouteur d'événements au bouton "Nouvelle partie"
document.getElementById('start-btn').addEventListener('click', startGame);
