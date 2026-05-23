(function () {
  "use strict";

  function initEnvelope() {
    const heartBtn = document.getElementById("heart-btn");
    const overlay = document.getElementById("letter-overlay");
    const letterBody = document.getElementById("letter-body");
    const closeBtn = document.getElementById("letter-close");

    if (!heartBtn || !overlay || !letterBody) return;

    const letterKey = document.body.dataset.letter || "letterPage1";
    const text = SITE_CONFIG[letterKey];
    if (typeof text === "string") {
      letterBody.textContent = text;
    }

    function openLetter() {
      heartBtn.setAttribute("aria-expanded", "true");
      overlay.classList.add("is-visible");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeLetter() {
      heartBtn.setAttribute("aria-expanded", "false");
      overlay.classList.remove("is-visible");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    heartBtn.addEventListener("click", openLetter);
    closeBtn?.addEventListener("click", closeLetter);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeLetter();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-visible")) {
        closeLetter();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initEnvelope);
})();
