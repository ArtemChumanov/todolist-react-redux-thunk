import { combineReducers } from "redux";
import {
  ADD_TODO,
  SET_VISIBILITY_FILTER,
  DELETE_ITEM,
  GET_ALL_ITEMS,
  IMPORTANT_ITEM,
  DONE_ITEM,
  VisibilityFilters,
  ACTIVE_ITEM,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
} from "../redux/types";
const { SHOW_ALL } = VisibilityFilters;

const initialState = {
  todos: [],
  error: null
};

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}
function todos(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        todos: action.payload,
        error: false
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state.todos,
        error:true
      };
    case ADD_TODO:
      return {
        todos: [
          ...state.todos,
          {
            text: action.text,
            important: false,
            done: false,
          },
        ],
        error: false
      };
    case IMPORTANT_ITEM:
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, important: !todo.important } : todo
        ),
      };
    case DONE_ITEM:
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    case DELETE_ITEM:
      return { todos: state.todos.filter((el) => el.id !== action.id) };
    default:
      return state;
  }
}
const todoApp = combineReducers({
  visibilityFilter,
  todos,
});
export default todoApp;
