import React from 'react';

import ButtonsGroup from './ButtonsGroup/ButtonsGroup';

import './style.css';

const TodoItem = ({ title, body, is_complete }) => {
    const listTitleClasses = `todoItem--title ${
        is_complete ? 'todoItem--title__done' : ''
    }`;

    return (
        <>
            <div className="todoItem">
                <div>
                    <input
                        className="todoItem--checkbox"
                        type="checkbox"
                        defaultChecked={is_complete}
                    ></input>
                </div>

                <ButtonsGroup />

                <div className="container">
                    <p className={listTitleClasses}>{title}</p>
                </div>
            </div>
            <p className="todoItem--body">{body}</p>
        </>
    );
};

export default TodoItem;
