var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('localhost:27017/dack-cnm-2017');

var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


app.listen(8080, function () {
    console.log("Server run at port 8080");
});