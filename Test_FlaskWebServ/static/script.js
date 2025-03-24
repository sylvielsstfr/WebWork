document.addEventListener("DOMContentLoaded", function () {
  console.log("Le script.js est bien chargé !");

  // Sélection du bouton et ajout d'un effet au clic
  const bouton = document.querySelector("button");
  if (bouton) {
    bouton.addEventListener("click", function () {
      alert("Bouton cliqué !");
    });
  }
});
