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
        return new Promise(function (resolve, reject) {
            console.log("woeid, ", woeid);

            T.get('trends/place', {id: woeid}, function (err, data) {
                if(!data) {
                    // console.log("ERROR", data, err);
                    reject(err);

                } else {
                    console.log("Data", data);
                    resolve(data);
                    // console.log("TRENDS:", data);
                    // let trends = data[0].trends;
                    // let locations = data[0].locations;
                    // console.log("\nTrends: \n", trends, "\n");
                    // console.log("\nLocations: \n", locations, "\n");
                }
            });
        });
    },

    getClosest: function(lat, long) {
        // Test: San Francisco = 37.773972, -122.431297.
        lat = lat.trim();
        long = long.trim(long);
        console.log("REACHED");

        function isNumber(number) {
            return parseFloat(number) === Number(number);
        };

        // const tempLat = parseInt(lat);
        // const tempLong = parseInt(long);
        console.log(lat);
        console.log(long);
        console.log("Not a number", (isNumber(lat)) && isNumber(long));
        if((isNumber(lat)) && isNumber(long)) {
            return new Promise((resolve, reject) => {
                let latNumber = parseInt(lat);
                let longNumber = parseInt(long);
                T.get('trends/closest', {lat: latNumber, long: longNumber},
                    function(err, data) {
                        if(data) {
                            resolve(data);
                        } else {
                            reject("Error:::", err);
                        }
                    }
                );
            });

        }
        else {
            console.log("Passed strings cannot be converted to number.", lat, long);
        }
    },

    getTwitData: function(query, geocode, radius, count, since_id, max_id) {
        console.log(arguments);
        var params = {
            q: `${query}`,
            geocode: geocode.join(',').toString().concat(`,${radius}`),
            count: count ? count : 100,
            since_id: since_id ? since_id : '',
            max_id: max_id ? max_id : ''
        };
        console.log('params given', params);
        return new Promise((res, rej) => {
            T.get('search/tweets', params, (err, data) => {
                console.log('Received data getTwitData', data);
            });
        });
    }
}

