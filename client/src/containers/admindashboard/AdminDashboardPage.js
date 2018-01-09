import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HeaderAdmin from "../../components/admindashboard/HeaderAdmin";
import SidebarAdmin from "../../components/admindashboard/SidebarAdmin";
import Footer from "../../components/dashboard/Footer";
import { logout, userRequestGetInfo  } from '../../actions/userAction';
import StatisticsAdmin from "../../components/admindashboard/StatisticsAdmin";
import ListUsersAdmin from "../../components/admindashboard/ListUsersAdmin";
import ListTransactionsAdmin from "../../components/admindashboard/ListTransactionsAdmin";
import DetailTransactionAdmin from "../../components/admindashboard/DetailTransactionAdmin";
import ListAddressAdmin from "../../components/admindashboard/ListAddressAdmin";
import StatisticsAdminContainer from "./StatisticsAdminContainer";

class AdminDashboardPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.userRequestGetInfo();
    }

    render() {
        const { match } = this.props;
        return (
            <div className="page">
                {/*Main Navbar*/}
                <HeaderAdmin userInfo={this.props.userInfo} logout={this.props.logout}/>
                <div className="page-content d-flex align-items-stretch">
                    {/*Side Navbar*/}
                    <SidebarAdmin/>
                    <div className="content-inner">
                        <Route exact path={`${match.url}`} render={() => <Redirect to="/admin-dashboard/statistics"/>}/>
                        <Route path={`${match.url}/statistics`} component={StatisticsAdminContainer}/>
                        <Route path={`${match.url}/users`} component={ListUsersAdmin}/>
                        <Route exact path={`${match.url}/transactions`} component={ListTransactionsAdmin}/>
                        <Route exact path={`${match.url}/transactions/detail`} component={DetailTransactionAdmin}/>
                        <Route path={`${match.url}/address`} component={ListAddressAdmin}/>
                        {/*Page Footer*/}
                        <Footer/>
                    </div>
                </div>
            </div>
        )
    }
}

AdminDashboardPage.propTypes = {
    logout: PropTypes.func.isRequired,
    userRequestGetInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.info,
    }
};



export default connect(mapStateToProps, { logout, userRequestGetInfo })(AdminDashboardPage);