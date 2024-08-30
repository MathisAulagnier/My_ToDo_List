import React, { useState, useEffect } from 'react';
import './MoodTracker.css';

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

  const selectMood = (id) => {
    const selectedMoodText = moods.find(mood => mood.id === id).text;
    const updatedMoods = moods.map((mood) =>
      mood.id === id ? { ...mood, selected: true } : { ...mood, selected: false }
    );
    setMoods(updatedMoods);
    setSelectedMood(selectedMoodText);
  };

  const handleValidation = async () => {
    if (selectedMood) {
      try {
        const currentDate = new Date().toISOString().split('T')[0];

        const response = await fetch('/update-mood', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: currentDate,
            mood: selectedMood,
          }),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour de moodtracker.json');
        }

        console.log('MoodTracker: Humeur mise à jour avec succès dans moodtracker.json');
      } catch (error) {
        console.error('Erreur:', error);
      }
    } else {
      console.log('Aucune humeur sélectionnée');
    }
  };

  useEffect(() => {
    const defaultMoodId = moods.find(mood => mood.text === 'Relaxed').id;
    const hasSelectedMood = moods.some(mood => mood.selected);
    if (!hasSelectedMood) {
      selectMood(defaultMoodId);
    }
  }, [moods]);

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
      <button onClick={handleValidation}>Valider</button>
    </div>
  );
};

export default MoodTracker;