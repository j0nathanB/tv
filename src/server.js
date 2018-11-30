const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {origins: '*:*'});
const port = process.env.port || 3001;

app.get('/', (req, res) => {
  res.sendFile('../public/index.html', {root: __dirname});
});

io.on('connection', (socket) => {
  console.log('connected to socket');

  const printRes = (err) => {
    const msg = err ?
      `createRoom ran into an error: ${err}` :
      `Room has been created.`;
    console.log(msg);
  };

  socket.on('init', (err) => {
    const roomId = socket.id.slice(0,4);
    socket.room = roomId;
    socket.join(roomId, (err) => {
      printRes(err);
    });

    io.to(roomId).emit('handshake', roomId);
    // todo: make this a confirmation message in the dom
  });

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId, (err) => {
      printRes(err);
    });
     io.to(roomId).emit('connected', true);
  });

  socket.on('sendCommand', (room, cmd) => {
    io.to(room).emit('sendCommand', cmd);
  });

  socket.on('disconnect', function() {
    console.log('socket disconnect...', socket.id);
  });

  socket.on('error', function(err) {
    console.log('received error from socket:', socket.id)
    console.log(err);
  });
});

http.listen(port, function(err) {
  if (err) throw err;
  console.log(`listening on ${port}`);
});