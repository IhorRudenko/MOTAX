/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Thumbs, Grid, Scrollbar } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Підключення базових стилів
import "./slider.scss";
// Повний набір стилів з node_modules
// import 'swiper/css/bundle';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.swiper')) { // <- Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.swiper', { // <- Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			//autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},
			/*
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// Події
			on: {

			}
		});
	}


	if (document.querySelector('.thumbs-swiper')) { // <- Вказуємо склас потрібного слайдера
		new Swiper('.thumbs-swiper', { // <- Вказуємо склас потрібного слайдера
			modules: [ Thumbs],
			observer: true,
			observeParents: true,
			slidesPerView: 4,
			spaceBetween: 20,
			speed: 800,

			freeMode: true,
			watchSlidesProgress: true,

			
			// Брейкпоінти
			breakpoints: {
				640: {
					spaceBetween: 20,
				},
				768: {
					spaceBetween: 20,
				},
				992: {
					spaceBetween: 30,
				},
				1200: {
					spaceBetween: 30,
				},
				1366: {
					spaceBetween: 30,
				},
			},
			
		});
	}
	
	if (document.querySelector('.main-swiper')) { // <- Вказуємо склас потрібного слайдера
		new Swiper('.main-swiper', { // <- Вказуємо склас потрібного слайдера
			modules: [Navigation, Thumbs],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 10,
			speed: 800,
			loop: true,

			thumbs: {
				swiper: ".thumbs-swiper",
			},

			navigation: {
				prevEl: '.thumbs-swiper__prev',
				nextEl: '.thumbs-swiper__next',
			},

			/*
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
		});
	}
}
document.querySelector('[data-fls-slider]') ?
	window.addEventListener("load", initSliders) : null