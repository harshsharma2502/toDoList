import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Todo.css";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { task: "sample-task", id: uuidv4(), isDone: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addNewTask = () => {
    if (newTodo.trim() === "") return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { task: newTodo, id: uuidv4(), isDone: false },
    ]);
    setNewTodo("");
  };

  const updateTodoValue = (e) => setNewTodo(e.target.value);

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const markAllDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, isDone: true }))
    );
  };

  const markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo
      )
    );
  };

  const upperCaseAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        task: todo.task.toUpperCase(),
      }))
    );
  };

  return (
    <div className="todo-container">
      <h2>🌟 My Todo App</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Add a task"
          value={newTodo}
          onChange={updateTodoValue}
        />
        <button onClick={addNewTask}>Add Task</button>
      </div>

      <div className="action-buttons">
        <button onClick={markAllDone}>Mark All Done</button>
        <button onClick={upperCaseAll}>Uppercase All</button>
      </div>

      <hr />

      <h4>Tasks Todo</h4>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span className={todo.isDone ? "done" : ""}>{todo.task}</span>
            <div className="btn-group">
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
              <button className="done-btn" onClick={() => markAsDone(todo.id)}>
                Mark As Done
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
