
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
/* =================================
   FEATURED PROJECT SHOWCASE
   ================================= */

const showcase = document.getElementById("featuredShowcase");

if (showcase) {
  const slides = Array.from(showcase.querySelectorAll(".showcase-slide"));
  const dots = Array.from(document.querySelectorAll(".showcase-dot"));
  const prev = document.getElementById("showcasePrev");
  const next = document.getElementById("showcaseNext");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let activeIndex = 0;
  let autoTimer;
  let scrollFrame;

  const normalizeIndex = (index) =>
    (index + slides.length) % slides.length;

  const updateActiveState = (index) => {
    activeIndex = normalizeIndex(index);

    slides.forEach((slide, i) => {
      const isActive = i === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-current", isActive ? "true" : "false");
    });

    dots.forEach((dot, i) => {
      const isActive = i === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  // Calculate the scroll destination from what is actually on screen.
  // This avoids offset-parent differences that could make the wrong slide active.
  const getTargetLeft = (slide) => {
    const viewportRect = showcase.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    return showcase.scrollLeft + (slideRect.left - viewportRect.left);
  };

  const goToSlide = (index, behavior = reduceMotion ? "auto" : "smooth") => {
    const nextIndex = normalizeIndex(index);
    updateActiveState(nextIndex);

    showcase.scrollTo({
      left: getTargetLeft(slides[nextIndex]),
      behavior
    });
  };

  // Keep the visual focus, number/dot state, and physically visible card synced.
  const syncActiveFromPosition = () => {
    const viewportLeft = showcase.getBoundingClientRect().left;

    const nearest = slides.reduce(
      (best, slide, i) => {
        const distance = Math.abs(
          slide.getBoundingClientRect().left - viewportLeft
        );

        return distance < best.distance
          ? { index: i, distance }
          : best;
      },
      { index: activeIndex, distance: Infinity }
    );

    if (nearest.index !== activeIndex) {
      updateActiveState(nearest.index);
    }
  };

  const restartAuto = () => {
    window.clearInterval(autoTimer);

    if (!reduceMotion && !document.hidden) {
      autoTimer = window.setInterval(() => {
        goToSlide(activeIndex + 1);
      }, 6500);
    }
  };

  prev?.addEventListener("click", () => {
    goToSlide(activeIndex - 1);
    restartAuto();
  });

  next?.addEventListener("click", () => {
    goToSlide(activeIndex + 1);
    restartAuto();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goToSlide(i);
      restartAuto();
    });
  });

  showcase.addEventListener(
    "scroll",
    () => {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(syncActiveFromPosition);
    },
    { passive: true }
  );

  showcase.addEventListener("mouseenter", () => window.clearInterval(autoTimer));
  showcase.addEventListener("mouseleave", restartAuto);
  showcase.addEventListener("focusin", () => window.clearInterval(autoTimer));
  showcase.addEventListener("focusout", restartAuto);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearInterval(autoTimer);
    } else {
      restartAuto();
    }
  });

  // Always initialize the carousel in a known, correctly synchronized state.
  window.requestAnimationFrame(() => {
    updateActiveState(0);
    showcase.scrollTo({ left: getTargetLeft(slides[0]), behavior: "auto" });
    restartAuto();
  });
}
