import React, {useState} from 'react';
import '../styles/pagination.css';

const Pagination = (props) => {
    const [disable__btn, setDisable__btn] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleAction = (action) => {
        switch (action) {
            case 'previous':
                props.actions(action);
                break;
            case 'next':
                props.actions(action);
                break;
            case 'addquestion':
                props.actions(action);
                break;
            case 'removequestion':
                props.actions(action);
                break;
            default:
                break;
        }
        setDisable__btn(true);
        setTimeout(() => {
            setDisable__btn(false);
        }, 500);
    };

    const renderNextorAddbtn = () => {
        let btnaction = "next";
        let icon = "chevron right icon";

        if (props.currentPosition === props.numOfItems - 1) {
            btnaction = "addquestion";
            icon = "plus icon";
        }
        
        return <button
            type="button"
            className="page__btn"
            onClick={() => {
                if (disable__btn) {
                    return;
                }
                handleAction(btnaction);
            }}
            disabled={disable__btn}
        >
            <i className={icon}></i>
        </button>
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleKey = (e) => {
        if (e.keyCode === 13) {
            props.actions(parseInt(inputValue)-1);
        }
    }

    const renderItems = () => {
        let items = [];
        let item;
        for (let index = 0; index < props.numOfItems; index++) {
            // Check if loop has reached the 5th item and if the number of items is greater than 10
            if ((props.numOfItems > 10) && (index === 5)) {
                // If loop has reached the 5th item then add a skip field
                item = <input
                    type="text"
                    key={index + 1}
                    id="page__skip"
                    size="2"
                    maxLength="2"
                    autoComplete="off"
                    placeholder="..."
                    value={inputValue}
                    onKeyUp={handleKey}
                    onChange={handleChange}/>;
                // Skip the loop to the last 5 items to render only the last 5 buttons
                index = props.numOfItems - 6;
            } else {
                // Rendering of buttons
                item = <button
                    type="button"
                    className="page__btn"
                    key={index + 1}
                    onClick={() => props.actions(index)}> {index + 1} </button>;
            }
            items.push(item);
        }
        return items;
    }

    return (
        <div className="pagination__btns">
            <button
                type="button"
                className="page__btn"
                onClick={() => {
                    handleAction('removequestion');
                }}
            >
                <i className="trash icon"></i>
            </button>
            <button
                type="button"
                className="page__btn"
                onClick={() => {
                    if (disable__btn) {
                        return;
                    }
                    handleAction('previous');
                }}
                disabled={disable__btn}
            >
                <i className="chevron left icon"></i>
            </button>
            {renderItems(props.actions, props.numOfItems)}
            {renderNextorAddbtn()}
            
        </div>
    );

}

export default Pagination;