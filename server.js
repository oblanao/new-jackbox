const io = require('socket.io')();
const { events } = require('./events');

io.on('connection', (socket) => {
  socket.on('getRoomCode', () => {
    events.getRoomCode(socket)
  });
  socket.on('userTriesToJoin', (data) => {
    events.userTriesToJoin(socket, data)
  });
  socket.on('userDisconnect', (roomCode) => {
    events.userDisconnect(socket, roomCode);
  });
  socket.on('goPong', (latency, roomCode) => {
    events.goPong(socket, latency, roomCode);
  })
});

io.listen(8000);