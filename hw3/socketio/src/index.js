const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = process.env.PORT || 5001;

const EVENTS = {
  connection: 'connection',
  disconnection: 'disconnection',
  chat: 'chat message',
  username: 'username',
  typing: 'typing',
};

const USERNAMES = {};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});

io.on(EVENTS.connection, (socket) => {
  console.log('a user connected');
  io.emit(EVENTS.connection, `User ${socket.id} Has Connected`);

  socket.on(EVENTS.disconnection, () => {
    console.log('user disconnected');
    io.emit(EVENTS.disconnection, `User ${socket.id} Has Left`);
  });

  socket.on(EVENTS.chat, (msg) => {
    //socket.broadcast.emit('chat message', msg);
    const username = USERNAMES[socket.id] ? USERNAMES[socket.id] : socket.id;
    io.emit(EVENTS.chat, `${username}: ${msg}`); // brodcast to everyone including sender
  });

  socket.on(EVENTS.username, (msg) => {
    USERNAMES[socket.id] = msg;
  });

  socket.on(EVENTS.typing, (e) => {
    const username = USERNAMES[socket.id] ? USERNAMES[socket.id] : socket.id;
    const msg = e === '1' ? `${username} is typing ...` : '';
    io.emit(EVENTS.typing, msg);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
