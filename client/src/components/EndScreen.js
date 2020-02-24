import React from 'react';

class EndScreen extends React.Component {
    constructor(props) {
        super(props);
        this.userScore = 0;
        this.quizSummary = [];
    }
    // Count total score and create a list of correct and wrong answers
    checkQuizScore(questions, userAnswers) {

        for (let index = 0; index < questions.length; index++) {
            const question = questions[index];
            if (question.answer === userAnswers[index]) {
                this.userScore++;
                this.quizSummary.push(
                    <>
                        <div className="content">
                            <h3 className="ui header">
                                <div className="content">
                                    <div className="sub header">Question {index + 1}</div>
                                    {this.props.quiz.questions[index].question}
                                </div>
                            </h3>
                            <div className="description">
                                <i className="green check icon"> </i>
                                {this.props.userAnswers[index]}
                            </div>
                        </div>
                    </>
                )
            } else {
                this.quizSummary.push(
                    <>
                        <div className="content">
                            <h3 className="ui header">
                                <div className="content">
                                    <div className="sub header">Question {index + 1}</div>
                                    {this.props.quiz.questions[index].question}
                                </div>
                            </h3>
                            <div className="description">
                                <i className="red close icon"> </i>
                                {this.props.userAnswers[index]}
                            </div>
                            <div className="extra content">
                                Correct answer:                                 {this.props.quiz.questions[index].answer}
                            </div>
                        </div>
                    </>
                )
            }
        }
        return this.userScore;
    }

    renderScoreStars() {
        let numOfQuestions = this.props.quiz.questions.length;

        // Calculate Score Precent
        let percent = (this.userScore / numOfQuestions) * 100;

        // Determine number of active stars 
        let starCount;

        if (percent === 100) {
            starCount = 3;
        } else if (percent >= 50) {
            starCount = 2;
        } else {
            starCount = 1
        }

        // Create an array of star elements
        let stars = [];

        for (let index = 1; index <= 3; index++) {
            let checked = "false";
            let className = "icon";
            if (starCount !== 0) {
                checked = "true"
                className = "active icon"
                starCount--;
            }
            stars.push(
                <i
                    tabIndex="0"
                    aria-checked={checked}
                    aria-posinset="1"
                    aria-setsize="3"
                    className={className}
                    role="radio"
                ></i>
            )
        }

        // Return and render the stars
        return stars.map((star, index) => (
            <div key={index}>{star}</div>
        ));
    }

    renderQuizSummary() {
        return this.quizSummary.map((question, index) => (
            <div style={{ pointerEvents: "none" }} className="item" key={index}>{question}</div>
        ));
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui center aligned content container">
                    <h1>
                        {this.checkQuizScore(this.props.quiz.questions, this.props.userAnswers)}/{this.props.quiz.questions.length}
                    </h1>
                    <div className="ui disabled massive star rating" role="radiogroup" tabIndex="-1">
                        {this.renderScoreStars()}
                    </div>
                </div>
                <div className="ui divided items">
                    {this.renderQuizSummary()}
                </div>
            </div>
        )
    }
}

export default EndScreen;