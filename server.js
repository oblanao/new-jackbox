const io = require('socket.io')();
const { events } = require('./events');

io.on('connection', (socket) => {
  socket.on('getRoomCode', () => {
    events.getRoomCode(socket)
  });
  socket.on('userTriesToJoin', (data) => {
    events.userTriesToJoin(socket, data)
  });
});

io.listen(8000);