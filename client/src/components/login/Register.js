import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Recaptcha from 'react-grecaptcha';

const Register = (props) => (
    <div className="col-lg-6 bg-white">
        <h2 className="page-header">REGISTER</h2>
        <div className="form align-items-center">
            <div className="content">
                <form onSubmit={props.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="register-username" className="form-control-label">User Name</label>
                        <input name="username" className="form-control" value={props.username} onChange={props.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-email" className="form-control-label">Email Address</label>
                        <input name="email" className="form-control" value={props.email} onChange={props.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-passowrd" className="form-control-label">Password</label>
                        <input type="password" name="password" className="form-control" value={props.password} onChange={props.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-repassowrd" className="form-control-label">Re password</label>
                        <input type="password" name="repassword" className="form-control" value={props.repassword} onChange={props.onChange}/>
                    </div>
                    <div className="form-group terms-conditions">
                        <input type="checkbox" name="agreeLicense" className="checkbox-template" value={props.agreeLicense} onChange={props.onChange}/>
                        <label htmlFor="license">Agree the terms and policy</label>
                    </div>
                    <Recaptcha
                        callback={()=>{}}
                        expiredCallback={()=>{}}
                        sitekey="6Lf8aj4UAAAAAAI1X6wFypJkr6PeBfd0FX38XUTO"
                        className="g-recaptcha"
                    />
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                <small>Already have an account?</small>
                <Link to="/login" className="signup">Login</Link>
            </div>
        </div>
    </div>
)

Register.propTypes = {
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    repassword: PropTypes.string.isRequired,
    agreeLicense: PropTypes.bool.isRequired,
}
export default Register;