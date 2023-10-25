import React from "react";

export default function Todo(props) {
  const { todos } = props;
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <ul>
            <li>
              Task {todo.id} - {todo.title}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
