import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import Register from '../components/login/Register';
import {userRegisterRequest} from '../actions/userAction';
import {addFlashMessage} from '../actions/flashMessageAction';
import {validateUserRegister} from '../common/validateUser';

class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            repassword: '',
            agreeLicense: false,
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'agreeLicense') {
            this.setState({
                [e.target.name]: e.target.checked
            })
        }
    }

    isValid() {
        const {errors, isValid} = validateUserRegister(this.state);

        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({
                errors: {},
                isLoading: true
            });
            this.props.userRegisterRequest(this.state)
                .then((res) => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Bạn đã đăng ký thành công, xin mời đăng nhập'
                    })
                    this.props.history.push('/login');
                })
                .catch((error) => this.setState({errors: error.response.data, isLoading: false}));
        }
    }

    render() {
        return (
            <Register
                username={this.state.username}
                email={this.state.email}
                password={this.state.password}
                repassword={this.state.repassword}
                agreeLicense={this.state.agreeLicense}
                errors={this.state.errors}
                isLoading={this.state.isLoading}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
            />
        );
    }
}

RegisterContainer.propTypes = {
    userRegisterRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}

export default withRouter(connect((state) => {
    return {}
}, {userRegisterRequest, addFlashMessage})(RegisterContainer));