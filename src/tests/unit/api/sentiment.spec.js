/*eslint no-undef: "off"*/

const Sentiment = require('../../../api/sentiment');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.use(chaiAsPromised);

let expect = chai.expect;

describe('Testing sentiment module in api', () => {
    const { processText } = Sentiment;
    const sampleEmotionalText = 'I love spending great time with the best friends, too great but bad luck.';
    const processTextPromise = processText(sampleEmotionalText);

    processTextPromise.then(data => console.log(data));

    it('processText returns a promise', () => {
        expect(processTextPromise).to.be.a('promise');
    });

    it('processText promise returns a valid object', () => {
        expect(processTextPromise).to.eventually.be.an('object').that.is.not.empty;
    });

    it('processText outputs a sentiment tree with root node and children', () => {
        expect(processTextPromise).to.eventually.have.deep.property('type', 'RootNode');
        expect(processTextPromise).to.eventually.have.deep.property('children').that.is.an('array').that.is.not.empty;
    });
});
