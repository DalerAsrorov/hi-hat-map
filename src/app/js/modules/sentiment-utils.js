import { compose, reduce, zip } from 'ramda';

export function getParameter(sentiment, wordType, parameter) {
    return sentiment[wordType].map(data => data[parameter]);
}

export function buildWordPolarityMap(data) {
    const { words, polarities } = data;

    const computeSentScores = (acc, item) => {
        const word = item[0];
        const score = item[1];

        if (!acc[word]) {
            acc[word] = [score];
        } else {
            acc[word] = [...acc[word], score];
        }

        return acc;
    };

    return compose(reduce(computeSentScores, {}), zip(words))(polarities);
}
