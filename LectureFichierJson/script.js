//💡 Explication du fonctionnement :
//fetch("data.json") : Charge le fichier JSON.
//.then(response => response.json()) : Convertit la réponse HTTP en un objet JavaScript.
// data.forEach(...) : Parcourt les données et insère chaque élément dans le tableau.
// innerHTML : Insère directement les valeurs dans le tableau HTML.
// Gestion des erreurs (catch) : Affiche un message si le fichier JSON ne peut pas être chargé.

document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json()) // Convertir la réponse en JSON
    .then((data) => {
      const tableBody = document.querySelector("#data-table tbody");

      data.forEach((person) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td>${person.id}</td>
                  <td>${person.nom}</td>
                  <td>${person.age}</td>
              `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du fichier JSON :", error)
    );
});
