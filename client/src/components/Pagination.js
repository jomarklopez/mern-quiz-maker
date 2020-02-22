import React from 'react';
import '../styles/pagination.css';

const Pagination = (props) => {
    return (
        <div className="ui pagination menu buttons">
            <button type="button" className="ui button item" onClick={() => props.actions('first')}>
                <i className="angle double left icon" />
            </button>
            <button type="button" className="ui button item" onClick={() => props.actions('backward')}>
                <i className="chevron left icon" />
            </button>
            {renderItems(props, props.numOfItems)}
            <button type="button" className="ui button item" onClick={() => props.actions('forward')}>
                <i className="chevron right icon" />
            </button>
            <button type="button" className="ui button item" onClick={() => props.actions('last')}>
                <i className="angle double right icon" />
            </button>
        </div>
    )
}

const renderItems = (props, numItems) => {
    let items = [];
    let item;

    for (let index = 0; index < numItems; index++) {
        // Check if loop has reached the 5th item and if the number of items is greater than 10
        if ((numItems > 10) && (index === 5)) {
            // If loop has reached the 5th item then add a skip button
            item = <button type="button" className="ui button item" key={index + 1}> ... </button>;
            // Skip the loop to the last 5 items to render only the last 5 buttons
            index = numItems - 6;
        } else {
            // Rendering of buttons
            item = <button type="button" className="ui button item" key={index + 1} onClick={() => props.actions(index)}> {index + 1} </button>;
        }
        items.push(item);
    }
    return items;
}

export default Pagination;