import { getType } from '../modules/utils.js';

export default class List {
    constructor(id, dataName) {
        this.id = id;
        this.dataName = dataName;

        this.$self = $(`<div id=${id} class='list-group' data-name=${dataName}></div>`);
    }

    get id() {
        return this._id;
    }

    set id(newId) {
        this._id = newId;
    }

    get dataName() {
        return this._dataName;
    }

    set dataName(dataName) {
        this._dataName = dataName;
    }

    addClassesToAllItems(classes) {
        this.$self.children().addClass(classes)
    }

    addItem(value, handler, child={}) {
        this.$self.append(`<li class='list-group-item'><span> ${value} </span></li>`);
    }

    bindTo(container) {
        if(getType(container) === '[object Object]') {
            return container.append(this.$self);
        }

        return $(`${container}`).append(this.$self);
    }

    removeItem() {

    }

    $html() {
        return this.$self;
    }

    toString() {
        return this.toString();
    }
}