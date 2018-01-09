import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Welcome from "../components/Welcome";
import LoginPage from "../components/login/LoginPage";
import DashboardPage from "./dashboard/DashboardPage";
import requiredAuth from '../containers/Authenticate';
import AdminDashboardPage from "./admindashboard/AdminDashboardPage";
import ConfirmTransaction from "./dashboard/ConfirmTransaction";

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Welcome}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={LoginPage}/>
                <Route path="/forgot-password" component={LoginPage}/>
                <Route path="/verify-account" component={LoginPage}/>
                <Route path="/dashboard" component={requiredAuth(DashboardPage)}/>
                <Route path="/transactions/confirm/:token" component={ConfirmTransaction}/>
                <Route path="/admin-dashboard" component={AdminDashboardPage}/>
            </div>
        );
    }
}

export default App;
