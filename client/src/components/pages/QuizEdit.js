import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchQuiz, editQuiz } from '../../actions';
import CreateManualQuizForm from '../manualQuizForm/CreateManualQuizForm';

class QuizEdit extends React.Component {

    componentDidMount() {
        const { quizId } = this.props.match.params;
        this.props.fetchQuiz(quizId, true);
    }

    submitQuizBody(formValues) {
        for (let index = 0; index < formValues.items.length; index++) {
            formValues.items[index].answer = formValues.items[index].options[0];
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
                <Link to="/quizlist" className="ui button">
                    Discard
                </Link>
            </div>
        )
    }

    render() {
        if (this.props.quiz) {
            return (
                <>
                    <CreateManualQuizForm actions={this.renderFormActions()} quiz={this.props.quiz} quizId={this.props.match.params.quizId}/>
                </>
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