import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Wallet from "./Wallet";
import Transaction from "./Transaction";

const DashboardPage = ({match}) => (
    <div className="page">
        {/*Main Navbar*/}
        <Header/>
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

export default DashboardPage;