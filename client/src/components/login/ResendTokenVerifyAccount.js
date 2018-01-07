import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userResendTokenVerifyAccountRequest } from '../../actions/userAction';
import { addFlashMessage, deleteAllFlashMessage } from '../../actions/flashMessageAction';

class ResendTokenVerifyAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.userResendTokenVerifyAccountRequest(this.props.username)
            .then(res => {
                this.props.deleteAllFlashMessage();
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Mời bạn xác thực email'
                });
                this.props.history.push('/verify-account');
            })
            .catch(err => {
                console.log(err);
                this.setState({errors: err.response.data});
            })
    }

    render() {
        return (
            <div className="alert alert-danger">
                { this.state.errors.error || "Tài khoản chưa xác thực" }
                <a href="#" onClick={this.onClick} className="badge-pill badge-warning pull-right">Gửi lại mã xác thực</a>
            </div>
        )
    }
};

ResendTokenVerifyAccount.propTypes = {
    username: PropTypes.string.isRequired,
    userResendTokenVerifyAccountRequest: PropTypes.func.isRequired,
    deleteAllFlashMessage: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

export default withRouter(connect(state => { return {} }, { deleteAllFlashMessage, addFlashMessage, userResendTokenVerifyAccountRequest})(ResendTokenVerifyAccount));
