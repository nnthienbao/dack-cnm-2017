import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
    class Authenticate extends React.Component {

        componentWillMount() {
            if(!this.props.isAuthenticate) {
                this.props.history.push('/login');
            }
            if(this.props.isAdmin) {
                this.props.history.push('/admin-dashboard');
            }
        }

        componentDidUpdate(nextProps) {
            if(!nextProps.isAuthenticate) {
                this.props.history.push('/login');
            }
            if(this.props.isAdmin) {
                this.props.history.push('/admin-dashboard');
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
            isAuthenticate: state.auth.isAuthenticate,
            isAdmin: state.auth.isAdmin
        }
    };

    Authenticate.propTypes = {
        isAuthenticate: PropTypes.bool.isRequired,
        isAdmin: PropTypes.bool.isRequired
    };

    return connect(mapStateToProps, {})(Authenticate);
}
