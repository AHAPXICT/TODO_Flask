import React from 'react';

import Button from '../../Button/Button';

import { TODO_DELETE_URL } from '../../../urls';

import './style.css';

const TodoItem = ({ title, body, is_complete, slug, deleteTodoAction }) => {
    const listTitleClasses = `todoItem--title ${
        is_complete ? 'todoItem--title__done' : ''
    }`;

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

    return (
        <>
            <div className="todoItem">
                <div className="container">
                    <input
                        className="todoItem--checkbox"
                        type="checkbox"
                        defaultChecked={is_complete}
                    ></input>
                    <div>
                        <p className={listTitleClasses}>{title}</p>
                    </div>
                </div>
                <hr />
                <Button mode="secondary">Show</Button>
                <Button mode="warning">Edit</Button>
                <Button onClick={() => deleteTodo(slug)} mode="danger">
                    Delete
                </Button>
            </div>

            <p className="todoItem--body">{body}</p>
        </>
    );
};

export default TodoItem;
