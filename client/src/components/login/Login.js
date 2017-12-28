import React from 'react';
import { Link } from 'react-router-dom';

import Recaptcha from 'react-grecaptcha';

const Login = (props) => {
    return (
        <div className="col-lg-6 bg-white">
            <h2 className="page-header">LOGIN</h2>
            <div className="form align-items-center">
                <div className="content">
                    <form id="login-form" method="post">
                        <div className="form-group">
                            <label htmlFor="login-username" className="form-control-label">User Name</label>
                            <input id="login-username" type="text" name="loginUsername" required="" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password" className="form-control-label">Password</label>
                            <input id="login-password" type="password" name="loginPassword" required="" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-2fa-code" className="form-control-label">2FA Code (Only if you enabled 2FA)</label>
                            <input id="login-2fa-code" type="text" name="login-2fa-code" required="" className="form-control"/>
                        </div>
                        <Recaptcha
                            callback={()=>{}}
                            expiredCallback={()=>{}}
                            sitekey="6Lf8aj4UAAAAAAI1X6wFypJkr6PeBfd0FX38XUTO"
                            className="g-recaptcha"
                        />
                        <a id="login" className="btn btn-primary">Login</a>
                        {/*This should be submit button but I replaced it with <a> for demo purposes*/}
                    </form>
                    <Link className="forgot-pass" to="/forgot-password">Forgot Password?</Link>
                    <br />

                    <small>Do not have an account? </small>
                    <Link className="signup" to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;