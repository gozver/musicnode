const express = require('express');
const socket = require('socket.io');

const environment = require('./config/environment');
const db = require('./config/db');

// set relationships
require('./config/relationships');

// consume express
const app = express();

// environment setup
environment(app);

const http = require('http');
const server = http.createServer(app);

// environment PORT or 3000 if there isn't
const port = process.env.PORT || 3000;

// bind and listen for db connections on the specified host and port
server.listen(port, () => {
  console.log(`--> server watching on port ${port}`);

  // db.authenticate()        => creates db connection
  // db.sync()                => creates db connection and db tables if do not exist (do nothing if exist)
  // db.sync({ force: true }) => creates db connection and db tables dropping them first if already exist
  db.authenticate()
    .then(() => console.log('--> db connection success'))
    .catch(err => {
      console.log('--> db connection error:');
      console.log(err);
    });
});

// consume socket
const io = socket(server);

// bind and listen for socket connections
io.on('connection' , (socket) => {
  console.log(`--> new socket connection: ${socket.id}`);

  // on 'event name' function callback that create a web socket and emits the data throught it
  socket.on('type', data => io.sockets.emit('type', data));
  socket.on('chat', data => io.sockets.emit('chat', data));
});