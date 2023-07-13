const path = require('path');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3900);

const server = app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

const SocketIO = require('socket.io');

const io = SocketIO(server);

const typingUsers = new Set();

io.on('connection', (socket) => {
  console.log('New connection', socket.id);

  socket.on('chat:message', (data) => {
    io.sockets.emit('chat:message', data);
  });

  socket.on('chat:typing', (data) => {
    typingUsers.add(socket.id);
    io.sockets.emit('chat:typing', data);
  });

  socket.on('chat:typing:end', () => {
    typingUsers.delete(socket.id);
    io.sockets.emit('chat:typing:end');
  });

  socket.on('disconnect', () => {
    typingUsers.delete(socket.id);
    io.sockets.emit('chat:typing:end');
  });
});
