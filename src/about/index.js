import "../styles/about.css";

import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

// import Swiper styles
import '../../node_modules/swiper/swiper-bundle.min.css';


//js классы
import {GithubApi} from '../js/modules/GithubApi';
import {CommitCard} from '../js/components/CommitCard';
import {CommitCardList} from '../js/components/CommitCardList';

//утилиты
import {dateFormatting} from '../js/utils/utils';



//колбэк функция создания карточки коммита
const newCommit = (name, email, date, message, avatar) => {
    const commitCard = new CommitCard(name, email, date, message, avatar);
    return commitCard.create();
}

const сommitCardList = new CommitCardList(document.querySelector('.commits__content-wrapper'), newCommit);
const githubApi = new GithubApi();

githubApi.getCommits()
    .then((res) => {
        сommitCardList.render(res);
    })
    //где его активировать?
    .then(()=>{
        //где его активировать?
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
    .catch(err => console.log(err));






/* мусорка с мусором
    
function addCard(name, email, date, message, avatar) {
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

    card.querySelector('.commit__avatar').style.backgroundImage = `url(${avatar})`;
    document.querySelector('.commits__content-wrapper').appendChild(card); //заменить на контейнер
}



fetch('https://api.github.com/repos/KonstShalguev/NewsAnalyzer/commits')
    .then((res)=>{
        return res.json();
    })

    .then((res) => {
        res.forEach(elem => {
            if (elem.commit.committer.name !== 'GitHub'){
                addCard(elem.commit.committer.name, elem.commit.committer.email, dateConversion(elem.commit.committer.date), elem.commit.message, elem.author.avatar_url);
            }
        });
    })

    .then(()=>{
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








    import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

// import Swiper styles
import '../../node_modules/swiper/swiper-bundle.min.css';

инициализация свайпера
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

*/