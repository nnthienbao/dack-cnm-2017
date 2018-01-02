import React from 'react';
import classnames from 'classnames';
import PropType from 'prop-types';

class FlashMessage extends React.Component {
    constructor(props) {
        super(props);

        this.onCloseClick = this.onCloseClick.bind(this);
    }

    onCloseClick() {
        this.props.deleteFlashMessage(this.props.message.id);
    }

    render() {
        const {type, text} = this.props.message;
        return (
            <div className={classnames("alert", {
                "alert-success": type === "success",
                "alert-danger": type === "error"
            })}>
                <button onClick={this.onCloseClick} className="close"><span>&times;</span></button>
                {text}
            </div>
        )
    }
}

FlashMessage.propTypes = {
    message: PropType.object.isRequired
}

export default FlashMessage;
