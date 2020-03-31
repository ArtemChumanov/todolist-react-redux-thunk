import { combineReducers } from "redux";
import {
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  DELETE_ITEM_ERROR,
  ADD_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  GET_ALL_ITEMS_SUCCESS,
  GET_ALL_ITEMS_ERROR,
  UPDATE_ITEM_SUCCESS,
  ADD_ITEM_ERROR,
  UPDATE_TODO_ERROR,
} from "../redux/types";
const { SHOW_ALL } = VisibilityFilters;

const initialState = {
  todos: [],
  error: null,
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
    case GET_ALL_ITEMS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
      };
    case GET_ALL_ITEMS_ERROR:
      return {
        error: action.payload,
      };


    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.text,
            important: false,
            done: false,
          },
        ],
      };
    case ADD_ITEM_ERROR:
      return {
        error: action.payload,
      };



    case UPDATE_ITEM_SUCCESS: {
      return {
        ...state.todos,
        todos: state.todos.map((item) =>
          item.id === action.payload.id ? action.payload.newTodo : item
        ),
      };
    }
    case UPDATE_TODO_ERROR: {
      return { error: action.payload };
    }


    case DELETE_ITEM_ERROR:
      return { error: action.payload };
    case DELETE_ITEM_SUCCESS:
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
