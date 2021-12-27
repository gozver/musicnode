const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');
const controllers = require('../controllers');
const path = require('path');

// app.use(method()) => methods used as a middleware
module.exports = (app) => {
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

  // serve static files in express
  app.use(express.static(path.join(__dirname, '../public')));

  // routes: localhost:3000/route
  app.use('/api', routes);

  // if doesn't reach the endpoint we handle the error
  app.use(controllers.error.get400);
  app.use(controllers.error.get500);
}