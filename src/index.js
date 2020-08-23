import "./styles/main.css";

import { NewsApi } from './js/modules/NewsApi';
import { NewsCard } from './js/components/NewsCard';
import { NewsCardList } from './js/components/NewsCardList'
import { DataStorage } from './js/modules/DataStorage';
import { SearchInput } from './js/components/SearchInput';
import { NEWS_API_KEY, CURRENT_DATE, DATE_WEEK_AGO } from './js/constants/constants';
import {dateFormatting} from './js/utils/utils';

const formSearch = document.querySelector('.search__form');

const newsCard = (imgUrl, title, date, description, source) => {
    const newsCard = new NewsCard(imgUrl, title, date, description, source, dateFormatting);
    return newsCard.create()
}
const newsCardList = new NewsCardList(document.querySelector('.results__cards'), newsCard);
const newsApi = new NewsApi(NEWS_API_KEY, CURRENT_DATE, DATE_WEEK_AGO);
const dataStorage = new DataStorage();

const buttonShowMore = document.querySelector('.results__button-show-more');
const searchNotFound = document.querySelector('.not-found');
const inputSearch = document.querySelector('.input__search');
const preloader = document.querySelector('.preloader');
const sectionResults = document.querySelector('.page__results');
const cardBlock = document.querySelector('.results__cards');


//функция отрисовки 
function loadCards(array) {
    const arrayWithCards = array;
    const renderNow = arrayWithCards.articles.splice(0, 3);

    newsCardList.render(renderNow) //отрисовка карточек с временного масива

    if (arrayWithCards.articles.length !== 0) {
        buttonShowMore.style.display = 'block';
    }
    else { buttonShowMore.style.display = 'none'; }

    dataStorage.setItem('newsCard', arrayWithCards);
}

const renderThreeCards = () => {
    event.preventDefault();

    //обнуляем блоки
    searchNotFound.style.display = 'none';
    sectionResults.style.display = 'none';
    preloader.style.display = 'block';

    newsApi.getNews(inputSearch.value)
        .then(res => {
            let keyWord = inputSearch.value;
            dataStorage.setItem('keyWord', keyWord);

            //копируем масив с карточками
            dataStorage.setItem('newsCardCopy', res);

            preloader.style.display = 'none'; //обнуляем прелоадер
            cardBlock.innerHTML = ""; // обнуляем содержимое контейнера

            dataStorage.setItem('newsCard', res);

            if (res.totalResults == 0) {
                searchNotFound.style.display = 'block';

                // удаление предыдущего запроса
                dataStorage.setItem('keyWord', '')
                inputSearch.value = '';
            }

            if (res.totalResults > 0) {
                sectionResults.style.display = 'block';
            }

            preloader.style.display = 'none'; //обнуляем прелоадер
            cardBlock.innerHTML = ""; // обнуляем содержимое контейнера

            loadCards(JSON.parse(dataStorage.getItem('newsCard')));
        })
        .catch(err => {
            console.log(err)
        })
}

const searchInput = new SearchInput(formSearch, renderThreeCards);

searchInput.setEventListeners();

buttonShowMore.addEventListener('click', function () {
    loadCards(JSON.parse(dataStorage.getItem('newsCard')));
})

// отрисовка слова в поле ввода
inputSearch.value = JSON.parse(dataStorage.getItem('keyWord'));

if (dataStorage.getItem('newsCardCopy') !== null) {
    sectionResults.style.display = 'block';
    loadCards(JSON.parse(dataStorage.getItem('newsCardCopy')));
} 








