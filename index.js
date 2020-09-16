const express = require('express');
const app = express();
const configureDB = require('./config/database');
const routes = require('./config/routes');
const cors = require('cors');
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server);

require('dotenv').config();

app.use(cors('http://localhost:3000'));
const port = 3040;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

//* Handles any requests that don't match the ones above
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

configureDB();
app.use(express.json());
app.use('/', routes);

io.on('connection', (socket) => {
  socket.emit('notification', 'Welcome to code sharing');
  // io.emit('message' , "")
  socket.on('formValues', (message) => socket.emit('formDataBackend', message));
});

server.listen(port, () => {
  console.log('port listening on ', port);
});
