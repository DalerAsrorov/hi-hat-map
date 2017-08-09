/*eslint no-undef: "off"*/

const utils = require('../../../../api/helpers/utils');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.use(chaiAsPromised);

let expect = chai.expect;

const sampleObject = {
    name: 'Daler',
    city: 'SF'
};

const sampleParams = {
    year: '2017'
};

const addMetaDataPromise = utils.addMetaDataTo(sampleObject, sampleParams);

describe('Testing utils module in api', () => {
    it('addMetaDataTo method should return Promise', () => {
        expect(addMetaDataPromise).to.be.a('promise');
    });

    it('addMetaDataTo method promise should resolve with an object', () => {
        expect(addMetaDataPromise).to.eventually.be.an('object');
    });

    it('addMetaDataTo should add metadata key to a new object', () => {
        expect(addMetaDataPromise).to.eventually.have.property('metadata');
    });

    it('addMetaDataTo should include passed params', () => {
        expect(addMetaDataPromise).to.eventually.have.property('name');
        expect(addMetaDataPromise).to.eventually.have.property('city');
    });

    it('wrapWithObject should return a promise', () => {
        const key = 'theKey';

        expect(utils.wrapWithObject(key, sampleObject)).to.be.a('promise');
    });

    it('wrapWithObject promise should resolve withan object with a given key', () => {
        const key = 'theKey';

        expect(utils.wrapWithObject(key, sampleObject)).to.eventually.include.keys(key);
    });
});
