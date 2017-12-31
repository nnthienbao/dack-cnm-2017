import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classnames from 'classnames';

import TextFieldGroup from "../../common/TextFieldGroup";
import CaptchaGoogle from "../../common/CaptchaGoogle";

const Register = (props) => {
    const { username, email, password, repassword, errors, onChange, callbackCaptcha, expiredCallbackCaptcha, onSubmit } = props;
    return (
        <div className="col-lg-6 bg-white">
            <h2 className="page-header">REGISTER</h2>
            <div className="form align-items-center">
                <div className="content">
                    <form onSubmit={onSubmit}>
                        <TextFieldGroup
                            field={"username"}
                            value={username}
                            label={"User Name"}
                            error={errors.username}
                            onChange={onChange}
                        />

                        <TextFieldGroup
                            field={"email"}
                            value={email}
                            label={"Email Address"}
                            error={errors.email}
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
                            field={"repassword"}
                            value={repassword}
                            label={"Re Password"}
                            error={errors.repassword}
                            onChange={onChange}
                            type={"password"}
                        />

                        <div className="form-group terms-conditions">
                            <input type="checkbox" name="agreeLicense" className="checkbox-template" checked={props.agreeLicense}
                                   onChange={props.onChange}/>
                            <label htmlFor="license" className="form-control-label">Agree the terms and policy</label>
                            <input type="hidden"
                                   className={classnames("form-control", {"is-invalid": errors.agreeLicense})}
                                   onChange={props.onChange}/>
                            { errors.agreeLicense && <div className="invalid-feedback">{errors.agreeLicense}</div>}
                        </div>

                        <CaptchaGoogle
                            error={errors.responseCaptcha}
                            callbackCaptcha={callbackCaptcha}
                            expiredCallbackCaptcha={expiredCallbackCaptcha}
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
    callbackCaptcha: PropTypes.func.isRequired,
    expiredCallbackCaptcha: PropTypes.func.isRequired
}
export default Register;