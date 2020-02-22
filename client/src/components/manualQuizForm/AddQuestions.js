import React from 'react';
import { Field, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import { addQuestionForm } from '../../actions';

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
                    onClick={() => {
                        if (this.props.questionId === this.props.questionForms.length - 1) {
                            this.props.addQuestionForm();
                        }
                    }
                    }
                />
            </div>
        )
    }

    renderQuestions() {
        return (
            <FormSection name={`${this.props.questionId}`}>
                <Field
                    name={`question`}
                    component={this.renderQuestionInput.bind(this)}
                    placeholder="Enter your question."
                    questionNumber={this.props.questionId}
                />
                <FormSection name={`options`}>
                    <AddOptions questionId={this.props.questionId} />
                </FormSection>
            </FormSection>
        )
    }

    render() {
        return (
            <>
                <label>{`Question ${this.props.questionId + 1}:`}</label>
                <FormSection name="questions">
                    {this.renderQuestions()}
                </FormSection>
            </>
        );
    }
}

const mapStateToProps = state => {
    return { questionForms: state.questionForms }
}

export default connect(mapStateToProps, { addQuestionForm })(AddQuestions);