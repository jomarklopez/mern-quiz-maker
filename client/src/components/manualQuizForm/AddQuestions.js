import React from 'react';
import { Field, FormSection } from 'redux-form';

import AddOptions from './AddOptions';

class AddQuestions extends React.Component {

    componentDidUpdate() {
        this[`question-${this.props.questionId}`].focus()
    }

    renderQuestionInput({ input, placeholder, meta: { touched, error } }) {
        // const className = `field ${touched && error ? 'error' : ''}` For optional error handling
        return (
            <div className="field">
                <input
                    {...input}
                    autoComplete="off"
                    ref={input => this[`question-${this.props.questionId}`] = input}
                    placeholder={placeholder}
                    size="10"
                />
            </div>
        )
    }

    renderQuestions() {
        return (
            <>
                <FormSection name={`items.${this.props.questionId}`}>
                    <Field
                        name={`question`}
                        component={this.renderQuestionInput.bind(this)}
                        placeholder="Question"
                        questionNumber={this.props.questionId}
                    />
                    <FormSection name={`options`}>
                        <AddOptions />
                    </FormSection>
                </FormSection>
                
            </>
        )
    }

    render() {
        return (
            <>
                <label>{`Question ${this.props.questionId + 1}`}</label>
                {this.renderQuestions()}
            </>
        );
    }
}

export default AddQuestions;