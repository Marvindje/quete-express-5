const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.APP_PORT || 5000;

const { APP_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } =
process.env;
app.listen(port, (err) => {
  if (err) console.error(err);
})
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
