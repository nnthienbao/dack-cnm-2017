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
                <NavLink activeClassName="active" to="/dashboard/wallet"> <i className="fa fa-money "/>Wallet</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/dashboard/transaction"> <i className="fa fa-share"/>Transaction</NavLink>
            </li>
        </ul>
    </nav>
)

export default Sidebar;