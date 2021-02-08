import React from 'react';
import { connect } from 'react-redux';

import TodoItem from './TodoItem/TodoItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';

import { TODO_LIST_URL } from '../../urls';

import {
    addTodos,
    setErrorMessage,
    deleteTodo,
} from '../../store/Todo/actions';

import './style.css';

class TodoList extends React.Component {
    componentDidMount() {
        this.fetchTasksList();
    }

    fetchTasksList = () => {
        fetch(TODO_LIST_URL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    this.props.set_error_message();
                }
            })
            .then((data) => {
                this.props.add_todos(data);
            });
    };

    render() {
        return (
            <div className="todoList">
                {this.props.is_loading ? (
                    <Loader />
                ) : (
                    <>
                        <Button mode="primary">Add</Button>
                        {this.props.todos.map((task) => (
                            <TodoItem
                                title={task.title}
                                body={task.body}
                                is_complete={task.is_complete}
                                slug={task.slug}
                                deleteTodoAction={this.props.deleteTodoAction}
                                key={task.slug}
                            />
                        ))}
                    </>
                )}
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        todos: state.todo.todos,
        error_message: state.todo.server_error_message,
        is_loading: state.todo.is_loading,
    };
};

const mapDispatch = {
    add_todos: addTodos,
    set_error_message: setErrorMessage,
    deleteTodoAction: deleteTodo,
};

const connector = connect(mapState, mapDispatch);

export default connector(TodoList);
