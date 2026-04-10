// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Ensure hero video plays
  const video = document.getElementById('hero-video');
  if (video) {
    video.play().catch(() => {
      console.log("Video autoplay was prevented by browser.");
    });
  }
});