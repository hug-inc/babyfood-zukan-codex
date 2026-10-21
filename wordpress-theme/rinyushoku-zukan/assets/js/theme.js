(() => {
  'use strict';

  const body = document.body;
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.menu-toggle__label').textContent = 'メニュー';
    navigation.classList.remove('is-open');
    body.classList.remove('menu-open');
  };

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const nextOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(nextOpen));
      menuButton.querySelector('.menu-toggle__label').textContent = nextOpen ? '閉じる' : 'メニュー';
      navigation.classList.toggle('is-open', nextOpen);
      body.classList.toggle('menu-open', nextOpen);
      if (nextOpen) navigation.querySelector('a')?.focus();
    });
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        menuButton.focus();
      }
    });
  }

  const filterButton = document.querySelector('.filter-toggle');
  const filterForm = document.querySelector('#product-filters');
  if (filterButton && filterForm) {
    filterButton.addEventListener('click', () => {
      const isOpen = filterButton.getAttribute('aria-expanded') === 'true';
      filterButton.setAttribute('aria-expanded', String(!isOpen));
      filterButton.textContent = isOpen ? '検索条件を開く' : '検索条件を閉じる';
      filterForm.classList.toggle('is-open', !isOpen);
    });
  }

  const storageKey = 'rinyushoku-zukan-compare';
  const maximum = 3;
  const compareBar = document.querySelector('.compare-bar');
  const compareItems = document.querySelector('[data-compare-items]');
  const compareCount = document.querySelector('[data-compare-count]');
  const toast = document.querySelector('.compare-toast');
  const compareButtons = [...document.querySelectorAll('[data-compare-id]')];
  let compare = [];

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    compare = Array.isArray(saved) ? saved.slice(0, maximum) : [];
  } catch (_) {
    compare = [];
  }

  const announce = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(announce.timer);
    announce.timer = window.setTimeout(() => { toast.hidden = true; }, 2600);
  };

  const renderCompare = () => {
    if (!compareBar || !compareItems || !compareCount) return;
    compareBar.hidden = compare.length === 0;
    compareCount.textContent = String(compare.length);
    compareItems.replaceChildren(...compare.map((item) => {
      const span = document.createElement('span');
      span.className = 'compare-bar__item';
      span.textContent = item.name;
      return span;
    }));
    compareButtons.forEach((button) => {
      const active = compare.some((item) => item.id === button.dataset.compareId);
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
      const label = button.querySelector('span:last-child');
      if (label) label.textContent = active ? '比較中' : '比較に追加';
    });
  };

  compareButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = String(button.dataset.compareId || '');
      const name = String(button.dataset.compareName || '商品');
      const index = compare.findIndex((item) => item.id === id);
      if (index >= 0) {
        compare.splice(index, 1);
        announce(`${name}を比較リストから外しました。`);
      } else if (compare.length >= maximum) {
        announce(window.rinyushokuZukan?.maxMessage || '比較できる商品は最大3件です。');
        return;
      } else {
        compare.push({ id, name });
        announce(`${name}を比較リストに追加しました。`);
      }
      localStorage.setItem(storageKey, JSON.stringify(compare));
      renderCompare();
    });
  });

  renderCompare();
})();
