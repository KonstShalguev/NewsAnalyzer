export class CommitCard {
    constructor(name, email, date, message, avatar) {
        this.name = name;
        this.email = email;
        this.date = date;
        this.message = message;
        this.avatar = avatar;
    }

    create() {
        const commit = document.createElement('div');
        commit.classList.add('swiper-slide');
        commit.classList.add('commit');

        commit.insertAdjacentHTML('afterbegin',
       `<p class="commit__date">${this.date}</p>
        <div class="commit__avatar"></div>
        <div class="commit__author-info">
            <h3 class="commit__author-name">${this.name}</h3>
            <p class="commit__author-email">${this.email}</p>
        </div>
        <p class="commit__author-comment">
            ${this.message}
        </p>`);

        commit.querySelector('.commit__avatar').style.backgroundImage = `url(${this.avatar})`;

        return commit;
    }
}