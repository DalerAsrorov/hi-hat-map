/*eslint no-undef: "off"*/
'use strict';

const setup = require('../../../../api/twitter/setup');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.use(chaiAsPromised);

let expect = chai.expect;

describe.only('Testing Setup module in Twitter API', () => {
    const { twitterTokens } = setup;

    it('it is an object that contains twitterTokens object', () => {
        return expect(setup).to.be.an('object').keys('twitterTokens');
    });

    it('it contains twitterToken which is not empty', () => {
        return expect(twitterTokens).to.be.an('object').that.is.not.empty;
    });

    it('it contains a set of access functions', () => {
        const keys = ['getConsumerKey', 'getConsumerSecret', 'getAccessTokenKey', 'getAccessTokenSecret'];

        return expect(twitterTokens).to.be.an('object').keys(keys);
    });

    it('getConsumerKey returns a valid string', () => {
        const { getConsumerKey } = twitterTokens;
        return expect(getConsumerKey()).to.be.a('string').that.is.not.empty;
    });

    it('getConsumerSecret returns a valid string', () => {
        const { getConsumerSecret } = twitterTokens;
        return expect(getConsumerSecret()).to.be.a('string').that.is.not.empty;
    });

    it('getAccessTokenKey returns a valid string', () => {
        const { getAccessTokenKey } = twitterTokens;
        return expect(getAccessTokenKey()).to.be.a('string').that.is.not.empty;
    });

    it('getAccessTokenSecret returns a valid string', () => {
        const { getAccessTokenSecret } = twitterTokens;
        return expect(getAccessTokenSecret()).to.be.a('string').that.is.not.empty;
    });
});
