import React from 'react';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-grecaptcha';

import FlashMessageList from "../../containers/FlashMessageList";

const Login = (props) => {
    return (
        <div className="col-lg-6 bg-white">
            <h2 className="page-header">LOGIN</h2>
            <div className="form align-items-center">
                <div className="content">
                    <FlashMessageList/>
                    <form id="login-form" method="post">
                        <div className="form-group">
                            <label htmlFor="login-username" className="form-control-label">User Name</label>
                            <input type="text" name="loginUsername" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password" className="form-control-label">Password</label>
                            <input type="password" name="loginPassword" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-2fa-code" className="form-control-label">2FA Code (Only if you enabled 2FA)</label>
                            <input type="text" name="login-2fa-code" className="form-control"/>
                        </div>
                        <Recaptcha
                            callback={()=>{}}
                            expiredCallback={()=>{}}
                            sitekey="6Lf8aj4UAAAAAAI1X6wFypJkr6PeBfd0FX38XUTO"
                            className="g-recaptcha"
                        />
                        <button type="submit" className="btn btn-primary">Login</button>
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