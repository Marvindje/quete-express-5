const database = require("./database");

const postUser = (req, res) => {
  const { name, email } = req.body;

  database
    .query(
      "INSERT INTO users(name, email) VALUES (?, ?)",
      [name, email]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

module.exports = {
  postUser, // don't forget to export your function ;)
};
