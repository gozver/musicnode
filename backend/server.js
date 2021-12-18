const express = require('express');
const environment = require('./config/environment');
const db = require('./config/db');

// set relationships
require('./config/relationships');

// consume express
const app = express();

// middlewares
environment(app);

// environment PORT or 3000 if there isn't
const port = process.env.PORT || 3000;

// bind and listen the connections on the specified host and port
app.listen(port, () => {
  console.log(`--> server watching on port ${port}`);

  // db.authenticate()        => creates db connection
  // db.sync()                => creates db connection and db tables if do not exist (do nothing if exist)
  // db.sync({ force: true }) => creates db connection and db tables dropping them first if already exist
  db.sync({ force: true })
    .then(() => console.log('--> db connection success'))
    .catch(err => {
      console.log('--> db connection error:');
      console.log(err);
    });
});