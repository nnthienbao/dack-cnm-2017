import React from 'react';
import { NavLink  } from 'react-router-dom';

const SidebarAdmin = (props) => {
    return (
        <nav className="side-navbar">
            {/*Sidebar Header*/}
            <div className="sidebar-header d-flex align-items-center">
                <div className="title">
                </div>
            </div>
            {/*Sidebar Navidation Menus*/}
            <ul className="list-unstyled">
                <li>
                    <NavLink activeClassName="active" to="/admin-dashboard/statistics"> <i className="fa fa-bar-chart"/>Thống kê</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/admin-dashboard/users"> <i className="fa fa-user"/>Danh sách người dùng</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/admin-dashboard/transactions"> <i className="fa fa-share"/>Danh sách giao dịch</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/admin-dashboard/address"> <i className="fa fa-address-book-o "/>Danh sách địa chỉ</NavLink>
                </li>
            </ul>
        </nav>
    )
};

export default SidebarAdmin;