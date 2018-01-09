import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ListUsersAdmin from "../../components/admindashboard/ListUsersAdmin";
import {adminRequestGetListUser} from '../../actions/adminAction';

class ListUsersAdminContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 1,
            totalItem: 0,
            listUsers: []
        };
        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange(page) {
        this.props.adminRequestGetListUser(page.selected, this.state.limit).then(res => {
            this.setState({
                listUsers: res.data,
                totalItem: res.headers['total-item']
            });
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.onPageChange(0);
    }

    render() {
        const {listUsers, totalItem, limit } = this.state;
        return (
            <ListUsersAdmin
                listUsers={listUsers}
                onPageChange={this.onPageChange}
                totalPage={Math.round(totalItem/limit)}
            />
        )
    }
}

ListUsersAdminContainer.propTypes = {
    adminRequestGetListUser: PropTypes.func.isRequired
}

export default connect(state => { return {} }, {adminRequestGetListUser})(ListUsersAdminContainer);