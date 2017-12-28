import React from 'react';
import PropTypes from 'prop-types';

import Register from '../components/login/Register';

class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            repassword: '',
            agreeLicense: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
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
        this.props.userRegisterRequest(this.state);
    }

    render() {
        return (
            <Register
                username={this.state.username}
                email={this.state.email}
                password={this.state.password}
                repassword={this.state.repassword}
                agreeLicense={this.state.agreeLicense}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
            />
        );
    }
}

RegisterContainer.propTypes = {
    userRegisterRequest: PropTypes.func.isRequired
}

export default RegisterContainer;