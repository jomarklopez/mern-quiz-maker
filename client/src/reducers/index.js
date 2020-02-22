import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import createQuizFormReducer from './questionFormReducer';
import quizReducer from './quizReducer';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
    questionForms: createQuizFormReducer,
    quiz: quizReducer
});