import React from 'react';
import { Link } from 'react-router-dom';

import AuthMenu from './authentication/AuthMenu';

class Menu extends React.Component {

    render() {
        return (
            <div className="ui inverted menu" >
                <div className="ui container">
                    <Link to="/" className="header item">Quiz Generator</Link>
                    <AuthMenu />
                </div>
            </div>
        );
    }
}

export default Menu;