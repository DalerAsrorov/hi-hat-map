/*eslint no-undef: "off"*/

import Chart from '../classes/chart';

const chart = new Chart();

export function getSotedData(panelComponent, ascending = true, limit = 0) {
    let data;

    if (ascending) {
        data = R.sortBy(R.prop(objectKey), this._data);
    } else {
        const descComparator = R.comparator((a, b) =>
            R.gt(R.prop(objectKey, a), R.prop(objectKey, b))
        );
        data = R.sort(descComparator, this._data);
    }

    return data;
}

export function sortData(ascending = true) {}

export function getTopData(panelComponent, limit, ascending = true) {
    // const data = ascending ? getSotedData(panelComponent, ascending, panelComponent).splice(limit);
    const data = null;
    return data;
}

export function getTopDataOn(panelComponent, limit, ascending = true, query) {}

export function formatData(panelComponent, fn) {
    fn(panelComponent._data);
}

export function createSentimentDataForChart(
    data,
    currentChartType = 'multiple'
) {
    const sentiment = data.sentiment;
    let result;

    switch (currentChartType) {
    case 'multiple':
        result = chart.structureData(sentiment);
        break;
    default:
        throw new Error('No graph type was selected.');
    }

    return result;
}
