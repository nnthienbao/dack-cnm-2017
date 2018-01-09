import React from 'react';

import Withdraw from "../../components/dashboard/Withdraw";
import validateTransaction from '../../validation/validateTransaction';
import { userRequestTransaction } from '../../actions/userAction';

class WithdrawContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            receiverAddress: '',
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    isValid() {
        const { errors, isValid } = validateTransaction(this.state);
        if(!isValid) {
            this.setState({
                errors
            })
        }

        return isValid
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.isValid()) {
            // Gui request transaction len server
            this.setState({errors: {}, isLoading: true});
            userRequestTransaction(data).catch(err => {
                this.setState({
                    errors: err.resolve.data,
                    isLoading: true
                })
            })
        }
    }

    render() {
        return (
            <Withdraw
                value={this.state.value}
                receiverAddress={this.state.receiverAddress}
                errors={this.state.errors}
                isLoading={this.state.isLoading}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
            />
        )
    }
}

export default WithdrawContainer;