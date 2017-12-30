import isEmpty from 'lodash/isEmpty';

export default (data) => {
    const errors = {};

    if(isEmpty(data.token)) {
        errors.token = "Mời nhập mã xác thực";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}