import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import VerifyAccount from "../../components/login/VerifyAccount";
import validateToken from '../../validation/validateToken';
import { userVerifyEmailRequest } from '../../actions/userAction';
import { addFlashMessage, deleteAllFlashMessage } from '../../actions/flashMessageAction';

class VerifyAccountContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            isLoading: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    isValid() {
        const {errors, isValid} = validateToken(this.state);
        if(!isValid) this.setState({errors});

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.userVerifyEmailRequest(this.state)
                .then(res => {
                    this.props.deleteAllFlashMessage();
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Xác thực thành công, mời bạn đăng nhập'
                    });
                    this.props.history.push('/login');
                })
                .catch(err => {
                    this.setState({errors: err.response.data, isLoading: false});
                })
        }
    }

    render() {
        return (
            <VerifyAccount
                token={this.state.token}
                isLoading={this.state.isLoading}
                errors={this.state.errors}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
            />
        )
    }
}

VerifyAccountContainer.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    deleteAllFlashMessage: PropTypes.func.isRequired,
    userVerifyEmailRequest: PropTypes.func.isRequired
};

export default connect(state => { return {} }, {
    addFlashMessage,
    deleteAllFlashMessage,
    userVerifyEmailRequest
})(VerifyAccountContainer);