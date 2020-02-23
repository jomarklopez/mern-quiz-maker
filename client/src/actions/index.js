import {
    CREATE_USER,
    SIGN_IN,
    SIGN_OUT,
    ADD_QUESTION,
    REMOVE_QUESTION,
    CREATE_QUIZ,
    FETCH_QUIZZES,
    FETCH_QUIZ,
    FETCH_SHUFFLED_QUIZ,
    EDIT_QUIZ,
    DELETE_QUIZ,
    CLEAR_QUESTION
} from '../actions/types';
import history from '../history';
import axios from 'axios';

/**
 *
 * CRUD FOR USER ACCOUNT
 */

export const createUser = formValues => async dispatch => {
    const response = await axios.post('/users', formValues);
    dispatch({ type: CREATE_USER, payload: response.data });

    //Do some programmatic navigation to automatically bring the user back to the list of streams
    history.push('/login');
};

export const signInUser = formValues => async dispatch => {
    const response = await axios.post('/users/login', formValues);

    localStorage.setItem('user', response.data.user)
    localStorage.setItem('token', response.data.token);
    dispatch({ type: SIGN_IN, payload: response.data.user });
    history.push('/');
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
 * FOR QUIZ FORM
 */

let nextQuestionId = 1;

export const addQuestionForm = () => {
    return {
        type: ADD_QUESTION,
        questionId: nextQuestionId++
    }
};

export const clearQuestionForms = () => {
    nextQuestionId = 1;
    return {
        type: CLEAR_QUESTION
    }
};

export const removeQuestion = (questionId) => {
    return {
        type: REMOVE_QUESTION,
        questionId
    }
};

/**
 * CRUD FOR QUIZZES
 */
export const createQuiz = formValues => async dispatch => {
    const token = localStorage.getItem('token');

    const response = await axios.post(
        '/quiz',
        formValues, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    );
    dispatch({ type: CREATE_QUIZ, payload: response.data });
    //Do some programmatic navigation to automatically bring the user back to the list of streams
    history.push('/');
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

export const fetchQuiz = id => async dispatch => {
    const token = localStorage.getItem('token');

    const response = await axios.get(`/quiz/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    dispatch({ type: FETCH_QUIZ, payload: response.data });
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
    history.push('/');
};

export const deleteQuiz = id => async dispatch => {
    const token = localStorage.getItem('token');

    await axios.delete(`/quiz/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    dispatch({ type: DELETE_QUIZ, payload: id });
    history.push('/');
};