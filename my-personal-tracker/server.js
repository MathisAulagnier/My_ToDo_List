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

// Endpoint pour récupérer les humeurs
app.get('/api/moods', async (req, res) => {
  try {
    const moodDataPath = path.join(__dirname, 'public', 'moodtracker.json');
    const data = await fs.readFile(moodDataPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

// Endpoint pour mettre à jour ou ajouter une humeur
app.post('/api/moods', async (req, res) => {
  const { Date, Moods } = req.body;

  if (!Date || !Moods) {
    return res.status(400).json({ error: 'Date et Moods sont requis' });
  }

  try {
    const moodDataPath = path.join(__dirname, 'public', 'moodtracker.json');
    const data = await fs.readFile(moodDataPath, 'utf-8');
    let moodData = JSON.parse(data);

    // Vérifie si une entrée existe pour la date donnée
    const existingEntryIndex = moodData.findIndex((entry) => entry.Date === Date);

    if (existingEntryIndex >= 0) {
      // Si l'entrée existe, modifie-la
      moodData[existingEntryIndex].Moods = Moods;
    } else {
      // Sinon, ajoute une nouvelle entrée
      moodData.push({ Date, Moods });
    }

    // Écris les données mises à jour dans le fichier
    await fs.writeFile(moodDataPath, JSON.stringify(moodData, null, 2));
    res.json({ message: 'Humeur mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour des données' });
  }
});

// Endpoint pour récupérer les humeurs
app.get('/api/sleep', async (req, res) => {
  try {
    const sleepDataPath = path.join(__dirname, 'public', 'sleeptracker.json');
    const data = await fs.readFile(sleepDataPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

app.post('/api/sleep', async (req, res) => {
  const { Date, Sleep } = req.body;

  try {
    const filePath = path.join(__dirname, 'public', 'sleeptracker.json');
    const data = await fs.readFile(filePath, 'utf8');
    const sleepData = JSON.parse(data);

    // Update or add the sleep entry for the given date
    const existingEntry = sleepData.find(entry => entry.Date === Date);
    if (existingEntry) {
      existingEntry.Sleep = Sleep;
    } else {
      sleepData.push({ Date, Sleep });
    }

    await fs.writeFile(filePath, JSON.stringify(sleepData, null, 2));
    res.status(200).send({ message: 'SleepTracker updated successfully' });
  } catch (error) {
    console.error('Error updating SleepTracker:', error);
    res.status(500).send({ message: 'Error updating SleepTracker' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});