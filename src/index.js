'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = process.env.PORT || 8000;

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// open the app
app.use(express.static(__dirname + '/app'));

app.get('/api', (req, res) => {
    res.send({"Message": "You reached the API base."})
});

app.listen(port, function() {
  console.log('Listenning on port ' + port);
});
