import React, { useState } from 'react';
import './AddPunctualTask.css';

const AddPunctualTask = ({ onTaskAdded }) => {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('moyen'); // Priorité par défaut

  const handleAddTask = () => {
    if (newTask.trim() === '') return;

    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
      importance: priority, // Ajouter l'importance sélectionnée
    };

    fetch('http://localhost:3001/tasks', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((currentTasks) => {
        const updatedTasks = [...currentTasks, newTaskObj];

        fetch('http://localhost:3001/tasks', {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTasks),
        })
        .then(() => {
          setNewTask('');
          setPriority('moyen'); // Réinitialiser la priorité au niveau par défaut
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
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="faible">Faible</option>
        <option value="moyen">Moyen</option>
        <option value="élevé">Forte</option>
      </select>
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

export default AddPunctualTask;