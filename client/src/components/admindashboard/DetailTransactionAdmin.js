import React from 'react';

const DetailTransactionAdmin = (props) => {
    return (
        <div>
            <header className="page-header">
                <div className="container-fluid">
                    <h2 className="no-margin-bottom">Chi tiết giao dịch 5a514a374e1d8d325040e8f8</h2>
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
                                            <td>5a514a374e1d8d325040e8f8</td>
                                        </tr>
                                        <tr>
                                            <td>Số tiền</td>
                                            <td>100</td>
                                        </tr>
                                        <tr>
                                            <td>Người dùng</td>
                                            <td>nnthienbao</td>
                                        </tr>
                                        <tr>
                                            <td>referencedOutputHash</td>
                                            <td>00000000000000000000000000000000</td>
                                        </tr>
                                        <tr>
                                            <td>referencedOutputIndex</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>Địa chỉ nhận</td>
                                            <td>e813260dc0015f9bc91abd9fc3e3bd1e3120d9540d70df3b512a3ce89cefb4f3</td>
                                        </tr>
                                        <tr>
                                            <td>Trạng thái</td>
                                            <td>
                                                Khởi tạo
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

export default DetailTransactionAdmin;