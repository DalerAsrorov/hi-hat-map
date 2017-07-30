import { COLORS } from './constants';

export function getType(object) {
    return Object.prototype.toString.call(object);
}

export function titleCase(str) {
    const escapeReg = s => s.replace(/./g, c => `\\${c}`);
    let wordPattern = new RegExp(`[^${escapeReg(' _-¡¿/')}]+`, 'g');
    let result = str.replace(wordPattern, capitalize);

    return result;
}

export function execWithTimeout(callback, time, selector = '') {
    setTimeout(callback, time);
}

export function execWithInterval(callback, time, selector = '') {
    setInterval(callback, time);
}

export function capitalize(str) {
    if (str.length) {
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    } else {
        return '';
    }
}

export function performActionOnDQueue(dQueue, callback) {
    while (!dQueue.isEmpty()) {
        callback(dQueue.getFront());
        dQueue.dequeue();
    }
}

export function inspectCSSClass(className, prop) {
    let property = '';
    const $inspector = $('<div>').css('display', 'none').addClass(className);
    $('body').append($inspector);

    try {
        property = $inspector.css(prop);
    } finally {
        $inspector.remove();
    }

    return property;
}

export function wrappObject(object, objectKey) {
    return {
        objectKey: object
    };
}

// const tempWords = [
//     {
//         text: 'Bingo!',
//         size: 32,
//         color: '#FF00FF'
//     },
//     {
//         text: 'word',
//         size: 42,
//         color: '#2F4070'
//     }
// ];
export function convertMapToWordcloudDataStructure(iterable) {
    const sizeIncrease = 20;
    let dataStructure = [];

    iterable.forEach((props, word) =>
        dataStructure.push({
            text: word,
            size: props.freq * sizeIncrease,
            color: colorGenerator(props.score)
        })
    );

    return dataStructure;
}

export function colorGenerator(score) {
    const { SENTIMENT: { POSITIVE }, SENTIMENT: { NEGATIVE } } = COLORS;

    const scoreIndex = Math.abs(score);
    let result = POSITIVE[scoreIndex];

    if (score < 0) {
        result = NEGATIVE[scoreIndex];
    }

    return result;
}

// "xx:xx:xx" format
export function formatDateToHoursOnly(x) {
    const xLocaleString = x.toLocaleString();
    const xFinal = xLocaleString.substring(xLocaleString.indexOf(',') + 1, xLocaleString.length).trim();

    return xFinal;
}
