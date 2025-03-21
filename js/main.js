// Get saved language or default to German
let currentLang = localStorage.getItem("lang") || "de";

function loadLanguage(lang) {
  fetch(`../lang/${lang}.json`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        let key = el.getAttribute("data-i18n");
        if (data[key]) el.innerText = data[key];
      });
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang; // Set the lang attribute for SEO
    });
}

function setLanguage(lang) {
  loadLanguage(lang);
}

loadLanguage(currentLang);

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
const menuLinks = document.querySelectorAll("#fullscreenMenu a");

burger.addEventListener("click", () => {
  fullscreenMenu.classList.toggle("active");
});

closeMenu.addEventListener("click", () => {
  fullscreenMenu.classList.remove("active");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      fullscreenMenu.classList.remove("active");
    }
  });
});

function switchVideo() {
  const desktopVideo = document.getElementById("desktopVideo");
  const mobileVideo = document.getElementById("mobileVideo");

  if (window.innerWidth <= 500) {
    desktopVideo.style.display = "none";
    mobileVideo.style.display = "block";
  } else {
    desktopVideo.style.display = "block";
    mobileVideo.style.display = "none";
  }
}

window.addEventListener("load", switchVideo);
window.addEventListener("resize", switchVideo);

// Smooth scroll on landing and external pages

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");

    // Ignore empty href (#)
    if (href === "#") return;

    const target = document.querySelector(href);
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

document
  .getElementById("contact-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    let isValid = true;

    // Get form elements
    const form = this;
    const formData = new FormData(form);

    // Get input values
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const number = formData.get("number").trim();
    const company = formData.get("company").trim();
    const message = formData.get("message").trim();

    // Error messages
    const nameError = document.createElement("p");
    const emailError = document.createElement("p");
    const numberError = document.createElement("p");
    const companyError = document.createElement("p");
    const messageError = document.createElement("p");
    const successMessage = document.createElement("p");
    const errorMessage = document.createElement("p");

    nameError.style.color = "red";
    emailError.style.color = "red";
    numberError.style.color = "red";
    companyError.style.color = "red";
    messageError.style.color = "red";
    successMessage.style.color = "green";
    errorMessage.style.color = "red";

    // Remove previous error messages
    document
      .querySelectorAll(".error-message, .success-message")
      .forEach((el) => el.remove());

    // Validation
    if (name === "") {
      nameError.textContent = "Bitte geben Sie Ihren Namen ein.";
      form.querySelector("#name").after(nameError);
      isValid = false;
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      emailError.textContent =
        "Bitte geben Sie eine gültige Email-Adresse ein.";
      form.querySelector("#email").after(emailError);
      isValid = false;
    }

    if (number === "" || isNaN(number)) {
      numberError.textContent =
        "Bitte geben Sie eine gültige Telefonnummer ein.";
      form.querySelector("#number").after(numberError);
      isValid = false;
    }

    if (company === "") {
      companyError.textContent = "Bitte geben Sie Ihr Unternehmen an.";
      form.querySelector("#company").after(companyError);
      isValid = false;
    }

    if (message.length < 10) {
      messageError.textContent =
        "Die Nachricht muss mindestens 10 Zeichen lang sein.";
      form.querySelector("#message").after(messageError);
      isValid = false;
    }

    if (!isValid) return;

    // Send form data to Web3Forms API
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        successMessage.textContent = "Formular erfolgreich gesendet!";
        successMessage.classList.add("success-message");
        form.append(successMessage);
        form.reset();
      } else {
        errorMessage.textContent = result.message;
        errorMessage.classList.add("error-message");
        form.append(errorMessage);
      }
    } catch (error) {
      errorMessage.textContent =
        "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.";
      errorMessage.classList.add("error-message");
      form.append(errorMessage);
    }
  });
