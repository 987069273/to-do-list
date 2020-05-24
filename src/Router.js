import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import TodoListPage from './pages/TodoListPage';

const List = () => (
    <Router>
        <Link to='/list'>任务列表页面</Link>
        <Route path='/list' component={TodoListPage} />
    </Router>
);

export default List;