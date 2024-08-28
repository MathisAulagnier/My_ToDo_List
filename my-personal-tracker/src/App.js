import React, { useState } from 'react';
import './App.css';
import MoodTracker from './components/MoodTracker';
import SleepTracker from './components/SleepTracker';
import TaskTracker from './components/TaskTracker';
import PunctualTask from './components/PunctualTask';
import AddPunctualTask from './components/AddPunctualTask';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="App">
      <PunctualTask tasks={tasks} setTasks={setTasks} />
      <AddPunctualTask onTaskAdded={handleTaskAdded} />
      <MoodTracker />
      <SleepTracker />
      <TaskTracker />
  </div>
  );
}

export default App;