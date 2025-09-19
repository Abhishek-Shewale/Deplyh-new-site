// Mobile Menu Toggle (slide-out drawer)
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuBackdrop = document.getElementById("mobile-menu-backdrop");
const mobileMenuPanel = document.getElementById("mobile-menu-panel");

function openMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove("hidden");
  requestAnimationFrame(() => {
    if (mobileMenuBackdrop) mobileMenuBackdrop.style.opacity = "1";
    if (mobileMenuPanel) mobileMenuPanel.style.transform = "translateX(0)";
  });
  document.body.style.overflow = "hidden";
  if (mobileMenuButton) mobileMenuButton.setAttribute("aria-expanded", "true");
}

function closeMobileMenu() {
  if (!mobileMenu) return;
  if (mobileMenuBackdrop) mobileMenuBackdrop.style.opacity = "0";
  if (mobileMenuPanel) mobileMenuPanel.style.transform = "translateX(-100%)";
  // hide after animation
  setTimeout(() => {
    mobileMenu.classList.add("hidden");
  }, 300);
  document.body.style.overflow = "";
  if (mobileMenuButton) mobileMenuButton.setAttribute("aria-expanded", "false");
}

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const isExpanded = mobileMenuButton.getAttribute("aria-expanded") === "true";
    if (isExpanded) closeMobileMenu();
    else openMobileMenu();
  });
}

// Close on backdrop click
if (mobileMenuBackdrop) {
  mobileMenuBackdrop.addEventListener("click", () => closeMobileMenu());
}

// Prevent clicks inside the panel from closing the menu
if (mobileMenuPanel) {
  mobileMenuPanel.addEventListener("click", (e) => e.stopPropagation());
}

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMobileMenu();
  }
});

// Next-Gen AI Dropdown functionality
const nextGenAiBtn = document.getElementById("next-gen-ai-btn");
const nextGenAiDropdown = document.getElementById("next-gen-ai-dropdown");

if (nextGenAiBtn && nextGenAiDropdown) {
  let isDropdownOpen = false;
  let hoverTimeout;

  // Function to show dropdown
  function showDropdown() {
    clearTimeout(hoverTimeout);
    isDropdownOpen = true;
    nextGenAiDropdown.classList.remove("opacity-0", "invisible");
    nextGenAiDropdown.classList.add("opacity-100", "visible");
    nextGenAiBtn.setAttribute("aria-expanded", "true");
  }

  // Function to hide dropdown
  function hideDropdown() {
    isDropdownOpen = false;
    nextGenAiDropdown.classList.remove("opacity-100", "visible");
    nextGenAiDropdown.classList.add("opacity-0", "invisible");
    nextGenAiBtn.setAttribute("aria-expanded", "false");
  }

  // Function to hide dropdown with delay
  function hideDropdownWithDelay() {
    hoverTimeout = setTimeout(() => {
      if (!isDropdownOpen) {
        hideDropdown();
      }
    }, 150);
  }

  // Click event for button
  nextGenAiBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDropdownOpen) {
      hideDropdown();
    } else {
      showDropdown();
    }
  });

  // Hover events for button
  nextGenAiBtn.addEventListener("mouseenter", showDropdown);
  nextGenAiBtn.addEventListener("mouseleave", hideDropdownWithDelay);

  // Hover events for dropdown
  nextGenAiDropdown.addEventListener("mouseenter", () => {
    clearTimeout(hoverTimeout);
    isDropdownOpen = true;
  });
  nextGenAiDropdown.addEventListener("mouseleave", hideDropdownWithDelay);

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!nextGenAiBtn.contains(e.target) && !nextGenAiDropdown.contains(e.target)) {
      hideDropdown();
    }
  });

  // Keyboard accessibility
  nextGenAiBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isDropdownOpen) {
        hideDropdown();
      } else {
        showDropdown();
      }
    } else if (e.key === "Escape") {
      hideDropdown();
    }
  });
}

// Mobile Next-Gen AI Dropdown functionality
const mobileNextGenAiBtn = document.getElementById("mobile-next-gen-ai-btn");
const mobileNextGenAiDropdown = document.getElementById("mobile-next-gen-ai-dropdown");

