import React from 'react';
import { connect } from 'react-redux';

import { createUser } from '../../actions';
import RegistrationForm from '../authentication/RegistrationForm';

class Registration extends React.Component {

    onSubmit = formValues => {
        this.props.createUser(formValues);
    }

    render() {
        return (
            <div className="ui one column centered middle aligned grid" style={{ height: "50vh" }}>
                <div className="column eight wide">
                    <RegistrationForm onSubmit={this.onSubmit} />
                </div>
            </div >
        );
    }
}

export default connect(null, { createUser })(Registration);