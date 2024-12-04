document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("rules-popup");
    const openPopupButton = document.getElementById("popup");
    const closePopupButton = document.getElementById("close-popup");

    // Afficher la popup quand on clique sur "Règles du jeu"
    openPopupButton.addEventListener("click", function () {
        popup.style.display = "flex"; // Utilise Flexbox pour centrer la popup
    });

    // Fermer la popup quand on clique sur "Fermer"
    closePopupButton.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Fermer la popup en cliquant en dehors de son contenu
    popup.addEventListener("click", function (e) {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
});