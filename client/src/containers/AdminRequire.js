import React from 'react';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';

export default function (ComposedComponent) {
    class AdminRequire extends React.Component {

        componentWillMount() {
            if(!this.props.isAdmin) {
                this.props.history.push('/dashboard');
            }
        }

        componentDidUpdate(nextProps) {
            if(!nextProps.isAuthenticate) {
                this.props.history.push('/dashboard');
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAdmin: state.auth.isAdmin
        }
    };

    AdminRequire.propTypes = {
        isAdmin: PropsTypes.bool.isRequired
    };

    return connect(mapStateToProps, {})(AdminRequire);
}