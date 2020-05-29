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
  return (
    <div className="todoListPage">
      <div
        id="todoListPage_title"
        className="d-flex w-100 p-0 mx-0 my-1 text-black text-break align-middle font-weight-bold"
      >
        <h5>任务列表</h5>
      </div>
      <div>
        <button className="btn border" onClick={clickAddButton}>
          新增
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-sm table-bordered table-hover rounded-lg my-2 text-center text-wrap">
          <caption></caption>
          <thead className="thead-light">
            <tr>
              <th scope="col" className=" align-middle">
                ID
              </th>
              <th scope="col" className=" align-middle">
                标题
              </th>
              <th scope="col" className=" align-middle">
                内容
              </th>
              <th scope="col" className=" align-middle">
                截止日期
              </th>
              <th scope="col" className=" align-middle">
                状态
              </th>
              <th className="position-relative" scope="col">
                <span>操作</span>
                <span className="todoListPage--right position-absolute">
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
                    <div className="dropdown-menu dropdown p-1">
                      {filterArr.map((item) => {
                        return (
                          <span
                            key={item}
                            className="dropdown-item px-2 align-middle"
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
                            <label className="mx-2 my-1" htmlFor="all">
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
              <tr className="mx-auto align-middle">
                <FontAwesomeIcon icon={faInbox} size="lg" />
                <h5>暂无数据</h5>
              </tr>
            )}
            {todosInPage &&
              todosInPage.map((item, index) => (
                <tr key={index}>
                  <td className="text-break align-middle">{item.id}</td>
                  <td className="text-wrap align-middle">{item.title}</td>
                  <td className="text-wrap align-middle">{item.content}</td>
                  <td className=" align-middle">{item.dueTo}</td>
                  <td className=" align-middle">{item.status}</td>
                  <td className=" align-middle">
                    <div className="btn-group" role="group">
                      <button
                        className="btn border rounded mx-1"
                        onClick={() => {
                          clickEditButton(item, index);
                        }}
                      >
                        编辑
                      </button>
                      {item.status === "完成" && (
                        <button
                          className="btn border rounded mx-1"
                          onClick={() => {
                            clickTodoButton(item, index);
                          }}
                        >
                          待办
                        </button>
                      )}
                      {item.status === "待办" && (
                        <button
                          className="btn border rounded mx-1"
                          onClick={() => {
                            clickFinishButton(item, index);
                          }}
                        >
                          完成
                        </button>
                      )}
                      {item.status !== "删除" && (
                        <button
                          className="btn border rounded text-danger mx-1"
                          onClick={() => {
                            clickDelButton(item, index);
                          }}
                        >
                          删除
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <nav className="todoListPage--right position-absolute text-secondary">
        <ul className="pagination">
          <li className="page-item">
            <span
              className={classNames("page-link", {
                "text-reset": pageNumber !== 1,
                "text-body": pageNumber === 1,
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
              "text-reset": pageNumber !== index + 1,
              "text-body": pageNumber === index + 1,
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
                "text-reset": pageNumber !== totalPageNum,
                "text-body": pageNumber === totalPageNum,
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
