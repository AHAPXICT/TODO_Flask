import React from 'react';
import axios from 'axios';

import TodoItem from './TodoItem/TodoItem';

import './style.css';

const BaseUrl = 'http://127.0.0.1:5000/api/todos';

class TodoList extends React.Component {
    state = {
        tasks: [],
    };

    componentDidMount() {
        this.fetchTasksList();
    }

    fetchTasksList = () => {
        axios.get(BaseUrl).then((res) => {
            this.setState({ tasks: res.data });
        });
    };

    render() {
        return (
            <div className="todoList">
                <button>Add</button>
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
