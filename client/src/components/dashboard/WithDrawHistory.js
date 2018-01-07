import React from 'react';
import { NavLink } from 'react-router-dom';

const WithDrawHitory = (props) => {
    return (
        <div>
            <header className="page-header">
                <div className="container-fluid">
                    <h2 className="no-margin-bottom">Lịch sử rút tiền</h2>
                </div>
            </header>

            <section className="tables">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th className="text-center">Tham chiếu giao dịch</th>
                                        <th className="text-center">Thời gian</th>
                                        <th className="text-center">Số lượng</th>
                                        <th className="text-center">Trạng thái</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="text-center"><NavLink to="/dashboard/transaction/detail">5a514a374e1d8d325040e8f8</NavLink></td>
                                        <td className="text-center">2018-01-07 05:14:16.073</td>
                                        <td className="text-center">300</td>
                                        <td className="text-center">Chờ xác nhận</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default WithDrawHitory;