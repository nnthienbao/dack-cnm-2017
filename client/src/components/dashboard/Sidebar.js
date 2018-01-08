import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => (
    <nav className="side-navbar">
    {/*Sidebar Header*/}
<div className="sidebar-header d-flex align-items-center">
    <div className="title">
        <h1 className="h4">Thiên Bảo</h1>
        <p>User</p>
    </div>
</div>
{/*Sidebar Navidation Menus*/}
<ul className="list-unstyled">
    <li>
        <NavLink activeClassName="active" to="/dashboard/wallet"> <i className="fa fa-money "/>Ví tiền</NavLink>
    </li>
    <li>
        <NavLink activeClassName="active" to="/dashboard/withdraw"> <i className="fa fa-share"/>Rút tiền</NavLink>
    </li>
    <li>
        <NavLink activeClassName="active" to="/dashboard/history/recharge"> <i className="fa fa-history"/>Lịch sử nạp tiền</NavLink>
    </li>
    <li>
        <NavLink activeClassName="active" to="/dashboard/history/withdraw"> <i className="fa fa-history"/>Lịch sử rút tiền</NavLink>
    </li>
</ul>
</nav>
)

export default Sidebar;