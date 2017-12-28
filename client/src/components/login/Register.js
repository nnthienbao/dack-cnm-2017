import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Recaptcha from 'react-grecaptcha';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            repassword: '',
            agreeLicense: false
        };

        this.onchange = this.onchange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onchange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        if(e.target.name === 'agreeLicense'){
            this.setState({
                [e.target.name]: e.target.checked
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        axios.post('/api/register', {user: this.state})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {

            })
    }

    render() {
        return (
            <div className="col-lg-6 bg-white">
                <h2 className="page-header">REGISTER</h2>
                <div className="form align-items-center">
                    <div className="content">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="register-username" className="form-control-label">User Name</label>
                                <input name="username" className="form-control" value={this.state.username} onChange={this.onchange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="register-email" className="form-control-label">Email Address</label>
                                <input name="email" className="form-control" value={this.state.email} onChange={this.onchange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="register-passowrd" className="form-control-label">Password</label>
                                <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onchange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="register-repassowrd" className="form-control-label">Re password</label>
                                <input type="password" name="repassword" className="form-control" value={this.state.repassword} onChange={this.onchange}/>
                            </div>
                            <div className="form-group terms-conditions">
                                <input type="checkbox" name="agreeLicense" className="checkbox-template" value={this.state.agreeLicense} onChange={this.onchange}/>
                                <label htmlFor="license">Agree the terms and policy</label>
                            </div>
                            <Recaptcha
                                sitekey="6Lf8aj4UAAAAAAI1X6wFypJkr6PeBfd0FX38XUTO"
                                className="g-recaptcha"
                            />
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                        <small>Already have an account?</small>
                        <Link to="/login" className="signup">Login</Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default Register;