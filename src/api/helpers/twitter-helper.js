

module.exports = {
    twitterTokens: (function() {
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
            getAccessTokenSecret: getAccessTokenSecret
        };
    })()
}