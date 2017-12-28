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
                        {/*Notifications*/}
                        <li className="nav-item dropdown">
                            <a id="notifications" rel="nofollow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link">
                                <i className="fa fa-bell-o"/><span className="badge bg-red">12</span>
                            </a>
                            <ul aria-labelledby="notifications" className="dropdown-menu">
                                <li>
                                    <a rel="nofollow" className="dropdown-item">
                                        <div className="notification">
                                            <div className="notification-content">
                                                <i className="fa fa-envelope bg-green"/>You have 6 new messages
                                            </div>
                                            <div className="notification-time">
                                                <small>4 minutes ago</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        {/*Logout*/}
                        <li className="nav-item">
                            <a href="login.html" className="nav-link logout">Logout<i className="fa fa-sign-out"/></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
)

export default Header;