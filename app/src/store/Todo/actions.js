export const SET_TODOS = 'TODO/SET_TODOS';
export const SET_SERVER_ERROR_MESSAGE = 'TODO/SET_SERVER_ERROR_MESSAGE';
export const DELETE_TODO = 'TODO/DELETE_TODO';
export const TOGGLE_MODAL_DIALOG = 'TODO/TOGGLE_MODAL_DIALOG';
export const UPDATE_TITLE_INPUT = 'TODO/UPDATE_TITLE_INPUT';
export const UPDATE_BODY_INPUT = 'TODO/UPDATE_BODY_INPUT';

export const addTodos = (todos) => {
    return {
        type: SET_TODOS,
        payload: todos,
    };
};

export const setErrorMessage = () => {
    return {
        type: SET_SERVER_ERROR_MESSAGE,
    };
};

export const deleteTodo = (slug) => {
    return {
        type: DELETE_TODO,
        payload: slug,
    };
};

export const toggleModalDialog = () => {
    return {
        type: TOGGLE_MODAL_DIALOG,
    };
};

export const updateTitleInput = (text) => {
    return {
        type: UPDATE_TITLE_INPUT,
        payload: text,
    };
};

export const updateBodyInput = (text) => {
    return {
        type: UPDATE_BODY_INPUT,
        payload: text,
    };
};
