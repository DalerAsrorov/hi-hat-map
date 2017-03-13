
export function execWithTimeout(callback, time, selector="") {
    setTimeout(callback, time);
}

export function execWithInterval(callback, time, selector="") {
    setInterval(callback, time)
}