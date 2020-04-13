import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'

import AuthButton from './authentication/AuthButton';

class NavBar extends React.Component {

    render() {
        if (!this.props.isSignedIn) {
            return null
        }

        return (
            <ul className={this.props.sideBarActive ? "nav navColorChange" : "nav"}>
                <div className="burgerMenu" type="button" onClick={this.props.sideBarToggle}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <Link to="/" className={this.props.sideBarActive ? "home_button logoColorChange" : "home_button"}>
                    <i className="ui pencil large icon"></i>
                    STUDY AID
                </Link>
                <li className="dropdown">
                    <div className="dropdownAcc_button">
                        <span className="dropdownAcc_name">Account Settings</span>
                        <i className="ui icon user"></i>
                    </div>
                    <div className="dropdown-content">
                        <ul className="dropdown_menu">
                            <li className="dropdown_item">Your Profile</li>
                            <li className="dropdown_item">Your Dashboard</li>
                            <AuthButton sideBarOnclick={this.props.sideBarToggle} />
                        </ul>
                    </div>
                </li>
            </ul>
        );
    }
}

export default NavBar;