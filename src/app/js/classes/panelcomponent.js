/**
 *
 * Control class for handing control panel events
 *
 */

import R from 'ramda';

export default class PanelComponent {
    constructor(id, name, actionHandler, data = []) {
        this.id = id;
        this.name = name;
        this.actionHandler = actionHandler;
        this.data = data;
    }

    getSotedDataBy(key, ascending = true) {
        let sortedData;
        const descComparator = R.comparator((a, b) => R.gt(R.prop(key, a), R.prop(key, b)));

        sortedData = ascending ? R.sortBy(R.prop(key), this.data) : R.sort(descComparator, this.data);
        return data;
    }

    getTopN(limit, key, ascending = true) {
        let formatted = getSortedDataBy(key, ascending);
        return R.slice(0, limit + 1, formatted);
    }

    getActionHandler() {
        return this.actionHandler;
    }

    getData() {
        return this.data;
    }

    getId() {
        return this.id;
    }

    getName(name) {
        this.name = name;
    }

    setActionHandler(actionHandler) {
        this.actionHandler = actionHandler;
    }

    setActionHandler(fn) {
        this.actionHandler = fn;
    }

    setData(data) {
        this.data = data;
    }

    setName(name) {
        this.name = name;
    }

    toString() {
        return {
            id: this.id,
            name: this.name,
            actionHandler: this.actionHandler,
            data: this.data
        };
    }
}
