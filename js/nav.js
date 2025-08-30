document.addEventListener('DOMContentLoaded', () => {
  const toggle   = document.getElementById('navToggle');
  const drawer   = document.getElementById('navDrawer');
  const closeBtn = document.getElementById('drawerClose');
  const backdrop = document.getElementById('backdrop');

  if (!toggle || !drawer || !backdrop) return;

  const FOCUSABLE =
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  function firstFocusable() {
    const list = drawer.querySelectorAll(FOCUSABLE);
    return list.length ? list[0] : null;
  }
  function focusables() {
    return Array.from(drawer.querySelectorAll(FOCUSABLE))
      .filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1 && isVisible(el));
  }
  function isVisible(el){
    const rects = el.getClientRects();
    return !!rects.length && window.getComputedStyle(el).visibility !== 'hidden';
  }

  function openDrawer(){
    lastFocused = document.activeElement;

    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');

    toggle.setAttribute('aria-expanded', 'true');

    backdrop.hidden = false;
    // ใช้ rAF ให้เบราว์เซอร์คำนวณ layout ก่อน แล้วค่อยเฟด
    requestAnimationFrame(() => backdrop.classList.add('show'));

    document.body.classList.add('no-scroll');

    // โฟกัสรายการแรกในลิ้นชัก
    const first = firstFocusable();
    first?.focus();

    document.addEventListener('keydown', onKeydown);
    document.addEventListener('focus', trapFocus, true);
  }

  function closeDrawer(){
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');

    toggle.setAttribute('aria-expanded', 'false');

    backdrop.classList.remove('show');
    const onFadeOut = () => {
      backdrop.hidden = true;
      backdrop.removeEventListener('transitionend', onFadeOut);
    };
    backdrop.addEventListener('transitionend', onFadeOut);

    document.body.classList.remove('no-scroll');

    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('focus', trapFocus, true);

    // คืนโฟกัสให้ปุ่มเดิม
    lastFocused?.focus();
  }

  function onKeydown(e){
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer();
      return;
    }
    if (e.key === 'Tab' && drawer.classList.contains('open')) {
      const nodes = focusables();
      if (!nodes.length) return;

      const first = nodes[0];
      const last  = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  }

  function trapFocus(e){
    if (!drawer.classList.contains('open')) return;
    if (!drawer.contains(e.target)) {
      e.stopPropagation();
      firstFocusable()?.focus();
    }
  }

  // เปิดด้วยคลิก/คีย์บอร์ด (Enter/Space) ที่โลโก้
  toggle.addEventListener('click', openDrawer);
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDrawer();
    }
  });

  // ปิดด้วยปุ่มปิดหรือคลิก backdrop
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
});
