/*eslint no-undef: "off"*/
'use strict';

const Twitter = require('../../../../api/twitter');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.use(chaiAsPromised);

let expect = chai.expect;

describe('Testing Twitter API', () => {
    const [lat, lng] = ['37.773972', '-122.431297'];
    const sanJose = {
        name: 'San Jose',
        placeType: { code: 7, name: 'Town' },
        url: 'http://where.yahooapis.com/v1/place/2488042',
        parentid: 23424977,
        country: 'United States',
        woeid: 2488042,
        countryCode: 'US'
    };
    const { woeid } = sanJose;

    it('it is an object that contains module Twitter', () => {
        return expect(Twitter).to.have.property('module').that.is.an('object');
    });

    it('its module has Twitter plugin module with key configs', () => {
        const twitterModule = Twitter.module;
        const keys = ['access_token', 'access_token_secret', 'consumer_secret', 'consumer_key'];
        return expect(twitterModule).to.be.an('object').that.has.property('config').that.has.keys(keys);
    });

    it('it has getClosest method that accepts 2 arguments - lat, lng', () => {
        return expect(Twitter.getClosest).to.be.a('function').to.have.lengthOf(2);
    });

    it('its method getClosest returns a Promise given lat and lng', () => {
        return expect(Twitter.getClosest(lat, lng)).to.be.a('promise');
    });

    it('its method getClosest Promise returns an object with a valid format', () => {
        const getClosestPromise = Twitter.getClosest(lat, lng);
        return expect(getClosestPromise).to.eventually.be.an('array').that.has.deep.members([sanJose]);
    });

    it('it has getTrends method that accepts 1 argument - woeid', () => {
        return expect(Twitter.getTrends).to.be.a('function').to.have.lengthOf(1);
    });

    it('Its method getTrends returns a Promise that contains a valid object', () => {
        return expect(Twitter.getTrends(woeid)).to.be.a('promise').that.eventually.to.be.an('array');
    });
});
