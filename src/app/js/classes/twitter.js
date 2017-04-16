import Mode from './mode.js';
import * as Request from '../modules/request.js'

export default class Twitter extends Mode {
    constructor(name) {
        super(name);
    }

    getData(url, twitData) {
        // url = Paths.getTwitData()
        return new Promise((res, rej) => {
            Request.postRequest(url, twitData)
            .then((data) => {
                res(data);
                console.log('Data returned from API', data);
            })
            .catch((err) => {
                rej(err);
            });
        });
    }
}