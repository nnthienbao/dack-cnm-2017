const Validator = require('validator');
const lodash = require('lodash');

const checkValidCaptcha = require('./Utils').checkValidCaptcha;
const User = require('../models/User');

const env = process.env.NODE_ENV || 'development';

module.exports.validateUserRegister = function (data) {
    let { errors, isValid } = validateCommon(data);

    return checkValidCaptcha(data.responseCaptcha).then(res => {
        const parseData = JSON.parse(res);
        if(!parseData.success) {
            reject("Wrong captcha");
        }

        return Promise.all([
            User.findOne({username: data.username})
                .then(function (user) {
                    if(user !== null) errors.username = "Tên người dùng đã có người sử dụng";
                })
                .catch(function (err) {})
            ,
            User.findOne({email: data.email})
                .then(function (user) {
                    if(user !== null) errors.email = "Địa chỉ email đã có người sử dụng";
                })
                .catch(function (err) {})
        ]).then(function () {
            return {
                errors: errors,
                isValid: lodash.isEmpty(errors)
            }
        })
    }).catch(error => {
        errors.responseCaptcha = "Captcha không đúng";
        return {
            errors: errors,
            isValid: lodash.isEmpty(errors)
        }
    })
}

module.exports.validateUserLogin = function (data) {
    let errors = {};
    return checkValidCaptcha(data.responseCaptcha)
        .then(res => {
            const parseData = JSON.parse(res);
            if(!parseData.success) {
                reject("Wrong captcha");
            }
            return {
                errors: errors,
                isValid: lodash.isEmpty(errors)
            }
        })
        .catch(error => {
            errors.responseCaptcha = "Captcha không đúng";
            return {
                errors: errors,
                isValid: lodash.isEmpty(errors)
            }
        })
}

function validateCommon(data) {
    let errors = {};

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


    if(!data.agreeLicense) {
        errors.agreeLicense = "Bạn chưa đồng ý các điều khoản";
    }

    return {
        errors,
        isValid: lodash.isEmpty(errors)
    }
}

