const express = require('express');

const sequelize = require('./config/database');
const environment = require('./config/environment');

// consume express
const app = express();

// middlewares
environment(app);

// environment PORT or 3000 if there isn't
const port = process.env.PORT || 3000;

// bind and listen the connections on the specified host and port
app.listen(port, () => {
  console.log(`--> server watching on port ${port}`);

  // sequelize.authenticate() => create db connection
  // sequelize.sync()         => create db connection and tables if do not exist
  sequelize.sync()
    .then(() => console.log('--> database connection success'))
    .catch(err => {
      console.log('--> database connection error:');
      console.log(err);
    });
});