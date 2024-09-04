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
      {/* Section Productivity Score */}
      <div className="score-section">
        <ProductivityScore />
      </div>

      {/* Section Calendar */}
      <div className="calendar-section">
        {/* Placeholder for the calendar */}
        <div className="calendar-placeholder">Calendar Placeholder</div>
      </div>

      {/* Section Punctual Task */}
      <div className="punctual-task-section">
        <PunctualTask tasks={tasks} setTasks={setTasks} />
      </div>

      {/* Section Add Punctual Task */}
      <div className="add-punctual-task-section">
        <AddPunctualTask onTaskAdded={handleTaskAdded} />
      </div>

      {/* Section Mood Tracker */}
      <div className="mood-section">
        <MoodTracker />
      </div>

      {/* Section Sleep Tracker */}
      <div className="sleep-section">
        <SleepTracker />
      </div>

      {/* Section Daily Task */}
      <div className="daily-task-section">
        <TaskTracker />
      </div>

      {/* Section Graph */}
      <div className="graph-section">
        <button className="toggle-chart-btn" onClick={toggleChart}>
          {showChart ? 'Hide Graph' : 'Show Graph'}
        </button>
        {showChart && <ProductivityChart />}
      </div>
    </div>
  );
}

export default App;