

export function getTrendsPath(weid) {
    return `${window.location.origin}/api/twitter/trends/${weid}`;
}

export function getGeoTrends(latLongString) {
    return `${window.location.origin}/api/twitter/geotrends/${latLongString}`;
}

export function getTwitData() {
    return `${window.location.origin}/api/twitter/twitdata`;
}

export function getSentimentTextAnalysis() {
    return `${window.location.origin}/api/sentiment/evaluatestring`;
}

