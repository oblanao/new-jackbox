const { allGames, Game, newRoomCode, roomCodeExists } = require('./Game');

const events = {
  getRoomCode: (socket) => {
    const roomCode = newRoomCode();
    // Instantiate game
    allGames[roomCode] = new Game(roomCode, socket);
    // Send roomCode to Frontend
    socket.emit('newRoomCode', roomCode);
  },
  userTriesToJoin: (socket, data) => {
    console.log(`Users tries to join room ${data.roomCode}`);
    const roomCode = data.roomCode;
    const playerName = data.playerName;
    // If the roomcode does not exist
    if (!roomCodeExists(roomCode)) {
      socket.emit('wrongRoomCode', roomCode);
    } else { // If game with roomcode exists
      var game = allGames[roomCode];
      if (game.playerExists(playerName)) {
        socket.emit('duplicatePlayerName', (playerName));
      } else {
        // Add client to Room. This will also emit correct events to server and self
        game.addClient(socket, playerName);
      }
    }
  }
}

module.exports = {
  events
}