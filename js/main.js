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
