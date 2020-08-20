import "./styles/main.css";

import { NewsApi } from './js/modules/NewsApi';

import { NewsCard } from './js/components/NewsCard';
import { NewsCardList } from './js/components/NewsCardList'

import { DataStorage } from './js/modules/DataStorage';
import { SearchInput } from './js/components/SearchInput'; //класс формы

import { NEWS_API_KEY, CURRENT_DATE, DATE_WEEK_AGO } from './js/constants/constants';

const newsApi = new NewsApi(NEWS_API_KEY, CURRENT_DATE, DATE_WEEK_AGO);
const dataStorage = new DataStorage();
//...................................................................................................
const formSearch = document.querySelector('.search__form');
const searchInput = new SearchInput(formSearch);

searchInput.setEventListeners()
//...................................................................................................

//пробный запуск
/* const inputSearch = document.querySelector('.input__search');
const buttonSearch = document.querySelector('.search__form-button');

buttonSearch.addEventListener('click', function (event) {
    event.preventDefault();

    newsApi.getNews(inputSearch.value)
        .then(res => {
            dataStorage.setItem('newsCard', res);
        })
})
 */


const buttonShowMore = document.querySelector('.results__button-show-more')

buttonShowMore.addEventListener('click', function (event) {
    //event.preventDefault();

    //берем массив из LS
    const arrayWithCards = JSON.parse(dataStorage.getItem('newsCard'));

    function renderThreeCards(mass) {
        const renderNow = mass.articles.splice(0, 3);

        if (dataStorage.getItem('renderAfterReboot') == null) {
            dataStorage.setItem('renderAfterReboot', []);
        }

        //отрисовал эти три карточки
        //..........................................................................
        const newsCard = (imgUrl, title, date, description, source) => {
            const newsCard = new NewsCard(imgUrl, title, date, description, source);
            return newsCard.create()
        }

        const newsCardList = new NewsCardList(document.querySelector('.results__cards'), newsCard);
        newsCardList.render(renderNow)
        //...........................................................................

        renderNow.forEach(function (item) {
            const arrayRenderedCard = JSON.parse(dataStorage.getItem('renderAfterReboot'));
            arrayRenderedCard.push(item);
            dataStorage.setItem('renderAfterReboot', arrayRenderedCard);
        })

        dataStorage.setItem('newsCard', arrayWithCards);
    }

    renderThreeCards(arrayWithCards);
})


























//пробный запуск карточек
/*
const newsCard = (imgUrl, title, date, description, source) => {
    const newsCard = new NewsCard(imgUrl, title, date, description, source);
    return newsCard.create()
}


const newsCardList = new NewsCardList(document.querySelector('.results__cards'), newsCard);

const mass = JSON.parse(dataStorage.getItem('newsCard'));
newsCardList.render(mass.articles); */









/*
https://nomoreparties.co/news/v2/everything?  <<---- зачем менять на этот прокси сервер?


/* const currentDate = `${dateNow.getFullYear()}-${((dateNow.getMonth()+1) / 10) < 1 ? `0${dateNow.getMonth()+1}` : dateNow.getMonth()+1}-${((dateNow.getDate()) / 10) < 1 ? `0${dateNow.getDate()}` : dateNow.getDate()}`;

const  = `${dateNow.getFullYear()}-${((dateNow.getMonth()+1) / 10) < 1 ? `0${dateNow.getMonth()+1}` : dateNow.getMonth()+1}-${((dateNow.getDate()-7) / 10) < 1 ? `0${dateNow.getDate()-7}` : dateNow.getDate()-7}`;

JSON.parse(dataStorage.getItem('newsCard')) получаем масив с локал стораджа
*/







