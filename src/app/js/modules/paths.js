

export function getTrendsPath(weid) {
    return `${window.location.origin}/api/twitter/trends/${weid}`;
}

export function getGeoTrends(latLongString) {
    return `${window.location.origin}/api/twitter/geotrends/${latLongString}`;
}