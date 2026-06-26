/* =========================================================
   TCHA AGRO — Interaktion: Sprache, Navigation, Reveal, Form
   ========================================================= */
(function () {
  "use strict";
  const I18N = window.TCHA_I18N || {};
  const SUPPORTED = ["de", "en", "fr"];
  const STORAGE_KEY = "tcha-lang";

  /* ---------- Sprache bestimmen ---------- */
  function detectLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    const nav = (navigator.language || "de").slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : "de";
  }

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.de;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const key = el.getAttribute("data-i18n-ph");
      if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (dict[key] != null) document.title = dict[key];
    });

    document.querySelectorAll(".lang button").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === lang);
    });
    localStorage.setItem(STORAGE_KEY, lang);
  }

  /* ---------- Init nach DOM ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyLang(detectLang());

    document.querySelectorAll(".lang button").forEach((b) => {
      b.addEventListener("click", () => applyLang(b.dataset.lang));
    });

    /* Sticky-Nav */
    const nav = document.querySelector(".nav");
    if (nav) {
      const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* Mobiles Menü */
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        nav.classList.toggle("menu-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          links.classList.remove("open");
          nav.classList.remove("menu-open");
        })
      );
    }

    /* Reveal beim Scrollen */
    const reveals = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window && reveals.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("in"));
    }

    /* Kontaktformular → mailto */
    const form = document.querySelector("#inquiry-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const lines = [
          "Name: " + (data.get("name") || ""),
          "E-Mail: " + (data.get("email") || ""),
          "Land/Country: " + (data.get("country") || ""),
          "Betreff: " + (data.get("subject") || ""),
          "",
          data.get("message") || "",
        ];
        // Bevorzugt WhatsApp (Togo-Nummer), sonst E-Mail-Fallback.
        const wa = form.dataset.whatsapp;
        if (wa) {
          const text = encodeURIComponent("Anfrage an TCHA AGRO\n\n" + lines.join("\n"));
          window.open(`https://wa.me/${wa}?text=${text}`, "_blank", "noopener");
          return;
        }
        const to = form.dataset.email || "[E-Mail]";
        const subject = encodeURIComponent("[TCHA AGRO] " + (data.get("subject") || "Anfrage"));
        const body = encodeURIComponent(lines.join("\n"));
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      });
    }
  });
})();
