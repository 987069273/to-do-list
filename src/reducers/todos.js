import { ENTRIES_IN_A_PAGE, initialState } from "./index";

const getTodos = (todos, newTodo) => {
  let addOrNot = true;
  const newTodos = todos.map((item) => {
    if (item.id !== newTodo.id) {
      return item;
    } else {
      if (item.id) {
        addOrNot = false;
        console.log("add a new entry");
        return { ...item, ...newTodo };
      } else {
        return item;
      }
    }
  });
  if (addOrNot) {
    console.log("新增了一条");
    newTodos.push({ ...newTodo, status: "待办" });
  }
  console.log(newTodo);
  return newTodos;
};

const getFilteredTodos = (todos, filterBy) => {
  const filteredTodos =
    filterBy !== "全部"
      ? todos.filter((item) => {
          return item.status === filterBy;
        })
      : [...todos];
  return filteredTodos;
};

const getTodosToShow = (todos, pageNumber) => {
  const todosInPage = todos.slice(
    (pageNumber - 1) * ENTRIES_IN_A_PAGE,
    pageNumber * ENTRIES_IN_A_PAGE
  );
  console.log(todosInPage);
  return todosInPage;
};

const updateFilter = (todos, filterBy, pageNumber, filter) => {
  console.log({ todos, filterBy, pageNumber, filter });
  const filteredTodos = getFilteredTodos(todos, filterBy);
  let totalPageNum =
    Math.ceil(filteredTodos.length / ENTRIES_IN_A_PAGE) === 0
      ? 1
      : Math.ceil(filteredTodos.length / ENTRIES_IN_A_PAGE);
  console.log(totalPageNum);
  const todosToShow = getTodosToShow(filteredTodos, pageNumber);
  const newFilter = {
    ...filter,
    filteredTodos,
    filteredBy: filterBy,
    totalPageNum,
  };
  return {
    filter: newFilter,
    todosInPage: { todosToShow, pageNumber },
  };
};

const updateTodos = (allTodos, newTodo, filterBy, pageNumber, filter) => {
  const newTodos = getTodos(allTodos, newTodo);
  const newFilterAndTodosInPage = updateFilter(
    newTodos,
    filterBy,
    pageNumber,
    filter
  );
  return { allTodos: newTodos, ...newFilterAndTodosInPage };
};

const todos = (state = initialState.todos, action) => {
  let newState;
  switch (action.type) {
    case "TO_DO":
      newState = updateTodos(
        state.allTodos,
        { ...action.entry, status: "待办" },
        state.filter.filteredBy,
        state.todosInPage.pageNumber,
        state.filter
      );
      return {
        ...state,
        ...newState,
      };
    case "FINISH":
      newState = updateTodos(
        state.allTodos,
        { ...action.entry, status: "完成" },
        state.filter.filteredBy,
        state.todosInPage.pageNumber,
        state.filter
      );
      return { ...state, ...newState };

    case "DELETE":
      newState = updateTodos(
        state.allTodos,
        { ...action.entry, status: "删除" },
        state.filter.filteredBy,
        state.todosInPage.pageNumber,
        state.filter
      );
      return { ...state, ...newState };
    case "SAVE_TODO":
      console.log(action.entry);
      newState = updateTodos(
        state.allTodos,
        action.entry,
        state.filter.filteredBy,
        state.todosInPage.pageNumber,
        state.filter
      );
      console.log(newState);
      return { ...state, ...newState };
    case "FILTER_BY":
      const newFilterAndTodosInPage = updateFilter(
        state.allTodos,
        action.filterBy,
        state.todosInPage.pageNumber,
        state.filter
      );
      return { ...state, ...newFilterAndTodosInPage };
    case "SHOW_PAGE":
      const newTodosToShow = getTodosToShow(
        state.filter.filteredTodos,
        action.pageNumber
      );
      console.log({
        ...state,
        todosInPage: { newTodosToShow, pageNumber: action.pageNumber },
      });
      return {
        ...state,
        todosInPage: {
          todosToShow: newTodosToShow,
          pageNumber: action.pageNumber,
        },
      };
    default:
      return state;
  }
};

export default todos;
