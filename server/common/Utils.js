var request = require('request-promise');

var config = require('../config/config-system.json');

module.exports.checkValidCaptcha = function (captchaResponse) {
    const data = {
        "secret": config.recaptcha.secret,
        "response": captchaResponse
    }
    return request.post(config.recaptcha.url, {form:data})
        .then(function (res) {
            const parseData = JSON.parse(res);
            return parseData.success;
        })
        .catch(function (err) {
            return false;
        })
}