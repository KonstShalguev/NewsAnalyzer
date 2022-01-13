import Swiper, {Navigation, Pagination} from 'swiper';

Swiper.use([Navigation, Pagination]);

export class Slider {
  constructor(parent) {
    this.parent = parent;
    if (this.parent) {
      this.initSlider();
    }
  }

  initSlider() {
    new Swiper(this.parent, {
      loop: true,
      spaceBetween: 16,
      centeredSlides: true,
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
      navigation: {
        nextEl: '.commits__button-next',
        prevEl: '.commits__button-prev',
      },
    });
  }
}
