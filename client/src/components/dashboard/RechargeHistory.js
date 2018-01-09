import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const RechargeHistory = (props) => {
    const { listTrans } = props;
    const listTransView = listTrans.map((trans, key) => (
        <tr key={key}>
            <td className="text-center"><NavLink trans={trans} to={`/dashboard/transaction/detail/${trans.ref}`}>{trans.ref}</NavLink></td>
            <td className="text-center">{ moment(trans.createAt).format("DD/MM/YYYY hh:mm:ss") }</td>
            <td className="text-center">{trans.value}</td>
        </tr>
    ));
    return (
        <div>
            <header className="page-header">
                <div className="container-fluid">
                    <h2 className="no-margin-bottom">Lịch sử nạp tiền</h2>
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
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        listTransView
                                    }
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

export default RechargeHistory;