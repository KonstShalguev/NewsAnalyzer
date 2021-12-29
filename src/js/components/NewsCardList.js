export class NewsCardList {
  constructor(container, func) {
    this.container = container;
    this.func = func;
  }

  addCard(imgUrl, title, date, description, source) {
    this.container.appendChild(this.func(imgUrl, title, date, description, source));
  }

  render(array) {
    for (const elem of array) {
      this.addCard(elem.urlToImage, elem.title, elem.publishedAt, elem.description, elem.source.name);
    }
  }
}
