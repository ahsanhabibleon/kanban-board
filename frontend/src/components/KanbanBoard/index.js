import React, { useState } from "react";
import AddTodo from "../AddTodo";
import Board from "../Board";
import { Portal } from "../../elements";

function KanbanBoard() {
  const [tasks, setTasks] = useState({
    todos: [],
    "in-progress": [],
    done: [],
  });
  const [currentTodo, setCurrentTodo] = useState({});
  const [movingTodo, setMovingTodo] = useState({});

  const onAddTodo = (payload) => {
    setTasks({
      ...tasks,
      todos: [...tasks.todos, payload],
    });
  };

  const resetBoard = (board) => {
    const updatedCurrentBoard = [...tasks[board]];
    updatedCurrentBoard.map((task) => (task.isActive = false));
    setTasks({
      ...tasks,
      [board]: updatedCurrentBoard,
    });
  };

  const onTodoDragStart = (board, todo) => (event) => {
    event.dataTransfer.setData("text/plain", null);
    const updatedBoard = [...tasks[board]];
    updatedBoard.map((task) => {
      return task.todoId === todo.todoId ? (task.isActive = true) : (task.isActive = false);
    });

    setTasks({
      ...tasks,
      [board]: updatedBoard,
    });

    setCurrentTodo({
      board: board,
      id: todo.todoId,
    });
    setMovingTodo(todo);
    document.addEventListener("dragend", handleDragEnd(board));
  };

  const handleDragEnter = (board) => (event) => {
    if (board === currentTodo.board) return;
    if (event.target.classList.contains("board_body")) {
      event.target.classList.add("droppable");
    }
  };

  const handleDragLeave = (board) => (event) => {
    if (board === currentTodo.board) return;
    event.target.classList.remove("droppable");
  };

  const handleDrop = (board) => (event) => {
    if (board === currentTodo.board) {
      resetBoard(board);
    } else {
      const newMovingTodo = { ...movingTodo };
      newMovingTodo.isActive = false;
      const updatedDestinatinoBoard = [...tasks[board], newMovingTodo];
      const updatedCurrentBoard = [...tasks[currentTodo.board]].filter((task) => task.todoId !== currentTodo.id);
      setTasks({
        ...tasks,
        [currentTodo.board]: updatedCurrentBoard,
        [board]: updatedDestinatinoBoard,
      });
      event.target.classList.remove("droppable");
    }
  };

  const handleDragEnd = (board) => (event) => {
    if (event.target.classList.contains("board_body")) {
      console.log("drag ended");
      return;
    }
    // resetBoard(board);
  };

  return (
    <div className="kanban-board">
      <AddTodo onAddTodo={onAddTodo} />
      <div className="board_row d-flex">
        <Board
          boardTitle="Todos"
          tasks={tasks.todos}
          onTodoDragStart={onTodoDragStart}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
        />
        <Board
          boardTitle="In Progress"
          tasks={tasks["in-progress"]}
          onTodoDragStart={onTodoDragStart}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
        />
        <Board
          boardTitle="Done"
          tasks={tasks.done}
          onTodoDragStart={onTodoDragStart}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
        />
      </div>

      {/* {isMoving ? (
        <Portal>
          <div
            className="todo"
            style={{
              position: "fixed",
              width: draggableElementPosition.width,
              height: draggableElementPosition.height,
              left: draggableElementPosition.x,
              top: draggableElementPosition.y,
            }}
          >
            <div className="todo-content">{`${currentTodo.todoText}`}</div>
          </div>
        </Portal>
      ) : (
        ""
      )} */}
    </div>
  );
}

export default KanbanBoard;
