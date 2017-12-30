import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
    class Authenticate extends React.Component {

        componentWillMount() {
            if(!this.props.isAuthenticate) {
                this.props.history.push('/login');
            }
        }

        componentDidUpdate(nextProps) {
            if(!nextProps.isAuthenticate) {
                this.props.history.push('/login');
            }
        }

        render() {
            console.log(this.props);
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticate: state.auth.isAuthenticate
        }
    };

    Authenticate.propTypes = {
        isAuthenticate: PropTypes.bool.isRequired
    }

    return connect(mapStateToProps, {})(Authenticate);
}
