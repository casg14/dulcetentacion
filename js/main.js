document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ==================== ANIMACIONES ====================
  const elements = document.querySelectorAll(
    ".servicio-card, .producto-card, .about-image, .instagram-phone, " +
    ".servicios > h2, .about-text h2, .about-text p, " +
    ".instagram-text h2, .instagram-text p, .cta h2, .cta p"
  );

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    elements.forEach((element) => {
      const grid = element.closest(".servicios-grid, .productos-grid");
      if (grid) {
        const cardIndex = Array.from(grid.children).indexOf(element);
        element.style.setProperty("--reveal-delay", `${cardIndex * 110}ms`);
      }

      element.classList.add("fade-in");
      observer.observe(element);
    });
  }

  const heroVideo = document.querySelector(".hero-image video");
  if (prefersReducedMotion && heroVideo) {
    heroVideo.pause();
  }

  // ==================== MENU MOBILE ====================
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  function closeMenu() {
    nav.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    nav.classList.toggle("active", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  // ==================== NAVBAR DESPUES DEL HERO ====================
  const navbar = document.querySelector(".navbar");
  const updateNavbarVisibility = () => {
    navbar.classList.toggle("show", window.scrollY >= window.innerHeight * 0.5);
  };

  window.addEventListener("scroll", updateNavbarVisibility, { passive: true });
  window.addEventListener("resize", updateNavbarVisibility);
  updateNavbarVisibility();

  // ==================== PRODUCT CAROUSELS ====================
  document.querySelectorAll(".producto-carousel").forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-track img");
    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");
    let index = 0;

    function goToSlide(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      carousel.scrollTo({
        left: index * carousel.clientWidth,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }

    carousel.addEventListener("scroll", () => {
      index = Math.round(carousel.scrollLeft / carousel.clientWidth);
    }, { passive: true });

    next.addEventListener("click", () => goToSlide(index + 1));
    prev.addEventListener("click", () => goToSlide(index - 1));
  });

  // ==================== ABOUT CAROUSEL ====================
  document.querySelectorAll(".about-carousel").forEach((carousel) => {
    const track = carousel.querySelector(".about-track");
    const slides = carousel.querySelectorAll(".about-track img");
    const prev = carousel.querySelector(".about-btn.prev");
    const next = carousel.querySelector(".about-btn.next");
    let index = 0;

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    next.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      update();
    });

    prev.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      update();
    });
  });
});