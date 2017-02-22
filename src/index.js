'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();

// custom modules
let Twitter = require('./api/twitter');

let port = process.env.PORT || 8000;

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// open the app
app.use(express.static(__dirname + '/app'));

app.get('/api', function(req, res) {
    Twitter.stream("Daler");
    res.send({"Message": "You reached the API base."})
});

app.get('/api/:topic?', function(req, res) {
    let tweet = req.params.topic;

    let sanFrancisco = [ '-122.75, 36.8, -121.75, 37.8'];

    try
    {
        Twitter.module.stream('statuses/filter', {'locations': sanFrancisco },
            function(stream) {
                stream.on('data', function(data) {
                  // let coordinates = tweet.place.bounding_box.coordinates;
                  // stream.on('data', function(data) {
                  // io.sockets.emit('tweet', data);
                    console.log(data);

                  // });

                  // stream.on('destroy', function() {
                  //     console.log("Disconnected from Twitter.");
                  // });

                });

            }
        );
    }
    catch(err)
    {
        console.log("Couldn't stream yet...", err);
    }

    console.log(tweet);
});

app.listen(port, function() {
  console.log('Listenning on port ' + port);
});
