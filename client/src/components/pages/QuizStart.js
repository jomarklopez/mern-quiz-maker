import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FormSection } from 'redux-form';
import { Link } from 'react-router-dom';

import { fetchShuffledQuiz } from '../../actions';
import QuizFinish from './QuizFinish';
import '../../styles/quizStart.css';

class QuizStart extends React.Component {

    constructor(props) {
        super(props);
        this.userScore = 0;
        this.state = {
            quizFinished: false,
            userAnswers: null,
            currentNum: 0
        }
    }

    componentDidMount() {
        const { quizId } = this.props.match.params;
        this.props.fetchShuffledQuiz(quizId);
    }

    onSubmit = formValues => {
        this.setState({ quizFinished: true, userAnswers: formValues });
    }

    renderCheckboxInput({ input, id, name, type, value }) {
        return (
            <input {...input}
                id={id}
                name={name}
                type={type}
                value={input.value === '' ? false : input.value}/>
        );
    }

    renderField ({ input, label, type, meta: { touched, error } }) {
        return <input {...input}
            type={type}
            placeholder={label}
            autoComplete="off"
        />
    }

    renderOptions(type, options) {
        
        switch (type) {
            case 'multiplechoice':
                return options.map((option, index) => {
                    console.log(option);
                    return (
                        <div className="option-container" key={index}>
                            <Field
                                id={option}
                                type="checkbox"
                                name={option}
                                component={this.renderCheckboxInput}
                            />
                            <label htmlFor={option}>{option}
                            </label>
                        </div>
                    )
                })
            case 'patternmatch':
                return (
                    <Field
                        name={`userAnswer`}
                        component={this.renderField}
                        label="Answer:"
                    />
                )
            default:
                return <></>
        }
    }

    renderItem() {
        const item = this.props.quiz.items[this.state.currentNum]
        return (
            <>
                <h3 className="ui header">
                    Question {this.state.currentNum + 1}: 
                </h3>
                <h1 className="ui header question-header">{item.question}</h1>
                <div className="ui divider"></div>
                <FormSection name={`item[${this.state.currentNum}].userAnswer`}>
                    {this.renderOptions(item.optionType, item.options)}
                </FormSection>
            </>
        )
    }

    renderActionButtons() {
        if (this.props.quiz.items.length === this.state.currentNum + 1) {
            return (
                <div className="ui green button" onClick = { this.props.handleSubmit(this.onSubmit) } >
                    <div className="visible content">Finish Quiz</div>
                </div >
            )
        } else {
            return (
                <div className="ui animated green button" onClick={() => this.setState({ currentNum: this.state.currentNum + 1 })}>
                    <div className="visible content">Next Question</div>
                    <div className="hidden content">
                        <i className="right arrow icon"></i>
                    </div>
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
                <div className="ui placeholder loading-container">
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
                <div className="quizStart-container">
                    <div className="ui clearing segment">
                        <h1 className="ui header">{this.props.quiz.quizName}</h1>
                    </div>
                    <div className="ui segment" id="item-container">
                        {this.renderItem()}
                        {this.renderActionButtons()}
                    </div>
                </div>
            );
            // End Screen and Quiz Summary
        } else if (this.state.quizFinished) {
            return (
                <div className="ui container segment quizFinish-container">
                    <QuizFinish
                        quiz={this.props.quiz}
                        userAnswers={this.state.userAnswers}
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