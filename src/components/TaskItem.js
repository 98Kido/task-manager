// src/components/TaskItem.js
import React from 'react';

const TaskItem = ({ task, onComplete, onDelete }) => {
  return (
    <div className="task-item">
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        className="task-title"
      >
        {task.title}
      </span>
      <div className="task-actions">
        <button
          className="complete-button"
          onClick={() => onComplete(task.id)}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;