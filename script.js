// Smooth fade-in effect for sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

// Apply observer to all section elements
const sections = document.querySelectorAll('section');
sections.forEach(section => {
  observer.observe(section);
});
