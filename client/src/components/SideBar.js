import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/sidebar.css'

class SideBar extends React.Component {

    render() {
        return (
            <div id="mySidebar" className={this.props.sideBarActive ? "sidebar sidebarActive" : "sidebar"}>
                <div className={this.props.sideBarActive ? "sidebarLogo logoColorChange" : "sidebarLogo"}>
                    <i className="ui pencil large icon"></i>
                    STUDY AID
                </div>
                <div className="hideBut" onClick={this.props.sideBarToggle}>
                    <i className="ui window close large icon"></i>
                </div>
                <div className="curve">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="150 175.5 300 205">
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
                        <path fill="url(#gradient)" fillOpacity="1" d="M 100 350 Q 100 250 100 150 Q 250 150 450 150 Q 450 200 450 250 C 300 250 350 400 100 350" filter="url(#shadow)"></path>
                    </svg>
                </div>
                <ul className="sideNav_content">
                    <Link to="/"><li className="sideNav_item">Home</li></Link>
                    <Link to="/quizlist"><li className="sideNav_item">Quiz List</li></Link>
                    <li className="sideNav_item">Cue Cards</li>
                </ul>
            </div>
        )
    }
}

export default SideBar;