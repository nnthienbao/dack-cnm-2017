import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Wallet from "../../components/dashboard/Wallet";

class WalletContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Wallet
                userInfo={this.props.userInfo}
            />
        )
    }
}

WalletContainer.propTypes = {
    userInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.info
    }
};

export default connect(mapStateToProps, {})(WalletContainer);