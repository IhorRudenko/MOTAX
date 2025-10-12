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
