import React from 'react';

const Withdraw = (props) => (
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
                                <form className="form-horizontal">
                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label">Địa chỉ nhận tiền</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label">Số lượng</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-2 offset-sm-2">
                                            <button type="submit" className="btn btn-primary">Rút tiền</button>
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
);

export default Withdraw;