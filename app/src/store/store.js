import { createStore, combineReducers } from 'redux';
import todoReducer from './Todo/TodoReducer';

const appReducer = combineReducers({
    todo: todoReducer,
});

const store = createStore(
    appReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
