import React from 'react';
import {Link} from 'react-router-dom';

import Recaptcha from 'react-grecaptcha';

const ForgotPassword = (props) => (
    <div className="col-lg-6 bg-white">
        <h2 className="page-header">FORGOT PASSWORD</h2>
        <div className="form align-items-center">
            <div className="content">
                <form id="login-form" method="post">
                    <div className="form-group">
                        <label htmlFor="forgotpass-email" className="form-control-label">Please enter your email andress retrieve your password</label>
                        <input id="forgotpass-email" type="text" name="forgotpass-email" required="" className="form-control"/>
                    </div>
                    <Recaptcha
                        sitekey="6Lf8aj4UAAAAAAI1X6wFypJkr6PeBfd0FX38XUTO"
                        className="g-recaptcha"
                    />
                    <a id="login" className="btn btn-primary">Send</a>
                    {/*This should be submit button but I replaced it with <a> for demo purposes*/}
                </form>
                <small>Back to </small>
                <Link className="signup" to="/login">Login</Link>
            </div>
        </div>
    </div>
)

export default ForgotPassword;