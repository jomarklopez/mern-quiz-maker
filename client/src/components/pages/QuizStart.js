import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import { fetchShuffledQuiz } from '../../actions';
import EndScreen from '../EndScreen';
import StackedCards from '../StackedCards';
import '../../styles/quizStart.css';

class QuizStart extends React.Component {

    constructor(props) {
        super(props);
        this.userScore = 0;
        this.state = {
            quizFinished: false,
            userAnswers: null
        }
    }

    componentDidMount() {
        const { quizId } = this.props.match.params;
        this.props.fetchShuffledQuiz(quizId);
    }

    onSubmit = formValues => {
        this.setState({ quizFinished: true, userAnswers: formValues });
    }

    renderRadioInput({ input, id, name, type }) {
        return (
            <input {...input} id={id} name={name} type={type} />
        );
    }

    renderQuestionList() {
        return this.props.quiz.questions.map((question, index) => {
            return (
                <div className="content" key={index}>
                    <label>Question {index + 1}: </label>
                    <h3>{question.question}</h3>
                    <form className="ui form">
                        <label>Options:</label>
                        <div className="ui internally celled center aligned grid">
                            <div className="row">
                                <div className="eight wide column option-container">
                                    <Field
                                        id={`${question._id}-0-${question.options[0]}`}
                                        type="radio"
                                        name={question._id}
                                        component={this.renderRadioInput}
                                        value={question.options[0]}
                                    />
                                    <label htmlFor={`${question._id}-0-${question.options[0]}`}> {question.options[0]}
                                    </label>
                                </div>
                                <div className="eight wide column option-container">
                                    <Field
                                        id={`${question._id}-1-${question.options[1]}`}
                                        type="radio"
                                        name={question._id}
                                        component={this.renderRadioInput}
                                        value={question.options[1]}
                                    />
                                    <label htmlFor={`${question._id}-1-${question.options[1]}`}>{question.options[1]}
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="eight wide column option-container">
                                    <Field
                                        id={`${question._id}-2-${question.options[2]}`} type="radio"
                                        name={question._id}
                                        component={this.renderRadioInput}
                                        value={question.options[2]} />
                                    <label htmlFor={`${question._id}-2-${question.options[2]}`}>{question.options[2]}
                                    </label>
                                </div>
                                <div className="eight wide column option-container">
                                    <Field
                                        id={`${question._id}-3-${question.options[3]}`}
                                        type="radio"
                                        name={question._id}
                                        component={this.renderRadioInput}
                                        value={question.options[3]}
                                    />
                                    <label htmlFor={`${question._id}-3-${question.options[3]}`}> {question.options[3]}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )
        })
    }

    renderEndScreenAction() {
        return <Link to="/" className="ui button">
            Back to Quiz List
                    </Link>
    }

    render() {
        // Loading screen
        if (!this.props.quiz) {
            return (
                <div className="ui placeholder">
                    <div className="image header">
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="paragraph">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>
            );
            // Game proper
        } else if (!this.state.quizFinished) {
            return (
                <>
                    <div className="ui segment">
                        <h1>{this.props.quiz.quizName}</h1>
                    </div>
                    <div className="ui container segment">
                        <StackedCards onSubmit={this.props.handleSubmit(this.onSubmit)} actions="true" pagination="false" carousel="false">
                            {this.renderQuestionList()}
                        </StackedCards>
                    </div>
                </>
            );
            // End Screen and Quiz Summary
        } else if (this.state.quizFinished) {
            return (
                <div className="ui container segment">
                    <EndScreen
                        quiz={this.props.quiz}
                        userAnswers={Object.values(this.state.userAnswers)}
                        actions={this.renderEndScreenAction()}
                    />
                </div>
            )
        }


    }
};

const mapStateToProps = (state, ownProps) => {
    return { quiz: state.quiz[ownProps.match.params.quizId] };
};

const form = reduxForm({
    form: 'userAnswers'
})(QuizStart);

export default connect(mapStateToProps, { fetchShuffledQuiz })(form);