import { isEmpty, isEqual } from 'lodash';

export default function (data) {
    let errors = {};
    if(isEmpty(data.token)) errors.token = "Không được bỏ trống";
    if(isEmpty(data.passwordNew)) errors.passwordNew = "Không được bỏ trống";
    if(isEmpty(data.rePasswordNew)) errors.rePasswordNew = "Không được bỏ trống";
    if(!isEqual(data.passwordNew, data.rePasswordNew)) errors.rePasswordNew = "Mật khẩu phải giống nhau";

    return {
        errors,
        isValid: isEmpty(errors)
    }

}