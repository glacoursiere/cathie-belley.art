const header = document.querySelector('header');
if (header) {
  const updateHeaderHeight = () => {
    document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
  };
  new ResizeObserver(updateHeaderHeight).observe(header);
  updateHeaderHeight();
  const toggle = header.querySelector('.menu-toggle');
  const menu = header.querySelector('#section-menu');
  const mobile = window.matchMedia('(max-width: 600px)');
  const setMenu = (open) => {
    menu.hidden = mobile.matches && !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };
  const syncMenu = () => {
    toggle.hidden = !mobile.matches;
    setMenu(false);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobile.matches && !menu.hidden) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (mobile.matches && !menu.hidden && !header.contains(event.target)) setMenu(false);
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a') && mobile.matches) setMenu(false);
  });
  mobile.addEventListener('change', syncMenu);
  syncMenu();
} else {
  document.documentElement.style.setProperty('--header-height', '0px');
}
