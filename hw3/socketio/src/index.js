import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

// turns our ES6 does not natively support __dirname so:
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 5001;

const EVENTS = {
  connection: 'connection',
  disconnect: 'disconnect',
  disconnection: 'disconnection', // cannot emit disconnect bc reserved
  chat: 'chat message',
  username: 'username',
  typing: 'typing',
};

const USERNAMES = {};

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});

io.on(EVENTS.connection, (socket) => {
  io.emit(EVENTS.connection, `User ${socket.id} Has Connected`);

  socket.on(EVENTS.disconnect, () => {
    io.emit(EVENTS.disconnection, `User ${socket.id} Has Left`);
  });

  socket.on(EVENTS.chat, (msg) => {
    // socket.broadcast.emit('chat message', msg);
    const username = USERNAMES[socket.id] || socket.id;
    io.emit(EVENTS.chat, `${username}: ${msg}`); // brodcast to everyone including sender
    io.emit(EVENTS.typing, ''); // notify user stopped typing
  });

  socket.on(EVENTS.username, (msg) => {
    USERNAMES[socket.id] = msg;
    io.emit(EVENTS.typing, ''); // notify user stopped typing
  });

  socket.on(EVENTS.typing, (e) => {
    const username = USERNAMES[socket.id] || socket.id;
    const msg = e === '1' ? `${username} is typing ...` : '';
    io.emit(EVENTS.typing, msg);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
