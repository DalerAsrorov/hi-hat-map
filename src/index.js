'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let ramda = require('ramda');
let httpServer = require('http').createServer(app);
let io = require('socket.io')(httpServer);
const url = require('url');

// modules
const Sentiment = require('./api/sentiment');
const Twitter = require('./api/twitter');
const utils = require('./api/helpers/utils');

let port = process.env.PORT || 8000;

// reference to Twitter stream object
let baseStream;

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/app'));
// app.use(express.static(__dirname + '/bower_components'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/index.html');
});

app.get('/api', (req, res) => {
    res.send({ app: 'hi-hat-map' });
});

/**
* woed - yahoo location IDs
* 1 = Worldwide trends
*/
app.get('/api/twitter/trends/:woeid?', (req, res) => {
    const woeid = req.params.woeid;
    Twitter.getTrends(woeid)
        .then(data => {
            res.send({
                requestDescription: 'List of trends.',
                requestTime: new Date().getTime(),
                data: data[0]
            });
        })
        .catch(error => {
            res.send({
                message: 'ERROR',
                details: error
            });
        });
});

/**
*   Given the latitude and longtitude, it finds the trends
*   of the country given
*/
app.get('/api/twitter/geotrends/:latAndLong?', (req, res) => {
    const latAndLongString = req.params.latAndLong.trim();
    const geoArray = latAndLongString.split(',');
    const lat = geoArray[0].trim();
    const long = geoArray[1].trim();

    if (geoArray.length === 2) {
        Twitter.getClosest(lat, long)
            .then(data => {
                const woeid = data[0].woeid;
                const name = data[0].name;
                const country = data[0].country;
                const countryCode = data[0].countryCode;

                Twitter.getTrends(woeid)
                    .then(data => {
                        res.send({
                            requestDescription: 'List of trends.',
                            requestTime: new Date().getTime(),
                            geo: {
                                woeid: woeid,
                                name: name,
                                country: country,
                                countryCode: countryCode
                            },
                            data: data[0]
                        });
                    })
                    .catch(error => {
                        res.send({
                            message: 'ERROR',
                            details: error
                        });
                    });
            })
            .catch(error => {
                consle.log('Error!', error);
            });
    }
});

/**
* Finding the closest location based on lat and long
* lat, long
*/
app.get('/api/twitter/place/:latAndLong?', (req, res) => {
    const latAndLongString = req.params.latAndLong.trim();
    const geoArray = latAndLongString.split(',');
    const lat = geoArray[0].trim();
    const long = geoArray[1].trim();

    if (geoArray.length === 2) {
        Twitter.getClosest(lat, long)
            .then(data => {
                res.send({
                    requestDescription: 'List of trends places.',
                    requestTime: new Date().getTime(),
                    data: data[0]
                });
            })
            .catch(error => {
                consle.log('Error!', error);
            });
    }
});

/**
 *
 * POST:
 * Function:
 * (location, topic, time, limit) => {tweets}
 *
 */
app.post('/api/twitter/twitdata', (req, res) => {
    let receivedData = req.body;

    const q = receivedData.q;
    const geocode = receivedData.geocode;
    const radius = receivedData.radius;
    const count = receivedData.count;
    const since_id = receivedData.since_id;
    const max_id = receivedData.max_id;

    Twitter.getTwitData(q, geocode, radius, since_id, max_id)
        .then(tweets => {
            res.send(tweets);
        })
        .catch(err => {
            console.log('Error /api/twitter/twitdata', err);
        });
});

app.post('/api/sentiment/evaluatestring', (req, res) => {
    const data = req.body;
    const method = req.method.toUpperCase();
    const text = data.text;
    const pathname = url.parse(req.url).pathname.toString();

    const params = {
        method: method,
        path: pathname,
        data: JSON.stringify(text)
    };

    Sentiment.processText(text)
        .then(data => Sentiment.parseSentiment(data))
        .then(parsedData => utils.wrapWithObject('sentiment', parsedData))
        .then(wrappedData => utils.addMetaDataTo(wrappedData, params))
        .then(finalData => res.send(finalData))
        .catch((err, status) => res.status(500).send(err));
});

app.post('/api/twitter/stream/stop', (req, res) => {
    const data = req.body;

    if (!baseStream) {
        return res.status(500).send({ error: 'There is no stream to stop.' });
    }

    baseStream.stop();
    return res.send({ status: true });
});

/**
*   socket.io stuff
*
**/
io.on('connection', function(socket) {
    socket.on('topic', info => {
        const topic = info.topic.toString().trim().toLowerCase();
        const location = info.location;

        console.log('location', topic, location);

        baseStream = Twitter.module.stream('statuses/filter', { locations: location, track: topic });

        baseStream.on('tweet', tweet => {
            socket.emit('tweet', tweet);
        });
    });
});

/**
*  Launching the server.
**/
httpServer.listen(port, function() {
    console.log('Listenning on port ' + port);
});
