import React from 'react';
import { reduxForm, Field, FieldArray, FormSection, reset } from 'redux-form';
import { connect } from 'react-redux';
import { createQuiz, editQuiz } from '../../actions';

import Loader from '../Loader';
import AddOptions from './AddOptions';
import '../../styles/quizCreate.css';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const onSubmit = (values, dispatch, props) => {
    for (let index = 0; index < values.items.length; index++) {
        const item = values.items[index]
        item.answers = []

        if (item.optionType === 'multiplechoice') {
            // Populate answers array
            for (let index = 0; index < item.options.length; index++) {
                const choice = item.options[index];
                if (choice.answer === true) {
                    item.answers.push(choice.option)
                }
                item.options[index] = choice.option
            }
        } else if (item.optionType === 'patternmatch') {
            item.answers[0] = item.options[0].option
            item.options[0] = item.options[0].option
        }
    }
    
    if (props.quizId) {
        props.editQuiz(props.quizId, values)
    } else {
        props.createQuiz(values)
    }
}

const renderLabeledInput = ({ input, label, placeholder, meta: { touched, error } }) => {
    const className = `ui labeled field input ${touched && error ? 'error' : ''}`
    return (
        <div className={className}>
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

const renderField = ({ input, label, type }) => {
    return (
        <div className={"question-wrapper"}>
            <label>{label}</label>
            
            <input {...input}
                autoComplete="off"
                size="10"
            />
        </div>
    )
}

const renderTextArea = ({ input, label, type }) => {
    console.log(type);
    return (
        <div className={"notes-wrapper"}>
            <label>{label}</label>
            <textarea
                {...input}
                autoComplete="off"
                rows="1"
            > </textarea>
        </div>
    )
}

const renderQuestionList = ({ fields, resetSection }) => {
    return <ul id="item-list">
        {fields.map((item, index) =>
            <li className="ui card" id="item-container" key={index}>
                <div className="item-header">
                    <label>Question {index + 1}</label>
                    <button
                        type="button"
                        className="ui negative button"
                        onClick={() => {
                            fields.remove(index)
                            reset()
                        }}
                    >Delete Question</button>
                </div>
                <FormSection className="item-content" name={`${item}`}>
                    <Field
                        name={`question`}
                        component={renderField}
                        label="Question:"
                        validate={[required]}
                    />
                    {/*<ImageEmbed itemNumber={item} hasField={true} />*/}
                    <AddOptions itemNumber={item} />
                    <Field
                        name="notes"
                        component={renderTextArea}
                        label="Notes:"
                    />
                </FormSection>
            </li>
        )}
        <li>
            <button
                type="button"
                className="ui green basic button"
                id="addItem-btn"
                onClick={() => fields.push({})}
            >Add Item
                </button>
        </li>
    </ul>
}

const CreateManualQuizForm = ({ handleSubmit, actions, resetSection, isSubmitting }) => {
    return (
        <form className="ui form" onSubmit={handleSubmit(onSubmit)} >
            {isSubmitting
                ? <Loader message={'Creating quiz...'} />
                : <>
                    <div className="ui segment form">
                        <Field
                            name="quizName"
                            component={renderLabeledInput}
                            label="Quiz: "
                            placeholder="QUIZ NAME"
                            validate={[required]}
                        />
                    </div>
                    <div className="ui card container fluid" >
                        <div className="content items-wrapper">
                            <FieldArray name="items" component={renderQuestionList} resetSection={resetSection} />
                        </div>
                        <div className="extra content">
                            {actions}
                        </div>
                    </div>
                </>
            }
            
        </form>
    )
}

const mapStateToProps = (state, ownProps) => {
    if (ownProps.quiz) {
        return {
            initialValues: ownProps.quiz,
            isSubmitting: state.quiz.isSubmitting
        }
    } else {
        return { isSubmitting: state.quiz.isSubmitting}
    }
};

const form = reduxForm({
    form: 'manualQuizForm',
    enableReinitialize: true
})(CreateManualQuizForm);

export default connect(mapStateToProps, { createQuiz, editQuiz })(form);
