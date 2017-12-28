import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classnames from 'classnames';

import Recaptcha from 'react-grecaptcha';

const Register = (props) => {
    const { errors } = props;
    return (
        <div className="col-lg-6 bg-white">
            <h2 className="page-header">REGISTER</h2>
            <div className="form align-items-center">
                <div className="content">
                    <form onSubmit={props.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="register-username" className="form-control-label">User Name</label>
                            <input name="username" className={classnames("form-control", {"is-invalid": errors.username})} value={props.username}
                                   onChange={props.onChange}/>
                            { errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-email" className="form-control-label">Email Address</label>
                            <input name="email" className={classnames("form-control", {"is-invalid": errors.email})} value={props.email} onChange={props.onChange}/>
                            { errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-password" className="form-control-label">Password</label>
                            <input type="password" name="password" className={classnames("form-control", {"is-invalid": errors.password})} value={props.password}
                                   onChange={props.onChange}/>
                            { errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-repassowrd" className="form-control-label">Re password</label>
                            <input type="password" name="repassword" className={classnames("form-control", {"is-invalid": errors.repassword})} value={props.repassword}
                                   onChange={props.onChange}/>
                            { errors.repassword && <div className="invalid-feedback">{errors.repassword}</div>}
                        </div>
                        <div className={classnames("form-group", "terms-conditions", {"has-error": errors.agreeLicense})}>
                            <input type="checkbox" name="agreeLicense" className="checkbox-template"
                                   value={props.agreeLicense} onChange={props.onChange}/>
                            <label htmlFor="license">Agree the terms and policy</label>
                        </div>
                        <Recaptcha
                            callback={() => {
                            }}
                            expiredCallback={() => {
                            }}
                            sitekey="6Lf8aj4UAAAAAAI1X6wFypJkr6PeBfd0FX38XUTO"
                            className="g-recaptcha"
                        />
                        <button type="submit" disabled={props.isLoading} className="btn btn-primary">Register</button>
                    </form>
                    <small>Already have an account?</small>
                    <Link to="/login" className="signup">Login</Link>
                </div>
            </div>
        </div>
    )
}

Register.propTypes = {
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    repassword: PropTypes.string.isRequired,
    agreeLicense: PropTypes.bool.isRequired,
}
export default Register;