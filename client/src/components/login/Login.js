import React from 'react';
import {Link} from 'react-router-dom';
import Recaptcha from 'react-grecaptcha';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import FlashMessageList from "../../containers/FlashMessageList";

const Login = (props) => {
    const {username, password, twoFaCode, isLoading, errors, onChange, callbackCaptcha, expiredCallbackCaptcha, onSubmit} = props;
    return (
        <div className="col-lg-6 bg-white">
            <h2 className="page-header">LOGIN</h2>
            <div className="form align-items-center">
                <div className="content">
                    <FlashMessageList/>
                    { errors.auth && <div className="alert alert-danger">{errors.auth}</div> }
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label className="form-control-label">User Name</label>
                            <input type="text" name="username" value={username} onChange={onChange}
                                   className={classnames("form-control", { "is-invalid": errors.username || errors.auth })}/>
                            { errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">Password</label>
                            <input type="password" name="password" value={password} onChange={onChange}
                                   className={classnames("form-control", { "is-invalid": errors.password || errors.auth })}/>
                            { errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">2FA Code (Only if you enabled 2FA)</label>
                            <input type="number" name="twoFaCode" value={twoFaCode} onChange={onChange}
                                   className={classnames("form-control", { "is-invalid": errors.twoFaCode })}/>
                            { errors.twoFaCode && <div className="invalid-feedback">{errors.twoFaCode}</div>}
                        </div>
                        <div className="form-group">
                            <Recaptcha
                                callback={callbackCaptcha}
                                expiredCallback={expiredCallbackCaptcha}
                                sitekey="6Lf8aj4UAAAAAAI1X6wFypJkr6PeBfd0FX38XUTO"
                                className="g-recaptcha"
                            />
                            <input type="hidden"
                                   className={classnames("form-control", {"is-invalid": errors.responseCaptcha})}
                                   onChange={props.onChange}/>
                            { errors.responseCaptcha && <div className="invalid-feedback">{errors.responseCaptcha}</div>}
                        </div>
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