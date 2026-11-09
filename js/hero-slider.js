"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("[data-hero-slider]");
  if (!slider) return;

  const slides = [...slider.querySelectorAll(".hero-slide")];
  const indicators = [...slider.querySelectorAll("[data-hero-slide]")];
  if (!slides.length) return;

  let currentSlide = 0;
  let timer = null;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === currentSlide));
    indicators.forEach((indicator, indicatorIndex) => {
      const active = indicatorIndex === currentSlide;
      indicator.classList.toggle("active", active);
      if (active) indicator.setAttribute("aria-current", "true");
      else indicator.removeAttribute("aria-current");
    });
  }

  function startSlider() {
    window.clearInterval(timer);
    timer = window.setInterval(() => showSlide(currentSlide + 1), 5000);
  }

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      showSlide(Number(indicator.dataset.heroSlide));
      startSlider();
    });
  });

  slider.addEventListener("mouseenter", () => window.clearInterval(timer));
  slider.addEventListener("mouseleave", startSlider);
  slider.addEventListener("focusin", () => window.clearInterval(timer));
  slider.addEventListener("focusout", startSlider);

  showSlide(0);
  startSlider();
});
