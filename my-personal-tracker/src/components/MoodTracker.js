import React, { useState, useEffect, useCallback } from 'react';
import './MoodTracker.css'; // Import du CSS pour les styles néon

const MoodTracker = () => {
  const [moods, setMoods] = useState([
    { id: 1, text: 'Happy', selected: false },
    { id: 2, text: 'Sad', selected: false },
    { id: 3, text: 'Excited', selected: false },
    { id: 4, text: 'Anxious', selected: false },
    { id: 5, text: 'Relaxed', selected: false },
    { id: 6, text: 'Tired', selected: false },
    { id: 7, text: 'Angry', selected: false },
    { id: 8, text: 'Content', selected: false },
  ]);

  const [selectedMood, setSelectedMood] = useState(null);

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
    const selected = moods.find(mood => mood.id === id).text;
    const updatedMoods = moods.map((mood) =>
      mood.id === id ? { ...mood, selected: true } : { ...mood, selected: false }
    );
    setMoods(updatedMoods);
    setSelectedMood(selected);
  }, [moods]);

  const validateMood = async () => {
    if (!selectedMood) return; // Si aucune humeur n'est sélectionnée, ne rien faire.

    const currentDate = formatDate(new Date()); // Utilise formatDate pour obtenir la bonne date

    try {
      const response = await fetch('http://localhost:3001/api/moods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Date: currentDate,
          Moods: selectedMood,
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
    const defaultMoodId = moods.find(mood => mood.text === 'Relaxed').id;
    const hasSelectedMood = moods.some(mood => mood.selected);
    if (!hasSelectedMood) {
      selectMood(defaultMoodId);
    }
  }, [moods, selectMood]);

  return (
    <div className="mood-tracker">
      <h2>How do you feel today?</h2>
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