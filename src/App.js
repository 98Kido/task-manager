import React, { useState, useEffect } from 'react';
import './App.css'; //Import the CSS file

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null); // For editing a task
  const API_URL = 'http://localhost:3001/tasks'; //  mock API URL is correct

  // Fetch tasks from the mock API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!newTask.trim()) return;

    const task = { title: newTask, completed: false, status: 'pending' }; // Added status for task
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Toggle task completion and status
  const toggleTask = async (id) => {
    const task = tasks.find((task) => task.id === id);
    const updatedTask = { ...task, completed: !task.completed, status: task.completed ? 'pending' : 'done' };

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      const updatedData = await response.json();
      setTasks(
        tasks.map((task) => (task.id === id ? updatedData : task))
      );
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  // Edit a task
  const editTask = (task) => {
    setEditingTask(task);
    setNewTask(task.title);
  };

  // Update a task after editing
  const updateTask = async () => {
    if (!newTask.trim()) return;

    const updatedTask = { ...editingTask, title: newTask };
    try {
      const response = await fetch(`${API_URL}/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      const updatedData = await response.json();
      setTasks(
        tasks.map((task) => (task.id === updatedData.id ? updatedData : task))
      );
      setNewTask('');
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder={editingTask ? 'Edit task' : 'Enter task'}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        {editingTask ? (
          <button onClick={updateTask}>Update</button>
        ) : (
          <button onClick={addTask}>Add</button>
        )}
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.title} ({task.status})
            </span>
            <button onClick={() => toggleTask(task.id)}>
              {task.status === 'done' ? 'Undo' : 'Done'}
            </button>
            <button onClick={() => editTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;