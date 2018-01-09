import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RechargeHistory from "../../components/dashboard/RechargeHistory";
import { userGetRechargeHistory } from '../../actions/userAction';

class RechargeHistoryContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listTrans: []
        }
    }

    componentDidMount() {
        this.props.userGetRechargeHistory().then(res => {
            console.log(res);
            this.setState({
                listTrans: res.data
            })
        }).catch((err) => {

        })

    }

    render() {
        return (
            <RechargeHistory
                listTrans={this.state.listTrans}
            />
        )
    }
}

RechargeHistoryContainer.propTypes = {
    userGetRechargeHistory: PropTypes.func.isRequired,
};

export default connect(state => { return {} }, { userGetRechargeHistory } )(RechargeHistoryContainer);