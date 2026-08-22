document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('[data-grid]');

  if (grid) {
    const cards = Array.from(grid.querySelectorAll('[data-card]'));
    const queryInput = document.querySelector('[data-query]');
    const typeSelect = document.querySelector('[data-type]');
    const regionSelect = document.querySelector('[data-region]');
    const count = document.querySelector('[data-count]');
    const empty = document.querySelector('[data-empty]');

    const applyFilters = () => {
      const keyword = (queryInput?.value || '').trim().toLocaleLowerCase('zh-CN');
      const selectedType = typeSelect?.value || 'all';
      const selectedRegion = regionSelect?.value || 'all';
      let visibleCount = 0;

      cards.forEach((card) => {
        const searchableText = (card.dataset.search || '').toLocaleLowerCase('zh-CN');
        const matchesKeyword = !keyword || searchableText.includes(keyword);
        const matchesType = selectedType === 'all' || card.dataset.type === selectedType;
        const matchesRegion = selectedRegion === 'all' || card.dataset.region === selectedRegion;
        const shouldShow = matchesKeyword && matchesType && matchesRegion;

        /* 同时使用 hidden、style 和 aria-hidden，防止 display:flex 覆盖 hidden。 */
        card.hidden = !shouldShow;
        card.style.display = shouldShow ? '' : 'none';
        card.setAttribute('aria-hidden', String(!shouldShow));

        if (shouldShow) visibleCount += 1;
      });

      if (count) count.textContent = `当前显示 ${visibleCount} / 67 个伙伴`;
      if (empty) empty.style.display = visibleCount > 0 ? 'none' : 'block';
    };

    queryInput?.addEventListener('input', applyFilters);
    queryInput?.addEventListener('search', applyFilters);
    typeSelect?.addEventListener('change', applyFilters);
    regionSelect?.addEventListener('change', applyFilters);
    applyFilters();
  }

  const modal = document.querySelector('[data-modal]');
  const closeModal = () => modal?.classList.remove('open');

  document.querySelectorAll('[data-action]').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();

      if (document.body.dataset.psychoforge === 'true') {
        document.querySelector('[data-void]')?.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        modal?.classList.add('open');
      }
    });
  });

  document.querySelector('[data-modal-close]')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.querySelector('[data-void-close]')?.addEventListener('click', () => {
    document.querySelector('[data-void]')?.classList.remove('active');
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
      document.querySelector('[data-void]')?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
