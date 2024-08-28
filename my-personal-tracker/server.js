const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;  // Utilisez `fs.promises` pour permettre l'utilisation de promesses avec `fs`
const path = require('path');
const Papa = require('papaparse');

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

// Endpoint pour récupérer les tâches
app.get('/tasks', (req, res) => {
  fs.readFile(path.join(__dirname, 'public', 'punctualTasks.json'), 'utf8')
    .then(data => res.json(JSON.parse(data)))
    .catch(err => res.status(500).send('Erreur de lecture du fichier.'));
});

// Endpoint pour mettre à jour le fichier JSON
app.post('/tasks', (req, res) => {
  const updatedTasks = req.body;

  fs.writeFile(
    path.join(__dirname, 'public', 'punctualTasks.json'),
    JSON.stringify(updatedTasks, null, 2)
  )
    .then(() => res.send('Fichier mis à jour avec succès.'))
    .catch(err => res.status(500).send('Erreur lors de l\'écriture du fichier.'));
});

// Endpoint pour récupérer les données du fichier CSV
app.get('/tracker', (req, res) => {
  const csvFilePath = path.join(__dirname, 'public', 'tracker.csv');

  fs.readFile(csvFilePath, 'utf8')
    .then((csvData) => {
      const jsonData = Papa.parse(csvData, { header: true });
      res.json(jsonData.data);
    })
    .catch(err => res.status(500).send('Erreur de lecture du fichier CSV.'));
});

// Endpoint pour mettre à jour le fichier CSV
app.post('/tracker', (req, res) => {
  const updatedData = req.body; // Nouvelle donnée à ajouter
  const csvFilePath = path.join(__dirname, 'public', 'tracker.csv');

  fs.readFile(csvFilePath, 'utf8')
    .then((csvData) => {
      const jsonData = Papa.parse(csvData, { header: true }).data;
      jsonData.push(updatedData);

      const csv = Papa.unparse(jsonData);

      return fs.writeFile(csvFilePath, csv);
    })
    .then(() => res.send('Fichier CSV mis à jour avec succès.'))
    .catch(err => res.status(500).send('Erreur lors de la mise à jour du fichier CSV.'));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});