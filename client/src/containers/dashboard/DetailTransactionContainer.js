import React from 'react';
import {connect} from 'react-redux';
import PropsType from 'prop-types';

import DetailTransaction from "../../components/dashboard/DetailTransaction";
import {getInfoTransaction} from '../../actions/userAction';

class DetailTransactionContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trans: {}
        }
    }

    componentDidMount() {
        const ref = this.props.match.params.ref;
        this.props.getInfoTransaction(ref).then(res => {
            this.setState({
                trans: res.data
            })
        }).catch(err => {

        })
    }

    render() {
        return (
            <DetailTransaction
                trans={this.state.trans}
            />
        )
    }
}

DetailTransactionContainer.propTypes = {
    getInfoTransaction: PropsType.func.isRequired
};

export default connect(state => { return {} }, { getInfoTransaction })(DetailTransactionContainer);