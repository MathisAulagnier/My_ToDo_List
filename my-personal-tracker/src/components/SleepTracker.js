import React, { useState, useEffect, useCallback } from 'react';
import './SleepTracker.css'; // Import du CSS pour les styles néon

const sleepScores = {
  'Dormir comme un bébé': 9,
  'Sommeil profond': 7,
  'Sommeil fragmenté': 5,
  'Sommeil anxieux': 4,
  'Insomnie': 3,
  'Sommeil difficile': 2,
  'Nuit blanche': 0,
  'Sommeil agité': 4,
};

const SleepTracker = () => {
  const [sleepQuality, setSleepQuality] = useState([
    { id: 1, text: 'Dormir comme un bébé', selected: false },
    { id: 2, text: 'Sommeil profond', selected: false },
    { id: 3, text: 'Sommeil fragmenté', selected: false },
    { id: 4, text: 'Sommeil anxieux', selected: false },
    { id: 5, text: 'Insomnie', selected: false },
    { id: 6, text: 'Sommeil difficile', selected: false },
    { id: 7, text: 'Nuit blanche', selected: false },
    { id: 8, text: 'Sommeil agité', selected: false },
  ]);

  const [selectedSleep, setSelectedSleep] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false); // Pour suivre si les données ont été chargées

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
    const score = sleepScores[selectedSleep]; // Récupère le score associé à la qualité de sommeil sélectionnée

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

      alert('SleepTracker mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du SleepTracker:', error);
      alert('Erreur lors de la mise à jour du SleepTracker');
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
          const defaultSleepId = sleepQuality.find(sleep => sleep.text === 'Sommeil fragmenté').id;
          selectSleepQuality(defaultSleepId);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de sommeil:', error);
        const defaultSleepId = sleepQuality.find(sleep => sleep.text === 'Sommeil fragmenté').id;
        selectSleepQuality(defaultSleepId);
      } finally {
        setDataLoaded(true); // Marque les données comme chargées
      }
    };

    if (!dataLoaded) { // Ne pas recharger les données si elles ont déjà été chargées
      fetchSleepData();
    }
  }, [sleepQuality, selectSleepQuality, dataLoaded]);

  return (
    <div className="sleep-tracker">
      <h2>Qualité du sommeil</h2>
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