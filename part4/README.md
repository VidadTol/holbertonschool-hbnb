# HBnB v2 - Simple Web Client
## Description
This project is part of the **HBnB v2** curriculum, focusing on front-end development using **HTML5, CSS3, and JavaScript ES6**. The goal is to create an interactive web client that interacts with the back-end services developed in previous phases of the HBnB project.
## Objectives
- Develop a user-friendly interface following provided design specifications.
- Implement client-side functionality to interact with the back-end API.
- Ensure secure and efficient data handling using JavaScript.
- Apply modern web development practices to create a dynamic web application.
## Learning Goals
- Understand and apply **HTML5, CSS3, and JavaScript ES6** in a real-world project.
- Learn to interact with back-end services using **AJAX/Fetch API**.
- Implement authentication mechanisms and manage user sessions.
- Use client-side scripting to enhance user experience without page reloads.
## Features & Tasks
### 1. Design
- Complete the provided HTML and CSS files to match the given design specifications.
- Create pages for:
  - **Login Form**
  - **List of Places**
  - **Place Details**
  - **Add Review**
### 2. Login
- Implement login functionality using the back-end API.
- Store the **JWT token** returned by the API in a **cookie** for session management.
- Redirect users to the main page upon successful login.
- Display an error message if login fails.
### 3. List of Places
- Implement the main page to display a list of available places.
- Fetch places data from the API and implement **client-side filtering**.
- Redirect unauthorized users to the login page.
### 4. Place Details
- Implement a detailed view of a place.
- Fetch detailed information from the API.
- Display a form for adding a review if the user is authenticated.
### 5. Add Review
- Implement a form allowing authenticated users to leave a review.
- Ensure unauthenticated users are redirected to the login page.
## Technologies Used
- **HTML5** (Semantic structure)
- **CSS3** (Responsive design)
- **JavaScript ES6** (Client-side scripting)
- **Fetch API** (AJAX requests)
- **JWT Authentication** (User session management)
## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/VidadTol/holbertonschool-hbnb
   cd holbertonschool-hbnb/part4
   ```
2. Open the project folder in a code editor.
3. Serve the files locally (e.g., using **Live Server** extension in VS Code).
4. Modify the **API endpoint** in `scripts.js` to match your back-end URL.
5. Test the web client functionalities:
   - Login with valid credentials
   - Fetch and display places
   - View place details
   - Submit a review (if authenticated)
## Notes
- Ensure the back-end API allows **Cross-Origin Resource Sharing (CORS)**.
- All pages must pass the **W3C Validator** for HTML & CSS.
## Authors
**David TOLZA** (modifié) 