import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import history from '../history';
import Menu from './Menu';
import Login from './pages/Login';
import Registration from './pages/Registration';
import QuizList from './pages/QuizList';
import QuizCreate from './pages/QuizCreate';
import QuizStart from './pages/QuizStart';
import QuizDelete from './pages/QuizDelete';
import QuizEdit from './pages/QuizEdit';
import { getUserProfile } from '../actions';

import PrivateRoute from '../components/PrivateRoute';

class App extends React.Component {
    componentDidMount = () => {
        this.props.getUserProfile();
    }

    render() {
        return (
            <>
                <Router history={history}>
                    <Menu />
                    <PrivateRoute path="/" exact component={QuizList} authed={this.props.currentUser} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/registration" exact component={Registration} />
                    <PrivateRoute path="/quiz/create" exact component={QuizCreate} authed={this.props.currentUser} />
                    <PrivateRoute path="/quiz/start/:quizId" exact component={QuizStart} authed={this.props.currentUser} />
                    <PrivateRoute path="/quiz/delete/:quizId" exact component={QuizDelete} authed={this.props.currentUser} />
                    <PrivateRoute path="/quiz/edit/:quizId" exact component={QuizEdit} authed={this.props.currentUser} />
                </Router>
            </>
        )
    }
};
const mapStateToProps = state => {
    return { currentUser: state.auth.currentUser }
};

export default connect(mapStateToProps, { getUserProfile })(App);