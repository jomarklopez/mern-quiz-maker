import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import createQuizFormReducer from './questionFormReducer';
import quizReducer from './quizReducer';
import errorReducer from './errorReducer';

import { CREATE_USER_SUCCESS } from '../actions/types';


export default combineReducers({
    form: formReducer.plugin({
        registrationForm: (state, action) => {
            switch (action.type) {
                case CREATE_USER_SUCCESS:
                    return undefined;
                default:
                    return state;
            }
        }
    }),
    auth: authReducer,
    questionForms: createQuizFormReducer,
    quiz: quizReducer,
    error: errorReducer
});