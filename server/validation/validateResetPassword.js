const { isEmpty, isEqual } = require('lodash');

exports.default = function (data) {
    let errors = {};

    if(isEmpty(data.token)) errors.token = "Không được để trống";
    if(isEmpty(data.passwordNew)) errors.passwordNew = "Không được để trống";
    if(isEmpty(data.rePasswordNew)) errors.rePasswordNew = "Không được để trống";
    if(!isEqual(data.passwordNew, data.rePasswordNew)) errors.rePasswordNew = "Mật khẩu phải giống nhau";

    return {
        errors,
        isValid: isEmpty(errors)
    }
};