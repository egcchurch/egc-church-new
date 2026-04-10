// js/auth.js

// Sign in with Google
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log("Google login successful", result.user);
      window.location.href = "index.html";   // Change to members dashboard later
    })
    .catch((error) => {
      console.error("Google login error:", error.message);
      alert("Login failed: " + error.message);
    });
}

// Sign in with Facebook
function signInWithFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log("Facebook login successful", result.user);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Facebook login error:", error.message);
      alert("Login failed: " + error.message);
    });
}

// Email/Password Login
document.getElementById('email-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log("Email login successful");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});

function showRegister() {
  alert("Registration form coming soon. For now, use the Firebase console to create test users.");
}