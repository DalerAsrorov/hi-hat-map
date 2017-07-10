

export function getType(object) {
    return Object.prototype.toString.call(object);
}

export function titleCase(str) {
    const escapeReg = s => s.replace(/./g, c => `\\${c}`);
    let wordPattern = new RegExp(`[^${escapeReg(' _-¡¿/')}]+`, 'g');
    let result = str.replace(wordPattern, capitalize);

    return result;
};

export function execWithTimeout(callback, time, selector="") {
    setTimeout(callback, time);
};

export function execWithInterval(callback, time, selector="") {
    setInterval(callback, time)
};

export function capitalize(str) {
    if (str.length) {
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    } else {
        return '';
    }
}

export function inspectCSSClass(className, prop) {
    let property = '';
    const $inspector = $('<div>')
                        .css('display', 'none')
                        .addClass(className);
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
    }
}

// "xx:xx:xx" format
export function formatDateToHoursOnly(x) {
    const xLocaleString = x.toLocaleString();
    const xFinal = xLocaleString.substring(xLocaleString.indexOf(',') + 1, xLocaleString.length).trim();

    return xFinal;
}
