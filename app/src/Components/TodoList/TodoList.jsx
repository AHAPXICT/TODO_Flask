import React from 'react';
import TodoItem from './TodoItem/TodoItem';

const TodoList = () => {
    return (
        <li>
            <ul>
                <TodoItem />
            </ul>
            <ul>
                <TodoItem />
            </ul>
            <ul>
                <TodoItem />
            </ul>
        </li>
    );
};

export default TodoList;
