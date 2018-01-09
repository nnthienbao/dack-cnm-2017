import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userConfirmTransaction } from '../../actions/userAction';

class ConfirmTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            errors: {},
            isSuccess: false
        }
    }

    componentDidMount() {
        const token = this.props.match.params.token;
        this.setState({
            token: token
        });
        this.props.userConfirmTransaction({ token }).then(res => {
            this.setState({
                isSuccess: true
            })
        }).catch(err => {
            this.setState({
                errors: err.response.data
            });
        })
    }

    render() {
        const { errors, isSuccess } = this.state;
        return (
            <div>
                { errors.error &&
                <div className="alert alert-danger">
                    <strong>
                        {errors.error}
                    </strong>
                </div>
                }

                { isSuccess &&
                <div className="alert alert-success">
                    <strong>
                        Xác nhận giao dịch thành công
                    </strong>
                </div>
                }
            </div>
        )
    }
}

ConfirmTransaction.propTypes = {
    userConfirmTransaction: PropTypes.func.isRequired
};

export default connect(state => { return {} }, { userConfirmTransaction })(ConfirmTransaction);