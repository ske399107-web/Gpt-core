document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menu = document.querySelector(".mobile-menu");
  const nav = document.querySelector(".main-nav");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    }));
  }

  const password = document.getElementById("password");
  const toggle = document.querySelector(".toggle-password");
  if (password && toggle) {
    toggle.addEventListener("click", () => {
      const visible = password.type === "password";
      password.type = visible ? "text" : "password";
      toggle.setAttribute("aria-label", visible ? "Hide password" : "Show password");
    });
  }

  const form = document.getElementById("login-form");
  if (form) {
    const message = document.getElementById("form-message");
    form.addEventListener("submit", event => {
      event.preventDefault();
      const email = document.getElementById("email").value.trim();
      const pass = password.value;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        message.textContent = "Please enter a valid email address.";
        return;
      }
      if (pass.length < 8) {
        message.textContent = "Password must be at least 8 characters.";
        return;
      }
      message.textContent = "The interface is ready. Connect your authentication provider to enable sign-in.";
    });
    form.querySelectorAll("input").forEach(input => input.addEventListener("input", () => {
      message.textContent = "";
    }));
  }

  document.querySelectorAll("[data-provider]").forEach(button => {
    button.addEventListener("click", () => {
      const message = document.getElementById("form-message");
      if (message) message.textContent = button.dataset.provider + " sign-in needs an OAuth provider configuration.";
    });
  });

  const forgot = document.getElementById("forgot-link");
  if (forgot) forgot.addEventListener("click", event => {
    event.preventDefault();
    const message = document.getElementById("form-message");
    message.textContent = "Password recovery will be available after authentication is connected.";
  });
  const signup = document.getElementById("signup-link");
  if (signup) signup.addEventListener("click", event => {
    event.preventDefault();
    const message = document.getElementById("form-message");
    message.textContent = "Account creation will be enabled when your authentication backend is connected.";
  });
});