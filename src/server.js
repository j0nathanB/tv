var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http, { origins: '*:*'});
const port = process.env.port || 3001;

app.get('/', function(req, res){
  res.sendFile('../public/index.html', {root: __dirname});
});

io.on('connection', function (client) {
  console.log('connected to socket');

  // client.on('subscribeToTimer', (interval) => {
  //   console.log('client is subscribing to timer with interval ', interval);
  //   setInterval(() => {
  //     client.emit('timer', new Date());
  //   }, interval);
  // });

  client.on('command', (cmd) => {
    console.log(`server: ${cmd}`);
    io.emit('cmd', cmd);
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