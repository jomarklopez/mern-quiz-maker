import _ from 'lodash';
import { ADD_QUESTION, REMOVE_QUESTION, CLEAR_QUESTION } from '../actions/types';

const initState = [
    {
        questionId: 0
    }
];

export default (state = initState, action) => {
    switch (action.type) {
        // Adding questions to the quiz
        case ADD_QUESTION:
            return [...state, {
                questionId: action.questionId
            }];
        // Clear question forms
        case CLEAR_QUESTION:
            return initState;
        // Remove a question and update all question id's
        case REMOVE_QUESTION:
            return state.filter((question) => question.questionId !== action.questionId).map((question, index) => {
                if (question.questionId !== action.questionId) {
                    return {
                        questionId: index
                    };
                }
            });
        default:
            return state;
    }
};