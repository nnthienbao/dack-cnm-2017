import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { validateInput } from '../../validation/validateUser';
import validateResetPasswordStepTwo  from '../../validation/validateResetPasswordStepTwo';
import { userRequestResetPassword, userResetPassword } from '../../actions/userAction';
import ForgotPasswordStepOne from "../../components/login/ForgotPasswordStepOne";
import ForgotPasswordStepTwo from "../../components/login/ForgotPasswordStepTwo";
import Link from "react-router-dom/es/Link";

class ForgotPasswordContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            responseCaptcha: '',
            isLoadingStepOne: false,
            errorStepOnes: {},

            token: '',
            passwordNew: '',
            rePasswordNew: '',
            isLoadingStepTwo: false,
            errorsStepTwos: {},

            successSendRequest: false
        };

        this.onChange = this.onChange.bind(this);
        this.callbackCaptcha = this.callbackCaptcha.bind(this);
        this.expiredCallbackCaptcha = this.expiredCallbackCaptcha.bind(this);
        this.onSubmitStepOne = this.onSubmitStepOne.bind(this);
        this.onSubmitStepTwo = this.onSubmitStepTwo.bind(this);
        this.isValidStepOne = this.isValidStepOne.bind(this);
        this.isValidStepTwo = this.isValidStepTwo.bind(this);
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

    isValidStepOne() {
        const { errors, isValid } = validateInput(this.state);
        if(!isValid) this.setState({
            errorStepOnes: errors
        });
        return isValid;
    }

    isValidStepTwo() {
        const {errors, isValid} = validateResetPasswordStepTwo(this.state);
        if(!isValid) this.setState({
            errorsStepTwos: errors
        });
        return isValid;
    }

    onSubmitStepOne(e) {
        e.preventDefault();
        if(this.isValidStepOne()) {
            this.setState({errorStepOnes: {}, isLoadingStepOne: true});
            this.props.userRequestResetPassword(this.state)
                .then(res => {
                    console.log("success");
                    this.setState({successSendRequest: true, isLoadingStepOne: false})
                })
                .catch(err => {
                    console.log(err.response);
                    window.grecaptcha.reset();
                    this.setState({
                        errorStepOnes: err.response.data,
                        isLoadingStepOne: false, responseCaptcha: '',
                        successSendRequest: false
                    });
                })
        }
    }

    onSubmitStepTwo(e) {
        e.preventDefault();
        if(this.isValidStepTwo()) {
            this.setState({errorsStepTwos: {}, isLoadingStepTwo: true})
            this.props.userResetPassword(this.state)
                .then(res => {
                    this.props.history.push('/login');
                })
                .catch(err => {
                    this.setState({errorsStepTwos: err.response.data, isLoadingStepTwo: false})
                })
        }
    }

    render() {
        const { successSendRequest } = this.state;
        return (
            <div className="col-lg-6 bg-white">
                <h2 className="page-header">FORGOT PASSWORD</h2>
                <div className="form align-items-center">
                    <div className="content">
                        { !successSendRequest &&
                        <ForgotPasswordStepOne
                            onSubmit={this.onSubmitStepOne}
                            onChange={this.onChange}
                            isLoading={this.state.isLoadingStepOne}
                            email={this.state.email}
                            callbackCaptcha={this.callbackCaptcha}
                            expiredCallbackCaptcha={this.expiredCallbackCaptcha}
                            errors={this.state.errorStepOnes}
                        /> }

                        { successSendRequest &&
                        <ForgotPasswordStepTwo
                            token={this.state.token}
                            passwordNew={this.state.passwordNew}
                            rePasswordNew={this.state.rePasswordNew}
                            isLoading={this.state.isLoadingStepTwo}
                            onChange={this.onChange}
                            onSubmit={this.onSubmitStepTwo}
                            errors={this.state.errorsStepTwos}
                        /> }
                        <small>Back to </small>
                        <Link className="signup" to="/login">Login</Link>
                    </div>
                </div>
            </div>
        )
    }
}

ForgotPasswordContainer.propTypes = {
    userRequestResetPassword: PropTypes.func.isRequired,
    userResetPassword: PropTypes.func.isRequired
};


export default connect(state => { return {} }, { userRequestResetPassword, userResetPassword })(ForgotPasswordContainer);