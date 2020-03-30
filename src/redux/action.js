import {
  ADD_TODO,
  SET_VISIBILITY_FILTER,
  DELETE_ITEM,
  IMPORTANT_ITEM,
  DONE_ITEM,
  ACTIVE_ITEM,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  URL,
} from "../redux/types";

export function addTodo(text, important, done) {
  return { type: ADD_TODO, text: text, important: important, done: done };
}
export const onDeleted = (id) => ({ type: DELETE_ITEM, id });
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
export const onImportant = (id, res) => ({
  type: IMPORTANT_ITEM,
  id: id,
  payload: res,
});
export const onDone = (id, res) => ({ type: DONE_ITEM,
  id: id,
  payload: res,});

export function fetchProductsError(e) {
  return {
    type: FETCH_PRODUCTS_ERROR,
    e
  };
}
export const fetchProductsSuccess = (data) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: data,
  };
};
export const getAllItems = () => (dispatch) => {
  //dispatch(fetchProductsPending());
  fetch(`${URL}`)
    .then((res) => res.json())
    //.then(res=>console.log(res))
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(fetchProductsSuccess(res));
    })
    .catch((e) => {
      dispatch(fetchProductsError(e));
    });
};

export const checkImportant = (id, todo) => (dispatch) => {
  fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(todo),
  }).then((res) => dispatch(onImportant(id, res)));
};
export const checkDone = (id, todo) => (dispatch) => {
  fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(todo),
  }).then((res) => dispatch(onDone(id , res)));
};
export const addNewTask = (text, important, done) => (dispatch) => {
  fetch(`${URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      text: text,
      important: important,
      done: done,
    }),
  }).then(() => dispatch(addTodo(text, important, done)));
};
export const deleteItems = (id) => (dispatch) => {
  fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    //.then(res => res.json())
    .then(() => dispatch(onDeleted(id)));
};
