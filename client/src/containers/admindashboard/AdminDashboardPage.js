import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HeaderAdmin from "../../components/admindashboard/HeaderAdmin";
import SidebarAdmin from "../../components/admindashboard/SidebarAdmin";
import Footer from "../../components/dashboard/Footer";
import { logout, userRequestGetInfo  } from '../../actions/userAction';
import StatisticsAdminContainer from "./StatisticsAdminContainer";
import ListUsersAdminContainer from "./ListUsersAdminContainer";
import ListTransactionAdminContainer from "./ListTransactionAdminContainer";
import DetailTransactionAdminContainer from "./DetailTransactionAdminContainer";
import ListAddressAdminContainer from "./ListAddressAdminContainer";

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
                        <Route path={`${match.url}/users`} component={ListUsersAdminContainer}/>
                        <Route exact path={`${match.url}/transactions`} component={ListTransactionAdminContainer}/>
                        <Route exact path={`${match.url}/transactions/detail/:ref`} component={DetailTransactionAdminContainer}/>
                        <Route path={`${match.url}/address`} component={ListAddressAdminContainer}/>
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