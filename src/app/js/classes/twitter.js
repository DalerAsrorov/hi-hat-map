import Mode from './mode.js';
import * as Request from '../modules/request.js';
import R from 'ramda';
import Sentiment from './sentiment.js';

const sentiment = new Sentiment('twitter');

export default class Twitter extends Mode {

    constructor(name) {
        super(name);
    }

    socketEmit(socket, channel, params) {
        socket.emit(channel, params);
    }

    getData(url, twitData) {
        return new Promise((res, rej) => {
            Request.postRequest(url, twitData)
            .then((data) => {
                res(data);
            })
            .catch((err) => {
                rej(err);
            });
        });
    }

    processData(tweets, metadata) {
        const hasGeo = (tweet) => !R.isNil(tweet.place);
        const getRequredData = (tweet) => {
            return {
                text: tweet.text,
                created_at: tweet.created_at,
                geo: tweet.place.bounding_box.coordinates[0][0], // [lat, long]
                location: tweet.place.full_name + ', ' + tweet.place.country,
                profileImage: tweet.user.profile_image_url || 'no-image',
                name: tweet.user.name,
                username: tweet.user.screen_name,
            };
        }

        const filteredTweetsList = R.pipe(
            R.filter(hasGeo),
            R.map(getRequredData),
        )(tweets);
        console.log('filteredTweetsList', filteredTweetsList);

        const results = [];
        return new Promise((res, req) => {
            filteredTweetsList.map(function(data) {
                sentiment.processText({text: data.text})
                .then(function(sentiment) {
                    return new Promise((res, rej) => {
                        res({sentiment: sentiment, data: data});
                    })
                })
                .then(function(data) {
                    console.log(data);
                });
            });
        });

        // return result;
    }
}