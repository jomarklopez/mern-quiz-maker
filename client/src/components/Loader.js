import React from 'react';
import '../styles/loader.css';

const Loader = (props) => {
    return <div className="ui segment" id="loader-container">
        <div className="ui active inverted dimmer">
            <div className="ui text loader">{props.message}</div>
        </div>
    </div>
}

export default Loader;