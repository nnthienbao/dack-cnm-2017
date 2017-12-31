import React from 'react';
import PropTypes from 'prop-types';

import TextFieldGroup from "../../common/TextFieldGroup";

const ForgotPasswordStepTwo = (props) => {
    const { token, passwordNew, rePasswordNew, errors, isLoading, onChange, onSubmit } = props;
    return (
        <div>
            <div className="alert alert-success">Mời bạn kiểm tra email để lấy mã xác nhận</div>
            <form onSubmit={onSubmit}>
                <TextFieldGroup
                    field={"token"}
                    value={token}
                    label={"Nhập mã bạn nhận được ở email vào đây"}
                    error={errors.token}
                    onChange={onChange}
                />
                <TextFieldGroup
                    field={"passwordNew"}
                    value={passwordNew}
                    label={"Password"}
                    error={errors.passwordNew}
                    onChange={onChange}
                    type={"password"}
                />
                <TextFieldGroup
                    field={"rePasswordNew"}
                    value={rePasswordNew}
                    label={"Re Password"}
                    error={errors.rePasswordNew}
                    onChange={onChange}
                    type={"password"}
                />
                <button type="submit" disabled={isLoading} className="btn btn-primary">Send</button>
            </form>
        </div>
    )
};

ForgotPasswordStepTwo.propTypes = {
    token: PropTypes.string.isRequired,
    passwordNew: PropTypes.string.isRequired,
    rePasswordNew: PropTypes.string.isRequired,
    errors: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default ForgotPasswordStepTwo;