(function () {
  "use strict";

  function normalize(value) {
    return value.trim().toLowerCase();
  }

  function initGuessGame() {
    const panel = document.getElementById("guess-panel");
    const reveal = document.getElementById("surprise-reveal");
    const form = document.getElementById("guess-form");
    const input = document.getElementById("guess-input");
    const feedback = document.getElementById("guess-feedback");
    const hintBtn = document.getElementById("guess-hint-btn");
    const riddleEl = document.getElementById("guess-riddle");

    const cfg = SITE_CONFIG.guessChapter3;
    if (!panel || !reveal || !form || !cfg) return;

    if (riddleEl) {
      riddleEl.textContent = cfg.riddle;
    }

    let hintIndex = 0;

    const storageKey = "invitation_chapter3_guessed";
    if (sessionStorage.getItem(storageKey) === "true") {
      showSurprise();
      return;
    }

    function showFeedback(message, isSuccess) {
      if (!feedback) return;
      feedback.hidden = false;
      feedback.textContent = message;
      feedback.classList.toggle("guess-panel__feedback--success", isSuccess);
      feedback.classList.toggle("guess-panel__feedback--error", !isSuccess);
    }

    function showSurprise() {
      sessionStorage.setItem(storageKey, "true");
      panel.hidden = true;
      reveal.hidden = false;
      reveal.classList.add("surprise-reveal--visible");
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = normalize(input?.value || "");
      const expected = normalize(cfg.answer || "");

      if (!value) {
        showFeedback("Type your guess first.", false);
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 500);
        return;
      }

      if (value === expected) {
        showFeedback(cfg.successMessage, true);
        setTimeout(showSurprise, 700);
      } else {
        showFeedback(cfg.wrongMessage, false);
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 500);
        if (input) input.select();
      }
    });

    hintBtn?.addEventListener("click", () => {
      const hints = cfg.hints || [];
      if (!hints.length || !feedback) return;
      feedback.hidden = false;
      feedback.classList.remove("guess-panel__feedback--success");
      feedback.classList.add("guess-panel__feedback--error");
      feedback.textContent = hints[Math.min(hintIndex, hints.length - 1)];
      hintIndex += 1;
    });
  }

  document.addEventListener("DOMContentLoaded", initGuessGame);
})();
