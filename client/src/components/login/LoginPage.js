import React from 'react';
import {Route} from 'react-router-dom';
import RegisterContainer from "../../containers/login/RegisterContainer";
import LoginContainer from "../../containers/login/LoginContainer";
import VerifyAccountContainer from "../../containers/login/VerifyAccountContainer";
import ForgotPasswordContainer from "../../containers/login/ForgotPasswordContainer";

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
                        <Route path="/login" component={LoginContainer}/>
                        <Route path="/register" component={RegisterContainer}/>
                        <Route path="/forgot-password" component={ForgotPasswordContainer}/>
                        <Route path="/verify-account" component={VerifyAccountContainer}/>
                    </div>
                </div>
            </div>
            <div className="copyrights text-center">
                <p>Design by <a className="external">Kcoin</a></p></div>
        </div>
    </div>
)

export default LoginPage;