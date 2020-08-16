import "../styles/about.css";

import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

// import Swiper styles
import '../../node_modules/swiper/swiper-bundle.min.css';



function addCard(name, email, date, message) {
    const card = document.createElement('div');
    card.classList.add('swiper-slide');
    card.classList.add('commit');

    card.insertAdjacentHTML('afterbegin',
      `<p class="commit__date">${date}</p>
      <div class="commit__avatar"></div>
      <div class="commit__author-info">
        <h3 class="commit__author-name">${name}</h3>
        <p class="commit__author-email">${email}</p>
      </div>
      <p class="commit__author-comment">
        ${message}
      </p>`);

      document.querySelector('.commits__content-wrapper').appendChild(card); //заменить на контейнер
}

function dateConversion(date) {
    const arrayMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    const year =date.slice(0,4);
    const month =date.slice(5,7);
    const day = date.slice(8,10);

    return `${day} ${arrayMonths[Number.parseInt(month)-1]}, ${year}`;
}

fetch('https://api.github.com/repos/KonstShalguev/NewsAnalyzer/commits')
    .then((res)=>{
        return res.json();
    })

    .then((res) => {
        res.forEach(elem => {
            if (elem.commit.committer.name !== 'GitHub'){
                addCard(elem.commit.committer.name, elem.commit.committer.email, dateConversion(elem.commit.committer.date), elem.commit.message);
            }
        });
    })
    
    .then(()=>{
        /* инициализация свайпера */
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: "auto",
            spaceBetween: 16,
            centeredSlides: true,
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
    })














/* мусорка с мусором
    
name, email, date, message, avatar   


fetch('https://api.github.com/repos/KonstShalguev/NewsAnalyzer/commits')
    .then((res)=>{
        return res.json();
    })

    .then((res) => {
        res.forEach(elem => {
            if (elem.commit.committer.name !== 'GitHub'){
                 console.log(elem.commit.committer.name);
                console.log(elem.author.avatar_url);
                console.log(elem.commit.message);
                console.log(elem.commit.committer.email);
                console.log(elem.commit.committer.date);
            }
        });
    })



*/