import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Welcome from "../components/Welcome";
import LoginPage from "../components/login/LoginPage";
import DashboardPage from "../components/dashboard/DashboardPage";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
              <Route exact path="/" component={Welcome}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register" component={LoginPage}/>
              <Route path="/forgot-password" component={LoginPage}/>
              <Route path="/dashboard" component={DashboardPage}/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
