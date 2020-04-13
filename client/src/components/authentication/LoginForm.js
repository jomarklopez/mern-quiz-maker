import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { signInUser } from '../../actions';
import Modal from '../Modal';
import RegistrationForm from '../authentication/RegistrationForm';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showRegform: false
        };
    }

    onSubmit = async (formValues) => {
        await this.props.signInUser(formValues).then(() => this.props.sideBarToggle())
    }

    renderInput({ input, placeholder, type, icon }) {
        return (
            <div className="field">
                <div className="ui left icon input">
                    <i className={`${icon} icon`} />
                    <input {...input} type={type} placeholder={placeholder} autoComplete="off" />
                </div>
            </div>
        );
    }

    // Modal

    renderRegistrationForm() {
        return <Modal
            title={<h2>Sign Up</h2>}
            visibility={this.state.showRegform}
            content={<RegistrationForm closeForm={this.toggleRegModal.bind(this)} />}
            onDismiss={this.toggleRegModal.bind(this)}
        />
    }

    toggleRegModal() {
        this.setState(state => ({ showRegform: !state.showRegform }))
    }

    render() {
        return (
            <>
                {this.renderRegistrationForm()}
                <form className="ui large form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="">
                        <Field name="email" component={this.renderInput} placeholder="Email address" type="text" icon="mail" />
                        <Field name="password" component={this.renderInput} placeholder="Password" type="password" icon="lock" />
                        <div className="ui right aligned container">
                            {/*Button to show registration modal */}
                            <button className="ui large teal submit button" type="button" onClick={this.toggleRegModal.bind(this)}>Sign Up</button>
                            {/* <Link className="ui large teal submit button" to="/registration">Sign Up</Link> */}
                            <button className="ui large teal submit button">Login</button>
                        </div>
                    </div>
                    <div className="ui error message" />
                </form>
            </>
        );
    }
}

const form = reduxForm({
    form: 'loginForm',
})(LoginForm);

export default connect(null, { signInUser })(form);