function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.querySelector(".login-button");
  if (loginLink) {
    loginLink.addEventListener("click", () => {
      window.location.href = "login.html"; // Rediriger vers la page de connexion
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Empêcher la soumission de formulaire par défaut

      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const errorContainer = document.getElementById("login-error");

      if (!emailInput || !passwordInput || !errorContainer) {
        console.error("Required elements are missing in the login form.");
        return;
      }

      const email = emailInput.value;
      const password = passwordInput.value;

      try {
        await loginUser(email, password);
      } catch (error) {
        console.error("Erreur lors de la tentative de connexion :", error);
        displayLoginError(
          "Une erreur inattendue s'est produite. Veuillez réessayer."
        );
      }
    });
  }

  const stars = document.querySelectorAll(".rating .star");
  let selectedRating = 0;

  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      highlightStars(index + 1);
    });

    star.addEventListener("click", () => {
      selectedRating = index + 1;
      highlightStars(selectedRating);
      console.log(`Rating selected: ${selectedRating}`);
    });

    star.addEventListener("mouseout", () => {
      if (selectedRating === 0) {
        resetStars();
      } else {
        highlightStars(selectedRating);
      }
    });
  });

  function highlightStars(rating) {
    if (!stars) return; // Vérifier si stars est défini
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add("active");
      } else {
        star.classList.remove("active");
      }
    });
  }

  function resetStars() {
    if (!stars) return; // Vérifier si stars est défini
    stars.forEach((star) => star.classList.remove("active"));
  }
});

const apiUrl = "http://127.0.0.1:5000/api/v1/auth/login";

async function loginUser(email, password) {
  const errorContainer = document.getElementById("login-error");

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Login successful:", data);
      console.log("Token:", data.access_token);
      document.cookie = `token=${data.access_token}; path=/; SameSite=Strict; Secure`;
      window.location.href = "index.html";
    } else {
      displayLoginError(data.message || "Invalid credentials.");
    }
  } catch (error) {
    console.error("Error while connecting:", error);
    displayLoginError("An error occurred while connecting.");
  }
}

function displayLoginError(message) {
  const errorContainer = document.getElementById("login-error");
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.style.color = "red";
  } else {
    console.error("Element to display login errors not found in login.html");
  }
}

function isUserLoggedIn() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return !!token;
}

async function fetchPlaces(token) {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/v1/places", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des lieux");
    }

    const places = await response.json();
    return places;
  } catch (error) {
    console.error("Erreur lors de la récupération des lieux :", error);
    return [];
  }
}
// Ajout de la fonction pour récupérer les lieux depuis la base de données
async function fetchPlacesFromDatabase() {
  try {
    const response = await fetch("http://localhost:5000/api/places");
    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des lieux depuis la base de données"
      );
    }
    const places = await response.json();
    console.log("Lieux récupérés depuis la base de données :", places);
    // Ici, tu peux ajouter le code pour afficher les lieux dans ton interface utilisateur
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des lieux depuis la base de données :",
      error
    );
  }
}

// Ajout de la fonction pour ajouter un lieu (exemple)
async function addPlaceToDatabase(placeData) {
  try {
    const response = await fetch("http://localhost:5000/api/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placeData),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout du lieu à la base de données");
    }
    const newPlace = await response.json();
    console.log("Nouveau lieu ajouté à la base de données :", newPlace);
  } catch (error) {
    console.error(
      "Erreur lors de l'ajout du lieu à la base de données :",
      error
    );
  }
}
async function displayPlaces() {
  try {
    const places = await fetchPlaces();
    const placesContainer = document.getElementById("places-list");

    if (!placesContainer) {
      console.error("Element with id places-list not found");
      return;
    }

    placesContainer.innerHTML = ""; // Efface le contenu précédent

    if (places && Array.isArray(places)) {
      places.forEach((place) => {
        const placeElement = document.createElement("div");
        placeElement.className = "place-card";
        placeElement.setAttribute("data-type", place.type.toLowerCase()); // Ajoute l'attribut data-type

        placeElement.innerHTML = `
                  <h3>${place.name}</h3>
                  <p>Host: ${place.host}</p>
                  <p>Price per night: ${place.price}</p>
                  <p>Description: ${place.description}</p>
                  <p>Amenities: ${place.amenities}</p>
              `;
        placesContainer.appendChild(placeElement);
      });
    } else {
      placesContainer.innerHTML = "<p>Aucun lieu à afficher.</p>";
    }
  } catch (error) {
    console.error("Erreur lors de l'affichage des lieux:", error);
  }
}
function filterPlaces(type) {
  const places = document.querySelectorAll(".place-card"); // Sélectionne tous les lieux
  const buttons = document.querySelectorAll(".tab-link"); // Sélectionne tous les boutons

  // Mettre à jour la classe "active" pour le bouton sélectionné
  buttons.forEach(button => {
      if (button.textContent.trim().toLowerCase() === type.toLowerCase()) {
          button.classList.add("active"); // Activer le bouton
      } else {
          button.classList.remove("active"); // Désactiver les autres boutons
      }
  });
}