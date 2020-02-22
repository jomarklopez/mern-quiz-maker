import React from 'react';
import { connect } from 'react-redux';

import { signInUser } from '../../actions';
import LoginForm from '../authentication/LoginForm';


class Login extends React.Component {

    onSubmit = (formValues) => {
        this.props.signInUser(formValues);
    }

    render() {
        return (
            <div className="ui one column centered middle aligned grid" style={{ height: "50vh" }}>
                <div className="column eight wide">
                    <h2 className="ui container centered teal header">
                        <div className="content">
                            Log-in to your account
                        </div>
                    </h2>
                    <LoginForm onSubmit={this.onSubmit} />
                </div>
            </div >
        );
    }
}

export default connect(null, { signInUser })(Login);