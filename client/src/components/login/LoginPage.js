import React from 'react';
import {Route} from 'react-router-dom';
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import RegisterContainer from "../../containers/RegisterContainer";

const LoginPage = (props) => (
    <div>
        <div className="page login-page">
            <div className="container d-flex align-items-center">
                <div className="form-holder has-shadow">
                    <div className="row">
                        {/*Logo & Information Panel*/}
                        <div className="col-lg-6">
                            <div className="info d-flex align-items-center">
                                <div className="content">
                                    <div className="logo">
                                        <h1>KCOIN</h1>
                                    </div>
                                    <p>KCoin is a cryptocurrency and worldwide payment system</p>
                                </div>
                            </div>
                        </div>
                        {/*Form Panel*/}
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={RegisterContainer}/>
                        <Route path="/forgot-password" component={ForgotPassword}/>
                    </div>
                </div>
            </div>
            <div className="copyrights text-center">
                <p>Design by <a className="external">Kcoin</a></p></div>
        </div>
    </div>
)

export default LoginPage;