import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ListAddressAdmin from "../../components/admindashboard/ListAddressAdmin";
import {adminRequestGetListAddress} from '../../actions/adminAction';

class ListAddressAdminContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalItem: 0,
            limit: 10,
            listAddress: []
        };

        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange(page) {
        this.props.adminRequestGetListAddress(page.selected, this.state.limit).then(res => {
            this.setState({
                totalItem: res.headers['total-item'],
                listAddress: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.onPageChange(0);
    }

    render() {
        return (
            <ListAddressAdmin
                listAddress={this.state.listAddress}
                totalPage={Math.round(this.state.totalItem/this.state.limit)}
                onPageChange={this.onPageChange}
            />
        )
    }
}

ListAddressAdminContainer.propTypes = {
    adminRequestGetListAddress: PropTypes.func.isRequired
};

export default connect(state => { return {} }, {adminRequestGetListAddress})(ListAddressAdminContainer);