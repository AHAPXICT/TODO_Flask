import { Provider } from 'react-redux';

import './App.css';
import TodoList from './Components/TodoList/TodoList';
import Title from './Components/Title/Title';
import store from './store/store';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Title />
                <TodoList />
            </div>
        </Provider>
    );
}

export default App;
