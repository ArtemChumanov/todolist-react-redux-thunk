import { VisibilityFilters } from "../../redux/types";

import { connect } from "react-redux";
import {
  onDone,
  getAllItems,
  checkImportant,
  deleteItems,
  checkDone,
  fetchProductsError,
} from "../../redux/action";
import TodoList from "../../components/todolist/todolist";

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.IMPORTANT_ITEMS:
      return todos.filter((todo) => todo.important);
    case VisibilityFilters.ACTIVE_ITEMS:
      return todos.filter((todo) => !todo.done);
    case VisibilityFilters.DONE_ITEMS:
      return todos.filter((todo) => todo.done);
  }
}
const select = (state) => ({
  products: selectTodos(state.todos.todos, state.visibilityFilter),
  error: state.todos.error,
});

const mapDispatchToProps = (dispatch) => ({
  onImportant: (id, todo) => dispatch(checkImportant(id, todo)),
  onDone: (id, todo) => dispatch(checkDone(id, todo)),
  onDeleted: (id) => dispatch(deleteItems(id)),
  getAllItems: () => dispatch(getAllItems()),
});

export default connect(select, mapDispatchToProps)(TodoList);
