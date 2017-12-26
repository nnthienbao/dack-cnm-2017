import React from 'react';
import { Link } from 'react-router-dom';

import Recaptcha from 'react-grecaptcha';

const Login = (props) => {
    return (
        <div className="col-lg-6 bg-white">
            <div className="form d-flex align-items-center">
                <div className="content">
                    <form id="login-form" method="post">
                        <div className="form-group">
                            <label htmlFor="login-username" className="label-material">User Name</label>
                            <input id="login-username" type="text" name="loginUsername" required="" className="input-material"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password" className="label-material">Password</label>
                            <input id="login-password" type="password" name="loginPassword" required="" className="input-material"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-2fa-code" className="label-material">2FA Code (Only if you enabled 2FA)</label>
                            <input id="login-2fa-code" type="text" name="login-2fa-code" required="" className="input-material"/>
                        </div>
                        <Recaptcha
                            sitekey="6Lf8aj4UAAAAAAI1X6wFypJkr6PeBfd0FX38XUTO"
                            className="g-recaptcha"
                        />
                        <a id="login" href="#" className="btn btn-primary">Login</a>
                        {/*This should be submit button but I replaced it with <a> for demo purposes*/}
                    </form>
                    <a href="#" className="forgot-pass">Forgot Password?</a>
                    <br />

                    <small>Do not have an account? </small>
                    <Link className="signup" to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;