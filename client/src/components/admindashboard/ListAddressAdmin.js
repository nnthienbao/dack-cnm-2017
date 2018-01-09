import React from 'react';
import ReactPaginate from 'react-paginate';

const ListAddressAdmin = (props) => {
    const { listAddress, totalPage, onPageChange } = props;
    const listAddressView = listAddress.map((address, key) => (
        <tr key={key}>
            <td className="text-center">{address.address}</td>
            <td className="text-center">{address.username}</td>
            <td className="text-center">{address.coin.realable}</td>
            <td className="text-center">{address.coin.available}</td>
        </tr>
    ))
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
                                        {
                                            listAddressView
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

export default ListAddressAdmin;