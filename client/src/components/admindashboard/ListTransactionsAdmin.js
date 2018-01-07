import React from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const ListTransactionsAdmin = (props) => {
    return (
        <div>
            <header className="page-header">
                <div className="container-fluid">
                    <h2 className="no-margin-bottom">Danh sách giao dịch</h2>
                </div>
            </header>

            <section className="tables">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th className="text-center">Tham chiếu</th>
                                            <th className="text-center">Người dùng</th>
                                            <th className="text-center">Số tiền</th>
                                            <th className="text-center">Trạng thái</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="text-center"><Link to={`/admin-dashboard/transactions/detail`}>5a514a374e1d8d325040e8f8</Link></td>
                                            <td className="text-center">nnthienbao</td>
                                            <td className="text-center">200</td>
                                            <td className="text-center">Khởi tạo</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center"><Link to={`/admin-dashboard/transactions/detail`}>5a514a374e1d8d325040e8f8</Link></td>
                                            <td className="text-center">nnthienbao</td>
                                            <td className="text-center">200</td>
                                            <td className="text-center">Khởi tạo</td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={10}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={4}
                                        containerClassName={"pagination justify-content-center"}
                                        pageClassName={"page-item"}
                                        pageLinkClassName={"page-link"}
                                        nextClassName={"page-item"}
                                        previousLinkClassName={"page-link"}
                                        nextLinkClassName={"page-link"}
                                        previousClassName={"page-item"}
                                        activeClassName={"active"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default ListTransactionsAdmin;