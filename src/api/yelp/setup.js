const _send = require('@tonybadguy/call-me-maybe');

const BASE = 'https://api.yelp.com';
const BASE_V3_URL = `${BASE}/v3`;
const OAUTH_URL = `${BASE}/oauth2/token`;

const APP_PARAMS = {
    grant_type: 'client_credentials',
    client_id: 'TtdxZywYg33t0-nhl0zVig',
    client_secret: 'XegowVnpX2PAX84SbXwo8m5g3q5amtkxnJfKHuElgIY7gUS1OEPR3hdemAJNW4cz'
};

const getAccessToken = () => {
    return new Promise((res, rej) => {
        _send({
            url: OAUTH_URL,
            method: 'post',
            urlencodedBody: APP_PARAMS
        })
			.then(response => {
    const { statusCode, jsonBody } = response;

    if (statusCode !== 200) {
        return rej(new Error('Response successfull, but data not available.'));
    }

    return res(jsonBody);
})
			.catch(error => {
    return rej(error);
});
    });
};

module.exports = {
    getAccessToken,
    BASE_V3_URL
};
