const database = require("./database");

const getUsers = (req, res) => {
  let sql = "SELECT * FROM users";
  const sqlValues = [];

  if (req.query.language) {
    sql += " WHERE language = ?";
    sqlValues.push(req.query.language);
  }

  if (req.query.city) {
    sql += " WHERE city = ?";
    sqlValues.push(req.query.city);
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("SELECT * FROM users WHERE id = ?", [id])
    .then(([users]) => {
      if (users.length > 0) {
        res.json(users[0]);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving user");
    });
};

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

const putUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  database
    .query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("DELETE FROM users WHERE id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the user");
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};
