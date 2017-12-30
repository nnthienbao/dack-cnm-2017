import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Login from '../../components/login/Login';
import {validateInput} from '../../validation/validateUser';
import {userLoginRequest} from '../../actions/userAction'

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            twoFaCode: '',
            responseCaptcha: '',
            isLoading: false,
            errors: {}
        };

        this.isAuthenticate = this.isAuthenticate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.callbackCaptcha = this.callbackCaptcha.bind(this);
        this.expiredCallbackCaptcha = this.expiredCallbackCaptcha.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    componentWillMount() {
        if(this.isAuthenticate()) this.props.history.push('/dashboard');
    }

    isAuthenticate() {
        return this.props.auth.isAuthenticate;
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    callbackCaptcha(response) {
        this.setState({responseCaptcha: response})
    }

    expiredCallbackCaptcha() {
        this.setState({responseCaptcha: ''})
    }

    isValid() {
        const {errors, isValid} = validateInput(this.state);
        if(!isValid) this.setState({errors});
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.userLoginRequest(this.state).then(res => {
                this.props.history.push('/dashboard');
            }).catch(err => {
                this.setState({
                    errors: err.response.data,
                    isLoading: false,
                    responseCaptcha: ''
                });
                window.grecaptcha.reset();
            })
        }
    }

    render() {
        return (
            <Login
                username={this.state.username}
                password={this.state.password}
                twoFaCode={this.state.twoFaCode}
                responseCaptcha={this.state.responseCaptcha}
                errors={this.state.errors}
                isLoading={this.state.isLoading}
                onChange={this.onChange}
                callbackCaptcha={this.callbackCaptcha}
                expiredCallbackCaptcha={this.expiredCallbackCaptcha}
                onSubmit={this.onSubmit}
            />
        )
    }
}

LoginContainer.propTypes = {
    auth: PropTypes.object.isRequired,
    userLoginRequest: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { userLoginRequest })(LoginContainer);