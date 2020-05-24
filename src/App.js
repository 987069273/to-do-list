import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import List from './Router';
import TodoDrawer from './components/TodoDrawer';


function App() {
  return (
    <>
      <div className="container app">
        <div className='app_nav'><h5>导航</h5></div>      
      <List />
      </div>
      { false &&
        <TodoDrawer />
      }
    </>
  );
}

export default App;