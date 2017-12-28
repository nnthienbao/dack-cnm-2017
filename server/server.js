var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var config = require('./config/config-system.json');

// Router
var authentication = require('./routers/api/authentication');

mongoose.connect(config.connectionStringMongo);

// require('./socket');

var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/api', authentication);


app.listen(8080, function () {
    console.log("Server run at port 8080");
});