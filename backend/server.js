const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const adRoutes = require('./routes/ad');
const errorController = require('./controllers/error');

const app = express();

// environment PORT or 3000 if there isn't
const port = process.env.PORT || 3000;

// app.use(method()) => methods used as a middleware

app.use(express.json());      // method to recognize the incoming request object as a JSON object
app.use(express.urlencoded({  // method to recognize the incoming request object as strings or arrays. 
  extended: false
}));

app.use(morgan('common'));    // backend logger
app.use(cors());              // cross-origin resource sharing (intercambio de recursos de origen cruzado)

// set response headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// if there is a host:3000/auth POST request, we validate de input and handle it properly
app.use('/auth', authRoutes);
app.use('/ad', adRoutes);

// if doesn't reach the endpoint 'host:3000/auth' we handle the error
app.use(errorController.get400);
app.use(errorController.get500);

// bind and listen the connections on the specified host and port
app.listen(port, (err) => {
  if (err) console.log('error in server setup');

  console.log(`Server watching on port ${port}`);
});