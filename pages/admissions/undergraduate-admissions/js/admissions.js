(function () {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const nav = $("[data-main-nav]");
  const navToggle = $("[data-nav-toggle]");
  navToggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  $$('[data-main-nav] a').forEach((link) => link.addEventListener('click', () => {
    nav?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  const backTop = $("[data-back-top]");
  const updateBackTop = () => backTop?.classList.toggle("is-visible", window.scrollY > 650);
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();
  backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  $$("[data-faq-item]").forEach((item) => {
    const button = $("[data-faq-question]", item);
    button?.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
    });
  });

  const table = $("[data-filter-table]");
  const filterForm = $("[data-filter-form]");
  if (table && filterForm) {
    const rows = $$("tbody tr", table);
    const empty = $("[data-filter-empty]");
    const applyFilters = () => {
      const province = filterForm.elements.province?.value || "";
      const year = filterForm.elements.year?.value || "";
      const keyword = (filterForm.elements.keyword?.value || "").trim().toLowerCase();
      let visible = 0;
      rows.forEach((row) => {
        const match = (!province || row.dataset.province === province)
          && (!year || row.dataset.year === year)
          && (!keyword || row.textContent.toLowerCase().includes(keyword));
        row.hidden = !match;
        if (match) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    };
    filterForm.addEventListener("input", applyFilters);
    filterForm.addEventListener("submit", (event) => { event.preventDefault(); applyFilters(); });
  }

  const queryForm = $("[data-query-form]");
  queryForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const number = queryForm.elements.number?.value.trim();
    const name = queryForm.elements.name?.value.trim();
    const result = $("[data-query-result]");
    if (!number || !name) {
      window.alert("请完整填写考生号和姓名（虚拟数据即可）");
      return;
    }
    if (result) {
      result.innerHTML = `<strong>查询已提交</strong><p>考生：${escapeHtml(name)}　考生号：${escapeHtml(number)}</p><p>哇哦！你太厉害了，竟然被录取了，真棒！<br>骗你的，你不会真的想被录取吧（）</p>`;
      result.classList.add("is-visible");
    }
  });

  const searchForm = $("[data-site-search]");
  const searchResults = $("[data-search-results]");
  const searchIndex = window.JX_ADMISSIONS_SEARCH || [];
  function runSearch(keyword) {
    if (!searchResults) return;
    const q = (keyword || "").trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = '<div class="notice-box">请输入关键词，例如“招生计划”“生物信息”“校园生活”。</div>';
      return;
    }
    const matches = searchIndex.filter((item) => `${item.title} ${item.summary} ${item.tags || ""}`.toLowerCase().includes(q));
    searchResults.innerHTML = matches.length
      ? matches.map((item) => `<a class="search-result" href="${item.href}"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p></a>`).join("")
      : '<div class="notice-box">未找到相关内容，请尝试“招生”“专业”“分数”“江江”等关键词。</div>';
  }
  if (searchForm) {
    const input = $("input", searchForm);
    const initial = new URLSearchParams(location.search).get("q") || "";
    if (input) input.value = initial;
    runSearch(initial);
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const keyword = input?.value || "";
      history.replaceState(null, "", `?q=${encodeURIComponent(keyword)}`);
      runSearch(keyword);
    });
  }

  $$('[data-external-placeholder]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.alert(link.dataset.externalPlaceholder || '真实平台地址待配置');
    });
  });

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }
})();
