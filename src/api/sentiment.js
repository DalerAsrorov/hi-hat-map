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

    return {
        processString: processString
    };

})(sentiment);

// const randomString ='I hate forgetting to bring a book somewhere I ' +
//                     'definitely should have brought a book to. ' +

//                      * Note that `bad` is a negative word, but that it's
//                      * classified as positive due to its preceding `not`
//                      * on parent (sentence, paragraph, root) level.

//                     'This product is not bad at all. ' +
//                     /*
//                      * Emoji.
//                      */
//                     'Hai sexy! \ud83d\ude0f'

// Sentiment
//     .processString(randomString)
//     .then((data) => console.log(inspect(data)))
//     .catch((err) => console.log('Error', err));

module.exports = Sentiment;