if (mobileNextGenAiBtn && mobileNextGenAiDropdown) {
  mobileNextGenAiBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isExpanded = mobileNextGenAiBtn.getAttribute("aria-expanded") === "true";
    const arrow = mobileNextGenAiBtn.querySelector("svg");
    
    mobileNextGenAiBtn.setAttribute("aria-expanded", !isExpanded);
    mobileNextGenAiDropdown.classList.toggle("hidden");
    
    // Rotate arrow
    if (!isExpanded) {
      arrow.style.transform = "rotate(180deg)";
    } else {
      arrow.style.transform = "rotate(0deg)";
    }
  });
}

// Close mobile menu when clicking outside
window.addEventListener("click", (e) => {
  if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.add("hidden");
    mobileMenuButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
});

// Carousel logic - supports prev/next, dots, keyboard, and autoplay
(function () {
  const track = document.getElementById("carousel-track");
  if (!track) return; // Exit if no carousel on page

  const slides = Array.from(track.children);
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dotsContainer = document.getElementById("carousel-dots");
  const dots = dotsContainer
    ? Array.from(dotsContainer.querySelectorAll("button"))
    : [];
  let index = 0;
  const total = slides.length;
  let autoPlayInterval = null;
  const AUTOPLAY_MS = 3000; // 3 seconds

  // Set track width so slides display horizontally
  function updateTrack() {
    const viewportWidth = document.getElementById("carousel").clientWidth;
    slides.forEach((slide) => {
      slide.style.width = viewportWidth + "px";
    });
    moveTo(index, false);
  }

  // move to index
  function moveTo(i, animate = true) {
    index = (i + total) % total;
    if (!animate) track.style.transition = "none";
    else track.style.transition = "";
    const offset = -index * document.getElementById("carousel").clientWidth;
    track.style.transform = `translateX(${offset}px)`;

    // update dots
    dots.forEach((d, idx) => {
      d.classList.toggle("bg-gray-900", idx === index);
      d.classList.toggle("bg-gray-300", idx !== index);
    });
  }

  // next / prev
  function next() {
    moveTo(index + 1);
  }
  function prev() {
    moveTo(index - 1);
  }

  // events
  nextBtn.addEventListener("click", () => {
    next();
    resetAutoplay();
  });
  prevBtn.addEventListener("click", () => {
    prev();
    resetAutoplay();
  });

  dots.forEach((d) => {
    d.addEventListener("click", (e) => {
      const i = Number(e.currentTarget.dataset.index);
      moveTo(i);
      resetAutoplay();
    });
  });

  // keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prev();
      resetAutoplay();
    }
    if (e.key === "ArrowRight") {
      next();
      resetAutoplay();
    }
  });

  // autoplay
  function startAutoplay() {
    stopAutoplay();
    autoPlayInterval = setInterval(() => {
      next();
    }, AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Initialize carousel
  updateTrack();
  startAutoplay();

  // Handle window resize
  window.addEventListener("resize", () => {
    updateTrack();
  });

  // Pause autoplay on hover
  document
    .getElementById("carousel")
    .addEventListener("mouseenter", stopAutoplay);
  document
    .getElementById("carousel")
    .addEventListener("mouseleave", startAutoplay);
  document.getElementById("carousel").addEventListener("focusin", stopAutoplay);
  document
    .getElementById("carousel")
    .addEventListener("focusout", startAutoplay);

  // Ensure autoplay continues after tab switch
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      startAutoplay();
    } else {
      stopAutoplay();
    }
  });
})();

// Logo Carousel - Sliding animation for 7 logos showing 5 at a time
(function () {
  const logoContainer = document.getElementById("logo-track");
  if (!logoContainer) return;

  const logos = Array.from(logoContainer.children);
  const totalLogos = logos.length;
  const visibleLogos = 5; // number of logos to show at once
  let currentIndex = 0;
  let slideInterval;

  function slideLogos() {
    const logoWidth = logos[0].offsetWidth; // one logo width (20%)
    const offset = -(currentIndex * logoWidth);
    logoContainer.style.transform = `translateX(${offset}px)`;

    currentIndex++;
    if (currentIndex > totalLogos - visibleLogos) {
      currentIndex = 0;
    }
  }

  // Start sliding
  setTimeout(() => {
    slideInterval = setInterval(slideLogos, 3000);
  }, 1000);

  // Pause on hover
  logoContainer.addEventListener("mouseenter", () =>
    clearInterval(slideInterval)
  );
  logoContainer.addEventListener("mouseleave", () => {
    slideInterval = setInterval(slideLogos, 3000);
  });
})();
