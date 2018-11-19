const server = require('http').createServer();
const io = require('socket.io')(server);
const port = process.env.port || 3001;

io.on('connection', function (client) {
  client.on('next', handleRegister)

  client.on('previous', handleJoin)

  client.on('play', handleLeave)

  client.on('pause', handleMessage)

  client.on('ffwd', handleGetChatrooms)

  client.on('rwd', handleGetAvailableUsers)

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
});

server.listen(port, function (err) {
  if (err) throw err
  console.log(`listening on ${port}`);
});