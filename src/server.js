var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http, { origins: '*:*'});
const port = process.env.port || 3001;

app.get('/', (req, res) => {
  res.sendFile('../public/index.html', {root: __dirname});
});

io.on('connection', (client) => {
  console.log('connected to socket');
  
  const printRes = (err) => {
    const msg = err ? 
      `createRoom ran into an error: ${err}` : 
      `Room has been created.`
    console.log(msg);
  }

  client.on('initTv', (err) => {
    // TODO randomly create room names
    const randomName = 'aQui'
    io.emit('handshake', randomName);
  });

  client.on('joinRoom', (roomId) => {
    client.join(roomId, (err) => {
      printRes(err);
    });

    io.to(roomId).emit('test', `joined room ${roomId}`);
  });

  client.on('command', (room, cmd) => {
    io.to(room).emit('command', cmd);
  })

  // client.on('next', handleRegister)
  // client.on('previous', handleJoin)
  // client.on('play', handleLeave)
  // client.on('pause', handleMessage)
  // client.on('ffwd', handleGetChatrooms)
  // client.on('rwd', handleGetAvailableUsers)

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
   //handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
});

http.listen(port, function (err) {
  if (err) throw err;
  console.log(`listening on ${port}`);
});