const request = require('request-promise');
let key = require('./key.json');
let referencedOutputHash = '06b0dd141d5de6b6f2ee677b903f117f2b07cda410a95128dba6821e0a9eca92';
let referenceOutputIndex = 0;
const transactions = require('./common/Utils.js');

const keys = [];
keys.push(key);

let bountyTransaction = {
    version: 1,
    inputs: [{
        referencedOutputHash: referencedOutputHash,
        referencedOutputIndex: referenceOutputIndex,
        unlockScript: ''
    }],
    outputs: [
        {
            value: 49,
            lockScript: 'ADD f0dd8cb13e7ae3a65cd6f924336d9bca14ddfd6cd6006f09dc2a600985bd1db4'
        },
        {
            value: 1,
            lockScript: 'ADD 4fdc4f41b64ac6d1b635166727b0cd04e780f9a1649157a1df5a6f190ed4d4d4'
        }
    ]
}

transactions.createInputUnlockScript(bountyTransaction, keys);

let lastCheck = JSON.stringify(bountyTransaction);
console.log(lastCheck);

const option = {
    method: 'POST',
    uri: 'https://api.kcoin.club/transactions',
    headers: {
        'Content-Type': 'application/json',
    },
    body: lastCheck,
}

request(option).then(function(parsedBody) {
    console.log("thanh cong");
    console.log(parsedBody);
}).catch(function(err) {
    console.log(err);
});


