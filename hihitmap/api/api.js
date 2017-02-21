'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8000;

let router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'Here we go! API is running.'})
});

// Routes will be prefixed with /api
app.use('api', router);

app.listen(port);
console.log(`Hihitmap is running on ${port}!!!`);
