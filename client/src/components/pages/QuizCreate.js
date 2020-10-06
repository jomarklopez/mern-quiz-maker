import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createQuiz, clearQuestionForms } from '../../actions';
import CreateManualQuizForm from '../manualQuizForm/CreateManualQuizForm';
import CreateAutoQuizForm from '../autoQuizForm/CreateAutoQuizForm';

class QuizCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            createMethod: this.props.match.params.method
        }
    }

    componentDidMount() {
        this.props.clearQuestionForms()
    }

    submitQuizBody(formValues) {
        console.log(formValues);
        if (this.state.createMethod === 'manual') {
            for (let index = 0; index < formValues.items.length; index++) {
                const item = formValues.items[index];
                item.answer = item.options[0];
            }
            this.props.createQuiz(formValues);
        } else if (this.state.createMethod === 'auto') {
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

    renderFormActions() {
        return (
            <div className="ui right floated buttons">
                <button type="submit" className="ui green button">Submit</button>
                <div className="or"></div>
                <Link to="/quizlist" className="ui button">
                    Cancel
                </Link>
            </div>
        );
    }

    renderForm() {
        if (this.state.createMethod === 'manual') {
            return <CreateManualQuizForm actions={this.renderFormActions()} onSubmit={this.onSubmit} quizLength={3}/>;
        } else if (this.state.createMethod === 'auto') {
            return <CreateAutoQuizForm actions={this.renderFormActions()} onSubmit={this.onSubmit} />;
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