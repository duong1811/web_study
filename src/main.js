import "./styles.css";

const themePresets = {
  forest: { label: "Forest", forest: "23 76 59", lime: "217 242 126" },
  ocean: { label: "Ocean", forest: "30 77 130", lime: "132 216 236" },
  violet: { label: "Violet", forest: "92 61 145", lime: "222 190 255" },
  sunset: { label: "Sunset", forest: "157 75 46", lime: "255 192 125" },
  rose: { label: "Rose", forest: "151 55 84", lime: "255 183 199" },
  midnight: { label: "Midnight", forest: "49 57 81", lime: "193 210 255" },
};

const themeStorageKey = "northstar-color-theme";
const savedTheme = localStorage.getItem(themeStorageKey);
let activeTheme = Object.hasOwn(themePresets, savedTheme) ? savedTheme : "forest";

function applyTheme(themeName) {
  const theme = themePresets[themeName];
  if (!theme) return;
  activeTheme = themeName;
  document.documentElement.style.setProperty("--forest-rgb", theme.forest);
  document.documentElement.style.setProperty("--lime-rgb", theme.lime);
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    const isActive = button.dataset.themeChoice === themeName;
    button.setAttribute("aria-pressed", String(isActive));
  });
  const selectionMessage = document.querySelector("#theme-selection-message");
  if (selectionMessage) selectionMessage.textContent = `${theme.label} theme selected`;
  localStorage.setItem(themeStorageKey, themeName);
}

const themePicker = document.createElement("aside");
themePicker.className = "fixed bottom-5 right-5 z-50";
themePicker.setAttribute("aria-label", "Appearance settings");
themePicker.innerHTML = `
  <div id="theme-panel" class="theme-panel invisible absolute bottom-[4.5rem] right-0 w-[min(19rem,calc(100vw-2.5rem))] rounded-2xl border border-ink/10 bg-white p-4 opacity-0 shadow-soft" aria-hidden="true">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="font-display text-sm font-bold text-ink">Make it yours</p>
        <p class="mt-1 text-xs text-muted">Pick a color mood for this template.</p>
      </div>
      <span class="grid h-8 w-8 place-items-center rounded-full bg-paper text-forest" aria-hidden="true">✳</span>
    </div>
    <div class="mt-4 grid grid-cols-3 gap-2">
      ${Object.entries(themePresets).map(([name, theme]) => `
        <button class="theme-swatch flex min-h-[4.25rem] flex-col items-center justify-center gap-1.5 rounded-xl border border-ink/5 bg-paper px-2 py-2 transition hover:-translate-y-0.5 hover:border-forest/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest" type="button" data-theme-choice="${name}" aria-pressed="false" aria-label="${theme.label} color theme">
          <span class="flex -space-x-1.5" aria-hidden="true"><span class="h-5 w-5 rounded-full border-2 border-white" style="background: rgb(${theme.forest})"></span><span class="h-5 w-5 rounded-full border-2 border-white" style="background: rgb(${theme.lime})"></span></span>
          <span class="text-[10px] font-semibold text-ink">${theme.label}</span>
        </button>
      `).join("")}
    </div>
    <p id="theme-selection-message" class="sr-only" aria-live="polite"></p>
  </div>
  <button id="theme-toggle" class="group grid h-12 w-12 place-items-center rounded-full bg-forest text-white shadow-lg shadow-forest/25 transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forest/25" type="button" aria-label="Choose color theme" aria-expanded="false" aria-controls="theme-panel" title="Choose color theme">
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18h1.1a1.9 1.9 0 0 0 1.34-3.24 1.9 1.9 0 0 1 1.35-3.24H18a3 3 0 0 0 3-3c0-4.7-4.03-8.52-9-8.52Z"/><circle cx="7.5" cy="11" r="1" fill="currentColor"/><circle cx="10" cy="7.5" r="1" fill="currentColor"/><circle cx="14" cy="7.5" r="1" fill="currentColor"/></svg>
  </button>`;
document.body.append(themePicker);
applyTheme(activeTheme);

const themeToggle = document.querySelector("#theme-toggle");
const themePanel = document.querySelector("#theme-panel");

function setThemePanelOpen(isOpen) {
  themeToggle.setAttribute("aria-expanded", String(isOpen));
  themePanel.setAttribute("aria-hidden", String(!isOpen));
  themePanel.classList.toggle("invisible", !isOpen);
  themePanel.classList.toggle("opacity-0", !isOpen);
  themePanel.classList.toggle("is-open", isOpen);
}

themeToggle.addEventListener("click", () => {
  setThemePanelOpen(themeToggle.getAttribute("aria-expanded") !== "true");
});

themePanel.addEventListener("click", (event) => {
  const choice = event.target.closest("[data-theme-choice]");
  if (!choice) return;
  applyTheme(choice.dataset.themeChoice);
});

document.addEventListener("click", (event) => {
  if (!themePicker.contains(event.target)) setThemePanelOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && themeToggle.getAttribute("aria-expanded") === "true") {
    setThemePanelOpen(false);
    themeToggle.focus();
  }
});

const scrollProgress = document.createElement("div");
scrollProgress.id = "scroll-progress";
scrollProgress.className = "fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-lime shadow-[0_0_12px_rgba(23,76,59,.22)]";
scrollProgress.setAttribute("aria-hidden", "true");
document.body.append(scrollProgress);

