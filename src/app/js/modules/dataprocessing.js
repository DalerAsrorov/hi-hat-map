
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

export function sortData(ascending=true) {

}

export function getTopData(panelComponent, limit, ascending=true) {
    // const data = ascending ? getSotedData(panelComponent, ascending, panelComponent).splice(limit);
    const data = null;
    return data;
}

export function getTopDataOn(panelComponent, limit, ascending=true, query) {

}

export function formatData(panelComponent, fn) {
    fn(panelComponent._data);
}

export function createSentimentDataForChart(data) {
    const sentiment = data.sentiment;

    // {
    //     xs: {
    //         'negative': 'x1',
    //         'positive': 'x2',
    //         'neutral': 'x3'
    //     },

    //     columns: [
    //         ['x1', 10, 30, 45, 50, 70, 100],
    //         ['x2', 30, 50, 75, 100, 120],
    //         ['x3', 40, 60, 98, 125, 140],
    //         ['negative', 30, 200, 100, 400, 150, 250],
    //         ['positive', 20, 180, 240, 100, 190],
    //         ['neutral', 40, 73, 82, 112, 135]
    //     ]
    // }

}