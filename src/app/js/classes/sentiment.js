
/*=============================================
=            Sentiment class             =
Makes requests to the sentiment API and does
additional processing of the sentiment if needed.
=============================================*/

/*=====  Sentiment Class source  ======*/

import { getRequest, postRequest } from '../modules/request.js';
import { getSentimentTextAnalysis } from '../modules/paths.js';


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
        return new Promise((res, req) => {
            postRequest(getSentimentTextAnalysis(), sentimentInput)
            .then((data) => {
                res(data);
            });
        });
    }
}