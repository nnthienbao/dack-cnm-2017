import React from 'react';
import ReactPaginate from 'react-paginate';

const ListUsersAdmin = (props) => {
    const {listUsers, totalPage, onPageChange} = props;
    const listUsersView = listUsers.map((user, key) => (
        <tr key={key}>
            <td className="text-center">{user.username}</td>
            <td className="text-center">{user.email}</td>
            <td className="text-center">{user.coin.realable}</td>
            <td className="text-center">{user.coin.available}</td>
        </tr>
    ));
    return (
        <div>
            <header className="page-header">
                <div className="container-fluid">
                    <h2 className="no-margin-bottom">Danh sách tài khoản người dùng</h2>
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
                                            <th className="text-center">User Name</th>
                                            <th className="text-center">Email</th>
                                            <th className="text-center">Số dư thực tế</th>
                                            <th className="text-center">Số dư khả dụng</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            listUsersView
                                        }
                                        </tbody>
                                    </table>

                                    <div className="text-center">
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
                                            hrefBuilder={()=> { return (<a href="#"/>) }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default ListUsersAdmin;