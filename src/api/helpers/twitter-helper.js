module.exports = {
    twitterTokens: (function() {
        const consumer_key = process.env.TWITTER_CONSUMER;
        const consumer_secret = process.env.TWITTER_CONSUMER_SECRET;
        const access_token_key = process.env.TWITTER_ACCESS_TOKEN;
        const access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

        function getConsumerKey() {
            return consumer_key;
        }

        function getConsumerSecret() {
            return consumer_secret;
        }

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
};
