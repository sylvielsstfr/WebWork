const inputField = document.querySelector("input[type='text']");
inputField.addEventListener("input", function () {
  console.log("valeur actuelle sur le champs :" + inputField.value);
});

const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Formulaire envoyé !");
});

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", function () {
  alert("Formulaire réinitialisé !");
});

const nameInput = document.getElementById("nom");
nameInput.addEventListener("focus", function () {
  nameInput.style.backgroundColor = "lightyellow";
});

const nameInput2 = document.getElementById("nom");
nameInput2.addEventListener("blur", function () {
  if (nameInput2.value === "") {
    alert("Le champ nom est vide !");
  }
});

const countrySelect = document.getElementById("pays");
countrySelect.addEventListener("change", function () {
  alert("Vous avez sélectionné : " + countrySelect.value);
});

const emailInput = document.getElementById("email");
const resultDiv = document.getElementById("resultat");

emailInput.addEventListener("input", function () {
  if (emailInput.value.includes("@")) {
    resultDiv.textContent = "Adresse email saisie :: " + emailInput.value;
    resultDiv.style.color = "green";
  } else {
    resultDiv.textContent = "Adresse email invalide";
    resultDiv.style.color = "red";
  }
});
