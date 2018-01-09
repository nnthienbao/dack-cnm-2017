import React from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const ListTransactionsAdmin = (props) => {
    const {listTrans, totalPage, onPageChange} = props;
    const listTransViews = listTrans.map((trans, key) => (
        <tr key={key}>
            <td className="text-center"><Link to={`/admin-dashboard/transactions/detail/${trans.ref}`}>{trans.ref}</Link></td>
            <td className="text-center">{trans.username}</td>
            <td className="text-center">{trans.value}</td>
            <td className="text-center">{trans.status}</td>
        </tr>
    ));

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
                                            <th className="text-center">Người gửi</th>
                                            <th className="text-center">Số tiền</th>
                                            <th className="text-center">Trạng thái</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            listTransViews
                                        }
                                        </tbody>
                                    </table>

                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={totalPage}
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
                                        onPageChange={onPageChange}
                                        hrefBuilder={() => (<a href="#"/>)}
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