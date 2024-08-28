import React, { useState } from 'react';
import './TaskTracker.css'; // Import du CSS pour les styles néon

const TaskTracker = () => {
  // Déclaration d'un état pour les tâches
  const [tasks, setTasks] = useState([
    { id: 1, text: '100 Pompes', completed: false },
    { id: 2, text: 'Petit déjeuner', completed: false },
    { id: 3, text: 'Méditation', completed: false },
    { id: 4, text: 'Lecture', completed: false },
    { id: 5, text: 'Étude', completed: false },
    { id: 6, text: 'Exercice physique', completed: false },
    { id: 7, text: 'Relaxation', completed: false },
    { id: 8, text: 'Coucher tôt', completed: false },
  ]);

  // Fonction pour cocher/décocher une tâche
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="task-tracker">
      <h2>Daily To Do</h2>
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          {task.text}
        </div>
      ))}
    </div>
  );
};

export default TaskTracker;