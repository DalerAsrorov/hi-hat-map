const _send = require('@tonybadguy/call-me-maybe');
const setup = require('./setup');
const cache = require('memory-cache');

const { getAccessToken, BASE_V3_URL } = setup;

// getAccessToken().then(data => console.log('works', data));
const Yelp = (function() {
    const tempAccessToken =
        '6eJjO8MyHbd-wGHruAg_qEuY6sOQr1w14TKJ1s2CAkTXJb_famWPnQ_oMqnGDj06U-K77tPQaOohl2YXzU0coHjn8WzIoRbk0cJoHmgu45b-7JPSzvSKigpdsV2NWXYx';
    const accessTokenKey = 'accessToken';
    let accessTokenCache = new cache.Cache();
    let businessesCache = new cache.Cache();

    const BUSINESS_BASE = `${BASE_V3_URL}/businesses`;
    const BUSINESS_SEARCH = () => `${BUSINESS_BASE}/search`;
    const RATINGS_SEARCH = businessID => `${BUSINESS_BASE}/${businessID}/reviews`;

    function init() {
        return new Promise((resolve, reject) => {
            if (!accessTokenCache.get('accessToken')) {
                // getAccessToken()
                //     .then(tokenStruct => {
                //         const { access_token } = tokenStruct;
                //         accessTokenCache.put(accessTokenKey, access_token);
                //         resolve();
                //     })
                //     .catch(err => reject(err));
                accessTokenCache.put(accessTokenKey, tempAccessToken);
            }
            resolve();
        });
    }

    function searchBusiness(params) {
        return _send({
            url: BUSINESS_SEARCH(),
            query: params,
            bearerToken: accessTokenCache.get(accessTokenKey)
        }).then(response => response.jsonBody);
    }

    function searchRatings(businessID) {
        return _send({
            url: RATINGS_SEARCH(businessID),
            bearerToken: accessTokenCache.get(accessTokenKey)
        }).then(response => response.jsonBody);
    }

    return {
        init,
        searchBusiness,
        searchRatings
    };
})();

module.exports = Yelp;
