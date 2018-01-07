const mongoose = require('mongoose');

const mongoURI_test = "localhost:27017/test-dack-cnm-2017";

mongoose.connect(mongoURI_test, function(err, res) {
    if(err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + mongoURI_test);
    }
});