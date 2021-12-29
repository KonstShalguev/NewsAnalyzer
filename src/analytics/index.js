import "../styles/analytics.css";

import {DataStorage} from '../js/modules/DataStorage';
import {DATE, MONTHS, DAYS} from '../js/constants/constants';

const dataStorage = new DataStorage();
const newsForWeek = document.querySelector('.news-for-week');
const youAsk = document.querySelector('.request__you-ask');
const dateText = document.querySelector('.chart__date');
const workArray = JSON.parse(dataStorage.getItem('newsCardCopy'));
const keyWord = JSON.parse(dataStorage.getItem('keyWord'))
const objDate = {};
const howMach = [];

newsForWeek.textContent = workArray.totalResults;
youAsk.textContent = keyWord;
if (dateText) {
  document.querySelector('.chart__date').textContent = MONTHS[DATE.getMonth()];
}

const counter = (mass) => {
  let count = 0;
  mass.forEach((item) => {
    const date = item.publishedAt.slice(8, 10);
    howMach.push(date);
    if (objDate[date] === undefined) {
      objDate[date] = 0;
    }
    if (date in objDate) {
      objDate[item] += 1;
    }
    if (item.title.toLowerCase().includes(keyWord)) {
      count += 1;
    }
  })
  document.querySelector('.mentions-headlines').textContent = count;
}

counter(workArray.articles);

const rowGenerator = (date, number) => {
  document.querySelector('.test').insertAdjacentHTML('afterbegin', `
    <div class="chart__table-row">
      <div class="chart__table-column tuesday">${date}</div>
        <div class="chart__table-column">
          <div class="chart__scale chart__scale_tuesday" style="width: ${number}%;">
            <span class="chart__scale-number number-tuesday">${number}</span>
          </div>
      </div>
    </div>
  `);
}

const render = () => {
  if (howMach) {
    howMach.forEach((item) => {
      if (item in objDate) {
        objDate[item] += 1;
      }
    })
  }
  if (objDate) {
    for (let i = 0; i < 7; i++) {
      let day = DATE.getDate() > 9 ? `${DATE.getDate()}` : `0${DATE.getDate()}`;
      let date = `${day}, ${DAYS[DATE.getDay()]}`;
      if (!objDate[day]) i--;
      if (objDate[day]) rowGenerator(date, objDate[day]);
      if (DATE.getDate() - 1 < 1) DATE.setDate(0);
      if (DATE.getDate() - 1 >= 1) DATE.setDate(DATE.getDate() - 1);
    }
  }
}
render();
