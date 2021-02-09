import React from 'react';
import { connect } from 'react-redux';

import TodoItem from './TodoItem/TodoItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import TodoModal from '../ModalDialog/TodoModalDialog';

import { TODO_LIST_URL, TODO_ADD_URL } from '../../urls';

import {
    addTodos,
    setErrorMessage,
    deleteTodo,
    toggleModalDialog,
    updateTitleInput,
    updateBodyInput,
    toggleModalDialogForTodo,
    toggleBodyHide,
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
                }
            })
            .then((data) => {
                const todos = data.reverse();
                const newTodos = todos.map((todo) => {
                    var new_todo = {};
                    new_todo = {
                        ...todo,
                        toggle_modal_dialog: false,
                        toggle_body_show: true,
                    };
                    return new_todo;
                });
                this.props.add_todos(newTodos);
            });
    };

    showModalDialog = () => {
        this.props.toggle_modal_dialog();
    };

    addTodo = (todo) => {
        const newTodo = {
            title: todo.title,
            body: todo.body,
        };

        fetch(TODO_ADD_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        }).then((response) => {
            if (response.ok) {
                console.log('create');
                this.fetchTasksList();
            }
        });
    };

    render() {
        return (
            <div className="todoList">
                {this.props.is_loading ? (
                    <Loader />
                ) : (
                    <>
                        <TodoModal
                            show={this.props.toggle_modal_dialog_state}
                            handleClose={() => this.props.toggle_modal_dialog()}
                            input_fields={this.props.input_fields}
                            update_title_input={this.props.update_title_input}
                            update_body_input={this.props.update_body_input}
                            addTodo={this.addTodo}
                            buttonText={'Add'}
                        />

                        <br />

                        <Button
                            mode="primary"
                            onClick={() => this.showModalDialog()}
                        >
                            Add
                        </Button>

                        <br />
                        <br />
                        <br />

                        {this.props.todos.map((task) => (
                            <TodoItem
                                title={task.title}
                                body={task.body}
                                is_complete={task.is_complete}
                                slug={task.slug}
                                deleteTodoAction={this.props.deleteTodoAction}
                                key={task.slug}
                                toggle_modal_dialog_state={
                                    task.toggle_modal_dialog
                                }
                                handleClose={() =>
                                    this.props.toggle_modal_dialog_for_todo()
                                }
                                update_title_input={
                                    this.props.update_title_input
                                }
                                update_body_input={this.props.update_body_input}
                                toggle_modal_dialog={
                                    this.props.toggle_modal_dialog_for_todo
                                }
                                input_fields={this.props.input_fields}
                                fetchTasksList={this.fetchTasksList}
                                toggle_body_hide={this.props.toggle_body_hide}
                                toggle_body_show_state={task.toggle_body_show}
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
        toggle_modal_dialog_state: state.todo.toggle_modal_dialog,
        input_fields: state.todo.inputs,
    };
};

const mapDispatch = {
    add_todos: addTodos,
    set_error_message: setErrorMessage,
    deleteTodoAction: deleteTodo,
    toggle_modal_dialog: toggleModalDialog,
    update_title_input: updateTitleInput,
    update_body_input: updateBodyInput,
    toggle_modal_dialog_for_todo: toggleModalDialogForTodo,
    toggle_body_hide: toggleBodyHide,
};

const connector = connect(mapState, mapDispatch);

export default connector(TodoList);
