import React from 'react';
import { Link } from 'react-router-dom';

// Count total score and create a list of correct and wrong answers
const isCorrect = (itemAnswer, userAnswers) => {
    return (itemAnswer.length === userAnswers.length) && (itemAnswer.every(val => userAnswers.includes(val)));;
}

const renderAnswer = (type, answers) => {
    switch (type) {
        case 'item':
            return <>
                {answers.length > 1 ? 'Correct answers: ' : 'Correct answer: '}
                {answers.map((answer, index) => {
                    if (index !== 0) {
                        return `, ${answer}`
                    } else {
                        return `${answer}`
                    }
                })}
            </>
        case 'user':
            return <>
                {answers.length > 1 ? 'Your answers: ' : 'Your answer: '}
                {answers.map((answer, index) => {
                    if (index !== 0) {
                        return `, ${answer}`
                    } else {
                        return `${answer}`
                    }
                })}
            </>
        default:
            break;
    }
}

const checkQuizScore = (items, userAnswers, quizSummary) => {

    let userScore = 0;

    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        const userAnswerObj = userAnswers.item[index].userAnswer
        const itemAnswer = item.answers
        let userAnswer = []

        if (item.optionType === 'multiplechoice') {
            for (const answer in userAnswerObj) {
                if (userAnswerObj[answer] === false) delete userAnswerObj[answer];
            }
            userAnswer = Object.keys(userAnswerObj).sort()
        } else if (item.optionType === 'patternmatch') {
            userAnswer.push(userAnswerObj.userAnswer)
        }

        let isCorrectIcon;

        if (isCorrect(itemAnswer, userAnswer)) {
            userScore++;
            isCorrectIcon = "green check";
        } else {
            isCorrectIcon = "red close";
        }

        quizSummary.push(
            <>
                <div className="content">
                    <h3 className="ui header">
                        <div className="content">
                            <div className="sub header">
                                Question {index + 1}
                                <i className={`${isCorrectIcon} icon`}></i>
                            </div>
                            {item.question}
                        </div>
                    </h3>
                    <div className="description">
                        {userAnswers[index]}
                    </div>
                    <div className="extra content">
                        <div>Question Type: {item.optionType}</div>
                        <div>{renderAnswer('user', userAnswer)}</div>
                        <div>{renderAnswer('item', itemAnswer)}</div>
                        <div>Notes: {item.notes}</div>
                    </div>
                </div>
            </>
        )
    }
    return userScore
}

const renderScoreStars = (items, userScore) => {
    let numOfItems = items.length;
    // Calculate Score Precent
    let percent = (userScore / numOfItems) * 100;
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

const renderQuizSummary = (quizSummary) => {
    return quizSummary.map((item, index) => (
        <div style={{ pointerEvents: "none" }} className="item" key={index}>{item}</div>
    ));
}


const QuizFinish = ({ quiz, userAnswers }) => {
    let quizSummary = [];
    let userScore = checkQuizScore(quiz.items, userAnswers, quizSummary);
    return (
        <div className="ui container">
            <div className="ui center aligned content container">
                <h1>
                    {userScore}/
                    {quiz.items.length}
                </h1>
                <div className="ui disabled massive star rating" role="radiogroup" tabIndex="-1">
                    {renderScoreStars(quiz.items, userScore)}
                </div>
            </div>
            <div className="ui divided items">
                {renderQuizSummary(quizSummary)}
                <Link to="/quizlist" className="ui green button">
                    Back to Quiz List
                </Link>
            </div>
        </div>
    )
}

export default QuizFinish;