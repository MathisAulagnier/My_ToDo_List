# Application de Liste de Tâches Productive

## Aperçu

L'**Application de Liste de Tâches Productive** est conçue pour aider les utilisateurs à améliorer leur productivité en suivant leurs objectifs personnels et leurs habitudes quotidiennes. L'application permet aux utilisateurs de :

- Suivre la qualité de leur sommeil et leur humeur.
- Maintenir une liste de tâches quotidiennes pour améliorer la productivité.
- Ajouter des tâches ponctuelles avec des niveaux de priorité assignés.
- Gagner des points pour chaque tâche complétée afin de suivre la productivité dans le temps via un score dynamique.



## Fonctionnalités

1. **Suivi du Sommeil** :  
   Surveillez la qualité de votre sommeil en sélectionnant des catégories prédéfinies. Ces choix sont enregistrés et suivis dans le temps pour assurer une cohérence dans vos habitudes de sommeil.

2. **Suivi de l'Humeur** :  
   Suivez votre humeur quotidienne à partir de plusieurs options (par exemple, Heureux, Calme, Normal, etc.), ce qui vous permet de réfléchir à votre état émotionnel au fil du temps.

3. **Liste de Tâches Quotidiennes** :  
   L'application propose une liste personnalisable de tâches quotidiennes conçue pour améliorer votre productivité. Chaque tâche contribue à votre score global. Les utilisateurs peuvent modifier cette liste en ajoutant ou supprimant des tâches directement dans le composant `TaskTracker`.

4. **Fonctionnalité de Tâches Supplémentaires** :  
   Ajoutez des tâches ponctuelles nécessitant une attention immédiate. Vous pouvez attribuer des priorités à ces tâches pour vous concentrer sur les plus critiques.

5. **Score de Productivité** :  
   Chaque tâche complétée (quotidienne, sommeil, humeur, tâches supplémentaires) contribue à votre score de productivité quotidien, vous permettant de suivre et d'améliorer votre efficacité dans le temps.

## Personnalisation des Tâches

Les utilisateurs ont la possibilité de personnaliser leurs tâches quotidiennes en ajoutant, supprimant ou modifiant des tâches dans le composant `TaskTracker`. Les tâches sont définies et mises à jour en utilisant le code suivant :

```javascript
import React, { useState, useEffect, useCallback } from 'react';
import './TaskTracker.css'; // 

const taskPoints = {
  '100 Pompes': 5,
  'Séance de sport': 5,
  'Prendre des nouvelles': 5,
  'Etudier': 5,
  'Projet Personnel': 5,
  'Manger équilibré': 5,
  'Lire 30min': 5,
  'Echecs': 5,
  'Temps d\'écran < 3 heures': 5,
  'Apprendre quelque chose de nouveau': 5,
};

const TaskTracker = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: '100 Pompes', completed: false },
    { id: 2, text: 'Séance de sport', completed: false },
    { id: 3, text: 'Prendre des nouvelles', completed: false },
    { id: 4, text: 'Etudier', completed: false },
    { id: 5, text: 'Projet Personnel', completed: false },
    { id: 6, text: 'Manger équilibré', completed: false },
    { id: 7, text: 'Lire 30min', completed: false },
    { id: 8, text: 'Echecs', completed: false },
    { id: 9, text: 'Temps d\'écran < 3 heures', completed: false },
    { id: 10, text: 'Apprendre quelque chose de nouveau', completed: false },
  ]);
```

Les utilisateurs peuvent modifier la liste des tâches directement dans le composant `TaskTracker` en ajoutant de nouvelles tâches ou en modifiant les tâches par défaut.

## Comment ça fonctionne

1. **Gestion des Tâches :**
   - Sélectionnez ou cochez les tâches de la liste des tâches quotidiennes.
   - Ajoutez de nouvelles tâches ponctuelles avec un niveau de priorité.
   - Vos tâches complétées mettent automatiquement à jour votre score de productivité.

2. **Suivi de l'Humeur et du Sommeil :**
   - Chaque jour, choisissez votre humeur et la qualité de votre sommeil. Ces choix sont enregistrés pour être suivis et analysés.
   - Vous pouvez valider vos choix en utilisant un bouton « Valider ».

3. **Score de Productivité :**
   - Des points sont attribués en fonction de l'accomplissement des tâches, de l'humeur et de la qualité du sommeil.
   - Un graphique dynamique suit votre score de productivité sur les 30 derniers jours.

## Partie Technique

- **Frontend :** React.js (PWA)
- **Backend :** Node.js avec stockage de fichiers JSON
- **Style :** CSS, avec un design minimaliste
- **Gestion des Données :** Fichiers JSON pour le suivi des données utilisateur concernant le sommeil, l'humeur, les tâches et les tâches supplémentaires

## Installation et dépendances

1. Clonez le dépôt GitHub :

```bash
git clone https://github.com/MathisAulagnier/My_ToDo_List.git
```

2.	Accédez à la racine du projet JavaScript :

```bash
cd My_ToDo_List/my-personal-tracker/
```

3.	Installez les dépendances nécessaires :

```bash
npm install
```

4.	Pour lancer l’application, vous aurez besoin d’ouvrir deux terminaux :
   - Terminal 1 : Lancez le serveur pour permettre la communication entre les fichiers :
     
```bash
node server.js
```

   - Terminal 2 : Démarrez l’application :

```bash
npm start
```


