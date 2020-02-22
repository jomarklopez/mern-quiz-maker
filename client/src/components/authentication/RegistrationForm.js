import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

class RegistrationForm extends React.Component {

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
                    <Field name="name" component={this.renderInput} placeholder="Name" type="text" icon="user" />
                    <Field name="email" component={this.renderInput} placeholder="Email address" type="text" icon="mail" />
                    <Field name="password" component={this.renderInput} placeholder="Password" type="password" icon="lock" />
                    <button className="ui fluid large green submit button">Signup</button>
                </div>
                <div className="ui error message" />
            </form>
        );
    }
}

const form = reduxForm({
    form: 'registrationForm',
})(RegistrationForm);

export default connect(null, {})(form);