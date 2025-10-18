import Swiper from 'swiper';
import { Navigation, Thumbs, Grid, Scrollbar } from 'swiper/modules';

import "./slider.scss";

function initSliders() {
  document.querySelectorAll('.swiper').forEach((root) => {
    const classes = Array.from(root.classList);
    const isMain = classes.some((c) => /^main-swiper(\-\d+)?$/.test(c));
    const isThumbs = classes.some((c) => /^thumbs-swiper(\-\d+)?$/.test(c));
    const isFeedback = classes.includes('feedback__slider');
    if (isMain || isThumbs || isFeedback) return; 

    const prev = root.closest('[data-swiper-root]')?.querySelector('.swiper-button-prev') || root.querySelector('.swiper-button-prev');
    const next = root.closest('[data-swiper-root]')?.querySelector('.swiper-button-next') || root.querySelector('.swiper-button-next');

    new Swiper(root, {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 800,
      navigation: {
        prevEl: prev || undefined,
        nextEl: next || undefined,
      },
    });
  });

  const allMain = Array.from(document.querySelectorAll('.swiper'))
    .filter((el) => Array.from(el.classList).some((c) => /^main-swiper(\-\d+)?$/.test(c)));

  allMain.forEach((mainEl) => {
    const scope = mainEl.closest('.main__content') || mainEl.parentElement || document;

    const thumbsEl = scope.querySelector('.swiper.thumbs-swiper, .swiper[class*="thumbs-swiper-"]');
    const prevEl = scope.querySelector('[class^="thumbs-swiper__prev"]');
    const nextEl = scope.querySelector('[class^="thumbs-swiper__next"]');

    let thumbsInstance = null;
    if (thumbsEl) {
      thumbsInstance = new Swiper(thumbsEl, {
        modules: [Thumbs],
        observer: true,
        observeParents: true,
        slidesPerView: 4,
        spaceBetween: 20,
        speed: 800,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
          640: { spaceBetween: 20 },
          768: { spaceBetween: 20 },
          992: { spaceBetween: 30 },
          1200: { spaceBetween: 30 },
          1366: { spaceBetween: 30 },
        },
      });
    }

    new Swiper(mainEl, {
      modules: [Navigation, Thumbs],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 800,
      loop: true,
      thumbs: thumbsInstance ? { swiper: thumbsInstance } : undefined,
      navigation: {
        prevEl: prevEl || undefined,
        nextEl: nextEl || undefined,
      },
    });
  });

  // Feedback sliders (independent, optional arrows inside .feedback__content)
  document.querySelectorAll('.feedback__slider').forEach((sliderEl) => {
    const scope = sliderEl.closest('.feedback__content') || sliderEl.parentElement || document;
    const prevEl =
      scope.querySelector('.feedback__prev') ||
      scope.querySelector('.thumbs-swiper__prev') ||
      scope.querySelector('.swiper-button-prev');
    const nextEl =
      scope.querySelector('.feedback__next') ||
      scope.querySelector('.thumbs-swiper__next') ||
      scope.querySelector('.swiper-button-next');

    new Swiper(sliderEl, {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 50,
      speed: 800,
      loop: true,
      navigation: (prevEl || nextEl) ? { prevEl: prevEl || undefined, nextEl: nextEl || undefined } : undefined,
      breakpoints: {
        576: { slidesPerView: 1, spaceBetween: 50 },
        768: { slidesPerView: 2, spaceBetween: 50 },
        1200: { slidesPerView: 3, spaceBetween: 50 },
      },
    });
  });
}
document.querySelector('[data-fls-slider]') ?
	window.addEventListener("load", initSliders) : null
