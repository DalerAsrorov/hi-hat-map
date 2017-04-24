
/*=============================================
=            Sentiment class             =
Makes requests to the sentiment API and does
additional processing of the sentiment if needed.
=============================================*/

/*=====  Sentiment Class source  ======*/

import { postRequest } from '../modules/request.js';
import { getSentimentTextAnalysis } from '../modules/paths.js';
import { isNil } from 'ramda';

export default class Sentiment {
    constructor(id) {
        this.id = id;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    processText(sentimentInput) {
        return new Promise((resolve, reject) => {
            postRequest(getSentimentTextAnalysis(), sentimentInput)
            .then((data) => {
                if(!isNil(data)) {
                    resolve(data);
                } else {
                    reject(new Error('Couldn\'t get sentiment. Sentiment object is ', data))
                }
            })
            .catch((err) => new Error(err));
        });
    }
}