import "../styles/about.css";

import {GITHUB_API_URL} from '../js/constants/constants';
import {dateFormatting} from '../js/utils/utils';
import {GithubApi} from '../js/modules/GithubApi';
import {CommitCard} from '../js/components/CommitCard';
import {CommitCardList} from '../js/components/CommitCardList';
import {Slider} from "../js/components/Slider";

//колбэк функция создания карточки коммита
const newCommit = (name, email, date, message, avatar) => {
  const commitCard = new CommitCard(name, email, date, message, avatar, dateFormatting);
  return commitCard.create();
}
const githubApi = new GithubApi(GITHUB_API_URL);
const commitCardList = new CommitCardList(document.querySelector('.commits__content-wrapper'), newCommit);

githubApi.getCommits()
  .then(res => {
    commitCardList.render(res);
  })
  .then(() => {
    const slides = document.querySelectorAll('.swiper-slide');
    const slider = document.querySelector('.swiper-container');
    if(slides.length > 1 && slider) {
      new Slider(slider);
    }
  })
  .catch(err => {
    console.log(err);
  })
