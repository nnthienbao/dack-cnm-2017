import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";
import Footer from "../../components/dashboard/Footer";
import Wallet from "../../components/dashboard/Wallet";
import Transaction from "../../components/dashboard/Transaction";
import { logout  } from '../../actions/userAction';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { match } = this.props;
        return (
            <div className="page">
                {/*Main Navbar*/}
                <Header logout={this.props.logout}/>
                <div className="page-content d-flex align-items-stretch">
                    {/*Side Navbar*/}
                    <Sidebar/>
                    <div className="content-inner">
                        {/*Page Header*/}
                        <Route exact path={`${match.url}`} render={() => <Redirect to="/dashboard/wallet"/>}/>
                        <Route path={`${match.url}/wallet`} component={Wallet}/>
                        <Route path={`${match.url}/transaction`} component={Transaction}/>

                        {/*Page Footer*/}
                        <Footer/>
                    </div>
                </div>
            </div>
        )
    }
}

DashboardPage.propTypes = {
    logout: PropTypes.func.isRequired
}



export default connect(state => { return {} }, { logout })(DashboardPage);