import { ifElse, isEmpty, length, head } from 'ramda';

const isEmptyR = isEmpty;
const lengthR = length;

export default class DynamicQueue {
    constructor(array=[]) {
        this.queue = array;
    }

    isEmpty() {
        return isEmptyR(this.queue);
    }

    getFront() {
        const front = ifElse(
                            isEmptyR,
                            () => new Error('Empty queue.'),
                            head);

        return front(this.queue);
    }

    clear() {
        this.queue = [];
    }

    dequeue() {
        const removeFirst = ifElse(
            isEmptyR,
            () => new Error('The error'),
            () => this.queue.shift()
        );

        removeFirst(this.queue);
    }

    enqueue(element) {
        this.queue.push(element);
    }

    print() {
        return 'DynamicQueue: ' + this.queue;
    }

    size() {
        return lengthR(this.queue);
    }

    list() {
        return this.queue;
    }
}
