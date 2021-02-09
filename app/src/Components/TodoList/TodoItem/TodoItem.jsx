import React from 'react';

import Button from '../../Button/Button';
import TodoModal from '../../ModalDialog/TodoModalDialog';

import { TODO_DELETE_URL, TODO_UPDATE_URL } from '../../../urls';

import './style.css';

const TodoItem = ({
    title,
    body,
    is_complete,
    slug,
    deleteTodoAction,
    toggle_modal_dialog_state,
    toggle_modal_dialog,
    update_title_input,
    update_body_input,
    input_fields,
    fetchTasksList,
}) => {
    const listTitleClasses = `todoItem--title ${
        is_complete ? 'todoItem--title__done' : ''
    }`;

    const showModalDialog = () => {
        update_title_input(title);
        update_body_input(body);
        toggle_modal_dialog(slug);
    };

    const deleteTodo = (todo_slug) => {
        fetch(`${TODO_DELETE_URL}/${todo_slug}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                deleteTodoAction(todo_slug);
            }
        });
        console.log(todo_slug);
    };

    const updateTodo = (todo) => {
        const todo_slug = slug;
        const new_todo = {
            title: todo.title,
            body: todo.body,
            is_complete: false,
        };

        fetch(`${TODO_UPDATE_URL}/${todo_slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_todo),
        }).then((response) => {
            if (response.ok) {
                fetchTasksList();
            }
        });
    };

    const toggleIsComplete = (todo_slug, is_complete) => {
        const new_todo = {
            title: title,
            body: body,
            is_complete: !is_complete,
        };

        fetch(`${TODO_UPDATE_URL}/${todo_slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_todo),
        }).then((response) => {
            if (response.ok) {
                fetchTasksList();
            }
        });
    };

    return (
        <>
            <TodoModal
                show={toggle_modal_dialog_state}
                handleClose={() => toggle_modal_dialog(slug)}
                input_fields={input_fields}
                update_title_input={update_title_input}
                update_body_input={update_body_input}
                buttonText={'Edit'}
                addTodo={updateTodo}
            />

            <div className="todoItem">
                <div className="container">
                    <input
                        className="todoItem--checkbox"
                        type="checkbox"
                        onChange={() => toggleIsComplete(slug, is_complete)}
                        defaultChecked={is_complete}
                    ></input>
                    <div>
                        <p className={listTitleClasses}>{title}</p>
                    </div>
                </div>
                <hr />
                <Button mode="secondary">Show</Button>
                <Button onClick={() => showModalDialog()} mode="warning">
                    Edit
                </Button>
                <Button onClick={() => deleteTodo(slug)} mode="danger">
                    Delete
                </Button>
            </div>

            <p className="todoItem--body">{body}</p>
        </>
    );
};

export default TodoItem;
