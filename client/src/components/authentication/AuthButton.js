import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOutUser, getUserProfile } from '../../actions';

import '../../styles/navbar.css';

class AuthButton extends React.Component {

    componentDidMount = () => {
        if (this.props.isSignedIn) {
            this.props.getUserProfile();
        }
    }

    onSignOutClick = () => {
        this.props.signOutUser();
    }

    renderAuthButton() {
        if (this.props.isSignedIn) {
            return (
                <li className="dropdown_item" onClick={() => {
                    this.props.sideBarOnclick()
                    this.onSignOutClick()
                }}>Sign Out</li>
            )
        } else {
            return (
                <li className="dropdown_item"
                ><Link to="/login">Login</Link>
                </li>

            )
        }
    }
    render() {
        return (
            <>
                {this.renderAuthButton()}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signOutUser, getUserProfile })(AuthButton);