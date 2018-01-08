import React from 'react';

const StatisticsAdmin = (props) => {
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
                                            <td>51238</td>
                                        </tr>
                                        <tr>
                                            <td>Số dư thực tế</td>
                                            <td>1000636 KCO</td>
                                        </tr>
                                        <tr>
                                            <td>Só dư khả dụng</td>
                                            <td>60000 KCO</td>
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