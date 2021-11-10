const express = require('express');

const environment = require('./config/environment');
const sequelize = require('./config/database');

const adRoutes = require('./routes/ad');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

const app = express();
environment(app);

// routes: localhost:3000/route
app.use('/auth', authRoutes);
app.use('/ad', adRoutes);

// if doesn't reach the endpoint we handle the error
app.use(errorController.get400);
app.use(errorController.get500);

// environment PORT or 3000 if there isn't
const port = process.env.PORT || 3000;

// bind and listen the connections on the specified host and port
app.listen(port, () => {
  console.log(`--> server watching on port ${port}`);

  // sequelize.authenticate() => create db connection
  // sequelize.sync()         => create db connection and tables if do not exist
  sequelize.authenticate()
    .then(() => console.log('--> database connection success'))
    .catch(err => {
      console.log('--> database connection error:');
      console.log(err);
    });
});