import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import history from '../history';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Login from './pages/Login';
import Home from './pages/Home';
import QuizList from './pages/QuizList';
import QuizCreate from './pages/QuizCreate';
import QuizStart from './pages/QuizStart';
import QuizDelete from './pages/QuizDelete';
import QuizEdit from './pages/QuizEdit';
import { getUserProfile } from '../actions';

import PrivateRoute from '../components/PrivateRoute';
import '../styles/app.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // When sidebar is default to true, sidebar will be displayed in the login page
            // When sidebar is default to false, sidebar will not be displayed when logged in and refreshing the webpage
            sideBarActive: localStorage.getItem("token") ? true : false
        };
    }

    componentDidMount = () => {
        this.props.getUserProfile();
    }

    toggleShowHide = () => {
        this.setState(state => ({ sideBarActive: !state.sideBarActive }));
    }

    render() {
        const login = (props) => {
            return (
                <Login
                    sideBarToggle={this.toggleShowHide.bind(this)}
                    {...props}
                />
            );
        }
        return (
            <>
                <Router history={history}>
                    <NavBar sideBarToggle={this.toggleShowHide} sideBarActive={this.state.sideBarActive} isSignedIn={this.props.isSignedIn} />
                    <SideBar sideBarToggle={this.toggleShowHide} sideBarActive={this.state.sideBarActive} />
                    
                    <div className={this.state.sideBarActive ? "appMain sideBarActive" : "appMain"}>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" exact component={login} />
                        <PrivateRoute path="/quizlist" exact component={QuizList} authed={this.props.currentUser} />
                        <PrivateRoute path="/quiz/create/:method" exact component={QuizCreate} authed={this.props.currentUser} />
                        <PrivateRoute path="/quiz/start/:quizId" exact component={QuizStart} authed={this.props.currentUser} />
                        <PrivateRoute path="/quiz/delete/:quizId" exact component={QuizDelete} authed={this.props.currentUser} />
                        <PrivateRoute path="/quiz/edit/:quizId" exact component={QuizEdit} authed={this.props.currentUser} />
                    </div>
                </Router>
            </>
        )
    }
};
const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProps, { getUserProfile })(App);