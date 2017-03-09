

export function getSotedData(panelComponent, ascending=true, limit=0) {
    let data;

    if(ascending) {
        data = R.sortBy(R.prop(objectKey), this._data);
    } else {
        const descComparator = R.comparator((a, b) => R.gt(R.prop(objectKey, a), R.prop(objectKey, b)));
        data = R.sort(descComparator, this._data);
    }

    return data;
}

export function getTopData(panelComponent, limit, ascending=true) {
    const data = ascending ? getSotedData(panelComponent, ascending, panelComponent).splice(limit);
    return data;
}

export function getTopDataOn(panelComponent, limit, ascending=true, query) {

}

export function formatData(panelComponent, fn) {
    fn(panelComponent._data);
}