const express = require('express');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

const app = express();

const port = process.env.PORT || 3000; // environment PORT or 3000 if there isn't

app.use(express.json());      // method to recognize the incoming request object as a JSON object
app.use(express.urlencoded({  // method to recognize the incoming request object as strings or arrays. 
  extended: false
}));

// set response headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, DESTROY');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// if there is a host:3000/auth POST request, we validate de input and handle it properly
app.use('/auth', authRoutes);

// if doesn't reach the endpoint 'host:3000/auth' we handle the error
app.use(errorController.get400);
app.use(errorController.get500);

// bind and listen the connections on the specified host and port
app.listen(port, (err) => {
  if (err) console.log('Error in server setup')

  console.log(`Server listening on port ${port}`);
});