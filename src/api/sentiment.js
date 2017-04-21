/**
 *
 * Sentimental analysis module. all it does
 * is it gets the text and then returns back
 * the results. No specific social media type
 * should be passed
 *
 */

const retext = require('retext');
const inspect = require('unist-util-inspect');
const sentiment = require('retext-sentiment');
const R = require('ramda');

const Sentiment = (function(sentiment){
    this.sentment = sentiment;

    function processString(string) {
        return new Promise((res, rej) => {
            retext()
                .use(sentiment)
                .use(function() {
                    return function transformer(tree) {
                        // console.log(inspect(tree));
                        // console.log(tree);
                        if(!tree)
                            rej(new Error('Couldn\'t get the sentiment results.'));
                        res(tree);
                    }
                })
                .processSync(string)
        });
    };

    function parseSentiment(sentimentTree) {
        return new Promise((res, rej) => {
            if(sentimentTree) {
                res(sentimentTree);
            } else {
                rej(sentimentTree);
            }
        });
    };

    return {
        processString: processString,
        parseSentiment: parseSentiment
    };

})(sentiment);

const randomString ='I hate forgetting to bring a book somewhere I ' +
                    'definitely should have brought a book to. '

                    'This product is not bad at all. ' +
                    /*
                     * Emoji.
                     */
                    'Hai sexy! \ud83d\ude0f'

// Sentiment
//     .processString(randomString)
//     .then((data) => Sentiment.parseSentiment(data))
//     .then((parsedData) => console.log('Reached the promise', inspect(parsedData)));
    // .catch((err) => console.log('Error', err));

module.exports = Sentiment;
