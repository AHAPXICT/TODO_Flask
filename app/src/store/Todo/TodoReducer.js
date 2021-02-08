import { SET_TODOS, SET_SERVER_ERROR_MESSAGE, DELETE_TODO } from './actions';

const initialState = {
    todos: [],
    is_loading: true,
    server_error_message: '',
    inputs: {
        title: '',
        is_comlete: false,
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
        default:
            return state;
    }
};

export default todoReducer;
