(() => {
  const root = document.querySelector('[data-ba]');
  if (!root) return;

  const handle = root.querySelector('.ba__handle');
  const setPos = (px) => {
    const r = root.getBoundingClientRect();
    const x = Math.max(0, Math.min(r.width, px));
    const percent = (x / r.width) * 100;
    root.style.setProperty('--pos', percent + '%');
    handle.setAttribute('aria-valuenow', Math.round(percent));
  };

  const clientX = (e) => e.touches ? e.touches[0].clientX : e.clientX;

  let drag = false;
  const start = (e) => { drag = true; setPos(clientX(e) - root.getBoundingClientRect().left); e.preventDefault?.(); };
  const move  = (e) => { if (!drag) return; setPos(clientX(e) - root.getBoundingClientRect().left); };
  const stop  = () => { drag = false; };

  handle.addEventListener('mousedown', start);
  handle.addEventListener('touchstart', start, { passive: false });
  window.addEventListener('mousemove', move);
  window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('mouseup', stop);
  window.addEventListener('touchend', stop);

  handle.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 10 : 1;
    const val = parseInt(handle.getAttribute('aria-valuenow') || '50', 10);
    if (e.key === 'ArrowLeft')  { const n = Math.max(0, val - step); root.style.setProperty('--pos', n + '%'); handle.setAttribute('aria-valuenow', n); }
    if (e.key === 'ArrowRight') { const n = Math.min(100, val + step); root.style.setProperty('--pos', n + '%'); handle.setAttribute('aria-valuenow', n); }
  });

  handle.setAttribute('aria-valuenow', '50');
})();

// Simple form validation for .intro__form
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.intro__form').forEach((wrap) => {
    const form = wrap.querySelector('form');
    if (!form) return;
    const phone = form.querySelector('.intro__form-input, input[type="tel"], input[type="number"], input[name="phone"]');
    const checkbox = form.querySelector('.checkbox__input, input[type="checkbox"]');

    form.addEventListener('submit', (e) => {
      const phoneVal = phone ? String(phone.value || '').trim() : '';
      const phoneOk = phone ? phoneVal.length > 0 : true;
      const checkOk = checkbox ? !!checkbox.checked : true;

      if (!phoneOk || !checkOk) {
        e.preventDefault();
        return;
      }

      // Valid: prevent actual submit and add class to wrapper
      e.preventDefault();
      wrap.classList.add('intro__form--validated');
      // stay on page; proceed with any custom logic here if needed
    });
  });
});
