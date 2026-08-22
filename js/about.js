(function () {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menu = document.querySelector("[data-mobile-menu]");
  const overlay = document.querySelector("[data-overlay]");
  const openButton = document.querySelector("[data-menu-toggle]");
  const closeButton = document.querySelector("[data-menu-close]");
  const backTop = document.querySelector("[data-back-top]");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function setMenu(open) {
    menu?.classList.toggle("is-open", open);
    overlay?.classList.toggle("is-visible", open);
    document.body.classList.toggle("menu-open", open);
    menu?.setAttribute("aria-hidden", String(!open));
    openButton?.setAttribute("aria-expanded", String(open));
  }

  openButton?.addEventListener("click", () => setMenu(true));
  closeButton?.addEventListener("click", () => setMenu(false));
  overlay?.addEventListener("click", () => setMenu(false));
  menu
    ?.querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => setMenu(false)));

  function updateScrollState() {
    header?.classList.toggle("is-sticky", window.scrollY > 36);
    backTop?.classList.toggle("is-visible", window.scrollY > 650);
  }

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();
  backTop?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }),
  );

  const revealItems = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -45px" },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const counters = document.querySelectorAll("[data-count]");
  function animateCounter(element) {
    if (element.dataset.counted === "true") return;
    element.dataset.counted = "true";
    const target = Number(element.dataset.count || 0);
    const suffix = element.dataset.suffix || "";

    if (reduceMotion) {
      element.textContent = target.toLocaleString("zh-CN") + suffix;
      return;
    }

    const duration = 1500;
    const startedAt = performance.now();
    function frame(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent =
        Math.round(target * eased).toLocaleString("zh-CN") + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach((counter) => countObserver.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }

  const sections = document.querySelectorAll("[data-section]");
  const sectionLinks = document.querySelectorAll("[data-section-nav] a");
  function selectSection(id) {
    sectionLinks.forEach((link) =>
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${id}`,
      ),
    );
  }

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) selectSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -52%", threshold: [0, 0.15, 0.45] },
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }
})();
