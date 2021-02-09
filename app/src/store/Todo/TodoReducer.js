import {
    SET_TODOS,
    SET_SERVER_ERROR_MESSAGE,
    DELETE_TODO,
    TOGGLE_MODAL_DIALOG,
    UPDATE_TITLE_INPUT,
    UPDATE_BODY_INPUT,
    TOGGLE_MODAL_DIALOG_FOR_TODO,
    TOGGLE_BODY_HIDE,
} from './actions';

const initialState = {
    todos: [],
    is_loading: true,
    server_error_message: '',
    toggle_modal_dialog: false,
    inputs: {
        title: '',
        body: '',
    },
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOS:
            return {
                ...state,
                todos: action.payload,
                is_loading: false,
            };
        case SET_SERVER_ERROR_MESSAGE:
            return {
                ...state,
                server_error_message: 'Server error. 500',
            };
        case DELETE_TODO:
            let newTodos = [];

            newTodos = state.todos.filter(
                (todo) => todo.slug !== action.payload
            );

            return {
                ...state,
                todos: newTodos,
            };
        case TOGGLE_MODAL_DIALOG:
            const newToggleState = !state.toggle_modal_dialog;
            return {
                ...state,
                toggle_modal_dialog: newToggleState,
            };
        case UPDATE_TITLE_INPUT:
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    title: action.payload,
                },
            };
        case UPDATE_BODY_INPUT:
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    body: action.payload,
                },
            };
        case TOGGLE_MODAL_DIALOG_FOR_TODO:
            let updatedTodos = [];

            updatedTodos = state.todos.map((todo) => {
                var updated_todo = { ...todo };
                if (todo.slug === action.payload) {
                    updated_todo.toggle_modal_dialog = !updated_todo.toggle_modal_dialog;
                }
                return updated_todo;
            });

            return {
                ...state,
                todos: updatedTodos,
            };
        case TOGGLE_BODY_HIDE:
            let updatedBodyVisible = [];

            updatedBodyVisible = state.todos.map((todo) => {
                var updated_todo = { ...todo };
                if (todo.slug === action.payload) {
                    updated_todo.toggle_body_show = !updated_todo.toggle_body_show;
                }
                return updated_todo;
            });

            return {
                ...state,
                todos: updatedBodyVisible,
            };
        default:
            return state;
    }
};

export default todoReducer;
