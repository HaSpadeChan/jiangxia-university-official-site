/* ========================================================================
   江夏大学虚构官网 · 交互脚本
   ------------------------------------------------------------------------
   本文件使用原生 JavaScript，不依赖 jQuery、Vue 或其他第三方库。
   因此直接双击 index.html 即可运行，也方便初学者理解和修改。

   功能目录：
   1. 页面元素辅助函数
   2. 吸顶导航与返回顶部
   3. 移动端抽屉菜单
   4. 首屏自动轮播
   5. 搜索弹窗
   6. 滚动淡入动画
   7. 数字校园计数动画
   8. 风云人物切换
   9. 融媒视频演示弹窗
   10. 表单演示拦截
   ======================================================================== */

"use strict";

/* 1. 页面元素辅助函数 ------------------------------------------------------ */
// 使用 $ 和 $$ 简化 querySelector / querySelectorAll 的书写。
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// 判断用户是否开启“减少动态效果”。开启后不自动播放轮播。
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* 2. 吸顶导航与返回顶部 ---------------------------------------------------- */
const header = $("[data-header]");
const backToTopButton = $("[data-back-to-top]");

function updateScrollUI() {
  const scrollTop = window.scrollY;

  // 滚动超过 70px 后给导航添加白色背景和阴影。
  header?.classList.toggle("is-scrolled", scrollTop > 70);

  // 滚动超过 600px 后显示返回顶部按钮。
  backToTopButton?.classList.toggle("is-visible", scrollTop > 600);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

backToTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
});

/* 3. 移动端抽屉菜单 -------------------------------------------------------- */
const mobileMenu = $("[data-mobile-menu]");
const menuToggle = $("[data-menu-toggle]");
const menuClose = $("[data-menu-close]");
const pageOverlay = $("[data-page-overlay]");

function openMobileMenu() {
  mobileMenu?.classList.add("is-open");
  pageOverlay?.classList.add("is-visible");
  document.body.classList.add("is-locked");
  mobileMenu?.setAttribute("aria-hidden", "false");
  menuToggle?.setAttribute("aria-expanded", "true");
}

function closeMobileMenu() {
  mobileMenu?.classList.remove("is-open");
  pageOverlay?.classList.remove("is-visible");
  document.body.classList.remove("is-locked");
  mobileMenu?.setAttribute("aria-hidden", "true");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", openMobileMenu);
menuClose?.addEventListener("click", closeMobileMenu);
pageOverlay?.addEventListener("click", closeMobileMenu);

// 点击移动菜单中的锚点后自动关闭菜单。
$$("a", mobileMenu).forEach((link) => link.addEventListener("click", closeMobileMenu));

/* 4. 首屏自动轮播 ---------------------------------------------------------- */
const slider = $("[data-slider]");

if (slider) {
  const slides = $$("[data-slide]", slider);
  const dots = $$("[data-slide-to]", slider);
  const prevButton = $("[data-slider-prev]", slider);
  const nextButton = $("[data-slider-next]", slider);

  let currentIndex = 0;
  let autoPlayTimer = null;

  /**
   * 切换到指定轮播页。
   * @param {number} index 目标页序号，从 0 开始。
   */
  function showSlide(index) {
    // 通过取模让索引循环，例如 -1 会变成最后一张。
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentIndex);
      dot.setAttribute("aria-selected", String(dotIndex === currentIndex));
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function previousSlide() {
    showSlide(currentIndex - 1);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      window.clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function startAutoPlay() {
    stopAutoPlay();

    // 修改 6500 可以改变自动轮播间隔，单位为毫秒。
    if (!prefersReducedMotion && slides.length > 1) {
      autoPlayTimer = window.setInterval(nextSlide, 6500);
    }
  }

  prevButton?.addEventListener("click", () => {
    previousSlide();
    startAutoPlay();
  });

  nextButton?.addEventListener("click", () => {
    nextSlide();
    startAutoPlay();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slideTo));
      startAutoPlay();
    });
  });

  // 鼠标悬停时暂停，移开后恢复，便于用户阅读长标题。
  slider.addEventListener("mouseenter", stopAutoPlay);
  slider.addEventListener("mouseleave", startAutoPlay);

  // 浏览器标签页隐藏时停止计时，返回时恢复，避免跳过多张。
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stopAutoPlay() : startAutoPlay();
  });

  // 移动端左右滑动切换轮播。
  let touchStartX = 0;
  slider.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    (event) => {
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 55) {
        distance > 0 ? previousSlide() : nextSlide();
        startAutoPlay();
      }
    },
    { passive: true }
  );

  showSlide(0);
  startAutoPlay();
}

