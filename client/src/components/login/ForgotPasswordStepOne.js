import React from 'react';
import PropTypes from 'prop-types';

import CaptchaGoogle from "../../common/CaptchaGoogle";
import TextFieldGroup from "../../common/TextFieldGroup";

const ForgotPasswordStepOne = (props) => {
    const { errors, email, isLoading, onChange, onSubmit, callbackCaptcha, expiredCallbackCaptcha } = props;
    return (
        <div>
            { errors.error && <div className="alert alert-danger">{errors.error}</div> }
            <form onSubmit={onSubmit}>
                <TextFieldGroup
                    field={"email"}
                    value={email}
                    label={"Mời bạn nhập email đã đăng ký để lấy lại mật khẩu"}
                    error={errors.email}
                    onChange={onChange}/>
                <CaptchaGoogle
                    error={errors.responseCaptcha}
                    callbackCaptcha={callbackCaptcha}
                    expiredCallbackCaptcha={expiredCallbackCaptcha}
                />
                <button type="submit" disabled={isLoading} className="btn btn-primary">Send</button>
                {/*This should be submit button but I replaced it with <a> for demo purposes*/}
            </form>
        </div>
    )
};

ForgotPasswordStepOne.propTypes = {
    errors: PropTypes.object,
    email: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    callbackCaptcha: PropTypes.func.isRequired,
    expiredCallbackCaptcha: PropTypes.func.isRequired
}

export default ForgotPasswordStepOne;