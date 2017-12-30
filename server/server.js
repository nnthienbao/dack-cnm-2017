const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('./config/config-system.json');
const secret = require('./secret.json').secret;

// Router
const authentication = require('./routers/api/authentication');

mongoose.connect(config.connectionStringMongo);

// require('./socket');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    if(req.headers && req.headers.authorization) {
        jwt.verify(req.headers.authorization.split(' ')[1], secret, function (err, decode) {
            req.user = decode;
            if(err) req.user = undefined;
        });
        next();
    } else {
        req.user = undefined;
        next();
    }
})

app.use('/api', authentication);


app.listen(8080, function () {
    console.log("Server run at port 8080");
});