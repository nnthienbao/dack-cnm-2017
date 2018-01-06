const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('./config/config-system.json');
const secret = require('./secret.json').jwtSecret;

// Router
const authentication = require('./routers/api/authentication');
const user = require('./routers/api/user');
const fetchDataFromKcoin= require('./sync-with-kcoin/synchronizeWithKcoin ').fetchDataFromKcoin;

mongoose.connect(config.connectionStringMongo);

//require('./socket/startSocket');
fetchDataFromKcoin();

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
app.use('/api/user', user);


app.listen(8080, function () {
    console.log("Server run at port 8080");
});