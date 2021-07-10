import React from "react";
import Todo from "../Todo";

function Board({ boardTitle, tasks, onTodoDragStart, handleDrop, handleDragEnter, handleDragLeave }) {
  // const _tasks = [...new Set(tasks)];
  const boardKey = boardTitle.toLowerCase().split(" ").join("-");
  return (
    <div className="board">
      <div className="board_inner">
        <header>
          <h3 className="board_title">{boardTitle}</h3>
        </header>

        <div
          className="board_body"
          onDragOver={(event) => event.preventDefault()}
          onDragEnter={handleDragEnter(boardKey)}
          onDragLeave={handleDragLeave(boardKey)}
          onDrop={handleDrop(boardKey)}
        >
          {tasks.length
            ? tasks.map((task, index) => (
                <Todo
                  key={index}
                  todoIndex={task.todoId}
                  todo={task}
                  onTodoDragStart={onTodoDragStart(boardKey, task)}
                />
              ))
            : "No tasks yet!!"}
        </div>
      </div>
    </div>
  );
}

export default Board;
