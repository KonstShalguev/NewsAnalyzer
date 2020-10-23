import "../styles/analytics.css";

import { DataStorage } from '../js/modules/DataStorage';
import { DATE } from '../js/constants/constants';

const dataStorage = new DataStorage();

const newsForWeek = document.querySelector('.news-for-week');
const youAsk = document.querySelector('.request__you-ask');

const workArray = JSON.parse(dataStorage.getItem('newsCardCopy'));

const objDate = {};

newsForWeek.textContent = workArray.totalResults;
youAsk.textContent = JSON.parse(dataStorage.getItem('keyWord'));

function counter(mass) {
    let count = 0;
    
    mass.forEach((item)=>{
        const date = item.publishedAt.split('T')[0];  //получаем и обрезаем дату

        if(objDate[date] == undefined) { 
            objDate[date] = 1;
        }
        else if (objDate[date] !== undefined) { objDate[date] += 1 }

        if(item.title.toLowerCase().indexOf(`${JSON.parse(dataStorage.getItem('keyWord').toLowerCase())}`) > 0){
            count += 1;
        }
    })

    document.querySelector('.mentions-headlines').textContent = count;
}

counter(workArray.articles);

function remakeDate (num) {
    if ((num/10) < 1) {
        return `0${num}`;
    }
    return num;
}

///////////////////////////////////////
const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',];
//////////////////////////////////////

function cikl () {
    return function test() {
    const d = new Date();
      for (let i = 0; i < 7; i++) {
        d.setDate(d.getDate() - 1);
        console.log(d);
      }
    }
   }
   
   const eshe = cikl();
   
   eshe();

//////////////////////////////////////

function renderingAnalytics(arr) {
  arr.forEach(function(item, index){

  document.querySelector(`.number-${item}`).textContent = objDate[`${DATE.getFullYear()}-${remakeDate(DATE.getMonth()+1)}-${remakeDate(DATE.getDate() - 6 + index)}`];
  document.querySelector(`.chart__scale_${item}`).style.width =  objDate[`${DATE.getFullYear()}-${remakeDate(DATE.getMonth()+1)}-${remakeDate(DATE.getDate() - 6 + index)}`]+'%';
  document.querySelector(`.${item}`).textContent = `${DATE.getFullYear()}-${remakeDate(DATE.getMonth()+1)}-${remakeDate(DATE.getDate() - 6 + index)}`;
  })
}

renderingAnalytics(weekDays);