const mongoose = require('mongoose');
const request = require('request-promise');
const ursa = require('ursa');
const crypto = require('crypto');
const {forEach, findIndex} = require('lodash');

const config = require('./config/config-system.json');
const TokenVerify = require('./models/TokenVerify');
const TokenConfirmTransaction = require('./models/TokenConfirmTransaction');
const OutputTransaction = require('./models/OuputTransaction');
const InputTransaction = require('./models/InputTransaction');
const User = require('./models/User');

mongoose.connect(config.connectionStringMongo);

const getrealwallet = function() {
    
    OutputTransaction.find({ 
        lockScript: "ADD f0dd8cb13e7ae3a65cd6f924336d9bca14ddfd6cd6006f09dc2a600985bd1db4" })
    .then(outputs => {
        console.log(outputs);
        if(outputs === null) return 0;

        let coin = 0;
        let promises = [];

        forEach(outputs, output => {
            promises.push(
                InputTransaction.findOne({
                    referencedOutputHash: output.hash_transaction,
                    referencedOutputIndex: output.index
                })
                    .then(inputs => {
                        if (inputs === null) coin += output.value;
                    }));
        });

        return Promise.all(promises).then(() => {
            console.log(coin);
        }).catch(err => {
            console.log(err);
        })
    })
}

getrealwallet();



