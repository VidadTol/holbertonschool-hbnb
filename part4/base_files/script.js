document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form"); // Assurez-vous que l'ID correspond à votre formulaire dans login.html

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Empêcher la soumission de formulaire par défaut
      await loginUser(); // Utiliser await ici pour s'assurer que handleLogin termine
      const emailInput = document.getElementById("email"); // Assurez-vous que l'ID correspond
      const passwordInput = document.getElementById("password"); // Assurez-vous que l'ID correspond
      const errorContainer = document.getElementById("login-error"); // Un endroit pour afficher les erreurs (à créer dans login.html)

      // Vérification de l'existence des éléments HTML requis
      if (!emailInput || !passwordInput || !errorContainer) {
        console.error("Required elements are missing in the login form.");
        return;
      }

      const email = emailInput.value;// Récupere l'email de l'utilisateur
      const password = passwordInput.value;// Récupere le mp

      try {
      // Appeler la fonction loginUser pour envoyer la requête à l'API
        await loginUser(email, password);
      } catch (error) {
        console.error("Erreur lors de la tentative de connexion :", error);
        displayLoginError("Une erreur inattendue s'est produite. Veuillez réessayer.");
      }
    });
  }
});
// Fonction pour effectuer une requête AJAX vers l'API de connexion
const apiUrl = "http://127.0.0.1:5000/api/v1/auth/login"; // URL de l'API de connexion

async function loginUser(email, password) {
  const errorContainer = document.getElementById("login-error"); // Conteneur pour afficher les erreurs
  
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Adaptez les noms des champs si nécessaire
    });

    const data = await response.json();

    if (response.ok) {
      // Connexion réussie
      document.cookie = `token=${data.access_token}; path=/; SameSite=Strict`;
      window.location.href = "index.html"; // Rediriger vers la page principale
    } else {
      // Échec de la connexion
      alert('Login failed: ' + response.statusText);
      displayLoginError(data.message || "Invalid credentials."); // Afficher un message d'erreur
    }
  } catch (error) {
    console.error("Error while connecting:", error);
    displayLoginError("An error occurred while connecting.");
  }
}

  function storeJWTInCookie(token) {
    const cookieName = "authToken"; // Nom du cookie
    const expirationDays = 7; // Durée de validité du cookie (en jours)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    const cookieValue = `${cookieName}=${token}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;

    document.cookie = cookieValue;
    console.log("JWT stored in cookie:", cookieValue);
  }

  function displayLoginError(message) {
    const errorContainer = document.getElementById('login-error');
    if (errorContainer) {
        errorContainer.textContent = message;// Insere le message d'erreur
        errorContainer.style.color = "red";// Stylise l'erreur en rouge
    } else {
        console.error('Element to display login errors not found in login.html');
    }
}