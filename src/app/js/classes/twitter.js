import Mode from './mode.js';
import Sentiment from './sentiment.js';
import * as Request from '../modules/request.js';
import { stopTwitterStream } from '../modules/paths';
import R from 'ramda';


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

    processSingle(tweet) {
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
        };

        const filteredTweetsList = R.pipe(
            R.filter(hasGeo),
            R.map(getRequredData)
        )(tweets);

        return filteredTweetsList;
    }

    stopStream() {
        Request.postRequest(stopTwitterStream(), {stop: true})
        .then((data) => {
            const streamIsOff = data.status;

            if (streamIsOff) {
                console.log('Stream is off!');
            }
        });

    }
}
