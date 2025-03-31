document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form"); // Assurez-vous que l'ID correspond à votre formulaire dans login.html

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) {
      event.preventDefault(); // Empêcher la soumission de formulaire par défaut
      handleLogin(); // Appeler une fonction pour gérer la connexion
    });
  }
});

async function loginUser(email, password) {
  const emailInput = document.getElementById("email"); // Assurez-vous que l'ID correspond
  const passwordInput = document.getElementById("password"); // Assurez-vous que l'ID correspond
  const errorContainer = document.getElementById("login-error"); // Un endroit pour afficher les erreurs (à créer dans login.html)

  const email = emailInput.value;
  const password = passwordInput.value;

  const apiUrl = "http://127.0.0.1:5000/api/v1/auth/login"; // Remplacez par l'URL réelle de votre API de connexion

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
      const data = await response.json()
      document.cookie = `token=${data.access_token};`
      storeJWTInCookie(jwtToken); // Fonction pour stocker le JWT dans un cookie
      window.location.href = "index.html"; // Rediriger vers la page principale
    } else {
      // Échec de la connexion
      displayLoginError(data.message || "Invalid credentials."); // Afficher un message d'erreur
    }
  } catch (error) {
    console.error("Error while connecting:", error);
    displayLoginError("An error occurred while connecting.");
  }

  function storeJWTInCookie(token) {
    const cookieName = "authToken"; // Nom du cookie
    const expirationDays = 7; // Durée de validité du cookie (en jours)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    const cookieValue = `<span class="math-inline">\{cookieName\}\=</span>{token}; expires=${expirationDate.toUTCString()}; path=/; httpOnly; secure;`; // Ajoutez 'secure' si votre site est en HTTPS

    document.cookie = cookieValue;
    console.log("JWT stored in cookie:", cookieValue);
  }
}
function displayLoginError(message) {
    const errorContainer = document.getElementById('login-error'); // Assurez-vous que cet élément existe dans login.html
    if (errorContainer) {
        errorContainer.textContent = message;
    } else {
        console.error('Element to display login errors not found in login.html');
    }
}