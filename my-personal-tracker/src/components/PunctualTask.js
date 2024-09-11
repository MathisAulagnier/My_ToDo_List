import React, { useState, useEffect } from 'react';
import './PunctualTask.css';

const PunctualTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Charger les tâches ponctuelles à partir du serveur
    fetch('http://localhost:3001/tasks')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data || []); // Charger les tâches ou un tableau vide si aucune tâche n'existe
      })
      .catch((error) => console.error('Erreur de chargement des tâches ponctuelles :', error));
  }, []);

  const handleTaskCompletion = (task) => {
    // Supprimer la tâche accomplie de la liste des tâches ponctuelles
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);

    // Mettre à jour punctualTasks.json avec les tâches restantes
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
    .then(() => console.log('Mise à jour des tâches ponctuelles réussie'))
    .catch((error) => console.error('Erreur lors de la mise à jour des tâches ponctuelles :', error));

    // Enregistrer la tâche accomplie dans extraTaskTracker.json avec la date actuelle
    const currentDate = new Date().toISOString().split('T')[0];
    fetch('http://localhost:3001/api/extra-tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Date: currentDate,
        ExtraTasks: [{ ...task, completed: true, importance: task.importance || 'moyen' }],
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to log completed task');
      }
      return response.text();
    })
    .then(() => console.log('Tâche accomplie enregistrée avec succès'))
    .catch((error) => console.error('Erreur lors de l\'enregistrement de la tâche accomplie :', error));
  };

  const getTaskColor = (importance) => {
    switch (importance) {
      case 'élevé':
        return 'red';
      case 'moyen':
        return 'black';
      case 'faible':
        return 'green';
      default:
        return 'blue'; // Default color if no importance level is set
    }
  };

  return (
    <div className="punctual-task neon-green">
      <h2>Extra Tasks</h2>
      {tasks.length > 0 ? tasks.map((task) => (
        <div
          key={task.id}
          className="task-p-item"
          style={{ color: getTaskColor(task.importance) }}
        >
          <input
            type="checkbox"
            onChange={() => handleTaskCompletion(task)}
          />
          {task.text}
        </div>
      )) : <p>Aucune tâche ponctuelle pour aujourd'hui</p>}
    </div>
  );
};

export default PunctualTask;
