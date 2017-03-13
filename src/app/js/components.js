
export default class Components {
    constructor(id="", name="", list=[]) {
        this.id = id;
        this.name = name;
        this.list = list;
    }

    add(panelComponent) {
        this.list.push(panelComponent);
    }

    get() {
        return this;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getList() {
        return this.list;
    }

    set(id, name, list) {
        this.id = id;
        this.name = name;
        this.list = list;
    }

    setName(name) {
        this.name = name;
    }

    setId(id) {
        this.id = id;
    }

    setList(list) {
        this.list = list;
    }

    toString() {
        return {
            id: this.id,
            name: this.name,
            list: this.list
        }
    }

}
