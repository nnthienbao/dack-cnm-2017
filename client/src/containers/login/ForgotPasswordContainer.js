import React from 'react';
import ForgotPassword from "../../components/login/ForgotPassword";
import { validateInput } from '../../validation/validateUser';

class ForgotPasswordContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            responseCaptcha: '',
            isLoading: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.callbackCaptcha = this.callbackCaptcha.bind(this);
        this.expiredCallbackCaptcha = this.expiredCallbackCaptcha.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    callbackCaptcha(response) {
        this.setState({
            responseCaptcha: response
        })
    }

    expiredCallbackCaptcha() {
        this.setState({
            responseCaptcha: ''
        })
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if(!isValid) this.setState({
            errors: errors
        });
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.isValid()) {
            this.setState({errors: {}})
        }
    }

    render() {
        return (
            <ForgotPassword
                email={this.state.email}
                responseCaptcha={this.state.responseCaptcha}
                isLoading={this.state.isLoading}
                onChange={this.onChange}
                callbackCaptcha={this.callbackCaptcha}
                expiredCallbackCaptcha={this.expiredCallbackCaptcha}
                onSubmit={this.onSubmit}
                errors={this.state.errors}
            />
        )
    }
}

export default ForgotPasswordContainer;