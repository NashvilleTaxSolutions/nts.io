const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const initializePageReveals = () => {
  const page = document.querySelector('.elementor[data-elementor-type="wp-page"]');
  if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const heroContent = page.querySelector(".hero-section > .e-con-inner");
  const sections = Array.from(page.children).filter(
    (element) =>
      element.matches(".e-parent, #our-team") &&
      !element.matches(".hero-section"),
  );

  if (heroContent) {
    heroContent.classList.add("page-load-reveal");
    heroContent.querySelectorAll(".elementor-invisible").forEach((element) => {
      element.classList.remove("elementor-invisible");
    });
    requestAnimationFrame(() => heroContent.classList.add("is-revealed"));
  }

  const revealSection = (section) => {
    section.querySelectorAll(".elementor-invisible").forEach((element) => {
      element.classList.remove("elementor-invisible");
    });
    section.classList.add("is-revealed");
  };

  if (!("IntersectionObserver" in window)) {
    sections.forEach(revealSection);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealSection(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  sections.forEach((section) => {
    section.classList.add("scroll-reveal");
    observer.observe(section);
  });
};

const startPageReveals = () => requestAnimationFrame(initializePageReveals);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startPageReveals, {
    once: true,
  });
} else {
  startPageReveals();
}
