import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import { fetchShuffledQuiz } from '../../actions';
import QuizFinish from '../QuizFinish';
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

    renderItems() {
        return this.props.quiz.items.map((item, index) => {
            return (
                <div className="content" key={index}>
                    <label>Question {index + 1}: </label>
                    <h3>{item.item}</h3>
                    <form className="ui form">
                        <label>Options:</label>
                        <div className="ui internally celled center aligned grid">
                            <div className="row">
                                <div className="eight wide column option-container">
                                    <Field
                                        id={`${item._id}-0-${item.options[0]}`}
                                        type="radio"
                                        name={item._id}
                                        component={this.renderRadioInput}
                                        value={item.options[0]}
                                    />
                                    <label htmlFor={`${item._id}-0-${item.options[0]}`}> {item.options[0]}
                                    </label>
                                </div>
                                <div className="eight wide column option-container">
                                    <Field
                                        id={`${item._id}-1-${item.options[1]}`}
                                        type="radio"
                                        name={item._id}
                                        component={this.renderRadioInput}
                                        value={item.options[1]}
                                    />
                                    <label htmlFor={`${item._id}-1-${item.options[1]}`}>{item.options[1]}
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="eight wide column option-container">
                                    <Field
                                        id={`${item._id}-2-${item.options[2]}`} type="radio"
                                        name={item._id}
                                        component={this.renderRadioInput}
                                        value={item.options[2]} />
                                    <label htmlFor={`${item._id}-2-${item.options[2]}`}>{item.options[2]}
                                    </label>
                                </div>
                                <div className="eight wide column option-container">
                                    <Field
                                        id={`${item._id}-3-${item.options[3]}`}
                                        type="radio"
                                        name={item._id}
                                        component={this.renderRadioInput}
                                        value={item.options[3]}
                                    />
                                    <label htmlFor={`${item._id}-3-${item.options[3]}`}> {item.options[3]}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )
        })
    }

    renderActionButtons(lastItem, onClickNext) {
        if (lastItem) {
            return (
                <div className="ui clearing segment">
                    <div className="ui right floated green button" tabIndex="0" onClick={this.props.handleSubmit(this.onSubmit)}>
                        <div className="visible content">Finish Quiz</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="ui clearing segment">
                    <div className="ui right floated animated green button" tabIndex="0" onClick={() => onClickNext()}>
                        <div className="visible content">Next Question</div>
                        <div className="hidden content">
                            <i className="right arrow icon"></i>
                        </div>
                    </div>
                    <Link to="/quizlist" className="ui left floated red button">
                        Back to Quiz List
                    </Link>
                </div>
            )
        }
    }

    renderEndScreenAction() {
        return <Link to="/quizlist" className="ui button">
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
                        <StackedCards
                            swipeAnimationDirection="right"
                            paginationVisibility={false}
                            carousel={false}
                            pagination={false}
                            actionButtons={this.renderActionButtons.bind(this)}
                            >
                            {this.renderItems()}
                        </StackedCards>
                    </div>
                </>
            );
            // End Screen and Quiz Summary
        } else if (this.state.quizFinished) {
            return (
                <div className="ui container segment">
                    <QuizFinish
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