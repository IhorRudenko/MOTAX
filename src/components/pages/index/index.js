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

    // Hint numeric keyboard and pattern; enforce digits-only on input
    if (phone) {
      phone.setAttribute('inputmode', 'numeric');
      phone.setAttribute('pattern', '\\d*');
    }

    const removeErrors = () => {
      form.querySelectorAll('.is-invalid').forEach((n) => {
        n.classList.remove('is-invalid');
        n.removeAttribute('aria-invalid');
      });
      form.querySelectorAll('.form-error').forEach((n) => n.remove());
    };

    // Live cleanup
    phone?.addEventListener('input', () => {
      // keep only digits
      const raw = String(phone.value || '');
      const digits = raw.replace(/\D+/g, '');
      if (raw !== digits) phone.value = digits;

      if (digits.trim().length > 0) {
        phone.classList.remove('is-invalid');
        phone.removeAttribute('aria-invalid');
        // remove adjacent error if present
        const next = phone.nextElementSibling;
        if (next && next.classList.contains('form-error')) next.remove();
      }
    });
    checkbox?.addEventListener('change', () => {
      if (checkbox.checked) {
        checkbox.classList.remove('is-invalid');
        checkbox.removeAttribute('aria-invalid');
        const lbl = checkbox.closest('label');
        // remove error after label if present
        if (lbl && lbl.nextElementSibling && lbl.nextElementSibling.classList.contains('form-error')) {
          lbl.nextElementSibling.remove();
        }
      }
    });

    form.addEventListener('submit', (e) => {
      const phoneVal = phone ? String(phone.value || '').trim() : '';
      const phoneOk = phone ? phoneVal.length > 0 : true;
      const checkOk = checkbox ? !!checkbox.checked : true;

      removeErrors();

      if (!phoneOk && phone) {
        phone.classList.add('is-invalid');
        phone.setAttribute('aria-invalid', 'true');
      }
      if (!checkOk) {
        checkbox?.classList.add('is-invalid');
        checkbox?.setAttribute('aria-invalid', 'true');
      }

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

// Mark product block as fixed on CTA click
document.addEventListener('DOMContentLoaded', () => {
  // Handle click on the specific button
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.product__form-btn');
    if (!btn) return;
    e.preventDefault();
    const block = btn.closest('.product__block');
    if (block) block.classList.add('product__block--fixed');
  });

  // Also handle form submit inside product block (keyboard, etc.)
  document.querySelectorAll('.product__block form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const block = form.closest('.product__block');
      if (block) block.classList.add('product__block--fixed');
    });
  });
});
