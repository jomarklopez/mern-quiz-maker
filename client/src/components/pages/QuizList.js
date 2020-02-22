import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchQuizzes } from '../../actions';
import '../../styles/quizList.css'
import history from '../../history';

class QuizList extends React.Component {
    componentDidMount() {
        this.props.fetchQuizzes();
    }

    quizStart(id) {
        history.push(`/quiz/start/${id}`)
    }

    renderList() {
        if (Object.keys(this.props.quizzes).length !== 0) {
            return this.props.quizzes.map(quiz => {
                return (
                    <div className="setCard" key={quiz._id} onClick={() => this.quizStart(quiz._id)}>
                        <div className="ui simple icon bottom right floated dropdown button" onClick={(e) => e.stopPropagation()}>
                            <i className="ellipsis vertical icon"></i>
                            <div className="menu" >
                                <Link to={`/quiz/edit/${quiz._id}`} className="item">
                                    <i className="edit icon"></i>
                                    Edit
                                    </Link>
                                <Link to={`/quiz/delete/${quiz._id}`} className="item">
                                    <i className="trash alternate icon"></i>
                                    Delete
                                    </Link>
                            </div>
                        </div>
                        <h3 className="setCard_title noselect" id={quiz.quizName} >{quiz.quizName} </h3>
                    </div>
                );
            });
        } else {
            return (
                <div className="ui placeholder segment">
                    <div className="ui icon header">
                        <i className="dont icon"></i>
                        No quiz have been added yet
                    </div>
                </div>
            )
        }
    }

    render() {
        const content = (Object.keys(this.props.quizzes).length === 0) ? 'Create A Quiz' : <i className="plus icon"></i>;
        return (
            <div className="ui container segment">
                <h1>Select Quiz!</h1>
                <div className="questSet-container">
                    {this.renderList()}
                    <Link to="/quiz/create" className="circular ui green icon button">
                        {content}
                    </Link>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        quizzes: Object.values(state.quiz)
    }
};

export default connect(mapStateToProps, { fetchQuizzes })(QuizList);