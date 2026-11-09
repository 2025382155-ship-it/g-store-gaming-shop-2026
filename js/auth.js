"use strict";

const IPLAY_USERS_KEY = "iplay_users";
const IPLAY_CURRENT_USER_KEY = "iplay_currentUser";

const DEMO_USERS = [
  {
    fullName: "G-Store Customer",
    email: "customer@iplay.com",
    password: "customer123",
    role: "customer"
  },
  {
    fullName: "G-Store Admin",
    email: "staff@iplay.com",
    password: "staff123",
    role: "staff"
  }
];

function normaliseEmail(email) {
  return email.trim().toLowerCase();
}

function getRegisteredUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(IPLAY_USERS_KEY));
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

function saveRegisteredUsers(users) {
  localStorage.setItem(IPLAY_USERS_KEY, JSON.stringify(users));
}

function getDemoUsers() {
  return DEMO_USERS.map((user) => ({
    ...user,
    email: normaliseEmail(user.email)
  }));
}

function findUser(email) {
  const normalisedEmail = normaliseEmail(email);
  return [...getDemoUsers(), ...getRegisteredUsers()]
    .find((user) => normaliseEmail(user.email) === normalisedEmail);
}

function setAlert(element, message, type = "danger") {
  if (!element) return;
  element.textContent = message;
  element.className = `alert alert-${type}`;
}

function clearAlert(element) {
  if (!element) return;
  element.textContent = "";
  element.className = "alert d-none";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
}

function storeCurrentUser(user) {
  const currentUser = {
    fullName: user.fullName,
    email: normaliseEmail(user.email),
    role: user.role
  };
  localStorage.setItem(IPLAY_CURRENT_USER_KEY, JSON.stringify(currentUser));
}

function setupPasswordToggles() {
  document.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.passwordToggle);
      if (!input) return;

      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      button.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
      button.setAttribute("title", isPassword ? "Hide password" : "Show password");
      button.innerHTML = `<i class="bi ${isPassword ? "bi-eye-slash" : "bi-eye"}"></i>`;
    });
  });
}

function setupLogin() {
  const form = document.getElementById("login-form");
  if (!form) return;

  const alertBox = document.getElementById("login-alert");
  const purchaseRequired = new URLSearchParams(window.location.search).get("purchase") === "1";
  if (purchaseRequired && alertBox) {
    setAlert(alertBox, "Please sign in or create an account to continue your purchase.", "warning");
  }
  const registerLink = document.querySelector(".auth-switch a[href^='register.html']");
  if (purchaseRequired && registerLink) {
    registerLink.href = "register.html?purchase=1";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearAlert(alertBox);

    const email = normaliseEmail(form.elements.email.value);
    const password = form.elements.password.value;

    if (!email || !password) {
      setAlert(alertBox, "Please enter both your email address and password.");
      return;
    }

    if (!isValidEmail(email)) {
      setAlert(alertBox, "Please enter a valid email address.");
      return;
    }

    const user = findUser(email);
    if (!user || user.password !== password) {
      setAlert(alertBox, "Incorrect email address or password. Please try again.");
      return;
    }

    storeCurrentUser(user);
    let destination = user.role === "staff" ? "staff/dashboard.html" : "customer/home.html";
    if (user.role === "customer") {
      try {
        const pendingPurchase = JSON.parse(sessionStorage.getItem("gstore_pending_purchase"));
        if (pendingPurchase?.returnUrl) destination = pendingPurchase.returnUrl;
      } catch {}
    }
    const submitButton = document.getElementById("login-submit");
    const submitLabel = submitButton?.querySelector(".auth-submit-label");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add("is-loading");
      submitButton.setAttribute("aria-busy", "true");
      if (submitLabel) submitLabel.textContent = "Signing in...";
    }
    window.setTimeout(() => {
      window.location.href = destination;
    }, 250);
  });
}

function setupRegistration() {
  const form = document.getElementById("register-form");
  if (!form) return;

  const alertBox = document.getElementById("register-alert");
  const purchaseRequired = new URLSearchParams(window.location.search).get("purchase") === "1";
  if (purchaseRequired && alertBox) {
    setAlert(alertBox, "Please sign in or create an account to continue your purchase.", "warning");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearAlert(alertBox);

    const fullName = form.elements.fullName.value.trim();
    const email = normaliseEmail(form.elements.email.value);
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;

    if (!fullName) {
      setAlert(alertBox, "Please enter your full name.");
      return;
    }

    if (!isValidEmail(email)) {
      setAlert(alertBox, "Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      setAlert(alertBox, "Password must be at least 8 characters and include a letter and a number.");
      return;
    }

    if (password !== confirmPassword) {
      setAlert(alertBox, "Passwords do not match.");
      return;
    }

    if (findUser(email)) {
      setAlert(alertBox, "An account with this email address already exists.");
      return;
    }

    const users = getRegisteredUsers();
    users.push({
      fullName,
      email,
      password,
      role: "customer"
    });
    saveRegisteredUsers(users);
    const registeredUser = users[users.length - 1];
    storeCurrentUser(registeredUser);
    setAlert(alertBox, "Account created successfully. Continuing your purchase...", "success");
    setTimeout(() => {
      try {
        const pendingPurchase = JSON.parse(sessionStorage.getItem("gstore_pending_purchase"));
        if (pendingPurchase?.returnUrl) {
          window.location.href = pendingPurchase.returnUrl;
          return;
        }
      } catch {}
      window.location.href = "customer/home.html";
    }, 900);
  });
}

function setupLogout() {
  document.querySelectorAll("[data-auth-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      logout();
    });
  });
}

function logout() {
  localStorage.removeItem(IPLAY_CURRENT_USER_KEY);
  const path = window.location.pathname;
  window.location.href = path.includes("/customer/") || path.includes("/staff/")
    ? "../index.html"
    : "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".staff-sidebar")) {
    document.body.classList.add("admin-page");
  }
  setupPasswordToggles();
  setupLogin();
  setupRegistration();
  setupLogout();
});

window.IPlayAuth = {
  logout,
  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(IPLAY_CURRENT_USER_KEY));
    } catch {
      return null;
    }
  }
};
