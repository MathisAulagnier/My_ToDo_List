import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'; // Gardez cette ligne si vous avez supprimé une autre importation de Line
import './ProductivityChart.css';


// Enregistrer les échelles
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const ProductivityChart = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    
    const fetchScores = async () => {
      const [moodResponse, sleepResponse, dailyTasksResponse, extraTasksResponse] = await Promise.all([
        fetch('http://localhost:3001/api/moods'),
        fetch('http://localhost:3001/api/sleep'),
        fetch('http://localhost:3001/api/daily-tasks'),
        fetch('http://localhost:3001/api/extra-tasks'),
      ]);

      const [moodData, sleepData, dailyTasksData, extraTasksData] = await Promise.all([
        moodResponse.json(),
        sleepResponse.json(),
        dailyTasksResponse.json(),
        extraTasksResponse.json(),
      ]);

      const today = new Date();
      const past30Days = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toISOString().split('T')[0];
      });

      const scores = past30Days.map(date => {
        const mood = moodData.find(entry => entry.Date === date)?.Score || 0;
        const sleep = sleepData.find(entry => entry.Date === date)?.Score || 0;
        const dailyTasks = dailyTasksData.find(entry => entry.Date === date)?.Score || 0;
        const extraTasks = extraTasksData.find(entry => entry.Date === date)?.Score || 0;
        return {
          date,
          mood,
          sleep,
          dailyTasks,
          extraTasks,
          total: mood + sleep + dailyTasks + extraTasks,
        };
      });

      setScores(scores.reverse()); // Pour afficher les dates dans l'ordre chronologique
    };

    fetchScores();
  }, []);

  const chartData = {
    labels: scores.map(score => score.date),
    datasets: [
      {
        label: 'Mood',
        data: scores.map(score => score.mood),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Sleep',
        data: scores.map(score => score.sleep),
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
      },
      {
        label: 'Daily Tasks',
        data: scores.map(score => score.dailyTasks),
        borderColor: 'rgba(255, 159, 64, 1)',
        fill: false,
      },
      {
        label: 'Extra Tasks',
        data: scores.map(score => score.extraTasks),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
      {
        label: 'Total Score',
        data: scores.map(score => score.total),
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
      }
    ],
  };

  return (
    <div className="productivity-chart">
      <h2>Productivity Chart (Last 30 Days)</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ProductivityChart;