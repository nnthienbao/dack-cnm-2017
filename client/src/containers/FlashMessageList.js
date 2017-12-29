import React from 'react';
import PropsType from 'prop-types';
import { connect } from 'react-redux';

import FlashMessage from "../components/login/FlashMessage";
import { deleteFlashMessage } from '../actions/flashMessageAction';

class FlashMessageList extends React.Component {

    render() {
        const messages = this.props.messages.map(message => (
            <FlashMessage
                key={message.id} message={message}
                deleteFlashMessage={this.props.deleteFlashMessage}/>
        ));
        return (
            <div>
                {messages}
            </div>
        )
    }
}

FlashMessageList.proptypes = {
    messages: PropsType.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        messages: state.flashMessage
    }
}

export default connect(mapStateToProps, {deleteFlashMessage})(FlashMessageList);