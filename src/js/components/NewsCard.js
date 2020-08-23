export class NewsCard {
    constructor(imgUrl, title, date, description, source, func) {
        this.imgUrl = imgUrl;
        this.title = title;
        this.date = date;
        this.description = description;
        this.source = source;
        this.func = func;
    }
    create() {
        const card = document.createElement('div');
        card.classList.add('card');

        card.insertAdjacentHTML('afterbegin',
       `
            <div class="card__img"></div>
            <p class="card__date"></p>
            <h2 class="card__title"></h2>
            <p class="card__paragraph"></p>
            <h3 class="card__source"></h3>
        `);

        card.querySelector('.card__paragraph').textContent = `${this.description}`;
        card.querySelector('.card__img').style.backgroundImage = `url(${this.imgUrl})`;
        card.querySelector('.card__title').textContent = `${this.title}`;
        card.querySelector('.card__date').textContent = `${this.func(this.date)}`;
        card.querySelector('.card__source').textContent = `${this.source}`;
        
        return card;
    }
}