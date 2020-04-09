import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOutUser, getUserProfile } from '../../actions';

import '../../styles/nav.css';

class AuthMenu extends React.Component {

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
                <li class="dropdown_item" onClick={this.onSignOutClick}>Sign Out</li>
            )
        } else {
            return (
                <li class="dropdown_item"
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

export default connect(mapStateToProps, { signOutUser, getUserProfile })(AuthMenu);