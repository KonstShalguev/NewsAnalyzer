export class NewsApi {
    constructor(newsApiKey, dateTo, dateFrom){
        this.newsApiKey = newsApiKey;
        this.dateTo = dateTo;
        this.dateFrom = dateFrom;
    }

    getNews(searchWord) {
        return fetch(`http://newsapi.org/v2/everything?from=${this.dateFrom}&to=${this.dateTo}&apiKey=${this.newsApiKey}&pageSize=100&q=${searchWord}`)
            .then((res) => {
                if(res.ok){
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}