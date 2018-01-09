import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import StatisticsAdmin from "../../components/admindashboard/StatisticsAdmin";
import { adminRequestGetStatistics } from '../../actions/adminAction';

class StatisticsAdminContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalUser: 0,
            totalRealableCoin: 0,
            totalAvailableCoin: 0
        }
    }

    componentDidMount() {
        this.props.adminRequestGetStatistics().then(res => {
            const { totalUser, totalRealableCoin, totalAvailableCoin } = res.data;
            this.setState({
                totalUser: totalUser,
                totalRealableCoin: totalRealableCoin,
                totalAvailableCoin: totalAvailableCoin
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <StatisticsAdmin
                totalUser={this.state.totalUser}
                totalRealableCoin={this.state.totalRealableCoin}
                totalAvailableCoin={this.state.totalAvailableCoin}
            />
        )
    }
}

StatisticsAdminContainer.propTypes = {
    adminRequestGetStatistics: PropTypes.func.isRequired
};

export default connect(state => { return {} }, { adminRequestGetStatistics })(StatisticsAdminContainer);