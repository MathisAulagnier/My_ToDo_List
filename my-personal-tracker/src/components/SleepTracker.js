import React, { useState, useEffect, useCallback } from 'react';
import './SleepTracker.css'; // Import du CSS pour les styles néon

const SleepTracker = () => {
  const [sleepQuality, setSleepQuality] = useState([
    { id: 1, text: 'Excellent', selected: false },
    { id: 2, text: 'Bien', selected: false },
    { id: 3, text: 'Normal', selected: false },
    { id: 4, text: 'Trop chaud/froid', selected: false },
    { id: 5, text: 'Pas assez', selected: false },
    { id: 6, text: 'Mal', selected: false },
    { id: 7, text: 'Nuit blanche', selected: false },
  ]);

  const [selectedSleep, setSelectedSleep] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const sleepScores = {
    'Excellent': 9,
    'Bien': 7,
    'Normal': 5,
    'Trop chaud/froid': 4,
    'Pas assez': 3,
    'Mal': 2,
    'Nuit blanche': 0,
  };

  const formatDate = (date) => {
    const d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    const year = d.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    return `${year}-${month}-${day}`; // Format YYYY-MM-DD
  };

  const selectSleepQuality = useCallback((id) => {
    const selected = sleepQuality.find(sleep => sleep.id === id).text;
    const updatedSleepQuality = sleepQuality.map((sleep) =>
      sleep.id === id
        ? { ...sleep, selected: true }
        : { ...sleep, selected: false }
    );
    setSleepQuality(updatedSleepQuality);
    setSelectedSleep(selected);
  }, [sleepQuality]);

  const validateSleepQuality = async () => {
    if (!selectedSleep) return; // Si aucune qualité de sommeil n'est sélectionnée, ne rien faire.

    const currentDate = formatDate(new Date());
    const score = sleepScores[selectedSleep];

    try {
      const response = await fetch('http://localhost:3001/api/sleep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Date: currentDate,
          Sleep: selectedSleep,
          Score: score,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du SleepTracker');
      }

    } catch (error) {
      console.error('Erreur lors de la mise à jour du SleepTracker:', error);
    }
  };

  useEffect(() => {
    const fetchSleepData = async () => {
      const currentDate = formatDate(new Date());

      try {
        const response = await fetch('http://localhost:3001/api/sleep');
        const data = await response.json();

        const existingSleep = data.find(sleep => sleep.Date === currentDate);

        if (existingSleep) {
          const sleepId = sleepQuality.find(sleep => sleep.text === existingSleep.Sleep).id;
          selectSleepQuality(sleepId);
        } else {
          const defaultSleepId = sleepQuality.find(sleep => sleep.text === 'Normal').id;
          selectSleepQuality(defaultSleepId);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de sommeil:', error);
        const defaultSleepId = sleepQuality.find(sleep => sleep.text === 'Normal').id;
        selectSleepQuality(defaultSleepId);
      } finally {
        setDataLoaded(true);
      }
    };

    if (!dataLoaded) {
      fetchSleepData();
    }
  }, [sleepQuality, selectSleepQuality, dataLoaded]);

  return (
    <div className="sleep-tracker">
      <h2>Sleep Quality</h2>
      {sleepQuality.map((sleep) => (
        <div key={sleep.id} className="sleep-item">
          <input
            type="checkbox"
            checked={sleep.selected}
            onChange={() => selectSleepQuality(sleep.id)}
          />
          {sleep.text}
        </div>
      ))}
      <button onClick={validateSleepQuality}>Valider</button>
    </div>
  );
};

export default SleepTracker;
