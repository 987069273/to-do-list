import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faFilter } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./TodoListPage.css";

const fakeData = [
  {
    id: 1,
    title: "修电脑",
    content: "帮老板修电脑",
    dueTo: "2020-05-24",
    status: "删除",
  },
  {
    id: 2,
    title: "写作业",
    content: "写完今天的作业",
    dueTo: "2020-05-25",
    status: "待办",
  },
  {
    id: 3,
    title: "编程",
    content: "完成一个小项目",
    dueTo: "2020-05-23",
    status: "完成",
  },
];

const mapDispatchToProps = dispatch => (
  {onClick: bindActionCreators(() => ({type: 'ADD_TODO'}), dispatch)}
);

const AddButton = connect(null, mapDispatchToProps)(({onClick}) => (
  <button
    className="btn todoListPage_btn--bordered"
    onClick = {onClick}
  >
    新增
  </button>
));

class TodoListPage extends Component {  
  render() {
    // console.log('change todo list page');
    return (
      <div className="todoListPage">
        <div className="todoListPage_title">
          <h5>任务列表</h5>
        </div>
        <div>
        <AddButton />
        </div>
        <table className="table todoListPage_table">
          <thead>
            <tr>
              <th>ID</th>
              <th>标题</th>
              <th>内容</th>
              <th>截止日期</th>
              <th>状态</th>
              <th>
                <span>操作</span>
                <span className="todoListPage--right">
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      id="filterMenu"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={faFilter} size="sm" />
                    </button>
                    <div className="dropdown-menu dropdownDiv">
                      <span className="dropdown-item">
                        <input type="radio" id="all" />
                        <label htmlFor="all">全部</label>
                      </span>

                      <span className="dropdown-item">
                        <input type="radio" id="toDo" />
                        <label htmlFor="toDo">待办</label>
                      </span>

                      <span className="dropdown-item">
                        <input type="radio" id="done" />
                        <label htmlFor="done">完成</label>
                      </span>

                      <span className="dropdown-item">
                        <input type="radio" id="deleted" />
                        <label htmlFor="deleted">删除</label>
                      </span>
                    </div>
                  </div>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {false && (
              <tr>
                <FontAwesomeIcon icon={faInbox} size="lg" />
                <h5>暂无数据</h5>
              </tr>
            )}
            {true &&
              fakeData.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.content}</td>
                  <td>{item.dueTo}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className="btn todoListPage_btn--bordered">
                      编辑
                    </button>
                    {item.status === "完成" && (
                      <button className="btn todoListPage_btn--bordered">
                        待办
                      </button>
                    )}
                    {item.status === "待办" && (
                      <button className="btn todoListPage_btn--bordered">
                        完成
                      </button>
                    )}
                    {item.status !== "删除" && (
                      <button className="btn todoListPage_btn--bordered red_txt">
                        删除
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <nav className="todoListPage_div_right">
          <ul className="pagination">
            <li className="page-item">
              <span className="page-link gray_txt">&lt;</span>
            </li>
            <li className="page-item">
              <span className="page-link">1</span>
            </li>
            <li className="page-item">
              <span className="page-link black_txt">2</span>
            </li>
            <li className="page-item">
              <span className="page-link black_txt">3</span>
            </li>
            <li className="page-item">
              <span className="page-link black_txt">&gt;</span>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
};

export default TodoListPage;
