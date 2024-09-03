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

// Fonction pour lire un fichier JSON
const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erreur de lecture du fichier ${filePath}:`, error);
    throw new Error('Erreur lors de la lecture des données');
  }
};

// Fonction pour écrire dans un fichier JSON
const writeJsonFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Erreur d'écriture dans le fichier ${filePath}:`, error);
    throw new Error('Erreur lors de la mise à jour des données');
  }
};

// Endpoint pour récupérer les tâches ponctuelles
app.get('/tasks', async (req, res) => {
  try {
    const data = await readJsonFile(path.join(__dirname, 'public', 'punctualTasks.json'));
    res.json(data);
  } catch (err) {
    res.status(500).send('Erreur de lecture du fichier.');
  }
});

// Endpoint pour mettre à jour le fichier JSON des tâches ponctuelles
app.post('/tasks', async (req, res) => {
  try {
    await writeJsonFile(path.join(__dirname, 'public', 'punctualTasks.json'), req.body);
    res.send('Fichier mis à jour avec succès.');
  } catch (err) {
    res.status(500).send('Erreur lors de l\'écriture du fichier.');
  }
});

// Endpoint pour récupérer les humeurs
app.get('/api/moods', async (req, res) => {
  try {
    const data = await readJsonFile(path.join(__dirname, 'public', 'moodtracker.json'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

// Endpoint pour mettre à jour ou ajouter une humeur
app.post('/api/moods', async (req, res) => {
  const { Date, Mood } = req.body;
  const moodScores = {
    "Joyeux": 2,
    "Calme": 1,
    "Stressé": 0.5,
    "Normal": 0, // Valeur par défaut
    "Fatigué": -0.5,
    "Enervé": -1,
    "Triste": -2,
  };
  const Score = moodScores[Mood] || 0;

  try {
    const moodDataPath = path.join(__dirname, 'public', 'moodtracker.json');
    const data = await fs.readFile(moodDataPath, 'utf-8');
    let moodData = JSON.parse(data);

    const existingEntryIndex = moodData.findIndex((entry) => entry.Date === Date);
    if (existingEntryIndex >= 0) {
      moodData[existingEntryIndex] = { Date, Mood, Score };
    } else {
      moodData.push({ Date, Mood, Score });
    }

    await writeJsonFile(moodDataPath, moodData);
    res.json({ message: 'Humeur mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour des données' });
  }
});

// Endpoint pour récupérer le sommeil
app.get('/api/sleep', async (req, res) => {
  try {
    const data = await readJsonFile(path.join(__dirname, 'public', 'sleeptracker.json'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

// Endpoint pour mettre à jour ou ajouter une entrée de sommeil
app.post('/api/sleep', async (req, res) => {
  const { Date, Sleep } = req.body;
  const sleepScores = {
    "Excellent": 9,
    "Bien": 7,
    "Normal": 5,
    "Trop chaud/froid": 4,
    "Pas assez": 3,
    "Mal": 2,
    "Nuit blanche": 0
  };
  // const Score = sleepScores[Sleep] || 5;
  const Score = sleepScores[Sleep] !== undefined ? sleepScores[Sleep] : 5;

  try {
    const filePath = path.join(__dirname, 'public', 'sleeptracker.json');
    const data = await fs.readFile(filePath, 'utf8');
    const sleepData = JSON.parse(data);

    const existingEntry = sleepData.find(entry => entry.Date === Date);
    if (existingEntry) {
      existingEntry.Sleep = Sleep;
      existingEntry.Score = Score;
    } else {
      sleepData.push({ Date, Sleep, Score });
    }

    await writeJsonFile(filePath, sleepData);
    res.status(200).send({ message: 'SleepTracker mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du SleepTracker:', error);
    res.status(500).send({ message: 'Erreur lors de la mise à jour du SleepTracker' });
  }
});

// Server code for handling daily tasks
app.get('/api/daily-tasks', async (req, res) => {
  try {
    const data = await readJsonFile(path.join(__dirname, 'public', 'dailytasktracker.json'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

app.post('/api/daily-tasks', async (req, res) => {
  const { Date, Tasks } = req.body;
  const taskScore = 5; // Chaque tâche vaut 5 points
  const Score = Tasks.length * taskScore;

  try {
    const filePath = path.join(__dirname, 'public', 'dailytasktracker.json');
    const data = await fs.readFile(filePath, 'utf-8');
    let taskData = JSON.parse(data);

    const existingEntryIndex = taskData.findIndex(entry => entry.Date === Date);
    if (existingEntryIndex !== -1) {
      taskData[existingEntryIndex].Tasks = Tasks;
      taskData[existingEntryIndex].Score = Score;
    } else {
      taskData.push({ Date, Tasks, Score });
    }

    await writeJsonFile(filePath, taskData);
    res.status(200).send('dailytasktracker.json mis à jour avec succès');
  } catch (error) {
    console.error('Erreur lors de la mise à jour du dailytasktracker:', error);
    res.status(500).send('Erreur lors de la mise à jour du dailytasktracker');
  }
});

// Endpoint pour récupérer les extra tasks
app.get('/api/extra-tasks', async (req, res) => {
  try {
    const data = await readJsonFile(path.join(__dirname, 'public', 'extratasktracker.json'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des extra tasks' });
  }
});

// Endpoint pour mettre à jour le fichier JSON des extra tasks
app.post('/api/extra-tasks', async (req, res) => {
  const { Date, ExtraTasks } = req.body;

  const importanceScores = {
    "élevé": 7,
    "moyen": 5,
    "faible": 3
  };

  // Calcul du score pour les nouvelles tâches ajoutées
  const newScore = ExtraTasks.reduce((total, task) => {
    return total + (importanceScores[task.importance] || 0);
  }, 0);

  try {
    const filePath = path.join(__dirname, 'public', 'extratasktracker.json');
    const data = await fs.readFile(filePath, 'utf-8');
    let extraTaskData = JSON.parse(data);

    const existingEntryIndex = extraTaskData.findIndex(entry => entry.Date === Date);
    if (existingEntryIndex !== -1) {
      // Ajoute les nouvelles tâches à l'entrée existante pour la même date
      extraTaskData[existingEntryIndex].ExtraTasks.push(...ExtraTasks);
      extraTaskData[existingEntryIndex].Score += newScore; // Met à jour le score
    } else {
      // Crée une nouvelle entrée si la date n'existe pas encore
      extraTaskData.push({ Date, ExtraTasks, Score: newScore });
    }

    await fs.writeFile(filePath, JSON.stringify(extraTaskData, null, 2));
    res.status(200).send('extratasktracker.json mis à jour avec succès');
  } catch (error) {
    console.error('Erreur lors de la mise à jour de extratasktracker:', error);
    res.status(500).send('Erreur lors de la mise à jour de extratasktracker');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});