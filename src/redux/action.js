import {
  ADD_ITEM_SUCCESS,
  SET_VISIBILITY_FILTER,
  DELETE_ITEM_SUCCESS,
  GET_ALL_ITEMS_SUCCESS,
  GET_ALL_ITEMS_ERROR,
  UPDATE_ITEM_SUCCESS,
  URL,
  DELETE_ITEM_ERROR,
  ADD_ITEM_ERROR,
  UPDATE_TODO_ERROR,
} from "../redux/types";

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

//================================================

export function getAllItemsError(error) {
  return {
    type: GET_ALL_ITEMS_ERROR,
    payload: error,
  };
}
export const getAllItemsSuccess = (data) => ({
  type: GET_ALL_ITEMS_SUCCESS,
  payload: data,
});
export const getAllItems = () => (dispatch) => {
  fetch(`${URL}/posts`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(getAllItemsSuccess(res));
    })
    .catch((e) => {
      dispatch(getAllItemsError(e));
    });
};

//================================================
export const updateTodoSuccess = (id, newTodo) => ({
  type: UPDATE_ITEM_SUCCESS,
  payload: {
    id,
    newTodo,
  },
});
export const updateTodoError = (error) => ({
  type: UPDATE_TODO_ERROR,
  payload: error,
});
export const updateTodo = (id, todo) => (dispatch) => {
  fetch(`${URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(todo),
  })
    .then(() => dispatch(updateTodoSuccess(id, todo)))
    .catch((e) => dispatch(updateTodoError(e)));
};

//==================================================================
export const addNewItemSuccess = (text, important, done) => ({
  type: ADD_ITEM_SUCCESS,
  text: text,
  important: important,
  done: done,
});
export const addNewItemError = (error) => ({
  type: ADD_ITEM_ERROR,
  payload: error,
});
export const addNewItem = (text, important, done) => (dispatch) => {
  fetch(`${URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      text: text,
      important: important,
      done: done,
    }),
  })
    .then(() => dispatch(addNewItemSuccess(text, important, done)))
    .catch((e) => dispatch(addNewItemError(e)));
};

//==================================================================
export const onDeletedSuccess = (id) => ({ type: DELETE_ITEM_SUCCESS, id });
export const onDeletedError = (error) => ({
  type: DELETE_ITEM_ERROR,
  payload: error,
});
export const onDeleted = (id) => (dispatch) => {
  fetch(`${URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then(() => dispatch(onDeletedSuccess(id)))
    .catch((e) => {
      dispatch(onDeletedError(e));
    });
};
