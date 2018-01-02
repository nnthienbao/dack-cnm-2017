import React from 'react';
import PropTypes from 'prop-types';
import Recaptcha from 'react-grecaptcha';
import classnames from 'classnames';

import config from '../config.json';
const sitekey = config.sitekey;

const CaptchaGoogle = (props) => {
    const { error, callbackCaptcha, expiredCallbackCaptcha } = props;
    return (
        <div className="form-group">
            <Recaptcha
                sitekey={sitekey}
                className="g-recaptcha"
                callback={callbackCaptcha}
                expiredCallback={expiredCallbackCaptcha}
            />
            <input type="hidden"
                   className={classnames("form-control", {"is-invalid": error})}
                   onChange={props.onChange}/>
            { error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
};

CaptchaGoogle.propTypes = {
    error: PropTypes.string,
    callbackCaptcha: PropTypes.func.isRequired,
    expiredCallbackCaptcha: PropTypes.func.isRequired
};

export default CaptchaGoogle;