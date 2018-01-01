import React from 'react';

const Header = (props) => (
    <header className="header">
        <nav className="navbar">
            <div className="container-fluid">
                <div className="navbar-holder d-flex align-items-center justify-content-between">
                    {/*Navbar Header*/}
                    <div className="navbar-header">
                        {/*Navbar Brand*/}
                        <div className="navbar-brand">
                            <div className="brand-text brand-big"><strong>KCOIN</strong></div>
                        </div>
                    </div>
                    {/*Navbar Menu*/}
                    <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                        <li className="nav-item">
                            <div className="text-center show-price verticalLine">
                                <p>Số dư thực tế</p>
                                <small>200 KCO</small>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="text-center show-price verticalLine">
                                <p>Số dư khả dụng</p>
                                <small>100 KCO</small>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="text-center show-price">
                                <p>nnthienbao</p>
                            </div>
                        </li>
                        {/*Notifications*/}
                        <li className="nav-item dropdown">
                            <a id="notifications" rel="nofollow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link">
                                <i className="fa fa-bell-o"/><span className="badge bg-red">12</span>
                            </a>
                        </li>
                        {/*Logout*/}
                        <li className="nav-item">
                            <a href="#" onClick={props.logout} className="nav-link logout">Logout<i className="fa fa-sign-out"/></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
)

export default Header;