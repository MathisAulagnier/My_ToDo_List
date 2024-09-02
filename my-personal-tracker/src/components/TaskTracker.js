import React, { useState, useEffect, useCallback } from 'react';
import './TaskTracker.css'; // Import du CSS pour les styles néon

const TaskTracker = () => {
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

  const formatDate = (date) => {
    const d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    const year = d.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    return `${year}-${month}-${day}`;
  };

  const toggleTask = useCallback((id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }, [tasks]);

  const validateTasks = async () => {
    const completedTasks = tasks.filter(task => task.completed).map(task => task.text);
    const currentDate = formatDate(new Date());

    try {
      const response = await fetch('http://localhost:3001/api/daily-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Date: currentDate,
          Tasks: completedTasks,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du DailyTaskTracker');
      }

      alert('DailyTaskTracker mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du DailyTaskTracker:', error);
      alert('Erreur lors de la mise à jour du DailyTaskTracker');
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const currentDate = formatDate(new Date());

      try {
        const response = await fetch('http://localhost:3001/api/daily-tasks');
        const data = await response.json();

        // Vérifiez si les données sont définies et si la date actuelle est présente
        if (Array.isArray(data)) {
          const todaysTasks = data.find(entry => entry.Date === currentDate);
          if (todaysTasks) {
            const updatedTasks = tasks.map(task => ({
              ...task,
              completed: todaysTasks.Tasks.includes(task.text),
            }));
            setTasks(updatedTasks);
          }
        } else {
          console.warn('Les données reçues ne sont pas au format attendu.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    };

    fetchTasks();
  }, []); // Notez que je n'ai pas inclus `tasks` dans la liste de dépendances

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
      <button onClick={validateTasks}>Valider</button>
    </div>
  );
};

export default TaskTracker;