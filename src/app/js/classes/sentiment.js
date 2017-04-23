
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

    processText(sentimentInput) {
        return new Promise((res, req) => {
            postRequest(getSentimentTextAnalysis(), sentimentInput)
            .then((data) => {
                console.log(`Sentiment.processText(), ${getSentimentTextAnalysis()}`, '\n', data);
                res(data);
            });
        });
    }

    get id() {
        return this[id];
    }

    set id(id) {
        this[id] = id;
    }
}