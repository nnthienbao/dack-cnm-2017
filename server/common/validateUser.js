var Validator = require('validator');
var lodash = require('lodash');
var checkValidCaptcha = require('./Utils').checkValidCaptcha;

module.exports.validateUserRegister = function (data) {
    var errors = {};

    if(lodash.isEmpty(data.username)) {
        errors.username = "Không được bỏ trống";
    }

    if(lodash.isEmpty(data.email)) {
        errors.email = "Không được bỏ trống";
    }
    else if(!Validator.isEmail(data.email)) {
        errors.email = "Địa chỉ mail không hợp lệ"
    }

    if(lodash.isEmpty(data.password)) {
        errors.password = "Không được bỏ trống";
    }
    if(lodash.isEmpty(data.repassword)) {
        errors.repassword = "Không được bỏ trống";
    }
    if(!lodash.isEqual(data.password, data.repassword)) {
        errors.repassword = "Mật khẩu phải giống nhau";
    }

    if(!checkValidCaptcha(data.responseCaptcha)) {
        errors.responseCaptcha = "Captcha không đúng";
    }

    if(!data.agreeLicense) {
        errors.agreeLicense = "Bạn chưa đồng ý các điều khoản";
    }

    return {
        errors,
        isValid: lodash.isEmpty(errors)
    }
}

