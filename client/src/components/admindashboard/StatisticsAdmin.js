import React from 'react';

const StatisticsAdmin = (props) => {
    const { totalUser, totalRealableCoin, totalAvailableCoin } = props;
    return (
        <div>
            <header className="page-header">
                <div className="container-fluid">
                    <h2 className="no-margin-bottom">Thống kê</h2>
                </div>
            </header>
            <section className="tables">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <table className="table">
                                        <tbody>
                                        <tr>
                                            <td>Số người dùng</td>
                                            <td>{totalUser}</td>
                                        </tr>
                                        <tr>
                                            <td>Số dư thực tế</td>
                                            <td>{totalRealableCoin} KCO</td>
                                        </tr>
                                        <tr>
                                            <td>Só dư khả dụng</td>
                                            <td>{totalAvailableCoin} KCO</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default StatisticsAdmin;