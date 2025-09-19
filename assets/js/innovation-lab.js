// Page-specific JS for Innovation Lab
(function () {
  "use strict";

  // Smooth scroll for demo/contact anchors
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href").substring(1);
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // Close mobile menu after clicking a link
  function initCloseMobileMenuOnNav() {
    const mobileMenu = document.getElementById("mobile-menu");
    const mobilePanel = document.getElementById("mobile-menu-panel");
    if (!mobileMenu || !mobilePanel) return;

    mobilePanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        document.body.style.overflow = "";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initSmoothAnchors();
    initCloseMobileMenuOnNav();
  });
})();
