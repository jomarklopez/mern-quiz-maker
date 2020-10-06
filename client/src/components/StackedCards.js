import React, { useState, useRef } from 'react';
import classNames from 'classnames';

import Pagination from './Pagination';
import '../styles/stackedCards.css';

const StackedCards = (props) => {
    let contentList = [];
    let numOfCards = props.children.length;
    let elTrans = 0;
    let visibleCards = 2;
    let elementsMargin = 10;

    const currentCard = useRef(null);

    const [currentPosition, setCurrentPosition] = useState(0);

    const onClickNext = () => {
        if (currentPosition < numOfCards - 1) {
            swipeAnimate(currentCard.current);
            setTimeout(() => {
                setCurrentPosition(currentPosition + 1);
            }, 500);
        } else if (props.carousel === true) {
            // For carousel effect, to go back to the first card
            swipeAnimate(currentCard.current);
            setTimeout(() => {
                setCurrentPosition(0);
            }, 500);
        }
    };

    const onClickPrevious = () => {
        if (currentPosition !== 0) {
            setCurrentPosition(currentPosition - 1);
        }
    };

    const swipeAnimate = (card) => {
        let element = card;
        let moveX = 0;
        let moveY = 0;
        let opacity = 1;
        //Set animation direction
        let distanceWidth = currentCard.current.offsetWidth + 50;
        let distanceHeight = currentCard.current.offsetHeight + 50;

        switch (props.swipeAnimationDirection) {
            case 'left':
                moveX = -distanceWidth;
                break;
            case 'right':
                moveX = distanceWidth;
                break;
            case 'top':
                moveY = -distanceHeight;
                break;
            case 'bottom':
                moveY = distanceHeight;
                break;
            default:
                break;
        }

        let rotateElement = RotateRegulator(moveX);
        // Function to set rotate direction
        function RotateRegulator(value) {
            if (value / 10 > 15) {
                return 15; // Rotate to the right
            } else if (value / 10 < -15) {
                return -15; // Rotate to the left
            }
            return value / 10;
        }

        elTrans = elementsMargin * (visibleCards - 1);
        if (element) {
            element.style.transform =
                'translateX(' +
                moveX +
                'px) translateY(' +
                moveY +
                'px) translateZ(0) rotate(' +
                rotateElement +
                'deg)';
            element.style.opacity = opacity;

            setTimeout(function () {
                element.style.transform =
                    'scale(0.92) translateX(0px) translateY(0px) translateZ(0) rotate(0deg)';
                element.style.zIndex = visibleCards - currentPosition;
            }, 300);
        }
    };

    const renderCardStackStyle = (cards) => {
        let element;
        let elZindex = 5;
        let elScale = 1;
        let visible = visibleCards;
        let elTransInc = elementsMargin;
        let addedClass =
            'stackedcards-top card__animation stackedcards-origin-top';

        // Cards container
        let clones = [];
        // Fill up the clones with a for loop,
        // Create clones of every card if carousel is True

        // loop over from the current position up to the number of cards available, adding to this will be the number of visible cards chosen to give space for extra cards for a carousel effect
        for (let i = currentPosition; i < numOfCards; i++) {
            if (i < currentPosition + visibleCards) {
                // If has almost ran out of cards to get, then push back to the start of cards available.
                if (i >= numOfCards) {
                    element = cards[i - numOfCards];
                } else {
                    element = cards[i];
                }
                // Set the style for each cards in the view
                if (element) {
                    elTrans = elTransInc * visible;
                    visible--;
                    const clone = React.cloneElement(element, {
                        className: classNames(
                            element.props.className,
                            addedClass
                        ),
                        style: {
                            transform: `scale(${elScale}) translateX(0px) translateY(${elTrans - elTransInc
                                }px) translateZ(0px)`,
                            zIndex: elZindex
                        }
                    });
                    elScale = elScale - 0.04;
                    elZindex--;
                    clones.push(clone);
                }
            } else {
                // Set the style for each cards in the outside of the set view
                element = cards[i];
                let elTrans = elementsMargin * (visibleCards - 1);
                if (element) {
                    const clone = React.cloneElement(element, {
                        className: classNames(
                            element.props.className,
                            addedClass
                        ),
                        style: {
                            transform: `scale(${1 - visibleCards * 0.04
                                }) translateX(0px) translateY(${elTrans}px) translateZ(0px)`,
                            WebkitTransform: `scale(${1 - visibleCards * 0.04
                                }) translateX(0px) translateY(${elTrans}px) translateZ(0px)`,
                            opacity: 1,
                            zIndex: 0
                        }
                    });
                    clones.push(clone);
                }
            }
        }

        return clones;
    };

    const renderCards = (contents) => {
        contentList = contents;
        // Insert content to cards and put ref to currentCard
        let cards = contentList.map((content) => {
            if (Number(content.key) === currentPosition) {
                return (
                    <div
                        className="card-item"
                        ref={currentCard}
                        key={content.key}
                    >
                        {content}
                    </div>
                );
            } else if (Number(content.key) === currentPosition - 1) {
                return (
                    <div
                        className="card-item"
                        key={content.key}
                    >
                        {content}
                    </div>
                );
            } else {
                return (
                    <div className="card-item" key={content.key}>
                        {content}
                    </div>
                );
            }
        });
        // Set card styles before returning
        return renderCardStackStyle(cards);
    };

    // Quiz Controls
    const renderActionButtons = () => {
        if (props.actionButtons) {
            if (currentPosition === numOfCards - 1) {
                return props.actionButtons(true, onClickNext)
            } else {
                return props.actionButtons(false, onClickNext)
            }
        } else {
            return null;
        }
    }

    // Determine whether to display pagination
    const renderPagination = (paginationVisibility) => {
        if (paginationVisibility === true) {
            return (
                <div className="pagination__container">
                    <Pagination
                        actions={paginationActions.bind(this)}
                        numOfItems={numOfCards}
                        currentPosition={currentPosition}
                    />
                </div>
            );
        } else {
            return null;
        }
    };

    // If there is no pagination, display prev and next buttons
    const renderPrevBtn = () => {
        if (!props.paginationVisibility) {
            return (
                <button className="prevBtn" onClick={() => onClickPrevious()}>
                    <i className="fas fa-chevron-left"></i>
                </button>
            );
        }
    };

    const renderNextBtn = () => {
        if (!props.paginationVisibility) {
            return (
                <button className="nextBtn" onClick={() => onClickNext()}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            );
        }
    };

    // Actions for navigation
    const paginationActions = (action) => {
        switch (action) {
            case 'next':
                onClickNext();
                break;
            case 'previous':
                onClickPrevious();
                break;
            case 'addquestion':
                if (currentPosition === numOfCards - 1) {
                    props.adtlActions('addQuestionForm');
                }
                swipeAnimate(currentCard.current);
                setTimeout(() => {
                    setCurrentPosition(currentPosition + 1);
                }, 500);
                break;
            case 'removequestion':
                props.adtlActions('removeQuestionForm', currentPosition);
                if (currentPosition === numOfCards - 1) {
                    setCurrentPosition(currentPosition - 1);
                } else if (currentPosition !== 0) {
                    setCurrentPosition(currentPosition);
                } else {
                    setCurrentPosition(0)
                }
                break;
            default:
                break;
        }

        if (typeof action === 'number') {
            if (action < numOfCards && action >= 0) {
                setCurrentPosition(action);
            }
        }
    };

    return (
        <>
            {renderPagination(props.paginationVisibility)}
            <div id="stacked-cards-block" className=" stackedcards stackedcards--animatable init">
                <div className="stackedcards-container">
                    {renderCards(props.children)}
                </div>
            </div>
            {renderActionButtons()}
        </>
    )
}

export default StackedCards;