import _ from 'lodash';
import { shuffleArray } from '../helpers/shuffleArray';
import {
    CREATE_QUIZ,
    CREATE_QUIZ_REQUEST,
    CREATE_QUIZ_SUCCESS,
    FETCH_QUIZZES,
    FETCH_QUIZ,
    FETCH_QUIZ_REQUEST,
    FETCH_QUIZ_SUCCESS,
    EDIT_QUIZ,
    DELETE_QUIZ,
    FETCH_SHUFFLED_QUIZ
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_QUIZ:
            return { ...state, [action.payload._id]: action.payload }
        case CREATE_QUIZ_REQUEST:
            return { ...state, submittingQuiz: true }
        case CREATE_QUIZ_SUCCESS:
            return { ...state, submittingQuiz: false }
        case FETCH_QUIZ:
            return { ...state, [action.payload._id]: action.payload }
        case FETCH_SHUFFLED_QUIZ:
            for (const item of action.payload.items) {
                shuffleArray(item.options);
            }
            shuffleArray(action.payload.items)
            return { ...state, [action.payload._id]: action.payload }
        case FETCH_QUIZ_REQUEST:
            return { ...state, loadingQuiz: true }
        case FETCH_QUIZ_SUCCESS:
            return { ...state, loadingQuiz: false }
        case FETCH_QUIZZES:
            //Getting a list of many records
            return { ...state, ..._.mapKeys(action.payload, '_id') }
        case EDIT_QUIZ:
            return { ...state, [action.payload._id]: action.payload }
        case DELETE_QUIZ:
            return _.omit(state, action.payload)
        default:
            return state;
    }
}