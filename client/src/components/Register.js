import React from 'react';
import { Link } from 'react-router-dom';

import Recaptcha from 'react-grecaptcha';

const Register = (props) => {
    return (
        <div className="col-lg-6 bg-white">
            <div className="form d-flex align-items-center">
                <div className="content">
                    <form id="register-form">
                        <div className="form-group">
                            <label htmlFor="register-username">User Name</label>
                            <input id="register-username" type="text" name="registerUsername" required className="input-material"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-email" className="label-material">Email Address</label>
                            <input id="register-email" type="email" name="registerEmail" required className="input-material"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-passowrd" className="label-material">Password</label>
                            <input id="register-passowrd" type="password" name="registerPassword" required className="input-material"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-repassowrd" className="label-material">Re password</label>
                            <input id="register-repassowrd" type="password" name="registerPassword" required className="input-material"/>
                        </div>
                        <div className="form-group terms-conditions">
                            <input id="license" type="checkbox" className="checkbox-template"/>
                            <label htmlFor="license">Agree the terms and policy</label>
                        </div>
                        <Recaptcha
                            sitekey="6Lf8aj4UAAAAAAI1X6wFypJkr6PeBfd0FX38XUTO"
                            className="g-recaptcha"
                        />
                        <input id="register" type="submit" value="Register" className="btn btn-primary"/>
                    </form><small>Already have an account? </small><Link to="/login" className="signup">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;