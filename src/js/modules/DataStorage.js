export class DataStorage {

    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key) {
        return localStorage.getItem(key);
    }
}