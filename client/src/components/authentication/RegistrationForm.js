import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { createUser } from '../../actions';
import '../../styles/registrationform.css';

//VALIDATION
const required = value => value ? undefined : 'Required'
const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength8 = minLength(8)

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined

class RegistrationForm extends React.Component {

    onSubmit = async (formValues) => {

        await this.props.createUser(formValues).then(() => {
            //this.props.closeForm();
        });
    }

    renderInput({ input, placeholder, type, icon, meta: { touched, error } }) {
        return (
            <div className="field" >
                <div className="ui left icon input">
                    <i className={`${icon} icon`} />
                    <input {...input} type={type} placeholder={placeholder} autoComplete="off" />
                </div>
                {touched && (error && <span>{error}</span>)}
            </div>
        );
    }

    render() {
        return (
            <form className="ui large form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="name" component={this.renderInput} placeholder="Name" type="text" icon="user"
                    validate={[required]} />
                <Field name="email" component={this.renderInput} placeholder="Email address" type="text" icon="mail"
                    validate={[required, email]} />
                <Field name="password" component={this.renderInput} placeholder="Password" type="password" icon="lock"
                    validate={[required, minLength8]} />
                <div className="actionButtons">
                    <button type="button" className="ui fluid large negative submit button" onClick={this.props.closeForm}>Cancel</button>
                    <button type="submit" className="ui fluid large green submit button">Signup</button>
                </div>
                <div className="ui error message" />
            </form>
        );
    }
}

const form = reduxForm({
    form: 'registrationForm',
})(RegistrationForm);

export default connect(null, { createUser })(form);