import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import DetailTransactionAdmin from "../../components/admindashboard/DetailTransactionAdmin";
import {adminGetInfoTransaction} from '../../actions/adminAction';

class DetailTransactionAdminContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trans: {}
        }
    }

    componentDidMount() {
        const ref = this.props.match.params.ref;
        this.props.adminGetInfoTransaction(ref).then(res => {
            this.setState({
                trans: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <DetailTransactionAdmin
                trans={this.state.trans}
            />
        )
    }
}

DetailTransactionAdminContainer.propTypes = {
    adminGetInfoTransaction: PropTypes.func.isRequired
};

export default connect(state => { return {} }, { adminGetInfoTransaction })(DetailTransactionAdminContainer);