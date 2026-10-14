/* script.js
   Interactive features for the portfolio:
   1. Dark/light theme toggle (remembers the choice)
   2. Hamburger menu for mobile navigation
   3. Smooth scrolling is handled in CSS (scroll-behavior: smooth)
*/

// Grab the elements we need from the page
const root = document.documentElement;
const themeButton = document.getElementById("theme-toggle");
const menuButton = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

/* Apply a theme ("light" or "dark") to the page and update the button text.
   The theme is saved so it persists after a refresh. */
function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  themeButton.textContent = isDark ? "Light" : "Dark";
  themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // Storage can be blocked by the browser; the toggle still works without it
  }
}

/* Choose the starting theme: saved choice first, otherwise the system setting */
function getStartingTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (error) {
    // Ignore storage errors
  }
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/* Switch between light and dark when the theme button is clicked */
function toggleTheme() {
  const current = root.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
}

/* Show or hide the mobile navigation menu */
function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Close" : "Menu";
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

/* Close the mobile menu after a link is tapped, so the page is visible again */
function closeMenu() {
  if (navLinks.classList.contains("open")) {
    toggleMenu();
  }
}

// Set the starting theme when the page loads
applyTheme(getStartingTheme());

// Wire up the click events
themeButton.addEventListener("click", toggleTheme);
menuButton.addEventListener("click", toggleMenu);
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});
