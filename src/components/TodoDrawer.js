import React, { Component } from "react";
import TodoForm from "./TodoForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodoDrawer.css";

class TodoDrawer extends Component {
  render() {
    return (
      <div className='container-fluid h-100'>
        <div className="todoDrawer_layer--transparent position-fixed h-100 w-100"></div>
        <div className="todoDrawer_panel container-sm position-fixed h-100 ">
          <h5 className="mt-4">任务详情</h5>
          <hr />
          <TodoForm />
        </div>
      </div>
    );
  }
}

export default TodoDrawer;
