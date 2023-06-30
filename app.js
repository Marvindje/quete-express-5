require("dotenv").config();

const express = require("express");
const app = express();
const port = 5000;

// Importer les dépendances nécessaires pour la gestion des utilisateurs
const database = require("./database");

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Route GET /api/users
app.get("/api/users", (req, res) => {
  // Récupérer tous les utilisateurs depuis la base de données
  database
    .query("SELECT * FROM users")
    .then((result) => {
      // Renvoyer la liste d'utilisateurs au format JSON avec un statut 200
      res.status(200).json(result[0]);
    })
    .catch((error) => {
      // En cas d'erreur, renvoyer une réponse avec un statut 500 et un message d'erreur
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Route GET /api/users/:id
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Rechercher l'utilisateur correspondant à l'identifiant dans la base de données
  database
    .query("SELECT * FROM users WHERE id = ?", [id])
    .then((result) => {
      // Vérifier si l'utilisateur existe
      if (result[0].length > 0) {
        // Renvoyer l'utilisateur correspondant au format JSON avec un statut 200
        res.status(200).json(result[0][0]);
      } else {
        // Si l'utilisateur n'existe pas, renvoyer une réponse avec un statut 404 et un message "Not Found"
        res.status(404).json({ message: "Not Found" });
      }
    })
    .catch((error) => {
      // En cas d'erreur, renvoyer une réponse avec un statut 500 et un message d'erreur
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
