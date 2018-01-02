import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import FlashMessageList from "../../containers/FlashMessageList";

const VerifyAccount = (props) => {
    const {errors, token, isLoading, onChange, onSubmit} = props;
    return (
        <div className="col-lg-6 bg-white">
            <h2 className="page-header">VERIFY ACCOUNT</h2>
            <div className="form align-items-center">
                <div className="content">
                    <FlashMessageList/>
                    {errors.token && <div className="alert alert-danger">{errors.token}</div>}
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label className="form-control-label">Để xác thực tài khoản, nhập đoạn mã bạn nhận được ở email vào đây và nhấn
                                Submit</label>
                            <input type="text" name="token" value={token} onChange={onChange}
                                   className="form-control"/>
                        </div>

                        <button style={{marginTop:-20}} type="submit" disabled={isLoading} className="btn btn-primary">Submit</button>
                        {/*This should be submit button but I replaced it with <a> for demo purposes*/}
                    </form>

                    <small>Do not have an account?</small>
                    <Link className="signup" to="/register">Register</Link>
                    <br/>
                    <small>Already have an account?</small>
                    <Link to="/login" className="signup">Login</Link>
                </div>
            </div>
        </div>
    )
};

VerifyAccount.propTypes = {
    errors: PropTypes.object,
    token: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default VerifyAccount;
