export class CommitCard {
    constructor(name, email, date, message, avatar, func) {
        this.name = name;
        this.email = email;
        this.date = date;
        this.message = message;
        this.avatar = avatar;
        this.func = func;
    }

    create() {
        const commit = document.createElement('div');
        commit.classList.add('swiper-slide');
        commit.classList.add('commit');

        commit.insertAdjacentHTML('afterbegin',
       `<p class="commit__date"></p>
        <div class="commit__avatar"></div>
        <div class="commit__author-info">
            <h3 class="commit__author-name"></h3>
            <p class="commit__author-email"></p>
        </div>
        <p class="commit__author-comment"></p>
        `);

        commit.querySelector('.commit__avatar').style.backgroundImage = `url(${this.avatar})`;
        commit.querySelector('.commit__date').textContent = `${this.func(this.date)}`;
        commit.querySelector('.commit__author-name').textContent = `${this.name}`;
        commit.querySelector('.commit__author-email').textContent = `${this.email}`;
        commit.querySelector('.commit__author-comment').textContent = `${this.message}`;
        return commit;
    }
}