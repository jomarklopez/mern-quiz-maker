import React from 'react';

const EndScreen = (props) => {
    return (
        <div className="ui centered raised card">
            <div className="content">
                {props.content}
            </div>
            <div className="extra content">
                {props.actions}
            </div>
        </div>
    )
};

export default EndScreen;