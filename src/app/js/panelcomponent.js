/**
 *
 * Control class for handing control panel events
 *
 */

 class PanelComponent {
    constructor(id, div=$('<div></div>'), actionHandler, data={}) {
        this._id = id;
        this._div = div;
        this._actionHandler = actionHandler;
        this._data = data;
    }

    /**
     * This function sorts data in
     * ascending order or descending
     * order based on the boolean value given.
     *  > Ascendent order if true.
     *  > Descending order if false.
     */

    getSotedData(ascending=true) {
        let data;

        if(ascending) {
            data = R.sortBy(R.prop(objectKey), this._data);
        } else {
            const descComparator = R.comparator((a, b) => R.gt(R.prop(objectKey, a), R.prop(objectKey, b)));
            data = R.sort(descComparator, this._data);
        }

        return data;
    }

    getSortedDataAscBy(objectKey) {
        this.getSortedData(true);
    }

    getSortedDataDescBy(objectKey) {
        this.getSortedData(false);
    }

    getTopData(limit, ascending=true) {
        acending = ascending ? this.getSortedDataDescBy(asc)
    }

    formatData(fn) {
        fn(this._data);
    }

    getDiv() {
        return this._data;
    }

    setDiv(div) {
        this._div = div;
    }

    getActionHandler() {
        return this._actionHandler;
    }

    getData() {
        return this._data;
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

    toString() {
        return {
            "div": this._div,
            "actionHandler": this._actionHandler,
            "data": this._data
        };
    }


 }
