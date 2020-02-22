import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
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

    render() {
        return (
            <form className="ui large form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="ui stacked segment">
                    <Field name="email" component={this.renderInput} placeholder="Email address" type="text" icon="mail" />
                    <Field name="password" component={this.renderInput} placeholder="Password" type="password" icon="lock" />
                    <div className="ui right aligned container">
                        <Link className="ui large teal submit button" to="/registration">Sign Up</Link>
                        <button className="ui large teal submit button">Login</button>
                    </div>
                </div>
                <div className="ui error message" />
            </form>
        );
    }
}

const form = reduxForm({
    form: 'loginForm',
})(LoginForm);

export default connect(null, {})(form);