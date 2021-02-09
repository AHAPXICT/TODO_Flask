import {
    SET_TODOS,
    SET_SERVER_ERROR_MESSAGE,
    DELETE_TODO,
    TOGGLE_MODAL_DIALOG,
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
        default:
            return state;
    }
};

export default todoReducer;
