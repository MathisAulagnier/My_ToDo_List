import React, { useState, useEffect, useCallback } from 'react';
import './TaskTracker.css'; // Import du CSS pour les styles néon

const taskPoints = {
  '100 Pompes': 5,
  'Séance de sport': 5,
  'Prendre des nouvelles': 5,
  'Etudier': 5,
  'Projet Personnel': 5,
  'Manger équilibré': 5,
  'Lire 30min': 5,
  'Echecs': 5,
  'Temps d\'écran < 3 heures': 5,
  'Apprendre quelque chose de nouveau': 5,
};

const TaskTracker = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: '100 Pompes', completed: false },
    { id: 2, text: 'Séance de sport', completed: false },
    { id: 3, text: 'Prendre des nouvelles', completed: false },
    { id: 4, text: 'Etudier', completed: false },
    { id: 5, text: 'Projet Personnel', completed: false },
    { id: 6, text: 'Manger équilibré', completed: false },
    { id: 7, text: 'Lire 30min', completed: false },
    { id: 8, text: 'Echecs', completed: false },
    { id: 9, text: 'Temps d\'écran < 3 heures', completed: false },
    { id: 10, text: 'Apprendre quelque chose de nouveau', completed: false },
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
    const score = completedTasks.reduce((acc, task) => acc + (taskPoints[task] || 0), 0);

    try {
      const response = await fetch('http://localhost:3001/api/daily-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Date: currentDate,
          Tasks: completedTasks,
          Score: score,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du DailyTaskTracker');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du DailyTaskTracker:', error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const currentDate = formatDate(new Date());

      try {
        const response = await fetch('http://localhost:3001/api/daily-tasks');
        const data = await response.json();

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
  }, []);

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
