import "../styles/analytics.css";

import { DataStorage } from '../js/modules/DataStorage';
import { DATE } from '../js/constants/constants';

const dataStorage = new DataStorage();
const newsForWeek = document.querySelector('.news-for-week');
const youAsk = document.querySelector('.request__you-ask');
const worckArray = JSON.parse(dataStorage.getItem('newsCardCopy'));

newsForWeek.textContent = worckArray.totalResults;
youAsk.textContent = JSON.parse(dataStorage.getItem('keyWord'));


const objDate = {}
const howMach = [];

function counter(mass) {
    let count = 0;
    mass.forEach((item)=>{
        const date = item.publishedAt.split('T')[0];  //получаем дату
        howMach.push(date);

        if(objDate[date] == undefined) { 
            objDate[date] = 0
        }

        if(item.title.indexOf(`${JSON.parse(dataStorage.getItem('keyWord'))}`) > 0){
            count += 1;
        }
    })
    document.querySelector('.mentions-headlines').textContent = count;
}

counter(worckArray.articles)

howMach.forEach((item) => {
    if (item in objDate){
        objDate[item] += 1;
    }
})

function renderingAnalytics() {
    //понедельник
    document.querySelector('.number-monday').textContent = objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-6}`];
    document.querySelector('.chart__scale_monday').style.width =  objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-6}`]+'%';
    document.querySelector('.monday').textContent = `${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-6}`;

    //вторник
    document.querySelector('.number-tuesday').textContent = objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-5}`];
    document.querySelector('.chart__scale_tuesday').style.width =  objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-5}`]+'%';
    document.querySelector('.tuesday').textContent = `${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-5}`;

    //среда
    document.querySelector('.number-wednesday').textContent = objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-4}`];
    document.querySelector('.chart__scale_wednesday').style.width =  objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-4}`]+'%';
    document.querySelector('.wednesday').textContent = `${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-4}`;

    //четверг
    document.querySelector('.number-thursday').textContent = objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-3}`];
    document.querySelector('.chart__scale_thursday').style.width =  objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-3}`]+'%';
    document.querySelector('.thursday').textContent = `${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-3}`;

    //пятница
    document.querySelector('.number-friday').textContent = objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-2}`];
    document.querySelector('.chart__scale_friday').style.width =  objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-2}`]+'%';
    document.querySelector('.friday').textContent = `${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-2}`;

    //суббота
    document.querySelector('.number-saturday').textContent = objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-1}`];
    document.querySelector('.chart__scale_saturday').style.width =  objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-1}`]+'%';
    document.querySelector('.saturday').textContent = `${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()-1}`;

    //воскресенье
    document.querySelector('.number-sunday').textContent = objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()}`];
    document.querySelector('.chart__scale_sunday').style.width =  objDate[`${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()}`]+'%';
    document.querySelector('.sunday').textContent = `${DATE.getFullYear()}-0${DATE.getMonth()+1}-${DATE.getDate()}`;  
}

renderingAnalytics() 
