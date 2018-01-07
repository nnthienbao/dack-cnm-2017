import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = (props) => {
    const { field, type, value, label, error, onChange} = props;
    return (
        <div className="form-group">
            <label className="form-control-label">{label}</label>
            <input type={type} name={field} className={classnames("form-control", {"is-invalid": error})} value={value} onChange={onChange} />
            { error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
};

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;