let scrollFrame = 0;
window.addEventListener("scroll", () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    document.documentElement.style.setProperty("--scroll-progress", String(Math.min(progress, 1)));
    scrollFrame = 0;
  });
}, { passive: true });

const menuToggle = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

if (menuToggle && mobileMenu) {
  const setMenuOpen = (isOpen) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    mobileMenu.classList.toggle("is-open", isOpen);
  };

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isExpanded);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
}

const pathname = window.location.pathname === "/" ? "/index.html" : window.location.pathname;
const routeAliases = {
  "/course-detail.html": "/courses.html",
  "/home-creative.html": "/home-templates.html",
  "/home-campus.html": "/home-templates.html",
  "/home-minimal.html": "/home-templates.html",
};
const currentPath = routeAliases[pathname] ?? pathname;
document.querySelectorAll("[data-site-nav-link]").forEach((link) => {
  if (link.getAttribute("href") === currentPath) link.setAttribute("aria-current", "page");
});

const revealItems = document.querySelectorAll(".reveal:not(.is-visible)");
const revealGroups = new Map();
revealItems.forEach((element) => {
  const siblings = revealGroups.get(element.parentElement) ?? [];
  siblings.push(element);
  revealGroups.set(element.parentElement, siblings);
});
revealGroups.forEach((siblings) => {
  siblings.forEach((element, index) => element.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 60}ms`));
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((element) => revealObserver.observe(element));
} else {
  revealItems.forEach((element) => element.classList.add("is-visible"));
}

document.querySelectorAll("[data-category]").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  });
});

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const demoHero = document.querySelector("body[data-site-style] main > section:first-child .reveal.relative.mx-auto");
  const heroVisual = demoHero?.querySelector(":scope > div:nth-child(2)");
  const tiltElements = [
    ...(heroVisual ? [heroVisual] : []),
    ...document.querySelectorAll("body[data-site-style] main article, body[data-site-style] main a.group"),
  ];

  tiltElements.forEach((element) => {
    element.classList.add("demo-tilt");
    element.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      element.style.setProperty("--tilt-x", `${(y * -5).toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);
    });
    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
    });
  });
}

const courseFilters = document.querySelectorAll("[data-filter]");
const courseCards = document.querySelectorAll("[data-category]");
const courseSearch = document.querySelector("#course-search");
const courseCount = document.querySelector("#course-count");
const emptyCourses = document.querySelector("#empty-courses");
let selectedCategory = "all";

courseFilters.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.filter;
    courseFilters.forEach((filter) => {
      const selected = filter === button;
      filter.setAttribute("aria-pressed", String(selected));
      filter.classList.toggle("bg-forest", selected);
      filter.classList.toggle("text-white", selected);
      filter.classList.toggle("border", !selected);
      filter.classList.toggle("border-ink/10", !selected);
    });
    updateCourseList();
  });
});

function updateCourseList() {
  const searchTerm = courseSearch?.value.trim().toLowerCase() ?? "";
  let visibleCount = 0;
  courseCards.forEach((card) => {
    const matchesCategory = selectedCategory === "all" || card.dataset.category === selectedCategory;
    const matchesSearch = !searchTerm || card.dataset.courseTitle?.toLowerCase().includes(searchTerm);
    card.hidden = !matchesCategory || !matchesSearch;
    if (!card.hidden) visibleCount += 1;
  });
  if (courseCount) courseCount.textContent = String(visibleCount);
  emptyCourses?.classList.toggle("hidden", visibleCount > 0);
}

courseSearch?.addEventListener("input", updateCourseList);

document.querySelectorAll(".course-save").forEach((button) => {
  button.addEventListener("click", () => {
    const isSaved = button.getAttribute("aria-pressed") === "true";
    const courseName = button.dataset.courseName ?? button.getAttribute("aria-label").replace(/^(Save|Remove) /, "");
    button.setAttribute("aria-pressed", String(!isSaved));
    button.textContent = isSaved ? "♡" : "♥";
    button.classList.toggle("text-forest", !isSaved);
    button.setAttribute("aria-label", `${isSaved ? "Save" : "Remove"} ${courseName}`);
  });
});

const pricingToggle = document.querySelector("#pricing-toggle");
if (pricingToggle) {
  pricingToggle.addEventListener("change", () => {
    const annual = pricingToggle.checked;
    document.querySelectorAll("[data-monthly-price]").forEach((price) => {
      price.textContent = annual ? price.dataset.annualPrice : price.dataset.monthlyPrice;
    });
    document.querySelectorAll("[data-billing-label]").forEach((label) => {
      label.textContent = annual ? "billed annually" : "billed monthly";
    });
  });
}

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const message = form.querySelector("[data-form-message]");
    if (message) message.textContent = form.dataset.successMessage || "Thanks! Your message has been received.";
    form.reset();
  });
});

const newsletterForm = document.querySelector("#newsletter-form");
newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = newsletterForm.querySelector("#email");
  if (!email.reportValidity()) return;
  document.querySelector("#form-message").textContent =
    "Thanks for joining us! Look out for a note from Northstar.";
  newsletterForm.reset();
});
