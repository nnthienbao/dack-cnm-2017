import validator from 'validator';
import lodash from 'lodash';

export function validateUserRegister(user) {
    let errors = {};
    if(lodash.isEmpty(user.username)) {
        errors.username = "Không được bỏ trống";
    }

    if(lodash.isEmpty(user.email)) {
        errors.email = "Không được bỏ trống";
    }
    else if(!validator.isEmail(user.email)) {
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