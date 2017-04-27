import Mode from './mode.js';
import * as Request from '../modules/request.js';
import R from 'ramda';

export default class Twitter extends Mode {
    constructor(name) {
        super(name);
    }

    socketEmit(socket, channel, params) {
        socket.emit(channel, params);
    }

    getData(url, twitData) {
        return new Promise((res, rej) => {
            Request.postRequest(url, twitData)
            .then((data) => {
                res(data);
            })
            .catch((err) => {
                rej(err);
            });
        });
    }

    processData(tweets, metadata) {
        const hasGeo = (twit) => !R.isNil(twit.place);

        const result = R.pipe(
            R.filter(hasGeo),
            R.tap(console.log)
        )(tweets);


        return result;
    }
}