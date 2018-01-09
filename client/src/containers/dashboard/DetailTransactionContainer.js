import React from 'react';
import {connect} from 'react-redux';
import PropsType from 'prop-types';

import DetailTransaction from "../../components/dashboard/DetailTransaction";
import {getInfoTransaction, userRequestCancelTransaction} from '../../actions/userAction';

class DetailTransactionContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trans: {},
            errors: {}
        };

        this.onCancelTrans = this.onCancelTrans.bind(this);
    }

    onCancelTrans(ref) {
        if(window.confirm("Bạn có chắc muốn hủy giao dịch này?")) {
            // Huy giao dich
            this.props.userRequestCancelTransaction(ref).then(res => {
                this.props.history.push('/dashboard/history/withdraw')
            }).catch(err => {
                this.setState({
                    errors: err.response.data
                })
            })
        }
    }

    componentDidMount() {
        const ref = this.props.match.params.ref;
        this.props.getInfoTransaction(ref).then(res => {
            this.setState({
                trans: res.data
            })
        }).catch(err => {

        })
    }

    render() {
        return (
            <DetailTransaction
                trans={this.state.trans}
                errors={this.state.errors}
                onCancelTrans={this.onCancelTrans}
            />
        )
    }
}

DetailTransactionContainer.propTypes = {
    getInfoTransaction: PropsType.func.isRequired,
    userRequestCancelTransaction: PropsType.func.isRequired
};

export default connect(state => { return {} }, { getInfoTransaction, userRequestCancelTransaction })(DetailTransactionContainer);