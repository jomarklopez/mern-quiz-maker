import {
    SET_ERROR,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    SIGN_IN,
    SIGN_OUT,
    CREATE_QUIZ,
    FETCH_QUIZZES,
    FETCH_QUIZ,
    FETCH_SHUFFLED_QUIZ,
    EDIT_QUIZ,
    DELETE_QUIZ,
    HIDE_ERROR
} from '../actions/types';
import history from '../history';
import axios from 'axios';



/**
 *  ERROR HANDLING
 */

export const setError = error => async dispatch => {
    dispatch({ type: SET_ERROR, error: error });
}

export const hideError = () => async dispatch => {
    dispatch({ type: HIDE_ERROR });
}

/**
 * CRUD FOR USER ACCOUNT
 */

export const createUser = formValues => async dispatch => {
    try {
        let response = await axios.post('/users', formValues);

        if (response.statusText === "OK") {
            console.log('OKAY!')
            dispatch({ type: CREATE_USER_SUCCESS, payload: response.data, error: null });
        } else {
            console.log('Error?')
            // if internally there are errors
            // pass on the error, in a correct implementation
            // such errors should throw an HTTP 4xx or 5xx error
            // so that it directs straight to the catch block
            dispatch({ type: CREATE_USER_ERROR, payload: null, error: response.error });
        }
        signInUser({ email: formValues.email, password: formValues.password })
    } catch (e) {
        dispatch({ type: CREATE_USER_ERROR, payload: null, error: e.response.data.error });
    }
};

export const signInUser = formValues => async dispatch => {
    const response = await axios.post('/users/login', formValues);

    localStorage.setItem('user', response.data.user)
    localStorage.setItem('token', response.data.token);
    dispatch({ type: SIGN_IN, payload: response.data.user });
    history.push('/quizlist');
};

export const signOutUser = () => async dispatch => {
    const token = localStorage.getItem('token');
    await axios.post('/users/logout', null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    dispatch({ type: SIGN_OUT });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    history.push('/login');
};


export const getUserProfile = () => async dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await axios.get('/users/me', { headers: { 'Authorization': `Bearer ${token}` } });
        dispatch({ type: SIGN_IN, payload: response.data });
    }
};

/**
 * CRUD FOR QUIZZES
 */
export const createQuiz = formValues => async dispatch => {
    const token = localStorage.getItem('token');

    const response = await axios.post('/quiz',
        formValues, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    );
    dispatch({ type: CREATE_QUIZ, payload: response.data });
    //Do some programmatic navigation to automatically bring the user back to the list of streams
    history.push('/quizlist');
};

export const fetchQuizzes = () => async dispatch => {
    const token = localStorage.getItem('token');

    const response = await axios.get('/quiz', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    dispatch({ type: FETCH_QUIZZES, payload: response.data });
};

export const fetchQuiz = (id, format) => async dispatch => {
    const token = localStorage.getItem('token');

    const response = await axios.get(`/quiz/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (format) {
        let quiz = response.data
        // Fix format of quiz for form value initialization
        for (let i = 0; i < quiz.items.length; i++) {
            const item = quiz.items[i];
            for (let j = 0; j < item.options.length; j++) {
                let option = item.options[j];
                // Add answers property
                quiz.items[i].options[j] = {
                    answer: item.answers[j] === option ? true : false,
                    option: option
                }
            }
            delete quiz.items[i].answers
        }
        dispatch({ type: FETCH_QUIZ, payload: response.data });
    } else {
        dispatch({ type: FETCH_QUIZ, payload: response.data });
    }

};

export const fetchShuffledQuiz = id => async dispatch => {
    const token = localStorage.getItem('token');

    const response = await axios.get(`/quiz/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    dispatch({ type: FETCH_SHUFFLED_QUIZ, payload: response.data });
};

export const editQuiz = (id, formValues) => async dispatch => {
    const token = localStorage.getItem('token');

    const response = await axios.patch(
        `/quiz/${id}`,
        formValues, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    dispatch({ type: EDIT_QUIZ, payload: response.data });
    history.push('/quizlist');
};

export const deleteQuiz = id => async dispatch => {
    const token = localStorage.getItem('token');

    await axios.delete(`/quiz/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    dispatch({ type: DELETE_QUIZ, payload: id });
    history.push('/quizlist');
};
