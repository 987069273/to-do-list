import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoForm from './TodoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TodoDrawer.css';

class TodoDrawer extends Component {
    render() {
        return (
            <div className='todoDrawer_layer--transparent'>
                <div className='container todoDrawer_panel'>
                    <h5 className='todoDrawer_title'>任务详情</h5>
                    <hr />
                    <TodoForm />
                </div>
            </div>
            
        )
    }
}

export default connect()(TodoDrawer);
