import React from 'react';
import classnames from 'classnames';

const Withdraw = (props) => {
    const { value, receiverAddress, errors, isLoading, onChange, onSubmit } = props;
    return (
        <div>
            <header className="page-header">
                <div className="container-fluid">
                    <h2 className="no-margin-bottom">Rút tiền</h2>
                </div>
            </header>

            <section className="forms">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header d-flex align-items-center">
                                    <h3 className="h4">Thông tin</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={onSubmit} className="form-horizontal">
                                        <div className="form-group row">
                                            <label className="col-sm-2 form-control-label">Địa chỉ nhận tiền</label>
                                            <div className="col-sm-10">
                                                <input type="text" name="receiverAddress" value={receiverAddress} onChange={onChange}
                                                       className={classnames("form-control", {"is-invalid": errors.receiverAddress})}/>
                                                { errors.receiverAddress && <div className="invalid-feedback">{errors.receiverAddress}</div>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-2 form-control-label">Số lượng</label>
                                            <div className="col-sm-10">
                                                <input type="number" name="value" value={value} onChange={onChange}
                                                       className={classnames("form-control", {"is-invalid": errors.value})}/>
                                                { errors.value && <div className="invalid-feedback">{errors.value}</div>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-2 offset-sm-2">
                                                <button type="submit" disabled={isLoading} className="btn btn-primary">Rút tiền</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Withdraw;