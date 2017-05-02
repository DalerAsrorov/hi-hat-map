

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
};

export function wrappObject(object, objectKey) {
  return {
    objectKey: object
  };
};

