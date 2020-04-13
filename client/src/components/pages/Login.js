import React from 'react';
import { connect } from 'react-redux';

import history from '../../history';
import LoginForm from '../authentication/LoginForm';
import '../../styles/login.css'


class Login extends React.Component {
    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            history.push('/')
        }
    }

    render() {
        return (
            <div className="loginWrapper">
                <div className="loginContent">
                    <div className="loginBox">
                        <h1 className="loginHeader">
                            LOGIN
                        </h1>
                        <LoginForm onSubmit={this.onSubmit} sideBarToggle={this.props.sideBarToggle} />
                    </div>
                </div >
                <div className="loginBackground">
                    <svg className="curve-topleft" xmlns="http://www.w3.org/2000/svg" viewBox="150 175.5 1250 205">
                        <defs>
                            <filter id="shadow" x="0" y="0" width="200%" height="200%">
                                <feOffset result="offOut" in="SourceGraphic" dx="1" dy="1" />
                                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
                                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                            </filter>
                            <linearGradient id="gradient">
                                <stop className="main-stop" offset="0%" />
                                <stop className="alt-stop" offset="100%" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#gradient)" fillOpacity="1" d="M 100 350 Q 100 250 100 150 Q 250 150 450 150 Q 450 200 450 150 C 300 250 350 400 100 350" filter="url(#shadow)"></path>
                    </svg>
                    <svg className="curve-bottomright" xmlns="http://www.w3.org/2000/svg" viewBox="150 175.5 1250 205">
                        <defs>

                            <filter id="shadow" x="0" y="0" width="200%" height="200%">
                                <feOffset result="offOut" in="SourceGraphic" dx="1" dy="1" />
                                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
                                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                            </filter>
                            <linearGradient id="gradient">
                                <stop className="main-stop" offset="0%" />
                                <stop className="alt-stop" offset="100%" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#gradient)" fillOpacity="1" d="M 100 350 Q 100 250 100 150 Q 250 150 450 150 Q 450 200 450 150 C 300 250 350 400 100 350" filter="url(#shadow)" transform="rotate(180 1030 280)
                translate(500 0)">></path>
                    </svg>
                </div>
            </div>
        );
    }
}

/*  */

export default connect(null, {})(Login);