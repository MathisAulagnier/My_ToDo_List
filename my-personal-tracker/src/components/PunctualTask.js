import React, { useState, useEffect } from 'react';
import './PunctualTask.css';

const PunctualTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => console.error('Erreur de chargement des tâches :', error));
  }, []);

  const handleTaskCompletion = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);

    updateJsonFile(updatedTasks);
  };

  const updateJsonFile = (updatedTasks) => {
    fetch('http://localhost:3001/tasks', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTasks),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update tasks');
      }
      return response.text();
    })
    .then(data => console.log('Mise à jour réussie :', data))
    .catch((error) => console.error('Erreur lors de la mise à jour du fichier JSON :', error));
  };

  return (
    <div className="punctual-task neon-green">
      <h2>Punctual Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id} className="task-p-item">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleTaskCompletion(task.id)}
          />
          {task.text}
        </div>
      ))}
    </div>
  );
};

export default PunctualTask;