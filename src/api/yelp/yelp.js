const _send = require('@tonybadguy/call-me-maybe');
const setup = require('./setup');

const { getAccessToken, BASE_V3_URL } = setup;

// getAccessToken().then(data => console.log('works', data));
const Yelp = (function() {
    const businessSearch = `${BASE_V3_URL}/businesses/search`;

    getBusinesses(params) {

    }

    return {
        getBusinesses
    }
})();


module.exports = Yelp; 