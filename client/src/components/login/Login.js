import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import FlashMessageList from "../../containers/FlashMessageList";
import TextFieldGroup from "../../common/TextFieldGroup";
import CaptchaGoogle from "../../common/CaptchaGoogle";
import ResendTokenVerifyAccount from "./ResendTokenVerifyAccount";

const Login = (props) => {
    const {username, password, twoFaCode, isLoading, errors, onChange, callbackCaptcha, expiredCallbackCaptcha, onSubmit} = props;
    return (
        <div className="col-lg-6 bg-white">
            <h2 className="page-header">LOGIN</h2>
            <div className="form align-items-center">
                <div className="content">
                    <FlashMessageList/>
                    {
                        (errors.auth === "Tài khoản chưa xác thực" && <ResendTokenVerifyAccount username={username}/>)
                        || (errors.auth && <div className="alert alert-danger">{errors.auth}</div>)
                    }
                    <form onSubmit={onSubmit}>
                        <TextFieldGroup
                            field={"username"}
                            value={username}
                            label={"User Name"}
                            error={errors.username}
                            onChange={onChange}
                        />
                        <TextFieldGroup
                            field={"password"}
                            value={password}
                            label={"Password"}
                            error={errors.password}
                            onChange={onChange}
                            type={"password"}
                        />
                        <TextFieldGroup
                            field={"twoFaCode"}
                            value={twoFaCode}
                            label={"2FA Code (Only if you enabled 2FA)"}
                            error={errors.twoFaCode}
                            onChange={onChange}
                            type={"number"}
                        />
                        <CaptchaGoogle
                            callbackCaptcha={callbackCaptcha}
                            expiredCallbackCaptcha={expiredCallbackCaptcha}
                            error={errors.responseCaptcha}
                        />
                        <button type="submit" disabled={isLoading} className="btn btn-primary">Login</button>
                        {/*This should be submit button but I replaced it with <a> for demo purposes*/}
                    </form>
                    <Link className="forgot-pass" to="/forgot-password">Forgot Password?</Link>
                    <br/>

                    <small>Do not have an account?</small>
                    <Link className="signup" to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    twoFaCode: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    callbackCaptcha: PropTypes.func.isRequired,
    expiredCallbackCaptcha: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default Login;