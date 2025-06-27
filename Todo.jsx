import { useState } from 'react';
import './Todo.css';
import { v4 as uuidv4 } from 'uuid';

function Todo() {
    let [todo, setTodo] = useState([
        { task: "Sample task", id: uuidv4(), isDone: false, isEditing: false }
    ]);
    const [newTodo, setNewTodo] = useState("");

    const newTask = () => {
        if (newTodo.trim() !== "") {
            const newItem = {
                task: newTodo,
                id: uuidv4(),
                isDone: false,
                isEditing: false
            };
            setTodo([...todo, newItem]); // Adds newItem to the existing todo list
            setNewTodo("");             // Clears the input box
        }
    };

    const updateTodo = (event) => {
        setNewTodo(event.target.value);
    };

    const deleteTask = (id) => {
        setTodo(todo.filter(item => item.id !== id));
    };

    const toggleDone = (id) => {
        setTodo(todo.map(item => 
            item.id === id ? { ...item, isDone: !item.isDone } : item
        ));
    };

    const enableEditing = (id) => {
        setTodo(todo.map(item =>
            item.id === id ? { ...item, isEditing: true } : item
        ));
    };

    const handleEditChange = (e, id) => {
        const value = e.target.value;
        setTodo(todo.map(item =>
            item.id === id ? { ...item, task: value } : item
        ));
    };

    const saveEdit = (id) => {
        setTodo(todo.map(item =>
            item.id === id ? { ...item, isEditing: false } : item
        ));
    };

    return (    
        <div className="todo-container">
            <h2 className="title">🌟 My Todo App</h2>
            <input
                className="input-task"
                placeholder="Enter your task here..."
                value={newTodo}
                onChange={updateTodo}
            />
            <button className="submit-button" onClick={newTask}>
                Submit the task
            </button>
            <div className="todo-list">
                <h4>📋 Todo List</h4>
                <ul>
                    {todo.map((item) => (
                        <li key={item.id} className={item.isDone ? "done-task" : ""}>
                            {item.isEditing ? (
                                <>
                                    <input
                                        value={item.task}
                                        onChange={(e) => handleEditChange(e, item.id)}
                                    />
                                    <button onClick={() => saveEdit(item.id)}>💾 Save</button>
                                </>
                            ) : (
                                <>
                                    <span onClick={() => toggleDone(item.id)}>{item.task}</span>
                                    <button onClick={() => enableEditing(item.id)}>✏️ Edit</button>
                                    <button onClick={() => deleteTask(item.id)}>🗑️ Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todo;
