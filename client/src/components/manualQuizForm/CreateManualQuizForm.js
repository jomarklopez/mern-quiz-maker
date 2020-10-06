import React from 'react';
import { reduxForm, Field, unregisterField } from 'redux-form';
import { connect } from 'react-redux';

import AddQuestions from './AddQuestions';
import { addQuestionForm, removeQuestionForm, clearQuestionForms } from '../../actions';
import StackedCards from '../StackedCards';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

class CreateManualQuizForm extends React.Component {

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    renderLabeledInput({ input, label, placeholder, meta: { touched, error } }) {
        //const className = `ui labeled field input ${touched && error ? 'error' : ''}`
        return (
            <div className="ui labeled field input">
                <div className="ui label">
                    {label}
                </div>
                <input
                    {...input}
                    placeholder={placeholder}
                    size="30"
                />
            </div>
        );
    }

    renderQuestionList() {
        return this.props.questionForms.map(questionForm => {
            return (
                <div className="content" key={questionForm.questionId}>
                    <AddQuestions questionId={questionForm.questionId} />
                </div>
            )
        })
    }

    formActions = (type, currentPosition) => {
        switch (type) {
            case 'addQuestionForm':
                this.props.addQuestionForm()
                break;
            case 'removeQuestionForm':
                this.props.removeQuestionForm(currentPosition)
                this.props.resetSection(`items.${currentPosition}`)
                break;
            default:
                break;
        }
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
                {/* Form Card */}
                <div className="ui card container fluid" >
                    <StackedCards
                        swipeAnimationDirection="right"
                        paginationVisibility={true}
                        adtlActions={this.formActions}
                        carousel={false}
                    >
                        {this.renderQuestionList()}
                    </StackedCards>
                    <div className="extra content">
                        {this.props.actions}
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    // Check if there are initial values for the form
    if (ownProps.quiz) {
        return {
            questionForms: state.questionForms,
            initialValues: ownProps.quiz,
            quizLength: ownProps.quiz.questions.length
        }
    } else {
        return {
            questionForms: state.questionForms
        }
    }
};

const form = reduxForm({
    form: 'manualQuizForm'
})(CreateManualQuizForm);

export default connect(mapStateToProps, { addQuestionForm, clearQuestionForms, removeQuestionForm })(form);