import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchQuiz, editQuiz } from '../../actions';
import CreateManualQuizForm from '../manualQuizForm/CreateManualQuizForm';

class QuizEdit extends React.Component {

    componentDidMount() {
        const { quizId } = this.props.match.params;
        this.props.fetchQuiz(quizId);
    }

    submitQuizBody(formValues) {
        for (let index = 0; index < formValues.questions.length; index++) {
            formValues.questions[index].answer = formValues.questions[index].options[0];
        }
        this.props.editQuiz(this.props.match.params.quizId, formValues);
    }

    onSubmit = formValues => {
        this.submitQuizBody(formValues);
    }

    renderFormActions() {
        return (
            <div className="ui right floated buttons">
                <button type="submit" className="ui green button">Save</button>
                <div className="or"></div>
                <Link to="/" className="ui button">
                    Discard
                </Link>
            </div>
        )
    }

    render() {
        if (this.props.quiz) {
            return (
                <div>
                    <CreateManualQuizForm onSubmit={this.onSubmit} actions={this.renderFormActions()} quiz={this.props.quiz} />
                </div>
            )
        } else {
            return <div> Loading... </div>
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        quiz: state.quiz[ownProps.match.params.quizId]
    };
};

export default connect(mapStateToProps, { fetchQuiz, editQuiz })(QuizEdit);