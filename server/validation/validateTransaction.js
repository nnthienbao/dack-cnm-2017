const { isInteger, isEmpty } = require('lodash');

module.exports.default = function (data) {
    const { receiverAddress, value } = data;
    let errors = {};

    if(isEmpty(receiverAddress)) {
        errors.receiverAddress = "Bạn không được bỏ trống địa chỉ";
    }

    if(!isInteger(parseInt(value))) {
        errors.value = "Số tiền gửi phải là một số nguyên";
    } else if(value <= 0) {
        errors.value = "Số tiền gửi phải lớn hơn 0";
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
};