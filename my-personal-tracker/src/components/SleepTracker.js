import React, { useState } from 'react';
import './SleepTracker.css'; // Import du CSS pour les styles néon

const SleepTracker = () => {
  // États pour la qualité du sommeil
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

  // Fonction pour sélectionner/désélectionner une qualité de sommeil
  const toggleSleepQuality = (id) => {
    const updatedSleepQuality = sleepQuality.map((sleep) =>
      sleep.id === id ? { ...sleep, selected: !sleep.selected } : sleep
    );
    setSleepQuality(updatedSleepQuality);
  };

  return (
    <div className="sleep-tracker">
      <h2>Sleep Quality</h2>
      {sleepQuality.map((sleep) => (
        <div key={sleep.id} className="sleep-item">
          <input
            type="checkbox"
            checked={sleep.selected}
            onChange={() => toggleSleepQuality(sleep.id)}
          />
          {sleep.text}
        </div>
      ))}
    </div>
  );
};

export default SleepTracker;