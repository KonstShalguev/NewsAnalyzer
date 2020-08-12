import "../styles/about.css";

import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

// import Swiper styles
import '../../node_modules/swiper/swiper-bundle.min.css';

const swiper = new Swiper('.swiper-container', {
    slidesPerView: "auto",
    spaceBetween: 16,
    //centeredSlides: true,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    navigation: {
    nextEl: '.commits__button-next',
    prevEl: '.commits__button-prev',
    },
});