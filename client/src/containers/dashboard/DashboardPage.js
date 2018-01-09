import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";
import Footer from "../../components/dashboard/Footer";
import Withdraw from "../../components/dashboard/Withdraw";
import { logout, userRequestGetInfo  } from '../../actions/userAction';
import WalletContainer from "./WalletContainer";
import WithDrawHitory from "../../components/dashboard/WithDrawHistory";
import RechargeHistory from "../../components/dashboard/RechargeHistory";
import DetailTransaction from "../../components/dashboard/DetailTransaction";
import WithdrawContainer from "./WithdrawContainer";

class DashboardPage extends React.Component {
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
                <Header userInfo={this.props.userInfo} logout={this.props.logout}/>
                <div className="page-content d-flex align-items-stretch">
                    {/*Side Navbar*/}
                    <Sidebar/>
                    <div className="content-inner">
                        {/*Page Header*/}
                        <Route exact path={`${match.url}`} render={() => <Redirect to="/dashboard/wallet"/>}/>
                        <Route path={`${match.url}/wallet`} component={WalletContainer}/>
                        <Route exact path={`${match.url}/withdraw`} component={WithdrawContainer}/>
                        <Route path={`${match.url}/history/withdraw`} component={WithDrawHitory}/>
                        <Route path={`${match.url}/history/recharge`} component={RechargeHistory}/>
                        <Route path={`${match.url}/transaction/detail`} component={DetailTransaction}/>
                        {/*Page Footer*/}
                        <Footer/>
                    </div>
                </div>
            </div>
        )
    }
}

DashboardPage.propTypes = {
    logout: PropTypes.func.isRequired,
    userRequestGetInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.info,
    }
};



export default connect(mapStateToProps, { logout, userRequestGetInfo })(DashboardPage);