'use strict';
var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
  console.log("Reached some point");
  res.json({message: "Hello! This is the main path of the API."})
})

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port


  console.log("HiHitMap API is listening at http://%s:%s", host, port)
});
