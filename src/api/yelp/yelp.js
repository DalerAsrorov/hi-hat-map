const _send = require('@tonybadguy/call-me-maybe');
const setup = require('./setup');
const cache = require('memory-cache');

const { getAccessToken, BASE_V3_URL } = setup;

// getAccessToken().then(data => console.log('works', data));
const Yelp = (function() {
    const businessSearch = `${BASE_V3_URL}/businesses/search`;
    const tempAccessToken =
        '6eJjO8MyHbd-wGHruAg_qEuY6sOQr1w14TKJ1s2CAkTXJb_famWPnQ_oMqnGDj06U-K77tPQaOohl2YXzU0coHjn8WzIoRbk0cJoHmgu45b-7JPSzvSKigpdsV2NWXYx';
    let accessTokenCache = new cache.Cache();
    let businessesCache = new cache.Cache();

    function init() {
        if (!accessTokenCache.get('accessToken')) {
            console.log('Cache is empty');
            // getAccessToken().then(tokenStruct => {
            //     const { access_token } = tokenStruct;
            //     this.accessToken = access_token;
            // });
            accessTokenCache.put('accessToken', tempAccessToken);
        }
        this.accessToken = accessTokenCache.get('accessToken');
    }

    function searchBusiness(params) {
        return _send({
            url: businessSearch,
            query: params,
            bearerToken: this.accessToken
        }).then(response => response.jsonBody);
    }

    return {
        init,
        searchBusiness
    };
})();

const TEST_PARAMS = {
    term: 'shop',
    latitude: 37.773972,
    longitude: -122.431297
};

// Yelp.init();
// setTimeout(() => {
//     Yelp.searchBusiness(TEST_PARAMS).then(data => {
//         console.log('The data, ');
//         console.log(data);
//     });
// }, 1000);

module.exports = Yelp;
