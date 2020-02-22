import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

class CreateAutoQuizForm extends React.Component {

    onSubmit = formValues => {
        // Arrange the form values

        this.props.onSubmit(formValues);
    }

    renderLabeledInput({ input, label, placeholder, meta: { touched, error } }) {
        //const className = `ui labeled field input ${touched && error ? 'error' : ''}`
        return (
            <div className="ui labeled field input">
                <div className="ui label">
                    {label}
                </div>
                <input {...input} placeholder={placeholder}
                />
            </div>
        );
    }

    renderTextArea({ input, label, placeholder, meta: { touched, error, warning } }) {
        return (
            <div className="field">
                <label>{label}</label>
                <textarea {...input} placeholder={placeholder} rows="15" />
            </div>
        )
    }


    render() {
        return (
            <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)} >
                <div className="ui form segment">
                    <Field
                        name="quizName"
                        component={this.renderLabeledInput}
                        label="Quiz: "
                        placeholder="Put your quiz name here"
                        validate={[required]}
                    />
                </div>
                <div className="ui form segment">
                    <Field
                        name="questionsForm"
                        component={this.renderTextArea}
                        label="Questions: "
                        placeholder="Put your questions here"
                        validate={[required]}
                    />
                    <Field
                        name="answersForm"
                        component={this.renderTextArea}
                        label="Answers: "
                        placeholder="Put your answers here"
                        validate={[required]}
                    />
                    <button className="ui button float right primary">Submit</button>
                </div>
            </form>
        )
    }
}

const form = reduxForm({
    form: 'autoQuizForm'
})(CreateAutoQuizForm);

export default connect(null, {})(form);