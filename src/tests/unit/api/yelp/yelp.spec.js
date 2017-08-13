/*eslint no-undef: "off"*/
'use strict';

const Yelp = require('../../../../api/yelp/yelp');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.use(chaiAsPromised);

let expect = chai.expect;

describe('Testing api', () => {
    const TEST_BUSINESS_PARAMS = {
        term: 'shop',
        latitude: 37.773972,
        longitude: -122.431297
    };
    const businessID = 'life-san-francisco';

    beforeEach(done => {
        Yelp.init();

        setTimeout(() => {
            done();
        }, 1000);
    });

    it('init method returns a promise', () => {
        return expect(Yelp.init()).to.be.a('promise');
    });

    it('searchBusinesses method exists', () => {
        return expect(Yelp.searchBusinesses).to.be.a('function');
    });

    it('searchBusinesses returns a promise resolves with an object with list of businesses', () => {
        const myKeys = ['region', 'total', 'businesses'];
        const propertyName = 'businesses';

        return expect(Yelp.searchBusinesses(TEST_BUSINESS_PARAMS)).to.be
            .a('promise')
            .that.eventually.has.keys(myKeys)
            .and.has.property(propertyName)
            .that.is.an('array').that.is.not.empty;
    });

    it('searchRartings method exists', () => {
        return expect(Yelp.searchRatings).to.be.a('function');
    });

    it('searchRartings returns a promise with an object with list of reviewes with length equal to 3', () => {
        expect(Yelp.searchRatings(businessID)).to.eventually.have
            .property('reviews')
            .that.is.an('array')
            .to.have.lengthOf(3);
    });

    it('searchBusiness method exists', () => {
        return expect(Yelp.searchBusiness).to.be.a('function');
    });

    it('searchBusiness returns a promise with a business object that includes rating prop', () => {
        return expect(Yelp.searchBusiness(businessID)).to.eventually.be.an('object').that.has.property('rating').and
            .that.is.not.empty;
    });
});