/* 5. 搜索弹窗 -------------------------------------------------------------- */
const searchModal = $("[data-search-modal]");
const searchInput = $("#site-search");

function openSearchModal() {
  searchModal?.classList.add("is-open");
  searchModal?.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");

  // 等待动画开始后再聚焦输入框，移动端体验更稳定。
  window.setTimeout(() => searchInput?.focus(), 120);
}

function closeSearchModal() {
  searchModal?.classList.remove("is-open");
  searchModal?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
}

$("[data-search-open]")?.addEventListener("click", openSearchModal);
$("[data-search-close]")?.addEventListener("click", closeSearchModal);

// 点击弹窗外层空白区域也可关闭。
searchModal?.addEventListener("click", (event) => {
  if (event.target === searchModal) closeSearchModal();
});

/* 6. 滚动淡入动画 ---------------------------------------------------------- */
const revealElements = $$('[data-reveal]');

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  // 老浏览器或减少动画模式下，直接显示全部内容。
  revealElements.forEach((element) => element.classList.add("is-revealed"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

/* 7. 数字校园计数动画 ------------------------------------------------------ */
const counterGroup = $("[data-counter-group]");

/**
 * 把数字格式化为带千位分隔符的文本，例如 42000 -> 42,000。
 */
function formatNumber(value) {
  return new Intl.NumberFormat("zh-CN").format(value);
}

/**
 * 对单个数字执行递增动画。
 * @param {HTMLElement} element 具有 data-count 的 span 元素。
 */
function animateCounter(element) {
  const target = Number(element.dataset.count || 0);
  const duration = 1500;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);

    // easeOutCubic：前快后慢，比匀速更自然。
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(target * easedProgress);

    element.textContent = formatNumber(currentValue);

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

if (counterGroup) {
  const counterElements = $$("[data-count]", counterGroup);
  let hasCounted = false;

  const startCounters = () => {
    if (hasCounted) return;
    hasCounted = true;
    counterElements.forEach(animateCounter);
  };

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    counterElements.forEach((element) => {
      element.textContent = formatNumber(Number(element.dataset.count || 0));
    });
  } else {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    counterObserver.observe(counterGroup);
  }
}

/* 8. 风云人物切换 ---------------------------------------------------------- */
const peopleSwitcher = $("[data-people-switcher]");

if (peopleSwitcher) {
  const personTabs = $$("[data-person-tab]", peopleSwitcher);
  const personPanels = $$("[data-person-panel]", peopleSwitcher);

  function showPerson(personId) {
    personTabs.forEach((tab) => {
      const isActive = tab.dataset.person === personId;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    personPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.person === personId);
    });
  }

  personTabs.forEach((tab) => {
    tab.addEventListener("click", () => showPerson(tab.dataset.person));
  });
}

/* 9. 融媒视频演示弹窗 ------------------------------------------------------ */
const videoModal = $("[data-video-modal]");
const campusVideo = $("[data-campus-video]");

function openVideoModal() {
  videoModal?.classList.add("is-open");
  videoModal?.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
}

function closeVideoModal() {
  videoModal?.classList.remove("is-open");
  videoModal?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");

  if (campusVideo) {
    campusVideo.pause();
    campusVideo.currentTime = 0;
  }
}

$$("[data-video-card]").forEach((videoButton) => {
  videoButton.addEventListener("click", openVideoModal);
});
$("[data-video-close]")?.addEventListener("click", closeVideoModal);

videoModal?.addEventListener("click", (event) => {
  if (event.target === videoModal) closeVideoModal();
});

/* 10. 键盘关闭弹窗与表单演示 --------------------------------------------- */
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  closeMobileMenu();
  closeSearchModal();
  closeVideoModal();
});

// 由于这是静态演示，暂时阻止搜索表单跳转，并给出提示。
$("[data-search-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = searchInput?.value.trim();

  if (!keyword) {
    searchInput?.focus();
    return;
  }

  window.alert(`当前为静态演示页面，尚未接入搜索接口。\n你输入的关键词是：${keyword}`);
});

// 微信、微博、视频号和抖音等真实外部平台由后续配置。
$$('[data-placeholder]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.alert(link.dataset.placeholder || '该外部平台地址暂未配置');
  });
});
