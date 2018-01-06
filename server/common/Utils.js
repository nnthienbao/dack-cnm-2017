const request = require('request-promise');
const ursa = require('ursa');
const crypto = require('crypto');
const forEach = require('lodash').forEach;

const config = require('../config/config-system.json');
const TokenVerify = require('../models/TokenVerify');
const OutputTransaction = require('../models/OuputTransaction');
const InputTransaction = require('../models/InputTransaction');

const URI_KCOIN_API = require('../config/config-system.json').kcoinUriApi;
const HASH_ALGORITHM = 'sha256';

module.exports.checkValidCaptcha = function (captchaResponse) {
    const data = {
        "secret": config.recaptcha.secret,
        "response": captchaResponse
    }
    return request.post(config.recaptcha.url, {form:data});
}

function hash(data) {
    let hash = crypto.createHash(HASH_ALGORITHM);
    hash.update(data);
    return hash.digest();
}

function generateKey() {
    return ursa.generatePrivateKey(1024, 65537);
}

module.exports.generateAddress = function () {
    let privateKey = generateKey();
    let publicKey = privateKey.toPublicPem();
    return {
        privateKey: privateKey.toPrivatePem('hex'),
        publicKey: publicKey.toString('hex'),
        // Address is hash of public key
        address: hash(publicKey).toString('hex')
    };
}

module.exports.createTokenVerifyWithUser = function (user, type) {
    const token = crypto.randomBytes(16).toString('hex');
    const tokenVerify = new TokenVerify({
        _userId: user._id,
        token: token,
        type: type
    });

    return tokenVerify;
};

module.exports.getRealableWallet = function (address) {
    return OutputTransaction.find({ lockScript: "ADD " + address }).then(outputs => {
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
            return coin;

        }).catch(err => {
            console.log(err);
        })
    })
};

module.exports.getCoinLocked = function (address) {
    return request.get(URI_KCOIN_API + 'unconfirmed-transactions').then(transUnconfirms => {
        let coinLock = 0;
        let promises = [];

        forEach(transUnconfirms.inputs, input => {
            promises.push(OutputTransaction.findOne({
                hash_transaction: input.referencedOutputHash,
                index: input.referencedOutputIndex,
                lockScript: "ADD " + address
            }).then(output => {
                if(output !== null) coinLock += output.value;
            }));
        });

        return Promise.all(promises).then(() => {
            return coinLock;
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
};












