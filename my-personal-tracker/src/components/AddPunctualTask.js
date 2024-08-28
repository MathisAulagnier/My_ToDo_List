import React, { useState } from 'react';
import './AddPunctualTask.css';

const AddPunctualTask = ({ onTaskAdded }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;

    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    // Récupérer les tâches actuelles depuis le serveur
    fetch('http://localhost:3001/tasks', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((currentTasks) => {
        const updatedTasks = [...currentTasks, newTaskObj];

        // Réécriture du fichier JSON via le serveur
        fetch('http://localhost:3001/tasks', {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTasks),
        })
        .then(() => {
          setNewTask('');
          onTaskAdded(newTaskObj);
        })
        .catch((error) => console.error('Erreur lors de la mise à jour des tâches :', error));
      })
      .catch((error) => console.error('Erreur lors de l\'ajout de la tâche :', error));
  };

  return (
    <div className="add-punctual-task">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add Punctual Task"
      />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

export default AddPunctualTask;