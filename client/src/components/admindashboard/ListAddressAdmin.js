import React from 'react';
import ReactPaginate from 'react-paginate';

const ListAddressAdmin = (props) => {
    return (
        <div>
            <header className="page-header">
                <div className="container-fluid">
                    <h2 className="no-margin-bottom">Danh sách địa chỉ</h2>
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
                                            <th className="text-center">Địa chỉ</th>
                                            <th className="text-center">Tham chiếu người dùng</th>
                                            <th className="text-center">Số dư thực tế</th>
                                            <th className="text-center">Số dư khả dụng</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="text-center">e813260dc0015f9bc91abd9fc3e3bd1e3120d9540d70df3b512a3ce89cefb4f3</td>
                                            <td className="text-center">nnthienbao</td>
                                            <td className="text-center">200</td>
                                            <td className="text-center">150</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">e813260dc0015f9bc91abd9fc3e3bd1e3120d9540d70df3b512a3ce89cefb4f3</td>
                                            <td className="text-center">nnthienbao</td>
                                            <td className="text-center">200</td>
                                            <td className="text-center">150</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">e813260dc0015f9bc91abd9fc3e3bd1e3120d9540d70df3b512a3ce89cefb4f3</td>
                                            <td className="text-center">nnthienbao</td>
                                            <td className="text-center">200</td>
                                            <td className="text-center">150</td>
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

export default ListAddressAdmin;