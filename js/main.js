function acceptAllCookies() {
  localStorage.setItem(
    "cookieConsent",
    JSON.stringify({ essential: true, analytics: true, marketing: true })
  );
  hideBanner();
}

function rejectAllCookies() {
  localStorage.setItem(
    "cookieConsent",
    JSON.stringify({ essential: true, analytics: false, marketing: false })
  );
  hideBanner();
}

function openCookieSettings() {
  document.getElementById("cookie-settings").style.display = "block";
}

function saveCookiePreferences() {
  const consent = {
    essential: true,
    analytics: document.getElementById("analytics-cookies").checked,
    marketing: document.getElementById("marketing-cookies").checked,
  };
  localStorage.setItem("cookieConsent", JSON.stringify(consent));
  document.getElementById("cookie-settings").style.display = "none";
  hideBanner();
}

function hideBanner() {
  document.getElementById("cookie-banner").style.display = "none";
  document.getElementById("change-cookie-settings").style.display = "block";
}

window.onload = function () {
  const consent = localStorage.getItem("cookieConsent");
  if (!consent) {
    document.getElementById("cookie-banner").style.display = "block";
  } else {
    document.getElementById("change-cookie-settings").style.display = "block";
  }
};

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
