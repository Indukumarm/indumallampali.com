document.addEventListener("DOMContentLoaded", () => {
  // Smooth fade-in effect for all sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Optional: Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Optional: Dim hero video as user scrolls
  const heroVideo = document.querySelector('.hero-video video');
  window.addEventListener("scroll", () => {
    if (heroVideo) {
      const scrollY = window.scrollY;
      const fadeAmount = Math.min(scrollY / 600, 0.6);
      heroVideo.style.filter = `brightness(${1 - fadeAmount})`;
    }
  });
});
