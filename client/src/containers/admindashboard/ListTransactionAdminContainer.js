import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {adminRequestGetListTransactionHistory} from '../../actions/adminAction';
import ListTransactionsAdmin from "../../components/admindashboard/ListTransactionsAdmin";

class ListTransactionAdminContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            totalItem: 0,
            listTrans: []
        };

        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange(page) {
        this.props.adminRequestGetListTransactionHistory(page.selected, this.state.limit).then(res => {
            this.setState({
                totalItem: res.headers['total-item'],
                listTrans: res.data
            })
        }).catch((err)=> {
            console.log(err);
        })
    }

    componentDidMount() {
        this.onPageChange(0);
    }

    render () {
        return (
            <ListTransactionsAdmin
                listTrans={this.state.listTrans}
                totalPage={Math.round(this.state.totalItem/this.state.limit)}
                onPageChange={this.onPageChange}
            />
        )
    }
}

ListTransactionAdminContainer.propTypes = {
    adminRequestGetListTransactionHistory: PropTypes.func.isRequired
};

export default connect(state => { return {} }, {adminRequestGetListTransactionHistory})(ListTransactionAdminContainer);