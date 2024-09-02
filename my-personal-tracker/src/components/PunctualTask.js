import React, { useState, useEffect } from 'react';
import './PunctualTask.css';

const PunctualTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/extra-tasks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const currentDate = new Date().toISOString().split('T')[0];
        const todayTasks = data.find(entry => entry.Date === currentDate);
        setTasks(todayTasks ? todayTasks.ExtraTasks : []);
      })
      .catch((error) => console.error('Erreur de chargement des tâches :', error));
  }, []);

  const handleTaskCompletion = (task) => {
    const updatedTasks = tasks.filter((t) => t !== task);
    setTasks(updatedTasks);

    updateJsonFile(updatedTasks);
  };

  const updateJsonFile = (updatedTasks) => {
    const currentDate = new Date().toISOString().split('T')[0];
    fetch('http://localhost:3001/api/extra-tasks', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Date: currentDate,
        ExtraTasks: updatedTasks
      }),
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
      <h2>Extra Tasks</h2>
      {tasks.length > 0 ? tasks.map((task, index) => (
        <div key={index} className="task-p-item">
          <input
            type="checkbox"
            onChange={() => handleTaskCompletion(task)}
          />
          {task}
        </div>
      )) : <p>Aucune tâche supplémentaire pour aujourd'hui</p>}
    </div>
  );
};

export default PunctualTask;