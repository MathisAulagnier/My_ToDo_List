# Productivity ToDo List Application

## Overview

The **Productivity ToDo List Application** is designed to help users enhance their productivity by tracking their personal goals and daily habits. The app allows users to:

- Track their sleep and mood.
- Maintain a list of daily tasks aimed at improving productivity.
- Add punctual tasks with assigned priority levels.
- Earn points for each completed task to monitor productivity over time through a dynamic score.

## Features

1. **Sleep Tracker**:  
   Monitor sleep quality by selecting from predefined sleep categories. These choices are saved and tracked over time to ensure consistency in your sleeping habits.

2. **Mood Tracker**:  
   Track your daily mood from various options (e.g., Joyful, Calm, Stressed, etc.), allowing you to reflect on your emotional state over time.

3. **Daily To-Do List**:  
   The app offers a customizable list of daily tasks designed to enhance your productivity. Each task contributes to your overall score. Users can modify this list by adding or removing tasks directly within the `TaskTracker` component.

4. **Extra Task Feature**:  
   Add punctual tasks that need immediate attention. You can assign priorities to these tasks to focus on the most critical ones.

5. **Productivity Score**:  
   Every completed task (daily, sleep, mood, extra tasks) contributes to your daily productivity score, allowing you to track and improve your efficiency over time.

## Task Customization

Users have the ability to customize their daily tasks by adding, removing, or modifying tasks within the `TaskTracker` component. The tasks are defined and updated using the following code:

```javascript
import React, { useState, useEffect, useCallback } from 'react';
import './TaskTracker.css'; // 

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
```

Users can modify the task list directly in the TaskTracker component by adding new tasks or changing the default tasks.

## How It Works

1. **Task Management:**
   - Select or check off tasks from the Daily To-Do list.
   - Add new punctual tasks with a priority level.
   - Your completed tasks automatically update your productivity score.

2. **Mood and Sleep Tracking:**
   - Each day, choose your mood and sleep quality. These selections are saved for tracking and reflection.
   - You can validate your choices using a ‘Validate’ button.

3. **Productivity Score:**
   - Points are awarded based on task completion, mood, and sleep quality.
   - A dynamic chart tracks your productivity score over the past 30 days.

## Tech Stack

- **Frontend:** React.js (PWA)
- **Backend:** Node.js with JSON file storage
- **Styling:** CSS, with a minimalist design and neon accents
- **Data Handling:** JSON files for tracking user data across sleep, mood, tasks, and extra tasks

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/MathisAulagnier/My_ToDo_List.git
```

2. Navigate to the project directory:

```bash
cd <project-directory>
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the application:

```bash
npm start
```

5. Access the application at http://localhost:3000/ on your browser.

