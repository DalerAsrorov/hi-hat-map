/*eslint no-undef: "off"*/

const utils = require('../../../../api/helpers/utils');
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');

chai.use(chaiAsPromised);

let expect = chai.expect;

describe('Testing utils module in api', () => {
    const sampleObject = {
        name: 'Daler',
        city: 'SF'
    };

    const sampleParams = {
        year: '2017'
    };

    const addMetaDataPromise = utils.addMetaDataTo(sampleObject, sampleParams);

    it('addMetaDataTo method returns a Promise', () => {
        return expect(addMetaDataPromise).to.be.a('promise');
    });

    it('addMetaDataTo method promise resolves with an object', () => {
        return expect(addMetaDataPromise).to.eventually.be.an('object');
    });

    it('addMetaDataTo adds metadata key to a new object', () => {
        return expect(addMetaDataPromise).to.eventually.have.property('metadata');
    });

    it('addMetaDataTo includes passed params: name', () => {
        return expect(addMetaDataPromise).to.eventually.have.property('name');
    });

    it('addMetaDataTo includes passed params: city', () => {
        return expect(addMetaDataPromise).to.eventually.have.property('city');
    });

    it('wrapWithObject returns a promise', () => {
        const key = 'theKey';

        return expect(utils.wrapWithObject(key, sampleObject)).to.be.a('promise');
    });

    it('wrapWithObject promise resolvse with an object that includes the passed in key', () => {
        const key = 'theKey';

        return expect(utils.wrapWithObject(key, sampleObject)).to.eventually.include.keys(key);
    });
});
