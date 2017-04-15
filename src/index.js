'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let ramda = require('ramda');
let httpServer = require('http').createServer(app);
let io = require('socket.io')(httpServer);

// custom modules
let Twitter = require('./api/twitter');

let port = process.env.PORT || 8000;

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname + '/app'));
// app.use(express.static(__dirname + '/bower_components'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/index.html')
});

app.get('/api', (req, res) => {
    // Twitter.stream("Daler");
    res.send({"Message": "You reached the API base."})
});

/**
* woed - yahoo location IDs
* 1 = Worldwide trends
*/
app.get('/api/twitter/trends/:woeid?', (req, res) => {
  const woeid = req.params.woeid;
  Twitter.getTrends(woeid)
    .then((data) => {
        res.send({
          "requestDescription": "List of trends.",
          "requestTime": new Date().getTime(),
          "data": data[0]
        });
    })
    .catch((error) => {
        res.send({
          "message": "ERROR",
          "details": error
        })
    });
});

/**
*   Given the latitude and longtitude, it finds the trends
*   of the country given
*/

app.get('/api/twitter/geotrends/:latAndLong?', (req, res) => {
    const latAndLongString = req.params.latAndLong.trim();
    const geoArray = latAndLongString.split(",");
    const lat = geoArray[0].trim();
    const long = geoArray[1].trim();

    console.log("GEO:",lat, ',', long);

    if(geoArray.length === 2) {
        Twitter.getClosest(lat, long)
            .then((data) => {
                const woeid = data[0].woeid;
                const name = data[0].name;
                const country = data[0].country;
                const countryCode = data[0].countryCode;

                Twitter.getTrends(woeid)
                    .then((data) => {
                        console.log("THE DATA:", data);
                        res.send({
                          "requestDescription": "List of trends.",
                          "requestTime": new Date().getTime(),
                          "geo": {
                              "woeid": woeid,
                              "name": name,
                              "country": country,
                              "countryCode": countryCode,
                          },
                          "data": data[0]
                        });
                    })
                    .catch((error) => {
                        res.send({
                          "message": "ERROR",
                          "details": error
                        })
                    });
            })
            .catch((error) => {
                consle.log("Error!", error);
            });
  }
});


/**
* Finding the closest location based on lat and long
* lat, long
*/
app.get('/api/twitter/place/:latAndLong?', (req,res) =>  {
  const latAndLongString = req.params.latAndLong.trim();
  const geoArray = latAndLongString.split(",");
  const lat = geoArray[0].trim();
  const long = geoArray[1].trim();

  if(geoArray.length === 2) {
    Twitter.getClosest(lat, long)
        .then((data) => {
            res.send({
              "requestDescription": "List of trends places.",
              "requestTime": new Date().getTime(),
              "data": data[0]
            });
        })
        .catch((error) => {
            consle.log("Error!", error);
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

    console.log('POST req.body', req.body);
    console.log('POST /api/twitter/twitdata: ', receivedData);
    res.send(receivedData);
 });

// app.get('/api/:topic?', function(req, res) {
//     let tweet = req.params.topic;

//     let sanFrancisco = [ '-122.75, 36.8, -121.75, 37.8'];

//     try
//     {
//         Twitter.module.stream('statuses/filter', {'locations': sanFrancisco },
//             function(stream) {
//                 stream.on('data', function(data) {
//                   // let coordinates = tweet.place.bounding_box.coordinates;
//                   // stream.on('data', function(data) {
//                   // io.sockets.emit('tweet', data);
//                     console.log(data);

//                   // });

//                   // stream.on('destroy', function() {
//                   //     console.log("Disconnected from Twitter.");
//                   // });

//                 });

//             }
//         );
//     }
//     catch(err)
//     {
//         console.log("Couldn't stream yet...", err);
//     }

//     console.log(tweet);
// });


/**
*   socket.io stuff
*
**/

io.on('connection', (socket) => {
    socket.on('topic', (info) => {
        // console.log("\nTOPIC: ", topic, "\n");
        const topicStr = info.topic.toString();
        const location = info.location;

        console.log('location', topicStr, location);

        Twitter.module.stream('statuses/filter', {'locations': location },
            function(stream) {
                stream.on('data', function(tweet) {
                    let coordinates = tweet.place.bounding_box.coordinates;
                    stream.on('data', function(data) {
                        io.sockets.emit('tweet', data);
                        console.log(data);
                        socket.broadcast.emit('tweet', data);
                        socket.emit('tweet', data);
                    });

                  stream.on('destroy', function() {
                      console.log("Disconnected from Twitter.");
                  });

                });
        });
    });

});



httpServer.listen(port, function() {
  console.log('Listenning on port ' + port);
});
