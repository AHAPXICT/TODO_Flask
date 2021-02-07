import React from 'react';

import TodoItem from './TodoItem/TodoItem';
import Button from '../Button/Button';

import './style.css';

const BaseUrl = 'http://127.0.0.1:5000/api/todos';

class TodoList extends React.Component {
    state = {
        tasks: [{ title: 'title1' }],
    };

    componentDidMount() {
        this.fetchTasksList();
    }

    fetchTasksList = () => {
        fetch(BaseUrl)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ tasks: data });
            });
    };

    render() {
        return (
            <div className="todoList">
                <Button mode="primary">Add</Button>
                {this.state.tasks.map((task) => (
                    <TodoItem
                        title={task.title}
                        body={task.body}
                        is_complete={task.is_complete}
                        key={task.slug}
                    />
                ))}
            </div>
        );
    }
}

export default TodoList;
