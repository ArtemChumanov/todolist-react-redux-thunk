import React, { useEffect, useState } from "react";
import Todo from "../todolistItem/todolist-item";
import PropTypes from "prop-types";
import "./todolist.css";
const TodoList = ({
  products,
  onImportant,
  onDone,
  onDeleted,
  getAllItems,
  error,
}) => {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      getAllItems();
    }, 1000);
    return () => {
      // Return callback to run on unmount.
      window.clearInterval(timer);
    };
  }, []);
  console.log(error);
  if (error) {
    return <p>Server is not connected</p>;
  }
  const elements = products.map((item) => {
    const { id, ...itemprops } = item;
    return (
      <li key={id} className="list-group-item">
        <Todo
          {...itemprops} /*або  label={item.label} important={item.important}*/
          onImportant={() => onImportant(id, item)}
          onDone={() => onDone(id, item)}
          onDeleted={() => onDeleted(id, item)}
        />
      </li>
    );
  });

  return <ul className="group-list-item">{elements}</ul>;
};

TodoList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      important: PropTypes.bool.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ),
  onImportant: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
};
export default TodoList;
