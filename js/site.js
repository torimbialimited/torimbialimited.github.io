/**
 * Torimbia site behaviour: mobile navigation, header contrast over the hero,
 * and a honeypot guard on the contact form. No libraries.
 */

/**
 * Toggles the primary nav on small screens and keeps aria-expanded in sync.
 */
function initMobileNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");

  if (!header || !toggle || !nav) {
    return;
  }

  function closeNav() {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  function openNav() {
    header.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }

  toggle.addEventListener("click", function onToggleNav() {
    if (header.classList.contains("is-open")) {
      closeNav();
    } else {
      openNav();
    }
  });

  nav.addEventListener("click", function onNavClick(event) {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      closeNav();
    }
  });

  window.addEventListener(
    "keydown",
    function onEscapeNav(event) {
      if (event.key === "Escape") {
        closeNav();
      }
    },
    { passive: true }
  );
}

/**
 * Makes the sticky header solid once the hero is no longer under it.
 */
function initHeaderContrast() {
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");

  if (!header) {
    return;
  }

  if (!hero || !("IntersectionObserver" in window)) {
    header.classList.add("is-solid");
    return;
  }

  const observer = new IntersectionObserver(
    function onHeroVisibility(entries) {
      const entry = entries[0];
      header.classList.toggle("is-solid", !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
  );

  observer.observe(hero);
}

/**
 * Blocks obvious bot submissions if the hidden honeypot is filled.
 */
function initContactForm() {
  const form = document.querySelector("form.contact-form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function onContactSubmit(event) {
    const honeypot = form.querySelector("#teabreak");
    if (honeypot instanceof HTMLInputElement && honeypot.value.length !== 0) {
      event.preventDefault();
    }
  });
}

document.addEventListener("DOMContentLoaded", function onDocumentReady() {
  initMobileNav();
  initHeaderContrast();
  initContactForm();
});
