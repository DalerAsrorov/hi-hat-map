/**
 *
 * Control class for handing control panel events
 *
 */

 class PanelComponent {
    constructor(id, name, actionHandler, data=[]) {
        this._id = id;
        this._name = name;
        this._actionHandler = actionHandler;
        this._data = data;
    }

    getSotedDataBy(key, ascending=true) {
        let data;
        const descComparator = R.comparator((a, b) => R.gt(R.prop(key, a), R.prop(key, b)));

        data = ascending ? R.sortBy(R.prop(key), this._data) : R.sort(descComparator, this._data);
        return data;
    }

    getTopN(limit, key, ascending=true) {
        let formatted = getSortedDataBy(key, ascending);
        return R.slice(0, limit + 1, formatted);
    }

    getActionHandler() {
        return this._actionHandler;
    }

    getData() {
        return this._data;
    }

    getId() {
        return this._id;
    }

    getName(name) {
        this._name = name;
    }

    setActionHandler(actionHandler) {
        this._actionHandler = actionHandler;
    }

    setActionHandler(fn) {
        this._actionHandler = fn;
    }

    setData(data) {
        this.data = data;
    }

    setName(name) {
        this._name = name;
    }

    toString() {
        return {
            "id": this._id,
            "name": this._name,
            "actionHandler": this._actionHandler,
            "data": this._data
        };
    }
 }
