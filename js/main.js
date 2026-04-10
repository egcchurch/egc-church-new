// js/main.js

// Initialize Tailwind and everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Hero video - ensure it plays
  const video = document.getElementById('hero-video');
  if (video) {
    video.play().catch(err => {
      console.log("Video autoplay prevented by browser:", err);
    });
  }

  // Check Firebase Auth State
  checkAuthState();
});

// ==================== AUTH STATE MANAGEMENT ====================
function checkAuthState() {
  // Make sure Firebase is loaded
  if (typeof firebase === 'undefined' || typeof auth === 'undefined') {
    console.log("Firebase not loaded on this page");
    return;
  }

  auth.onAuthStateChanged((user) => {
    const loginBtn = document.getElementById('login-btn');
    
    if (user) {
      // User is logged in
      console.log("User logged in:", user.email);
      
      if (loginBtn) {
        loginBtn.innerHTML = `
          Welcome, ${user.displayName ? user.displayName.split(' ')[0] : 'Member'} 
          <span class="text-xs block text-amber-200">(${user.email})</span>
        `;
        loginBtn.classList.remove('bg-amber-500', 'hover:bg-amber-600');
        loginBtn.classList.add('bg-green-600', 'hover:bg-green-700', 'cursor-default');
        loginBtn.onclick = logoutUser;
      }
    } else {
      // User is logged out
      if (loginBtn) {
        loginBtn.innerHTML = 'Member Login';
        loginBtn.classList.remove('bg-green-600', 'hover:bg-green-700', 'cursor-default');
        loginBtn.classList.add('bg-amber-500', 'hover:bg-amber-600');
        loginBtn.onclick = () => window.location.href = 'login.html';
      }
    }
  });
}

// Logout function
function logoutUser() {
  if (confirm("Are you sure you want to logout?")) {
    auth.signOut().then(() => {
      console.log("User signed out");
      window.location.href = "index.html";
    }).catch((error) => {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    });
  }
}