let ntwitter = require('ntwitter');
let Twit = require('twit');
let https = require('https');
let twitterHelper = require('./helpers/twitter-helper');

const twitConfig = {
        consumer_key: twitterHelper.twitterTokens.getConsumerKey(),
        consumer_secret: twitterHelper.twitterTokens.getConsumerSecret(),
        access_token: twitterHelper.twitterTokens.getAccessTokenKey(),
        access_token_secret: twitterHelper.twitterTokens.getAccessTokenSecret()
    },
    ntwitterConfig = {
        consumer_key: twitterHelper.twitterTokens.getConsumerKey(),
        consumer_secret: twitterHelper.twitterTokens.getConsumerSecret(),
        access_token_key: twitterHelper.twitterTokens.getAccessTokenKey(),
        access_token_secret: twitterHelper.twitterTokens.getAccessTokenSecret()
    };

let T = new Twit(twitConfig);
let twitter = new ntwitter(ntwitterConfig);

module.exports = {

    // base module used for streaming
    module: twitter,

    // get the trends based on geo-location
    // weid represents the location ID
    getTrends: function getTrends(woeid) {
        return new Promise((resolve, reject) => {
            T.get('trends/place', {id: woeid}, (err, data) => {
                if(typeof data === 'undefined') {
                    // console.log("ERROR", data, err);
                    reject(err);
                } else {
                    resolve(data);
                    // console.log("TRENDS:", data);
                    // let trends = data[0].trends;
                    // let locations = data[0].locations;
                    // console.log("\nTrends: \n", trends, "\n");
                    // console.log("\nLocations: \n", locations, "\n");
                }
            });
        });
    }

}

