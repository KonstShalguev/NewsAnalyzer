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
    const commitCard = new CommitCard(name, email, date, message, avatar, dateFormatting);
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
    .catch(err => {
        console.log(err)
    })


/* мусорка с мусором
    
*/