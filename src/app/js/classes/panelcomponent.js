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
        const descComparator = R.comparator((a, b) =>
            R.gt(R.prop(key, a), R.prop(key, b))
        );

        sortedData = ascending
            ? R.sortBy(R.prop(key), this.data)
            : R.sort(descComparator, this.data);

        return sortedData;
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
