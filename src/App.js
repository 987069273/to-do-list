import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import List from './Router';
import TodoDrawer from './components/TodoDrawer';


function App({showTodoDrawer}) {
  return (
    <>
      <div className="container app">
        <div className='app_nav'><h5>导航</h5></div>      
      <List />
      </div>
      { showTodoDrawer &&
        <TodoDrawer />
      }
    </>
  );
}

export default connect(state =>({showTodoDrawer: state.showTodoDrawer}))(App);