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

    it('addMetaDataPromise adds params key to a new object', () => {
        expect(addMetaDataPromise).to.eventually.have.property('params');
    });
});
