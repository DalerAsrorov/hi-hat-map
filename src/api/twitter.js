let ntwitter = require('ntwitter');
let Twit = require('twit');
let https = require('https');

const twitterTokens = (function() {
    const consumer_key = 'okJxfpUfRePVfu8ju8for0rhM',
          consumer_secret = 'YIHZyIPUkgv4a2OsSrwhcF151qtMxkDq9PzhXnXGtIqL6k6WIl',
          access_token_key = '2243402142-wPicue620tYLLyQUEpvFrTVQCmOeBxHVyXeJtWl',
          access_token_secret = 'LBBWzPGlXUsdEAaOH9YW6B6503iHim1jmWcyhkIuVUsIq';

    function getConsumerKey() {
        return consumer_key;
    };

    function getConsumerSecret() {
        return consumer_secret;
    };

    function getAccessTokenKey() {
        return access_token_key;
    }

    function getAccessTokenSecret() {
        return access_token_secret;
    }

    return {
        getConsumerKey: getConsumerKey,
        getConsumerSecret: getConsumerSecret,
        getAccessTokenKey: getAccessTokenKey,
        getAccessTokenSecret: getAccessTokenSecret,
        tokens: {
            consumer_key: getConsumerKey(),
            consumer_secret: getConsumerSecret(),
            access_token_key: getAccessTokenKey(),
            access_token_secret: getAccessTokenSecret(),
        }
    };
})();

let T = new Twit({
    consumer_key: 'okJxfpUfRePVfu8ju8for0rhM',
    consumer_secret: 'YIHZyIPUkgv4a2OsSrwhcF151qtMxkDq9PzhXnXGtIqL6k6WIl',
    access_token: '2243402142-wPicue620tYLLyQUEpvFrTVQCmOeBxHVyXeJtWl',
    access_token_secret: 'LBBWzPGlXUsdEAaOH9YW6B6503iHim1jmWcyhkIuVUsIq'
});

let twitter = new ntwitter(twitterTokens.tokens);

module.exports = {

    // base module used for streaming
    module: twitter,

    getTrends: function getTrends(woeid) {
        T.get('trends/place', {id: 1}, (err,data) => {
            if(typeof data === 'undefined') {
                console.log("ERROR", data, err);
            } else {
                console.log("TRENDS:", data);
                let trends = data[0].trends;
                let locations = data[0].locations;
                console.log("\nTrends: \n", trends, "\n");
                console.log("\nLocations: \n", locations, "\n");
            }
        });
    }

}

