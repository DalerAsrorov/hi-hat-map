

export function getParameter(sentiment, wordType, parameter) {
    return sentiment[wordType].map(data => data[parameter]);
}
