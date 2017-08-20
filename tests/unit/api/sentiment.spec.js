/*eslint no-undef: "off"*/
'use strict';

const Sentiment = require('../../../api/sentiment');
const chai = require('chai');

chai.use(require('chai-as-promised'));

let expect = chai.expect;

describe('Testing sentiment module in api', () => {
    const { processText, parseSentiment } = Sentiment;
    const sampleEmotionalText = 'I love spending great time with the best friends, too great but bad luck.';

    const processTextPromise = processText(sampleEmotionalText);

    it('processText method returns a promise', () => {
        return expect(processTextPromise).to.be.a('promise');
    });

    it('processText promise returns a valid object', () => {
        return expect(processTextPromise).to.eventually.be.an('object').that.is.not.empty;
    });

    it('processText outputs a sentiment tree with root node', () => {
        return expect(processTextPromise).to.eventually.have.deep.property('type', 'RootNode');
    });

    it('processText outputs a sentiment tree with children', () => {
        return expect(processTextPromise).to.eventually.have.deep.property('children').that.is.an('array').that.is.not
            .empty;
    });

    it('processText tree returns proper data object with formatted values', () => {
        return expect(processTextPromise).to.eventually.have.deep
            .property('data')
            .that.is.an('object')
            .that.has.keys('polarity', 'valence');
    });

    it('processText tree returns proper data object with polarity', () => {
        return expect(processTextPromise).to.eventually.have.deep
            .property('data')
            .that.has.deep.property('polarity')
            .that.is.a('number');
    });

    it('processText tree returns proper data object with valence', () => {
        return expect(processTextPromise).to.eventually.have.deep
            .property('data')
            .that.has.deep.property('valence')
            .that.is.a('string');
    });

    it('parseSentiment method returns a promise', () => {
        return processTextPromise.then(sentimentTree => {
            return expect(parseSentiment(sentimentTree)).to.be.a('promise');
        });
    });
});
