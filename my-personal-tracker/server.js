const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Endpoint pour récupérer les tâches ponctuelles
app.get('/tasks', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'public', 'punctualTasks.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).send('Erreur de lecture du fichier.');
  }
});

// Endpoint pour mettre à jour le fichier JSON des tâches ponctuelles
app.post('/tasks', async (req, res) => {
  const updatedTasks = req.body;

  try {
    await fs.writeFile(
      path.join(__dirname, 'public', 'punctualTasks.json'),
      JSON.stringify(updatedTasks, null, 2)
    );
    res.send('Fichier mis à jour avec succès.');
  } catch (err) {
    res.status(500).send('Erreur lors de l\'écriture du fichier.');
  }
});

// Endpoint pour récupérer les données du tracker d'humeurs
app.get('/mood-tracker', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'public', 'moodtracker.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).send('Erreur de lecture du fichier moodtracker.json.');
  }
});

app.post('/update-mood', async (req, res) => {
  const { date, mood } = req.body;

  try {
    const filePath = path.join(__dirname, 'public', 'moodtracker.json');
    console.log(`Tentative de mise à jour pour la date: ${date} avec l'humeur: ${mood}`);
    
    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    // Trouver l'entrée avec la date correspondante
    const existingEntry = jsonData.find(entry => entry.Date === date);

    if (existingEntry) {
      // Mise à jour de l'humeur pour cette date
      existingEntry.Moods = mood;
      console.log(`Humeur mise à jour pour la date: ${date}`);
    } else {
      // Créer une nouvelle entrée si la date n'existe pas
      jsonData.push({
        Date: date,
        Moods: mood
      });
      console.log(`Nouvelle entrée ajoutée pour la date: ${date}`);
    }

    // Écriture dans le fichier JSON
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
    res.send('Humeur mise à jour avec succès dans moodtracker.json.');
  } catch (err) {
    console.error('Erreur lors de la mise à jour du fichier moodtracker.json:', err);
    res.status(500).send('Erreur lors de la mise à jour du fichier moodtracker.json.');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});