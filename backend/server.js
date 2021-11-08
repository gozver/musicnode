const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const adRoutes = require('./routes/ad');

const app = express();
const sequelize = require('./config/database');

// environment PORT or 3000 if there isn't
const port = process.env.PORT || 3000;

// middlewares: app.use(method()) => methods used as a middleware
app.use(express.json());      // method to recognize the incoming request object as a JSON object
app.use(express.urlencoded({  // method to recognize the incoming request object as strings or arrays
  extended: true              // allow nested objects
}));
app.use(morgan('dev'));       // http request logger middleware
app.use(cors());              // cross-origin resource sharing

// set response headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// routes: localhost:3000/route
app.use('/auth', authRoutes);
app.use('/ad', adRoutes);

// bind and listen the connections on the specified host and port
app.listen(port, () => {
  console.log(`--> server watching on port ${port}`);

  // database connection
  sequelize
    .sync({        // create table if not exist
      force: false // do not drop tables in each query
    })
    .then(() => {
      console.log('--> database connection success');
    })
    .catch(err => {
      console.log('--> database connection error:');
      console.log(err);
    });
});

// const authRoutes = require('./routes/auth');
// const adRoutes = require('./routes/ad');
// const errorController = require('./controllers/error');

// // routes: localhost:3000/route
// app.use('/auth', authRoutes);
// app.use('/ad', adRoutes);

// // if doesn't reach the endpoint we handle the error
// app.use(errorController.get400);
// app.use(errorController.get500);