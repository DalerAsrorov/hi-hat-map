
export function execWithTimeout(callback, time) {
    setTimeout(callback, time);
}

export function execWithInterval(callback, time) {
    setInterval(callback, time)
}