import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faFilter } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../App.css";
import "./TodoListPage.css";

const mapDispatchToProps = (dispatch) => ({
  clickAddButton: bindActionCreators(
    () => ({ type: "EDIT_TODO", show: true }),
    dispatch
  ),
  clickTodoButton: bindActionCreators(
    (entry) => ({ type: "TO_DO", entry }),
    dispatch
  ),
  clickFinishButton: bindActionCreators(
    (entry) => ({ type: "FINISH", entry }),
    dispatch
  ),
  clickEditButton: bindActionCreators(
    (entryEdited) => ({
      type: "EDIT_TODO",
      show: true,
      entryEdited,
    }),
    dispatch
  ),
  clickDelButton: bindActionCreators(
    (entry) => ({ type: "DELETE", entry }),
    dispatch
  ),
  toFilter: bindActionCreators(
    (filterBy) => ({ type: "FILTER_BY", filterBy }),
    dispatch
  ),
  navToPage: bindActionCreators(
    (pageNumber) => ({ type: "SHOW_PAGE", pageNumber }),
    dispatch
  ),
});

const mapStateToProps = (state) => {
  return {
    filteredBy: state.todos.filter.filteredBy,
    filteredTodos: state.todos.filter.filteredTodos,
    todosInPage: state.todos.todosInPage.todosToShow,
    pageNumber: state.todos.todosInPage.pageNumber,
    totalPageNum: state.todos.filter.totalPageNum,
  };
};

const TodoListPage = ({
  filterArr = ["全部", "待办", "完成", "删除"],
  filteredBy,
  todosInPage,
  pageNumber,
  totalPageNum,
  clickAddButton,
  clickEditButton,
  clickTodoButton,
  clickFinishButton,
  clickDelButton,
  toFilter,
  navToPage,
}) => {
  console.log(
    filteredBy,
    todosInPage,
    pageNumber,
    totalPageNum,
    clickAddButton,
    clickEditButton,
    clickTodoButton,
    clickFinishButton,
    clickDelButton,
    toFilter,
    navToPage
  );
  return (
    <div className="todoListPage">
      <div className="todoListPage_title">
        <h5>任务列表</h5>
      </div>
      <div>
        <button
          className="btn todoListPage_btn--bordered"
          onClick={clickAddButton}
        >
          新增
        </button>
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
                    data-offset="-40, 0"
                  >
                    <FontAwesomeIcon icon={faFilter} size="sm" />
                  </button>
                  <div className="dropdown-menu dropdownDiv">
                    {filterArr.map((item) => {
                      return (
                        <span
                          key={item}
                          className="dropdown-item"
                          onClick={() => {
                            toFilter(item);
                          }}
                        >
                          {item === filteredBy && (
                            <input
                              type="radio"
                              id={item}
                              checked
                              onChange={() => {
                                toFilter(item);
                              }}
                            />
                          )}
                          {item !== filteredBy && (
                            <input
                              type="radio"
                              id={item}
                              onChange={() => {
                                toFilter(item);
                              }}
                            />
                          )}
                          <label className="ml-2" htmlFor="all">
                            {item}
                          </label>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {!todosInPage && (
            <tr>
              <FontAwesomeIcon icon={faInbox} size="lg" />
              <h5>暂无数据</h5>
            </tr>
          )}
          {todosInPage &&
            todosInPage.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{item.dueTo}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="btn todoListPage_btn--bordered"
                    onClick={() => {
                      clickEditButton(item);
                    }}
                  >
                    编辑
                  </button>
                  {item.status === "完成" && (
                    <button
                      className="btn todoListPage_btn--bordered"
                      onClick={() => {
                        clickTodoButton(item);
                      }}
                    >
                      待办
                    </button>
                  )}
                  {item.status === "待办" && (
                    <button
                      className="btn todoListPage_btn--bordered"
                      onClick={() => {
                        clickFinishButton(item);
                      }}
                    >
                      完成
                    </button>
                  )}
                  {item.status !== "删除" && (
                    <button
                      className="btn todoListPage_btn--bordered red_txt"
                      onClick={() => {
                        clickDelButton(item);
                      }}
                    >
                      删除
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <nav className="todoListPage_div--right">
        <ul className="pagination">
          <li className="page-item">
            <span
              className={classNames("page-link", {
                gray_txt: pageNumber === 1,
              })}
              onClick={
                pageNumber === 1 ? null : () => navToPage(pageNumber - 1)
              }
            >
              &lt;
            </span>
          </li>
          {[...new Array(totalPageNum).keys()].map((item, index) => {
            const classnames = classNames("page-link", {
              black_txt: pageNumber === index + 1,
            });
            return (
              <li key={index} className="page-item">
                <span
                  className={classnames}
                  onClick={
                    pageNumber === index + 1 ? null : () => navToPage(index + 1)
                  }
                >
                  {index + 1}
                </span>
              </li>
            );
          })}
          <li className="page-item">
            <span
              className={classNames("page-link", {
                gray_txt: pageNumber === totalPageNum,
              })}
              onClick={
                pageNumber === totalPageNum
                  ? null
                  : () => navToPage(pageNumber + 1)
              }
            >
              &gt;
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

TodoListPage.propTypes = {
  filterArr: PropTypes.array,
  filterBy: PropTypes.string,
  todosInPage: PropTypes.array,
  pageNumber: PropTypes.number.isRequired,
  totalPageNum: PropTypes.number.isRequired,
  clickAddButton: PropTypes.func,
  clickEditButton: PropTypes.func,
  clickTodoButton: PropTypes.func,
  clickFinishButton: PropTypes.func,
  clickDELButton: PropTypes.func,
  clickPageNum: PropTypes.func,
  clickPrev: PropTypes.func,
  clickNext: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListPage);
