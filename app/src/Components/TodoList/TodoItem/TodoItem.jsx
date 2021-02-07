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
                <ButtonsGroup />
            </div>

            <p className="todoItem--body">{body}</p>
        </>
    );
};

export default TodoItem;
