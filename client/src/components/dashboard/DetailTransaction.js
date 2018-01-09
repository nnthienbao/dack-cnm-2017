import React from 'react';
import moment from 'moment';

const DetailTransaction = (props) => {
    const { ref, value, createAt, receiverAddress,
        referencedOutputHash, referencedOutputIndex, status } = props.trans;
    return (
        <div>
            <header className="page-header">
                <div className="container-fluid">
                    <h2 className="no-margin-bottom">Chi tiết giao dịch {ref}</h2>
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
                                            <td>Tham chiếu giao dịch</td>
                                            <td>{ref}</td>
                                        </tr>
                                        <tr>
                                            <td>Số lượng</td>
                                            <td>{value}</td>
                                        </tr>
                                        <tr>
                                            <td>Địa chỉ nhận</td>
                                            <td>{receiverAddress}</td>
                                        </tr>
                                        <tr>
                                            <td>referencedOutputHash</td>
                                            <td>{referencedOutputHash}</td>
                                        </tr>
                                        <tr>
                                            <td>referencedOutputIndex</td>
                                            <td>{referencedOutputIndex}</td>
                                        </tr>
                                        <tr>
                                            <td>Ngày tạo</td>
                                            <td>{moment(createAt).format("DD/MM/YYYY hh:mm:ss")}</td>
                                        </tr>
                                        <tr>
                                            <td>Trạng thái</td>
                                            <td>
                                                {status}
                                            </td>
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

export default DetailTransaction;