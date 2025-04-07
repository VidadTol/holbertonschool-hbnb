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
        displayLoginError("Une erreur inattendue s'est produite. Veuillez réessayer.");
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
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
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
  const token = document.cookie.split("; ").find((row) => row.startsWith("token="));
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
  }
}