import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Importer Chart.js auto pour react-chartjs-2

const ProductivityChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const dates = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse(); // Liste des 30 derniers jours

      const moodResponse = await fetch('http://localhost:3001/api/moods');
      const moodData = await moodResponse.json();

      const sleepResponse = await fetch('http://localhost:3001/api/sleep');
      const sleepData = await sleepResponse.json();

      const dailyTaskResponse = await fetch('http://localhost:3001/api/daily-tasks');
      const dailyTaskData = await dailyTaskResponse.json();

      const extraTaskResponse = await fetch('http://localhost:3001/api/extra-tasks');
      const extraTaskData = await extraTaskResponse.json();

      const scores = dates.map(date => {
        const moodScore = moodData.find(entry => entry.Date === date)?.Score || 0;
        const sleepScore = sleepData.find(entry => entry.Date === date)?.Score || 0;
        const dailyTaskScore = dailyTaskData.find(entry => entry.Date === date)?.Score || 0;
        const extraTaskScore = extraTaskData.find(entry => entry.Date === date)?.Score || 0;
        return moodScore + sleepScore + dailyTaskScore + extraTaskScore;
      });

      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Score de productivité sur 30 jours',
            data: scores,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.4)',
            tension: 0.1,
          }
        ]
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Productivity Over Last 30 Days</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ProductivityChart;