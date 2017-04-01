import Storage from './storage';

export default class StorageSystem extends Storage {
    constructor(localStorage, ...rest) {
        super();
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