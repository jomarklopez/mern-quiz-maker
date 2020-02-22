import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOutUser, getUserProfile } from '../../actions';

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
                <button className="item float right" onClick={this.onSignOutClick}>
                    Sign Out
                </button>
            )
        } else {
            return (
                <Link to="/login" className="item float right">Login</Link>
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