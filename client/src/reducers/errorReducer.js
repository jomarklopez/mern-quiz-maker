// Error reducer that observes any errors 'happening' in the app and registers them in the error state.

import { HIDE_ERROR } from '../actions/types';

const INITIAL_STATE = {
    error: null,
    isOpen: false
};

export default (state = INITIAL_STATE, action) => {
    const { error } = action;

    if (error) {
        return {
            error: error,
            isOpen: true
        }
    } else if (action.type === HIDE_ERROR) {
        return {
            error: null,
            isOpen: false
        }
    }

    return state;
}