
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.project-card, .section-heading, .timeline-item, .capability-grid > div').forEach(el => {
  el.classList.add('fade-in');
  io.observe(el);
});
/* =================================
   DARK MODE
   ================================= */

const themeToggle = document.getElementById("themeToggle");

// Check if visitor previously selected a theme
const savedTheme = localStorage.getItem("theme");

// If they have a saved preference, use it
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

// Otherwise, use their device preference
else if (
  !savedTheme &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.body.classList.add("dark-mode");
}


// Toggle theme when button is clicked
if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

      localStorage.setItem("theme", "dark");

    } else {

      localStorage.setItem("theme", "light");

    }

  });

}