
export default class StorageSystem {
    constructor(localStorage, ...rest) {
        this._localStorage = localStorage;
    }

    getItem(key) {
        return this._localStorage.getItem(key);
    }

    getRawItem(key) {
        return JSON.parse(this.getItem(key));
    }

    setItem(key, value) {
        this._localStorage.setItem(key, value);
    }

    setRawItem(key, value) {
        this.setItem(key, JSON.stringify(value));
    }
}