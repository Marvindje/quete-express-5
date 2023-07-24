require("dotenv").config();

const express = require("express");
const app = express();
const port = 5000;

const database = require("./database");
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

app.use(express.json());

app.get("/api/users", (req, res) => {
 
  database
    .query("SELECT * FROM users")
    .then((result) => {
    
      res.status(200).json(result[0]);
    })
    .catch((error) => {
      
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("SELECT * FROM users WHERE id = ?", [id])
    .then((result) => {

      if (result[0].length > 0) {
       
        res.status(200).json(result[0][0]);
      } else {
       
        res.status(404).json({ message: "Not Found" });
      }
    })
    .catch((error) => {
     
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", userHandlers.postUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
