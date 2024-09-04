import React, { useState } from 'react';
import './App.css';
import MoodTracker from './components/MoodTracker';
import SleepTracker from './components/SleepTracker';
import TaskTracker from './components/TaskTracker';
import PunctualTask from './components/PunctualTask';
import AddPunctualTask from './components/AddPunctualTask';
import ProductivityScore from './components/ProductivityScore';
import ProductivityChart from './components/ProductivityChart';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showChart, setShowChart] = useState(false);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  return (
    <div className="App">
      <div className="score-section">
        <div className="score-item">
          <ProductivityScore />
        </div>
        <div className="score-item">
          <PunctualTask tasks={tasks} setTasks={setTasks} />
        </div>
        <div className="score-item">
          <AddPunctualTask onTaskAdded={handleTaskAdded} />
        </div>
      </div>
      
      {/* Section Daily Task */}
      <div className="daily-task-section">
        <TaskTracker />
      </div>

      {/* Section Mood Tracker */}
      <div className="mood-section">
        <MoodTracker />
      </div>

      {/* Section Sleep Tracker */}
      <div className="sleep-section">
        <SleepTracker />
      </div>

      {/* Section Graph */}
      <div className="graph-section">
        <ProductivityChart />
      </div>
    </div>
  );
}

export default App;