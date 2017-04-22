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
const utils = require('./helpers/utils');
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
                        // console.log(utils.logTree(tree));
                        res(tree);
                    }
                })
                .processSync(string)
        });
    };

    function parseSentiment(sentimentTree) {
        return new Promise((res, rej) => {
            if(sentimentTree) {
                // getting total score and valence
                // from the root object -- result gathered
                // from all elements of the string
                const [totalScore, valence, rootChildren] = [
                    R.view(R.lensPath(['data', 'polarity']), sentimentTree),
                    R.view(R.lensPath(['data', 'valence']), sentimentTree),
                    R.view(R.lensPath(['children']), sentimentTree)
                ];

                const isParagraphNode = node => node.type === 'ParagraphNode';
                const isSentenceNode = node => node.type === 'SentenceNode';
                const isWordNode = node => node.type === 'WordNode';
                const getFirstChild = node => node.children[0];
                const getChildren = node => node.children;
                const getDataObject = (node) => node.data[0];

                debugger;
                const getChildrenNodes = R.pipe(
                    R.filter(isParagraphNode), // returns all ParagraphNodes
                    R.map(getChildren), // returns Paragraph Node's children
                    R.flatten(),
                    R.filter(isSentenceNode), // gets all the SentenceNodes
                    R.map(getChildren) //
                    R.tap(console.log)
                );

                const result = getChildrenNodes(rootChildren);


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

const randomString ='I hate forgetting to bring a book somewhere I' +
                    'definitely should have brought a book to. '

                    'This product is not bad at all. ' +
                    /*
                     * Emoji.
                     */
                    'Hai sexy! \ud83d\ude0f';

  Sentiment
    .processString(randomString)
    .then((data) => Sentiment.parseSentiment(data))
    // .then((parsedData) => utils.wrapWithObject('data', parsedData))
    // .then((wrappedData) => utils.addMetaDataTo(wrappedData))
    // .then((objectWithMetadata) => console.log(utils.logTree(objectWithMetadata)))
    .catch((err) => console.log('Error', err));

module.exports = Sentiment;
