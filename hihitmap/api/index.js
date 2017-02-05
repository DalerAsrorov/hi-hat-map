'use strict';
var express = require('express');
var app = express();

var twitter = require('ntwitter');
var t = new twitter({
    consumer_key: 'okJxfpUfRePVfu8ju8for0rhM',
    consumer_secret: 'YIHZyIPUkgv4a2OsSrwhcF151qtMxkDq9PzhXnXGtIqL6k6WIl',
    access_token_key: '2243402142-wPicue620tYLLyQUEpvFrTVQCmOeBxHVyXeJtWl',
    access_token_secret: 'LBBWzPGlXUsdEAaOH9YW6B6503iHim1jmWcyhkIuVUsIq'
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
  console.log("Reached some point");
  res.json({message: "Hello! This is the main path of the API."})
})

app.get("/api/twitstream", (req, res) => {

  var sanFrancisco = [ '-122.75, 36.8, -121.75, 37.8' ];
  try {
    t.stream('statuses/filter', {'locations': sanFrancisco },
        function(stream) {
          stream.on('data', function(tweet) {
            var coordinates = tweet.place.bounding_box.coordinates;
            console.log(coordinates);
          });

            stream.on('destroy', function() {
                console.log("Disconnected from Twitter.");
            });

        }
    );
  } catch(err) {
    console.log("Couldn't stream yet...");
  }
})


var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port


  console.log("HiHitMap API is listening at http://%s:%s", host, port)
});
