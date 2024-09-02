import React, { useState, useEffect } from 'react';
import './ProductivityScore.css';

const ProductivityScore = () => {
  const [moodScore, setMoodScore] = useState(0);
  const [sleepScore, setSleepScore] = useState(0);
  const [dailyTaskScore, setDailyTaskScore] = useState(0);
  const [extraTaskScore, setExtraTaskScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const fetchMoodScore = async () => {
      const response = await fetch('http://localhost:3001/api/moods');
      const data = await response.json();
      const today = new Date().toISOString().split('T')[0];
      const todayMood = data.find(entry => entry.Date === today);
      setMoodScore(todayMood ? todayMood.Score : 0);
    };

    const fetchSleepScore = async () => {
      const response = await fetch('http://localhost:3001/api/sleep');
      const data = await response.json();
      const today = new Date().toISOString().split('T')[0];
      const todaySleep = data.find(entry => entry.Date === today);
      setSleepScore(todaySleep ? todaySleep.Score : 0);
    };

    const fetchDailyTaskScore = async () => {
      const response = await fetch('http://localhost:3001/api/daily-tasks');
      const data = await response.json();
      const today = new Date().toISOString().split('T')[0];
      const todayTasks = data.find(entry => entry.Date === today);
      setDailyTaskScore(todayTasks ? todayTasks.Score : 0);
    };

    const fetchExtraTaskScore = async () => {
      const response = await fetch('http://localhost:3001/api/extra-tasks');
      const data = await response.json();
      const today = new Date().toISOString().split('T')[0];
      const todayExtraTasks = data.find(entry => entry.Date === today);
      setExtraTaskScore(todayExtraTasks ? todayExtraTasks.Score : 0);
    };

    const calculateTotalScore = () => {
      setTotalScore(moodScore + sleepScore + dailyTaskScore + extraTaskScore);
    };

    fetchMoodScore();
    fetchSleepScore();
    fetchDailyTaskScore();
    fetchExtraTaskScore();
    calculateTotalScore();
  }, [moodScore, sleepScore, dailyTaskScore, extraTaskScore]);

  return (
    <div className="productivity-score">
      <h2>Productivity Score</h2>
      <div className="score-ticket">
        <p>Mood : {moodScore}</p>
        <p>Sleep : {sleepScore}</p>
        <p>Taches quotidiennes : {dailyTaskScore}</p>
        <p>Extra taches : {extraTaskScore}</p>
        <hr />
        <p>Score de productivité : {totalScore}</p>
      </div>
    </div>
  );
};

export default ProductivityScore;