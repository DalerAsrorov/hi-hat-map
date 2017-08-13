const origin = window.location.origin;

export function getTrendsPath(weid) {
    return `${origin}/api/twitter/trends/${weid}`;
}

export function getGeoTrends(latLongString) {
    return `${origin}/api/twitter/geotrends/${latLongString}`;
}

export function getTwitData() {
    return `${origin}/api/twitter/twitdata`;
}

export function getSentimentTextAnalysis() {
    return `${origin}/api/sentiment/evaluatestring`;
}

export function stopTwitterStream() {
    return `${origin}/api/twitter/stream/stop`;
}

export function searchYelpBusiness(id) {
    return `${origin}/api/yelp/business/${id}`;
}

export function searchYelpBusinessReviews(id) {
    return `${origin}/api/yelp/reviews/${id}`;
}
