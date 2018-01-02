const request = require('request-promise');
const ursa = require('ursa');
const crypto = require('crypto');

const config = require('../config/config-system.json');
const TokenVerify = require('../models/TokenVerify');

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












