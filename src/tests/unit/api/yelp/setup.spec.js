/*eslint no-undef: "off"*/
'use strict';

const setup = require('../../../../api/yelp/setup');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.use(chaiAsPromised);

let expect = chai.expect;

describe('Testing setup in yelp api', () => {
    const { getAccessToken } = setup;

    it('getAccessToken returns a promise that is fulfilled', () => {
        return expect(getAccessToken()).to.eventually.be.fulfilled;
    });

    it('getAccessToken returns an object with an access token, berar, and days', () => {
        const keys = ['access_token', 'token_type', 'expires_in'];
        return expect(getAccessToken()).to.eventually.have.all.keys(keys);
    });
});
