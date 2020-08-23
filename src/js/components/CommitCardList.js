export class CommitCardList {
    constructor(container, func) {
        this.container = container;
        this.func = func;
    }

    addCommit(name, email, date, message, avatar) {
        this.container.appendChild(this.func(name, email, date, message, avatar));
    }

    render(array) {
        for (const elem of array) {
            if(elem.commit.committer.name !== 'GitHub')
            this.addCommit(elem.commit.committer.name, elem.commit.committer.email, elem.commit.committer.date, elem.commit.message, elem.author.avatar_url);
        }
    }
}