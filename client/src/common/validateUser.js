import validator from 'validator';
import lodash from 'lodash';

export function validateUserRegister(data) {
    let errors = {};
    if(lodash.isEmpty(data.username)) {
        errors.username = "Không được bỏ trống";
    }

    if(lodash.isEmpty(data.email)) {
        errors.email = "Không được bỏ trống";
    }
    else if(!validator.isEmail(data.email)) {
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

    if(lodash.isEqual(data.responseCaptcha, '')) {
        errors.responseCaptcha = "Bạn chưa nhập captcha";
    }

    if(!data.agreeLicense) {
        errors.agreeLicense = "Bạn chưa đồng ý các điều khoản";
    }

    return {
        errors,
        isValid: lodash.isEmpty(errors)
    }
}