import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createQuiz, clearQuestionForms } from '../../actions';
import CreateManualQuizForm from '../manualQuizForm/CreateManualQuizForm';
import CreateAutoQuizForm from '../autoQuizForm/CreateAutoQuizForm';
import Modal from '../Modal';
import history from '../../history';

class QuizCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
            showAutoQuizForm: false,
            showManualQuizForm: false,
        }
    }

    componentDidMount() {
        this.props.clearQuestionForms();
    }

    submitQuizBody(formValues) {
        if (this.state.showManualQuizForm) {
            for (let index = 0; index < formValues.questions.length; index++) {
                formValues.questions[index].answer = formValues.questions[index].options[0];
            }
            this.props.createQuiz(formValues);
        } else if (this.state.showAutoQuizForm) {
            let questionsInput = removeEmptyLines(formValues.questionsForm.split(/\n/));
            let answerKey = removeEmptyLines(formValues.answersForm.split(/\n/));
            let choices = createChoices(answerKey);
            let questions = [];

            for (let index = 0; index < questionsInput.length; index++) {
                let question = {
                    question: questionsInput[index],
                    answer: answerKey[index],
                    options: choices[index]
                };
                questions.push(question);
            }
            let quiz = {
                quizName: formValues.quizName,
                questions: questions
            }
            this.props.createQuiz(quiz);
        }
    }

    onSubmit = formValues => {
        this.submitQuizBody(formValues);
    }

    renderModalContent() {
        return (
            <div className="ui centered cards">
                <div className="ui link card" onClick={() => this.setState({ showModal: false, showAutoQuizForm: true })}>
                    <div className="content">
                        <div className="header">
                            Automatic
                                </div>
                        <div className="ui form">
                            <div className="field">
                                <label>Questions</label>
                                <textarea rows="3" disabled></textarea>
                            </div>
                            <div className="field">
                                <label>Answers</label>
                                <textarea rows="3" disabled></textarea>
                            </div>
                        </div>

                    </div>
                    <div className="extra content">
                        <div className="description">
                            Automatic is as simple as copy pasting as options will automatically generated by using the provided answers.
                            <br />
                            Minimum questions with answer: 4.
                        </div>
                    </div>
                </div>
                <div className="ui link card" onClick={() => this.setState({ showModal: false, showManualQuizForm: true })}>
                    <div className="content">
                        <div className="header">
                            Manual
                         </div>
                        <div className="ui card">
                            <div className="content">
                                <label>Question 1: </label>
                                <div className="field">
                                    <input
                                        autoComplete="off"
                                        size="32"
                                        disabled
                                    />
                                </div>
                                <label>Options:</label>
                                <div className="ui internally celled grid">
                                    <div className="row">
                                        <div className="eight wide column">
                                            <div className="field">
                                                <input
                                                    autoComplete="off"
                                                    size="10"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="eight wide column">
                                            <div className="field">
                                                <input
                                                    autoComplete="off"
                                                    size="10"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="eight wide column">
                                            <div className="field">
                                                <input
                                                    autoComplete="off"
                                                    size="10"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="eight wide column">
                                            <div className="field">
                                                <input
                                                    autoComplete="off"
                                                    size="10"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="extra content">
                        <div className="description">
                            Manual lets you put your own options on each question for a more personalized quiz.
                            <br />
                            No minimum questions!
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderActions() {
        return <Link to="/" className="ui button">Cancel</Link>;
    }

    renderFormActions() {
        return (
            <div className="ui right floated buttons">
                <button type="submit" className="ui green button">Submit</button>
                <div className="or"></div>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </div>
        );
    }

    renderForm() {
        if (this.state.showModal) {
            return <Modal
                title="Choose how you create your quiz!"
                content={this.renderModalContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/quizlist')}
            />;
        } else if (this.state.showManualQuizForm) {
            return <CreateManualQuizForm actions={this.renderFormActions()} onSubmit={this.onSubmit} />;
        } else if (this.state.showAutoQuizForm) {
            return <CreateAutoQuizForm onSubmit={this.onSubmit} />;
        }
    }

    render() {
        return (
            <>
                {this.renderForm()}
            </>
        )
    }
};

function removeEmptyLines(array) {
    for (let index = 0; index < array.length;) {
        const element = array[index];
        if (element === "") {
            array.splice(index, 1);
        } else {
            index++;
        }
    }
    return array;
}

function createChoices(answerKey) {
    const choicesPool = [];

    // Push copies of the answer key to the choices pool for each number of question
    for (let index = 0; index < answerKey.length; index++) {
        choicesPool.push([...answerKey])
    }

    // Randomly remove elements from the choices array until 4 are left including the right answer
    for (var i = 0; i <= choicesPool.length - 1; i++) {
        // Set the choices as the 4 choices for the current answer index
        let choices = choicesPool[i];

        // Randomly remove elements
        // If there are 4 left then stop removing
        while (choices.length !== 4) {
            // Randomly choose an index 
            let curIndex = Math.floor(Math.random() * choices.length)

            // If the randomly chosen element is NOT the answer then remove it
            // OR If the randomly chosen element IS the answer but the pool already includes the answer then remove it
            if ((choices[curIndex] !== answerKey[i]) || choices.includes(answerKey[i])) {
                choices.splice(curIndex, 1);
            }
        }

        // Check if there are duplicates on each choices pool
    }
    return choicesPool;
}

export default connect(null, { createQuiz, clearQuestionForms })(QuizCreate);