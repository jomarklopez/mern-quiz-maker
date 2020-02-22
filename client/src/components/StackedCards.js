import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Pagination from './Pagination';
import '../styles/stackedCards.css';

class StackedCards extends React.Component {
    constructor(props) {
        super(props);
        this.contentList = [];
        this.items = 3;
        this.elementsMargin = 10;
        this.currentCard = React.createRef();
        this.state = {
            currentPosition: 0
        }
    }

    onClickLeft() {
        if (this.state.currentPosition < this.maxElements - 1) {
            this.swipeLeftAnimate(-1000, 0, 0, this.currentCard.current);
            setTimeout(() => {
                this.setState({ currentPosition: this.state.currentPosition + 1 });
            }, 300);
        } else if (this.props.carousel === "true") {
            // For carousel effect, to go back to the first card
            this.swipeLeftAnimate(-1000, 0, 0, this.currentCard.current);
            setTimeout(() => {
                this.setState({ currentPosition: 0 });
            }, 300);
        }
    }

    onClickRight() {
        if (this.state.currentPosition !== 0) {
            this.setState({ currentPosition: this.state.currentPosition - 1 });
        }
    }

    swipeLeftAnimate(moveX, moveY, opacity, elementObj) {
        let element = elementObj;
        let rotateElement = RotateRegulator(moveX);

        // Function to set rotate direction 
        function RotateRegulator(value) {
            if (value / 10 > 15) {
                return 15; // Rotate to the right
            }
            else if (value / 10 < -15) {
                return -15; // Rotate to the left
            }
            return value / 10;
        }

        this.elTrans = this.elementsMargin * (this.items - 1);
        if (element) {
            element.style.WebkitTransform = "translateX(" + moveX + "px) translateY(" + (moveY + this.elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
            element.style.transform = "translateX(" + moveX + "px) translateY(" + (moveY + this.elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
        }
    }

    renderCardStackStyle(cards) {

        this.elTrans = 0;
        this.maxElements = cards.length;
        let elZindex = 5;
        let elScale = 1;
        let elTransTop = this.items;
        let elTransInc = this.elementsMargin;
        let addedClass = 'stackedcards-top stackedcards--animatable stackedcards-origin-top';

        // Cards container
        let clones = [];

        for (let i = this.state.currentPosition; i < this.maxElements; i++) {
            if (i < (this.state.currentPosition + this.items)) {
                // Set the style for each cards in the view
                const element = cards[i];
                if (element) {
                    this.elTrans = elTransInc * elTransTop;
                    elTransTop--;
                    const clone = React.cloneElement(element, {
                        className: classNames(element.props.className, addedClass),
                        style: {
                            transform: `scale(${elScale}) translateX(0px) translateY(${this.elTrans - elTransInc}px) translateZ(0px)`,
                            WebkitTransform: `scale(${elScale}) translateX(0px) translateY(${this.elTrans - elTransInc}px) translateZ(0px)`,
                            zIndex: elZindex
                        }
                    });
                    elScale = elScale - 0.04;
                    elZindex--;
                    clones.push(clone);
                }
            } else {
                // Set the style for each cards in the outside of the set view
                const element = cards[i];
                let elTrans = this.elementsMargin * (this.items - 1);
                if (element) {
                    const clone = React.cloneElement(element, {
                        className: classNames(element.props.className, addedClass),
                        style: {
                            transform: `scale(${1 - (this.items * 0.04)}) translateX(0px) translateY(${elTrans}px) translateZ(0px)`,
                            WebkitTransform: `scale(${1 - (this.items * 0.04)}) translateX(0px) translateY(${elTrans}px) translateZ(0px)`,
                            opacity: 1,
                            zIndex: 0
                        }
                    });
                    clones.push(clone);
                }
            }

        }
        return clones;
    }

    renderCards(contentList) {
        this.contentList = contentList;
        // Insert content to cards and put ref to currentCard
        const cards = this.contentList.map(content => {
            if (Number(content.key) === this.state.currentPosition) {
                return (
                    <div
                        className="card-item"
                        ref={this.currentCard}
                        key={content.key}
                    >
                        {content}
                    </div>
                )
            } else {
                return (
                    <div
                        className="card-item"
                        key={content.key}
                    >
                        {content}
                    </div>
                )
            }
        })

        return this.renderCardStackStyle(cards);
    }

    // Determine where to display the action buttons 
    renderActionButtons(action) {
        if (action === "true") {
            if (this.state.currentPosition === this.maxElements - 1) {
                return (
                    <div className="ui clearing segment">
                        <div className="ui right floated green button" tabIndex="0" onClick={() => this.props.onSubmit()}>
                            <div className="visible content">Finish Quiz</div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="ui clearing segment">
                        <div className="ui right floated animated green button" tabIndex="0" onClick={() => this.onClickLeft()}>
                            <div className="visible content">Next Question</div>
                            <div className="hidden content">
                                <i className="right arrow icon"></i>
                            </div>
                        </div>
                        <Link to="/" className="ui left floated red button">
                            Back to Quiz List
                        </Link>
                    </div>
                )
            }
        } else {
            return null;
        }
    }

    // Determine whether to display pagination
    renderPagination(pagination) {
        if (pagination === "true") {
            return (
                <div className="ui center aligned container">
                    <Pagination actions={this.actions.bind(this)} numOfItems={this.maxElements} />
                </div>
            );
        } else {
            return null;
        }
    }

    // Actions for navigation
    actions(action) {
        switch (action) {
            case 'first':
                this.setState({ currentPosition: 0 });
                break;
            case 'last':
                this.setState({ currentPosition: this.maxElements - 1 });
                break;
            case 'forward':
                this.onClickLeft();
                break;
            case 'backward':
                this.onClickRight();
                break;
            default:
                break;
        }

        if (typeof action === 'number') {
            this.setState({ currentPosition: action });
        }
    }

    render() {
        return (
            <>
                {this.renderPagination(this.props.pagination)}
                <div id="stacked-cards-block" className="content stackedcards stackedcards--animatable init">
                    <div className="stackedcards-container">
                        {this.renderCards(this.props.children)}
                    </div>
                </div>
                {this.renderActionButtons(this.props.actions)}
            </>
        )
    }
}

export default StackedCards;