import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import CaptchaGoogle from "../../common/CaptchaGoogle";
import TextFieldGroup from "../../common/TextFieldGroup";

const ForgotPassword = (props) => {
    const { email, isLoading, onChange, callbackCaptcha, expiredCallbackCaptcha, onSubmit, errors } = props;
    return (
        <div className="col-lg-6 bg-white">
            <h2 className="page-header">FORGOT PASSWORD</h2>
            <div className="form align-items-center">
                <div className="content">
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
                    <small>Back to </small>
                    <Link className="signup" to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
};

ForgotPassword.propTypes = {
    email: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    callbackCaptcha: PropTypes.func.isRequired,
    expiredCallbackCaptcha: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}



export default ForgotPassword;