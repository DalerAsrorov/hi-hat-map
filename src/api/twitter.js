let ntwitter = require('ntwitter');
let https = require('https');

let twitterTokens = (function() {

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

let twitter = new ntwitter(twitterTokens.tokens);


module.exports = {

    // base module used for streaming
    module: twitter,

    getTrends: function getTrends() {
        const accessTokens = {
          consumerKey: twitterTokens.getConsumerKey(),
          consumerSecretKey: twitterTokens.getConsumerSecret()
        };

        console.log("Laucnhed: getTrends():", accessTokens);
    }

}

