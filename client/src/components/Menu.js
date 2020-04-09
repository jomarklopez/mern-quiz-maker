import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css'

import AuthMenu from './authentication/AuthMenu';

class Menu extends React.Component {

    render() {
        return (
            <ul className="nav">
                <Link to="/" class="home_button">
                    <i className="ui book large icon"></i>
                    STUDY AID
                </Link>
                <li class="dropdown">
                    <a className="dropdownAcc_button">
                        <span class="dropdownAcc_name">Account Settings</span>
                        <i className="ui icon user"></i>
                    </a>
                    <div className="dropdown-content">
                        <ul class="dropdown_menu">
                            <li class="dropdown_item">Your Profile</li>
                            <li class="dropdown_item">Your Dashboard</li>
                            <AuthMenu />
                        </ul>
                    </div>
                </li>
            </ul>
        );
    }
}

export default Menu;