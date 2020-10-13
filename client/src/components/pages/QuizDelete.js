import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../Loader';
import Modal from '../Modal';
import history from '../../history';
import { fetchQuiz, deleteQuiz } from '../../actions';

class QuizDelete extends React.Component {

    onClickDelete(id) {
        this.props.deleteQuiz(id)
    }

    componentDidMount() {
        this.props.fetchQuiz(this.props.match.params.quizId);
    }

    renderActions() {
        const { quizId } = this.props.match.params;
        return (
            <>
                <button onClick={() => this.props.deleteQuiz(quizId)} className="ui button negative">Delete</button>
                <Link to="/quizlist" className="ui button">Cancel</Link>
            </>
        );
    }

    renderContent() {
        if (!this.props.quiz) {
            return 'Are you sure you want to delete this quiz?'
        } else {
            return `Are you sure you want to delete ${this.props.quiz.quizName}?`
        }
    }
    render() {
        if (this.props.isDeleting) {
            return <Loader message={'Deleting quiz...'} />;
        } else {
            return <Modal
                    title="Delete Quiz"
                    visibility={true}
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/quizlist')}
                />;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        quiz: state.quiz.quizList[ownProps.match.params.quizId],
        isDeleting: state.quiz.isDeleting
    }
};

export default connect(mapStateToProps, { fetchQuiz, deleteQuiz })(QuizDelete);