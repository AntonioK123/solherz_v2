// Burger Menu Toggle
const burger = document.getElementById("burger");
const fullscreenMenu = document.getElementById("fullscreenMenu");
const closeMenu = document.getElementById("closeMenu");

burger.addEventListener("click", () => {
  fullscreenMenu.classList.toggle("active");
});

closeMenu.addEventListener("click", () => {
  fullscreenMenu.classList.remove("active");
});

// Smooth scroll on landing and external pages

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash;
  if (hash) {
    history.replaceState(null, null, window.location.pathname);
    setTimeout(() => {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }
});
