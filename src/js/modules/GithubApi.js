export class GithubApi {

  getCommits() {
    return fetch('https://api.github.com/repos/KonstShalguev/NewsAnalyzer/commits') //адрес сделать константой
      .then((res) => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}

