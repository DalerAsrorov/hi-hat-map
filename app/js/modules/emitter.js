import mitt from 'mitt';

let Emitter = mitt();

export const { on, off, emit } = Emitter;
