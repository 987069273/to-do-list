import React, { Component } from 'react';

import './TodoForm.css';

export default class TodoForm extends Component {
    render() {
        return (
            <form>
                <div className='form-group'>
                    <label htmlFor='title'><span className='red_txt todoForm_spaceSpan--right'>*</span>任务名称</label>
                    <input className='form-control' id='title'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='dueTo'><span className='red_txt todoForm_spaceSpan--right'>*</span>任务截止日期</label>
                    <input type='date' className='form-control' id='dueTo' value='2020-05-24' min='2020-05-24'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='title'>任务内容</label>
                    <input className='form-control' id='title'/>
                </div>
                <div className='todoForm_div--evenSpread'>
                    <button type='submit' className='btn bordered_btn btn-primary'>保存</button>
                    <button className='btn bordered_btn'>重置</button>
                    <button className='btn bordered_btn red_txt btn-light'>取消</button>
                </div>
            </form>
            
        )
    }
}
