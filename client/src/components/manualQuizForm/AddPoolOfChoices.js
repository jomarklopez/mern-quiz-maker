import React from 'react';
import { Field } from 'redux-form';

class AddPoolOfChoices extends React.Component {

    renderAnswer({ input, placeholder, meta: { touched, error } }) {
        // const className = `ui field input ${error && touched ? 'error' : ''}`; For optional error handling
        return (
            <div className="field" >
                <input
                    {...input}
                    autoComplete="off"
                    placeholder={placeholder}
                />
            </div>
        )
    }

    renderTextArea({ input, label, placeholder, meta: { touched, error, warning } }) {
        return (
            <div className="field">
                <label>{label}</label>
                <textarea {...input} placeholder={placeholder} rows="5" />
            </div>
        )
    }

    render() {
        return (
            <>
                <label>Answer:</label>
                <Field
                    name={`0`}
                    component={this.renderAnswer.bind(this)}
                    label="Answer: "
                    placeholder="Answer"
                    optionNumber="0"
                />
                <label>Pool of Choices:</label>
                <Field
                    name="answersForm"
                    component={this.renderTextArea}
                    placeholder="Multiple choices here"
                />
            </>
        );
    }
}
export default AddPoolOfChoices;