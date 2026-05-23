(function () {
  "use strict";

  const STORAGE_PREFIX = "invitation_unlocked_";
  const PASS_PREFIX = "invitation_pass_";

  function pageNumberFromPath() {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = parseInt(params.get("p") || params.get("page") || "", 10);
    if (!Number.isNaN(fromQuery) && fromQuery >= 1 && fromQuery <= 3) {
      return fromQuery;
    }
    const match = window.location.pathname.match(/unlock\.html$/);
    return match ? 1 : null;
  }

  function storageKey(page) {
    return `${STORAGE_PREFIX}${page}`;
  }

  function isUnlocked(page) {
    return sessionStorage.getItem(storageKey(page)) === "true";
  }

  function previousChaptersComplete(page) {
    for (let i = 1; i < page; i++) {
      if (!isUnlocked(i)) return false;
    }
    return true;
  }

  function unlock(page) {
    sessionStorage.setItem(storageKey(page), "true");
  }

  function passKey(page) {
    return `${PASS_PREFIX}${page}`;
  }

  /** Set after a correct password on the gate (allows opening the chapter page). */
  function grantPass(page) {
    sessionStorage.setItem(passKey(page), "true");
    unlock(page);
  }

  function hasPass(page) {
    return sessionStorage.getItem(passKey(page)) === "true";
  }

  function requireUnlock(page, redirectTo = "../unlock.html") {
    if (!previousChaptersComplete(page)) {
      const sep = redirectTo.includes("?") ? "&" : "?";
      window.location.replace(`${redirectTo}${sep}p=${page > 1 ? page - 1 : 1}`);
      return false;
    }
    if (!hasPass(page)) {
      const sep = redirectTo.includes("?") ? "&" : "?";
      window.location.replace(`${redirectTo}${sep}p=${page}`);
      return false;
    }
    return true;
  }

  function checkPassword(page, value) {
    const expected = SITE_CONFIG.passwords[page];
    return typeof expected === "string" && value.trim() === expected;
  }

  function initUnlockForm() {
    const page = pageNumberFromPath();
    if (!page) return;

    if (!previousChaptersComplete(page)) {
      const prev = page - 1;
      window.location.replace(unlockUrl(prev));
      return;
    }

    /* Always show the password form when opening the gate (no auto-skip). */

    const titleEl = document.getElementById("gate-title");
    const hintEl = document.getElementById("gate-hint");
    const form = document.getElementById("gate-form");
    const input = document.getElementById("gate-password");
    const errorEl = document.getElementById("gate-error");

    if (titleEl) {
      titleEl.textContent = SITE_CONFIG.pageTitles[page] || `Chapter ${page}`;
    }
    if (hintEl && page > 1) {
      hintEl.textContent = "You found your way here — enter the secret word for this chapter.";
    }

    if (input) {
      input.value = "";
    }
    if (errorEl) {
      errorEl.hidden = true;
    }

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = input?.value || "";
      if (checkPassword(page, value)) {
        grantPass(page);
        window.location.href = pageUrl(page);
      } else if (errorEl) {
        errorEl.hidden = false;
        errorEl.textContent = "That is not quite right. Try again, love.";
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 500);
      }
    });
  }

  function pageUrl(page) {
    const map = {
      1: "pages/morning.html",
      2: "pages/chapter-2.html",
      3: "pages/chapter-3.html",
    };
    const path = map[page] || "index.html";
    const inPages = window.location.pathname.includes("/pages/");
    return inPages ? path.replace("pages/", "") : path;
  }

  function unlockUrl(page) {
    const inPages = window.location.pathname.includes("/pages/");
    return inPages ? `../unlock.html?p=${page}` : `unlock.html?p=${page}`;
  }

  window.InvitationAuth = {
    pageNumberFromPath,
    isUnlocked,
    hasPass,
    grantPass,
    requireUnlock,
    checkPassword,
    initUnlockForm,
    pageUrl,
    unlockUrl,
  };
})();
