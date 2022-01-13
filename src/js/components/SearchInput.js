export class SearchInput {
  constructor(form, func, value, selector) {
    this.form = form;
    this.func = func;
    this.value = value;
    this.selector = selector;

    if(this.form && this.func) {
      this.setEventListeners();
    }
    if(this.selector && this.value) {
      this.form.querySelector(`${this.selector}`).value = this.value;
    }
  }

  setEventListeners() {
    this.form.addEventListener('submit', this.func);
  }
}
