import _ from 'lodash';
import { shuffleArray } from '../helpers/shuffleArray';
import {
    CREATE_QUIZ,
    SUBMIT_QUIZ_REQUEST,
    SUBMIT_QUIZ_SUCCESS,
    FETCH_QUIZZES,
    FETCH_QUIZ,
    FETCH_QUIZ_REQUEST,
    FETCH_QUIZ_SUCCESS,
    EDIT_QUIZ,
    DELETE_QUIZ,
    DELETE_QUIZ_REQUEST,
    DELETE_QUIZ_SUCCESS,
    FETCH_SHUFFLED_QUIZ
} from '../actions/types';

export default (state = {
    quizList: { },
    isLoading: false,
    isSubmitting: false,
    isDeleting: false
}, action) => {
    switch (action.type) {
        case CREATE_QUIZ:
            return { ...state, [action.payload._id]: action.payload }
        case SUBMIT_QUIZ_REQUEST:
            return { ...state, isSubmitting: true }
        case SUBMIT_QUIZ_SUCCESS:
            return { ...state, isSubmitting: false }
        case FETCH_QUIZ:
            return {
                ...state,
                quizList: { ...state.quizList, [action.payload._id]: action.payload }
            }
        case FETCH_SHUFFLED_QUIZ:
            for (const item of action.payload.items) {
                shuffleArray(item.options);
            }
            shuffleArray(action.payload.items)
            return {
                ...state,
                quizList: { ...state.quizList, [action.payload._id]: action.payload }
            }
        case FETCH_QUIZ_REQUEST:
            return { ...state, isLoading: true }
        case FETCH_QUIZ_SUCCESS:
            return { ...state, isLoading: false }
        case FETCH_QUIZZES:
            return {
                ...state,
                quizList: { ...state.quizList, ..._.mapKeys(action.payload, '_id') }
            }
        case EDIT_QUIZ:
            return {
                ...state,
                quizList: { ...state.quizList, [action.payload._id]: action.payload }
            }
        case DELETE_QUIZ:
            let stateCopy = Object.assign({}, state)
            delete stateCopy.quizList[action.payload]
            return stateCopy
        case DELETE_QUIZ_REQUEST:
            return { ...state, isDeleting: true }
        case DELETE_QUIZ_SUCCESS:
            return { ...state, isDeleting: false }
        default:
            return state;
    }
}