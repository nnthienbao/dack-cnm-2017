import React from 'react';
import {connect} from 'react-redux';
import PropsType from 'prop-types';

import WithDrawHitory from "../../components/dashboard/WithDrawHistory";
import { userGetWithdrawHistory } from '../../actions/userAction';

class WithDrawHistoryContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listTrans: []
        }
    }

    componentDidUpdate() {
        this.props.userGetWithdrawHistory().then(res => {
            this.setState({
                listTrans: res.data
            })
        }).catch(err => {

        })
    }

    render() {
        return (
            <WithDrawHitory
                listTrans={this.state.listTrans}
            />
        )
    }
}

WithDrawHistoryContainer.propsType = {
    userGetWithdrawHistory: PropsType.func.isRequired
};

export default connect(state => { return {} }, { userGetWithdrawHistory })(WithDrawHistoryContainer);