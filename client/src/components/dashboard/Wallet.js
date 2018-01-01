import React from 'react';
import QrCode from 'qrcode.react';

const Wallet = (props) => (
    <div>
        <header className="page-header">
            <div className="container-fluid">
                <h2 className="no-margin-bottom">Wallet</h2>
            </div>
        </header>
        <section className="dashboard-counts no-padding-bottom">
            <div className="container-fluid">
                <div className="row bg-white has-shadow">
                    {/*<!-- Item -->*/}
                    <div className="col-xl-6 col-sm-6">
                        <div className="item d-flex align-items-center">
                            <div className="icon bg-violet"><i className="icon-user"/></div>
                            <div className="title"><span>Số dư<br />thực tế</span>
                                <div className="progress">
                                    <div role="progressbar" style={{width: "100%", height: 4}} aria-valuenow="{#val.value}" aria-valuemin="0" aria-valuemax="100" className="progress-bar bg-violet"/>
                                </div>
                            </div>
                            <div className="number"><strong>25</strong></div>
                        </div>
                    </div>
                    {/*<!-- Item -->*/}
                    <div className="col-xl-6 col-sm-6">
                        <div className="item d-flex align-items-center">
                            <div className="icon bg-red"><i className="icon-padnote"/></div>
                            <div className="title"><span>Số dư<br />khả dụng</span>
                                <div className="progress">
                                    <div role="progressbar" style={{width: "100%", height: 4}} aria-valuenow="{#val.value}" aria-valuemin="0" aria-valuemax="100" className="progress-bar bg-red"/>
                                </div>
                            </div>
                            <div className="number"><strong>70</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="forms">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header d-flex align-items-center">
                                <h3 className="h4">Địa chỉ nhận tiền của bạn</h3>
                            </div>
                            <div className="card-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" value="82575e86a3c7e05b9c8cec01454ae3d085fa4472b5f02203a1aa941f855d1628" className="form-control"/><span className="input-group-btn">
                                  <button type="button" className="btn btn-primary">Copy</button></span>
                                        </div>
                                    </div>
                                    <div className="mx-auto" style={{width: 120}}>
                                        <QrCode
                                            level="Q"
                                            value="82575e86a3c7e05b9c8cec01454ae3d085fa4472b5f02203a1aa941f855d1628"
                                        />
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

export default Wallet;