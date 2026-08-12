
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.project-card, .section-heading, .timeline-item, .capability-grid > div').forEach(el => {
  el.classList.add('fade-in');
  io.observe(el);
});
