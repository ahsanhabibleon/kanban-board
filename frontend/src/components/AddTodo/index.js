import React, { useRef, useState } from "react";

function AddTodo({ onAddTodo }) {
  const inputRef = useRef(null);
  const [todoId, setTodoId] = useState(1);
  const addNewTodo = (event) => {
    event.preventDefault();
    if (inputRef.current.value === "") return;
    setTodoId(todoId + 1);
    const payload = {
      todoId,
      todoText: inputRef.current.value,
    };
    onAddTodo(payload);
    inputRef.current.value = "";
  };
  return (
    <div className="add-todo">
      <form className="d-flex justify-content-center" onSubmit={addNewTodo}>
        <input type="text" placeholder="Write Your Task" ref={inputRef} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodo;
