import React, { useState, useEffect, useCallback } from 'react';
import './MoodTracker.css'; // Import du CSS pour les styles néon

const MoodTracker = () => {
  const moodOptions = [
    { id: 1, text: 'Joyeux', score: 2 },
    { id: 2, text: 'Calme', score: 1 },
    { id: 3, text: 'Stressé', score: 0.5 },
    { id: 4, text: 'Normal', score: 0 },
    { id: 5, text: 'Fatigué', score: -0.5 },
    { id: 6, text: 'Enervé', score: -1 },
    { id: 7, text: 'Triste', score: -2 },
  ];

  const [moods, setMoods] = useState(moodOptions);
  const [selectedMood, setSelectedMood] = useState(moodOptions.find(m => m.text === "Normal"));
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

  const selectMood = useCallback((id) => {
    const selected = moods.find(mood => mood.id === id);
    const updatedMoods = moods.map((mood) =>
      mood.id === id
        ? { ...mood, selected: true }
        : { ...mood, selected: false }
    );
    setMoods(updatedMoods);
    setSelectedMood(selected);
  }, [moods]);

  const validateMood = async () => {
    if (!selectedMood) return; // Si aucune humeur n'est sélectionnée, ne rien faire.

    const currentDate = formatDate(new Date());

    try {
      const response = await fetch('http://localhost:3001/api/moods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Date: currentDate,
          Mood: selectedMood.text,
          Score: selectedMood.score
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du MoodTracker');
      }

      alert('MoodTracker mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du MoodTracker:', error);
      alert('Erreur lors de la mise à jour du MoodTracker');
    }
  };

  useEffect(() => {
    const fetchMoodData = async () => {
      const currentDate = formatDate(new Date());

      try {
        const response = await fetch('http://localhost:3001/api/moods');
        const data = await response.json();

        const existingMood = data.find(mood => mood.Date === currentDate);

        if (existingMood) {
          const moodId = moods.find(mood => mood.text === existingMood.Mood).id;
          selectMood(moodId);
        } else {
          const defaultMoodId = moods.find(mood => mood.text === 'Normal').id;
          selectMood(defaultMoodId);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'humeur:', error);
        const defaultMoodId = moods.find(mood => mood.text === 'Normal').id;
        selectMood(defaultMoodId);
      } finally {
        setDataLoaded(true); // Marque les données comme chargées
      }
    };

    if (!dataLoaded) { // Ne pas recharger les données si elles ont déjà été chargées
      fetchMoodData();
    }
  }, [moods, selectMood, dataLoaded]);

  return (
    <div className="mood-tracker">
      <h2>Today's Mood</h2>
      {moods.map((mood) => (
        <div key={mood.id} className="mood-item">
          <input
            type="checkbox"
            checked={mood.selected}
            onChange={() => selectMood(mood.id)}
          />
          {mood.text}
        </div>
      ))}
      <button onClick={validateMood}>Valider</button>
    </div>
  );
};

export default MoodTracker;