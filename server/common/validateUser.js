var Validator = require('validator');
var lodash = require('lodash');

module.exports.validateUserRegister = function (user) {
    var errors = {};

    if(lodash.isEmpty(user.username)) {
        errors.username = "Không được bỏ trống";
    }

    if(lodash.isEmpty(user.email)) {
        errors.email = "Không được bỏ trống";
    }
    if(!Validator.isEmail(user.email)) {
        errors.email = "Địa chỉ mail không hợp lệ"
    }

    if(lodash.isEmpty(user.password)) {
        errors.password = "Không được bỏ trống";
    }
    if(lodash.isEmpty(user.repassword)) {
        errors.repassword = "Không được bỏ trống";
    }
    if(!lodash.isEqual(user.password, user.repassword)) {
        errors.repassword = "Mật khẩu phải giống nhau";
    }

    return {
        errors,
        isValid: lodash.isEmpty(errors)
    }
}