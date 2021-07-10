import React from "react";

function Todo({ todoIndex, todo, onTodoDragStart }) {
  const { todoText, isActive = false } = todo;
  return (
    <div draggable="true" className={`todo ${isActive ? "to-be-dropped" : ""}`} onDragStart={onTodoDragStart}>
      <div className="todo-content">{`${todoIndex}. ${todoText}`}</div>
    </div>
  );
}

export default Todo;
