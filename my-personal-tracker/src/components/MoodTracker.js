import React, { useState } from 'react';
import './MoodTracker.css'; // Import du CSS pour les styles néon

const MoodTracker = () => {
  // États pour les humeurs
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

  // Fonction pour sélectionner/désélectionner une humeur
  const toggleMood = (id) => {
    const updatedMoods = moods.map((mood) =>
      mood.id === id ? { ...mood, selected: !mood.selected } : mood
    );
    setMoods(updatedMoods);
  };

  return (
    <div className="mood-tracker">
      <h2>How do you feel today?</h2>
      {moods.map((mood) => (
        <div key={mood.id} className="mood-item">
          <input
            type="checkbox"
            checked={mood.selected}
            onChange={() => toggleMood(mood.id)}
          />
          {mood.text}
        </div>
      ))}
    </div>
  );
};

export default MoodTracker;