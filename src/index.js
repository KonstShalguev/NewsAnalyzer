import "./styles/main.css";

import {NewsApi} from './js/modules/NewsApi';
import {NewsCard} from './js/components/NewsCard';
import {NewsCardList} from './js/components/NewsCardList'
import {DataStorage} from './js/modules/DataStorage';
import {SearchInput} from './js/components/SearchInput';
import {dateFormatting} from './js/utils/utils';
import {NEWS_API_KEY, CURRENT_DATE, DATE_WEEK_AGO} from './js/constants/constants';

const buttonShowMore = document.querySelector('.results__button-show-more');
const searchNotFound = document.querySelector('.not-found');
const inputSearch = document.querySelector('.input__search');
const preloader = document.querySelector('.preloader');
const sectionResults = document.querySelector('.page__results');
const cardBlock = document.querySelector('.results__cards');
const formSearch = document.querySelector('.search__form');
const newsApi = new NewsApi(NEWS_API_KEY, CURRENT_DATE, DATE_WEEK_AGO);
const dataStorage = new DataStorage();
const newsCard = (imgUrl, title, date, description, source) => {
  const newsCard = new NewsCard(imgUrl, title, date, description, source, dateFormatting);
  return newsCard.create();
}
const newsCardList = new NewsCardList(cardBlock, newsCard);
if (formSearch) {
  new SearchInput(formSearch, renderCards, JSON.parse(dataStorage.getItem('keyWord')), '.input__search');
}

function loadCards(array) {
  const renderNow = array.articles.splice(0, 3);
  newsCardList.render(renderNow);
  if (array.articles.length !== 0) {
    buttonShowMore.style.display = 'block';
  }
  if (array.articles.length === 0) {
    buttonShowMore.style.display = 'none';
  }
  dataStorage.setItem('newsCard', array);
}

function renderCards(event) {
  event.preventDefault();
  searchNotFound.style.display = 'none';
  sectionResults.style.display = 'none';
  preloader.style.display = 'block';
  newsApi.getNews(inputSearch.value)
    .then(res => {
      let keyWord = inputSearch.value.toLowerCase();
      dataStorage.setItem('keyWord', keyWord);

      dataStorage.setItem('newsCardCopy', res);
      dataStorage.setItem('newsCard', res);
      preloader.style.display = 'none';
      cardBlock.innerHTML = '';
      if (res.totalResults === 0) {
        searchNotFound.style.display = 'block';
        dataStorage.setItem('keyWord', '');
        inputSearch.value = '';
      }
      if (res.totalResults > 0) {
        sectionResults.style.display = 'block';
      }
      preloader.style.display = 'none';
      cardBlock.innerHTML = '';
      loadCards(JSON.parse(dataStorage.getItem('newsCard')));
    })
    .catch(err => console.log(err))
}

buttonShowMore.addEventListener('click', function () {
  loadCards(JSON.parse(dataStorage.getItem('newsCard')));
})

if (dataStorage.getItem('newsCardCopy') !== null) {
  sectionResults.style.display = 'block';
  loadCards(JSON.parse(dataStorage.getItem('newsCardCopy')));
}
