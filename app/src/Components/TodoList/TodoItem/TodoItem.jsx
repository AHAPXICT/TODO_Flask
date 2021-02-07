import React from 'react';

import Button from '../../Button/Button';

import './style.css';

const TodoItem = ({ title, body, is_complete }) => {
    const listTitleClasses = `todoItem--title ${
        is_complete ? 'todoItem--title__done' : ''
    }`;

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
                <Button mode="danger">Delete</Button>
            </div>

            <p className="todoItem--body">{body}</p>
        </>
    );
};

export default TodoItem;
