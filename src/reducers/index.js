import { combineReducers } from "redux";
import todos from "./todos";

const ENTRIES_IN_A_PAGE = 10;

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
  {
    id: 4,
    title: "编程",
    content: "完成一个小项目",
    dueTo: "2020-05-23",
    status: "完成",
  },
  {
    id: 5,
    title: "编程",
    content: "完成一个小项目",
    dueTo: "2020-05-23",
    status: "完成",
  },
  {
    id: 63,
    title: "编程",
    content: "完成一个小项目",
    dueTo: "2020-05-23",
    status: "完成",
  },
  {
    id: 7,
    title: "编程",
    content: "完成一个小项目",
    dueTo: "2020-05-23",
    status: "完成",
  },
  {
    id: 8,
    title: "编程",
    content: "完成一个小项目",
    dueTo: "2020-05-23",
    status: "完成",
  },
  {
    id: 9,
    title: "编程",
    content: "完成一个小项目",
    dueTo: "2020-05-23",
    status: "完成",
  },
  {
    id: 10,
    title: "编程",
    content: "完成一个小项目",
    dueTo: "2020-05-23",
    status: "完成",
  },
  {
    id: 11,
    title: "编程",
    content: "完成一个小项目",
    dueTo: "2020-05-23",
    status: "完成",
  },
];

const initialState = {
  todoDrawer: {
    showTodoDrawer: false,
    entryEdited: {
      title: "",
      dueTo: new Date()
        .toLocaleDateString()
        .split("/")
        .map((num) => num.padStart(2, "0"))
        .join("-"),
      content: "",
    },
    formInfo: {
      title: "",
      dueTo: new Date()
        .toLocaleDateString()
        .split("/")
        .map((num) => num.padStart(2, "0"))
        .join("-"),
      content: "",
    },
  },
  todos: {
    allTodos: fakeData,
    todosInPage: {
      pageNumber: 1,
      todosToShow: fakeData.slice(0, ENTRIES_IN_A_PAGE),
    },
    filter: {
      filteredBy: "全部",
      filteredTodos: fakeData.filter(() => true),
      totalPageNum:
        Math.ceil(fakeData.length / ENTRIES_IN_A_PAGE) === 0 ? 1 : Math.ceil(fakeData.length / ENTRIES_IN_A_PAGE),
    },
  },
};

const alterTodoDrawer = (state = initialState.todoDrawer, action) => {
  switch (action.type) {
    case "EDIT_TODO":
      // 当action参数没有entryEdited属性时，则使用默认state中的entryEdited值，使用场景为新建一个todo，或者关闭todoDrawer
      const { title, dueTo, content } = action.entryEdited || state.entryEdited;
      return {
        ...state,
        showTodoDrawer: action.show,
        entryEdited: action.entryEdited || state.entryEdited,
        formInfo: { ...state.formInfo, title, dueTo, content },
      };
    case "RELOAD_ENTRY":
      return {
        ...state,
        formInfo: {
          title: state.entryEdited.title,
          dueTo: state.entryEdited.dueTo,
          content: state.entryEdited.content,
        },
      };
    case "EDIT_FORM":
      return { ...state, formInfo: { ...state.formInfo, ...action.inputInfo } };
    default:
      return state;
  }
};

const Reducers = combineReducers({
  todoDrawer: alterTodoDrawer,
  todos: todos,
});

export default Reducers;
export { ENTRIES_IN_A_PAGE, initialState };
