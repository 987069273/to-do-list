import React from 'react';
import { connect } from 'react-redux';


import List from './Router';
import TodoDrawer from './components/TodoDrawer';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


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

App.propTypes = {
  showTodoDrawer: PropTypes.bool,
}

export default connect(state =>({showTodoDrawer: state.todoDrawer.showTodoDrawer}))(App);