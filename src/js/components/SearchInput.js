export class SearchInput {
    constructor(form, func) {
        this.form = form;
        this.func = func;
    }

    setEventListeners(){
        this.form.addEventListener('submit', function(event){
            event.preventDefault();
            this.func;
        })
    }
}